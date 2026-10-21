"""Resumable Microsoft Xiaoxiao recordings, with exact raw-text input.

Install requirements-narration.txt in an isolated venv. A network connection to
Microsoft Edge Online TTS and local ffmpeg/ffprobe are required for generation.
No keys, paid API, alternative voice, text normalization, or playback stretching
are used. --verify-only reads existing files without a network request.
"""
from __future__ import annotations

import argparse
import array
import asyncio
import datetime as dt
import hashlib
import importlib.metadata
import json
import math
import os
from pathlib import Path
import platform
import random
import re
import shutil
import subprocess
import sys
import time
from typing import Any

VOICE = {
    "id": "microsoft-xiaoxiao-neural-normal", "name": "晓晓",
    "engine": "Microsoft Edge Online TTS", "speaker": "zh-CN-XiaoxiaoNeural",
    "synthesisRate": "+0%", "playbackRate": 1, "pitch": "+0Hz", "volume": "+0%",
}
SAMPLE_TEXTS = [
    "欢迎来到编程学习之旅，我们像学习语文一样，从识字、组词、造句开始，一步一步学会编程。",
    "if，是如果，属于系统定义。",
    "正确！单个等号表示赋值，意思是把右边的值放进左边的盒子里。",
]


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def file_hash(file: Path) -> str:
    with file.open("rb") as source:
        return hashlib.file_digest(source, "sha256").hexdigest()


def now() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat()


def save_json(file: Path, data: Any) -> None:
    temporary = file.with_suffix(file.suffix + ".tmp")
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    os.replace(temporary, file)


def append_jsonl(file: Path, data: Any) -> None:
    with file.open("a", encoding="utf-8") as destination:
        destination.write(json.dumps(data, ensure_ascii=False) + "\n")
        destination.flush()
        os.fsync(destination.fileno())


def load_input(file: Path | None, samples: bool) -> tuple[list[dict[str, str]], str | None]:
    if samples:
        raw = [{"key": text, "spokenText": text, "id": "xiaoxiao-" + digest(text.encode())[:24]} for text in SAMPLE_TEXTS]
        input_hash = None
    else:
        if file is None:
            raise ValueError("--input is required for a full run")
        data = file.read_bytes()
        inventory = json.loads(data)
        if inventory["voice"] != VOICE:
            raise ValueError("Input voice must match the fixed Xiaoxiao configuration exactly")
        raw = inventory["entries"]
        input_hash = digest(data)
    rows, ids, texts = [], set(), set()
    for row in raw:
        if not all(isinstance(row.get(name), str) for name in ("id", "key", "spokenText")):
            raise ValueError("Each entry must have string id/key/spokenText")
        if not row["key"] or row["spokenText"] != row["key"]:
            raise ValueError("Text must remain exactly equal to the nonempty raw key")
        expected = "xiaoxiao-" + digest(row["key"].encode("utf-8"))[:24]
        if row["id"] != expected or row["id"] in ids or row["key"] in texts:
            raise ValueError("Unexpected or duplicate content id/raw key")
        ids.add(row["id"]); texts.add(row["key"])
        rows.append({name: row[name] for name in ("id", "key", "spokenText")})
    return rows, input_hash


def executable(value: str) -> str:
    resolved = shutil.which(value)
    if resolved is None:
        raise FileNotFoundError("Required audio tool is missing: " + value)
    return resolved


def check_audio(file: Path, ffprobe: str, ffmpeg: str) -> dict[str, Any]:
    options = {"check": True, "stdout": subprocess.PIPE, "stderr": subprocess.PIPE, "timeout": 45}
    if os.name == "nt":
        options["creationflags"] = subprocess.CREATE_NO_WINDOW
    result = subprocess.run([ffprobe, "-v", "error", "-show_entries", "stream=codec_name,sample_rate,channels,bit_rate:format=duration,size", "-of", "json", str(file)], **options)
    info = json.loads(result.stdout)
    stream, = info["streams"]
    duration = float(info["format"]["duration"])
    if stream["codec_name"] != "mp3" or int(stream["sample_rate"]) != 24000 or int(stream["channels"]) != 1 or not math.isfinite(duration) or duration <= 0:
        raise ValueError("Provider output must be valid 24kHz mono MP3")
    # Decode every frame into PCM, rather than trusting just its MP3 header.
    decoded = subprocess.run([ffmpeg, "-v", "error", "-xerror", "-i", str(file), "-map", "0:a:0", "-ac", "1", "-ar", "24000", "-f", "s16le", "pipe:1"], **options)
    samples = array.array("h", decoded.stdout)
    if sys.byteorder != "little":
        samples.byteswap()
    if not samples:
        raise ValueError("The decoded recording is empty")
    peak = max(abs(value) for value in samples) / 32768
    rms = math.sqrt(sum(value * value for value in samples) / len(samples)) / 32768
    if peak < 0.0001 or rms < 0.00001:
        raise ValueError("The recording is silent")
    return {"duration": duration, "sampleRate": 24000, "channels": 1,
            "mp3Bitrate": int(stream.get("bit_rate", 0)), "bytes": file.stat().st_size,
            "peakAmplitude": peak, "rmsAmplitude": rms, "decodedSamples": len(samples),
            "fullDecodePassed": True, "nonSilent": True}


