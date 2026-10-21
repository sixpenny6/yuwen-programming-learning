export interface SentenceQuizData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  question: string;
  correctIndex: number;
  codeVisual?: {
    type: 'code' | 'emoji';
    content?: string;
    lines?: Array<{
      tokens: Array<{
        text: string;
        type: string;
        colorClass: string;
      }>;
      indent?: number;
    }>;
  };
  options: string[];
  explanations?: string[];
}


import { sentenceQuizzes as c } from '../../adapted-data/c/sentenceQuizzes';
import { sentenceQuizzes as cpp } from '../../adapted-data/cpp/sentenceQuizzes';
export const sentenceQuizzes = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
