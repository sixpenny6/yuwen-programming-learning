import React, { useState, useEffect } from 'react';

// ==================== Edge TTS 音频播放系统 ====================

// 音频映射表缓存
let audioMapCache: Record<string, string> | null = null;
let audioMapLoading = false;
let audioMapLoadPromise: Promise<void> | null = null;

// 当前播放的音频实例（用于取消上一次播放）
let currentAudio: HTMLAudioElement | null = null;

/**
 * 加载音频映射表
 */
const loadAudioMap = async (): Promise<Record<string, string>> => {
  if (audioMapCache !== null) {
    return audioMapCache;
  }

  if (audioMapLoading && audioMapLoadPromise) {
    await audioMapLoadPromise;
    return audioMapCache || {};
  }

  audioMapLoading = true;
  audioMapLoadPromise = (async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}audio_map.json`);
      if (response.ok) {
        audioMapCache = await response.json();
        console.log(`🎙️ 音频映射表已加载，共 ${Object.keys(audioMapCache || {}).length} 条`);
      } else {
        console.warn('⚠️ audio_map.json 未找到，将使用浏览器 TTS');
        audioMapCache = {};
      }
    } catch (error) {
      console.warn('⚠️ 加载音频映射表失败，将使用浏览器 TTS:', error);
      audioMapCache = {};
    } finally {
      audioMapLoading = false;
    }
  })();

  await audioMapLoadPromise;
  return audioMapCache || {};
};

// 应用启动时预加载映射表
if (typeof window !== 'undefined') {
  loadAudioMap();
}

// --- 浏览器 TTS 备用方案 ---
const PREFERRED_VOICES = [
  'Xiaoxiao', 'Yaoyao', 'Huihui', // Windows
  'Tingting', 'Meijia',           // macOS/iOS
  'Google 普通话'                 // Chrome
];

let cachedVoice: SpeechSynthesisVoice | null = null;

const fallbackBrowserTTS = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 1.0;

  if (!cachedVoice) {
    const voices = window.speechSynthesis.getVoices();
    const zhVoices = voices.filter(v => v.lang.includes('zh'));
    
    if (zhVoices.length > 0) {
      cachedVoice = PREFERRED_VOICES.reduce<SpeechSynthesisVoice | null>((found, name) => {
        return found || zhVoices.find(v => v.name.includes(name)) || null;
      }, null);
      
      if (!cachedVoice) {
        cachedVoice = zhVoices[0];
      }
    }
  }

  if (cachedVoice) {
    utterance.voice = cachedVoice;
  }

  window.speechSynthesis.speak(utterance);
};

/**
 * 智能语音播放函数
 * 优先使用预生成的 Edge TTS 音频，失败时降级到浏览器 TTS
 */
export const speakText = async (text: string) => {
  if (typeof window === 'undefined') return;

  // 停止上一次播放
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // 加载映射表
  const audioMap = await loadAudioMap();
  
  // 查找预生成的音频
  const audioUrl = audioMap[text];
  
  // 调试日志
  console.log(`🎤 尝试播放: "${text.slice(0, 30)}${text.length > 30 ? '...' : ''}"`);
  console.log(`🔍 映射表中${audioUrl ? '找到' : '未找到'}音频`);
  if (audioUrl) {
    console.log(`🎵 音频路径: ${audioUrl}`);
  }
  
  if (audioUrl) {
    // 使用预生成的 Edge TTS 音频
    try {
      const resolvedUrl = audioUrl.startsWith('/') ? `${import.meta.env.BASE_URL}${audioUrl.slice(1)}` : audioUrl;
      const audio = new Audio(resolvedUrl);
      currentAudio = audio;
      
      // 错误处理：音频加载失败时降级
      audio.onerror = () => {
        console.warn(`⚠️ 音频加载失败 [${text.slice(0, 20)}...]，降级到浏览器 TTS`);
        fallbackBrowserTTS(text);
      };
      
      await audio.play();
      console.log(`✅ Edge TTS 音频播放成功`);
    } catch (error) {
      console.warn(`⚠️ 音频播放失败 [${text.slice(0, 20)}...]，降级到浏览器 TTS`);
      fallbackBrowserTTS(text);
    }
  } else {
    // 映射表中没有，使用浏览器 TTS
    console.log(`⚠️ 降级使用浏览器 TTS`);
    fallbackBrowserTTS(text);
  }
};

// --- Phrase: 词组容器 ---
// 负责“划线”：将一组字连成一个词
export const Phrase: React.FC<{
  children: React.ReactNode;
  step: number;          // 0:原文, 1:划线, 2:加点, 3:上色, 4:纯净
  label?: string;        // 词性说明 (可选)
  className?: string;
}> = ({ children, step, label, className = "" }) => {
  // 划线逻辑：Step 1, 2, 3 显示下划线
  // Step 0 (原文) 和 Step 4 (纯净) 不显示线
  const showUnderline = step >= 1 && step <= 3;
  
  return (
    <div className={`
      relative inline-flex items-end gap-0.5 mx-1 transition-all duration-500
      ${showUnderline ? 'border-b-4 border-slate-800 pb-1' : 'border-b-0 border-transparent pb-0'}
      ${className}
    `}>
      {children}
    </div>
  );
};

// --- [核心修改] SplitToken: 单字组件 ---
// 负责“加点”和“上色”
export const SplitToken: React.FC<{
  text: string;
  type: string;
  tip?: string;
  colorClass: string;     // 最终颜色
  step?: number;          // 0:原文, 1:划线, 2:加点, 3:上色, 4:纯净
}> = ({ text, type, tip, colorClass, step = 0 }) => {

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(`${text}，是${type}`);
  };

  // 状态判断
  const showDot = step >= 2 && step <= 3;       // 2, 3 有圆点
  const showColor = step >= 3;                  // 3, 4 有颜色

  // 从 text-color 提取 bg-color 用于圆点
  const dotColor = colorClass.replace('text-', 'bg-');

  return (
    <span 
      onClick={handleClick}
      className={`
        relative inline-flex flex-col items-center justify-end
        transition-all duration-500 ease-in-out cursor-pointer
        group
      `}
      style={{ verticalAlign: 'bottom' }}
    >
      {/* 1. 圆点 (Step 2, 3 显示) */}
      {/* [修改点]：step >= 2 时直接显示彩色点 (dotColor)，不再使用灰色过渡 */}
      <span className={`
        w-1.5 h-1.5 rounded-full mb-1
        transition-all duration-500
        ${showDot ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
        ${step >= 2 ? dotColor : 'bg-slate-400'} 
      `}></span>

      {/* 2. 代码本体 */}
      <span className={`
        font-mono text-3xl md:text-4xl font-bold transition-colors duration-500 rounded px-0.5
        ${showColor ? colorClass : 'text-slate-800'}
      `}>
        {text}
      </span>
    </span>
  );
};

export const CodeContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white p-6 md:p-12 rounded-[2rem] shadow-xl border-2 border-slate-100 flex flex-wrap justify-center items-center gap-y-10 gap-x-2 ${className || "min-h-[300px]"}`}>
    {children}
  </div>
);

