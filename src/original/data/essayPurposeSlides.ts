/**
 * 写作阶段 - 代码用途展示数据
 * 与 essaySlides.ts 严格一一对应（共13个），解释"这段代码在干什么"
 */

import { CodePurposeData } from '../components/CodePurposeSlide';


import { essayPurposeSlides as c } from '../../adapted-data/c/essayPurposeSlides';
import { essayPurposeSlides as cpp } from '../../adapted-data/cpp/essayPurposeSlides';
export const essayPurposeSlides = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
