# 开发与构建

C/C++当前版本1.3.1，为两款独立Windows x64 Electron应用。入口`src/main.tsx`加载`src/original/App.tsx`；原153页顺序和教学组件位于`src/original/`，语言数据位于`src/adapted-data/c/`、`src/adapted-data/cpp/`。`electron/runtime.cjs`按C17/C++17真实编译运行。

1.3.1只修复教学token之间遗漏的显示空格。`src/teaching-code-spacing.ts`判断缺少分隔的词边界，`TeachingTokens.tsx`在所有彩色代码组件插入真实ASCII空格；原token文本及朗读参数保持不变。课程与699条C/C++录音沿用1.3.0，旧完整课程、媒体和布局报告按原版本继承，本轮显示回归及当前安装证据另存`test-results/spacing-1.3.1/`。

Python1.0.5由`python-voice-update/`中的受控语音与布局补丁制作，依赖用户已有且哈希匹配的Python1.0.2私有基线。本轮不重新构建或安装Python。C/C++1.3.0改进语言特色示例，新增朗读文本按相同晓晓正常参数补做录音，未变原文按内容哈希复用；系统语音回退保持关闭。

## 准备C/C++构建环境

Windows上准备Node.js22.16或更新版本、pnpm、Python3及Pillow。首次安装依赖、下载工具需要联网。版本由`package.json`、`pnpm-lock.yaml`固定：

```powershell
pnpm install --frozen-lockfile
python scripts/download-compiler.py
python scripts/download-build-tools.py
```

项目将esbuild列入允许构建依赖；如本机策略仍提示忽略，核对后执行`pnpm rebuild esbuild`，确认`pnpm exec vite --version`正常。

编译器脚本下载LLVM-MinGW20261006 UCRT x86_64，保留bin、目标运行库、头文件与许可证到`vendor/compiler/`，来源和SHA记录为`vendor/compiler-manifest.json`。完整已有目录可复用。

工具脚本下载Electron39.2.7 x64和NSIS3.13，分别使用Electron官方发行包/校验清单及Tauri官方binary-releases固定SHA包，输出`vendor/electron-runtime/`、`vendor/nsis/`和`vendor/build-tools-manifest.json`。下载不含AI配置。

将`electron/ai-config.example.json`复制为私有`electron/ai-config.json`，填自己的Key；不要提交或收入源码ZIP。当前构建要求该JSON存在，即使使用运行环境`DEEPSEEK_API_KEY`，也需保留带空`apiKey`的文件。安装包按用户授权包含配置，不能保护内置Key免被提取。

默认优先使用vendor工具；仅为兼容交付机，在vendor缺失时回退旧ai-repair目录。迁移机器应先下载或明确指定：

```powershell
$env:LEARNING_ELECTRON_RUNTIME = 'D:\tools\python-learning-runtime'
$env:LEARNING_NSIS = 'D:\tools\nsis\makensis.exe'
$env:LEARNING_PYTHON = 'D:\tools\python\python.exe'
```

运行时目录应完整包含`像学习语文一样学习编程.exe`和同级Electron资源；下载脚本已将官方electron.exe适配成该输入名称。构建再按产品改名，写入图标和Windows版本。`LEARNING_PYTHON`用于Pillow图标处理，安装后的C/C++运行不依赖Python。

## 构建C/C++

```powershell
node scripts/build.mjs c --stage-only
node scripts/build.mjs cpp --stage-only
```

此命令构建前端、ASAR、图标、编译器和NSIS脚本到`build/<语言>/application/`，暂不压缩Setup；仍需运行时、Python、编译器和私有AI配置。验收后可仅生成安装包：

```powershell
node scripts/build.mjs c --installer-only
node scripts/build.mjs cpp --installer-only
```

完整构建为`node scripts/build.mjs c`、`node scripts/build.mjs cpp`，也可使用`pnpm run build:c`、`build:cpp`或`build`。产品身份和路径由`products.json`管理。

已有stage可使用`--refresh-ui`重建界面、Electron代码、ASAR和清单，同时执行`make-icons.py --patch-exe`更新原生图标/版本；它复用运行时与工具链目录，不生成Setup。本次可以先refresh再installer-only。更换运行时/编译器时完整构建，操作前关闭对应应用。

| 输出 | 位置 |
| --- | --- |
| 应用目录 | `build/c/application/`、`build/cpp/application/` |
| 安装包 | `releases/像学语文一样学 C Setup 1.3.1.exe`、`releases/像学语文一样学 C++ Setup 1.3.1.exe` |
| 文件SHA清单 | `releases/c-1.3.1-manifest.json`、`releases/cpp-1.3.1-manifest.json` |

