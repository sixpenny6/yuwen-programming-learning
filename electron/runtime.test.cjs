const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { RuntimeRunner, compilerPaths, executionEnvironment } = require('./runtime.cjs');
const { createMessages, parseAiJson } = require('./ai.cjs');

const compilerRoot = process.env.LEARNING_COMPILER_ROOT || path.resolve(__dirname, '../vendor/compiler');
const paths = compilerPaths(compilerRoot);
const available = fs.existsSync(paths.c) && fs.existsSync(paths.cpp);
const runtimeOptions = { skip: !available, timeout: 60000 };

async function execute(language, source, { limits, onEvent } = {}) {
  const events = [];
  let directory;
  const runner = new RuntimeRunner({ compilerRoot, language, limits, onEvent: (event) => { events.push(event); directory ||= runner.sessions.get(event.runId)?.directory; onEvent?.(event, runner); } });
  const { runId } = runner.createRun(source);
  assert.deepEqual(events, [], 'runId must be returned before the first event');
  const running = runner.start(runId);
  try { await running; } finally { await runner.dispose(); }
  assert.equal(runner.sessions.size, 0, 'temporary run state must be cleaned');
  await assert.doesNotReject(() => runner.stop(runId), 'stopping a completed run is idempotent');
  if (directory) assert.equal(fs.existsSync(directory), false, 'temporary source and executable must be removed');
  return { runId, events, text: events.filter((event) => event.type === 'stdout').map((event) => event.text).join('').replaceAll('\r\n', '\n') };
}

test('AI prompts use C17/C++17 and strict JSON without reading credentials', () => {
  const c = createMessages('c', { mode: 'generate', message: '两个数相加' });
  const cpp = createMessages('cpp', { mode: 'generate', message: '两个数相加' });
  assert.match(c[0].content, /C17/);
  assert.match(c[0].content, /scanf/);
  assert.match(cpp[0].content, /C\+\+17/);
  assert.match(cpp[0].content, /std::cin/);
  assert.deepEqual(JSON.parse(parseAiJson('```json\n{"code":"int main(void){return 0;}","meanings":{"main":"起点"}}\n```', 'generate')), { code: 'int main(void){return 0;}', meanings: { main: '起点' } });
  assert.throws(() => parseAiJson('{"code":123,"meanings":{}}', 'generate'), /缺少/);
  assert.throws(() => createMessages('c', { mode: 'unknown' }), /无效/);
});

test('compiled programs do not inherit AI credentials or unrelated environment variables', () => {
  process.env.LEARNING_TEST_SECRET = 'test-value';
  try { assert.equal(executionEnvironment(paths.bin).LEARNING_TEST_SECRET, undefined); }
  finally { delete process.env.LEARNING_TEST_SECRET; }
});

test('C17 compiles and prints intact Chinese text', runtimeOptions, async () => {
  const result = await execute('c', '#include <stdio.h>\nint main(void){printf("你好，C！\\n%d\\n", 1+2);return 0;}');
  assert.equal(result.text, '你好，C！\n3\n');
  assert.equal(result.events.at(-1).type, 'exit');
  assert.equal(result.events.at(-1).code, 0);
});

test('C++17 uses the real standard library and Chinese output', runtimeOptions, async () => {
  const result = await execute('cpp', '#include <iostream>\n#include <vector>\n#include <numeric>\nint main(){std::vector<int> numbers{2,3,4}; std::cout << "总和=" << std::accumulate(numbers.begin(), numbers.end(), 0) << "\\n";}');
  assert.equal(result.text, '总和=9\n');
  assert.equal(result.events.at(-1).code, 0);
});

test('UTF-8 characters stay intact when emitted one byte at a time', runtimeOptions, async () => {
  const result = await execute('c', '#include <stdio.h>\n#include <windows.h>\nint main(void){const unsigned char text[]="中文🙂";for(unsigned i=0;i<sizeof text-1;i++){putchar(text[i]);Sleep(5);}return 0;}');
  assert.equal(result.text, '中文🙂');
  assert.ok(!result.text.includes('\uFFFD'));
});

test('C prompts flush without newline and accept two separate inputs', runtimeOptions, async () => {
  let stage = 0;
  const result = await execute('c', '#include <stdio.h>\nint main(void){int a,b;printf("第一个>");if(scanf("%d",&a)!=1)return 2;printf("第二个>");if(scanf("%d",&b)!=1)return 3;printf("答案=%d\\n",a+b);return 0;}', { onEvent: (event, runner) => {
    if (event.type === 'stdout' && stage === 0 && event.text.includes('第一个>')) { stage = 1; runner.writeInput(event.runId, '12\n'); }
    if (event.type === 'stdout' && stage === 1 && event.text.includes('第二个>')) { stage = 2; runner.writeInput(event.runId, '30\n'); }
  } });
  assert.equal(stage, 2);
  assert.equal(result.text, '第一个>第二个>答案=42\n');
  assert.equal(result.events.at(-1).code, 0);
});

