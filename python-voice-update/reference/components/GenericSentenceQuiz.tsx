import React from 'react';
import { SentenceQuizData } from '../data/sentenceQuizzes';
import { ReviewCard } from './CodeUi';

interface GenericSentenceQuizProps {
  data: SentenceQuizData;
}

export const GenericSentenceQuiz: React.FC<GenericSentenceQuizProps> = ({ data }) => {
  const { title, subtitle, description, tag, question, correctIndex, codeVisual, options, explanations } = data;

  const renderCodeVisual = () => {
    if (!codeVisual) return null;

    if (codeVisual.type === 'emoji') {
      return <div className="text-7xl">{codeVisual.content}</div>;
    }

    if (codeVisual.type === 'code' && codeVisual.lines) {
      return (
        <div className="text-left font-mono text-3xl font-bold bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm w-full max-w-md">
          {codeVisual.lines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className={`${lineIndex > 0 ? 'mt-2' : ''} ${
                line.indent === 1 ? 'pl-12 bg-slate-50 rounded py-1' : ''
              }`}
            >
              {line.tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className={token.colorClass}>
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">
            {title} {subtitle}
          </h2>
          <p className="text-xl text-slate-500">{description}</p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="w-full max-w-3xl h-full max-h-[700px]">
          <ReviewCard
            tag={tag}
            question={question}
            correctIndex={correctIndex}
            codeVisual={renderCodeVisual()}
            options={options}
            explanations={explanations}
          />
        </div>
      </div>
    </div>
  );
};
