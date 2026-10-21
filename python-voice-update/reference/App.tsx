import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { speakText, SplitToken, Phrase, CodeContainer, ColorLegend, ReviewCard } from './components/CodeUi';
import { UnifiedIDE } from './components/UnifiedIDE';
import { GenericWordSlide } from './components/GenericWordSlide';
import { wordSlides } from './data/wordSlides';
import { GenericSentenceSlide } from './components/GenericSentenceSlide';
import { sentenceSlides } from './data/sentenceSlides';
import { GenericEssaySlide } from './components/GenericEssaySlide';
import { essaySlides } from './data/essaySlides';
import { GenericWordQuiz } from './components/GenericWordQuiz';
import { wordQuizzes } from './data/wordQuizzes';
import { GenericSentenceQuiz } from './components/GenericSentenceQuiz';
import { sentenceQuizzes } from './data/sentenceQuizzes';
import { GenericEssayQuiz } from './components/GenericEssayQuiz';
import { essayQuizzes } from './data/essayQuizzes';
import { GenericLiteracyQuiz } from './components/GenericLiteracyQuiz';
import { literacyQuizzes } from './data/literacyQuizzes';
// 代码用途可视化组件和数据
import { CodePurposeSlide } from './components/CodePurposeSlide';
import { wordPurposeSlides } from './data/wordPurposeSlides';
import { sentencePurposeSlides } from './data/sentencePurposeSlides';
import { essayPurposeSlides } from './data/essayPurposeSlides';
// 代码标点法理论组件
import { CodeStructureTheory } from './components/CodeStructureTheory';

// --- 幻灯片组件定义 ---

/**
 * 封面页
 */
const CoverSlide = () => (
  <div className="h-full flex flex-col items-center py-10 md:py-20 animate-fade-in-up max-w-7xl mx-auto w-full px-4 relative">
    
    <div className="flex-1 flex flex-col justify-center items-center text-center w-full">
      <h1 className="text-[clamp(3rem,10vw,9rem)] font-extrabold text-slate-900 tracking-tight leading-tight">
        像学习语文一样<br />
        <span className="text-indigo-600">
          学习 AI编程
        </span>
      </h1>
      <h2 className="text-[clamp(1.2rem,4vw,3.75rem)] text-slate-500 font-light mt-8 md:mt-16 max-w-5xl mx-auto leading-relaxed">
        识字 → 组词 → 造句 → 写作<br/>
        <span className="font-medium text-slate-700 block mt-6 md:mt-10 text-[clamp(1rem,3vw,2.25rem)]">
          用熟悉的语文思维，在AI时代掌握计算机的语言
        </span>
      </h2>
    </div>

    <div className="shrink-0 mt-12 text-indigo-500 text-lg md:text-2xl animate-bounce font-medium">
      点击下方“下一页”开始旅程 ↓
    </div>
  </div>
);

/**
 * 课程总览页
 */
const OverviewSlide = () => (
  <div className="flex flex-col justify-center min-h-full py-20">
    <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 md:mb-24 text-slate-800">🗺️ 学习路径：从识字到写作</h2>
    
    <div className="relative flex-1 flex items-center flex-col">
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-3 bg-slate-100 -translate-y-1/2 z-0"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-4 md:px-8 relative z-10 w-full max-w-[1600px]">
        {[
          { 
            step: "01", 
            title: "识字", 
            sub: "Literacy",
            icon: "🔤",
            langDef: "认得每一个基础的汉字与标点符号",
            codeDef: "认得代码里的最小单位（系统字、名字、符号）"
          },
          { 
            step: "02", 
            title: "组词", 
            sub: "Phrasing",
            icon: "🏷️",
            langDef: "将汉字进行组合，组成有意义的词语",
            codeDef: "用最小单元组成能表达小功能的短语（词组）"
          },
          { 
            step: "03", 
            title: "造句", 
            sub: "Sentences",
            icon: "💬",
            langDef: "将词语按语法规则组合成完整的句子",
            codeDef: "用最小单元组成短语，写出一句完整的代码"
          },
          { 
            step: "04", 
            title: "写作", 
            sub: "Composition",
            icon: "📄",
            langDef: "用句子组成段落，用段落组成文章",
            codeDef: "把多个功能段落组合起来，完成一个完整任务"
          }
        ].map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => speakText(`${item.title}。${item.langDef}。例如：${item.codeDef}`)}
            className={`cursor-pointer flex flex-col items-center p-8 md:p-10 rounded-[2rem] border border-indigo-100 bg-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-300 active:scale-95 transition-all duration-300 h-full min-h-[500px] relative group`}
            title="点击朗读释意"
          >
            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 text-2xl">
                🔊
            </div>

            <div className={`text-6xl md:text-8xl mb-6 md:mb-8 text-indigo-600`}>{item.icon}</div>
            <div className="text-base md:text-lg font-bold text-slate-400 mb-3">STEP {item.step}</div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{item.title}</h3>
            <div className="text-base md:text-lg font-mono text-slate-400 mb-10 uppercase tracking-wider">{item.sub}</div>
            
            <div className="w-full text-left mt-auto space-y-8">
                <div className="relative pl-5 border-l-[6px] border-black flex flex-col justify-start">
                    <div className="text-2xl md:text-3xl text-black font-bold mb-2">语文定义</div>
                    <p className="text-2xl md:text-3xl text-black leading-relaxed">{item.langDef}</p>
                </div>
                <div className="relative pl-5 border-l-[6px] border-indigo-500 flex flex-col justify-start">
                    <div className="text-2xl md:text-3xl font-bold mb-2 opacity-80 text-blue-700">计算机释义</div>
                    <p className="text-2xl md:text-3xl text-blue-700 leading-relaxed font-medium">{item.codeDef}</p>
                </div>
            </div>
          </div>
        ))}
      </div>

      <p className="w-full text-center text-slate-400 mt-16 text-base md:text-xl animate-pulse">👆 点击卡片，听听详细解释</p>
    </div>
  </div>
);

/**
 * 章节过渡页
 */
