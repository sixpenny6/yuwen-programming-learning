# 像学语文一样学编程：Python / C / C++

面向初学者的 Windows 编程教学软件，通过「识字 → 组词 → 造句 → 写作 → 实验室」学习代码。三款软件沿用原版 153 页教学组成，保留三色标注、点击释义、分步演示、朗读、测验和章节导航。

本仓库统一维护三个学习项目。C、C++ 共用教学框架，以不同课程配置生成独立软件；Python 提供原始完整源码与后续语音、布局更新工具。

| 项目 | 已交付版本 | 源码入口 |
| --- | --- | --- |
| C 学习软件 | 1.3.1 | [`src/`](src/)、[`src/adapted-data/c/`](src/adapted-data/c/) |
| C++ 学习软件 | 1.3.1 | [`src/`](src/)、[`src/adapted-data/cpp/`](src/adapted-data/cpp/) |
| Python 学习软件 | 1.0.5 | [`python-original/`](python-original/)、[`python-voice-update/`](python-voice-update/) |

## 教学内容

- C：类型、输入输出、条件与循环、函数、数组、字符数组、结构体、基础指针及文件读写。
- C++：输入输出流、`string`、`vector`、引用、范围循环、简单类和构造函数等基础用法。
- Python：原项目的语文类比课程、生活案例、测验和实验室。
- 课程朗读使用随包录音；当前交付版本统一采用微软晓晓，正常语速。

C/C++ 使用内置 LLVM-MinGW 真实编译运行单文件 C17 / C++17 控制台程序，支持逐次输入、停止和退出状态。AI 助教、场景生成及释义需要自行配置 API Key。

## C / C++ 开发

准备 Node.js 22.16 或更新版本、pnpm、Python 3 及构建依赖：

```powershell
pnpm install --frozen-lockfile
python -m pip install -r requirements-build.txt
Copy-Item electron/ai-config.example.json electron/ai-config.json
pnpm run dev:c
# 或 pnpm run dev:cpp
```

Vite 开发页面用于查看课程；实际编译运行及 AI 请求通过 Electron 主进程完成。`electron/ai-config.json` 是本机私有配置，已被 Git 忽略。不要把真实 Key 写进前端源码或提交到仓库。

下载便携工具链和打包工具后，可分别生成两个安装包：

```powershell
python scripts/download-compiler.py
python scripts/download-build-tools.py
pnpm run build:c
pnpm run build:cpp
```

更多环境配置见 [BUILD.md](BUILD.md)，课程特色及页码见 [CURRICULUM.md](CURRICULUM.md)，C/C++ 的详细使用说明见 [README-C-CPP.md](README-C-CPP.md)。

## Python 源码与版本关系

[`python-original/`](python-original/) 保存可开发的原始 Python 教学工程，原 `package.json` 声明版本为 **1.0.0**；另有少量入口、端口及资源路径修正，见该目录说明。

当前已交付的 **Python 1.0.5** 是在后续 **1.0.2 安装基线**上制作的晓晓配音和布局补丁，工具位于 [`python-voice-update/`](python-voice-update/)。精确重建这个安装版仍需要用户自己的、哈希匹配的 1.0.2 基线。原始源码快照不能等同于完整的 1.0.5 独立源码工程。

原有旧录音只保留资源清单；当前 1.0.5 的 460 条晓晓录音保留在 `python-voice-update/narration/`。原课程数据及结构没有为本次 GitHub 上传重新编写。

## 检查

```powershell
pnpm run typecheck
pnpm run test:lexer
pnpm run test:code-spacing
pnpm run test:voice-player
```

完整 Windows 安装、编译器及历史发布审计脚本还依赖本机工具、安装位置或验收快照；普通 Git 克隆不包含这些私有工作目录。历史验证范围见 [VALIDATION.md](VALIDATION.md)，不能把旧发布报告解释为新机器上已完成测试。

## 仓库与发布文件

Git 中保存源码、锁文件、必要资源和维护工具。安装包、编译器、Electron 运行时、依赖目录、私有安装基线、密钥和本机备份不提交。

已有本机安装包带有私有 AI 配置，未作为公开仓库附件上传。未来面向公众分发的安装包应由使用者自行配置 Key；较大的安装文件适合放到 GitHub Releases，而非提交到 Git 历史。

本仓库暂未指定开源许可证；第三方依赖与资源的使用条件以各自声明为准。
