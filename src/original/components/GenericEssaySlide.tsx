import { TeachingTokens } from './TeachingTokens';
import React, { useState } from 'react';
import { EssaySlideData } from '../data/essaySlides';
import { Phrase, SplitToken, ColorLegend } from './CodeUi';

interface GenericEssaySlideProps {
  data: EssaySlideData;
}

export const GenericEssaySlide: React.FC<GenericEssaySlideProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  
  const { title, subtitle, stepsText, blocks } = data;

  const getComponentVisualStep = (currentStep: number) => {
    if (currentStep <= 1) return 0;
    if (currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 4;
  };

  const visualStep = getComponentVisualStep(step);
  const showBlockBg = step >= 1 && step < 5;

  // 根据缩进级别生成padding类名
  const getIndentClass = (indent: number = 0) => {
    switch (indent) {
      case 1: return "pl-12";
      case 2: return "pl-24";
      case 3: return "pl-36";
      case 4: return "pl-48";
      default: return "";
    }
  };

  return (
    <div className="course-slide course-essay-slide h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="course-slide-heading text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">
          {title} {subtitle}
        </h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <div className="course-essay-code bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-100 flex flex-col gap-8 w-full max-w-6xl mx-auto">
        {blocks.map((block, blockIndex) => (
          <div 
            key={blockIndex}
            className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${
              showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''
            }`}
          >
            {showBlockBg && block.title && (
              <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">
                {block.title}
              </div>
            )}
            
            <div className="flex flex-col gap-4">
              {block.lines.map((line, lineIndex) => (
                <div 
                  key={lineIndex} 
                  className={`course-essay-line flex flex-wrap ${getIndentClass(line.indent)}`}
                >
                  <Phrase step={visualStep}>
                    <TeachingTokens tokens={line.tokens}>{(token, tokenIndex) => (
                      <SplitToken
                        key={`${blockIndex}-${lineIndex}-${tokenIndex}`}
                        text={token.text}
                        type={token.type}
                        colorClass={token.colorClass}
                        step={visualStep}
                      />
                    )}</TeachingTokens>
                  </Phrase>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`course-legend transition-opacity duration-500 mt-8 ${step >= 4 && step < 5 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="course-step-controls mt-12">
        <button 
          onClick={() => setStep((s) => (s + 1) % 6)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto"
        >
          {step === 5 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};
