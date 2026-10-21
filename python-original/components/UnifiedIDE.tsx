import React, { useState, useEffect, useRef, useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { linguisticTheme } from '../utils/linguisticTheme';
import { useCode } from './CodeContext'; 
import { Phrase } from './CodeUi'; // 引入 Phrase 组件

// ... (SYSTEM_KEYWORDS, BASIC_TOKEN_MEANINGS, COLOR_CONFIG 保持不变) ...
const SYSTEM_KEYWORDS = new Set([
  'if', 'else', 'elif', 'for', 'while', 'in', 'def', 'return', 
  'class', 'import', 'from', 'as', 'try', 'except', 'finally', 
  'pass', 'break', 'continue', 'and', 'or', 'not', 'is', 
  'None', 'True', 'False', 'print', 'input', 'range', 'len', 'int', 'str', 'float', 'list'
]);

const BASIC_TOKEN_MEANINGS: Record<string, string> = {
  'if': '如果', 'elif': '否则如果', 'else': '否则',
  'while': '当..时', 'break': '中断', 'continue': '继续',
  'def': '定义', 'return': '返回', 'class': '类',
  'print': '打印', 'input': '输入', 
  'int': '整数', 'float': '小数', 'str': '文字',
  'True': '真', 'False': '假', 'None': '空',
  '=': '设为', '+': '加', '-': '减', '*': '乘', '/': '除',
  '>': '大于', '<': '小于', '==': '等于', '!=': '不等于',
  '+=': '自增', '-=': '自减', '<=': '小于等于', '>=': '大于等于',
  ':': '：', '(': '(', ')': ')', '[': '[', ']': ']', ',': '，', '.': '的',
};

const COLOR_CONFIG = {
  'system': { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  'symbol': { text: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
  'content': { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100' },
  'default': { text: 'text-slate-600', bg: 'transparent', border: 'border-transparent' }
};

// --- 本地JavaScript解析器（备用，不依赖Pyodide）---
const localParseCode = (code: string): Record<string, ParsedToken[]> => {
  const result: Record<string, ParsedToken[]> = {};
  const lines = code.split('\n');
  
  // Python关键字和符号模式
  const keywordPattern = /\b(if|else|elif|for|while|in|def|return|class|import|from|as|try|except|finally|pass|break|continue|and|or|not|is|None|True|False|print|input|range|len|int|str|float|list)\b/g;
  const stringPattern = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  const numberPattern = /\b\d+\.?\d*\b/g;
  const operatorPattern = /[+\-*/%=<>!:(),\[\]{}\.]/g;
  const identifierPattern = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
  
  lines.forEach((line, lineIndex) => {
    const lineNum = lineIndex + 1;
    const tokens: ParsedToken[] = [];
    let tokenIndex = 0;
    
    // 简单分词：按空格和符号分割
    let pos = 0;
    const chars = line.split('');
    let currentToken = '';
    
    const pushToken = (text: string, type: string) => {
      if (!text) return;
      let colorType: ParsedToken['colorType'] = 'default';
      if (SYSTEM_KEYWORDS.has(text)) colorType = 'system';
      else if (['=', '+', '-', '*', '/', ':', '(', ')', '{', '}', '[', ']', ',', '.', '<', '>', '!', '%'].includes(text)) colorType = 'symbol';
      else if (!isNaN(Number(text)) || /^['"].*['"]$/.test(text)) colorType = 'content';
      
      tokens.push({
        id: `token-${lineNum}-${tokenIndex++}`,
        text,
        type,
        colorType
      });
    };
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      // 空格
      if (char === ' ' || char === '\t') {
        if (currentToken) {
          pushToken(currentToken, 'word');
          currentToken = '';
        }
        // 收集连续空格
        let spaces = char;
        while (i + 1 < line.length && (line[i + 1] === ' ' || line[i + 1] === '\t')) {
          i++;
          spaces += line[i];
        }
        tokens.push({
          id: `space-${lineNum}-${tokenIndex++}`,
          text: spaces,
          type: 'space',
          colorType: 'default'
        });
        continue;
      }
      
      // 字符串
      if (char === '"' || char === "'") {
        if (currentToken) {
          pushToken(currentToken, 'word');
          currentToken = '';
        }
        let str = char;
        const quote = char;
        i++;
        while (i < line.length && line[i] !== quote) {
          if (line[i] === '\\' && i + 1 < line.length) {
            str += line[i] + line[i + 1];
            i += 2;
          } else {
            str += line[i];
            i++;
          }
        }
        if (i < line.length) str += line[i]; // closing quote
        pushToken(str, 'string');
        continue;
      }
      
      // 操作符和符号
      if (['=', '+', '-', '*', '/', ':', '(', ')', '{', '}', '[', ']', ',', '.', '<', '>', '!', '%'].includes(char)) {
        if (currentToken) {
          pushToken(currentToken, 'word');
          currentToken = '';
        }
        // 检查双字符操作符
        if (i + 1 < line.length) {
          const twoChar = char + line[i + 1];
          if (['==', '!=', '<=', '>=', '+=', '-=', '*=', '/='].includes(twoChar)) {
            pushToken(twoChar, 'operator');
            i++;
            continue;
          }
        }
        pushToken(char, 'operator');
        continue;
      }
      
      // 普通字符
      currentToken += char;
    }
    
    // 处理剩余token
    if (currentToken) {
      pushToken(currentToken, 'word');
    }
    
    result[lineNum] = tokens;
  });
  
  return result;
};

interface ParsedToken {
  id: string;
  text: string;
  type: string;
  colorType: 'system' | 'symbol' | 'content' | 'default';
}

// --- 2. 核心组件：代码积木 (TokenBlock) ---
const TokenBlock: React.FC<{ token: ParsedToken; meaning: string | null }> = ({ token, meaning }) => {
  const colors = COLOR_CONFIG[token.colorType] || COLOR_CONFIG.default;
  
  if (token.type === 'space') {
    return <div style={{ width: `${token.text.length}ch` }} className="h-full shrink-0 font-mono text-2xl md:text-3xl"></div>;
  }

  return (
    <div className="flex flex-col items-center justify-end mx-[2px] group relative shrink-0">
      
      {/* 代码本体 (保持 text-3xl) */}
      <span className={`font-mono text-2xl md:text-3xl font-bold leading-none ${colors.text} z-10 transition-transform duration-200 group-hover:scale-110`}>
        {token.text}
      </span>
      
      {/* [!code modification] 翻译：大幅放大 (text-lg -> text-2xl)，增加 padding */}
      <span className={`
        mt-3 px-3 py-1.5 rounded-xl text-xl md:text-2xl font-bold tracking-wide
        border-2 ${colors.border} ${colors.bg} ${colors.text} opacity-90
        whitespace-nowrap select-none shadow-sm transition-opacity
        ${!meaning && token.colorType === 'default' ? 'opacity-0' : 'opacity-100'}
      `}>
        {meaning || token.text}
      </span>
    </div>
  );
};

// --- 3. 主组件 ---
export const UnifiedIDE = () => {
  const { setCurrentCode } = useCode();
  
  // 默认代码
  const [code, setCode] = useState(`price = 10
count = 5
total = price * count
if total > 40:
    print("太贵了")
else:
    print("买了！")`);

  const [aiMeanings, setAiMeanings] = useState<Record<string, string>>({
      'price': '单价', 'count': '数量', 'total': '总价', 
      '10': '十块', '5': '五个', '40': '预算', 
      '"太贵了"': '嫌贵', '"买了！"': '下单'
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [parsedLines, setParsedLines] = useState<Record<string, ParsedToken[]>>({});
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); 
  const [currentScenario, setCurrentScenario] = useState("");
  const [userRequest, setUserRequest] = useState(""); // 用户输入的需求
  const [showRequestInput, setShowRequestInput] = useState(false); // 是否显示输入框 

  // --- 代码运行相关状态 ---
  const [runOutput, setRunOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const runOutputRef = useRef<string[]>([]); // 用 ref 累积 stdout

  // --- input() 交互相关状态 ---
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sabSupported, setSabSupported] = useState(false);
  const sharedBufferRef = useRef<SharedArrayBuffer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const workerRef = useRef<Worker | null>(null);

  // 立即使用本地解析器初始化（确保一开始就有内容显示）
  useEffect(() => {
    const initialParsed = localParseCode(code);
    setParsedLines(initialParsed);
  }, []);

  // Worker 初始化（可选增强，如果成功会用Pyodide替换本地解析）
  useEffect(() => {
    try {
      if (workerRef.current) workerRef.current.terminate();
      
      // 修复Electron打包后的Worker路径问题
      let workerUrl = './py-worker.js';
      
      if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
        const basePath = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
        workerUrl = basePath + 'py-worker.js';
      }
      
      const w = new Worker(workerUrl);
      workerRef.current = w;

      // 尝试创建 SharedArrayBuffer（需要跨域隔离 COOP/COEP）
      let sab: SharedArrayBuffer | null = null;
      try {
        if (typeof SharedArrayBuffer !== 'undefined') {
          sab = new SharedArrayBuffer(1024); // 1KB 足够输入交互
          sharedBufferRef.current = sab;
          setSabSupported(true);
        }
      } catch (e) {
        console.log('SharedArrayBuffer 不可用，input() 将不支持');
      }

      w.postMessage({ type: 'init', buffer: sab });
      
      // 设置超时：5秒后如果Pyodide还没就绪，就放弃
      const timeout = setTimeout(() => {
        if (!isPyodideReady) {
          console.log('Pyodide加载超时，使用本地解析器');
        }
      }, 5000);
      
      w.onmessage = (e) => {
        const { type, data, content } = e.data;
        if (type === 'ready') {
          clearTimeout(timeout);
          setIsPyodideReady(true);
          w.postMessage({ type: 'parse', data: code });
        } else if (type === 'parse_complete') {
          const processedData: Record<string, ParsedToken[]> = {};
          Object.entries(data).forEach(([lineKey, tokens]: [string, any]) => {
            processedData[lineKey] = tokens.map((t: any) => {
              let colorType: ParsedToken['colorType'] = 'default';
              if (SYSTEM_KEYWORDS.has(t.text)) colorType = 'system';
              else if (t.colorClass?.includes('red') || ['=', '+', '-', '*', '/', ':', '(', ')', '{', '}'].includes(t.text)) colorType = 'symbol';
              else if (t.colorClass?.includes('green') || !isNaN(Number(t.text)) || /^['"].*['"]$/.test(t.text)) colorType = 'content';
              return { ...t, colorType };
            });
          });
          setParsedLines(processedData);
        } else if (type === 'stdout') {
          // 累积标准输出
          runOutputRef.current = [...runOutputRef.current, content];
          setRunOutput([...runOutputRef.current]);
        } else if (type === 'run_complete') {
          // 执行完成
          if (runOutputRef.current.length === 0) {
            runOutputRef.current = ['(程序执行完毕，无输出)'];
            setRunOutput([...runOutputRef.current]);
          }
          setIsRunning(false);
        } else if (type === 'input_request') {
          // Worker 请求用户输入
          setWaitingForInput(true);
          setInputValue('');
          // 自动聚焦输入框
          setTimeout(() => inputRef.current?.focus(), 100);
        } else if (type === 'input_unavailable') {
          // SharedArrayBuffer 不可用，input() 无法继续
          setRunError('input() 功能需要跨域隔离头 (COOP/COEP)，当前部署环境暂不支持。请参考下方指引在本地运行。');
          setShowGuidance(true);
          setIsRunning(false);
        } else if (type === 'error') {
          // 执行出错
          const errMsg = content || '未知错误';
          setRunError(errMsg);
          setIsRunning(false);
          setWaitingForInput(false);
          // 检测是否是浏览器环境不支持的复杂功能
          if (
            errMsg.includes('ModuleNotFoundError') ||
            errMsg.includes('No module named') ||
            errMsg.includes('FileNotFoundError') ||
            errMsg.includes('PermissionError') ||
            errMsg.includes('OSError')
          ) {
            setShowGuidance(true);
          }
        }
      };
      
      w.onerror = (err) => {
        console.log('Worker加载失败，使用本地解析器', err);
        clearTimeout(timeout);
      };
      
      return () => {
        clearTimeout(timeout);
        workerRef.current?.terminate();
      };
    } catch (err) { 
      console.log('Worker初始化失败，使用本地解析器', err);
    }
  }, []);

  // 代码变更时重新解析
  useEffect(() => {
    setCurrentCode(code);
    // 立即用本地解析器更新
    const parsed = localParseCode(code);
    setParsedLines(parsed);
    // 如果Pyodide就绪，也发给Worker（可能得到更精确的解析）
    if (isPyodideReady && workerRef.current) {
      workerRef.current.postMessage({ type: 'parse', data: code });
    }
  }, [code, isPyodideReady]);

  // AI生成代码逻辑
  const handleGenerateCode = async (scenario: string) => {
    if (isGenerating) return;
    setIsGenerating(true);
    setCurrentScenario(scenario);
    
    try {
        const API_KEY = process.env.DEEPSEEK_API_KEY || ''; 
        const API_URL = 'https://api.deepseek.com/chat/completions';

        const prompt = `
        你是一位中学编程老师。请为小学生编写一个关于“${scenario}”的 Python 代码示例。
        
        【要求】
        1. 代码要简单（5-10行），逻辑清晰。
        2. 变量名要用英文（如 score, price），但要有意义。
        3. **必须**返回一个 JSON 对象，包含代码字符串和所有自定义词汇的中文翻译。
        4. 翻译要非常“接地气”，用生活大白话，不要用计算机术语。
        
        【JSON格式范例】
        {
            "code": "age = 10\\nif age > 18:...",
            "meanings": {
                "age": "年龄",
                "10": "十岁",
                "18": "成年线",
                "print": "显示",
                "total": "总数"
            }
        }
        
        请只返回纯 JSON 字符串，不要 Markdown 格式。
        `;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: prompt }],
                stream: false
            })
        });

        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        const jsonStr = content.replace(/```json|```/g, '').trim();
        const result = JSON.parse(jsonStr);
        
        if (result.code) {
            setCode(result.code);
            setAiMeanings({ ...BASIC_TOKEN_MEANINGS, ...result.meanings });
            setIsEditMode(false);
            setShowRequestInput(false);
            setUserRequest("");
        }
    } catch (e) {
        console.error("AI 生成失败", e);
        alert("AI 开小差了，请重试一下~");
    } finally {
        setIsGenerating(false);
        setCurrentScenario("");
    }
  };

  // 处理用户自由需求生成
  const handleFreeFormGenerate = () => {
    if (!userRequest.trim()) {
      alert("请先输入你的需求");
      return;
    }
    handleGenerateCode(userRequest);
  };

  // --- 简单本地 Python 模拟器（Pyodide 未就绪时的降级方案）---
  const simpleLocalExecute = (codeStr: string): { success: boolean; output: string; error?: string; needsGuidance: boolean } => {
    try {
      const output: string[] = [];
      const vars: Record<string, any> = {};
      const lines = codeStr.split('\n');

      // 检测浏览器无法处理的复杂功能
      const hasInput = /\binput\s*\(/.test(codeStr);
      const hasComplexImport = /\bimport\s+(?!math|random)\w+/.test(codeStr);
      const hasFileOp = /\bopen\s*\(/.test(codeStr);
      const hasClass = /\bclass\s+\w+/.test(codeStr);

      if (hasInput || hasComplexImport || hasFileOp || hasClass) {
        const reasons: string[] = [];
        if (hasInput) reasons.push('包含 input() 交互输入');
        if (hasComplexImport) reasons.push('需要导入外部模块');
        if (hasFileOp) reasons.push('包含文件读写操作');
        if (hasClass) reasons.push('包含类定义');
        return { success: false, output: '', error: reasons.join('、'), needsGuidance: true };
      }

      // 检测是否包含代码块（if/for/while/def/try）—— 简单模拟器无法处理缩进块
      if (/^\s*(if|elif|else|for|while|def|try|except|with)\b/m.test(codeStr)) {
        return { success: false, output: '', error: 'Python 环境正在加载中，包含控制结构的代码需要完整环境', needsGuidance: false };
      }

      const evalExpr = (expr: string): any => {
        if (/^["'](.*)['"']$/.test(expr)) return expr.slice(1, -1);
        if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
        if (/^\w+$/.test(expr) && expr in vars) return vars[expr];
        if (expr === 'True') return true;
        if (expr === 'False') return false;
        if (expr === 'None') return null;
        // 尝试替换变量后用 JS 求值
        let jsExpr = expr;
        for (const [n, v] of Object.entries(vars)) {
          jsExpr = jsExpr.replace(new RegExp(`\\b${n}\\b`, 'g'), JSON.stringify(v));
        }
        jsExpr = jsExpr.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null');
        try { return new Function(`return (${jsExpr})`)(); } catch { return expr; }
      };

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // print(...)
        const printMatch = trimmed.match(/^print\s*\((.*)\)\s*$/);
        if (printMatch) {
          const args = printMatch[1];
          // 简单处理：逗号分隔的参数
          const parts = args.split(',').map(p => String(evalExpr(p.trim())));
          output.push(parts.join(' '));
          continue;
        }

        // 变量赋值: name = expr
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          const [, name, expr] = assignMatch;
          vars[name] = evalExpr(expr.trim());
          continue;
        }
      }

      return { success: true, output: output.length > 0 ? output.join('\n') : '(程序执行完毕，无输出)', needsGuidance: false };
    } catch (e) {
      return { success: false, output: '', error: String(e), needsGuidance: false };
    }
  };

  // --- 提交用户输入 ---
  const handleSubmitInput = () => {
    if (!sharedBufferRef.current) return;
    const sab = sharedBufferRef.current;
    const int32 = new Int32Array(sab);
    const uint8 = new Uint8Array(sab);

    // 将输入文本写入 SharedArrayBuffer
    const encoder = new TextEncoder();
    const encoded = encoder.encode(inputValue);
    
    // int32[1] = 数据长度
    Atomics.store(int32, 1, encoded.length);
    // uint8 从偏移量 8 开始写入数据
    uint8.set(encoded, 8);
    
    // 设置状态位为 1 并唤醒 Worker
    Atomics.store(int32, 0, 1);
    Atomics.notify(int32, 0, 1);

    // 清理输入状态
    setWaitingForInput(false);
    setInputValue('');
  };

  // --- 运行代码 ---
  const handleRunCode = () => {
    if (isRunning || !code.trim()) return;

    // 重置状态
    runOutputRef.current = [];
    setRunOutput([]);
    setRunError(null);
    setShowGuidance(false);
    setShowOutput(true);
    setIsRunning(true);
    setWaitingForInput(false);

    // 如果代码包含 input() 且 SharedArrayBuffer 不可用，给出提示
    const hasInput = /\binput\s*\(/.test(code);
    if (hasInput && !sabSupported) {
      setRunError('代码包含 input() 交互输入，当前环境不支持 SharedArrayBuffer（需要 HTTPS + 跨域隔离头）。请参考下方指引在本地运行。');
      setShowGuidance(true);
      setIsRunning(false);
      return;
    }

    if (isPyodideReady && workerRef.current) {
      // 使用 Pyodide 执行
      workerRef.current.postMessage({ type: 'run', data: code });
    } else {
      // Pyodide 未就绪，尝试本地简单模拟
      const result = simpleLocalExecute(code);
      if (result.success) {
        setRunOutput([result.output]);
      } else {
        if (result.error) setRunError(result.error);
        if (result.needsGuidance) setShowGuidance(true);
      }
      setIsRunning(false);
    }
  };

  // ... (AI Analyze 逻辑 保持不变) ...
  const handleAnalyzeCurrent = async () => {
    if (isGenerating || !code.trim()) return;
    setIsGenerating(true);
    try {
        const API_KEY = process.env.DEEPSEEK_API_KEY || ''; 
        const API_URL = 'https://api.deepseek.com/chat/completions';
        const prompt = `
        请分析这段 Python 代码，找出所有变量名、字符串、数字，并给出适合小学生的中文翻译（大白话）。
        返回 JSON: {"meanings": {"var": "翻译"}}
        代码：\n${code}
        `;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
            body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }] })
        });
        const res = await response.json();
        const aiDict = JSON.parse(res.choices[0]?.message?.content.replace(/```json|```/g, '').trim());
        setAiMeanings(prev => ({ ...prev, ...aiDict.meanings }));
    } catch (e) { console.error(e); } 
    finally { setIsGenerating(false); }
  };

  // ... (getMeaning 逻辑 保持不变) ...
  const getMeaning = (text: string) => {
    if (aiMeanings[text]) return aiMeanings[text];
    if (aiMeanings[text.toLowerCase()]) return aiMeanings[text.toLowerCase()];
    if (BASIC_TOKEN_MEANINGS[text]) return BASIC_TOKEN_MEANINGS[text];
    if (!isNaN(Number(text))) return text; 
    if (/^['"].*['"]$/.test(text)) {
        const content = text.slice(1, -1);
        if (aiMeanings[content]) return aiMeanings[content];
        return content.length > 5 ? content.slice(0, 4) + '..' : content;
    }
    return null;
  };

  // --- 混合式智能自动补全扩展 (Hybrid Autocompletion) ---
  const customCompletionExtension = useMemo(() => {
    const myCompletionSource = (context: CompletionContext) => {
      // 匹配光标前的单词（字母、数字、下划线）
      const word = context.matchBefore(/\w*/);
      if (!word || (word.from === word.to && !context.explicit)) return null;

      // --- A. 系统关键词 (静态字典，高优先级) ---
      const systemOptions = Object.entries(BASIC_TOKEN_MEANINGS)
        .filter(([key]) => /^[a-zA-Z_]\w*$/.test(key)) // 过滤掉符号如 =, +, :
        .map(([label, detail]) => ({
          label,
          type: 'keyword',
          detail: ` ${detail}`, // 显示中文含义，如 " 打印"
          boost: 99 // 最高优先级
        }));

      // --- B. 用户自定义变量 (从 parsedLines 实时提取 + AI 翻译) ---
      const localTokens = new Set<string>();
      // 遍历所有已解析的行，提取非系统关键词的标识符
      Object.values(parsedLines).forEach(tokens => {
        tokens.forEach(t => {
          // 只处理非空格、符合变量名规则、且不是系统关键词的 token
          if (
            t.type !== 'space' && 
            /^[a-zA-Z_]\w*$/.test(t.text) && 
            !BASIC_TOKEN_MEANINGS[t.text] &&
            !SYSTEM_KEYWORDS.has(t.text)
          ) {
            localTokens.add(t.text);
          }
        });
      });

      const variableOptions = Array.from(localTokens).map(label => {
        // 尝试从 AI 翻译字典获取中文含义
        const cnMeaning = aiMeanings[label] || aiMeanings[label.toLowerCase()] || '自定义变量';
        return {
          label,
          type: 'variable',
          detail: ` ${cnMeaning}`, // 实时反馈，如 " 总价" 或 " 自定义变量"
          boost: 50 // 中等优先级
        };
      });

      return {
        from: word.from,
        options: [...systemOptions, ...variableOptions]
      };
    };

    return autocompletion({ 
      override: [myCompletionSource],
      icons: true, // 显示类型图标
      optionClass: () => 'cm-completion-option-custom' // 可选：自定义样式类
    });
  }, [aiMeanings, parsedLines]); // 关键：依赖 parsedLines 和 aiMeanings 实现实时更新

  return (
    <div className="flex flex-col h-full w-full max-w-[1400px] mx-auto p-4 md:p-8 animate-fade-in relative">
      
      {/* 顶部：标题 + AI 灵感库 */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 gap-6">
        <div className="text-left shrink-0">
            {/* [!code modification] 放大标题: text-4xl -> text-5xl */}
            <h2 className="text-5xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                <span className="text-6xl">🧪</span> 
                <span>AI 编程实验室</span>
            </h2>
            {/* [!code modification] 放大说明: text-lg -> text-2xl */}
            <p className="text-slate-500 mt-4 text-2xl font-medium">点选场景快速开始，或描述需求让 AI 生成代码。</p>
        </div>

        {/* AI 场景选择器 */}
        <div className="flex flex-col gap-4 w-full xl:w-auto">
            <div className="flex flex-wrap gap-4 bg-white p-3 rounded-3xl shadow-sm border border-slate-100">
                {[
                    { icon: '🛒', label: '超市购物', id: '计算总价，判断是否超预算' },
                    { icon: '💯', label: '成绩判断', id: '根据分数判断优秀或及格' },
                    { icon: '🔁', label: '循环累加', id: '计算1到100的和' },
                    { icon: '🎲', label: '猜数字', id: '猜一个数字，直到猜对为止' },
                ].map(scene => (
                    <button
                        key={scene.label}
                        onClick={() => handleGenerateCode(scene.id)}
                        disabled={isGenerating}
                        className={`
                            flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-200
                            ${isGenerating && currentScenario === scene.id 
                                ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md hover:-translate-y-0.5'}
                        `}
                    >
                        <span className="text-3xl">{isGenerating && currentScenario === scene.id ? '⏳' : scene.icon}</span>
                        <span className="font-bold text-xl">{scene.label}</span>
                    </button>
                ))}
            </div>
            
            {/* AI 自由需求输入区 */}
            <div className="flex gap-3">
                <button
                    onClick={() => setShowRequestInput(!showRequestInput)}
                    className={`
                        flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-200 font-bold text-xl
                        ${showRequestInput 
                            ? 'bg-indigo-500 border-indigo-600 text-white' 
                            : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400'}
                    `}
                >
                    <span className="text-3xl">🤖</span>
                    <span>{showRequestInput ? '收起' : 'AI 自由生成'}</span>
                </button>
                
                {showRequestInput && (
                    <div className="flex-1 flex gap-3 animate-fade-in">
                        <input
                            type="text"
                            value={userRequest}
                            onChange={(e) => setUserRequest(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleFreeFormGenerate()}
                            placeholder="描述你想要实现的功能，例如：写一个判断奇偶数的程序"
                            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 text-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            disabled={isGenerating}
                        />
                        <button
                            onClick={handleFreeFormGenerate}
                            disabled={isGenerating || !userRequest.trim()}
                            className="px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold text-xl hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? '⏳ 生成中...' : '✨ 生成'}
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* 核心区域容器 */}
      <div className="flex-1 flex flex-col rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-4 border-slate-100 relative min-h-[600px] transition-all">
        
        {/* 工具栏 */}
        <div className="bg-slate-50/80 backdrop-blur-sm px-8 py-5 border-b border-slate-200 flex justify-between items-center z-20">
            <div className="flex items-center gap-6">
                <div className="flex gap-3">
                    {/* [!code modification] 放大图例圆点 */}
                    <div className="w-5 h-5 rounded-full bg-red-400/80 shadow-sm"></div>
                    <div className="w-5 h-5 rounded-full bg-yellow-400/80 shadow-sm"></div>
                    <div className="w-5 h-5 rounded-full bg-green-400/80 shadow-sm"></div>
                </div>
                <div className="h-8 w-0.5 bg-slate-300 mx-2"></div>
                {/* [!code modification] 放大图例文字: text-xs -> text-lg */}
                <div className="flex gap-6 text-lg font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-purple-500"></span>系统虚词</span>
                    <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-red-500"></span>符号标点</span>
                    <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-green-600"></span>具体内容</span>
                </div>
            </div>
            
            <div className="flex gap-4">
                {/* 运行按钮 */}
                <button 
                    onClick={handleRunCode}
                    disabled={isRunning || isGenerating}
                    className={`
                        px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 text-xl shadow-sm border-2
                        ${isRunning 
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700 cursor-wait'
                            : 'bg-emerald-500 border-emerald-600 text-white hover:bg-emerald-600 hover:shadow-md'}
                    `}
                >
                    {isRunning ? (
                        <><span className="animate-spin inline-block">⏳</span> 运行中...</>
                    ) : (
                        <><span>▶</span> 运行代码</>
                    )}
                </button>
                {isEditMode && (
                    <button 
                        onClick={handleAnalyzeCurrent}
                        disabled={isGenerating}
                        className="px-6 py-3 rounded-2xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold text-xl transition-colors border-2 border-indigo-100"
                    >
                        {isGenerating ? '分析中...' : '🪄 分析我的代码'}
                    </button>
                )}
                <button 
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`
                        px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 text-xl shadow-sm border-2
                        ${isEditMode 
                            ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-indigo-600'}
                    `}
                >
                    {isEditMode ? '👁️ 返回阅读模式' : '✏️ 手动修改代码'}
                </button>
            </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 relative overflow-auto bg-slate-50/30">
            
            {/* 1. 阅读模式 (Visualizer) */}
            {!isEditMode && (
                <div className="p-8 md:p-12 space-y-8">
                    {code.split('\n').map((lineRaw, index) => {
                        const lineNum = index + 1;
                        const tokens = parsedLines[lineNum] || [];
                        
                        // 检查是否为空行：没有实际内容的token（排除纯空格）
                        const hasRealContent = tokens.some(t => t.type !== 'space' && t.text.trim() !== '');
                        if (!hasRealContent && !lineRaw.trim()) {
                            return <div key={lineNum} className="h-16 flex items-start">
                                <div className="w-10 text-right text-slate-300 text-lg font-mono mr-8 select-none pt-2 font-bold">{lineNum}</div>
                            </div>;
                        }

                        return (
                            <div key={lineNum} className="flex items-start group/line">
                                <div className="w-10 text-right text-slate-300 text-lg font-mono mr-8 select-none pt-2 font-bold">{lineNum}</div>
                                
                                {/* 使用 Phrase 包裹，step=3 开启划线效果 */}
                                <Phrase step={3} className="flex flex-wrap items-end gap-y-6">
                                    {tokens.map((token) => (
                                        <TokenBlock 
                                            key={token.id} 
                                            token={token} 
                                            meaning={getMeaning(token.text) || null} 
                                        />
                                    ))}
                                </Phrase>
                            </div>
                        );
                    })}
                    
                    {isGenerating && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col items-center animate-scale-in border-4 border-indigo-50">
                                <div className="text-6xl animate-bounce mb-6">🤖</div>
                                <div className="text-slate-700 font-bold text-3xl">AI 正在编写代码...</div>
                                <div className="text-slate-400 text-xl mt-4 font-medium">{currentScenario}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 2. 编辑模式 (Editor) */}
            {isEditMode && (
                <div className="absolute inset-0 bg-white z-10 p-8 animate-fade-in">
                    <CodeMirror
                        value={code}
                        height="100%"
                        extensions={[python(), customCompletionExtension, linguisticTheme]}
                        onChange={(value) => setCode(value)}
                        className="text-2xl font-mono border-4 border-indigo-100 rounded-3xl h-full overflow-hidden shadow-inner"
                        basicSetup={{
                            lineNumbers: true,
                            highlightActiveLine: true,
                            foldGutter: true,
                        }}
                    />
                </div>
            )}
        </div>

        {/* ===== 运行输出面板 ===== */}
        {showOutput && (
          <div className="mt-4 rounded-[2rem] overflow-hidden shadow-xl border-4 border-slate-100 bg-white animate-fade-in">
            {/* 输出面板头部 */}
            <div className="bg-slate-800 px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 text-2xl font-bold">⬤</span>
                <span className="text-white font-bold text-xl tracking-wide">运行结果</span>
                {isRunning && <span className="text-yellow-300 text-lg animate-pulse font-medium">● 执行中...</span>}
                {!isRunning && !runError && <span className="text-emerald-300 text-lg font-medium">✓ 完成</span>}
                {!isRunning && runError && <span className="text-red-300 text-lg font-medium">✕ 出错</span>}
                {!isPyodideReady && !isRunning && (
                  <span className="text-slate-400 text-base ml-4">⚡ Python 环境加载中，简单代码已用轻量模式运行</span>
                )}
              </div>
              <button 
                onClick={() => { setShowOutput(false); setRunOutput([]); setRunError(null); setShowGuidance(false); }}
                className="text-slate-400 hover:text-white text-2xl font-bold transition-colors px-3"
              >
                ✕
              </button>
            </div>

            {/* 输出内容 */}
            <div className="bg-slate-900 px-8 py-6 max-h-[300px] overflow-auto">
              {runOutput.length > 0 && (
                <pre className="text-emerald-300 font-mono text-xl md:text-2xl whitespace-pre-wrap leading-relaxed">
                  {runOutput.join('')}
                </pre>
              )}
              {runError && (
                <div className="mt-2">
                  <pre className="text-red-400 font-mono text-lg md:text-xl whitespace-pre-wrap leading-relaxed bg-red-950/30 p-4 rounded-xl border border-red-800/30">
                    {runError}
                  </pre>
                </div>
              )}
              {isRunning && runOutput.length === 0 && !waitingForInput && (
                <div className="flex items-center gap-4 text-slate-400 text-xl">
                  <span className="animate-spin text-2xl">⏳</span>
                  <span>正在执行 Python 代码...</span>
                </div>
              )}

              {/* input() 交互输入框 */}
              {waitingForInput && (
                <div className="mt-4 animate-fade-in">
                  <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-2 border-2 border-cyan-500/50">
                    <span className="text-cyan-400 font-mono text-xl font-bold pl-3 shrink-0">⌨️ 输入 &gt;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitInput(); }}
                      placeholder="请输入内容后按回车..."
                      className="flex-1 bg-transparent text-cyan-200 font-mono text-xl md:text-2xl outline-none placeholder:text-slate-500 px-2 py-2"
                      autoFocus
                    />
                    <button
                      onClick={handleSubmitInput}
                      className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-bold text-lg hover:bg-cyan-600 transition-colors shrink-0"
                    >
                      确认 ↵
                    </button>
                  </div>
                  <p className="text-slate-500 text-base mt-2 ml-2">程序正在等待你的输入，输入后按回车继续运行</p>
                </div>
              )}
            </div>

            {/* 复杂代码指导面板 */}
            {showGuidance && (
              <div className="bg-amber-50 border-t-4 border-amber-400 px-8 py-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl shrink-0">💡</span>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-amber-800 mb-4">这段代码需要在本地电脑上运行</h4>
                    <p className="text-lg text-amber-700 mb-5 leading-relaxed">
                      {runError && <span className="font-medium">原因：{runError}</span>}
                      {!runError && '浏览器环境对部分 Python 功能支持有限。'}
                    </p>
                    <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-sm">
                      <h5 className="text-xl font-bold text-slate-700 mb-4">📋 本地运行步骤：</h5>
                      <ol className="space-y-3 text-lg text-slate-600">
                        <li className="flex items-start gap-3">
                          <span className="bg-amber-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shrink-0">1</span>
                          <span>安装 Python：访问 <a href="https://python.org" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-medium hover:text-indigo-800">python.org</a> 下载并安装（选最新版）</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-amber-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shrink-0">2</span>
                          <span>打开 <strong>终端 / 命令提示符</strong>（Windows 搜索 "cmd"，Mac 搜索 "Terminal"）</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-amber-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shrink-0">3</span>
                          <div className="flex-1">
                            <span>新建文件 <code className="bg-slate-100 px-2 py-1 rounded text-indigo-600 font-bold">my_code.py</code>，把下面的代码粘贴进去</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-amber-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shrink-0">4</span>
                          <span>在终端输入 <code className="bg-slate-100 px-2 py-1 rounded text-indigo-600 font-bold">python my_code.py</code> 并按回车即可运行</span>
                        </li>
                      </ol>
                    </div>
                    {/* 一键复制代码 */}
                    <button
                      onClick={() => { navigator.clipboard.writeText(code); }}
                      className="mt-5 px-6 py-3 bg-amber-500 text-white rounded-2xl font-bold text-lg hover:bg-amber-600 transition-colors flex items-center gap-3 shadow-sm"
                    >
                      <span>📋</span> 复制代码到剪贴板
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};