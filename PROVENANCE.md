# 源码来源与改造记录

## 1.3.1代码显示分隔

修复测验`std::stringname`等相邻彩色词块合并的问题。共享渲染层在缺少分隔的单词之间补入ASCII空格，也分开模板类型与变量名；已有空白、多字符运算符及字符串内容保持原样。造句测验的代码框改用可用宽度，避免新增空格把短声明挤断。覆盖讲解、测验和演示的代码视图，不改变原始课程token、课程组成、朗读key或音频。C/C++独立安装包升级到1.3.1，Python1.0.5不变。1.3.0课程与音频证据按原版本保留，本轮显示与安装证据位于`test-results/spacing-1.3.1/`。

## 1.3.0语言特色示例

本轮保持两版原153页组成、ID、顺序、步数和讲解形式，改写选定语言示例，并将同ID讲解、用途演示、完整验证程序和关联测验一并更新。按用户“面向初学者，不要太高深”的补充要求，C选用简单指针、结构体、固定数组、字符修改和基本输入/文件操作；C++选用简单引用、字符串、vector、范围for、简单类及构造函数。不教学手动分配/释放内存、虚函数、多态、迭代器或泛型算法。页码与边界见`CURRICULUM.md`。

新增讲解和测验原文重新盘点，以精确原文内容哈希复用或补做晓晓录音；原始907条录音输入、制作报告和旧UI结果仍是历史证据，不冒称它们验证了新文本。当前课程编译、片段对应、增量配音与新ASAR布局/播放/安装证据单独置于`test-results/course-1.3.0/`。Python1.0.5的应用、课程、录音和安装包不改，沿用其独立报告。

下面记录保留的源码基线与先前版本来源；其中的1.2.4/1.0.5布局更新和1.2.3/1.0.4完整配音验收均按原版本解读。

## 保留的工程基线

基线为用户指定服务器`10.20.5.62:/home/ywt/yf/2026-01-16/`的完整React/TypeScript/Electron工程，2026-10-19只读复制。没有修改服务器源项目或在服务器运行构建。

原工程前端bundle、Electron main、Python Worker和音频映射，与用户最初的Windows安装版SHA-256完全匹配。传输归档SHA-256为`c864ff87b14af2a0db24a3cb90f4e9ba449275734a425bb14d1ee5eb52b7dd67`。原始副本保存在工作区`original-source/`，不放入交付源码ZIP。

1.1.0按原版153页组成和顺序改造：保留原App页槽位、侧栏、讲解步进、演示三步、测验组件、语文类比与缩放。活动入口为`src/original/App.tsx`，组件位于`src/original/components/`；C/C++知识与代码分别位于`src/adapted-data/c/`、`src/adapted-data/cpp/`，由`src/original/data/`选择。原讲解与演示中主题不一致的槽位按讲解主题对齐。

语言替代明确边界：C使用结构体、组合、数组、显式条件/循环与包装函数；C++使用对应的C++17语法与标准库。两版保留21组词、12造句、13写作案例及原11/14/11题数，识字保留4页讲解和11题。

保留已验证的Electron主进程API、CodeMirror语言模式、词法分析、DeepSeek调用和本地编译运行器，替换Python执行路径。没有把C/C++代码交给Python模拟器或用AI代算结果。编译器为LLVM-MinGW20261006 UCRT x86_64，Electron39.2.7，NSIS3.13；下载脚本与vendor清单记录来源及哈希。源码ZIP排除私有AI配置；安装包按用户授权包含配置。

## 1.2.4与1.0.5的声音来源

C/C++1.2.4和Python1.0.5复用上轮全部晓晓`zh-CN-XiaoxiaoNeural`录音，包括每版47道测验的143个答案反馈位置。C494、C++493、Python460条精确原文跨语言去重907条；没有改写朗读文本或追加释义。C/C++共同资源646条，Python460条，manifest与上轮逐字节一致，该轮没有重新合成。

录音通过Microsoft Edge Online TTS指定`zh-CN-XiaoxiaoNeural`，与原Python生成器的声音名称一致；固定正常语速`+0%`、音高`+0Hz`、音量`+0%`，输出24kHz单声道MP3，播放速度1.0。制作环境隔离安装`edge-tts==7.3.1`，查询服务精确声音描述，不替换为其他voice。联网只发生在制作阶段；使用者播放随包录音无需联网、GPU、TTS Key或系统同名声音。播放器明确禁止系统语音备用路径，异常时报告失败状态，避免再次混入瑶瑶。

精确原文、页面来源、测验反馈覆盖和冻结输入分别记录在`narration-inventory.json`、`python-narration-inventory.json`、`xiaoxiao-narration-input.json`及其验证报告。冻结输入SHA为`dc6cea3660b73a6c2188daf8ffe54c7316c4f5eec48c70a970a7ed16dd40b644`；其原文派生自旧Yaoyao输入，保留该安全JSON只为核对原文未改，不保留旧声音作为当前资源。生成、发布、完整解码、三版UI与正式安装分开验收；当前完成状态以`VALIDATION.md`和实际报告为准，不把静音UI当作主观听感通过。

## Python1.0.5更新范围（本轮保持）

`python-installed-baseline.json`只读确认原Python实际安装于`E:\ai\python-learning`、版本1.0.2，公共桌面“语文式Python学习”快捷方式指向该目录。原1016条预录逐SHA与原工程一致；便携副本和空的`E:\vkk\python-learning`不能替代这项实际安装核对。

Python1.0.5是原1.0.2应用基线的语音与布局补丁。`python-voice-update/build.mjs`与`patch-layout.mjs`仅替换已核验bundle中的受控范围，复用共享AutoFit、布局CSS和播放器；记录52个受控范围、53个未变段的SHA，课程数据、示例及AI片段保持逐字节一致，另核对2931个原文件未变。HTML额外可逆插入一条header右侧80px的优先样式，覆盖原HTML的响应式padding shorthand。原生版本与内部版本同步更新，原图标保留。它不是重新编写完整Python应用。

1.2.4共享布局去除代码放大transform，允许词块及长代码软换行，正文使用实际尺寸测量并可纵向滚动，编辑器保留稳定高度；FAQ移至顶部并让标题预留空间。三版实际安装与新布局矩阵使用当前报告，完整晓晓制作及429/39播放证据继承上轮并核对未变资源SHA。

源码ZIP只收入Python补丁/构建/安装脚本、460个新录音、manifest与27个安全静态参考源。参考源逐字节复制自原App/data/components，经密钥模式扫描并由`reference/source-manifest.json`记录来源SHA，可重跑朗读盘点。完整私有原bundle、ASAR、`python-voice-update/private-baseline/`和`build/`不入源码包；重新制作Python更新仍需用户原有、哈希匹配的私有1.0.2安装基线。

1.2.0 Qwen/Serena、1.2.1原版混合配音及1.2.2 Yaoyao是先前方案，资源和报告保存在本地历史目录。原版音频、来源基线及旧建议只作历史研究依据。课程与运行器继承1.1.0验证；1.2.4布局与Python1.0.5安装使用各自报告，完整晓晓语音UI使用明确标记的1.2.3/Python1.0.4继承报告。