export const ColorLegend = () => (
  <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 animate-fade-in">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-600 shadow-sm"></span>
      <span className="text-slate-600 font-bold text-sm md:text-base">系统定义 (System)</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 shadow-sm"></span>
      <span className="text-slate-600 font-bold text-sm md:text-base">操作符号 (Symbol)</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-700 shadow-sm"></span>
      <span className="text-slate-600 font-bold text-sm md:text-base">文本内容 (Content)</span>
    </div>
  </div>
);

export const ReviewCard = ({ 
  tag,
  question,
  codeVisual, 
  options, 
  correctIndex,
  explanations
}: { 
  tag: string; 
  question: string;
  codeVisual: React.ReactNode | ((isCorrect: boolean) => React.ReactNode);
  options: string[];
  correctIndex: number;
  explanations?: string[];
}) => {
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  const handleOptionClick = (idx: number) => {
    if (status === 'correct') return; 

    setSelectedIndex(idx);
    if (idx === correctIndex) {
      setStatus('correct');
      const successMsg = explanations?.[idx] || "回答正确！你掌握了这个知识点！";
      setFeedbackMsg(successMsg);
      speakText(successMsg);
    } else {
      setStatus('wrong');
      const errorMsg = explanations?.[idx] || "这个答案不对哦，再想想看！";
      setFeedbackMsg(errorMsg);
      speakText(errorMsg);
      setTimeout(() => {
        setStatus('idle');
        setFeedbackMsg('');
      }, 3000);
    }
  };

  return (
    <div className={`
      relative flex flex-col h-full bg-white rounded-3xl transition-all duration-300
      border-4 
      ${status === 'correct' ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 
        status === 'wrong' ? 'border-red-500 shadow-lg' : 'border-slate-100 shadow-xl hover:shadow-2xl'}
    `}>
      <div className={`
        py-3 px-6 text-lg font-bold tracking-widest uppercase flex justify-between items-center transition-colors rounded-t-xl
        ${status === 'correct' ? 'bg-green-500 text-white' : 
          status === 'wrong' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'}
      `}>
        <span>{tag}</span>
        <span>{status === 'correct' ? '✔ 正确' : status === 'wrong' ? '✖ 再想想' : '待回答'}</span>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-snug">
          {question}
        </h4>

        <div className="mb-8 p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center justify-center min-h-[160px] overflow-visible">
          {typeof codeVisual === 'function' ? codeVisual(status === 'correct') : codeVisual}
        </div>

        <div className="mt-auto space-y-4">
          {options.map((opt, i) => {
            let itemClass = "border-2 border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50"; 
            
            if (status === 'correct' && i === correctIndex) {
              itemClass = "border-green-500 bg-green-500 text-white font-bold ring-4 ring-green-100 border-transparent scale-[1.02]"; 
            } else if (status === 'wrong' && i === selectedIndex) {
              itemClass = "border-red-500 bg-red-50 text-red-600 font-bold animate-shake"; 
            } else if (status === 'correct' && i !== correctIndex) {
              itemClass = "border-transparent bg-slate-50 text-slate-300 opacity-50"; 
            }

            return (
              <button
                key={i}
                onClick={() => handleOptionClick(i)}
                className={`
                  w-full text-left p-5 rounded-2xl text-xl transition-all duration-200
                  flex items-start gap-4
                  ${itemClass}
                `}
              >
                <span className="shrink-0 font-mono font-bold opacity-70">
                  {String.fromCharCode(65 + i)}.
                </span>
                <span className="font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* 错误/正确反馈条 */}
        {feedbackMsg && (
          <div className={`
            mt-6 p-4 rounded-2xl text-lg font-bold text-center animate-fade-in
            ${status === 'correct' ? 'bg-green-50 text-green-700 border-2 border-green-200' : 
              status === 'wrong' ? 'bg-red-50 text-red-600 border-2 border-red-200' : ''}
          `}>
            {status === 'correct' ? '💡 ' : '🤔 '}{feedbackMsg}
          </div>
        )}
      </div>
    </div>
  );
};