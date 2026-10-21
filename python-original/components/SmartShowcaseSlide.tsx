import React, { useState, useEffect, useRef } from 'react';

// ==================== 类型定义 ====================

export interface SmartToken {
  text: string;
  type: '系统定义' | '操作符号' | '文本内容' | '注释';
  colorClass: string;
}

export interface SmartLine {
  tokens: SmartToken[];
  indent?: number;
}

export interface SmartSlideData {
  id: number;
  title: string;
  subtitle: string;
  code: SmartLine[];
  mockVars?: Record<string, any>;  // 预设变量，如 { age: 10 }
  ghostText?: Record<string, string>;  // 幽灵文字填充，如 { 'print()': '"你好"' }
  expectedOutput?: string;  // 期望的输出（如果不执行代码）
}

interface SmartShowcaseSlideProps {
  data: SmartSlideData;
}

// ==================== 辅助函数 ====================

/**
 * 判断代码类型
 */
const detectCodeType = (code: SmartLine[]): 'print' | 'calculation' | 'conditional' | 'other' => {
  const firstLine = code[0]?.tokens || [];
  const codeText = code.map(line => line.tokens.map(t => t.text).join('')).join('\n');
  
  if (firstLine.some(t => t.text.includes('print'))) return 'print';
  if (codeText.includes('if') || codeText.includes('else')) return 'conditional';
  if (codeText.match(/[+\-*/%]/) && !codeText.includes('=') && !codeText.includes('print')) return 'calculation';
  
  return 'other';
};

/**
 * 获取结果图标
 */
const getResultIcon = (type: 'print' | 'calculation' | 'conditional' | 'other', result: string) => {
  switch (type) {
    case 'print':
      return '💬';
    case 'calculation':
      return '🏷️';
    case 'conditional':
      return result.toLowerCase().includes('true') || result.includes('合格') || result.includes('A') ? '✅' : '❌';
    default:
      return '📌';
  }
};

/**
 * 执行Python代码（模拟）
 */
