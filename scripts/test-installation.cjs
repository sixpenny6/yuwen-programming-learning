const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawn, spawnSync } = require("node:child_process");
const assert = require("node:assert/strict");
const { _electron: electron } = require("playwright");
const root = path.resolve(__dirname, "..");
const products = require("../products.json");
const testRoot = path.join(root, "test-results", "安装 验收-" + Date.now());
const snapshots = {};
const apps = [];
const report = [];
function command(executable, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(executable, args, {
      windowsHide: true,
      shell: false,
      windowsVerbatimArguments: true,
      stdio: "pipe",
    });
    let output = "";
    p.stdout.on("data", (d) => (output += d));
    p.stderr.on("data", (d) => (output += d));
    p.once("error", reject);
    p.once("close", (code) =>
      code === 0
        ? resolve(output)
        : reject(
            new Error(`${path.basename(executable)} exit ${code}: ${output}`),
          ),
    );
  });
}
function registration(product) {
  return (
    spawnSync(
      "reg.exe",
      [
        "query",
        `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${product.appId}`,
      ],
      { encoding: "utf8", windowsHide: true },
    ).stdout || ""
  );
}
async function hashFile(file) {
  const hash = crypto.createHash("sha256");
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  await fsp.mkdir(testRoot, { recursive: true });
  for (const language of ["c", "cpp"]) {
    const product = products[language];
    snapshots[language] = registration(product);
    const destination = path.join(
      testRoot,
      language === "c" ? "C 教学" : "C++ 教学",
    );
    const setup = path.join(
      root,
      "releases",
      `${product.name} Setup ${product.version}.exe`,
    );
    await command(setup, ["/S", "/TEST", "/D=" + destination]);
    assert(
      fs.existsSync(path.join(destination, product.executable)),
      "Unicode and spaced installation directory not honored",
    );
    assert.equal(
      registration(product),
      snapshots[language],
      "/TEST must not change official registration",
    );
    const manifest = JSON.parse(
      await fsp.readFile(
        path.join(root, "releases", `${language}-${product.version}-manifest.json`),
        "utf8",
      ),
    );
    let count = 0;
    for (const entry of manifest.files) {
      const file = path.join(destination, entry.path);
      assert.equal((await fsp.stat(file)).size, entry.size, entry.path);
      assert.equal(await hashFile(file), entry.sha256, entry.path);
      count++;
    }
    assert(fs.existsSync(path.join(destination, "Uninstall.exe")));
    console.log(
      `${language}: Setup installed in Unicode/spaced path; ${count} files SHA-256 verified`,
    );
    const app = await electron.launch({
      executablePath: path.join(destination, product.executable),
      args: ["--user-data-dir=" + path.join(testRoot, "profiles", language)],
      timeout: 30000,
    });
    apps.push(app);
    const page = await app.firstWindow();
    await page.locator('.app-footer').waitFor();
    assert.equal(await page.title(), product.name);
    const info = await page.evaluate(() => window.learning.getProduct());
    assert.equal(info.appId, product.appId);
    await page.context().route(/^https?:/, (route) => route.abort());
    const source =
      language === "c"
        ? '#include <stdio.h>\nint main(void){puts("安装验证成功");return 0;}'
        : '#include <iostream>\n#include <vector>\n#include <numeric>\nint main(){std::vector<int>a{1,2,3};std::cout<<"安装验证成功 "<<std::accumulate(a.begin(),a.end(),0)<<"\\n";}';
    await page.evaluate((source) => {
      window.__installedEvents = [];
      window.learning.onRunnerEvent((event) =>
        window.__installedEvents.push(event),
      );
      return window.learning.run(source);
    }, source);
    await page.waitForFunction(
      () =>
        window.__installedEvents.some((event) =>
          ["exit", "compile-error", "error"].includes(event.type),
        ),
      {},
      { timeout: 30000 },
    );
    const result = await page.evaluate(() => ({
      events: window.__installedEvents,
      output: window.__installedEvents
        .filter((e) => e.type === "stdout")
        .map((e) => e.text)
        .join(""),
    }));
    assert.equal(result.events.at(-1).type, "exit");
    assert.equal(result.events.at(-1).code, 0);
    assert(result.output.includes("安装验证成功"));
    report.push({
      language,
      version: product.version,
      directory: destination,
      filesVerified: count,
      installedRuntime: true,
      appId: info.appId,
    });
  }
  const userData = await Promise.all(
    apps.map((app) => app.evaluate(({ app }) => app.getPath("userData"))),
  );
  assert.notEqual(userData[0], userData[1]);
  console.log(
    "Both installed applications run together with independent user data",
  );
  for (const app of apps) await app.close();
  apps.length = 0;
  for (const language of ["c", "cpp"]) {
    const product = products[language];
    const destination = report.find(
      (item) => item.language === language,
    ).directory;
    const note = path.join(destination, "我的笔记.txt");
    await fsp.writeFile(note, "保留用户文件", "utf8");
    await command(path.join(destination, "Uninstall.exe"), ["/S"]);
    for (
      let tries = 0;
      tries < 100 && fs.existsSync(path.join(destination, product.executable));
      tries++
    )
      await sleep(100);
    assert(
      !fs.existsSync(path.join(destination, product.executable)),
      "Uninstall did not remove application payload",
    );
    assert.equal(
      await fsp.readFile(note, "utf8"),
      "保留用户文件",
      "User-created file must remain",
    );
    assert.equal(
      registration(product),
      snapshots[language],
      "/TEST uninstall must not remove official registration",
    );
    if (language === "c")
      assert(
        fs.existsSync(path.join(report[1].directory, products.cpp.executable)),
        "C uninstall affected C++",
      );
    report.find((item) => item.language === language).uninstalled = true;
    report.find((item) => item.language === language).userFilePreserved = true;
    console.log(
      `${language}: uninstall removed owned files, preserved user note and other product`,
    );
  }
  await fsp.writeFile(
    path.join(root, "test-results/installation-verification.json"),
    JSON.stringify(
      {
        verifiedAt: new Date().toISOString(),
        userData,
        results: report,
        scope:
          "Current Windows host; test mode installation, no clean VM claim",
      },
      null,
      2,
    ),
  );
})().catch(async (error) => {
  console.error(error.stack);
  for (const app of apps) await app.close().catch(() => {});
  process.exit(1);
});
