import React from 'react';
import { EssayQuizData } from '../data/essayQuizzes';
import { ReviewCard } from './CodeUi';

interface GenericEssayQuizProps {
  data: EssayQuizData;
}

export const GenericEssayQuiz: React.FC<GenericEssayQuizProps> = ({ data }) => {
  const { title, subtitle, description, tag, question, correctIndex, codeVisual, options, explanations } = data;

  const renderCodeVisual = () => {
    if (!codeVisual) return null;

    if (codeVisual.type === 'emoji') {
      const parts = codeVisual.content.split(' ');
      if (parts.length === 3) {
        // 处理 "🛠️ → 📦" 格式
        return (
          <div className="flex items-center gap-6 text-6xl">
            <span>{parts[0]}</span>
            <span className="text-slate-300">{parts[1]}</span>
            <span>{parts[2]}</span>
          </div>
        );
      }
      return <div className="text-7xl">{codeVisual.content}</div>;
    }

    if (codeVisual.type === 'code') {
      // 处理 "??? my_func():" 格式
      if (codeVisual.content.includes('???')) {
        return (
          <div className="text-left font-mono text-4xl font-bold">
            <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded border border-purple-200">???</span>
            {' '}my_func():
          </div>
        );
      }
      return <div className="text-3xl font-mono">{codeVisual.content}</div>;
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
