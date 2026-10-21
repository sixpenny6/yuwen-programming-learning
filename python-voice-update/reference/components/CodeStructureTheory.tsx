import React from 'react';

/**
 * 代码标点法理论组件
 * 用可视化的方式介绍"代码里的隐形标点符号"理论
 */
export const CodeStructureTheory: React.FC = () => {
  return (
    <div className="h-full flex flex-col py-4 md:py-6 max-w-7xl mx-auto w-full px-4 animate-fade-in">
      {/* 页面标题 */}
      <div className="text-center mb-4 md:mb-6 shrink-0">
        <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-2 md:mb-4">
          📝 代码里的隐形标点符号
        </h2>
        <p className="text-2xl md:text-3xl text-slate-500">
          在开始造句之前，先来认识代码中那些看不见但很重要的"标点符号"
        </p>
      </div>

      {/* 三个模块 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 min-h-0">
        
        {/* 模块一：句号 */}
        <div className="bg-white rounded-[2rem] shadow-xl border-2 border-slate-100 p-4 md:p-6 flex flex-col min-h-0">
          {/* 标题区 */}
          <div className="text-center mb-3 shrink-0">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-100 mb-2">
              <span className="text-4xl md:text-5xl">。</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
              句号 (Period)
            </h3>
            <p className="text-lg text-slate-500 font-medium">独立行动</p>
          </div>
          
          {/* 语文类比 */}
          <div className="bg-blue-50 rounded-xl p-3 md:p-4 mb-3 border-2 border-blue-100 shrink-0">
            <p className="text-lg md:text-xl text-slate-700 text-center font-medium">
              📖 "你好<span className="text-blue-600 font-bold text-2xl md:text-3xl">。</span> 
              再见<span className="text-blue-600 font-bold text-2xl md:text-3xl">。</span>"
            </p>
            <p className="text-sm md:text-base text-slate-500 text-center mt-1">说完一句是一句，互不干扰</p>
          </div>

          {/* 代码视觉 */}
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-4 relative min-h-0">
            {/* 第一行代码 */}
            <div className="font-mono text-xl md:text-2xl font-bold mb-2">
              <span className="text-purple-600">print</span>
              <span className="text-red-500">(</span>
              <span className="text-green-600">"Hello"</span>
              <span className="text-red-500">)</span>
            </div>
            
            {/* 断裂感 - 剪刀虚线 */}
            <div className="w-full flex items-center justify-center my-2 py-1">
              <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
              <span className="mx-3 text-2xl opacity-60">✂️</span>
              <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
            </div>
            
            {/* 第二行代码 */}
            <div className="font-mono text-xl md:text-2xl font-bold mt-2">
              <span className="text-purple-600">print</span>
              <span className="text-red-500">(</span>
              <span className="text-green-600">"World"</span>
              <span className="text-red-500">)</span>
            </div>
            
            {/* 说明文字 */}
            <p className="text-sm md:text-base text-slate-500 mt-3 text-center">
              两行代码各自独立，互不影响
            </p>
          </div>
        </div>

        {/* 模块二：逗号 */}
        <div className="bg-white rounded-[2rem] shadow-xl border-2 border-slate-100 p-4 md:p-6 flex flex-col min-h-0">
          {/* 标题区 */}
          <div className="text-center mb-3 shrink-0">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-100 mb-2">
              <span className="text-4xl md:text-5xl">，</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">
              逗号 (Comma)
            </h3>
            <p className="text-lg text-slate-500 font-medium">气韵连贯</p>
          </div>
          
          {/* 语文类比 */}
          <div className="bg-amber-50 rounded-xl p-3 md:p-4 mb-3 border-2 border-amber-100 shrink-0">
            <p className="text-lg md:text-xl text-slate-700 text-center font-medium">
              📖 "如果天黑了<span className="text-amber-600 font-bold text-2xl md:text-3xl">，</span> 
              就开灯<span className="text-amber-600 font-bold text-2xl md:text-3xl">。</span>"
            </p>
            <p className="text-sm md:text-base text-slate-500 text-center mt-1">话还没说完，后面的是从属</p>
          </div>

          {/* 代码视觉 */}
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-4 relative min-h-0">
            {/* 第一行代码 + 连接线 */}
            <div className="relative w-full flex justify-center">
              <div className="font-mono text-xl md:text-2xl font-bold">
                <span className="text-purple-600">if</span>
                <span className="text-green-600"> dark</span>
                <span className="text-red-500">:</span>
              </div>
              {/* L型连接线起点 */}
              <div className="absolute right-[15%] top-full w-0.5 h-6 bg-amber-400"></div>
            </div>
            
            {/* L型连接线 - 使用 SVG */}
            <svg className="w-full h-8" viewBox="0 0 200 40" preserveAspectRatio="xMidYMid meet">
              <path 
                d="M 140 0 L 140 25 L 80 25" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="none"
              />
              {/* 箭头 */}
              <polygon points="80,25 88,20 88,30" fill="#f59e0b" />
            </svg>
            
            {/* 第二行代码（缩进） */}
            <div className="w-full flex justify-center">
              <div className="font-mono text-xl md:text-2xl font-bold pl-10 relative">
                {/* 缩进指示器 */}
                <span className="absolute left-0 top-0 text-amber-400 text-sm font-bold">↳</span>
                <span className="text-purple-600">light_on</span>
                <span className="text-red-500">()</span>
              </div>
            </div>
            
            {/* 连接框 */}
            <div className="absolute inset-3 border-2 border-dashed border-amber-300 rounded-xl pointer-events-none opacity-50"></div>
            
            {/* 说明文字 */}
            <p className="text-sm md:text-base text-slate-500 mt-3 text-center">
              冒号 + 缩进 = 从属关系（归上一行管）
            </p>
          </div>
        </div>

        {/* 模块三：分号 */}
        <div className="bg-white rounded-[2rem] shadow-xl border-2 border-slate-100 p-4 md:p-6 flex flex-col min-h-0">
          {/* 标题区 */}
          <div className="text-center mb-3 shrink-0">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-100 mb-2">
              <span className="text-4xl md:text-5xl">；</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
              分号 (Semicolon)
            </h3>
            <p className="text-lg text-slate-500 font-medium">兄弟同心</p>
          </div>
          
          {/* 语文类比 */}
          <div className="bg-emerald-50 rounded-xl p-3 md:p-4 mb-3 border-2 border-emerald-100 shrink-0">
            <p className="text-lg md:text-xl text-slate-700 text-center font-medium">
              📖 "如果晴天，去玩<span className="text-emerald-600 font-bold text-2xl md:text-3xl">；</span> 
              否则，睡觉<span className="text-emerald-600 font-bold text-2xl md:text-3xl">。</span>"
            </p>
            <p className="text-sm md:text-base text-slate-500 text-center mt-1">并列的一家人，缺一不可</p>
          </div>

          {/* 代码视觉 */}
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 relative min-h-0">
            {/* 整体容器带大括号 */}
            <div className="relative flex items-stretch">
              {/* 左侧大括号 */}
              <div className="flex items-center mr-2">
                <svg className="h-28 md:h-32 w-5" viewBox="0 0 24 160">
                  <path 
                    d="M 20 10 Q 8 10 8 40 L 8 60 Q 8 80 2 80 Q 8 80 8 100 L 8 120 Q 8 150 20 150" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              {/* 代码块 */}
              <div className="flex flex-col justify-center gap-1">
                {/* if 块 */}
                <div className="bg-emerald-50 rounded-lg p-2 md:p-3 border-2 border-emerald-200">
                  <div className="font-mono text-lg md:text-xl font-bold">
                    <span className="text-purple-600">if</span>
                    <span className="text-green-600"> sunny</span>
                    <span className="text-red-500">:</span>
                  </div>
                  <div className="font-mono text-lg md:text-xl font-bold pl-4 text-slate-500">
                    play()
                  </div>
                </div>
                
                {/* 双向箭头连接 */}
                <div className="flex justify-center items-center py-0.5">
                  <span className="text-emerald-500 text-xl font-bold">⇅</span>
                  <span className="text-emerald-600 text-sm ml-1 font-medium">套装</span>
                </div>
                
                {/* else 块 */}
                <div className="bg-emerald-50 rounded-lg p-2 md:p-3 border-2 border-emerald-200">
                  <div className="font-mono text-lg md:text-xl font-bold">
                    <span className="text-purple-600">else</span>
                    <span className="text-red-500">:</span>
                  </div>
                  <div className="font-mono text-lg md:text-xl font-bold pl-4 text-slate-500">
                    sleep()
                  </div>
                </div>
              </div>
              
              {/* 右侧大括号 */}
              <div className="flex items-center ml-2">
                <svg className="h-28 md:h-32 w-5" viewBox="0 0 24 160">
                  <path 
                    d="M 4 10 Q 16 10 16 40 L 16 60 Q 16 80 22 80 Q 16 80 16 100 L 16 120 Q 16 150 4 150" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            
            {/* 说明文字 */}
            <p className="text-sm md:text-base text-slate-500 mt-2 text-center">
              if-else 是"一家人"，必须配套使用
            </p>
          </div>
        </div>
      </div>

      {/* 底部总结 */}
      <div className="mt-4 md:mt-6 shrink-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 md:p-6 border-2 border-indigo-100">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-lg md:text-xl font-medium">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl md:text-2xl">。</span>
            <span className="text-slate-700"><span className="text-blue-600 font-bold">换行</span> = 句号（独立）</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl md:text-2xl">，</span>
            <span className="text-slate-700"><span className="text-amber-600 font-bold">冒号+缩进</span> = 逗号（从属）</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl md:text-2xl">；</span>
            <span className="text-slate-700"><span className="text-emerald-600 font-bold">if-else</span> = 分号（并列）</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeStructureTheory;
