const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const iconPath = path.join(__dirname, app.isPackaged ? '../dist/favicon.ico' : '../public/favicon.ico');
  const windowOptions = {
    width: 1400,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  };
  
  // 如果图标文件存在，则使用；否则跳过
  const fs = require('fs');
  if (fs.existsSync(iconPath)) {
    windowOptions.icon = iconPath;
  }
  
  mainWindow = new BrowserWindow(windowOptions);

  // 使用 app.isPackaged 判断是否为开发模式（更可靠）
  const isDev = !app.isPackaged;
  
  console.log('[Electron] isDev:', isDev);
  console.log('[Electron] app.isPackaged:', app.isPackaged);
  console.log('[Electron] __dirname:', __dirname);

  if (isDev) {
    // 开发模式：加载开发服务器
    mainWindow.loadURL('http://localhost:9001');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式：使用 loadFile 加载本地文件（比 loadURL 更可靠）
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('[Electron] Loading file:', indexPath);
    mainWindow.loadFile(indexPath);
  }

  // 打开开发者工具以便调试（生产环境也开启）
  mainWindow.webContents.openDevTools();

  // 监听加载事件
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('[Electron] Page failed to load:', errorCode, errorDescription);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('[Electron] Page loaded successfully');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// 创建菜单
const menu = Menu.buildFromTemplate([
  {
    label: '文件',
    submenu: [
      {
        label: '退出',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: '编辑',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click: () => {
          console.log('版本: 1.0.0');
        },
      },
    ],
  },
]);

Menu.setApplicationMenu(menu);
