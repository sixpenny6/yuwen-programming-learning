/**
 * 造句阶段 - 代码用途展示数据
 * 与 sentenceSlides.ts 严格一一对应，解释"这段代码在干什么"
 */

import { CodePurposeData } from '../components/CodePurposeSlide';


import { sentencePurposeSlides as c } from '../../adapted-data/c/sentencePurposeSlides';
import { sentencePurposeSlides as cpp } from '../../adapted-data/cpp/sentencePurposeSlides';
export const sentencePurposeSlides = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
