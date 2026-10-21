"""Compile and exercise only the beginner C feature examples changed in 1.3.0.

Requires the bundled Windows LLVM-MinGW toolchain. Does not rewrite lessons.
Run: python scripts/verify-c-features.py
"""
from __future__ import annotations
import concurrent.futures
import hashlib
import json
from pathlib import Path
import re
import subprocess
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "test-results/course-1.3.0"
PROGRAMS = OUT / "c-programs"
COMPILER = ROOT / "vendor/compiler/bin/x86_64-w64-mingw32-clang.exe"
FLAGS = ["-std=c17", "-Wall", "-Wextra", "-Werror", "-pedantic-errors",
         "-finput-charset=UTF-8", "-fexec-charset=UTF-8", "-static"]
TARGETS = {"wordExamples": [9, 11, 13], "sentenceExamples": [7, 11, 12],
           "essayExamples": [4, 7, 10, 13]}

def digest(value):
    return hashlib.sha256(value).hexdigest()

def normalized(value):
    return value.decode("utf-8").replace("\r\n", "\n")

def read_data(name):
    source = (ROOT / "src/adapted-data/c" / (name + ".ts")).read_text(encoding="utf-8")
    match = re.search(r"export\s+const\s+" + name + r"\b[^=]*=\s*", source)
    return json.JSONDecoder().raw_decode(source[match.end():])[0]

def run(executable, cwd, stdin=""):
    result = subprocess.run([str(executable)], input=stdin.encode("utf-8"),
                            capture_output=True, cwd=cwd, timeout=10)
    return {"exitCode": result.returncode, "stdout": normalized(result.stdout),
            "stderr": normalized(result.stderr)}

