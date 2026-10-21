import { TeachingTokens } from './TeachingTokens';
import React, { useState } from 'react';
import { SentenceSlideData } from '../data/sentenceSlides';
import { Phrase, SplitToken, CodeContainer, ColorLegend, speakText } from './CodeUi';

interface GenericSentenceSlideProps {
  data: SentenceSlideData;
}

export const GenericSentenceSlide: React.FC<GenericSentenceSlideProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  
  const { title, subtitle, stepsText, lines } = data;

  // 根据缩进级别生成padding类名
  const getIndentClass = (indent: number = 0) => {
    switch (indent) {
      case 1: return "pl-20 border-l-8 border-slate-100 ml-4";
      case 2: return "pl-40 border-l-8 border-slate-100 ml-8";
      default: return "";
    }
  };

  // 整行朗读：组合 label 和 tokens 的文本
  const handleLineSpeak = (line: typeof lines[0], e: React.MouseEvent) => {
    // 阻止冒泡，避免与 token 点击冲突
    e.stopPropagation();
    
    // 构建朗读内容
    const tokensText = line.tokens
      .filter(t => t.text.trim()) // 过滤空白
      .map(t => t.text)
      .join('');
    
    const labelPart = line.label ? `这一行是${line.label}，` : '这一行代码，';
    const contentPart = tokensText ? `内容是：${tokensText}` : '';
    
    speakText(labelPart + contentPart);
  };

  // 教学引导朗读
  const handleStepTextSpeak = () => {
    const currentStepText = stepsText[step];
    if (currentStepText) {
      speakText(currentStepText);
    }
  };

  return (
    <div className="course-slide course-sentence-slide h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="course-slide-heading text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">
          {title} {subtitle}
        </h2>
        {/* 教学步骤文字 + 朗读按钮 */}
        <div className="flex items-center justify-center gap-4 min-h-[160px]">
          <p className="text-3xl md:text-5xl text-slate-500 leading-relaxed transition-all">
            {stepsText[step]}
          </p>
          {/* 小喇叭朗读按钮 */}
          <button
            onClick={handleStepTextSpeak}
            className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-indigo-50 hover:bg-indigo-100 
                       text-indigo-500 hover:text-indigo-600 transition-all duration-200
                       flex items-center justify-center shadow-sm hover:shadow-md
                       hover:scale-110 active:scale-95"
            title="朗读教学提示"
          >
            <span className="text-2xl md:text-3xl">🔊</span>
          </button>
        </div>
      </div>

      <CodeContainer className="min-h-[400px] w-full max-w-5xl px-8 py-16 flex-col items-center justify-center">
        <div className="course-code-body flex flex-col gap-4">
          {lines.map((line, lineIndex) => (
            <div 
              key={lineIndex} 
              onClick={(e) => handleLineSpeak(line, e)}
              className={`
                course-sentence-line flex rounded-xl px-3 py-2 -mx-3
                cursor-pointer transition-all duration-200
                hover:bg-slate-100/70 hover:shadow-sm
                active:bg-slate-200/50
                group/line
                ${getIndentClass(line.indent)}
              `}
              title={`点击朗读：${line.label || '这一行代码'}`}
            >
              {/* 行号/朗读指示器 */}
              <div className="w-8 shrink-0 flex items-center justify-center mr-2 opacity-0 group-hover/line:opacity-100 transition-opacity">
                <span className="text-lg text-indigo-400">🔈</span>
              </div>
              
              <Phrase step={step} label={line.label}>
                <TeachingTokens tokens={line.tokens}>{(token, tokenIndex) => (
                  <SplitToken
                    key={`${lineIndex}-${tokenIndex}`}
                    text={token.text}
                    type={token.type}
                    colorClass={token.colorClass}
                    step={step}
                  />
                )}</TeachingTokens>
              </Phrase>
            </div>
          ))}
        </div>
      </CodeContainer>

      <div className={`course-legend transition-opacity duration-500 mt-12 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="course-step-controls mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};
