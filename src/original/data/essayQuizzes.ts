export interface EssayQuizData {
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
  };
  options: string[];
  explanations?: string[];
}


import { essayQuizzes as c } from '../../adapted-data/c/essayQuizzes';
import { essayQuizzes as cpp } from '../../adapted-data/cpp/essayQuizzes';
export const essayQuizzes = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
