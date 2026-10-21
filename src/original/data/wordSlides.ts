/**
 * 组词阶段 - 配置数据
 */

export interface TokenData {
  text: string;
  type: string;
  colorClass: string;
}

export interface WordSlideData {
  id: number;
  title: string;
  subtitle: string;
  stepsText: string[];
  tokens: TokenData[];
  label?: string;
  resultText?: string;
  scaleClass?: string;
}


import { wordSlides as c } from '../../adapted-data/c/wordSlides';
import { wordSlides as cpp } from '../../adapted-data/cpp/wordSlides';
export const wordSlides = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