test('C++ tied input preserves prompts and supports multiple reads', runtimeOptions, async () => {
  let stage = 0;
  const result = await execute('cpp', '#include <iostream>\nint main(){int a,b;std::cout<<"甲>";std::cin>>a;std::cout<<"乙>";std::cin>>b;std::cout<<a*b<<"\\n";}', { onEvent: (event, runner) => {
    if (event.type === 'stdout' && stage === 0 && event.text.includes('甲>')) { stage = 1; runner.writeInput(event.runId, '6\n'); }
    if (event.type === 'stdout' && stage === 1 && event.text.includes('乙>')) { stage = 2; runner.writeInput(event.runId, '7\n'); }
  } });
  assert.equal(stage, 2);
  assert.equal(result.text, '甲>乙>42\n');
});

test('explicit EOF closes input for a read-until-end program', runtimeOptions, async () => {
  let sent = false;
  const result = await execute('c', '#include <stdio.h>\nint main(void){char text[128];puts("ready");while(fgets(text,sizeof text,stdin)){printf("收到:%s",text);}puts("EOF");return 0;}', { onEvent: (event, runner) => {
    if (event.type === 'stdout' && !sent && event.text.includes('ready')) { sent = true; runner.writeInput(event.runId, '中文输入\n第二行\n'); runner.endInput(event.runId); }
  } });
  assert.equal(result.text, 'ready\n收到:中文输入\n收到:第二行\nEOF\n');
  assert.equal(result.events.at(-1).code, 0);
});

test('syntax errors show a compile error and never run', runtimeOptions, async () => {
  const result = await execute('c', '#include <stdio.h>\nint main(void){ printf("x") return 0; }');
  assert.equal(result.events.at(-1).type, 'compile-error');
  assert.match(result.events.at(-1).text, /main\.c/);
  assert.ok(!result.events.some((event) => event.type === 'running'));
  assert.ok(!result.events.at(-1).text.includes('yuwen-code-'));
});

test('stop terminates an infinite loop and permits another run', runtimeOptions, async () => {
  let stopping;
  const result = await execute('c', '#include <stdio.h>\nint main(void){puts("started");for(;;){} }', { onEvent: (event, runner) => { if (event.type === 'stdout' && !stopping) stopping = runner.stop(event.runId); } });
  await stopping;
  assert.equal(result.events.at(-1).type, 'stopped');
});

test('output limit stops a flooding program', runtimeOptions, async () => {
  const result = await execute('c', '#include <stdio.h>\nint main(void){for(;;)puts("abcdefghijklmnopqrstuvwxyz");}', { limits: { outputBytes: 4096 } });
  assert.equal(result.events.at(-1).type, 'error');
  assert.match(result.events.at(-1).text, /输出超过/);
  assert.ok(Buffer.byteLength(result.text) <= 4096);
});

test('runtime timeout terminates an infinite program', runtimeOptions, async () => {
  const result = await execute('c', 'int main(void){for(;;){} }', { limits: { runMs: 250 } });
  assert.equal(result.events.at(-1).type, 'error');
  assert.match(result.events.at(-1).text, /时间限制/);
});

test('compilation has a separate timeout and never starts student code afterwards', runtimeOptions, async () => {
  const result = await execute('cpp', '#include <iostream>\nint main(){std::cout<<"should not run";}', { limits: { compileMs: 1 } });
  assert.equal(result.events.at(-1).type, 'error');
  assert.match(result.events.at(-1).text, /编译超时/);
  assert.ok(!result.events.some((event) => event.type === 'running'));
});

test('nonzero exit is surfaced as the actual exit code', runtimeOptions, async () => {
  const result = await execute('cpp', 'int main(){return 7;}');
  assert.equal(result.events.at(-1).type, 'exit');
  assert.equal(result.events.at(-1).code, 7);
});

test('queued runs can be cancelled before compiler events', async () => {
  const events = [];
  const runner = new RuntimeRunner({ compilerRoot, language: 'c', onEvent: (event) => events.push(event) });
  const { runId } = runner.createRun('int main(void){return 0;}');
  assert.throws(() => runner.createRun('int main(void){return 0;}'), /已有/);
  await runner.stop(runId);
  await runner.start(runId);
  assert.deepEqual(events.map((event) => event.type), ['stopped']);
  assert.equal(runner.sessions.size, 0);
});

test('Windows stop kills descendants as well as the compiled program', { ...runtimeOptions, skip: !available || process.platform !== 'win32' }, async () => {
  let descendant;
  let stopping;
  const source = '#include <windows.h>\n#include <stdio.h>\nint main(int argc,char **argv){if(argc>1){for(;;)Sleep(100);}char exe[MAX_PATH],command[MAX_PATH+30];GetModuleFileNameA(NULL,exe,MAX_PATH);snprintf(command,sizeof command,"\\"%s\\" child",exe);STARTUPINFOA si={0};PROCESS_INFORMATION pi={0};si.cb=sizeof(si);if(!CreateProcessA(NULL,command,NULL,NULL,FALSE,CREATE_NO_WINDOW,NULL,NULL,&si,&pi))return 4;printf("child:%lu\\n",pi.dwProcessId);CloseHandle(pi.hThread);CloseHandle(pi.hProcess);for(;;)Sleep(100);}';
  const result = await execute('c', source, { onEvent: (event, runner) => {
    if (event.type === 'stdout' && !stopping) {
      const match = event.text.match(/child:(\d+)/);
      if (match) { descendant = Number(match[1]); stopping = runner.stop(event.runId); }
    }
  } });
  await stopping;
  assert.ok(descendant);
  assert.equal(result.events.at(-1).type, 'stopped');
  assert.throws(() => process.kill(descendant, 0));
});