const TransitionSlide = ({ title, subtitle, keywords = [] }: { title: string, subtitle: string, keywords?: Array<{en: string, cn: string}> }) => {
  const defaultKeywords = [
    { en: "import", cn: "导入" }, { en: "class", cn: "类" }, { en: "def", cn: "定义" },
    { en: "if", cn: "如果" }, { en: "else", cn: "否则" }, { en: "self", cn: "自身" },
    { en: "return", cn: "返回" }, { en: "None", cn: "空" }, { en: "random", cn: "随机" }
  ];
  
  const danmakuItems = useMemo(() => {
    const items = keywords.length > 0 ? keywords : defaultKeywords;
    const extendedItems = [...items, ...items, ...items];
    return extendedItems.map((item, index) => ({
        ...item,
        id: `dm-${index}`,
        top: Math.floor(Math.random() * 85) + 5 + '%', 
        duration: Math.floor(Math.random() * 15) + 15 + 's', 
        delay: Math.random() * 10 + 's', 
        size: Math.random() > 0.7 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl', 
        opacity: Math.random() * 0.4 + 0.6 
    }));
  }, [keywords]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden w-full py-10 md:py-0">
      <div className="relative z-20 bg-white/95 backdrop-blur-sm p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-2xl animate-scale-in max-w-6xl mx-6 md:mx-auto">
        <div className={`w-28 h-28 md:w-40 md:h-40 mx-auto mb-10 md:mb-14 bg-indigo-500 rounded-[2rem] shadow-xl flex items-center justify-center text-white text-6xl md:text-8xl font-bold`}>
          {title.includes('一') ? '1' : title.includes('二') ? '2' : title.includes('三') ? '3' : title.includes('四') ? '4' : '5'}
        </div>
        <h2 className="text-5xl md:text-8xl font-extrabold text-slate-800 mb-8 md:mb-12">{title}</h2>
        <p className="text-2xl md:text-4xl text-slate-500 font-light max-w-4xl mx-auto">{subtitle}</p>
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        {danmakuItems.map((item) => (
          <div 
            key={item.id}
            className={`animate-danmaku font-mono flex items-center gap-4 ${item.size}`}
            style={{ 
              top: item.top,
              animationDuration: item.duration,
              animationDelay: item.delay,
              opacity: item.opacity
            }}
          >
            <span className="font-bold shimmer-text-en">{item.en}</span>
            <span className="text-slate-300">:</span>
            <span className="shimmer-text-cn">{item.cn}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 拆分出的第一页：概念定义
const LiteracyConceptSlide = () => (
  <div className="flex flex-col justify-center items-center h-full py-8 max-w-5xl mx-auto w-full">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-7xl font-bold text-indigo-700 mb-8">识字：代码的“零件”</h2>
      <p className="text-3xl md:text-4xl text-slate-500 leading-relaxed">
        计算机语言有这三类最基础的“字”，他们分别是系统定义，操作符号，以及文本内容。
      </p>
    </div>
    
    <div className="bg-white p-12 md:p-16 rounded-[3rem] border-2 border-indigo-50 shadow-xl w-full">
      <div className="grid grid-cols-[auto_auto_auto_1fr] gap-x-8 md:gap-x-12 gap-y-12 items-center">
        {/* Row 1: 系统定义 */}
        <span className="text-purple-700 bg-purple-50 px-8 py-4 rounded-2xl text-2xl md:text-4xl font-bold w-64 text-center shadow-sm border border-purple-100">系统定义</span>
        <span className="text-slate-300 text-3xl md:text-5xl font-bold">=</span>
        <span className="text-slate-700 text-3xl md:text-4xl font-bold whitespace-nowrap">固定式</span>
        <span className="text-purple-700 text-2xl md:text-3xl font-medium">if(如果), def(定义)</span>

        {/* Row 2: 操作符号 */}
        <span className="text-red-600 bg-red-50 px-8 py-4 rounded-2xl text-2xl md:text-4xl font-bold w-64 text-center shadow-sm border border-red-100">操作符号</span>
        <span className="text-slate-300 text-3xl md:text-5xl font-bold">=</span>
        <span className="text-slate-700 text-3xl md:text-4xl font-bold whitespace-nowrap">语法标点</span>
        <span className="text-red-600 text-2xl md:text-3xl font-medium">+ (加), = (等), : (冒号)</span>

          {/* Row 3: 文本内容 */}
        <span className="text-green-700 bg-green-50 px-8 py-4 rounded-2xl text-2xl md:text-4xl font-bold w-64 text-center shadow-sm border border-green-100">文本内容</span>
        <span className="text-slate-300 text-3xl md:text-5xl font-bold">=</span>
        <span className="text-slate-700 text-3xl md:text-4xl font-bold whitespace-nowrap">自定义词</span>
        <span className="text-green-700 text-2xl md:text-3xl font-medium">姓名, 100, "你好"</span>
      </div>
    </div>
  </div>
);

// --- 系统定义关键字表组件 ---
const SystemKeywordTableSlide = () => {
  const systemKeywords = [
    { code: 'False', cn: '假', example: 'flag = False' },
    { code: 'True', cn: '真', example: 'flag = True' },
    { code: 'if', cn: '如果', example: 'if score > 60:' },
    { code: 'else', cn: '否则', example: 'else: print("no")' },
    { code: 'def', cn: '定义函数', example: 'def my_func():' },
    { code: 'return', cn: '返回', example: 'return result' },
    { code: 'for', cn: '遍历循环', example: 'for i in list:' },
    { code: 'while', cn: '条件循环', example: 'while i < 10:' },
    { code: 'import', cn: '导入模块', example: 'import math' },
    { code: 'None', cn: '空值', example: 'box = None' },
    { code: 'class', cn: '定义类', example: 'class Dog:' },
    { code: 'and', cn: '并且', example: 'if a and b:' },
    { code: 'or', cn: '或者', example: 'if a or b:' },
    { code: 'not', cn: '非/取反', example: 'if not done:' },
    { code: 'in', cn: '在...中', example: 'if x in list:' },
    { code: 'print', cn: '打印输出', example: 'print("Hi")' },
  ];

  const renderExample = (item: { code: string; example: string }) => {
    // 使用正则表达式匹配完整单词，避免 'in' 匹配到 'print' 中的部分
    const escaped = item.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(\\b${escaped}\\b)`, 'g');
    const parts = item.example.split(regex);
    return (
      <>
        {parts.map((part: string, idx: number) => (
          <React.Fragment key={idx}>
            {part === item.code ? (
              <span className="font-bold text-purple-600 px-1">{part}</span>
            ) : (
              part
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="h-full flex flex-col justify-center items-center py-6 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="flex items-center justify-between w-full mb-6 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-purple-700">识字扩展：系统定义</h2>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] shadow-xl border-2 border-purple-200 bg-white">
        <div className="overflow-x-auto max-h-[65vh]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-purple-50 border-b-2 border-purple-200">
                <th className="p-5 font-bold w-1/4 text-xl text-purple-400 pl-8">单词 (字)</th>
                <th className="p-5 font-bold w-1/4 text-xl text-purple-400">中文意思</th>
                <th className="p-5 font-bold text-xl text-purple-400">示例</th>
              </tr>
            </thead>
            <tbody className="text-xl md:text-2xl">
              {systemKeywords.map((item) => (
                <tr key={item.code} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors last:border-0">
                  <td className="p-5 pl-8 align-middle">
                    <span className="font-mono font-bold text-2xl text-purple-600">{item.code}</span>
                  </td>
                  <td className="p-5 text-slate-600 font-medium align-middle">{item.cn}</td>
                  <td className="p-5 font-mono text-slate-400 font-medium align-middle">{renderExample(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-purple-600"></span>
        <span className="text-slate-600 font-bold text-xl">系统定义 - Python 内置的保留关键字</span>
      </div>
    </div>
  );
};

// --- 操作符号关键字表组件 ---
const SymbolKeywordTableSlide = () => {
  const symbolKeywords = [
    { code: '( )', cn: '小括号 - 函数调用', example: 'print("Hi")', desc: '调用函数时传递参数' },
    { code: '[ ]', cn: '中括号 - 列表/索引', example: 'nums = [1, 2, 3]', desc: '创建列表或访问元素' },
    { code: '{ }', cn: '大括号 - 字典/集合', example: 'info = {"name": "Tom"}', desc: '创建字典存储键值对' },
    { code: ':', cn: '冒号 - 代码块开始', example: 'if score > 60:', desc: '标记代码块的开始' },
    { code: '=', cn: '赋值 - 设为', example: 'score = 100', desc: '将右边的值赋给左边' },
    { code: '==', cn: '比较 - 等于', example: 'if a == b:', desc: '判断两边是否相等' },
    { code: '!=', cn: '比较 - 不等于', example: 'if a != b:', desc: '判断两边是否不相等' },
    { code: '>', cn: '比较 - 大于', example: 'if age > 18:', desc: '判断左边是否大于右边' },
    { code: '<', cn: '比较 - 小于', example: 'if age < 18:', desc: '判断左边是否小于右边' },
    { code: '+', cn: '加法/拼接', example: 'total = a + b', desc: '数字相加或字符串拼接' },
    { code: '-', cn: '减法', example: 'diff = a - b', desc: '数字相减' },
    { code: '*', cn: '乘法/重复', example: 'area = w * h', desc: '数字相乘或字符串重复' },
    { code: '/', cn: '除法', example: 'avg = sum / n', desc: '数字相除' },
    { code: '%', cn: '取余数', example: 'rem = 10 % 3', desc: '取除法的余数' },
    { code: ',', cn: '逗号 - 分隔', example: 'a, b = 1, 2', desc: '分隔多个元素' },
    { code: '.', cn: '点号 - 访问属性', example: 'text.upper()', desc: '访问对象的方法或属性' },
  ];

  const renderExample = (item: { code: string; example: string }) => {
    // 特殊处理括号类符号
    if (item.code === '( )') {
      return <>print<span className="font-bold text-red-500">(</span>"Hi"<span className="font-bold text-red-500">)</span></>;
    }
    if (item.code === '[ ]') {
      return <>nums <span className="font-bold text-red-500">=</span> <span className="font-bold text-red-500">[</span>1, 2, 3<span className="font-bold text-red-500">]</span></>;
    }
    if (item.code === '{ }') {
      return <>info <span className="font-bold text-red-500">=</span> <span className="font-bold text-red-500">{"{"}</span>"name": "Tom"<span className="font-bold text-red-500">{"}"}</span></>;
    }
    
    const parts = item.example.split(item.code);
    return (
      <>
        {parts.map((part: string, i: number) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="font-bold text-red-500 px-1">{item.code}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="h-full flex flex-col justify-center items-center py-6 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="flex items-center justify-between w-full mb-6 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-red-600">识字扩展：操作符号</h2>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] shadow-xl border-2 border-red-200 bg-white">
        <div className="overflow-x-auto max-h-[65vh]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-red-50 border-b-2 border-red-200">
                <th className="p-5 font-bold w-1/5 text-xl text-red-400 pl-8">符号</th>
                <th className="p-5 font-bold w-1/4 text-xl text-red-400">含义/用法</th>
                <th className="p-5 font-bold text-xl text-red-400">示例</th>
              </tr>
            </thead>
            <tbody className="text-xl md:text-2xl">
              {symbolKeywords.map((item) => (
                <tr key={item.code} className="border-b border-red-50 hover:bg-red-50/50 transition-colors last:border-0">
                  <td className="p-5 pl-8 align-middle">
                    <span className="font-mono font-bold text-2xl text-red-500">{item.code}</span>
                  </td>
                  <td className="p-5 text-slate-600 font-medium align-middle">
                    <div>{item.cn}</div>
                    <div className="text-sm text-slate-400 mt-1">{item.desc}</div>
                  </td>
                  <td className="p-5 font-mono text-slate-400 font-medium align-middle">{renderExample(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-red-500"></span>
        <span className="text-slate-600 font-bold text-xl">操作符号 - 执行运算和控制结构的符号</span>
      </div>
    </div>
  );
};

// --- 文本内容关键字表组件 ---
const ContentKeywordTableSlide = () => {
  const contentKeywords = [
    { code: '"你好"', cn: '字符串 - 文本', example: 'print("你好")' },
    { code: "'Hello'", cn: '字符串 - 文本', example: "msg = 'Hello'" },
    { code: '100', cn: '整数', example: 'score = 100' },
    { code: '3.14', cn: '小数/浮点数', example: 'pi = 3.14' },
    { code: 'name', cn: '变量名 - 自定义标识符', example: 'name = "Tom"' },
    { code: 'age', cn: '变量名 - 自定义标识符', example: 'age = 18' },
    { code: 'result', cn: '变量名 - 存储结果', example: 'result = a + b' },
    { code: 'total', cn: '变量名 - 存储总计', example: 'total = 0' },
    { code: 'count', cn: '变量名 - 存储计数', example: 'count = count + 1' },
    { code: 'items', cn: '变量名 - 存储列表', example: 'items = [1, 2, 3]' },
    { code: 'data', cn: '变量名 - 存储数据', example: 'data = {}' },
    { code: 'i', cn: '循环变量 - 常用索引', example: 'for i in range(10):' },
  ];

  const renderExample = (item: { code: string; example: string }) => {
    // 使用正则表达式匹配完整单词，避免 'i' 匹配到 'in' 中的部分
    const escaped = item.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(\\b${escaped}\\b)`, 'g');
    const parts = item.example.split(regex);
    return (
      <>
        {parts.map((part: string, idx: number) => (
          <React.Fragment key={idx}>
            {part === item.code ? (
              <span className="font-bold text-green-700 px-1">{part}</span>
            ) : (
              part
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="h-full flex flex-col justify-center items-center py-6 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="flex items-center justify-between w-full mb-6 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-green-700">识字扩展：文本内容</h2>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] shadow-xl border-2 border-green-200 bg-white">
        <div className="overflow-x-auto max-h-[65vh]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-green-50 border-b-2 border-green-200">
                <th className="p-5 font-bold w-1/4 text-xl text-green-500 pl-8">单词 (字)</th>
                <th className="p-5 font-bold w-1/4 text-xl text-green-500">中文意思</th>
                <th className="p-5 font-bold text-xl text-green-500">示例</th>
              </tr>
            </thead>
            <tbody className="text-xl md:text-2xl">
              {contentKeywords.map((item) => (
                <tr key={item.code} className="border-b border-green-50 hover:bg-green-50/50 transition-colors last:border-0">
                  <td className="p-5 pl-8 align-middle">
                    <span className="font-mono font-bold text-2xl text-green-700">{item.code}</span>
                  </td>
                  <td className="p-5 text-slate-600 font-medium align-middle">{item.cn}</td>
                  <td className="p-5 font-mono text-slate-400 font-medium align-middle">{renderExample(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-green-600"></span>
        <span className="text-slate-600 font-bold text-xl">文本内容 - 你自己定义的数据和变量名</span>
      </div>
    </div>
  );
};

// --- [新组件] 第二阶段：组词 (Phrasing) - Intro (print) ---
const WordSlideIntro = () => {
  const [step, setStep] = useState(0);
  const stepsText = [
    "这是代码世界里最基础的“动词短语”：print( )。",
    "✂️ 1. 分词：区分指令动作与语法符号的边界。",
    "🔍 2. 识别：定位核心动词与必需的“小尾巴”。",
    "🏷️ 3. 词性：紫色代表系统动作，红色代表语法格式。",
    "🧠 4. 内化：动词后紧跟括号，这是标准调用格式。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">组词：动作格式 (1/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[350px] w-full max-w-5xl px-8 py-16 md:py-24 justify-center">
        <div className="transform origin-center scale-150">
            <Phrase step={step} label="动作词组">
              <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={step} />
              <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={step} />
              <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- 第二阶段：组词 (Phrasing) - Action (print("你好")) ---
const WordSlideAction = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "现在，我们在动作词组里填入内容：你好。",
    "✂️ 1. 分词：将指令、括号与内容独立开来。",
    "🔍 2. 识别：辨认系统指令与自定义内容。",
    "🏷️ 3. 词性：绿色代表“实词”，是我们想表达的内容。",
    "🧠 4. 内化：这是一个完整的主谓宾指令结构。"
  ];
  
  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">组词：执行动作 (2/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[350px] w-full max-w-5xl px-8 py-16 md:py-24 justify-center">
        <div className="transform origin-center scale-150">
            <Phrase step={step}>
            <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={step} />
            <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={step} />
            <SplitToken text='"你好"' type="文本内容" colorClass="text-green-700" step={step} />
            <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- 第二阶段：组词 (Phrasing) - Math (age + 1) ---
const WordSlideMath = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个简单的数学短语：年龄加一岁。",
    "✂️ 1. 分词：将数学表达式拆分为数据与符号。",
    "🔍 2. 识别：定位变量（名词）与运算符（连词）。",
    "🏷️ 3. 词性：绿色为数据实体，红色为运算逻辑。",
    "🧠 4. 内化：理解变量与常量的运算关系。"
  ];
  
  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">组词：简单计算 (3/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[350px] w-full max-w-5xl px-8 py-16 md:py-24 justify-center">
        <div className="transform origin-center scale-150">
            <Phrase step={step}>
            <SplitToken text="age" type="文本内容" colorClass="text-green-700" step={step} />
            <SplitToken text="+" type="操作符号" colorClass="text-red-500" step={step} />
            <SplitToken text="1" type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第二阶段：组词 (Phrasing) - Math Complex (num1 + num2) ---
const WordSlideMathPlus = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个纯变量组成的数学词组。",
    "✂️ 1. 分词：独立出每一个参与运算的词汇。",
    "🔍 2. 识别：两个都是“代词”（变量），中间是“连词”（加号）。",
    "🏷️ 3. 词性：绿色代表可变数值，红色代表固定规则。",
    "🧠 4. 解析：num1 + num2 本身就代表一个“求和”的结果。"
  ];
  
  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">组词：变量组合 (4/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[350px] w-full max-w-5xl px-8 py-16 md:py-24 justify-center">
        <div className="transform origin-center scale-150 flex items-center gap-4">
            <Phrase step={step} label="纯变量短语">
                <SplitToken text="num1" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="+" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="num2" type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第二阶段：组词 (Phrasing) - Compare (score > 60) ---
// [新增示例] 逻辑判断词组
const WordSlideCompare = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个判断词组：比较两者的大小关系。",
    "✂️ 1. 分词：区分出参与比较的双方和比较符号。",
    "🔍 2. 识别：注意 >= 是一个整体，表示大于或等于。",
    "🏷️ 3. 词性：绿色为数值内容，红色为逻辑连接符。",
    "🧠 4. 解析：这个词组的结果是“真”或“假”。"
  ];
  
  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">组词：逻辑判断 (5/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[350px] w-full max-w-5xl px-8 py-16 md:py-24 justify-center">
        <div className="transform origin-center scale-150 flex items-center gap-4">
            <Phrase step={step} label="比较短语">
                <SplitToken text="score" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=">=" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="60" type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第二阶段：组词 (Phrasing) - String (greeting * 3) ---
const WordSlideString = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "编程特有的“造词法”：让文字像数字一样运算。",
    "✂️ 1. 分词：左边是文字变量，右边是数字常量。",
    "🔍 2. 识别：注意 * 号在这里不是乘法，而是“重复”。",
    "🏷️ 3. 词性：绿色为内容，红色为操作指令。",
    "🧠 4. 解析：'问候语' * 3 = '问候语问候语问候语'。"
  ];
  
  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">组词：文字造词 (6/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
          {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[350px] w-full max-w-5xl px-8 py-16 md:py-24 justify-center flex-col gap-12">
        <div className="transform origin-center scale-150 flex items-center gap-4">
            <Phrase step={step} label="排比修辞">
                <SplitToken text="greeting" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="*" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="3" type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
        </div>
        
        {/* 结果展示 */}
        <div className={`text-4xl font-mono text-indigo-400 font-bold transition-all duration-700 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
           ➔ "你好你好你好"
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- 第三阶段：造句 ---

// 1. 造句：基础判断 (If)
const SentenceSlideIf = () => {
  const [step, setStep] = useState(0);
  const stepsText = [
    "这是一个完整的条件句：若满足条件，则执行动作。",
    "✂️ 1. 断句：识别条件判断语句的结构边界。",
    "🔍 2. 定位：找出关键词 'if' 与条件表达式。",
    "🏷️ 3. 词性：紫色触发系统逻辑，红色构建语法骨架。",
    "🧠 4. 内化：理解“因果关系”在代码中的表达。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">造句：逻辑判断 (1/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[400px] w-full max-w-5xl px-8 py-16 flex-col items-center justify-center">
        <div className="transform origin-center scale-130 flex flex-col gap-4">
            <div className="flex">
            <Phrase step={step} label="条件词">
                <SplitToken text="if" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="score" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=">" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="60" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
            
            <div className="flex pl-20 border-l-8 border-slate-100 ml-4">
            <Phrase step={step} label="动作词">
                <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"合格"' type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// 2. 造句：二选一 (If-Else)
const SentenceSlideIfElse = () => {
  const [step, setStep] = useState(0);
  const stepsText = [
    "这是一个分支句：非此即彼的选择逻辑。",
    "✂️ 1. 结构分析：切分出“真”与“假”两个执行分支。",
    "🔍 2. 定位：标记关键节点，理清跳转逻辑。",
    "🏷️ 3. 词性：'if' 和 'else' 是控制流程的指挥官。",
    "🧠 4. 内化：掌握完整的二元分支结构。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">造句：二选一 (2/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[400px] w-full max-w-5xl px-8 py-16 flex-col items-center justify-center">
        <div className="transform origin-center space-y-6 w-full max-w-3xl scale-130">
            {/* Branch 1 */}
            <div className="flex">
            <Phrase step={step}>
                <SplitToken text="if" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="score" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=">" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="90" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
            <div className="flex pl-16">
            <Phrase step={step}>
                <SplitToken text="grade" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"A"' type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
            </div>
            
            {/* Branch 2 */}
            <div className="flex mt-4">
            <Phrase step={step}>
                <SplitToken text="else" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
            <div className="flex pl-16">
            <Phrase step={step}>
                <SplitToken text="grade" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"F"' type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
            </div>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// 3. 造句：循环往复 (For)
const SentenceSlideFor = () => {
  const [step, setStep] = useState(0);
  const stepsText = [
    "这是一个循环句：批量处理集合中的数据。",
    "✂️ 1. 结构分析：注意 'in' 介词，表示“在...范围之内”。",
    "🔍 2. 关键词识别：标记循环变量与目标集合。",
    "🏷️ 3. 词性：'for' 和 'in' 定义了遍历的规则。",
    "🧠 4. 内化：理解流水线式的批量处理逻辑。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-7xl font-bold text-indigo-700 mb-8">造句：循环往复 (3/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[400px] w-full max-w-5xl px-8 py-16 flex-col items-center justify-center">
        <div className="flex flex-col gap-4 scale-130 transform origin-center">
            {/* for s in scores: */}
            <div className="flex">
            <Phrase step={step}>
                <SplitToken text="for" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="s" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="in" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="scores" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
            
            {/* total = total + s */}
            <div className="flex pl-20 border-l-8 border-slate-100 ml-4">
            <Phrase step={step}>
                <SplitToken text="total" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="total" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="+" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="s" type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
            </div>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第三阶段：造句 (Sentences) - While循环 ---
// [新增示例] while 循环
const SentenceSlideWhile = () => {
  const [step, setStep] = useState(0);
  const stepsText = [
    "这是一个“坚持句”：只要条件满足，就一直做下去。",
    "✂️ 1. 结构分析：识别 while 关键字和退出条件。",
    "🔍 2. 关键点：注意缩进块是重复执行的内容。",
    "🏷️ 3. 词性：紫色代表循环规则，绿色控制循环次数。",
    "🧠 4. 内化：理解“当...时”的持续性逻辑。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-7xl font-bold text-indigo-700 mb-8">造句：坚持到底 (4/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[400px] w-full max-w-5xl px-8 py-16 flex-col items-center justify-center">
        <div className="flex flex-col gap-4 scale-130 transform origin-center">
            {/* while power > 0: */}
            <div className="flex">
            <Phrase step={step}>
                <SplitToken text="while" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="power" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=">" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="0" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
            
            {/* print("Running") */}
            <div className="flex pl-20 border-l-8 border-slate-100 ml-4">
            <Phrase step={step}>
                <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"Running"' type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>

             {/* power = power - 1 */}
             <div className="flex pl-20 border-l-8 border-slate-100 ml-4">
            <Phrase step={step}>
                <SplitToken text="power" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="power" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="-" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="1" type="文本内容" colorClass="text-green-700" step={step} />
            </Phrase>
            </div>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// 4. 造句：列表集合 (List - Fruits)
const SentenceSlideList = () => {
  const [step, setStep] = useState(0);
  const stepsText = [
    "这是一个数据列队：列表结构的基础形态。",
    "✂️ 1. 结构分析：识别方括号定义的容器边界。",
    "🔍 2. 定位：注意逗号分隔符，它区分了独立的元素。",
    "🏷️ 3. 词性：绿色为元素内容，红色为容器结构。",
    "🧠 4. 内化：掌握“列表” (List) 这种数据容器。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-6">
      <div className="text-center mb-10 w-full">
        <h2 className="text-4xl md:text-7xl font-bold text-indigo-700 mb-8">造句：列表集合 (5/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[400px] w-full max-w-5xl px-8 py-16 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8 scale-130 transform origin-center">
            {/* fruits = ["apple", "banana"] */}
            <div className="flex">
            <Phrase step={step}>
                <SplitToken text="fruits" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="[" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"apple"' type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="," type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"banana"' type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="]" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
            
            {/* print(fruits) */}
            <div className="flex">
            <Phrase step={step}>
                <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="fruits" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第三阶段：造句 (Sentences) - 列表篇 Plus (Students) ---
const SentenceSlideListPlus = () => {
  const [step, setStep] = useState(0);
  const stepsText = [
    "这是一个“罗列句”进阶版：更丰富的数据集合。",
    "✂️ 1. 结构分析：利用方括号与逗号进行数据分列。",
    "🔍 2. 定位：确认每一个独立的数据项。",
    "🏷️ 3. 词性：绿色代表具体数据，红色维持队列秩序。",
    "🧠 4. 内化：理解有序集合的组织方式。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-6">
      <div className="text-center mb-10 w-full">
        <h2 className="text-4xl md:text-7xl font-bold text-indigo-700 mb-8">造句：列表集合 (6/6)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <CodeContainer className="min-h-[400px] w-full max-w-5xl px-8 py-16 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8 scale-130 transform origin-center">
            {/* students = ["小明", "小红", ...] */}
            <div className="flex flex-wrap justify-center">
            <Phrase step={step}>
                <SplitToken text="students" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="[" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"小明"' type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="," type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"小红"' type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="," type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text='"小刚"' type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text="]" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
            
            {/* print(students) */}
            <div className="flex">
            <Phrase step={step}>
                <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={step} />
                <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={step} />
                <SplitToken text="students" type="文本内容" colorClass="text-green-700" step={step} />
                <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={step} />
            </Phrase>
            </div>
        </div>
      </CodeContainer>

      <div className={`transition-opacity duration-500 mt-12 scale-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setStep((s) => (s + 1) % 5)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-3xl text-2xl md:text-3xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          {step === 4 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- 第四阶段：写作 (Essay) - EssaySlide (Total) ---
const EssaySlide = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个完整的功能段落：函数的定义与调用。",
    "🧱 1. 结构分层：区分“功能定义区”与“功能执行区”。",
    "✂️ 2. 内部断句：在段落内部进行精细的分词。",
    "🔍 3. 关键识别：定位参数与返回值。",
    "🏷️ 4. 词性：区分系统语法词与自定义逻辑词。",
    "🧠 5. 解析：理解封装与复用的编程思想。"
  ];

  const getComponentVisualStep = (currentStep: number) => {
    if (currentStep <= 1) return 0;
    if (currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 4;
  };

  const visualStep = getComponentVisualStep(step);
  const showBlockBg = step >= 1 && step < 5;

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">写作：累加求和 (1/5)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-100 flex flex-col gap-8 w-full max-w-6xl mx-auto">
        
        {/* Function Definition Block */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 1：定义“计算总价”这个动作</div>}
           
           <div className="flex flex-col gap-4">
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="def" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="total" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="price" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="," type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="num" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             <div className="flex pl-12">
               <Phrase step={visualStep}>
                 <SplitToken text="return" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="price" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="*" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="num" type="文本内容" colorClass="text-green-700" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>

        {/* Function Call Block */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">句子 2：使用这个动作 (10块钱，买5个)</div>}
           
           <div className="flex flex-col gap-4">
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="pay" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="total" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="10" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="," type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="5" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             <div className="flex">
               <Phrase step={visualStep}>
                 <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="pay" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>
      </div>

      <div className={`transition-opacity duration-500 mt-8 ${step >= 4 && step < 5 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-12">
        <button 
          onClick={() => setStep((s) => (s + 1) % 6)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto"
        >
          {step === 5 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第四阶段：写作 (Essay) - EssaySlidePlus (Duplicates) ---
const EssaySlidePlus = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个“查重”功能段落：判断列表里有没有重复的东西。",
    "🧱 1. 模块化分析：识别“说明书”(Def)与“操作指令”(Call)。",
    "✂️ 2. 内部断句：切分出关键的控制流动作。",
    "🔍 3. 关键识别：len(长度) 与 set(集合) 是系统工具。",
    "🏷️ 4. 词性：紫色代表系统能力，绿色代表处理数据。",
    "🧠 5. 解析：理解“标准功能段落”的构成规范。"
  ];

  const getComponentVisualStep = (currentStep: number) => {
    if (currentStep <= 1) return 0;
    if (currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 4;
  };

  const visualStep = getComponentVisualStep(step);
  const showBlockBg = step >= 1 && step < 5;

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">写作：定义功能段落 (2/5)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-100 flex flex-col gap-8 w-full max-w-6xl mx-auto">
        
        {/* Function Definition Block */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 1：定义“查重”这个功能</div>}
           
           <div className="flex flex-col gap-4">
             {/* def has_duplicates(lst): */}
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="def" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="has_duplicates" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="lst" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             {/* return len(lst) != len(set(lst)) */}
             <div className="flex pl-12 flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="return" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="len" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="lst" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="!=" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="len" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="set" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="lst" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>

        {/* Function Call Block */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 2：使用这个功能检查数据</div>}
           
           <div className="flex flex-col gap-4">
             {/* check = has_duplicates([1, 2, 1]) */}
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="check" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="has_duplicates" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="[" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="1" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="," type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="2" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="," type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="1" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="]" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             {/* print(check) */}
             <div className="flex">
               <Phrase step={visualStep}>
                 <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="check" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>
      </div>

      <div className={`transition-opacity duration-500 mt-8 scale-150 ${step >= 4 && step < 5 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-12">
        <button 
          onClick={() => setStep((s) => (s + 1) % 6)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto"
        >
          {step === 5 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第四阶段：写作 (Essay) - 3. 动作段落 (Greet) ---
// [新增示例] 动作段落
const EssaySlideGreet = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个“动作”功能段落：纯粹执行操作，没有返回值。",
    "🧱 1. 结构分层：上面是“定义动作”，下面是“触发动作”。",
    "✂️ 2. 内部断句：切分出拼接字符串的逻辑。",
    "🔍 3. 关键识别：name 是参数，print 是核心动作。",
    "🏷️ 4. 词性：绿色为自定义内容，紫色为系统指令。",
    "🧠 5. 解析：不需要 return，只是为了做一件事。"
  ];

  const getComponentVisualStep = (currentStep: number) => {
    if (currentStep <= 1) return 0;
    if (currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 4;
  };

  const visualStep = getComponentVisualStep(step);
  const showBlockBg = step >= 1 && step < 5;

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">写作：动作段落 (3/5)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-100 flex flex-col gap-8 w-full max-w-6xl mx-auto">
        
        {/* Definition */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 1：定义“打招呼”动作</div>}
           
           <div className="flex flex-col gap-4">
             {/* def say_hi(name): */}
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="def" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="say_hi" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="name" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             {/* print("Hi, " + name) */}
             <div className="flex pl-12 flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text='"Hi, "' type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="+" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="name" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>

        {/* Call */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 2：对小明使用这个动作</div>}
           
           <div className="flex flex-col gap-4">
             {/* say_hi("XiaoMing") */}
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="say_hi" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text='"XiaoMing"' type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>
      </div>

      <div className={`transition-opacity duration-500 mt-8 scale-150 ${step >= 4 && step < 5 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-12">
        <button 
          onClick={() => setStep((s) => (s + 1) % 6)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto"
        >
          {step === 5 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第四阶段：写作 (Essay) - 4. 计算段落 (Area) ---
// [新增示例] 计算段落
const EssaySlideCalc = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个“计算”功能段落：输入长宽，返回面积。",
    "🧱 1. 结构分层：定义计算规则与获取计算结果。",
    "✂️ 2. 内部断句：切分出数学运算部分。",
    "🔍 3. 关键识别：两个参数 w, h 和返回结果。",
    "🏷️ 4. 词性：绿色为数学变量，红色为运算符。",
    "🧠 5. 解析：像数学公式一样的纯粹函数。"
  ];

  const getComponentVisualStep = (currentStep: number) => {
    if (currentStep <= 1) return 0;
    if (currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 4;
  };

  const visualStep = getComponentVisualStep(step);
  const showBlockBg = step >= 1 && step < 5;

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">写作：计算段落 (4/5)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-100 flex flex-col gap-8 w-full max-w-6xl mx-auto">
        
        {/* Definition */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 1：定义面积公式</div>}
           
           <div className="flex flex-col gap-4">
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="def" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="rect_area" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="w" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="," type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="h" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             <div className="flex pl-12 flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="return" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="w" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="*" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="h" type="文本内容" colorClass="text-green-700" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>

        {/* Call */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 2：计算长5宽4的面积</div>}
           
           <div className="flex flex-col gap-4">
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="area" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="rect_area" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="5" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="," type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="4" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>
      </div>

      <div className={`transition-opacity duration-500 mt-8 scale-150 ${step >= 4 && step < 5 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-12">
        <button 
          onClick={() => setStep((s) => (s + 1) % 6)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto"
        >
          {step === 5 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// --- [新组件] 第四阶段：写作 (Essay) - 5. 决策段落 (Check) ---
// [新增示例] 决策段落
const EssaySlideLogic = () => {
  const [step, setStep] = useState(0); 
  const stepsText = [
    "这是一个“决策”功能段落：内部包含判断逻辑。",
    "🧱 1. 结构分层：定义规则区与执行区。",
    "✂️ 2. 内部断句：识别 if 语句块。",
    "🔍 3. 关键识别：模运算 % 和相等判断 ==。",
    "🏷️ 4. 词性：紫色控制流程，绿色传递信息。",
    "🧠 5. 解析：函数不仅仅是计算，还能做决定。"
  ];

  const getComponentVisualStep = (currentStep: number) => {
    if (currentStep <= 1) return 0;
    if (currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 4;
  };

  const visualStep = getComponentVisualStep(step);
  const showBlockBg = step >= 1 && step < 5;

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">写作：决策段落 (5/5)</h2>
        <p className="text-3xl md:text-5xl text-slate-500 min-h-[160px] leading-relaxed transition-all">
           {stepsText[step]}
        </p>
      </div>

      <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-100 flex flex-col gap-8 w-full max-w-6xl mx-auto">
        
        {/* Definition */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 1：定义偶数判断规则</div>}
           
           <div className="flex flex-col gap-4">
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="def" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="check" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="n" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             <div className="flex pl-12 flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="if" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text="n" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="%" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="2" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="==" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="0" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
             <div className="flex pl-24 flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="return" type="系统定义" colorClass="text-purple-600" step={visualStep} />
                 <SplitToken text='"偶数"' type="文本内容" colorClass="text-green-700" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>

        {/* Call */}
        <div className={`transition-all duration-500 p-4 md:p-6 rounded-3xl ${showBlockBg ? 'bg-indigo-50 border-l-4 md:border-l-8 border-indigo-400' : ''}`}>
           {showBlockBg && <div className="text-lg md:text-xl text-indigo-500 font-bold mb-4 animate-fade-in">段落 2：检查数字 4</div>}
           
           <div className="flex flex-col gap-4">
             <div className="flex flex-wrap">
               <Phrase step={visualStep}>
                 <SplitToken text="result" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="check" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={visualStep} />
                 <SplitToken text="4" type="文本内容" colorClass="text-green-700" step={visualStep} />
                 <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={visualStep} />
               </Phrase>
             </div>
           </div>
        </div>
      </div>

      <div className={`transition-opacity duration-500 mt-8 scale-150 ${step >= 4 && step < 5 ? 'opacity-100' : 'opacity-0'}`}>
        <ColorLegend />
      </div>

      <div className="mt-12">
        <button 
          onClick={() => setStep((s) => (s + 1) % 6)} 
          className="px-12 py-6 bg-slate-800 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto"
        >
          {step === 5 ? '↺ 再来一次' : '下一步 ➡'}
        </button>
      </div>
    </div>
  );
};

// 交互式选择题组件
const MultipleChoiceCard = ({ 
  title, 
  questionText,
  codeVisual, 
  options, 
  correctIndex 
}: { 
  title: string; 
  questionText: string;
  codeVisual: React.ReactNode; 
  options: string[];
  correctIndex: number;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSelect = (index: number) => {
    if (isCorrect) return; 

    setSelectedIndex(index);
    if (index === correctIndex) {
      setIsCorrect(true);
      setShowError(false);
      speakText("回答正确！你真棒！");
    } else {
      setShowError(true);
      speakText("不对哦，再仔细看看？");
      setTimeout(() => setShowError(false), 600);
    }
  };

  return (
    <div className={`bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border-4 transition-all duration-500 flex flex-col h-full relative overflow-hidden ${isCorrect ? 'border-green-400 bg-green-50/30' : 'border-slate-100 hover:border-indigo-200'}`}>
      <div className={`absolute top-0 right-0 px-8 py-3 rounded-bl-3xl font-bold text-xl transition-colors ${isCorrect ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
        {isCorrect ? '🎉 正确' : '❓ 选择题'}
      </div>

      <h3 className="text-3xl font-bold text-slate-800 mb-4">{title}</h3>
      <p className="text-xl text-slate-500 mb-8 font-medium">{questionText}</p>
      
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 mb-auto flex flex-col justify-center min-h-[160px] shadow-inner">
        {codeVisual}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
        {options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          const isTargetCorrect = idx === correctIndex;
          
          let btnClass = "border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-indigo-300"; 
          
          if (isCorrect && isTargetCorrect) {
            btnClass = "border-green-500 bg-green-500 text-white shadow-lg scale-105 ring-4 ring-green-200 border-transparent"; 
          } else if (isSelected && !isCorrect && showError) {
            btnClass = "border-red-400 bg-red-50 text-red-600 animate-shake"; 
          } else if (isCorrect && !isTargetCorrect) {
            btnClass = "opacity-50 border-slate-100 bg-slate-50 grayscale"; 
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`
                w-full text-left px-6 py-5 rounded-2xl font-bold text-lg md:text-xl transition-all duration-200
                flex items-center gap-4 relative overflow-hidden
                ${btnClass}
              `}
            >
              <span className={`
                w-10 h-10 rounded-full flex items-center justify-center text-base border-2 shrink-0 font-mono
                ${isCorrect && isTargetCorrect ? 'border-white bg-white/20' : 'border-slate-300 text-slate-400'}
              `}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="relative z-10">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 章节巩固专用组件：ReviewCard (升级版：支持动态内容)
// 各阶段测验页面

// 1. 识字测验 (1/2)
const LiteracyQuizSlide1 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 识字测验 (1/2)</h2>
        <p className="text-xl text-slate-500">巩固一下关于“代码积木”的分类知识。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="概念辨析"
          question="下面的代码中，紫色的 'if' 属于哪一类字？"
          correctIndex={0}
          codeVisual={
            <div className="flex items-end gap-2 text-4xl">
               <SplitToken text="if" type="系统定义" colorClass="text-purple-600" step={3} />
            </div>
          }
          options={[
            "固定指令：电脑规定的，不能改",
            "具体数据：我们可以随意修改",
            "连接符号：用来做数学运算"
          ]}
        />
      </div>
    </div>
  </div>
);

// 1. 识字测验 (2/2)
const LiteracyQuizSlide2 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 识字测验 (2/2)</h2>
        <p className="text-xl text-slate-500">考验你对指令规则的理解。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="规则判断"
          question="如果我们想在屏幕上显示文字，应该使用哪个指令？"
          correctIndex={1}
          // 传入函数，根据 isCorrect 状态切换显示内容
          codeVisual={(isCorrect) => (
            <div className="flex flex-col gap-2 font-mono text-4xl font-bold text-slate-400">
               <div className="flex items-center gap-3">
                 {isCorrect ? (
                   // 答对：显示紫色 print
                   <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200 animate-scale-in shadow-sm">print</span> 
                 ) : (
                   // 默认：显示红色 ???
                   <span className="text-red-400 bg-red-50 px-3 py-1 rounded-lg border border-red-100 shadow-inner">???</span> 
                 )}
                 <span>("你好")</span>
               </div>
            </div>
          )}
          options={[
            "show (展示)",
            "print (打印/显示)",
            "write (书写)"
          ]}
        />
      </div>
    </div>
  </div>
);

// 2. 组词测验 (1/2)
const PhrasingQuizSlide1 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 组词测验 (1/2)</h2>
        <p className="text-xl text-slate-500">理解符号连接词语的含义。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="符号理解"
          question="在代码 'score = 100' 中，等号 '=' 的含义是什么？"
          correctIndex={1}
          codeVisual={
            <div className="flex items-end gap-2 text-3xl">
               <Phrase step={3}>
                 <SplitToken text="score" type="文本内容" colorClass="text-green-700" step={3} />
                 <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={3} />
                 <SplitToken text="100" type="文本内容" colorClass="text-green-700" step={3} />
               </Phrase>
            </div>
          }
          options={[
            "数学里的相等 (左边等于右边)",
            "给值动作：把右边的 100 放进左边的 score 盒子里",
            "没有任何意义"
          ]}
        />
      </div>
    </div>
  </div>
);

// 2. 组词测验 (2/2)
const PhrasingQuizSlide2 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 组词测验 (2/2)</h2>
        <p className="text-xl text-slate-500">分辨不同类型的词组功能。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="词组类型"
          question="下面哪个词组是在让电脑“做算术”？"
          correctIndex={0}
          codeVisual={
            <div className="text-7xl">🧮</div>
          }
          options={[
            "total + 1",
            "print('Hello')",
            "if score > 60"
          ]}
        />
      </div>
    </div>
  </div>
);

// 3. 造句测验 (1/2)
const SentenceQuizSlide1 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 造句测验 (1/2)</h2>
        <p className="text-xl text-slate-500">掌握控制电脑逻辑的句型。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="句式选择"
          question="如果你想让电脑“一直做某件事，直到做完为止”，应该用哪个句式？"
          correctIndex={2}
          codeVisual={
            <div className="text-7xl">🔁</div>
          }
          options={[
            "if (如果)",
            "def (定义)",
            "for / while (循环)",
            "class (分类)"
          ]}
        />
      </div>
    </div>
  </div>
);

// 3. 造句测验 (2/2)
const SentenceQuizSlide2 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 造句测验 (2/2)</h2>
        <p className="text-xl text-slate-500">理解代码的格式规则。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="语法规则"
          question="为什么 'if' 句子的下一行通常会向右缩进（空几格）？"
          correctIndex={0}
          codeVisual={
            <div className="text-left font-mono text-3xl font-bold bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm w-full max-w-md">
               <div className="mb-2">
                 <span className="text-purple-600">if</span> <span className="text-green-700">ok</span><span className="text-red-500">:</span>
               </div>
               <div className="pl-12 bg-slate-50 rounded py-1">
                 <span className="text-purple-600">print</span><span className="text-red-500">(</span><span className="text-green-700">"Yes"</span><span className="text-red-500">)</span>
               </div>
            </div>
          }
          options={[
            "表示从属关系：这一行归 if 管",
            "只是为了排版好看",
            "键盘坏了多按了空格"
          ]}
        />
      </div>
    </div>
  </div>
);

// 4. 写作测验 (1/2)
const CompositionQuizSlide1 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 写作测验 (1/2)</h2>
        <p className="text-xl text-slate-500">学会如何封装功能。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="功能定义"
          question="要想把自己写的一段代码打包成一个新功能（函数），第一步是写什么？"
          correctIndex={0}
          codeVisual={
            <div className="text-left font-mono text-4xl font-bold">
               <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded border border-purple-200">???</span> my_func():
            </div>
          }
          options={[
            "def (define)",
            "start (开始)",
            "create (创建)",
            "make (制作)"
          ]}
        />
      </div>
    </div>
  </div>
);

// 4. 写作测验 (2/2)
const CompositionQuizSlide2 = () => (
  <div className="max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-slate-100 pb-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">🧠 写作测验 (2/2)</h2>
        <p className="text-xl text-slate-500">理解封装的意义。</p>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center w-full">
      <div className="w-full max-w-3xl h-full max-h-[700px]">
        <ReviewCard 
          tag="思维提升"
          question="为什么我们要把代码写成“函数”？"
          correctIndex={1}
          codeVisual={
            <div className="flex items-center gap-6 text-6xl">
               🛠️ <span className="text-slate-300">→</span> 📦
            </div>
          }
          options={[
            "为了让代码看起来更长",
            "为了复用：写一次，以后反复用",
            "为了让电脑运行速度变慢"
          ]}
        />
      </div>
    </div>
  </div>
);

/**
 * 实战练习总页
 */
const PracticeSlide = () => {
  return (
  <div className="max-w-7xl mx-auto min-h-full flex flex-col pt-10 pb-40 px-4">
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">🤔 读懂“外语”：代码理解测试</h2>
      <p className="text-xl md:text-3xl text-slate-600">请像读语文句子一样，选出下面代码表达的真实含义。</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full mx-auto">
      
      {/* 题目1：基础计算 */}
      <MultipleChoiceCard 
        title="1. 这一行在做什么？"
        questionText="请看下面这段彩色代码，它告诉计算机要做什么运算？"
        correctIndex={1} 
        codeVisual={
          <div className="flex flex-wrap items-center gap-x-2 gap-y-4 scale-110 origin-left ml-4">
             <Phrase step={3}>
               <SplitToken text="total" type="文本内容" colorClass="text-green-700" step={3} />
               <SplitToken text="=" type="操作符号" colorClass="text-red-500" step={3} />
               <SplitToken text="price" type="文本内容" colorClass="text-green-700" step={3} />
               <SplitToken text="*" type="操作符号" colorClass="text-red-500" step={3} />
               <SplitToken text="count" type="文本内容" colorClass="text-green-700" step={3} />
             </Phrase>
          </div>
        }
        options={[
          "把单价(price)和数量(count)加起来",
          "把单价(price)和数量(count)乘起来，结果存进 total",
          "判断 total 是不是等于 price",
          "打印 total 的结果"
        ]}
      />

      {/* 题目2：逻辑判断 */}
      <MultipleChoiceCard 
        title="2. 逻辑判断"
        questionText="如果 score (分数) 是 59 分，计算机执行这段代码会发生什么？"
        correctIndex={2} 
        codeVisual={
          <div className="flex flex-col gap-3 w-full scale-110 origin-top-left ml-4">
            <div className="flex flex-wrap items-center gap-2">
              <Phrase step={3}>
                <SplitToken text="if" type="系统定义" colorClass="text-purple-600" step={3} />
                <SplitToken text="score" type="文本内容" colorClass="text-green-700" step={3} />
                <SplitToken text=">" type="操作符号" colorClass="text-red-500" step={3} />
                <SplitToken text="60" type="文本内容" colorClass="text-green-700" step={3} />
                <SplitToken text=":" type="操作符号" colorClass="text-red-500" step={3} />
              </Phrase>
            </div>
            <div className="flex flex-wrap items-center gap-2 pl-12 border-l-2 border-slate-200 border-dashed">
              <Phrase step={3}>
                <SplitToken text="print" type="系统定义" colorClass="text-purple-600" step={3} />
                <SplitToken text="(" type="操作符号" colorClass="text-red-500" step={3} />
                <SplitToken text="'及格'" type="文本内容" colorClass="text-green-700" step={3} />
                <SplitToken text=")" type="操作符号" colorClass="text-red-500" step={3} />
              </Phrase>
            </div>
          </div>
        }
        options={[
          "计算机会报错，因为没有写 else",
          "计算机会在屏幕上显示“及格”",
          "计算机什么都不做，直接跳过 print 这行",
          "计算机自动把 59 改成 60"
        ]}
      />
    </div>
  </div>
  );
};

const SummarySlide = ({ onRestart }: { onRestart: () => void }) => (
  <div className="text-center min-h-full flex flex-col justify-center items-center max-w-6xl mx-auto animate-fade-in py-10 pb-40 px-4">
    <div className="mb-8 md:mb-12"></div> {/* Placeholder to keep spacing without bounce */}
    <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 md:mb-10">恭喜你完成了基础教学课！</h2>
    
    <p className="text-xl md:text-3xl text-slate-600 mb-10 md:mb-16 leading-relaxed px-4">
      今天你没有手动敲一行代码，<br/>但你已经掌握了<strong>编程的核心思维</strong>。
    </p>

    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 w-full">
      <h3 className="text-slate-400 font-bold text-base md:text-lg uppercase tracking-widest mb-8 md:mb-10">复盘一下</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        <div className="p-6 md:p-8 bg-indigo-50 rounded-[2rem]">
          <div className="text-4xl md:text-5xl mb-3 md:mb-5">🔤</div>
          <div className="font-bold text-indigo-700 text-lg md:text-2xl">识字</div>
          <div className="text-sm md:text-lg text-indigo-500 mt-2">认得基础单词</div>
        </div>
        <div className="p-6 md:p-8 bg-indigo-50 rounded-[2rem]">
          <div className="text-4xl md:text-5xl mb-3 md:mb-5">🏷️</div>
          <div className="font-bold text-indigo-700 text-lg md:text-2xl">组词</div>
          <div className="text-sm md:text-lg text-indigo-500 mt-2">简单表达式</div>
        </div>
        <div className="p-6 md:p-8 bg-indigo-50 rounded-[2rem]">
          <div className="text-4xl md:text-5xl mb-3 md:mb-5">💬</div>
          <div className="font-bold text-indigo-700 text-lg md:text-2xl">造句</div>
          <div className="text-sm md:text-lg text-indigo-500 mt-2">写出完整逻辑</div>
        </div>
        <div className="p-6 md:p-8 bg-indigo-50 rounded-[2rem]">
          <div className="text-4xl md:text-5xl mb-3 md:mb-5">📄</div>
          <div className="font-bold text-indigo-700 text-lg md:text-2xl">写作</div>
          <div className="text-sm md:text-lg text-indigo-500 mt-2">组合功能段落</div>
        </div>
      </div>
    </div>

    <div className="mt-12 md:mt-20">
      <button onClick={onRestart} className="px-10 py-4 md:px-14 md:py-5 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors shadow-lg text-xl md:text-2xl flex items-center gap-4 mx-auto">
        <span>🔄</span> 再看一遍
      </button>
    </div>
  </div>
);

// --- 主应用组件 ---

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const restart = () => setCurrentSlideIndex(0);

const slides = [
    { 
      component: <CoverSlide />, 
      section: "封面" 
    },
    { 
      component: <OverviewSlide />, 
      section: "总览",
      scrollable: true 
    },
    
    // --- 阶段一：识字 ---
    { 
      component: <TransitionSlide 
        title="第一阶段：识“字”" 
        subtitle="代码也是一种“文字”，我们换了一套符号：汉字换成英文字、数字和小符号。" 
        keywords={[
          { en: "import", cn: "导入" }, { en: "if", cn: "判断" }, { en: "else", cn: "否则" },
          { en: "for", cn: "循环" }, { en: "def", cn: "定义" }, { en: "return", cn: "返回" }
        ]} 
      />, 
      section: "阶段一：识字" 
    },
    { 
      component: <LiteracyConceptSlide />, 
      section: "识字：三大分类",
      scrollable: true
    },
    {
      component: <SystemKeywordTableSlide />,
      section: "识字扩展：系统定义",
      scrollable: true
    },
    {
      component: <SymbolKeywordTableSlide />,
      section: "识字扩展：操作符号",
      scrollable: true
    },
    {
      component: <ContentKeywordTableSlide />,
      section: "识字扩展：文本内容",
      scrollable: true
    },
    ...literacyQuizzes.map((quiz, index) => ({
      component: <GenericLiteracyQuiz key={quiz.id} data={quiz} />,
      section: `测验：识字 (${index + 1}/${literacyQuizzes.length})`,
      scrollable: true as const
    })),
    
    // --- 阶段二：组词 ---
    { 
      component: <TransitionSlide 
        title="第二阶段：组“词”" 
        subtitle="识字是认识单词，而组词则使你了解它们常见的搭配方式。" 
        keywords={[
          { en: "a = 3", cn: "给值" }, { en: "a + b", cn: "加法" }, 
          { en: "total + s", cn: "累加" }
        ]} 
      />, 
      section: "阶段二：组词" 
    },
    // 组词示例1 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[0]} />,
      section: "组词：动作格式 (1/21)"
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[0]} />,
      section: "🔍 演示 (1/21)"
    },
    // 组词示例2 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[1]} />,
      section: "组词：执行动作 (2/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[1]} />,
      section: "🔍 演示 (2/21)"
    },
    // 组词示例3 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[2]} />,
      section: "组词：简单计算 (3/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[2]} />,
      section: "🔍 演示 (3/21)"
    },
    // 组词示例4 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[3]} />,
      section: "组词：变量组合 (4/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[3]} />,
      section: "🔍 演示 (4/21)"
    },
    // 组词示例5 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[4]} />,
      section: "组词：逻辑判断 (5/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[4]} />,
      section: "🔍 演示 (5/21)"
    },
    // 组词示例6 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[5]} />,
      section: "组词：文字造词 (6/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[5]} />,
      section: "🔍 演示 (6/21)"
    },
    // 组词示例7 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[6]} />,
      section: "组词：等于判断 (7/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[6]} />,
      section: "🔍 演示 (7/21)"
    },
    // 组词示例8 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[7]} />,
      section: "组词：不等判断 (8/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[7]} />,
      section: "🔍 演示 (8/21)"
    },
    // 组词示例9 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[8]} />,
      section: "组词：减法运算 (9/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[8]} />,
      section: "🔍 演示 (9/21)"
    },
    // 组词示例10 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[9]} />,
      section: "组词：除法运算 (10/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[9]} />,
      section: "🔍 演示 (10/21)"
    },
    // 组词示例11 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[10]} />,
      section: "组词：取余运算 (11/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[10]} />,
      section: "🔍 演示 (11/21)"
    },
    // 组词示例12 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[11]} />,
      section: "组词：乘法运算 (12/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[11]} />,
      section: "🔍 演示 (12/21)"
    },
    // 组词示例13 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[12]} />,
      section: "组词：类型转换 (13/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[12]} />,
      section: "🔍 演示 (13/21)"
    },
    // 组词示例14 + 演示（新增：形近字辨析）
    { 
      component: <GenericWordSlide data={wordSlides[13]} />,
      section: "组词：形近字辨析 (14/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[13]} />,
      section: "🔍 演示 (14/21)"
    },
    // 组词示例15 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[14]} />,
      section: "组词：小于判断 (15/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[14]} />,
      section: "🔍 演示 (15/21)"
    },
    // 组词示例16 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[15]} />,
      section: "组词：大于判断 (16/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[15]} />,
      section: "🔍 演示 (16/21)"
    },
    // 组词示例17 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[16]} />,
      section: "组词：逻辑与 (17/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[16]} />,
      section: "🔍 演示 (17/21)"
    },
    // 组词示例18 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[17]} />,
      section: "组词：逻辑或 (18/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[17]} />,
      section: "🔍 演示 (18/21)"
    },
    // 组词示例19 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[18]} />,
      section: "组词：逻辑非 (19/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[18]} />,
      section: "🔍 演示 (19/21)"
    },
    // 组词示例20 + 演示
    {
      component: <GenericWordSlide data={wordSlides[19]} />,
      section: "组词：范围生成 (20/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[19]} />,
      section: "🔍 演示 (20/21)"
    },
    // 组词示例21 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[20]} />,
      section: "组词：长度查询 (21/21)" 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[20]} />,
      section: "🔍 演示 (21/21)"
    },
    ...wordQuizzes.map((quiz, index) => ({
      component: <GenericWordQuiz key={quiz.id} data={quiz} />,
      section: `测验：组词 (${index + 1}/${wordQuizzes.length})`,
      scrollable: true as const
    })),
    
    // --- 阶段三：造句 ---
    { 
      component: <TransitionSlide 
        title="第三阶段：造“句”" 
        subtitle="认识字词只是识别符号，组成句子才能传达可执行的命令。" 
        keywords={[
          { en: "result = a + b", cn: "计算给值" }, { en: "total = 0", cn: "初始化" }, 
          { en: "for s in scores:", cn: "循环执行" }
        ]} 
      />, 
      section: "阶段三：造句" 
    },
    // 代码标点法理论
    {
      component: <CodeStructureTheory />,
      section: "理论：代码标点法"
    },
    // 造句示例1 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[0]} />, 
      section: "造句：逻辑判断 (1/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[0]} />,
      section: "🔍 演示 (1/12)"
    },
    // 造句示例2 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[1]} />, 
      section: "造句：二选一 (2/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[1]} />,
      section: "🔍 演示 (2/12)"
    },
    // 造句示例3 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[2]} />, 
      section: "造句：循环往复 (3/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[2]} />,
      section: "🔍 演示 (3/12)"
    },
    // 造句示例4 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[3]} />,
      section: "造句：坚持到底 (4/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[3]} />,
      section: "🔍 演示 (4/12)"
    },
    // 造句示例5 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[4]} />,
      section: "造句：定义清单 (5/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[4]} />,
      section: "🔍 演示 (5/12)"
    },
    // 造句示例6 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[5]} />,
      section: "造句：访问元素 (6/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[5]} />,
      section: "🔍 演示 (6/12)"
    },
    // 造句示例7 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[6]} />,
      section: "造句：函数定义 (7/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[6]} />,
      section: "🔍 演示 (7/12)"
    },
    // 造句示例8 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[7]} />,
      section: "造句：函数返回 (8/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[7]} />,
      section: "🔍 演示 (8/12)"
    },
    // 造句示例9 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[8]} />,
      section: "造句：多条件判断 (9/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[8]} />,
      section: "🔍 演示 (9/12)"
    },
    // 造句示例10 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[9]} />,
      section: "造句：列表添加 (10/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[9]} />,
      section: "🔍 演示 (10/12)"
    },
    // 造句示例11 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[10]} />,
      section: "造句：字典定义 (11/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[10]} />,
      section: "🔍 演示 (11/12)"
    },
    // 造句示例12 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[11]} />,
      section: "造句：异常处理 (12/12)" 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[11]} />,
      section: "🔍 演示 (12/12)"
    },
    ...sentenceQuizzes.map((quiz, index) => ({
      component: <GenericSentenceQuiz key={quiz.id} data={quiz} />,
      section: `测验：造句 (${index + 1}/${sentenceQuizzes.length})`,
      scrollable: true as const
    })),
    
    // --- 阶段四：写作 ---
    { 
      component: <TransitionSlide 
        title="第四阶段：写“作”" 
        subtitle="从句子迈入写作，并非为了写出更多代码，而是为了构建有结构的、能切实解决现实问题的解决方案。" 
        keywords={[
          { en: "def sum_list", cn: "定义功能" }, { en: "return total", cn: "返回数据" }, 
          { en: "for n in numbers", cn: "遍历处理" }
        ]} 
      />, 
      section: "阶段四：写作" 
    },
    // 写作示例1 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[0]} />,
      section: "写作示例 (1/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[0]} />,
      section: "🔍 演示 (1/13)"
    },
    // 写作示例2 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[1]} />,
      section: "写作示例 (2/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[1]} />,
      section: "🔍 演示 (2/13)"
    },
    // 写作示例3 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[2]} />,
      section: "写作示例 (3/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[2]} />,
      section: "🔍 演示 (3/13)"
    },
    // 写作示例4 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[3]} />,
      section: "写作示例 (4/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[3]} />,
      section: "🔍 演示 (4/13)"
    },
    // 写作示例5 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[4]} />,
      section: "写作示例 (5/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[4]} />,
      section: "🔍 演示 (5/13)"
    },
    // 写作示例6 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[5]} />,
      section: "写作示例 (6/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[5]} />,
      section: "🔍 演示 (6/13)"
    },
    // 写作示例7 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[6]} />,
      section: "写作示例 (7/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[6]} />,
      section: "🔍 演示 (7/13)"
    },
    // 写作示例8 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[7]} />,
      section: "写作示例 (8/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[7]} />,
      section: "🔍 演示 (8/13)"
    },
    // 写作示例9 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[8]} />,
      section: "写作示例 (9/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[8]} />,
      section: "🔍 演示 (9/13)"
    },
    // 写作示例10 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[9]} />,
      section: "写作示例 (10/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[9]} />,
      section: "🔍 演示 (10/13)"
    },
    // 写作示例11 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[10]} />,
      section: "写作示例 (11/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[10]} />,
      section: "🔍 演示 (11/13)"
    },
    // 写作示例12 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[11]} />,
      section: "写作示例 (12/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[11]} />,
      section: "🔍 演示 (12/13)"
    },
    // 写作示例13 + 演示
    { 
      component: <GenericEssaySlide data={essaySlides[12]} />,
      section: "写作示例 (13/13)" 
    },
    { 
      component: <CodePurposeSlide data={essayPurposeSlides[12]} />,
      section: "🔍 演示 (13/13)"
    },
    ...essayQuizzes.map((quiz, index) => ({
      component: <GenericEssayQuiz key={quiz.id} data={quiz} />,
      section: `测验：写作 (${index + 1}/${essayQuizzes.length})`,
      scrollable: true as const
    })),

    // --- 全能实验室 ---
    { 
      component: <TransitionSlide 
        title="全能实验室" 
        subtitle="不需要亲自写代码，这里就是你的“代码翻译机”。所有复杂的代码都会被自动拆解，你只需要用学习语文的方式就能读懂计算机的语言" 
        keywords={[{ en: "Run", cn: "运行" }, { en: "Parse", cn: "拆解" }]} 
      />, 
      section: "自由探索" 
    },
    { 
      component: <UnifiedIDE />, 
      section: "全能编程实验室" 
    },
    
    // 结尾
    { 
      component: <SummarySlide onRestart={restart} />, 
      section: "总结" ,
      scrollable: true
    }
  ];

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const navigateToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
    }
  };

  return (
    <Layout 
      currentSlide={currentSlideIndex} 
      totalSlides={slides.length} 
      onNext={nextSlide} 
      onPrev={prevSlide}
      onNavigate={navigateToSlide}
      sectionTitle={slides[currentSlideIndex].section}
      isScrollable={slides[currentSlideIndex].scrollable}
      slides={slides}
    >
      {slides[currentSlideIndex].component}
    </Layout>
  );
};
export default App;