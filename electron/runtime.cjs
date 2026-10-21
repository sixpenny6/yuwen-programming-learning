const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const { StringDecoder } = require('node:string_decoder');
const { randomUUID } = require('node:crypto');

const DEFAULT_LIMITS = Object.freeze({ compileMs: 30000, runMs: 120000, outputBytes: 1024 * 1024 });
const BOOTSTRAP = '#include <stdio.h>\n__attribute__((constructor)) static void learning_io_init(void) { setvbuf(stdout, NULL, _IONBF, 0); setvbuf(stderr, NULL, _IONBF, 0); }\n';

function compilerPaths(root) {
  const bin = path.join(root, 'bin');
  return {
    c: path.join(bin, 'x86_64-w64-mingw32-clang.exe'),
    cpp: path.join(bin, 'x86_64-w64-mingw32-clang++.exe'),
    bin,
  };
}

function executionEnvironment(compilerBin) {
  const allowed = new Set(['systemroot', 'windir', 'temp', 'tmp', 'userprofile', 'homedrive', 'homepath', 'appdata', 'localappdata', 'programdata', 'comspec', 'number_of_processors', 'processor_architecture', 'programfiles', 'programfiles(x86)', 'programw6432']);
  const environment = Object.fromEntries(Object.entries(process.env).filter(([key]) => allowed.has(key.toLowerCase())));
  const systemRoot = process.env.SystemRoot || 'C:\\Windows';
  environment.PATH = [compilerBin, path.join(systemRoot, 'System32'), systemRoot].join(path.delimiter);
  environment.LANG = 'C.UTF-8';
  environment.LC_ALL = 'C.UTF-8';
  return environment;
}

async function killTree(child) {
  if (!child?.pid || child.exitCode !== null || child.signalCode !== null) return;
  if (process.platform === 'win32') {
    await new Promise((resolve) => {
      const killer = spawn(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'taskkill.exe'), ['/pid', String(child.pid), '/t', '/f'], { windowsHide: true, shell: false, stdio: 'ignore' });
      killer.once('error', () => { try { child.kill('SIGKILL'); } catch {} resolve(); });
      killer.once('close', resolve);
    });
  } else {
    try { process.kill(-child.pid, 'SIGKILL'); } catch { try { child.kill('SIGKILL'); } catch {} }
  }
}

class RuntimeRunner {
  constructor({ compilerRoot, language, onEvent, limits = {} }) {
    if (!['c', 'cpp'].includes(language)) throw new Error('不支持的编程语言');
    this.language = language;
    this.compiler = compilerPaths(compilerRoot);
    this.onEvent = onEvent;
    this.limits = { ...DEFAULT_LIMITS, ...limits };
    this.sessions = new Map();
  }

  createRun(source) {
    if (typeof source !== 'string' || !source.trim()) throw new Error('请先输入代码');
    if (Buffer.byteLength(source, 'utf8') > 256 * 1024) throw new Error('代码超过 256 KiB，请缩小后运行');
    if ([...this.sessions.values()].some((item) => !item.terminal)) throw new Error('已有程序在运行，请先停止');
    const runId = randomUUID();
    let resolveDone;
    const done = new Promise((resolve) => { resolveDone = resolve; });
    this.sessions.set(runId, { runId, source, terminal: false, stopping: false, started: false, child: null, directory: null, outputBytes: 0, outputLimitReached: false, done, resolveDone });
    return { runId };
  }

  emit(session, type, fields = {}) {
    if (session.terminal) return;
    this.onEvent({ runId: session.runId, type, ...fields });
  }

  finish(session, type, fields = {}) {
    if (session.terminal) return;
    this.emit(session, type, fields);
    session.terminal = true;
  }

