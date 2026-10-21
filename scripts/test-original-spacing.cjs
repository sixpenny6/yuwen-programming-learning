const { _electron: electron } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const products = require('../products.json');
const resultDirectory = path.join(root, 'test-results');
const screenshots = path.join(resultDirectory, 'original-ui');
const previousUiReport = path.join(resultDirectory, 'original-ui.json');
const digest = filename => createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
const previousUiHash = fs.existsSync(previousUiReport) ? digest(previousUiReport) : null;
const report = {
  generatedAt: new Date().toISOString(),
  scope: 'Targeted display regression after the original UI and installer suites passed: only SplitToken code-text white-space was changed to pre. No course compilation or installer tests are repeated here.',
  originalUiReportUnchanged: false,
  originalUiReportSha256: previousUiHash,
  expectedScreenshots: 14,
  screenshotPlan: { '1400x1000': [20, 75, 114, 152], '760x540': [4, 20, 152] },
  languages: [],
  ok: false,
};
fs.mkdirSync(screenshots, { recursive: true });

async function testLanguage(language) {
  const product = products[language];
  const applicationDirectory = path.join(root, 'build', language, 'application');
  const result = {
    language,
    executable: product.executable,
    asarSha256: digest(path.join(applicationDirectory, 'resources', 'app.asar')),
    independentProfile: path.join(screenshots, `spacing-profile-${language}-${Date.now()}`),
    resolutions: [], codeWhitespace: [], essayColourStages: [], screenshots: [], pageErrors: [], passed: false,
  };
  report.languages.push(result);
  const app = await electron.launch({
    executablePath: path.join(applicationDirectory, product.executable),
    args: ['--user-data-dir=' + result.independentProfile], timeout: 30000,
  });
  try {
    const page = await app.firstWindow();
    page.on('pageerror', error => result.pageErrors.push(error.message));
    await page.context().route(/^https?:/, route => route.abort());
    await page.locator('.app-footer').waitFor();
    const base = page.url().split('?')[0];
    async function go(number) {
      await page.goto(base + '?page=' + number);
      await page.locator('.app-footer').waitFor();
      await page.waitForFunction(number => document.querySelector('.app-footer')?.innerText.includes('第 ' + number + ' 页'), number);
      await page.waitForTimeout(700);
      assert((await page.locator('.app-footer').innerText()).includes('共 153 页'));
    }
    async function geometry() {
      return page.evaluate(() => {
        const result = { viewportWidth: innerWidth, viewportHeight: innerHeight };
        for (const selector of ['.app-header', '.app-footer', 'main']) {
          const rect = document.querySelector(selector).getBoundingClientRect();
          result[selector] = { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom };
        }
        return result;
      });
    }
    function assertGeometry(value) {
      assert(value['.app-footer'].x >= -1 && value['.app-footer'].right <= value.viewportWidth + 1, 'Footer horizontal clipping');
      assert(value['.app-footer'].bottom <= value.viewportHeight + 1, 'Footer vertical clipping');
      assert(value.main.x >= -1 && value.main.right <= value.viewportWidth + 1, 'Main horizontal clipping');
    }
    async function readCodeWhitespace(number, width, height) {
      const values = await page.locator('main span.group > span.font-mono').evaluateAll(nodes => nodes.map(node => ({
        text: node.textContent, whiteSpace: getComputedStyle(node).whiteSpace,
      })));
      assert(values.length > 0, `No SplitToken code spans at page ${number}`);
      assert(values.every(value => value.whiteSpace === 'pre'), `Collapsed whitespace at page ${number}`);
      const leading = values.filter(value => /^\s+\S/.test(value.text));
      if (number === 114) assert(leading.length > 0, 'The essay regression fixture must include leading spaces');
      result.codeWhitespace.push({ width, height, page: number, spans: values.length, allComputedWhiteSpacePre: true, leadingSpaceSpans: leading.map(value => value.text) });
    }
    async function checkEssayStages(width, height) {
      const next = page.getByRole('button', { name: '下一步 ➡', exact: true });
      for (let count = 0; count < 3; ++count) await next.click();
      await page.waitForTimeout(700);
      // The preserved six-step essay shows coloured part-of-speech dots after
      // three clicks. Its text colours appear on the following original step.
      const dots = await page.locator('main span.group > span.font-mono').evaluateAll(nodes => nodes.map(node => {
        const dot = node.previousElementSibling, style = getComputedStyle(dot);
        return { classes: dot.className, opacity: Number(style.opacity), background: style.backgroundColor };
      }));
      for (const tokenClass of ['bg-purple-600', 'bg-red-500', 'bg-green-700']) {
        assert(dots.some(dot => dot.classes.includes(tokenClass) && dot.opacity > 0.99 && dot.background !== 'rgba(0, 0, 0, 0)'), `Missing original visible colour dot ${tokenClass}`);
      }
      await next.click();
      await page.waitForTimeout(700);
      const text = await page.locator('main span.group > span.font-mono').evaluateAll(nodes => nodes.map(node => ({
        classes: node.className, color: getComputedStyle(node).color, whiteSpace: getComputedStyle(node).whiteSpace,
      })));
      for (const tokenClass of ['text-purple-600', 'text-red-500', 'text-green-700']) assert(text.some(token => token.classes.includes(tokenClass)), `Missing original text classification ${tokenClass}`);
      assert(text.every(token => token.whiteSpace === 'pre'), 'Whitespace regressed after teaching steps');
      result.essayColourStages.push({ width, height, page: 114, afterThreeClicks: 'original purple/red/green dots visible', afterFourClicks: 'original text colours visible', originalSixStepMappingPreserved: true });
    }
    for (const [width, height] of [[1400, 1000], [1000, 700], [760, 540], [1920, 1080]]) {
      await app.evaluate(({ BrowserWindow }, size) => BrowserWindow.getAllWindows()[0].setSize(...size), [width, height]);
      await go(20);
      assertGeometry(await geometry());
      const previous = page.locator('.app-footer button').first(), next = page.locator('.app-footer button').last();
      assert(await previous.isEnabled() && await next.isEnabled());
      await previous.click();
      await page.waitForFunction(() => document.querySelector('.app-footer')?.innerText.includes('第 19 页'));
      await next.click();
      await page.waitForFunction(() => document.querySelector('.app-footer')?.innerText.includes('第 20 页'));
      await page.getByTitle('展开导航', { exact: true }).click();
      await page.getByTitle('收起导航', { exact: true }).waitFor();
      await page.waitForTimeout(700);
      assertGeometry(await geometry());
      await page.getByTitle('收起导航', { exact: true }).click();
      await page.getByTitle('展开导航', { exact: true }).waitFor();
      result.resolutions.push({ width, height, previousAndNextClickable: true, sidebarExpandAndCollapse: true, mainAndFooterWithinViewport: true });

      const capturePages = report.screenshotPlan[`${width}x${height}`] || [];
      const pageNumbers = [...new Set([20, 75, 114, ...capturePages])];
      for (const number of pageNumbers) {
        await go(number);
        assertGeometry(await geometry());
        if ([20, 75, 114].includes(number)) await readCodeWhitespace(number, width, height);
        if (capturePages.includes(number)) {
          const filename = `${language}-${width}x${height}-page-${number}.png`;
          await page.screenshot({ path: path.join(screenshots, filename) });
          result.screenshots.push(filename);
        }
        if (number === 114) await checkEssayStages(width, height);
      }
      console.log(`PASS ${language} ${width}x${height}: spacing, original colour steps, navigation`);
    }
    assert.equal(result.screenshots.length, 7);
    assert.deepEqual(result.pageErrors, []);
    result.passed = true;
  } catch (error) {
    result.error = String(error?.stack || error);
    throw error;
  } finally { await app.close(); }
}

(async () => {
  for (const language of ['c', 'cpp']) {
    try { await testLanguage(language); }
    catch (error) { console.error(`${language} spacing regression failed: ${error.message}`); }
  }
  report.originalUiReportUnchanged = previousUiHash === (fs.existsSync(previousUiReport) ? digest(previousUiReport) : null);
  report.screenshotsUpdated = report.languages.reduce((sum, language) => sum + language.screenshots.length, 0);
  report.ok = report.languages.length === 2 && report.languages.every(language => language.passed) && report.screenshotsUpdated === 14 && report.originalUiReportUnchanged;
  fs.writeFileSync(path.join(resultDirectory, 'original-spacing.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ ok: report.ok, languages: report.languages.map(value => ({ language: value.language, passed: value.passed })), screenshotsUpdated: report.screenshotsUpdated, originalUiReportUnchanged: report.originalUiReportUnchanged, report: 'test-results/original-spacing.json' }));
  process.exitCode = report.ok ? 0 : 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