## 构建Python声音更新

源码包只提供安全补丁、播放器、460条新录音与朗读盘点参考，不含原Python私有bundle/ASAR。先准备经过脚本固定bundleSHA核验的原Python1.0.2安装副本。实际交付机安装位置是`E:\ai\python-learning`；脚本首次将它复制到本机私有`python-voice-update/private-baseline/`，后续复用该快照，不把已经更新的1.0.3/1.0.5误当作1.0.2基线。

```powershell
node python-voice-update/build.mjs --source 'D:\private\python-learning-1.0.2' --no-setup
node python-voice-update/build.mjs --source 'D:\private\python-learning-1.0.2'
```

`--no-setup`制作可验收stage，默认还用`vendor/nsis/makensis.exe`制作Setup；可用`--nsis`指定工具。`--prepare-only`只检查/构建补丁框架，不代表已带齐最终录音，不能用于正式发布。声音资源可用`--narration`指定，默认`python-voice-update/narration/`。

脚本通过`patch-layout.mjs`在核验过的语音和布局范围中替换组件、加入共享AutoFit/CSS及播放器适配。报告逐段记录受控范围与未变段SHA，课程数据、代码示例、AI片段及2931个其他原文件保持逐字节一致；本版布局确有修改，不能沿用“只有一段连续声音代码变化”的旧断言。`patch-layout.test.mjs`验证范围守卫。`patch-version.py`只更新EXE版本资源，保留原图标；内部package版本同为1.0.5。旧audio_map和旧音频移除。原生版本更新也需要Python3，可用`--python`或`LEARNING_PYTHON`指定。输出为：

- `python-voice-update/build/application/`与安全构建元数据`build-report.json`。
- `python-voice-update/像学习语文一样学习编程 Setup 1.0.5.exe`。
- `releases/python-1.0.5-manifest.json`，逐文件SHA及补丁边界证据。

完整`private-baseline/`、`build/`、构建报告和Setup不收入源码ZIP。重新构建仍依赖用户私有原安装基线；安全静态reference只供朗读盘点，不替代可运行原应用。

本机Python交付采用受控原位文件更新：`scripts/update-python-voice.ps1`先核对旧文件清单，再将被替换的ASAR和旧音频备份到私有`python-voice-update/private-backups/<时间戳>/`，复制最终stage，保留公共桌面原快捷方式且不修改注册表。安全清理清单为`legacy-audio-manifest.json`（原1016条）与`legacy-yaoyao-audio-manifest.json`（上轮460条），仅归档路径/大小/SHA都匹配的旧文件，保留用户自行改动的文件。`scripts/verify-python-installation.cjs`按最终manifest核对安装文件并启动，写独立`python-official-installation.json`。这项证据属于原位部署，不冒称以管理员权限运行了Setup；完整Setup仍供正常向导安装。私有备份包含原应用配置，必须排除出源码包。

## 配音维护

正常构建直接打包已发布的`public/narration/`当前C/C++录音，具体数量由1.3.0盘点决定，不再把旧646/907计数当作新课程约束。Python仍为原460条、manifest SHA保持不变。正常打包不调用TTS；`fallback.enabled=false`禁止录音错误时切换到其他声音。

修改朗读文本时按`NARRATION.md`执行collect→prepare→generate→publish→verify，再构建C/C++。只有制作阶段需要Edge在线服务；使用Python3.11或更新版本，在隔离虚拟环境安装`requirements-narration.txt`固定的`edge-tts==7.3.1`，用FFmpeg/FFprobe核验录音。正常播放全部离线。下面保留1.3.0制作命令作为历史示例；1.3.1未改朗读原文，不重新生成，也不覆盖旧输入或报告。未来变更文本时使用新的revision目录：

```powershell
python -m venv vendor/edge-tts-venv
vendor/edge-tts-venv/Scripts/python.exe -m pip install -r requirements-narration.txt
node scripts/collect-narration.mjs --output test-results/course-1.3.0/narration-inventory.json
node scripts/prepare-course-narration.mjs --revision 1.3.0
vendor/edge-tts-venv/Scripts/python.exe scripts/generate-xiaoxiao-narration.py --input test-results/course-1.3.0/narration-input.json --output vendor/xiaoxiao-generated --concurrency 4
node scripts/publish-course-narration.mjs --revision 1.3.0
node scripts/verify-course-narration.mjs --revision 1.3.0
```

