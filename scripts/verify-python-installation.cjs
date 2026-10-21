/** Verify the real Python installation after an explicit in-place deployment.
 * Reads installed files/shortcut and launches with an isolated test profile.
 * No registry or shortcut writes and no AI requests.
 */
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const asar = require('@electron/asar');
const { _electron: electron } = require('playwright');

const root = path.resolve(__dirname, '..');
const updateRoot = path.join(root, 'python-voice-update');
const target = path.resolve('E:\\ai\\python-learning');
const reportPath = path.join(root, 'test-results', 'python-official-installation.json');
function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index < 0) return fallback;
  assert(process.argv[index + 1] && !process.argv[index + 1].startsWith('--'), 'Missing argument: ' + name);
  return process.argv[index + 1];
}
const hashBytes = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function hashFile(file) {
  const hash = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}
function inside(base, file) {
  const absolute = path.resolve(file), relative = path.relative(path.resolve(base), absolute);
  assert(relative && !path.isAbsolute(relative) && relative !== '..' && !relative.startsWith('..' + path.sep), 'Path escapes its permitted directory');
  return absolute;
}
function noReparse(file) {
  let cursor = path.resolve(file);
  for (;;) {
    if (fs.existsSync(cursor)) assert(!fs.lstatSync(cursor).isSymbolicLink(), 'Symlink/junction is not permitted');
    const parent = path.dirname(cursor);
    if (parent === cursor) break;
    cursor = parent;
  }
}
function relativeFile(base, relative) {
  assert(typeof relative === 'string' && relative.length && !path.isAbsolute(relative), 'Expected a relative file path');
  assert(relative.split(/[\\/]/).every(part => part && part !== '.' && part !== '..' && !/[<>:"|?*\x00-\x1f]/.test(part) && !/[. ]$/.test(part)), 'Invalid relative file path');
  const absolute = inside(base, path.join(base, relative));
  noReparse(absolute);
  return absolute;
}
function powershellJSON(script) {
  const executable = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
  const stdout = execFileSync(executable, ['-NoProfile', '-NonInteractive', '-EncodedCommand', Buffer.from(script, 'utf16le').toString('base64')], { encoding: 'utf8', windowsHide: true, timeout: 30000 });
  return JSON.parse(stdout.replace(/^\uFEFF/, '').trim());
}
const report = { schemaVersion: 1, generatedAt: new Date().toISOString(), ok: false, version: '1.0.5', directory: target,
  deployment: 'in-place-files', registryModified: false, shortcutModified: false,
  filesVerified: 0, manifestMatched: false, launched: false, pages: null,
  asarSha256: null, narrationManifestSha256: null, shortcut: null, errors: [],
  evidenceBoundary: 'Payload size/SHA verification, guarded voice/layout changes, unchanged course/AI bundle segments, shared layout stylesheet, native and Electron versions, existing shortcut, recoverable backup hashes, isolated startup and 153-page count. Full layout and media interactions are reported by their separate UI checks.' };
let app;
(async () => {
  try {
    assert.equal(process.platform, 'win32', 'This verifier is for the Windows Python installation');
    const manifestPath = inside(path.join(root, 'releases'), path.resolve(argument('--manifest', path.join(root, 'releases', 'python-1.0.5-manifest.json'))));
    noReparse(manifestPath);
    const manifestBytes = await fsp.readFile(manifestPath), manifest = JSON.parse(manifestBytes);
    assert.equal(manifest.schemaVersion, 1);
    assert.equal(manifest.product.version, '1.0.5');
    assert.equal(manifest.product.appId, 'python-learning');
    assert.equal(path.resolve(manifest.product.installDirectory).toLowerCase(), target.toLowerCase());
    assert.equal(manifest.product.executable, '像学习语文一样学习编程.exe');
    assert.equal(manifest.voicePatchGuards.onlyGuardedVoiceAndLayoutRangesChanged, true);
    assert.equal(manifest.voicePatchGuards.courseDataAndAIByteIdentical, true);
    assert.equal(manifest.voicePatchGuards.layoutUpdated, true);
    assert.equal(manifest.voicePatchGuards.legacyAudioMapAndVoiceRouterRemoved, true);
    assert(manifest.voicePatchGuards.guardedBundleRanges.length >= 2);
    assert.equal(manifest.narration.unchangedFromPython104, true);
    assert.equal(manifest.narration.manifestSha256, '992e522bf121f4ecc0c5aa75a1b582873959bc92d24a6fd071df0495560be196');
    const stage = relativeFile(updateRoot, manifest.payload?.stage || manifest.stage);
    assert(fs.statSync(stage).isDirectory());
    noReparse(target);
    assert(Array.isArray(manifest.files) && manifest.files.length > 0);
    report.payloadManifestSha256 = hashBytes(manifestBytes);
    const seen = new Set();
    const queue = manifest.files.slice();
    for (const item of queue) {
      assert(Number.isSafeInteger(item.size) && item.size >= 0 && /^[a-f0-9]{64}$/.test(item.sha256));
      const key = item.path.toLowerCase(); assert(!seen.has(key), 'Duplicate manifest file'); seen.add(key);
      relativeFile(target, item.path);
    }
    await Promise.all(Array.from({ length: 8 }, async () => {
      for (;;) {
        const item = queue.shift(); if (!item) return;
        const file = relativeFile(target, item.path), stat = await fsp.stat(file);
        assert(stat.isFile() && stat.size === item.size, 'Installed file size differs: ' + item.path);
        assert.equal(await hashFile(file), item.sha256, 'Installed file SHA differs: ' + item.path);
        report.filesVerified++;
      }
    }));
    assert.equal(report.filesVerified, manifest.files.length);
    report.manifestMatched = true;
    const archive = relativeFile(target, 'resources/app.asar');
    report.asarSha256 = await hashFile(archive);
    assert.equal(report.asarSha256, manifest.files.find(item => item.path === 'resources/app.asar')?.sha256);
    const layoutStylesheet = asar.extractFile(archive, path.join('dist', 'course-layout.css'));
    assert.equal(hashBytes(layoutStylesheet), manifest.layout.stylesheetSha256);
    assert(layoutStylesheet.toString('utf8').includes('.course-viewport'));
    const layoutHTML = asar.extractFile(archive, path.join('dist', 'index.html')).toString('utf8');
    const headerReservation = layoutHTML.match(/<style id="python-header-reservation">([^<]+)<\/style>/);
    assert(headerReservation, 'Python legacy header padding override is missing');
    assert.equal(hashBytes(headerReservation[1]), manifest.layout.pythonHeaderReservation.cssSha256);
    assert.equal(headerReservation[1], '.course-app .app-header{padding-right:80px!important}');
    report.layout = { ...manifest.layout, installedStylesheetMatched: true, pythonHeaderReservationMatched: true, courseDataAndAIByteIdentical: true, onlyGuardedVoiceAndLayoutRangesChanged: true };
    const narrationBytes = asar.extractFile(archive, path.join('dist', 'narration', 'manifest.json'));
    report.narrationManifestSha256 = hashBytes(narrationBytes);
    assert.equal(report.narrationManifestSha256, manifest.narration.manifestSha256);
    const narration = JSON.parse(narrationBytes);
    assert.equal(narration.voice.speaker, 'zh-CN-XiaoxiaoNeural');
    assert.equal(narration.voice.engine, 'Microsoft Edge Online TTS');
    assert.equal(narration.voice.synthesisRate, '+0%');
    assert.equal(narration.voice.playbackRate, 1);
    assert.equal(narration.voice.pitch, '+0Hz');
    assert.equal(narration.voice.volume, '+0%');
    assert.equal(narration.fallback.enabled, false);
    assert.equal(narration.fallback.lang, 'zh-CN');
    assert.equal(narration.fallback.rate, 1);
    assert.deepEqual(narration.fallback.preferredVoices, ['Xiaoxiao']);
    assert.equal(Object.keys(narration.entries).length, manifest.narration.rawKeys);
    assert.equal(Object.keys(narration.entries).length, 460);
    assert(Object.entries(narration.entries).every(([key, item]) => item.mode === 'recorded' && item.spokenText === key && !item.file.includes('yaoyao-')));
    report.narration = { rawKeys: Object.keys(narration.entries).length, allRecorded: true, allExactRawText: true, voice: narration.voice };

    const exe = relativeFile(target, manifest.product.executable);
    // EncodedCommand prevents quoting/interpolation of any filesystem path.
    const windows = powershellJSON(`$ErrorActionPreference='Stop';[Console]::OutputEncoding=New-Object Text.UTF8Encoding($false);$exe=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${Buffer.from(exe).toString('base64')}'));$info=(Get-Item -LiteralPath $exe).VersionInfo;$link=Join-Path ([Environment]::GetFolderPath('CommonDesktopDirectory')) '语文式 Python 学习.lnk';if(!(Test-Path -LiteralPath $link -PathType Leaf)){throw 'Existing public Python shortcut is missing'};$shell=New-Object -ComObject WScript.Shell;$shortcut=$shell.CreateShortcut($link);[ordered]@{nativeVersion=@{fileVersion=$info.FileVersion;productVersion=$info.ProductVersion};shortcut=@{path=$link;target=$shortcut.TargetPath;icon=$shortcut.IconLocation}}|ConvertTo-Json -Depth 5 -Compress`);
    report.nativeVersion = windows.nativeVersion;
    assert.equal(windows.nativeVersion.fileVersion, '1.0.5.0');
    assert.equal(windows.nativeVersion.productVersion, '1.0.5');
    report.shortcut = windows.shortcut;
    assert.equal(path.resolve(windows.shortcut.target).toLowerCase(), exe.toLowerCase());
    const icon = windows.shortcut.icon.replace(/,\s*-?\d+\s*$/, '');
    assert.equal(path.resolve(icon).toLowerCase(), relativeFile(target, 'resources/app-icon.ico').toLowerCase());
    assert(fs.statSync(icon).isFile());

    const ledgerArg = argument('--deployment-ledger', null);
    if (ledgerArg) {
      const ledgerPath = inside(path.join(updateRoot, 'private-backups'), path.resolve(ledgerArg));
      noReparse(ledgerPath);
      const ledger = JSON.parse(await fsp.readFile(ledgerPath, 'utf8'));
      assert.equal(ledger.directory.toLowerCase(), target.toLowerCase());
      assert.equal(ledger.payloadManifestSha256, report.payloadManifestSha256);
      assert.equal(ledger.payloadVerified, true);
      assert.equal(ledger.registryModified, false);
      assert.equal(ledger.shortcutModified, false);
      assert.equal(ledger.version, '1.0.5');
      report.backupDirectory = inside(path.join(updateRoot, 'private-backups'), ledger.backupDirectory);
      noReparse(report.backupDirectory);
      report.filesCopied = ledger.filesCopied;
      report.filesUnchanged = ledger.filesUnchanged;
      report.filesBackedUp = ledger.filesBackedUp;
      report.legacyAudio = { moved: ledger.legacyAudio.moved, skipped: ledger.legacyAudio.skipped, missing: ledger.legacyAudio.missing, families: ledger.legacyAudio.families };
      const backups = [...ledger.replaced, ...ledger.legacyAudio.files.filter(item => item.action === 'moved')];
      report.backupFilesVerified = 0;
      for (const item of backups) {
        assert(Number.isSafeInteger(item.size) && item.size >= 0 && /^[a-f0-9]{64}$/.test(item.sha256));
        const file = relativeFile(report.backupDirectory, item.backup), stat = await fsp.stat(file);
        assert(stat.isFile() && stat.size === item.size, 'Recovery backup size differs');
        assert.equal(await hashFile(file), item.sha256, 'Recovery backup SHA differs');
        report.backupFilesVerified++;
      }
    }
    const oldManifest = JSON.parse(await fsp.readFile(path.join(updateRoot, 'legacy-audio-manifest.json'), 'utf8'));
    assert.equal(oldManifest.files.length, 1016);
    const yaoyaoPayloadBytes = await fsp.readFile(path.join(updateRoot, 'legacy-yaoyao-audio-manifest.json'));
    assert.equal(hashBytes(yaoyaoPayloadBytes), 'a6484db49de96e1a7a081dfcc1716363a02f33e53db4c4d6bc3bb4d2dd1b8f08');
    const yaoyaoPayload = JSON.parse(yaoyaoPayloadBytes);
    assert.equal(yaoyaoPayload.schemaVersion, 1);
    assert.equal(yaoyaoPayload.sourceVersion, '1.0.3');
    assert.equal(yaoyaoPayload.sourceManifestSha256, 'f97235ab7be0b2f41bb30b87b7b5237145ff445948223aa916ea2529370594fe');
    assert.equal(yaoyaoPayload.sourceVoice.speaker, 'Microsoft Yaoyao');
    assert.equal(yaoyaoPayload.sourceNarrationManifestSha256, 'b78fb99b04d4cafe5e7d0fb135200ca3e63ab047cf0b921db69a085f48ff8b44');
    const yaoyaoFiles = yaoyaoPayload.files;
    assert.equal(yaoyaoFiles.length, 460);
    assert(yaoyaoFiles.every(item => /^resources\/app\.asar\.unpacked\/dist\/narration\/clips\/yaoyao-[a-f0-9]{24}\.mp3$/.test(item.path)));
    report.yaoyaoCleanupManifestSha256 = hashBytes(yaoyaoPayloadBytes);
    report.yaoyaoReleaseManifestSha256 = yaoyaoPayload.sourceManifestSha256;
    let originalRecordingsRemaining = 0, yaoyaoRecordingsRemaining = 0, differingFilesRetained = 0;
    for (const item of [...oldManifest.files, ...yaoyaoFiles]) {
      const file = relativeFile(target, item.path);
      if (!fs.existsSync(file)) continue;
      const stat = await fsp.stat(file);
      if (stat.isFile() && stat.size === item.size && await hashFile(file) === item.sha256) {
        if (item.path.includes('/yaoyao-')) yaoyaoRecordingsRemaining++;
        else originalRecordingsRemaining++;
      }
      else differingFilesRetained++;
    }
    report.legacyAudio = { ...report.legacyAudio, originalRecordingsRemaining, yaoyaoRecordingsRemaining, differingFilesRetained };
    assert.equal(originalRecordingsRemaining, 0, 'Known obsolete original recordings remain after the update');
    assert.equal(yaoyaoRecordingsRemaining, 0, 'Known obsolete Yaoyao recordings remain after the update');

    report.independentProfile = inside(path.join(root, 'test-results'), path.join(root, 'test-results', 'python-installed-profiles', Date.now() + '-' + crypto.randomBytes(4).toString('hex')));
    noReparse(report.independentProfile);
    await fsp.mkdir(report.independentProfile, { recursive: true });
    app = await electron.launch({ executablePath: exe, args: ['--user-data-dir=' + report.independentProfile], timeout: 30000 });
    report.launched = true;
    report.appVersion = await app.evaluate(({ app }) => app.getVersion());
    assert.equal(report.appVersion, '1.0.5');
    report.actualUserData = await app.evaluate(({ app }) => app.getPath('userData'));
    assert.equal(path.resolve(report.actualUserData).toLowerCase(), path.resolve(report.independentProfile).toLowerCase());
    await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows().forEach(window => window.webContents.setAudioMuted(true)));
    const page = await app.firstWindow();
    report.httpRequestsBlocked = []; report.pageErrors = [];
    await page.context().route(/^https?:/, route => { report.httpRequestsBlocked.push(route.request().url().split('?')[0]); return route.abort(); });
    page.on('pageerror', error => report.pageErrors.push(error.message));
    await page.locator('.app-footer').waitFor({ timeout: 30000 });
    report.footer = await page.locator('.app-footer').innerText();
    const count = report.footer.match(/共\s*(\d+)\s*页/);
    assert(count, 'Original Python page count is absent');
    report.pages = Number(count[1]);
    assert.equal(report.pages, 153);
    report.title = await page.title();
    assert(report.title.includes('像学') && report.title.includes('编程'));
    assert.deepEqual(report.pageErrors, []);
    assert.deepEqual(report.httpRequestsBlocked, []);
    report.ok = true;
  } catch (error) {
    report.errors.push(error.message);
    process.exitCode = 1;
  } finally {
    if (app) try { await app.close(); } catch (error) { report.ok = false; report.errors.push('Could not close isolated verification app: ' + error.message); process.exitCode = 1; }
    report.completedAt = new Date().toISOString();
    await fsp.mkdir(path.dirname(reportPath), { recursive: true });
    await fsp.writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ ok: report.ok, version: report.version, filesVerified: report.filesVerified, launched: report.launched, pages: report.pages, report: path.relative(root, reportPath).replaceAll('\\', '/'), errors: report.errors }));
  }
})();
