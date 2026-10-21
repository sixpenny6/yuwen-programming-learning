import { TeachingTokens } from './TeachingTokens';
/**
 * CodePurposeSlide - 代码用途展示组件
 * 
 * 设计理念:
 * - 侧重"这段代码在干什么" - 告诉初学者代码的实际用途
 * - 简化为3步: 识字分析 → 语境填充 → 代码用途
 * - 不强调运行结果，而是解释代码含义
 * - 结果示意: print()→💬  计算→🏷️  条件判断→✅/❌
 */

import React, { useState } from 'react';

// ==================== 类型定义 ====================

export interface PurposeToken {
  text: string;
  type: '系统定义' | '操作符号' | '文本内容' | '注释';
  colorClass: string;
}

export interface PurposeLine {
  tokens: PurposeToken[];
  indent?: number;
}

export interface CodePurposeData {
  id: number;
  title: string;
  subtitle: string;
  code: PurposeLine[];
  mockVars?: Record<string, any>;       // 预设变量
  ghostText?: Record<string, string>;   // 幽灵填充
  purpose: string;                      // 核心：代码用途说明
  purposeIcon?: string;                 // 用途图标 💬🏷️✅
  expectedBehavior?: string;            // 预期行为描述
}

interface CodePurposeSlideProps {
  data: CodePurposeData;
}

// ==================== 辅助函数 ====================

const detectPurposeIcon = (code: PurposeLine[]): string => {
  const codeText = code.map(line => line.tokens.map(t => t.text).join('')).join('\n');
  
  if (codeText.includes('print')) return '💬';
  if (codeText.includes('if') || codeText.includes('else')) return '🔀';
  if (codeText.includes('for') || codeText.includes('while')) return '🔄';
  if (codeText.includes('def')) return '📦';
  if (codeText.includes('+') || codeText.includes('-') || codeText.includes('*') || codeText.includes('/')) return '🧮';
  if (codeText.includes('=')) return '📥';
  if (codeText.includes('[')) return '📋';
  
  return '💡';
};

// ==================== 主组件 ====================

