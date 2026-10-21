# 1.3.1 教学代码空格修复

本次只修复 C、C++ 教学代码的显示拼接。原先分别着色的 `std::string` 和 `name` 可能在复制文本或测验纯代码视图中变成 `std::stringname`。现在需要分词边界的位置插入真正的 ASCII 空格，页面的 `textContent` 能保留 `std::string name`、`const int`、`else if`。已有空白、`::`、`++`、字符串和字符字面量原文保持不变。造句测验的代码卡片同时使用可用宽度，避免短声明因窄卡片被挤成多行。

实现位于 `src/teaching-code-spacing.ts` 和 `src/original/components/TeachingTokens.tsx`。显示用的分隔符不是新的教学 token；原 token 的文字、类型和点读参数保持原样，整行朗读也沿用原有拼接方式。没有生成新录音。

课程仍为每版 153 页。26 份 C/C++ 课程数据、699 条晓晓录音及其清单与 1.3.0 相同；Python 1.0.5 的应用、安装包和 460 条录音保持不变。1.3.0 的 92 程序编译、4680 状态布局扫描、286 条反馈启动和 6 条代表录音自然结束报告作为继承证据，保留原版本与原 ASAR，不能当作 1.3.1 重测结果。

## 复核命令

```powershell
node --test tests/teaching-code-spacing.test.mjs
node scripts/test-teaching-spacing.cjs --static-only
node scripts/test-teaching-spacing.cjs
```

静态脚本独立逐词分析真实课程数据，不使用生产拼接函数生成期望值。每语言覆盖 428 个活动组件渲染状态，另覆盖 230 个未挂入当前课程路由的 SmartShowcase 服务端渲染状态。后者只证明代码视图渲染，不执行其旧模拟器。7 个固定样例精确核对命名空间、递增符、模板后变量、字符串内部空格等边界。重新盘点后的 C 501、C++ 476 条实际朗读原文须与 1.3.0 逐字相同。

真实 Electron 专项在每语言 153 页的 1400×1000 初始状态核对 DOM 代码文本，另在 760×540、1400×1000 核对 48 个重点首末状态。插入空格须具有非零文字 Range 宽度；代表截图包括第 108 页格式化输出测验和用户指出的第 112 页找错测验。每语言额外点击 token、整行代码和测验反馈，检查 3 次原生 Audio 启动、精确录音路径与晓晓标识。测试将媒体静音并阻断 HTTP，不替代主观听感判断，也不宣称完整布局矩阵或全部录音重新播放。

最终结果在 `test-results/spacing-1.3.1/static.json`、`ui.json`，旧证据清单和发布前安装快照在同目录 `baseline.json`、`baseline/`。首次视觉审阅及测试工具路径问题的尝试保留在本机，不纳入当前通过证据或源码包。`prepare-spacing-baseline.mjs` 只用于首次发布前封存旧版证据，安装 1.3.1 后不要重新采集替换它。

源码打包继续使用 `scripts/package-source.py`：它分别验证继承的 1.3.0 证据、当前 1.3.1 DOM/安装证据、所有课程数据和录音 SHA，并将新拼接 helper、组件、测试、说明和最终截图纳入安全白名单。私有 AI 配置、原始私有 ASAR、备份及测试配置目录不进入源码 ZIP。
