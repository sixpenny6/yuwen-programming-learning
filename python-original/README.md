# 像学习语文一样学习 Python：原始源码

这是可独立开发的原始 React、TypeScript、Vite、Electron 项目，保留原版 153 页的 App、全部课程数据、组件、Python 实验室、AI 助教和桌面入口。它不是只有静态课程或二进制补丁的占位目录。

**版本边界：** 恢复的原始 `package.json` 声明版本为 `1.0.0`，此处保留该声明。实际交付的 Python `1.0.5` 使用原 `1.0.2` 安装包作为私有基线，通过受控补丁更新配音和布局；其补丁工具和 460 条当前晓晓录音在旁边的 [`python-voice-update`](../python-voice-update/) 中。此目录没有伪装成最新安装版的完整重写源码，也不能仅靠此原始源码重建出逐字节相同的 `1.0.5` 安装包。

## 本地开发

先安装 Node.js 22 或更新版本及 npm，然后在本目录执行：

```powershell
npm ci
npm run dev
```

浏览器入口为 `http://localhost:9001/AI-edu/code-free/`。如需 Electron 开发窗口：

```powershell
npm run electron:dev
```

课程页面可在不设置 AI Key 的情况下开发。Python 执行器仍沿用原项目的 Pyodide/CDN 依赖；没有将运行器重新改成完全离线系统。缺失的原录音会沿原播放器规则回退到设备语音，详情见 [AUDIO.md](AUDIO.md)。

## 可选 AI 配置

复制 `.env.example` 为 `.env.local`，只在自己的电脑填写 `DEEPSEEK_API_KEY`。仓库中没有真实 Key，空配置不会启用 AI 请求。

原工程使用 Vite 在构建时把该变量注入渲染端。**如果用真实 Key 构建，它可能被打进前端产物；不要把这样的产物提交仓库或当成隐藏 Key 的分发方案。** 这里保留原 AI 请求逻辑，没有另接后端代理或导入已安装应用的私有配置。

## 构建与来源

参见 [WINDOWS_BUILD_GUIDE.md](WINDOWS_BUILD_GUIDE.md)、[PROVENANCE.md](PROVENANCE.md) 和 [source-manifest.json](source-manifest.json)。上传副本只修正了开发端口、缺失的启动入口、图标位置和空环境变量默认值；课程文本、代码示例、AI 提示词和语音入口没有重写。

本次准备阶段只做语法、入口和文件完整性核对，没有在此副本安装依赖、编译或生成安装包。原项目没有提供顶层开源许可证；此处没有替原作者新增许可证或更改第三方依赖授权。