export const CodePurposeSlide: React.FC<CodePurposeSlideProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  
  const { 
    title, 
    subtitle, 
    code, 
    mockVars = {}, 
    ghostText = {}, 
    purpose, 
    purposeIcon,
    expectedBehavior 
  } = data;
  
  const icon = purposeIcon || detectPurposeIcon(code);

  // 3个步骤
  const steps = [
    { 
      label: '① 识字分析', 
      desc: '划分代码结构，标记各部分词性'
    },
    { 
      label: '② 语境填充', 
      desc: Object.keys(mockVars).length > 0 
        ? `代入具体数值: ${Object.entries(mockVars).map(([k,v]) => `${k}=${v}`).join(', ')}`
        : '填入实际内容'
    },
    { 
      label: '③ 代码用途', 
      desc: '这段代码在干什么？'
    }
  ];

  const nextStep = () => {
    if (step < 2) {
      setStep(s => s + 1);
    } else {
      setStep(0);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(s => s - 1);
    }
  };

  return (
    <div className="course-slide course-purpose-slide h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      {/* 标题区域 */}
      <div className="course-slide-heading text-center mb-6">
        <div className="text-xl md:text-2xl text-slate-500 mb-2">🔍 可视化演示</div>
        <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
          {title} {subtitle}
        </h2>
        <div className="flex justify-center gap-6 mt-4">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${
                idx === step 
                  ? 'bg-indigo-600 text-white scale-110' 
                  : idx < step 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-400'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>
        <div className="text-xl md:text-2xl text-slate-600 mt-4 font-medium">
          {steps[step].desc}
        </div>
      </div>

      {/* 代码展示区域 */}
      <div className="flex-1 flex items-center justify-center w-full max-w-6xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-slate-200 w-full min-h-[400px] flex flex-col justify-center">
          
          {/* Step 0: 识字分析 - 划线+上色 */}
          {step === 0 && (
            <div className="space-y-8">
              <div className="font-mono text-3xl md:text-4xl leading-loose space-y-6">
                {code.map((line, lineIdx) => (
                  <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2.5}em` }}>
                    <TeachingTokens tokens={line.tokens}>{(token, tokenIdx) => (
                      <span
                        key={tokenIdx}
                        className={`${token.colorClass} font-bold border-b-4 border-current pb-1 mx-1 inline-block animate-fade-in`}
                        style={{ animationDelay: `${tokenIdx * 80}ms` }}
                        title={token.type}
                      >
                        {token.text}
                      </span>
                    )}</TeachingTokens>
                  </div>
                ))}
              </div>
              
              {/* 图例 */}
              <div className="flex flex-wrap justify-center gap-8 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-600"></span>
                  <span className="text-lg text-slate-600 font-bold">系统指令</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500"></span>
                  <span className="text-lg text-slate-600 font-bold">语法符号</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-700"></span>
                  <span className="text-lg text-slate-600 font-bold">数据内容</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: 语境填充 - 显示变量值和幽灵文字 */}
          {step === 1 && (
            <div className="space-y-8">
              {/* 预设变量 */}
              {Object.keys(mockVars).length > 0 && (
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 animate-fade-in">
                  <div className="text-xl font-bold text-blue-700 mb-3">📦 假设变量值为：</div>
                  <div className="flex flex-wrap gap-6">
                    {Object.entries(mockVars).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3 text-xl bg-white px-4 py-2 rounded-lg">
                        <span className="font-mono font-bold text-green-700">{key}</span>
                        <span className="text-slate-500">=</span>
                        <span className="font-mono text-indigo-600 font-bold">{JSON.stringify(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 代码展示（带幽灵文字填充） */}
              <div className="font-mono text-3xl md:text-4xl leading-loose space-y-6">
                {code.map((line, lineIdx) => (
                  <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2.5}em` }}>
                    <TeachingTokens tokens={line.tokens}>{(token, tokenIdx) => {
                      // 应用幽灵文字
                      let displayText = token.text;
                      let isGhost = false;
                      Object.entries(ghostText).forEach(([pattern, replacement]) => {
                        if (displayText === pattern || displayText.includes(pattern)) {
                          displayText = displayText.replace(pattern, replacement);
                          isGhost = true;
                        }
                      });

                      return (
                        <span
                          key={tokenIdx}
                          className={`${token.colorClass} font-bold mx-1 inline-block animate-fade-in ${
                            isGhost ? 'bg-yellow-100 px-2 rounded' : ''
                          }`}
                          style={{ animationDelay: `${tokenIdx * 80}ms` }}
                        >
                          {displayText}
                        </span>
                      );
                    }}</TeachingTokens>
                  </div>
                ))}
              </div>

              {/* 幽灵文字说明 */}
              {Object.keys(ghostText).length > 0 && (
                <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200 animate-fade-in mt-6">
                  <div className="text-xl font-bold text-purple-700 mb-3">👻 自动填入：</div>
                  <div className="flex flex-wrap gap-6">
                    {Object.entries(ghostText).map(([pattern, replacement]) => (
                      <div key={pattern} className="flex items-center gap-3 text-xl">
                        <span className="font-mono text-slate-400 line-through">{pattern}</span>
                        <span className="text-purple-500">→</span>
                        <span className="font-mono text-purple-700 font-bold bg-yellow-100 px-3 rounded">{replacement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: 代码用途 - 核心！解释代码在干什么 */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              {/* 代码（简洁展示） */}
              <div className="font-mono text-2xl md:text-3xl leading-loose space-y-4 opacity-70">
                {code.map((line, lineIdx) => (
                  <div key={lineIdx} style={{ paddingLeft: `${(line.indent || 0) * 2.5}em` }}>
                    <TeachingTokens tokens={line.tokens}>{(token, tokenIdx) => {
                      let displayText = token.text;
                      Object.entries(ghostText).forEach(([pattern, replacement]) => {
                        if (displayText === pattern || displayText.includes(pattern)) {
                          displayText = displayText.replace(pattern, replacement);
                        }
                      });
                      return (
                        <span key={tokenIdx} className={`${token.colorClass} font-bold mx-0.5`}>
                          {displayText}
                        </span>
                      );
                    }}</TeachingTokens>
                  </div>
                ))}
              </div>

              {/* 用途说明卡片 - 这是核心！ */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 md:p-10 rounded-3xl border-4 border-indigo-300 shadow-xl">
                <div className="flex items-start gap-8">
                  {/* 大图标 */}
                  <div className="text-7xl md:text-8xl animate-bounce-slow flex-shrink-0">
                    {icon}
                  </div>
                  
                  {/* 用途说明 */}
                  <div className="flex-1">
                    <div className="text-lg font-bold text-indigo-600 mb-3">💡 这段代码的作用：</div>
                    <div className="text-3xl md:text-4xl font-bold text-slate-800 leading-relaxed">
                      {purpose}
                    </div>
                    
                    {/* 预期行为 */}
                    {expectedBehavior && (
                      <div className="mt-6 p-5 bg-white rounded-xl border-2 border-indigo-200">
                        <div className="text-lg font-bold text-green-600 mb-2">🎯 具体效果：</div>
                        <div className="text-xl md:text-2xl text-slate-700 font-medium">
                          {expectedBehavior}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="course-step-controls mt-10 flex gap-6">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="px-10 py-5 bg-slate-300 text-slate-700 rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:bg-slate-400 hover:scale-105 active:scale-95 transition-all"
          >
            ← 上一步
          </button>
        )}
        <button
          onClick={nextStep}
          className="px-12 py-5 bg-indigo-600 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
        >
          {step === 2 ? '↺ 重新开始' : `下一步 →`}
        </button>
      </div>
    </div>
  );
};

// 添加自定义动画样式
const styles = `
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
`;

// 注入样式
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}
