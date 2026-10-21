# 晓晓配音与课程修订

## C/C++1.3.0增量修订

本轮只更新C/C++初学者课程内容及其可达朗读，Python1.0.5应用、460条录音与manifest均保持不变。声线仍为`zh-CN-XiaoxiaoNeural`，语速`+0%`、音高`+0Hz`、音量`+0%`、播放1.0；原文不改写或规范化，关闭系统声音回退。正式冻结C501、C++476个精确原文key，C/C++资源去重699条：539条复用旧晓晓录音，仅160条新原文需要制作，107条旧C/C++ key不再发布。与未变Python460条合计1159份资源副本、981个唯一录音文本。每语言仍94页有朗读入口、47测验页/143答案反馈。

冻结输入为`test-results/course-1.3.0/narration-input.json`，SHA-256 `437ec111078d0579848ef485d6278f82ea32d4b94200c2105fc9b4db969d71f1`。本轮实际生成、发布、解码与UI结果分别以revision目录下独立报告为准；旧907/646数字只属于下方历史基线。

当前生成与独立验证已完成：160条新录音成功、539条缓存跳过，失败0、重试0；160条新增MP3逐一完整解码、非静音与24kHz单声道检查通过，全部699条发布文件SHA一致。当前C/C++ manifest SHA为`3d9f00b9f72b91acae798108d22e875187269e93b242c700299fcf08b4a985d9`；539条未变录音使用相同SHA及先前完整解码证据，不宣称本轮重新全量解码。当前stage的播放与布局另由UI报告绑定，不能用旧版报告冒充。

待两语言课程数据定稿后依次执行：

```powershell
node scripts/verify-original-courses.mjs --report test-results/course-1.3.0/course-verification.json
node scripts/collect-narration.mjs --output test-results/course-1.3.0/narration-inventory.json
node scripts/prepare-course-narration.mjs --revision 1.3.0
vendor/edge-tts-venv/Scripts/python.exe scripts/generate-xiaoxiao-narration.py --input test-results/course-1.3.0/narration-input.json --output vendor/xiaoxiao-generated --concurrency 4
node scripts/publish-course-narration.mjs --revision 1.3.0
node scripts/verify-course-narration.mjs --revision 1.3.0
```

collector输出在新revision目录，不覆盖原冻结盘点。prepare将上一版907输入、生成/发布/解码/UI报告复制为只读来源快照，再合并新C/C++原文；ID仍为原文UTF-8 SHA前24位，未变录音需匹配同声线契约、精确原文、大小与SHA才复用。生成器读取同一缓存的JSONL记录，跳过有效录音，仅合成缺少的新ID；`--verify-only`只读校验缓存，不联网。发布只替换`public/narration/`，保留构建目录中的旧资源备份；Python manifest及所有460个文件的SHA前后核验。

当前revision的验证报告区分“复用片段SHA与历史完整解码证据”及“本轮新增片段逐一完整解码和非静音”。不把复用录音写成重新合成或本轮重新全解码。新增或改字的token、造句整行/喇叭提示、测验反馈都必须在新清单；没有朗读入口的用途文案、组词/写作步骤仍不会额外制作声音。

待新C/C++stage冻结后执行当前UI检查，报告与旧版隔离：

```powershell
node scripts/scan-layout.cjs --phase final --language c --revision 1.3.0
node scripts/scan-layout.cjs --phase final --language cpp --revision 1.3.0
node scripts/test-layout-interactions.cjs c --revision 1.3.0
node scripts/test-layout-interactions.cjs cpp --revision 1.3.0
node scripts/test-unified-narration-ui.cjs --languages c,cpp --revision 1.3.0 --representatives compact
```

布局每版四尺寸153页/2340状态写入`course-1.3.0/layout/`；配音UI每版全部143反馈真实启动，并对新增token、造句行及反馈代表自然播放结束，写`course-1.3.0/narration-ui.json`。不重测或覆盖Python与旧1.2.4布局证据；实际通过状态由最终报告决定。

## 上轮全量声音基线（C/C++1.2.3至1.2.4、Python1.0.4至1.0.5）

以下是旧冻结基线的来源与维护记录。1.3.0请使用上方revision命令；不要直接执行下方历史publisher/固定907验证器覆盖当前C/C++配音。

C/C++1.2.4与Python1.0.5保留上轮全部晓晓`zh-CN-XiaoxiaoNeural`录音，包括每个测验选项的反馈。本轮只修复布局，没有重新制作音频。153页课程、顺序、讲解步骤、原有朗读入口保持不变，保留翻页停止与连续点击只播放最后请求。

## 声音、速度与离线使用

| 项目 | 当前方案 |
| --- | --- |
| 声音ID | `microsoft-xiaoxiao-neural-normal` |
| 制作声音 | Microsoft Edge Online TTS，`zh-CN-XiaoxiaoNeural` |
| 制作参数 | 正常语速`+0%`、音高`+0Hz`、音量`+0%` |
| 播放速度 | `Audio.playbackRate = 1`，不加速、不减速 |
| 文本 | 原`speakText`参数，UTF-8精确字符串去重，不改写、不添加释义 |
| 使用方式 | 随包MP3本地播放，无需使用者安装同名声音、GPU、模型或TTS Key |
| 资源异常 | 报告播放失败状态，关闭系统语音回退，避免混入其他音色 |

