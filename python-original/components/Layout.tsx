import React, { useEffect, useState, useRef } from 'react';
import { useCode } from './CodeContext';
import { AutoFitScale } from './AutoFitScale';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onNavigate: (index: number) => void;
  children: React.ReactNode;
  sectionTitle?: string;
  isScrollable?: boolean;
  slides: Array<{ section: string }>;
}

export const Layout: React.FC<LayoutProps> = ({ 
  currentSlide, 
  totalSlides, 
  onNext, 
  onPrev,
  onNavigate,
  children, 
  sectionTitle,
  isScrollable = false,
  slides
}) => {
  const { currentCode } = useCode(); 
  
  // 检测移动端状态
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile); // 移动端默认隐藏侧边栏
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 如果是移动端，强制允许滚动，否则遵循页面配置
  const enableScroll = isMobile || isScrollable;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  // AI 助手逻辑
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHelpOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isHelpOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
        const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.API_KEY || '';
        const API_URL = 'https://api.deepseek.com/chat/completions';
        
        const systemInstruction = `
        你是一位 Python 编程助教。你的任务是辅助学生理解代码逻辑。
        当前章节：“${sectionTitle || '自由探索'}”
        【学生当前代码】：
        \`\`\`python
        ${currentCode || "# 暂无代码"}
        \`\`\`
        请用最精简的语言回答学生的问题。
        `;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: systemInstruction },
                    ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
                    { role: 'user', content: userMsg }
                ],
                stream: false
            })
        });

        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        const text = data.choices[0]?.message?.content || "抱歉，我没看懂，请再试一次。";
        setMessages(prev => [...prev, { role: 'ai', content: text }]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'ai', content: "连接出错了，请检查网络或 API Key。" }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-slate-50 overflow-hidden selection:bg-indigo-100 selection:text-indigo-700 relative">
      
      {/* Sidebar Navigation */}
      {showSidebar && (
        <Sidebar
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onNavigate={onNavigate}
          slides={slides}
        />
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 md:h-24 px-6 md:px-12 flex items-center justify-between bg-white border-b border-slate-100 z-20 shrink-0">
          <div className="font-bold text-slate-700 tracking-tight flex items-center gap-4 text-lg md:text-2xl lg:text-3xl">
            {!showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="w-10 h-10 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-xl flex items-center justify-center transition-colors mr-2"
              >
                <span className="text-xl">☰</span>
              </button>
            )}
            <span className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-base md:text-xl font-mono shadow-sm">Py</span>
            <span className="hidden sm:inline">像学习语文一样学习编程</span>
            <span className="sm:hidden">语文式 Python</span>
          </div>
          {sectionTitle && (
            <div className="px-5 py-2 bg-slate-100 rounded-full text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
              {sectionTitle}
            </div>
          )}
          </div>

        {/* Progress */}
        <div className="h-2 w-full bg-slate-100 shrink-0 relative z-20">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 relative overflow-hidden flex flex-col bg-slate-50">
        {/* 背景装饰：z-0 确保在底层 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-10 left-10 w-48 md:w-96 h-48 md:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 md:w-96 h-48 md:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* 缩放容器：z-10 确保在装饰之上 */}
        <div className="relative z-10 w-full h-full">
            {/* [!核心修复点] 添加 key={currentSlide}。
                这会强制 React 在每次切页时完全重新挂载 AutoFitScale 组件，
                从而自动将滚动条重置为 0，防止上一页的滚动位置影响下一页。 
            */}
            <AutoFitScale key={currentSlide} isScrollable={enableScroll}>
                {children}
            </AutoFitScale>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="h-24 md:h-28 bg-white border-t border-slate-100 flex items-center justify-between px-6 md:px-16 shrink-0 z-20">
        <div className="text-slate-400 text-base md:text-xl font-medium hidden md:flex items-center gap-2">
          <span>第 {currentSlide + 1} 页</span>
          <span className="text-slate-300">/</span>
          <span>共 {totalSlides} 页</span>
        </div>
        
        <div className="flex gap-6 w-full md:w-auto justify-between md:justify-end items-center">
          <button 
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="group px-8 py-4 md:px-10 md:py-5 rounded-2xl text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-lg md:text-xl lg:text-2xl flex items-center gap-3"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> <span className="hidden sm:inline">上一页</span><span className="sm:hidden">上页</span>
          </button>
          
          <button 
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="group px-10 py-4 md:px-12 md:py-5 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg md:text-xl lg:text-2xl shadow-xl shadow-slate-200 hover:shadow-indigo-200 flex items-center gap-3"
          >
            {currentSlide === totalSlides - 1 ? '完成' : (
                <>
                    <span className="hidden sm:inline">下一页</span><span className="sm:hidden">下页</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
            )} 
          </button>
        </div>
      </div>

      {/* AI Help */}
      <button onClick={() => setIsHelpOpen(!isHelpOpen)} className="fixed bottom-32 right-10 w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all border-4 border-white/20"><span className="text-3xl font-bold">?</span></button>
      {isHelpOpen && (
         <div className="fixed bottom-52 right-10 w-[550px] bg-white rounded-3xl shadow-2xl border border-indigo-100 z-50 flex flex-col overflow-hidden" style={{height: '700px', maxHeight: '70vh'}}>
            <div className="bg-indigo-600 p-6 text-white font-bold flex justify-between items-center"><div className="flex items-center gap-4"><span className="text-3xl">🤖</span><span className="text-2xl">AI 编程助教</span></div><button onClick={() => setIsHelpOpen(false)}>✕</button></div>
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-6">
               {messages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-5 rounded-3xl text-xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200'}`}>{msg.content}</div></div>))}
               <div ref={messagesEndRef} />
            </div>
            <div className="p-5 bg-white border-t border-slate-100 flex gap-4">
                <input className="flex-1 bg-slate-100 border-0 rounded-2xl px-6 py-4 text-xl" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="输入问题..." />
                <button onClick={handleSend} className="bg-indigo-600 text-white p-4 rounded-2xl">🚀</button>
            </div>
         </div>
       )}
      </div>
    </div>
  );
};