export interface EssayBlockData {
  title?: string;
  lines: Array<{
    tokens: Array<{
      text: string;
      type: string;
      colorClass: string;
    }>;
    indent?: number;
  }>;
}

export interface EssaySlideData {
  id: number;
  title: string;
  subtitle: string;
  stepsText: string[];
  blocks: EssayBlockData[];
}


import { essaySlides as c } from '../../adapted-data/c/essaySlides';
import { essaySlides as cpp } from '../../adapted-data/cpp/essaySlides';
export const essaySlides = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