def previous_records(output: Path) -> dict[str, Any]:
    records = {}
    for file in sorted(output.glob("manifest-shard*.jsonl")):
        for line in file.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            row = json.loads(line)
            if row.get("status") == "ok":
                records[row["id"]] = row
    return records


def matches(row: dict[str, Any] | None, entry: dict[str, str], output: Path) -> bool:
    if row is None:
        return False
    expected = {**entry, "speaker": VOICE["speaker"], "engine": VOICE["engine"],
                "synthesisRate": "+0%", "playbackRate": 1, "pitch": "+0Hz", "volume": "+0%",
                "mp3": entry["id"] + ".mp3", "spokenTextSha256": digest(entry["spokenText"].encode()),
                "sampleRate": 24000, "channels": 1, "fullDecodePassed": True, "nonSilent": True}
    if any(row.get(key) != value for key, value in expected.items()):
        return False
    file = output / expected["mp3"]
    return file.is_file() and file.stat().st_size == row.get("bytes") and file_hash(file) == row.get("sha256")


def safe_error(error: Exception) -> str:
    # No complete transport URLs or headers are written to logs.
    return type(error).__name__ + ": " + re.sub(r"https?://\S+|wss?://\S+", "[transport-url]", str(error))[:240]


async def main(args: argparse.Namespace) -> int:
    entries, input_hash = load_input(args.input, args.samples_only)
    if not 0 <= args.shard_index < args.num_shards:
        raise ValueError("Shard index must be smaller than num-shards")
    assigned = entries[args.shard_index::args.num_shards]
    output = args.output.resolve(); output.mkdir(parents=True, exist_ok=True)
    manifest = output / f"manifest-shard{args.shard_index}.jsonl"
    error_log = output / f"errors-shard{args.shard_index}.jsonl"
    summary_file = output / f"summary-shard{args.shard_index}.json"
    previous = previous_records(output)
    valid = {entry["id"] for entry in assigned if matches(previous.get(entry["id"]), entry, output)}
    pending = [entry for entry in assigned if entry["id"] not in valid]
    started = time.monotonic()
    summary = {"schemaVersion": 1, "startedAt": now(), "ok": False, "voice": VOICE,
               "provider": "Microsoft Edge Online TTS", "inputSha256": input_hash,
               "generatorSha256": file_hash(Path(__file__)), "samplesOnly": args.samples_only,
               "shardIndex": args.shard_index, "numShards": args.num_shards,
               "totalInputEntries": len(entries), "assigned": len(assigned), "skippedExisting": len(valid),
               "generated": 0, "failed": 0, "retries": 0, "concurrency": args.concurrency,
               "voiceSubstitutionAllowed": False, "textNormalization": False,
               "resumeValidation": "Exact contract, file size and SHA; original generation decoded every frame and checked non-silence.",
               "evidenceBoundary": "Requested exact Microsoft service voice with no fallback. File integrity/decoding and non-silence are machine checks, not a human listening assessment."}
    def progress() -> None:
        summary["completed"] = len(valid) + summary["generated"]
        summary["elapsedSeconds"] = round(time.monotonic() - started, 2)
        save_json(summary_file, summary)
        print(json.dumps({key: summary[key] for key in ("completed", "assigned", "generated", "skippedExisting", "failed", "retries", "elapsedSeconds")}), flush=True)
    if args.verify_only:
        summary["ok"] = len(valid) == len(assigned)
        summary["mode"] = "verify-existing-no-network"
        progress()
        return 0 if summary["ok"] else 1

    import edge_tts
    summary["edgeTtsVersion"] = importlib.metadata.version("edge-tts")
    summary["python"] = {"executable": sys.executable, "version": platform.python_version()}
    # Confirm the exact voice is currently provided. Never silently substitute.
    voices = await asyncio.wait_for(edge_tts.list_voices(), timeout=args.timeout)
    selected, = [voice for voice in voices if voice.get("ShortName") == VOICE["speaker"]]
    if selected.get("SuggestedCodec") != "audio-24khz-48kbitrate-mono-mp3" or selected.get("Locale") != "zh-CN":
        raise ValueError("Unexpected Xiaoxiao provider descriptor")
    summary["providerVoice"] = selected
    summary["providerVoiceCheckedAt"] = now()
    save_json(output / f"metadata-shard{args.shard_index}.json", summary)
    ffprobe, ffmpeg = executable(args.ffprobe), executable(args.ffmpeg)
    semaphore = asyncio.Semaphore(args.concurrency)

    async def generate(entry: dict[str, str]) -> None:
        async with semaphore:
            temporary = output / (entry["id"] + f".shard{args.shard_index}.pending.mp3")
            destination = output / (entry["id"] + ".mp3")
            for attempt in range(1, args.attempts + 1):
                try:
                    communicate = edge_tts.Communicate(entry["spokenText"], VOICE["speaker"], rate="+0%", pitch="+0Hz", volume="+0%", connect_timeout=10, receive_timeout=30)
                    await asyncio.wait_for(communicate.save(str(temporary)), timeout=args.timeout)
                    audio = await asyncio.to_thread(check_audio, temporary, ffprobe, ffmpeg)
                    sha = await asyncio.to_thread(file_hash, temporary)
                    os.replace(temporary, destination)
                    row = {**entry, "status": "ok", "speaker": VOICE["speaker"], "engine": VOICE["engine"],
                           "synthesisRate": "+0%", "playbackRate": 1, "pitch": "+0Hz", "volume": "+0%",
                           "mp3": destination.name, "sha256": sha, "spokenTextSha256": digest(entry["spokenText"].encode()),
                           "providerVoiceShortName": selected["ShortName"], "providerVoiceName": selected["Name"],
                           "providerSuggestedCodec": selected["SuggestedCodec"], "edgeTtsVersion": summary["edgeTtsVersion"],
                           "attempts": attempt, "generatedAt": now(), **audio}
                    append_jsonl(manifest, row)
                    summary["generated"] += 1
                    if summary["generated"] % 10 == 0:
                        progress()
                    return
                except Exception as error:
                    append_jsonl(error_log, {"id": entry["id"], "attempt": attempt, "at": now(), "error": safe_error(error)})
                    if temporary.exists():
                        temporary.unlink()  # Only this entry's known temporary file.
                    if attempt < args.attempts:
                        summary["retries"] += 1
                        await asyncio.sleep(min(12, 1.5 * 2 ** (attempt - 1)) + random.random())
                    else:
                        summary["failed"] += 1
                        print(json.dumps({"failedId": entry["id"], "error": safe_error(error)}), flush=True)

    async def ticker() -> None:
        while True:
            await asyncio.sleep(20)
            progress()

    progress()
    clock = asyncio.create_task(ticker())
    try:
        await asyncio.gather(*(generate(entry) for entry in pending))
    finally:
        clock.cancel()
    final = previous_records(output)
    summary["finalContractAndHashMatched"] = sum(matches(final.get(entry["id"]), entry, output) for entry in assigned)
    summary["ok"] = summary["failed"] == 0 and summary["finalContractAndHashMatched"] == len(assigned)
    summary["completedAt"] = now()
    progress()
    return 0 if summary["ok"] else 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--samples-only", action="store_true")
    parser.add_argument("--verify-only", action="store_true")
    parser.add_argument("--shard-index", type=int, default=0)
    parser.add_argument("--num-shards", type=int, default=1)
    parser.add_argument("--concurrency", type=int, choices=range(1, 9), default=4)
    parser.add_argument("--attempts", type=int, choices=range(1, 7), default=4)
    parser.add_argument("--timeout", type=float, default=60)
    parser.add_argument("--ffmpeg", default=os.environ.get("FFMPEG_PATH", "ffmpeg.exe" if os.name == "nt" else "ffmpeg"))
    parser.add_argument("--ffprobe", default=os.environ.get("FFPROBE_PATH", "ffprobe.exe" if os.name == "nt" else "ffprobe"))
    options = parser.parse_args()
    try:
        raise SystemExit(asyncio.run(main(options)))
    except KeyboardInterrupt:
        raise SystemExit(130)
    except Exception as failure:
        print(json.dumps({"ok": False, "error": safe_error(failure)}), file=sys.stderr, flush=True)
        raise SystemExit(1)
