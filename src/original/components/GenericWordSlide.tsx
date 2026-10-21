import { TeachingTokens } from './TeachingTokens';
import React, { useState } from 'react';
import { WordSlideData } from '../data/wordSlides';
import { Phrase, SplitToken, CodeContainer, ColorLegend } from './CodeUi';

interface GenericWordSlideProps {
  data: WordSlideData;
}

export const GenericWordSlide: React.FC<GenericWordSlideProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  
  const { title, subtitle, stepsText, tokens, resultText } = data;

  return (
    <div className="course-slide course-word-slide h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="course-slide-heading text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">
          {title} {subtitle}
        </h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[350px] w-full max-w-5xl px-8 py-16 md:py-24 justify-center flex-col gap-12">
        <div className="course-code-body flex items-center gap-4">
          <Phrase step={step}>
            <TeachingTokens tokens={tokens}>{(token, index) => (
              <SplitToken
                key={`${token.text}-${index}`}
                text={token.text}
                type={token.type}
                colorClass={token.colorClass}
                step={step}
              />
            )}</TeachingTokens>
          </Phrase>
        </div>
        
        {resultText && (
          <div className={`text-4xl font-mono text-indigo-400 font-bold transition-all duration-700 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {resultText}
          </div>
        )}
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
