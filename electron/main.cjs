const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { fileURLToPath } = require('node:url');
const { RuntimeRunner } = require('./runtime.cjs');
const { requestAi } = require('./ai.cjs');
const product = require('./product.json');

app.setName(product.name);
const userDataOverride = app.commandLine.getSwitchValue('user-data-dir');
app.setPath('userData', userDataOverride ? path.resolve(userDataOverride) : path.join(app.getPath('appData'), product.appId));
app.setAppUserModelId(product.appId);
let mainWindow;
let runner;
let ownerId;
let aiBusy = false;
let quitting = false;
const indexPath = path.resolve(__dirname, '../dist/index.html');
const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://127.0.0.1:5173';

function isLocalPage(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (!app.isPackaged && parsed.origin === new URL(devUrl).origin) return true;
    return parsed.protocol === 'file:' && path.resolve(fileURLToPath(parsed)).toLowerCase() === indexPath.toLowerCase();
  } catch { return false; }
}

function validateSender(event) {
  if (!mainWindow || event.sender.id !== mainWindow.webContents.id || event.senderFrame !== event.sender.mainFrame || !isLocalPage(event.senderFrame?.url)) throw new Error('此页面无权调用程序功能');
}

function ownsRun(runId) {
  if (typeof runId !== 'string' || !runner.sessions.has(runId) || ownerId !== mainWindow?.webContents.id) throw new Error('找不到当前运行任务');
}

function registerIpc() {
  const handle = (channel, callback) => ipcMain.handle(channel, (event, ...args) => { validateSender(event); return callback(event, ...args); });
  handle('learning:product', () => product);
  handle('learning:run', (event, source) => { ownerId = event.sender.id; return runner.createRun(source); });
  ipcMain.on('learning:start', (event, runId) => {
    try { validateSender(event); ownsRun(runId); void runner.start(runId); } catch {}
  });
  handle('learning:input', (_event, runId, text) => { ownsRun(runId); runner.writeInput(runId, text); });
  handle('learning:end-input', (_event, runId) => { ownsRun(runId); runner.endInput(runId); });
  handle('learning:stop', async (_event, runId) => {
    if (typeof runId !== 'string' || !/^[0-9a-f-]{36}$/i.test(runId)) throw new Error('无效的运行任务');
    await runner.stop(runId);
  });
  handle('learning:ai', async (_event, request) => {
    if (aiBusy) throw new Error('AI 正在回答，请稍后再试');
    aiBusy = true;
    try { return await requestAi(product.language, request); } finally { aiBusy = false; }
  });
  handle('learning:save-source', async (_event, source) => {
    if (typeof source !== 'string' || Buffer.byteLength(source, 'utf8') > 256 * 1024) throw new Error('源码内容无效或过长');
    const extension = product.language === 'c' ? 'c' : 'cpp';
    const result = await dialog.showSaveDialog(mainWindow, { title: '保存源码', defaultPath: `我的程序.${extension}`, filters: [{ name: product.language === 'c' ? 'C 源码' : 'C++ 源码', extensions: [extension] }] });
    if (result.canceled || !result.filePath) return { saved: false };
    const destination = path.extname(result.filePath) ? result.filePath : `${result.filePath}.${extension}`;
    await fs.writeFile(destination, source, 'utf8');
    return { saved: true, path: destination };
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1400, height: 1000, minWidth: 760, minHeight: 540, title: product.name, backgroundColor: '#f7f9fd', icon: path.join(app.isPackaged ? process.resourcesPath : path.resolve(__dirname, '..'), 'app-icon.ico'), webPreferences: { preload: path.join(__dirname, 'preload.cjs'), nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true } });
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (event, url) => { if (!isLocalPage(url)) event.preventDefault(); });
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown' || !(input.control || input.meta) || input.alt) return;
    const contents = mainWindow.webContents;
    if (input.code === 'Minus' || input.key === '-' || input.key === '_') { event.preventDefault(); contents.setZoomLevel(Math.max(-3, contents.getZoomLevel() - 0.5)); }
    else if (input.code === 'Equal' || input.key === '=' || input.key === '+') { event.preventDefault(); contents.setZoomLevel(Math.min(3, contents.getZoomLevel() + 0.5)); }
    else if (input.code === 'Digit0' || input.key === '0') { event.preventDefault(); contents.setZoomLevel(0); }
  });
  mainWindow.on('closed', () => { mainWindow = null; void runner.dispose(); });
  if (app.isPackaged) mainWindow.loadFile(indexPath);
  else mainWindow.loadURL(devUrl);
}

app.whenReady().then(() => {
  const compilerRoot = path.join(app.isPackaged ? process.resourcesPath : path.resolve(__dirname, '..', 'vendor'), 'compiler');
  runner = new RuntimeRunner({ compilerRoot, language: product.language, onEvent: (event) => { if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('learning:runner-event', event); } });
  registerIpc();
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: '文件', submenu: [{ label: '退出', role: 'quit', accelerator: 'CmdOrCtrl+Q' }] },
    { label: '编辑', submenu: [{ role: 'undo', label: '撤销' }, { role: 'redo', label: '重做' }, { type: 'separator' }, { role: 'cut', label: '剪切' }, { role: 'copy', label: '复制' }, { role: 'paste', label: '粘贴' }, { role: 'selectAll', label: '全选' }] },
    { label: '视图', submenu: [{ role: 'zoomOut', label: '缩小', accelerator: 'CmdOrCtrl+-' }, { role: 'zoomIn', label: '放大', accelerator: 'CmdOrCtrl+=' }, { role: 'resetZoom', label: '恢复原始大小', accelerator: 'CmdOrCtrl+0' }, { type: 'separator' }, { role: 'togglefullscreen', label: '全屏', accelerator: 'F11' }] },
  ]));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', (event) => {
  if (quitting || !runner) return;
  event.preventDefault();
  quitting = true;
  runner.dispose().finally(() => app.quit());
});
