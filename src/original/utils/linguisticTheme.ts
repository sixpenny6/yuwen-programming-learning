import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const createTheme = ({styles}: {theme:string;settings:Record<string,string>;styles:Parameters<typeof HighlightStyle.define>[0]}) => [
  EditorView.theme({'&':{backgroundColor:'#ffffff',color:'#15803d'},'.cm-content':{caretColor:'#000000'},'&.cm-focused .cm-selectionBackground, .cm-selectionBackground':{backgroundColor:'#e0e7ff'},'.cm-activeLine':{backgroundColor:'#f8fafc'},'.cm-gutters':{backgroundColor:'#f8fafc',color:'#94a3b8'}}),
  syntaxHighlighting(HighlightStyle.define(styles))
];

// === 语文编程教学法 - CodeMirror 配色主题 ===
// 与应用中的 COLOR_CONFIG 完全一致

const COLORS = {
  purple: '#9333ea', // 🟣 系统虚词 (System) - Tailwind text-purple-600
  red: '#ef4444',    // 🔴 符号标点 (Symbol) - Tailwind text-red-500
  green: '#15803d',  // 🟢 具体内容 (Content) - Tailwind text-green-700
  gray: '#94a3b8',   // 注释 (Comment)
};

// CSS 覆盖层 - 强制应用颜色到 Python 语法类
const cssOverrides = EditorView.baseTheme({
  // 关键字 (if, else, while, for, def, return, etc.)
  '.tok-keyword': { color: `${COLORS.purple} !important`, fontWeight: 'bold' },
  // 内置函数 (print, len, range, input)
  '.tok-variableName.tok-standard': { color: `${COLORS.purple} !important`, fontWeight: 'bold' },
  '.tok-builtin': { color: `${COLORS.purple} !important`, fontWeight: 'bold' },
  // 布尔值和 None
  '.tok-bool': { color: `${COLORS.purple} !important`, fontWeight: 'bold' },
  '.tok-null': { color: `${COLORS.purple} !important`, fontWeight: 'bold' },
  
  // 运算符 (=, +, -, *, /, ==, !=, <, >, etc.)
  '.tok-operator': { color: `${COLORS.red} !important`, fontWeight: 'bold' },
  '.tok-punctuation': { color: `${COLORS.red} !important`, fontWeight: 'bold' },
  // 括号
  '.tok-paren': { color: `${COLORS.red} !important`, fontWeight: 'bold' },
  '.tok-bracket': { color: `${COLORS.red} !important`, fontWeight: 'bold' },
  '.tok-squareBracket': { color: `${COLORS.red} !important`, fontWeight: 'bold' },
  '.tok-brace': { color: `${COLORS.red} !important`, fontWeight: 'bold' },
  
  // 变量名
  '.tok-variableName': { color: COLORS.green },
  // 字符串
  '.tok-string': { color: COLORS.green },
  '.tok-string2': { color: COLORS.green },
  // 数字
  '.tok-number': { color: COLORS.green },
  
  // 注释
  '.tok-comment': { color: COLORS.gray, fontStyle: 'italic' },
  
  // Python 特定的类名覆盖
  '.ͼ1 .cm-line': { color: COLORS.green }, // 默认文本为绿色
});

const baseTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: COLORS.green, // 默认颜色：用户变量显示为绿色
    caret: '#000000',
    selection: '#e0e7ff',
    selectionMatch: '#e0e7ff',
    lineHighlight: '#f8fafc',
    gutterBackground: '#f8fafc',
    gutterForeground: '#94a3b8',
  },
  styles: [
    // === 🟣 系统虚词 (System) - 紫色 ===
    { tag: t.keyword, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.moduleKeyword, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.controlKeyword, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.definitionKeyword, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.operatorKeyword, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.typeName, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.bool, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.null, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.self, color: COLORS.purple, fontWeight: 'bold' },
    { tag: t.standard(t.variableName), color: COLORS.purple, fontWeight: 'bold' },
    
    // === 🔴 符号标点 (Symbol) - 红色 ===
    { tag: t.operator, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.arithmeticOperator, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.compareOperator, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.logicOperator, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.updateOperator, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.punctuation, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.separator, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.bracket, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.squareBracket, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.paren, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.brace, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.angleBracket, color: COLORS.red, fontWeight: 'bold' },
    { tag: t.derefOperator, color: COLORS.red, fontWeight: 'bold' },
    
    // === 🟢 具体内容 (Content) - 绿色 ===
    { tag: t.variableName, color: COLORS.green },
    { tag: t.definition(t.variableName), color: COLORS.green },
    { tag: t.function(t.variableName), color: COLORS.green },
    { tag: t.propertyName, color: COLORS.green },
    { tag: t.string, color: COLORS.green },
    { tag: t.special(t.string), color: COLORS.green },
    { tag: t.number, color: COLORS.green },
    { tag: t.integer, color: COLORS.green },
    { tag: t.float, color: COLORS.green },
    
    // === 注释 (Comment) - 灰色斜体 ===
    { tag: t.comment, color: COLORS.gray, fontStyle: 'italic' },
    { tag: t.lineComment, color: COLORS.gray, fontStyle: 'italic' },
    { tag: t.blockComment, color: COLORS.gray, fontStyle: 'italic' },
  ],
});

// 导出组合主题（包含基础主题 + CSS覆盖）
export const linguisticTheme: Extension = [baseTheme, cssOverrides];