原Python生成器使用同名晓晓声音。上轮C/C++1.2.3、Python1.0.4已为三版全部可达文本制作完整录音，替换旧片段、Qwen和Yaoyao录音。本轮逐SHA复用相同资源：C/C++manifest为`84181de7863e77517e018014823df39ebb86e4c2ab4dfca67bce722306475647`，Python为`992e522bf121f4ecc0c5aa75a1b582873959bc92d24a6fd071df0495560be196`。制作时需要连接Edge服务，**应用播放已发布录音时无需联网**；AI助教仍沿用原来的联网条件。

## 可达朗读范围

| 原有入口 | 触发方式 |
| --- | --- |
| 总览4张卡片 | 点击卡片，朗读阶段及定义 |
| 组词、造句、写作讲解代码token | 点击token，朗读词语及分类 |
| 识字、组词测验代码token | 点击token，朗读词语及分类 |
| 造句讲解整行 | 点击行容器或空白处；点token只朗读token |
| 造句讲解5步提示 | 点击当前提示旁的喇叭 |
| 47道测验答案反馈 | 选项对应的正确/错误解释，共143个反馈位置 |

组词与写作“下一步”仍只切换显示文字。用途演示、题干/选项文字本身、AI消息、用户编辑代码与运行结果没有新增朗读。

AST盘点沿实际153页路由追踪数据、组件、token模板和反馈表达式，排除原App不可达旧组件；不从旧映射里的JSX源码片段生成录音。每条原文可追溯到语言、页码、组件、数据字段和源位置。

| 范围 | 精确原文key | 有朗读入口页数 | 测验页 / 反馈位置 |
| --- | ---: | ---: | ---: |
| C | 494 | 94 | 47 / 143 |
| C++ | 493 | 94 | 47 / 143 |
| Python | 460 | 94 | 47 / 143 |
| C与C++共同资源 | 646 | — | 94 / 286 |
| 三语言完全相同文本去重 | 907 | — | 141 / 429 |

两个发布资源目录分别包含646和460个MP3，有199条相同原文，合计907个唯一录音、1106个资源目录副本。ID为`xiaoxiao-`加原文UTF-8 SHA-256前24位；不做trim、Unicode正规化或代码发音替换。

`public/narration/manifest.json`与`python-voice-update/narration/manifest.json`均为schema1，每个key均为`mode: recorded`，文件`narration/clips/xiaoxiao-<24位SHA>.mp3`，保留原始`spokenText`、文件SHA和时长。`fallback`固定为`{lang:'zh-CN',rate:1,preferredVoices:['Xiaoxiao'],enabled:false}`；资源缺失或播放失败不会再调用设备的瑶瑶、慧慧等其他声音。

## 输入来源与维护

冻结输入为`test-results/xiaoxiao-narration-input.json`，SHA-256：`dc6cea3660b73a6c2188daf8ffe54c7316c4f5eec48c70a970a7ed16dd40b644`。它以上一轮原文输入作为派生来源，保留相同907条文本及语言归属，只替换声音和文件ID前缀。旧Yaoyao输入JSON仅作原文派生证据，不代表当前声音或音频依赖。

```powershell
node scripts/collect-narration.mjs --dry-run
node scripts/collect-narration.mjs --python-reference --dry-run
node scripts/verify-xiaoxiao-input.mjs
node scripts/publish-xiaoxiao-narration.mjs
node scripts/verify-xiaoxiao-narration.mjs
node --test tests/player.test.mjs
```

正常构建直接使用随源码提供的两套已发布录音，不重新调用在线TTS。只有更改文本或新增入口才需要重新盘点、准备输入、制作、发布和验证。制作脚本及确切环境按最终生成报告记录；生成期间不可改写冻结输入。录音制作和发布都应验证原文、声线、速度、文件哈希和完整解码，不能通过复用无关录音绕过缺项。

源码不含完整私有`original-source/`。Python盘点可回退到`python-voice-update/reference/`的27个安全静态源文件，`source-manifest.json`记录与原工程逐字节一致的SHA；reference dry-run可检查它仍产生相同460个key及全部143个反馈位置。实际安装位置是`E:\ai\python-learning`，公共桌面快捷方式指向这里。

## 验证边界

当前各步骤完成状态见`VALIDATION.md`。`xiaoxiao-narration-input-verification.json`证明原文及全部429个测验反馈位置覆盖；生成、发布、907段完整解码、三版UI和正式安装分别用独立报告核对。

`xiaoxiao-ui.json`是C/C++1.2.3、Python1.0.4的完整历史验收：429个反馈实际启动、39个代表自然结束，其余反馈由下一动作主动中断；还核对连续点击、翻页停止及旧音/System/缺失/错误/HTTP为0。当前布局版以`layout-final/interactions-*.json`另验每版3个代表路由，共9次实际录音启动、3次token自然结束，绑定当前ASAR，不冒称重跑429/39。媒体静音只证明文件、声线标识、速度和生命周期，不代表人工听完907段或主观自然度全部通过。

1.2.0 Qwen、1.2.1原音/系统混合、1.2.2 Yaoyao是先前方案，资源与报告保存在本地历史目录，不计入当前晓晓的通过证据。用户实际安装中的旧录音也需受控替换或归档，不能仅更新源码或候选安装包。
