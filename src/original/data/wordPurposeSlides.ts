/**
 * 组词阶段 - 代码用途展示数据
 * 与 wordSlides.ts 严格一一对应，解释"这段代码在干什么"
 */

import { CodePurposeData } from '../components/CodePurposeSlide';


import { wordPurposeSlides as c } from '../../adapted-data/c/wordPurposeSlides';
import { wordPurposeSlides as cpp } from '../../adapted-data/cpp/wordPurposeSlides';
export const wordPurposeSlides = import.meta.env.VITE_LANGUAGE === 'cpp' ? cpp : c;
