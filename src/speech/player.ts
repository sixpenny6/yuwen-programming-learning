export interface NarrationVoice { id: string; name: string; engine: string; recordedVoice?: string }
export interface SystemSpeechConfig { lang: string; rate: number; preferredVoices: string[]; enabled?: boolean }
export type NarrationEntry = { spokenText: string } & (
  { mode: 'recorded'; file: string; sha256?: string; duration?: number } | { mode: 'system' }
);
export interface NarrationManifest {
  schemaVersion: 1; voice: NarrationVoice; fallback: SystemSpeechConfig;
  entries: Record<string, NarrationEntry>;
}
export interface SystemVoiceInfo { name: string; lang: string; voiceURI: string; localService: boolean; default: boolean }
export interface NarrationStatus {
  state: 'missing' | 'loading' | 'playing' | 'ended' | 'error'; text: string; voice: NarrationVoice | null;
  source?: 'recorded' | 'system'; systemVoice?: SystemVoiceInfo | null; file?: string; spokenText?: string;
  reason?: 'missing-entry' | 'invalid-entry' | 'manifest' | 'playback' | 'system-unavailable' | 'system-speech' | 'stopped';
  error?: string;
}
type AudioHandle = Pick<HTMLAudioElement, 'play' | 'pause' | 'load' | 'removeAttribute' | 'onplaying' | 'onended' | 'onerror' | 'error'>;
/** Injection allows testing actual native-event timing rather than invented playback. */
export interface SystemSpeechAdapter {
  getVoices: () => SpeechSynthesisVoice[];
  createUtterance: (text: string) => SpeechSynthesisUtterance;
  speak: (utterance: SpeechSynthesisUtterance) => void;
  cancel: () => void;
  addVoicesChanged: (listener: () => void) => () => void;
}
export interface NarrationPlayerOptions {
  loadManifest: () => Promise<unknown>; resolveFile: (file: string) => string; createAudio: (url: string) => AudioHandle;
  getSystemSpeech: () => SystemSpeechAdapter | null; onStatus: (status: NarrationStatus) => void;
  warn: (message: string, status: NarrationStatus) => void; voicesWaitMs?: number; systemStartTimeoutMs?: number;
}
/** Resolve Vite assets against the document, including packaged file: URLs. */
export function resolveNarrationURL(file: string, baseURL: string, documentURL: string): string {
  return new URL(file, new URL(baseURL, documentURL)).href;
}
/** Preserve Python's name priority, then its first Chinese voice fallback. */
export function selectSystemVoice(voices: SpeechSynthesisVoice[], config: SystemSpeechConfig): SpeechSynthesisVoice | null {
  const chinese = voices.filter(voice => voice.lang.includes('zh'));
  for (const name of config.preferredVoices) {
    const selected = chinese.find(voice => voice.name.includes(name));
    if (selected) return selected;
  }
  return chinese[0] || null;
}
function readManifest(value: unknown): NarrationManifest {
  if (!value || typeof value !== 'object') throw new Error('配音清单不是有效对象。');
  const manifest = value as Partial<NarrationManifest>;
  const voice = manifest.voice, fallback = manifest.fallback;
  if (manifest.schemaVersion !== 1 || !voice ||
      ![voice.id, voice.name, voice.engine].every(field => typeof field === 'string' && field.length > 0) ||
      !fallback || typeof fallback.lang !== 'string' || !fallback.lang || !Number.isFinite(fallback.rate) || fallback.rate <= 0 ||
      !Array.isArray(fallback.preferredVoices) || !fallback.preferredVoices.every(name => typeof name === 'string') ||
      (fallback.enabled !== undefined && typeof fallback.enabled !== 'boolean') ||
      !manifest.entries || typeof manifest.entries !== 'object' || Array.isArray(manifest.entries)) {
    throw new Error('配音清单格式不正确（需要 schemaVersion 1、voice、fallback 与 entries）。');
  }
  return manifest as NarrationManifest;
}
function validEntry(value: unknown, raw: string): value is NarrationEntry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as Partial<NarrationEntry>;
  if (entry.spokenText !== raw) return false;
  if (entry.mode === 'system') return true;
  return entry.mode === 'recorded' && typeof entry.file === 'string' && /^narration\/clips\/[A-Za-z0-9_-]+\.mp3$/.test(entry.file);
}
export function createNarrationPlayer(options: NarrationPlayerOptions) {
  type Request = { text: string; voice: NarrationVoice | null; source?: 'recorded' | 'system'; file?: string;
    spokenText?: string; systemVoice?: SystemVoiceInfo | null; started: boolean; cancelWait?: () => void;
    startTimer?: ReturnType<typeof setTimeout> };
  let manifest: NarrationManifest | null = null, manifestPromise: Promise<NarrationManifest> | null = null;
  let current: Request | null = null, audio: AudioHandle | null = null;
  let utterance: SpeechSynthesisUtterance | null = null, speech: SystemSpeechAdapter | null = null;
  const active = (request: Request) => current === request;
  function status(request: Request, state: NarrationStatus['state'], extra: Partial<NarrationStatus> = {}): NarrationStatus {
    return { state, text: request.text, voice: request.voice,
      ...(request.source ? { source: request.source } : {}), ...(request.file ? { file: request.file } : {}),
      ...(request.spokenText !== undefined ? { spokenText: request.spokenText } : {}),
      ...(request.source === 'system' ? { systemVoice: request.systemVoice ?? null } : {}), ...extra };
  }
  function disposeAudio() {
    const previous = audio; audio = null;
    if (!previous) return;
    previous.onplaying = previous.onended = previous.onerror = null;
    try { previous.pause(); } catch { /* Media may already be released. */ }
    try { previous.removeAttribute('src'); previous.load(); } catch { /* Callbacks already invalidated. */ }
  }
  function disposeSpeech(cancel: boolean) {
    const previous = utterance, adapter = speech; utterance = null; speech = null;
    if (previous) previous.onstart = previous.onend = previous.onerror = null;
    if (cancel && adapter) { try { adapter.cancel(); } catch { /* Old request remains invalidated. */ } }
  }
  function clearPending(request: Request | null) {
    if (!request) return;
    request.cancelWait?.(); request.cancelWait = undefined;
    if (request.startTimer) clearTimeout(request.startTimer);
    request.startTimer = undefined;
  }
  function reportError(request: Request, reason: NarrationStatus['reason'], error: unknown) {
    const detail = status(request, 'error', { reason, error: error instanceof Error ? error.message : String(error) });
    options.warn('配音播放失败。', detail); options.onStatus(detail);
  }
  function failed(request: Request, reason: NarrationStatus['reason'], error: unknown) {
    if (!active(request)) return;
    current = null; clearPending(request); disposeAudio(); disposeSpeech(true); reportError(request, reason, error);
  }
  function getManifest() {
    if (manifest) return Promise.resolve(manifest);
    if (!manifestPromise) manifestPromise = Promise.resolve().then(options.loadManifest).then(readManifest).then(value => {
      manifest = value; return value;
    }).catch(error => { manifestPromise = null; throw error; });
    return manifestPromise;
  }
  async function waitForVoices(request: Request, adapter: SystemSpeechAdapter): Promise<SpeechSynthesisVoice[]> {
    const ready = adapter.getVoices(); if (ready.length) return ready;
    return new Promise(resolve => {
      let finished = false, unsubscribe = () => {};
      let timer: ReturnType<typeof setTimeout> | undefined;
      const done = (voices: SpeechSynthesisVoice[]) => {
        if (finished) return; finished = true; unsubscribe(); if (timer) clearTimeout(timer);
        request.cancelWait = undefined; resolve(voices);
      };
      request.cancelWait = () => done([]);
      unsubscribe = adapter.addVoicesChanged(() => { const voices = adapter.getVoices(); if (voices.length) done(voices); });
      timer = setTimeout(() => done(adapter.getVoices()), options.voicesWaitMs ?? 1500);
      const voices = adapter.getVoices(); if (voices.length) done(voices);
    });
  }
  async function playSystem(request: Request, config: SystemSpeechConfig) {
    if (!active(request)) return;
    if (config.enabled === false) {
      failed(request, 'system-unavailable', new Error('当前配音配置禁止使用其他系统声音，请检查随软件安装的晓晓录音。'));
      return;
    }
    request.source = 'system'; request.started = false; delete request.file;
    request.systemVoice = null; options.onStatus(status(request, 'loading'));
    try {
      const adapter = options.getSystemSpeech();
      if (!adapter) { failed(request, 'system-unavailable', new Error('当前系统不支持中文语音合成。')); return; }
      const voices = await waitForVoices(request, adapter); if (!active(request)) return;
      const selected = selectSystemVoice(voices, config), next = adapter.createUtterance(request.text);
      next.lang = config.lang; next.rate = config.rate; if (selected) next.voice = selected;
      request.systemVoice = selected ? { name: selected.name, lang: selected.lang, voiceURI: selected.voiceURI,
        localService: selected.localService, default: selected.default } : null;
      utterance = next; speech = adapter;
      next.onstart = () => {
        if (!active(request) || utterance !== next || request.started) return;
        request.started = true; clearPending(request); options.onStatus(status(request, 'playing'));
      };
      next.onend = () => {
        if (!active(request) || utterance !== next) return;
        if (!request.started) { failed(request, 'system-speech', new Error('系统语音未报告开始播放。')); return; }
        current = null; clearPending(request); disposeSpeech(false); options.onStatus(status(request, 'ended'));
      };
      next.onerror = event => {
        if (active(request) && utterance === next) failed(request, 'system-speech', new Error(`系统语音播放失败（${event.error || 'unknown'}）。`));
      };
      request.startTimer = setTimeout(() => {
        if (active(request) && !request.started) failed(request, 'system-speech', new Error('系统语音等待开始超时。'));
      }, options.systemStartTimeoutMs ?? 15000);
      adapter.speak(next);
    } catch (error) { failed(request, 'system-speech', error); }
  }
  async function speakText(text: string): Promise<void> {
    // Replace identity before cancelling: old media/SAPI callbacks cannot restart speech.
    const previous = current, request: Request = { text, voice: manifest?.voice || null, started: false };
    current = request; clearPending(previous); disposeAudio(); disposeSpeech(true);
    options.onStatus(status(request, 'loading'));
    let recording: NarrationManifest;
    try { recording = await getManifest(); } catch (error) { failed(request, 'manifest', error); return; }
    if (!active(request)) return;
    request.voice = recording.voice;
    if (!Object.prototype.hasOwnProperty.call(recording.entries, text)) {
      current = null; const detail = status(request, 'missing', { reason: 'missing-entry' });
      options.warn('未找到这段文字的配音配置。', detail); options.onStatus(detail); return;
    }
    const entry = recording.entries[text];
    if (!validEntry(entry, text)) { failed(request, 'invalid-entry', new Error('配音条目需要原始文本及有效的 recorded/system 模式。')); return; }
    request.spokenText = entry.spokenText;
    if (entry.mode === 'system') { await playSystem(request, recording.fallback); return; }
    request.source = 'recorded'; request.file = entry.file; options.onStatus(status(request, 'loading'));
    function recordedFailed(error: unknown) {
      if (!active(request) || request.source !== 'recorded') return;
      if (recording.fallback.enabled === false) { failed(request, 'playback', error); return; }
      disposeAudio(); reportError(request, 'playback', error);
      // Python falls back when a recording cannot play; retain the observable error.
      if (active(request)) void playSystem(request, recording.fallback);
    }
    let media: AudioHandle;
    try { media = options.createAudio(options.resolveFile(entry.file)); } catch (error) { recordedFailed(error); return; }
    audio = media;
    const mediaActive = () => active(request) && audio === media && request.source === 'recorded';
    function started() { if (mediaActive() && !request.started) { request.started = true; options.onStatus(status(request, 'playing')); } }
    media.onplaying = started;
    media.onended = () => { if (mediaActive()) { current = null; disposeAudio(); options.onStatus(status(request, 'ended')); } };
    media.onerror = () => {
      if (mediaActive()) recordedFailed(new Error(media.error?.message || `录音无法解码或读取${media.error?.code ? `（媒体错误 ${media.error.code}）` : ''}。`));
    };
    try { await media.play(); started(); } catch (error) { if (mediaActive()) recordedFailed(error); }
  }
  function stopSpeech() {
    const previous = current; current = null; clearPending(previous); disposeAudio(); disposeSpeech(true);
    if (previous) options.onStatus(status(previous, 'ended', { reason: 'stopped' }));
  }
  return { speakText, stopSpeech };
}
// No browser globals are touched during module import (also safe for Node tests).
const player = createNarrationPlayer({
  async loadManifest() {
    const url = resolveNarrationURL('narration/manifest.json', import.meta.env.BASE_URL, document.baseURI);
    const response = await fetch(url); if (!response.ok) throw new Error(`配音清单读取失败（${response.status}）。`);
    return response.json();
  },
  resolveFile: file => resolveNarrationURL(file, import.meta.env.BASE_URL, document.baseURI), createAudio: url => new Audio(url),
  getSystemSpeech: () => {
    if (typeof window === 'undefined' || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') return null;
    const synth = window.speechSynthesis;
    return { getVoices: () => synth.getVoices(), createUtterance: text => new SpeechSynthesisUtterance(text),
      speak: next => synth.speak(next), cancel: () => synth.cancel(), addVoicesChanged: listener => {
        synth.addEventListener('voiceschanged', listener); return () => synth.removeEventListener('voiceschanged', listener);
      } };
  },
  onStatus: detail => { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('narration-status', { detail })); },
  warn: (message, detail) => console.warn(`[narration] ${message}`, detail),
});
export const speakText = (text: string): Promise<void> => player.speakText(text);
export const stopSpeech = (): void => player.stopSpeech();
