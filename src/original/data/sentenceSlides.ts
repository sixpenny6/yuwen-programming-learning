/**
 * 造句阶段 - 配置数据
 */

export interface SentenceLineData {
  tokens: Array<{
    text: string;
    type: string;
    colorClass: string;
  }>;
  indent?: number; // 缩进层级，0=无缩进，1=一级缩进，2=二级缩进
  label?: string;
}

export interface SentenceSlideData {
  id: number;
  title: string;
  subtitle: string;
  stepsText: string[];
  lines: SentenceLineData[];
  scaleClass?: string;
}


import { sentenceSlides as c } from '../../adapted-data/c/sentenceSlides';
import { sentenceSlides as cpp } from '../../adapted-data/cpp/sentenceSlides';
export const sentenceSlides = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
