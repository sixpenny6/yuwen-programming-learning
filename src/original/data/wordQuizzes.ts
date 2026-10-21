export interface WordQuizData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  question: string;
  correctIndex: number;
  codeVisual?: {
    type: 'code' | 'emoji';
    content: string;
    tokens?: Array<{
      text: string;
      type: string;
      colorClass: string;
    }>;
  };
  options: string[];
  explanations?: string[];
}


import { wordQuizzes as c } from '../../adapted-data/c/wordQuizzes';
import { wordQuizzes as cpp } from '../../adapted-data/cpp/wordQuizzes';
export const wordQuizzes = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