生成器检查精确`zh-CN-XiaoxiaoNeural`，固定rate`+0%`、pitch`+0Hz`、volume`+0%`。它核对缓存原文、声线、文件SHA和已有解码记录后跳过未变片段，只为新内容生成；新片段还须独立完整解码和非静音检查。若FFmpeg不在PATH，可用生成器的`--ffmpeg/--ffprobe`和验证器的`FFMPEG_PATH/FFPROBE_PATH`显式指定。旧907输入及其完整声音报告保留字节，另存本轮输入与新增/复用/移除计划；不覆盖旧证据、不修改Python资源。

## 开发与检查

```powershell
pnpm run dev:c
pnpm run dev:cpp
pnpm run typecheck
pnpm run test:courses
pnpm run test:runtime
pnpm run test:lexer
pnpm run test:voice-player
pnpm run test:narration
pnpm run test:narration-ui
pnpm run test:code-spacing
pnpm run test:spacing
```

Electron开发宿主需要先下载vendor运行时；单独Vite浏览器不具备编译/AI IPC。生产CSP保持开启。Playwright使用本地Electron，不必下载浏览器。1.3.1的`test:narration`检查课程、原文key及音频SHA继承；`test:narration-ui`与`test:spacing`运行同一项真实界面检查，验证必要空格、布局和每版代表token/整行/测验反馈的原生媒体启动，重复运行只选一个命令。新报告写入`spacing-1.3.1/`；1.3.0的286反馈完整播放证据和旧`xiaoxiao-ui.json`保留原字节，不冒称本轮再次完整播放。

课程校验按C17/C++17以`-Wall -Wextra -Werror -pedantic-errors`真实编译92个完整示例并比较输出，同时核对153页槽位、数组ID、步骤和测验结构。新增同ID讲解/Purpose/Examples代码片段对应检查，保留字符串和运算符差异，避免只改验证程序而页面仍是旧例。在没有`original-source/`时自动回退`scripts/original-baseline.json`。C/C++特色维护脚本分别为`author-c-features.py`与`author-cpp-features.mjs`，使用`--check`可核对生成数据未漂移。

课程示例按本轮数据重新编译与核对对应；运行器、AI和安装/卸载引擎实现未改，原报告保留为历史。`test-original-ai.cjs`使用本地固定响应，不能解释为实时API检查。旧晓晓完整UI报告属于C/C++1.2.3、Python1.0.4，当前C/C++文本覆盖、286个反馈播放和布局另绑定1.3.0；Python仍使用其1.0.5报告。代码token继续用`pre-wrap`保留空格并允许软换行。

1.3.0布局验收使用`scan-layout.cjs --phase final --language c|cpp --revision 1.3.0`，四尺寸遍历每版153页、全部步骤和测验反馈。`test-layout-interactions.cjs c|cpp --revision 1.3.0`核对菜单、空助教、编辑器、结果及代表录音，并通过实际IPC运行文件、固定成绩与简单购物车示例。报告放入`test-results/course-1.3.0/layout/`，作为1.3.1的继承证据，不覆盖旧Python的Pyodide断网依赖边界。所有Electron检查用独立资料目录，不发送AI请求。

运行器每次使用临时目录，UTF-8源文件和输入输出，支持逐次输入、EOF和停止。默认编译30秒、运行120秒（含输入等待）、输出1MiB、源码256KiB，见`electron/runtime.cjs`；该进程管理不是执行不可信代码的操作系统沙箱。编辑内容可复制另存`.c`或`.cpp`。缩放为Ctrl+-/=/0，全屏F11。

## 源码归档与安装验收

```powershell
python scripts/package-source.py --list
python scripts/package-source.py
```

list只检查候选，不生成ZIP。1.3.1归档核对当前显示回归、数据/原文/音频未变、正式安装和发行清单，课程编译、完整媒体及布局证据按1.3.0原ASAR和报告继承，不改写为当前全量重测。包内保留C/C++活动源码、特色数据维护脚本、Python安全补丁/reference/冻结录音、测试、锁文件及精选证据；排除私有配置、完整原工程、Python私有stage/baseline/backups、node_modules、编译器/运行时、旧配音和模型。写入后逐条检查SHA、CRC和密钥模式。

安装后按当前版本逐文件SHA核对，真实启动，检查153页、桌面目标、产品独立和新声音。C/C++安装/卸载框架的历史`/TEST`模式跳过正式快捷方式/注册项，不能代替本次正式安装验证；Python补丁的非声音不变检查也不能代替实际安装。这里记录本机检查方法与实际报告，不声称所有干净Windows虚拟机或安全软件组合已覆盖。
