import React from 'react';
import { WordQuizData } from '../data/wordQuizzes';
import { ReviewCard } from './CodeUi';
import { Phrase, SplitToken } from './CodeUi';

interface GenericWordQuizProps {
  data: WordQuizData;
}

export const GenericWordQuiz: React.FC<GenericWordQuizProps> = ({ data }) => {
  const { title, subtitle, description, tag, question, correctIndex, codeVisual, options, explanations } = data;

  const renderCodeVisual = () => {
    if (!codeVisual) return null;

    if (codeVisual.type === 'emoji') {
      return <div className="text-7xl">{codeVisual.content}</div>;
    }

    if (codeVisual.type === 'code' && codeVisual.tokens) {
      return (
        <div className="flex items-end gap-2 text-3xl">
          <Phrase step={3}>
            {codeVisual.tokens.map((token, index) => (
              <SplitToken
                key={index}
                text={token.text}
                type={token.type}
                colorClass={token.colorClass}
                step={3}
              />
            ))}
          </Phrase>
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