def compile_program(label, code):
    directory = PROGRAMS / label
    directory.mkdir(parents=True, exist_ok=True)
    source, executable = directory / "main.c", directory / "program.exe"
    source.write_bytes(code.encode("utf-8"))
    result = subprocess.run([str(COMPILER), *FLAGS, str(source), "-o", str(executable)],
                            capture_output=True, timeout=30)
    if result.returncode:
        raise RuntimeError(label + ": " + normalized(result.stderr))
    return directory, executable

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    examples = {name: {e["id"]: e for e in read_data(name)} for name in TARGETS}
    compiled = {}
    report = {"schemaVersion": 1, "generatedAt": datetime.now(timezone.utc).isoformat(),
              "audience": "absolute-beginner", "ok": False,
              "compiler": str(COMPILER.relative_to(ROOT)), "compilerFlags": FLAGS,
              "normalCases": [], "boundaryCases": [], "errors": [],
              "scope": "10 changed complete programs; representative valid and invalid inputs within the stated beginner lesson scope",
              "limitations": ["scanf integer-result checks do not claim numeric range validation.",
                              "The score example assumes three integer grades from 0 through 100.",
                              "This targeted report does not replace the separate all-course 92-program verification."]}
    def normal(task):
        name, entry_id = task
        entry = examples[name][entry_id]
        directory, executable = compile_program(name + "-" + str(entry_id), entry["code"])
        observed = run(executable, directory, entry.get("stdin", ""))
        passed = observed == {"exitCode": 0, "stdout": entry["expectedOutput"], "stderr": ""}
        return name, entry_id, directory, executable, {
            "dataset": name, "id": entry_id, "passed": passed, **observed,
            "codeSha256": digest(entry["code"].encode("utf-8"))}
    tasks = [(name, entry_id) for name, ids in TARGETS.items() for entry_id in ids]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        for result in pool.map(normal, tasks):
            name, entry_id, directory, executable, record = result
            compiled[(name, entry_id)] = (directory, executable)
            report["normalCases"].append(record)
            if not record["passed"]:
                report["errors"].append("normal " + name + ":" + str(entry_id))
    def boundary(label, dataset, entry_id, stdin, expected, exit_code=0, cwd=None):
        directory, executable = compiled[(dataset, entry_id)]
        observed = run(executable, cwd or directory, stdin)
        passed = observed == {"exitCode": exit_code, "stdout": expected, "stderr": ""}
        report["boundaryCases"].append({"name": label, "dataset": dataset, "id": entry_id,
                                        "passed": passed, **observed})
        if not passed:
            report["errors"].append(label)
    for label, stdin, expected in [
            ("age-zero", "0\n", "年龄: 0\n"), ("age-negative-integer", "-1\n", "年龄: -1\n"),
            ("age-not-integer", "hello\n", "请输入整数\n"), ("age-end-of-input", "", "请输入整数\n")]:
        boundary(label, "sentenceExamples", 12, stdin, expected)
    for label, stdin, expected, status in [
            ("scores-zero", "0 0 0\n", "总分: 0\n", 0),
            ("scores-upper-example-bound", "100 100 100\n", "总分: 300\n", 0),
            ("scores-second-not-integer", "80 hello 85\n", "请输入整数成绩\n", 1),
            ("scores-early-end", "80\n", "请输入整数成绩\n", 1)]:
        boundary(label, "essayExamples", 10, stdin, expected, status)
    file_directory, _ = compiled[("essayExamples", 13)]
    disk = (file_directory / "note.txt").read_bytes()
    file_passed = disk.replace(b"\r\n", b"\n") == b"Hello, C!\n"
    report["boundaryCases"].append({"name": "file-roundtrip-bytes", "passed": file_passed,
                                    "diskSize": len(disk), "diskSha256": digest(disk),
                                    "textModeNewlinesNormalized": True})
    if not file_passed:
        report["errors"].append("file-roundtrip-bytes")
    blocked = PROGRAMS / "file-open-failure"
    (blocked / "note.txt").mkdir(parents=True, exist_ok=True)
    boundary("file-open-failure", "essayExamples", 13, "", "", 1, blocked)

    word_code = examples["essayExamples"][7]["code"].replace(
        "    return 0;\n", "    if (word[0] != 'H' || word[1] != 'e' || word[5] != '\\0') {\n"
        "        return 1;\n    }\n    return 0;\n")
    directory, executable = compile_program("character-and-nul-preserved", word_code)
    observed = run(executable, directory)
    passed = observed == {"exitCode": 0, "stdout": "Hello\n", "stderr": ""}
    report["boundaryCases"].append({"name": "character-and-nul-preserved", "passed": passed, **observed})
    if not passed:
        report["errors"].append("character-and-nul-preserved")

    swap_function = examples["sentenceExamples"][7]["code"].split("int main(void) {", 1)[0]
    swap_code = swap_function + """int main(void) {
    int score = 7;
    swap(&score, &score);
    printf("%d\\n", score);
    return 0;
}
"""
    directory, executable = compile_program("swap-same-valid-address", swap_code)
    observed = run(executable, directory)
    passed = observed == {"exitCode": 0, "stdout": "7\n", "stderr": ""}
    report["boundaryCases"].append({"name": "swap-same-valid-address", "passed": passed, **observed})
    if not passed:
        report["errors"].append("swap-same-valid-address")
    sources = sorted((ROOT / "src/adapted-data/c").glob("*.ts"))
    report["sources"] = [{"path": p.relative_to(ROOT).as_posix(), "sha256": digest(p.read_bytes())}
                         for p in sources]
    report["authoringScriptSha256"] = digest((ROOT / "scripts/author-c-features.py").read_bytes())
    report["verifierSha256"] = digest(Path(__file__).read_bytes())
    report["normalPassed"] = sum(c["passed"] for c in report["normalCases"])
    report["boundaryPassed"] = sum(c["passed"] for c in report["boundaryCases"])
    report["ok"] = not report["errors"]
    path = OUT / "c-features.json"
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"ok": report["ok"], "normalPassed": report["normalPassed"],
                      "boundaryPassed": report["boundaryPassed"], "errors": report["errors"],
                      "report": path.relative_to(ROOT).as_posix()}, ensure_ascii=False))
    if not report["ok"]:
        raise SystemExit(1)

if __name__ == "__main__":
    main()

