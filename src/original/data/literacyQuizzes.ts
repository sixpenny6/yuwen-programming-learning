export interface LiteracyQuizData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  question: string;
  correctIndex: number;
  codeVisual: {
    type: 'code' | 'emoji';
    content?: string;
    tokens?: Array<{
      text: string;
      type: string;
      colorClass: string;
    }>;
  };
  options: string[];
  explanations?: string[];
}


import {literacyQuizzes as c} from '../../adapted-data/c/literacyQuizzes';
import {literacyQuizzes as cpp} from '../../adapted-data/cpp/literacyQuizzes';
export const literacyQuizzes=import.meta.env.VITE_LANGUAGE==='cpp'?cpp:c;