  async start(runId) {
    const session = this.sessions.get(runId);
    if (!session || session.started || session.terminal) return;
    session.started = true;
    try {
      this.emit(session, 'compiling', { text: '正在编译…' });
      await fs.access(this.compiler.c);
      await fs.access(this.compiler[this.language]);
      if (session.stopping) return;
      session.directory = await fs.mkdtemp(path.join(os.tmpdir(), 'yuwen-code-'));
      const sourcePath = path.join(session.directory, this.language === 'c' ? 'main.c' : 'main.cpp');
      const bootstrapPath = path.join(session.directory, 'learning-io.c');
      const objectPath = path.join(session.directory, 'learning-io.o');
      const programPath = path.join(session.directory, 'program.exe');
      await fs.writeFile(sourcePath, session.source, 'utf8');
      await fs.writeFile(bootstrapPath, BOOTSTRAP, 'utf8');
      const deadline = Date.now() + this.limits.compileMs;
      let result = await this.execute(session, this.compiler.c, ['-std=c17', '-fno-color-diagnostics', '-c', bootstrapPath, '-o', objectPath], 'compile', Math.max(1, deadline - Date.now()));
      if (session.stopping || session.terminal) return;
      if (result.code !== 0) return this.finish(session, 'compile-error', { text: result.stderr || '编译运行环境失败', code: result.code });
      const standard = this.language === 'c' ? 'c17' : 'c++17';
      result = await this.execute(session, this.compiler[this.language], [`-std=${standard}`, '-fno-color-diagnostics', '-finput-charset=UTF-8', '-fexec-charset=UTF-8', '-Wall', '-Wextra', '-static', sourcePath, objectPath, '-o', programPath], 'compile', Math.max(1, deadline - Date.now()));
      if (session.stopping || session.terminal) return;
      if (result.code !== 0) return this.finish(session, 'compile-error', { text: result.stderr || '编译失败，请检查代码', code: result.code });
      if (result.stderr) this.emit(session, 'stderr', { text: result.stderr });
      this.emit(session, 'running', { text: '编译通过，程序开始运行。' });
      result = await this.execute(session, programPath, [], 'run', this.limits.runMs);
      if (!session.stopping && !session.terminal) this.finish(session, 'exit', { code: result.code, text: result.code === 0 ? '程序运行结束' : `程序异常结束（退出码 ${result.code ?? '未知'}）` });
    } catch (error) {
      if (!session.terminal && !session.stopping) {
        const text = error.code === 'ENOENT' ? '找不到内置编译器，请重新完整安装软件。' : `无法运行：${error.message}`;
        this.finish(session, 'error', { text });
      }
    } finally {
      if (session.stopping && !session.terminal) this.finish(session, 'stopped', { text: '已停止运行' });
      if (session.directory) await fs.rm(session.directory, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }).catch(() => {});
      this.sessions.delete(runId);
      session.resolveDone();
    }
  }

  execute(session, executable, args, phase, timeoutMs) {
    if (session.stopping || session.terminal) return Promise.resolve({ code: null, stderr: '' });
    return new Promise((resolve, reject) => {
      const child = spawn(executable, args, { cwd: session.directory, windowsHide: true, shell: false, detached: process.platform !== 'win32', env: executionEnvironment(this.compiler.bin), stdio: ['pipe', 'pipe', 'pipe'] });
      session.child = child;
      session.phase = phase;
      const stdoutDecoder = new StringDecoder('utf8');
      const stderrDecoder = new StringDecoder('utf8');
      let stderr = '';
      let settled = false;
      child.stdin.on('error', () => {});
      const timeout = setTimeout(() => {
        const text = phase === 'compile' ? '编译超时，已停止。' : '运行超过时间限制，已停止。';
        this.finish(session, 'error', { text });
        session.stopping = true;
        void killTree(child);
      }, timeoutMs);
      const output = (data, decoder, type) => {
        if (session.terminal || session.stopping) return;
        const available = this.limits.outputBytes - session.outputBytes;
        if (data.length > available) {
          const chunk = available > 0 ? decoder.write(data.subarray(0, available)) : '';
          if (phase === 'compile') stderr += chunk;
          else if (chunk) this.emit(session, type, { text: chunk });
          session.outputBytes = this.limits.outputBytes;
          session.outputLimitReached = true;
          this.finish(session, 'error', { text: '输出超过 1 MiB，已停止程序。' });
          session.stopping = true;
          void killTree(child);
          return;
        }
        session.outputBytes += data.length;
        const text = decoder.write(data);
        if (phase === 'compile') stderr += text;
        else if (text) this.emit(session, type, { text });
      };
      child.stdout.on('data', (data) => output(data, stdoutDecoder, 'stdout'));
      child.stderr.on('data', (data) => output(data, stderrDecoder, 'stderr'));
      child.once('error', (error) => { clearTimeout(timeout); settled = true; reject(error); });
      child.once('close', (code) => {
        clearTimeout(timeout);
        if (session.child === child) session.child = null;
        const stdoutTail = stdoutDecoder.end();
        const stderrTail = stderrDecoder.end();
        if (phase === 'compile') stderr += stdoutTail + stderrTail;
        else {
          if (stdoutTail) this.emit(session, 'stdout', { text: stdoutTail });
          if (stderrTail) this.emit(session, 'stderr', { text: stderrTail });
        }
        if (!settled) resolve({ code, stderr: this.cleanDiagnostics(stderr, session.directory) });
      });
    });
  }

  cleanDiagnostics(text, directory) {
    if (!directory) return text;
    return text.split(directory + path.sep).join('').split(directory.replaceAll('\\', '/') + '/').join('');
  }

  writeInput(runId, text) {
    const session = this.sessions.get(runId);
    if (!session || session.terminal || session.phase !== 'run' || !session.child?.stdin?.writable) throw new Error('程序当前没有等待输入');
    if (typeof text !== 'string' || Buffer.byteLength(text, 'utf8') > 64 * 1024) throw new Error('输入内容无效或超过 64 KiB');
    session.child.stdin.write(text, 'utf8');
  }

  endInput(runId) {
    const session = this.sessions.get(runId);
    if (!session || session.terminal || session.phase !== 'run' || !session.child?.stdin?.writable) throw new Error('程序当前没有可关闭的输入');
    session.child.stdin.end();
  }

  async stop(runId) {
    const session = this.sessions.get(runId);
    if (!session || session.terminal) return;
    session.stopping = true;
    if (!session.started) {
      this.finish(session, 'stopped', { text: '已取消运行' });
      this.sessions.delete(runId);
      session.resolveDone();
      return;
    }
    await killTree(session.child);
    await session.done;
  }

  async dispose() {
    await Promise.all([...this.sessions.keys()].map((runId) => this.stop(runId)));
  }
}

module.exports = { RuntimeRunner, compilerPaths, killTree, DEFAULT_LIMITS, executionEnvironment };
