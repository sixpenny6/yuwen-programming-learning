// import { text } from "stream/consumers";

// 修复Electron打包后的路径问题
// Worker中self.location.href指向worker文件本身的位置
const workerDir = self.location.href.substring(0, self.location.href.lastIndexOf('/') + 1);
importScripts(workerDir + "pyodide.js");

let pyodide = null;
let sharedBuffer = null;
let int32View = null;
let uint8View = null;
let stdoutBuffer = [];

function flushStdout() {
  if (stdoutBuffer.length > 0) {
    const text = stdoutBuffer.join("");
    postMessage({ type: 'stdout', content: text });
    stdoutBuffer = [];
  }
}

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    stdout: (text) => {
      stdoutBuffer.push(text);
      if (text.includes('\n')) {
        flushStdout();
      }
    }
  });
  
  // 重写 Stdin（使用 SharedArrayBuffer + Atomics 实现阻塞式输入）
  pyodide.setStdin({
    stdin: () => {
      // 1. 确保之前的输出（如 input 的提示语）已发送给主线程
      flushStdout();

      if (!sharedBuffer) {
        // SharedArrayBuffer 不可用（跨域隔离未启用），返回空
        postMessage({ type: 'input_unavailable' });
        return "";
      }

      // 2. 通知主线程我们需要输入
      postMessage({ type: 'input_request' });

      // 3. 阻塞等待主线程唤醒
      // int32View[0] 是状态位：0 = 等待输入, 1 = 输入完成
      Atomics.store(int32View, 0, 0);
      Atomics.wait(int32View, 0, 0);

      // 4. 读取数据
      // int32View[1] 是数据长度
      // uint8View 从偏移量 8 开始存储实际数据
      const dataLength = Atomics.load(int32View, 1);
      const dataSlice = uint8View.slice(8, 8 + dataLength);
      
      const decoder = new TextDecoder();
      const text = decoder.decode(dataSlice);
      
      // 5. 回显输入内容到输出面板
      postMessage({ type: 'stdout', content: text + '\n' });
      
      return text;
    }
  });

  postMessage({ type: 'ready' });
}

loadPyodideAndPackages();

onmessage = async (event) => {
  const { type, data, buffer } = event.data;

  if (type === 'init') {
    sharedBuffer = buffer;
    int32View = new Int32Array(sharedBuffer);
    uint8View = new Uint8Array(sharedBuffer);
  } else if (type === 'run') {
    if (!pyodide) {
      postMessage({ type: 'error', content: "Python 环境尚未加载完成" });
      return;
    }
    try {
      await pyodide.runPythonAsync(data);
      flushStdout();
      postMessage({ type: 'run_complete' });
    } catch (err) {
      flushStdout();
      postMessage({ type: 'error', content: err.message });
    }
  } else if (type === 'parse') {
    if (!pyodide) return;
    try {
      // 定义解析脚本
      const parseScript = `
import tokenize
from io import BytesIO
import json

def parse_code(code_str):
    tokens_by_line = {}
    try:
        # 将字符串转换为字节流进行 tokenize
        tokens_gen = tokenize.tokenize(BytesIO(code_str.encode('utf-8')).readline)
        
        last_pos = (1, 0) # (row, col) 1-based row
        token_index = 0
        
        for tok in tokens_gen:
            if tok.type == tokenize.ENCODING: continue
            if tok.type == tokenize.ENDMARKER: continue
            
            start_line, start_col = tok.start
            end_line, end_col = tok.end
            text = tok.string
            
            # 1. 处理空白间隙 (tokenize 不会显式返回空格，需要通过位置计算)
            if start_line > last_pos[0]:
                last_pos = (start_line, 0) # 换行重置
            
            if start_col > last_pos[1]:
                gap_len = start_col - last_pos[1]
                gap_text = ' ' * gap_len
                if start_line not in tokens_by_line: tokens_by_line[start_line] = []
                
                tokens_by_line[start_line].append({
                    'id': f"space-{start_line}-{token_index}",
                    'text': gap_text,
                    'type': 'space',
                    'colorClass': ''
                })
                token_index += 1
            
            # 2. 映射 Token 类型
            token_type = '文本内容'
            color_class = 'text-green-700'
            
            # 关键字列表
            KEYWORDS = {'if', 'else', 'elif', 'for', 'while', 'in', 'def', 'return', 'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'pass', 'break', 'continue', 'and', 'or', 'not', 'is', 'None', 'True', 'False', 'print', 'input', 'range', 'len', 'int', 'str', 'float', 'list'}
            
            if tok.type == tokenize.NAME:
                if text in KEYWORDS:
                    token_type = '系统定义'
                    color_class = 'text-purple-600'
                else:
                    token_type = '文本内容'
                    color_class = 'text-green-700'
            elif tok.type == tokenize.OP:
                token_type = '操作符号'
                color_class = 'text-red-500'
            elif tok.type == tokenize.STRING:
                token_type = '文本内容'
                color_class = 'text-green-700'
            elif tok.type == tokenize.NUMBER:
                token_type = '文本内容'
                color_class = 'text-green-700'
            elif tok.type == tokenize.COMMENT:
                # 注释不显示在拆解里，或者作为特殊文本
                continue 
            
            if start_line not in tokens_by_line: tokens_by_line[start_line] = []
            
            tokens_by_line[start_line].append({
                'id': f"tok-{start_line}-{token_index}",
                'text': text,
                'type': token_type,
                'colorClass': color_class
            })
            token_index += 1
            
            last_pos = tok.end

    except Exception as e:
        # 解析错误时返回空或部分结果
        pass
        
    return json.dumps(tokens_by_line)

parse_code(code_to_parse)
`;
      // 设置全局变量供 Python 脚本使用
      pyodide.globals.set("code_to_parse", data);
      
      // 运行脚本并获取结果
      const resultJson = pyodide.runPython(parseScript);
      const tokensMap = JSON.parse(resultJson);
      
      postMessage({ type: 'parse_complete', data: tokensMap });
      
    } catch (err) {
      console.error("Parse error:", err);
    }
  }
};
