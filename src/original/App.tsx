import { languageName, systemKeywords, symbolKeywords, contentKeywords, transitionKeywords } from './language';
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
          学习 {languageName} 编程
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
  const defaultKeywords = transitionKeywords;  
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
        <span className="text-purple-700 text-2xl md:text-3xl font-medium">if(如果), return(返回)</span>

        {/* Row 2: 操作符号 */}
        <span className="text-red-600 bg-red-50 px-8 py-4 rounded-2xl text-2xl md:text-4xl font-bold w-64 text-center shadow-sm border border-red-100">操作符号</span>
        <span className="text-slate-300 text-3xl md:text-5xl font-bold">=</span>
        <span className="text-slate-700 text-3xl md:text-4xl font-bold whitespace-nowrap">语法标点</span>
        <span className="text-red-600 text-2xl md:text-3xl font-medium">+ (加), = (赋值), ; (分号)</span>

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
        <span className="text-slate-600 font-bold text-xl">系统定义 - {languageName} 的关键字与标准库名称</span>
      </div>
    </div>
  );
};

// --- 操作符号关键字表组件 ---
const SymbolKeywordTableSlide = () => {

  const renderExample = (item: { code: string; example: string }) => {
    if (item.code.includes(' ')) return <>{item.example.split(/([()[\]{}])/).map((part,i)=><span key={i} className={/^[()[\]{}]$/.test(part)?'font-bold text-red-500':''}>{part}</span>)}</>;
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => Math.max(0, Math.min(152, Number(new URLSearchParams(location.search).get('page') || 1) - 1)));

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
          { en: "#include", cn: "引入头文件" }, { en: "if", cn: "判断" }, { en: "else", cn: "否则" },
          { en: "for", cn: "循环" }, { en: "int", cn: "整数类型" }, { en: "return", cn: "返回" }
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
          { en: "int a = 3;", cn: "声明给值" }, { en: "a + b", cn: "加法" }, 
          { en: "total + s", cn: "累加" }
        ]} 
      />, 
      section: "阶段二：组词" 
    },
    // 组词示例1 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[0]} />,
      section: wordSlides[0].title + " " + wordSlides[0].subtitle
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[0]} />,
      section: "🔍 演示 (1/21)"
    },
    // 组词示例2 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[1]} />,
      section: wordSlides[1].title + " " + wordSlides[1].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[1]} />,
      section: "🔍 演示 (2/21)"
    },
    // 组词示例3 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[2]} />,
      section: wordSlides[2].title + " " + wordSlides[2].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[2]} />,
      section: "🔍 演示 (3/21)"
    },
    // 组词示例4 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[3]} />,
      section: wordSlides[3].title + " " + wordSlides[3].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[3]} />,
      section: "🔍 演示 (4/21)"
    },
    // 组词示例5 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[4]} />,
      section: wordSlides[4].title + " " + wordSlides[4].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[4]} />,
      section: "🔍 演示 (5/21)"
    },
    // 组词示例6 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[5]} />,
      section: wordSlides[5].title + " " + wordSlides[5].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[5]} />,
      section: "🔍 演示 (6/21)"
    },
    // 组词示例7 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[6]} />,
      section: wordSlides[6].title + " " + wordSlides[6].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[6]} />,
      section: "🔍 演示 (7/21)"
    },
    // 组词示例8 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[7]} />,
      section: wordSlides[7].title + " " + wordSlides[7].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[7]} />,
      section: "🔍 演示 (8/21)"
    },
    // 组词示例9 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[8]} />,
      section: wordSlides[8].title + " " + wordSlides[8].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[8]} />,
      section: "🔍 演示 (9/21)"
    },
    // 组词示例10 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[9]} />,
      section: wordSlides[9].title + " " + wordSlides[9].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[9]} />,
      section: "🔍 演示 (10/21)"
    },
    // 组词示例11 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[10]} />,
      section: wordSlides[10].title + " " + wordSlides[10].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[10]} />,
      section: "🔍 演示 (11/21)"
    },
    // 组词示例12 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[11]} />,
      section: wordSlides[11].title + " " + wordSlides[11].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[11]} />,
      section: "🔍 演示 (12/21)"
    },
    // 组词示例13 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[12]} />,
      section: wordSlides[12].title + " " + wordSlides[12].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[12]} />,
      section: "🔍 演示 (13/21)"
    },
    // 组词示例14 + 演示（新增：形近字辨析）
    { 
      component: <GenericWordSlide data={wordSlides[13]} />,
      section: wordSlides[13].title + " " + wordSlides[13].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[13]} />,
      section: "🔍 演示 (14/21)"
    },
    // 组词示例15 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[14]} />,
      section: wordSlides[14].title + " " + wordSlides[14].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[14]} />,
      section: "🔍 演示 (15/21)"
    },
    // 组词示例16 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[15]} />,
      section: wordSlides[15].title + " " + wordSlides[15].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[15]} />,
      section: "🔍 演示 (16/21)"
    },
    // 组词示例17 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[16]} />,
      section: wordSlides[16].title + " " + wordSlides[16].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[16]} />,
      section: "🔍 演示 (17/21)"
    },
    // 组词示例18 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[17]} />,
      section: wordSlides[17].title + " " + wordSlides[17].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[17]} />,
      section: "🔍 演示 (18/21)"
    },
    // 组词示例19 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[18]} />,
      section: wordSlides[18].title + " " + wordSlides[18].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[18]} />,
      section: "🔍 演示 (19/21)"
    },
    // 组词示例20 + 演示
    {
      component: <GenericWordSlide data={wordSlides[19]} />,
      section: wordSlides[19].title + " " + wordSlides[19].subtitle 
    },
    { 
      component: <CodePurposeSlide data={wordPurposeSlides[19]} />,
      section: "🔍 演示 (20/21)"
    },
    // 组词示例21 + 演示
    { 
      component: <GenericWordSlide data={wordSlides[20]} />,
      section: wordSlides[20].title + " " + wordSlides[20].subtitle 
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
          { en: "for (int i = 0; i < 3; ++i)", cn: "循环执行" }
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
      section: sentenceSlides[0].title + " " + sentenceSlides[0].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[0]} />,
      section: "🔍 演示 (1/12)"
    },
    // 造句示例2 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[1]} />, 
      section: sentenceSlides[1].title + " " + sentenceSlides[1].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[1]} />,
      section: "🔍 演示 (2/12)"
    },
    // 造句示例3 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[2]} />, 
      section: sentenceSlides[2].title + " " + sentenceSlides[2].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[2]} />,
      section: "🔍 演示 (3/12)"
    },
    // 造句示例4 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[3]} />,
      section: sentenceSlides[3].title + " " + sentenceSlides[3].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[3]} />,
      section: "🔍 演示 (4/12)"
    },
    // 造句示例5 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[4]} />,
      section: sentenceSlides[4].title + " " + sentenceSlides[4].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[4]} />,
      section: "🔍 演示 (5/12)"
    },
    // 造句示例6 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[5]} />,
      section: sentenceSlides[5].title + " " + sentenceSlides[5].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[5]} />,
      section: "🔍 演示 (6/12)"
    },
    // 造句示例7 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[6]} />,
      section: sentenceSlides[6].title + " " + sentenceSlides[6].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[6]} />,
      section: "🔍 演示 (7/12)"
    },
    // 造句示例8 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[7]} />,
      section: sentenceSlides[7].title + " " + sentenceSlides[7].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[7]} />,
      section: "🔍 演示 (8/12)"
    },
    // 造句示例9 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[8]} />,
      section: sentenceSlides[8].title + " " + sentenceSlides[8].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[8]} />,
      section: "🔍 演示 (9/12)"
    },
    // 造句示例10 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[9]} />,
      section: sentenceSlides[9].title + " " + sentenceSlides[9].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[9]} />,
      section: "🔍 演示 (10/12)"
    },
    // 造句示例11 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[10]} />,
      section: sentenceSlides[10].title + " " + sentenceSlides[10].subtitle 
    },
    { 
      component: <CodePurposeSlide data={sentencePurposeSlides[10]} />,
      section: "🔍 演示 (11/12)"
    },
    // 造句示例12 + 演示
    { 
      component: <GenericSentenceSlide data={sentenceSlides[11]} />,
      section: sentenceSlides[11].title + " " + sentenceSlides[11].subtitle 
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
          { en: "int sum_list(...)", cn: "定义功能" }, { en: "return total", cn: "返回数据" }, 
          { en: "for (int i = 0; i < count; ++i)", cn: "遍历处理" }
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

  useMemo(() => { window.dispatchEvent(new CustomEvent('learning-pages', {detail: slides.map((s,i)=>({page:i+1,section:s.section}))})); return null; }, []);

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