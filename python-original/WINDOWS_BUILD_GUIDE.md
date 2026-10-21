# 原始 Python 工程的开发与构建

本目录的版本声明仍为 `1.0.0`，构建结果是这个原始源码项目，不是实际交付 `1.0.5` 的逐字节复现。最新安装版补丁关系见 [PROVENANCE.md](PROVENANCE.md)。

## 开发

使用 Node.js 22 或更新版本和 npm，在本目录运行 `npm ci`。`npm run dev` 与 `npm start` 均启动 Vite，端口为 `9001`；浏览器入口为 `http://localhost:9001/AI-edu/code-free/`。`npm run electron:dev` 会等待同一端口并打开 Electron。

AI 配置可留空；如需本机调试，复制 `.env.example` 为 `.env.local` 并自行填写。原 Vite 配置会把配置值注入前端，不应将包含真实 Key 的 `dist`、EXE 或其他产物发布。所有 `.env` 私有文件及构建目录均被忽略。

## 浏览器构建

```powershell
npm run build
npm run preview
```

浏览器部署沿用原项目的 `/AI-edu/code-free/` 基础路径；部署位置不同时，开发者应自行调整 `vite.config.ts` 中的 `base`。

## Windows 安装包

```powershell
npm run electron:build
```

脚本为 Electron 使用相对资源路径并调用 electron-builder，产物进入 `dist-electron/`。图标为 `public/favicon.ico`，由原 `build/icon.ico` 逐字节迁移。首次构建可能需要下载依赖及 Electron；Python 实验室仍可能联网装载 Pyodide，不能把 EXE 打包等同于所有功能完全离线。

原 1016 条 MP3 没有纳入 Git；需要旧预录播放时可按 [AUDIO.md](AUDIO.md) 恢复或重新生成，也可以使用原播放器的设备语音回退。当前统一晓晓资源在旁边补丁目录中，原工程不会自动读取它们，直接替换播放系统属于另一次开发变更。

此上传副本准备时没有运行上述构建命令或安装应用，不将历史安装验收冒称成此副本的全新构建结果。
