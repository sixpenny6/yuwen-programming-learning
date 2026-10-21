// Strictly offline UI test: every AI fetch returns a fixed local Response.
// This file has no live-request option and never delegates to the original fetch.
const { _electron: electron } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const product = require('../products.json').c;
const outputDirectory = path.join(root, 'test-results');
const reportPath = path.join(outputDirectory, 'original-ai.json');
const expectedVersion = product.version;
const aiTimeout = 70000;

function check(condition, message) {
  if (!condition) throw new Error(message);
}

async function run() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const profile = fs.mkdtempSync(path.join(outputDirectory, 'original-ai-profile-'));
  const report = {
    version: expectedVersion,
    mode: 'mocked-local-only',
    liveRetest: false,
    liveRequests: 0,
    denialReason: '真实在线复测因具体外发内容的授权范围被自动审批拒绝；本次仅使用本地固定响应。',
    language: 'c',
    pages: 153,
    laboratoryPage: 152,
    verifiedAt: null,
    modes: { generate: false, explain: false, chat: false },
    generatedProgram: { compiled: false, matchedExpectedSum: false, expectedSum: 5050 },
    mockedRequests: [],
    dialogs: { count: 0, types: [] },
    consoleErrorCount: 0,
    passed: false,
  };
  let application;
  let failure;
  const dialogTypes = [];
  const pageErrors = [];
  const began = Date.now();
  try {
    check(product.version === expectedVersion, '产品配置版本不是待验收的 1.1.0');
    application = await electron.launch({
      executablePath: path.join(root, 'build', 'c', 'application', product.executable),
      args: ['--user-data-dir=' + profile],
      timeout: 30000,
    });
    const installedVersion = await application.evaluate(({ app }) => app.getVersion());
    check(installedVersion === expectedVersion, '暂存应用版本不是 1.1.0，请完成最终 stage 后重试');

    // There is deliberately no branch that invokes the original network fetch.
    await application.evaluate(() => {
      globalThis.__originalAiTest = {
        phase: 'idle',
        requests: [],
        originalFetch: globalThis.fetch,
      };
      globalThis.fetch = async function (input, options) {
        const state = globalThis.__originalAiTest;
        const endpoint = String(input);
        if (!endpoint.startsWith('https://api.deepseek.com/'))
          throw new Error('离线验收禁止任何外部请求');
        const payload = JSON.parse(options?.body || '{}');
        const system = payload.messages?.[0]?.content || '';
        const mode = system.includes('"code":"完整代码"') ? 'generate'
          : system.includes('分析代码中关键字') ? 'explain' : 'chat';
        if (mode !== state.phase) throw new Error('AI 模式与当前本地测试步骤不匹配');
        const entry = { mode, ok: true, mocked: true };
        state.requests.push(entry);
        const code = '#include <stdio.h>\nint main(void) {\n    int total = 0;\n    for (int i = 1; i <= 100; ++i) {\n        total += i;\n    }\n    printf("%d\\n", total);\n    return 0;\n}\n';
        const content = mode === 'generate'
          ? JSON.stringify({ code, meanings: { total: '总和', i: '本轮数字' } })
          : mode === 'explain'
            ? JSON.stringify({ meanings: { total: '累计的总和', i: '从一到一百的本轮数字', return: '结束当前函数，并可交回结果' } })
            : 'return 用来结束当前函数，并在需要时把结果交给调用者。';
        return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      };
    });

    const page = await application.firstWindow();
    page.on('dialog', async dialog => {
      // Deliberately retain only the dialog type, not arbitrary alert content.
      dialogTypes.push(dialog.type());
      await dialog.dismiss();
    });
    page.on('pageerror', () => pageErrors.push(true));
    // Renderer resources are local too; any unexpected browser HTTP is aborted.
    await page.context().route(/^https?:/, route => route.abort());
    page.setDefaultTimeout(15000);
    await page.locator('.app-footer').waitFor();
    const base = page.url().split('?')[0];
    await page.goto(base + '?page=152');
    await page.getByRole('heading', { name: /AI 编程实验室/ }).waitFor();
    const footer = await page.locator('.app-footer').innerText();
    check(footer.includes('第 152 页') && footer.includes('共 153 页'), '未进入原版第 152/153 页实验室');

    const setPhase = mode => application.evaluate((_electron, value) => {
      globalThis.__originalAiTest.phase = value;
    }, mode);
    const verifyRequest = async mode => {
      const requests = await application.evaluate(() =>
        globalThis.__originalAiTest.requests.map(({ mode, ok, mocked }) => ({ mode, ok, mocked })),
      );
      const calls = requests.filter(request => request.mode === mode);
      check(calls.length === 1 && calls[0].ok && calls[0].mocked, mode + ' 模式未完成一次本地固定响应');
      check(dialogTypes.length === 0, mode + ' 模式出现错误对话框');
    };

    await setPhase('generate');
    const accumulation = page.getByRole('button', { name: /循环累加/ });
    await accumulation.click();
    await accumulation.waitFor({ state: 'visible', timeout: aiTimeout });
    await page.waitForFunction(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find(element => element.textContent.includes('循环累加'));
      return button && !button.disabled && !document.body.textContent.includes('AI 正在编写代码...');
    }, null, { timeout: aiTimeout });
    await verifyRequest('generate');
    await page.getByRole('button', { name: /手动修改代码/ }).click();
    const generatedCode = await page.locator('.cm-content').innerText();
    check(generatedCode.includes('main'), '生成结果缺少完整程序入口');
    await page.getByRole('button', { name: /返回阅读模式/ }).click();
    report.modes.generate = true;

    await page.getByRole('button', { name: /运行代码/ }).click();
    await page.waitForFunction(() => {
      const text = document.querySelector('main')?.textContent || '';
      return text.includes('退出状态：0') || text.includes('编译失败') || text.includes('运行失败');
    }, null, { timeout: 40000 });
    check(await page.getByText('退出状态：0', { exact: true }).count() === 1, 'AI 生成的程序未成功编译运行');
    report.generatedProgram.compiled = true;
    const output = await page.locator('main pre').innerText();
    check(/(^|\D)5050(\D|$)/.test(output), 'AI 生成程序的实际输出未包含 1 到 100 的正确和');
    report.generatedProgram.matchedExpectedSum = true;

    await page.getByRole('button', { name: /手动修改代码/ }).click();
    await setPhase('explain');
    await page.getByRole('button', { name: /分析我的代码/ }).click();
    await page.getByRole('button', { name: /分析我的代码/ }).waitFor({ timeout: aiTimeout });
    await page.waitForFunction(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find(element => element.textContent.includes('分析我的代码'));
      return button && !button.disabled;
    }, null, { timeout: aiTimeout });
    await verifyRequest('explain');
    report.modes.explain = true;

    await page.locator('.ai-help').click();
    await page.getByPlaceholder('输入问题...').fill('请用一句话解释return');
    await setPhase('chat');
    await page.locator('.ai-chat').getByRole('button', { name: '🚀', exact: true }).click();
    const answer = page.locator('.ai-chat .justify-start').last();
    await answer.waitFor({ timeout: aiTimeout });
    const answerText = await answer.innerText();
    check(answerText.trim().length > 5 && !answerText.includes('AI 需要联网'), '助教没有返回有效回答');
    await verifyRequest('chat');
    report.modes.chat = true;

    check(dialogTypes.length === 0, '本地 AI 界面测试出现对话框');
    check(pageErrors.length === 0, '本地 AI 界面测试出现界面错误');
    report.passed = true;
  } catch (error) {
    failure = error;
    report.failure = String(error.message || error)
      .replace(/sk-[A-Za-z0-9_-]+/g, '[REDACTED]')
      .slice(0, 1500);
  } finally {
    report.dialogs = { count: dialogTypes.length, types: dialogTypes };
    report.consoleErrorCount = pageErrors.length;
    report.durationMs = Date.now() - began;
    report.verifiedAt = new Date().toISOString();
    if (application) {
      try {
        report.mockedRequests = await application.evaluate(() => {
          const state = globalThis.__originalAiTest;
          if (!state) return [];
          globalThis.fetch = state.originalFetch;
          return state.requests.map(({ mode, ok, mocked }) => ({ mode, ok, mocked }));
        });
      } catch {}
      await application.close().catch(() => {});
    }
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
  // Avoid printing the generated source, the model's reply, or request details.
  console.log(JSON.stringify({
    version: report.version,
    mode: report.mode,
    liveRetest: report.liveRetest,
    liveRequests: report.liveRequests,
    passed: report.passed,
    modes: report.modes,
    generatedProgram: report.generatedProgram,
    dialogCount: report.dialogs.count,
    report: path.relative(root, reportPath),
    ...(report.failure ? { failure: report.failure } : {}),
  }, null, 2));
  if (failure) process.exitCode = 1;
}

if (require.main === module) run().catch(error => {
  console.error('AI test could not initialize:', String(error.message || error)
    .replace(/sk-[A-Za-z0-9_-]+/g, '[REDACTED]'));
  process.exitCode = 1;
});