const executePythonCode = async (
  code: SmartLine[], 
  mockVars: Record<string, any> = {},
  ghostText: Record<string, string> = {}
): Promise<string> => {
  // 将代码转为字符串
  let codeString = code
    .map(line => {
      const indent = '  '.repeat(line.indent || 0);
      return indent + line.tokens.map(t => t.text).join('');
    })
    .join('\n');

  // 应用幽灵文字填充
  Object.entries(ghostText).forEach(([pattern, replacement]) => {
    codeString = codeString.replace(pattern, replacement);
  });

  // 简单的模拟执行
  try {
    // 注入mock变量
    let context = { ...mockVars };
    
    // 简单解析print语句
    const printMatch = codeString.match(/print\((.*?)\)/);
    if (printMatch) {
      let printContent = printMatch[1].trim();
      // 去除引号
      printContent = printContent.replace(/^["']|["']$/g, '');
      return printContent;
    }

    // 简单解析计算表达式
    const calcMatch = codeString.match(/^\s*([a-zA-Z_]\w*)\s*([+\-*/%])\s*(\d+)\s*$/);
    if (calcMatch) {
      const [, varName, op, num] = calcMatch;
      if (context[varName] !== undefined) {
        const value = context[varName];
        switch (op) {
          case '+': return String(value + Number(num));
          case '-': return String(value - Number(num));
          case '*': return String(value * Number(num));
          case '/': return String(value / Number(num));
          default: return '未知运算';
        }
      }
    }

    // 简单解析条件语句
    if (codeString.includes('if')) {
      const ifMatch = codeString.match(/if\s+([a-zA-Z_]\w*)\s*([><=!]+)\s*(\d+)/);
      if (ifMatch) {
        const [, varName, op, num] = ifMatch;
        if (context[varName] !== undefined) {
          const value = context[varName];
          const numValue = Number(num);
          let condition = false;
          
          switch (op) {
            case '>': condition = value > numValue; break;
            case '<': condition = value < numValue; break;
            case '>=': condition = value >= numValue; break;
            case '<=': condition = value <= numValue; break;
            case '==': condition = value === numValue; break;
            case '!=': condition = value !== numValue; break;
          }

          // 查找print语句
          const thenMatch = codeString.match(/if.*?:\s*print\((.*?)\)/s);
          const elseMatch = codeString.match(/else:\s*print\((.*?)\)/s);
          
          if (condition && thenMatch) {
            return thenMatch[1].replace(/["']/g, '');
          } else if (!condition && elseMatch) {
            return elseMatch[1].replace(/["']/g, '');
          }
          
          return condition ? '✓ 条件成立' : '✗ 条件不成立';
        }
      }
    }

    return '执行完成';
  } catch (error) {
    return '执行出错';
  }
};

// ==================== 主组件 ====================

export const SmartShowcaseSlide: React.FC<SmartShowcaseSlideProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  const [executionResult, setExecutionResult] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);

  const { title, subtitle, code, mockVars = {}, ghostText = {}, expectedOutput } = data;
  const codeType = detectCodeType(code);

  // 步骤配置
  const steps = [
    { label: '原始代码', desc: '查看完整的代码结构' },
    { label: '识字分析', desc: '划线标记代码组成部分' },
    { label: '设定语境', desc: mockVars && Object.keys(mockVars).length > 0 ? `预设变量：${JSON.stringify(mockVars)}` : '准备执行环境' },
    { label: '填充内容', desc: ghostText && Object.keys(ghostText).length > 0 ? '自动填入演示内容' : '代码准备就绪' },
    { label: '执行结果', desc: '查看代码运行结果' }
  ];

  // 当进入第4步时执行代码
  useEffect(() => {
    if (step === 4 && !executionResult && !isExecuting) {
      setIsExecuting(true);
      executePythonCode(code, mockVars, ghostText).then(result => {
        setExecutionResult(expectedOutput || result);
        setIsExecuting(false);
      });
    }
  }, [step, code, mockVars, ghostText, executionResult, isExecuting, expectedOutput]);

  // 重置状态
  const handleReset = () => {
    setStep(0);
    setExecutionResult('');
    setIsExecuting(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-between py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      {/* 标题区域 */}
      <div className="text-center mb-6">
        <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
          {title} {subtitle}
        </h2>
        <div className="text-2xl md:text-3xl text-slate-600 font-medium">
          {steps[step].label}
        </div>
        <div className="text-lg md:text-xl text-slate-500 mt-2">
          {steps[step].desc}
        </div>
      </div>

      {/* 代码展示区域 */}
      <div className="flex-1 flex items-center justify-center w-full max-w-6xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-slate-200 w-full">
          {/* Step 0: 原始代码 */}
          {step === 0 && (
            <div className="font-mono text-2xl md:text-3xl text-slate-800 leading-relaxed">
              {code.map((line, lineIdx) => (
                <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2}em` }}>
                  {line.tokens.map((token, tokenIdx) => (
                    <span key={tokenIdx}>{token.text}</span>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Step 1: 识字分析 - 划线 */}
          {step === 1 && (
            <div className="font-mono text-2xl md:text-3xl leading-relaxed space-y-4">
              {code.map((line, lineIdx) => (
                <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2}em` }}>
                  {line.tokens.map((token, tokenIdx) => (
                    <span
                      key={tokenIdx}
                      className="border-b-4 border-slate-800 pb-1 mx-0.5 inline-block text-slate-800 animate-fade-in"
                      style={{ animationDelay: `${tokenIdx * 100}ms` }}
                    >
                      {token.text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Step 2: 设定语境 - 加点 */}
          {step === 2 && (
            <div className="space-y-6">
              {/* 显示Mock变量 */}
              {mockVars && Object.keys(mockVars).length > 0 && (
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200 mb-6 animate-fade-in">
                  <div className="text-xl font-bold text-indigo-700 mb-3">📦 预设变量</div>
                  <div className="space-y-2">
                    {Object.entries(mockVars).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3 text-lg">
                        <span className="font-mono font-bold text-green-700">{key}</span>
                        <span className="text-slate-600">=</span>
                        <span className="font-mono text-indigo-600 font-semibold">{JSON.stringify(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 代码加点 */}
              <div className="font-mono text-2xl md:text-3xl leading-relaxed space-y-4">
                {code.map((line, lineIdx) => (
                  <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2}em` }}>
                    {line.tokens.map((token, tokenIdx) => (
                      <span key={tokenIdx} className="inline-flex flex-col items-center mx-1">
                        <span 
                          className={`w-2 h-2 rounded-full mb-1 ${token.colorClass.replace('text-', 'bg-')} animate-fade-in`}
                          style={{ animationDelay: `${tokenIdx * 100}ms` }}
                        ></span>
                        <span className="text-slate-800 border-b-4 border-slate-800 pb-1">{token.text}</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: 填充内容 - 上色 + 幽灵文字 */}
          {step === 3 && (
            <div className="space-y-6">
              {/* 显示幽灵文字说明 */}
              {ghostText && Object.keys(ghostText).length > 0 && (
                <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200 mb-6 animate-fade-in">
                  <div className="text-xl font-bold text-purple-700 mb-3">👻 自动填充</div>
                  <div className="space-y-2">
                    {Object.entries(ghostText).map(([pattern, replacement]) => (
                      <div key={pattern} className="flex items-center gap-3 text-lg">
                        <span className="font-mono text-slate-600">{pattern}</span>
                        <span className="text-slate-400">→</span>
                        <span className="font-mono text-purple-600 font-semibold">{replacement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 代码上色 */}
              <div className="font-mono text-2xl md:text-3xl leading-relaxed space-y-4">
                {code.map((line, lineIdx) => (
                  <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2}em` }}>
                    {line.tokens.map((token, tokenIdx) => {
                      // 检查是否需要应用幽灵文字
                      let displayText = token.text;
                      Object.entries(ghostText).forEach(([pattern, replacement]) => {
                        if (displayText === pattern) {
                          displayText = replacement;
                        }
                      });

                      return (
                        <span key={tokenIdx} className="inline-flex flex-col items-center mx-1">
                          <span 
                            className={`w-2 h-2 rounded-full mb-1 ${token.colorClass.replace('text-', 'bg-')}`}
                          ></span>
                          <span 
                            className={`${token.colorClass} font-bold animate-fade-in`}
                            style={{ animationDelay: `${tokenIdx * 100}ms` }}
                          >
                            {displayText}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: 执行结果 */}
          {step === 4 && (
            <div className="space-y-8">
              {/* 纯净代码 */}
              <div className="font-mono text-2xl md:text-3xl leading-relaxed space-y-4">
                {code.map((line, lineIdx) => (
                  <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2}em` }}>
                    {line.tokens.map((token, tokenIdx) => {
                      let displayText = token.text;
                      Object.entries(ghostText).forEach(([pattern, replacement]) => {
                        if (displayText === pattern) {
                          displayText = replacement;
                        }
                      });

                      return (
                        <span key={tokenIdx} className={`${token.colorClass} font-bold`}>
                          {displayText}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* 结果展示 */}
              {executionResult && (
                <div className="relative animate-fade-in mt-8">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
                    {getResultIcon(codeType, executionResult)}
                  </div>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border-4 border-indigo-300 shadow-xl mt-12">
                    <div className="text-center">
                      <div className="text-xl font-bold text-indigo-700 mb-3">执行结果</div>
                      <div className="text-3xl font-mono font-bold text-indigo-900">
                        {executionResult}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 色彩图例（Step 2, 3显示） */}
      {(step === 2 || step === 3) && (
        <div className="flex flex-wrap justify-center gap-6 mt-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-purple-600"></span>
            <span className="text-slate-600 font-bold">系统定义</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-500"></span>
            <span className="text-slate-600 font-bold">操作符号</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-700"></span>
            <span className="text-slate-600 font-bold">文本内容</span>
          </div>
        </div>
      )}

      {/* 控制按钮 */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setStep(s => (s + 1) % 5)}
          className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
        >
          {step === 4 ? '↺ 重新开始' : `下一步 (${step + 1}/5) →`}
        </button>
        
        {step > 0 && (
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            className="px-10 py-5 bg-slate-300 text-slate-700 rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:bg-slate-400 hover:scale-105 active:scale-95 transition-all"
          >
            ← 上一步
          </button>
        )}
      </div>
    </div>
  );
};
