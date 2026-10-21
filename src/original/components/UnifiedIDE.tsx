import React, {useState,useEffect,useRef,useMemo} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {cpp} from '@codemirror/lang-cpp';
import {autocompletion,CompletionContext} from '@codemirror/autocomplete';
import {linguisticTheme} from '../utils/linguisticTheme';
import {useCode} from './CodeContext';
import {Phrase} from './CodeUi';
import {tokenize} from '../../lexer';
import {language,languageName,defaultCode} from '../language';
import {shortMeanings} from '../shortMeanings';
import type {RunnerEvent} from '../../types';
const BASIC_TOKEN_MEANINGS:Record<string,string> = Object.fromEntries(tokenize('int double float char void const return if else for while do break continue switch case default struct typedef sizeof unsigned static enum printf scanf puts fgets strlen strcmp malloc free NULL main std cout cin string vector map class public private virtual true false nullptr #include',language).filter(t=>t.kind!=='space').map(t=>[t.text,t.meaning]));
const SYSTEM_KEYWORDS = new Set(tokenize(Object.keys(BASIC_TOKEN_MEANINGS).join(' '),language).filter(t=>t.kind==='system').map(t=>t.text));
const COLOR_CONFIG={system:{text:'text-purple-600',bg:'bg-purple-50',border:'border-purple-100'},symbol:{text:'text-red-500',bg:'bg-red-50',border:'border-red-100'},content:{text:'text-green-700',bg:'bg-green-50',border:'border-green-100'},default:{text:'text-slate-600',bg:'transparent',border:'border-transparent'}};
interface ParsedToken {
  id: string;
  text: string;
  type: string;
  colorType: 'system' | 'symbol' | 'content' | 'default';
}

// --- 2. 核心组件：代码积木 (TokenBlock) ---
const TokenBlock: React.FC<{ token: ParsedToken; meaning: string | null; detail?:string }> = ({ token, meaning, detail }) => {
  const colors = COLOR_CONFIG[token.colorType] || COLOR_CONFIG.default;
  
  if (token.type === 'space') {
    return <div style={{ width: `${token.text.length}ch` }} className="h-full shrink-0 font-mono text-2xl md:text-3xl"></div>;
  }

  return (
    <div title={detail} className="course-ide-token flex flex-col items-center justify-end mx-[2px] group relative shrink-0">
      
      {/* 代码本体 (保持 text-3xl) */}
      <span className={`course-ide-token-code font-mono text-2xl md:text-3xl font-bold leading-none ${colors.text} z-10 transition-transform duration-200 group-hover:scale-110`}>
        {token.text}
      </span>
      
      {/* [!code modification] 翻译：大幅放大 (text-lg -> text-2xl)，增加 padding */}
      <span className={`
        course-ide-token-meaning mt-3 px-3 py-1.5 rounded-xl text-xl md:text-2xl font-bold tracking-wide
        border-2 ${colors.border} ${colors.bg} ${colors.text} opacity-90
        whitespace-nowrap select-none shadow-sm transition-opacity
        ${!meaning && token.colorType === 'default' ? 'opacity-0' : 'opacity-100'}
      `}>
        {meaning || token.text}
      </span>
    </div>
  );
};

export const UnifiedIDE = () => {
 const {setCurrentCode}=useCode();
 const [code,setCode]=useState(defaultCode);
 const [aiMeanings,setAiMeanings]=useState<Record<string,string>>({price:'单价',count:'数量',total:'总价','10':'十块','5':'五个','40':'预算'});
 const [isEditMode,setIsEditMode]=useState(false);
 const [isGenerating,setIsGenerating]=useState(false);
 const [currentScenario,setCurrentScenario]=useState('');
 const [userRequest,setUserRequest]=useState('');
 const [showRequestInput,setShowRequestInput]=useState(false);
 const [runOutput,setRunOutput]=useState<string[]>([]);
 const [isRunning,setIsRunning]=useState(false);
 const [showOutput,setShowOutput]=useState(false);
 const [runError,setRunError]=useState<string|null>(null);
 const [runStatus,setRunStatus]=useState('');
 const [waitingForInput,setWaitingForInput]=useState(false);
 const [inputValue,setInputValue]=useState('');
 const inputRef=useRef<HTMLInputElement>(null);
 const runRef=useRef<string|null>(null);
 const pending=useRef(false);
 const queued=useRef<RunnerEvent[]>([]);
 const mounted=useRef(true);
 const sourceTokens=useMemo(()=>tokenize(code,language,aiMeanings),[code,aiMeanings]);
 const parsedLines=useMemo(()=>{
   const lines:Record<string,ParsedToken[]>={};
   sourceTokens.forEach((t,i)=>{if(t.text==='\n'||t.text==='\r\n')return; (lines[t.line] ||= []).push({id:'token-'+i,text:t.text,type:t.kind,colorType:t.kind==='space'||t.kind==='comment'?'default':t.kind});});
   return lines;
 },[sourceTokens]);
 const getMeaning=(text:string)=>{
   if(aiMeanings[text])return aiMeanings[text];
   if(shortMeanings[text])return shortMeanings[text];
   if(text.startsWith('#include'))return '引入头文件';
   if(/^['"].*['"]$/.test(text))return text.slice(1,-1).replaceAll('\\n','换行');
   return null;
 };
 useEffect(()=>{setCurrentCode(code);},[code,setCurrentCode]);
 const consume=(event:RunnerEvent)=>{
   if(!mounted.current||event.runId!==runRef.current)return;
   if(event.type==='compiling')setRunStatus('编译中');
   else if(event.type==='running'){setRunStatus('运行中');setWaitingForInput(true);setTimeout(()=>inputRef.current?.focus(),0);}
   else if(event.type==='stdout')setRunOutput(old=>[...old,event.text||'']);
   else if(event.type==='stderr')setRunOutput(old=>[...old,event.text||'']);
   else if(event.type==='compile-error'){setRunError(event.text||'编译失败');setRunStatus('编译失败');setIsRunning(false);setWaitingForInput(false);}
   else if(event.type==='error'){setRunError(event.text||'运行失败');setRunStatus('运行失败');setIsRunning(false);setWaitingForInput(false);}
   else if(event.type==='exit'||event.type==='stopped'){
     setIsRunning(false);setWaitingForInput(false);
     setRunStatus(event.type==='stopped'?(event.text||'已停止'):'退出状态：'+event.code);
     if(event.type==='exit'&&event.code!==0)setRunError('程序以非零状态退出：'+event.code);
     runRef.current=null;
   }
 };
 useEffect(()=>{
   mounted.current=true;
   const off=window.learning.onRunnerEvent(event=>{if(pending.current)queued.current.push(event);else consume(event);});
   return ()=>{mounted.current=false;off();if(runRef.current)void window.learning.stop(runRef.current);};
 },[]);
 const handleRunCode=async()=>{
   if(isRunning||!code.trim())return;
   setShowOutput(true);setRunOutput([]);setRunError(null);setIsRunning(true);setWaitingForInput(false);setRunStatus('编译中');pending.current=true;queued.current=[];
   try{const result=await window.learning.run(code);if(!mounted.current){await window.learning.stop(result.runId);return;}runRef.current=result.runId;pending.current=false;queued.current.forEach(consume);queued.current=[];}
   catch(e){pending.current=false;setIsRunning(false);setRunError(String(e));setRunStatus('启动失败');}
 };
 const handleStop=()=>{if(runRef.current)void window.learning.stop(runRef.current);};
 const handleSubmitInput=async()=>{
   if(!runRef.current)return;
   try{await window.learning.writeInput(runRef.current,inputValue+'\n');setRunOutput(old=>[...old,inputValue+'\n']);setInputValue('');inputRef.current?.focus();}
   catch(e){setRunError(String(e));}
 };
 const handleGenerateCode=async(scenario:string)=>{
   if(isGenerating)return;setIsGenerating(true);setCurrentScenario(scenario);
   try{const response=await window.learning.ai({mode:'generate',message:scenario});const result=JSON.parse(response.content);setCode(result.code);setAiMeanings(result.meanings||{});setIsEditMode(false);setShowRequestInput(false);setUserRequest('');}
   catch(e){alert('AI 需要联网。'+String(e));}finally{setIsGenerating(false);setCurrentScenario('');}
 };
 const handleFreeFormGenerate=()=>{if(userRequest.trim())void handleGenerateCode(userRequest);};
 const handleAnalyzeCurrent=async()=>{
   if(isGenerating||!code.trim())return;setIsGenerating(true);
   try{const response=await window.learning.ai({mode:'explain',code});const result=JSON.parse(response.content);setAiMeanings(old=>({...old,...result.meanings}));}
   catch(e){alert('AI 需要联网。'+String(e));}finally{setIsGenerating(false);}
 };
  // --- 混合式智能自动补全扩展 (Hybrid Autocompletion) ---
  const customCompletionExtension = useMemo(() => {
    const myCompletionSource = (context: CompletionContext) => {
      // 匹配光标前的单词（字母、数字、下划线）
      const word = context.matchBefore(/\w*/);
      if (!word || (word.from === word.to && !context.explicit)) return null;

      // --- A. 系统关键词 (静态字典，高优先级) ---
      const systemOptions = Object.entries(BASIC_TOKEN_MEANINGS)
        .filter(([key]) => /^[a-zA-Z_]\w*$/.test(key)) // 过滤掉符号如 =, +, :
        .map(([label, detail]) => ({
          label,
          type: 'keyword',
          detail: ` ${detail}`, // 显示中文含义，如 " 打印"
          boost: 99 // 最高优先级
        }));

      // --- B. 用户自定义变量 (从 parsedLines 实时提取 + AI 翻译) ---
      const localTokens = new Set<string>();
      // 遍历所有已解析的行，提取非系统关键词的标识符
      Object.values(parsedLines).forEach(tokens => {
        tokens.forEach(t => {
          // 只处理非空格、符合变量名规则、且不是系统关键词的 token
          if (
            t.type !== 'space' && 
            /^[a-zA-Z_]\w*$/.test(t.text) && 
            !BASIC_TOKEN_MEANINGS[t.text] &&
            !SYSTEM_KEYWORDS.has(t.text)
          ) {
            localTokens.add(t.text);
          }
        });
      });

      const variableOptions = Array.from(localTokens).map(label => {
        // 尝试从 AI 翻译字典获取中文含义
        const cnMeaning = aiMeanings[label] || aiMeanings[label.toLowerCase()] || '自定义变量';
        return {
          label,
          type: 'variable',
          detail: ` ${cnMeaning}`, // 实时反馈，如 " 总价" 或 " 自定义变量"
          boost: 50 // 中等优先级
        };
      });

      return {
        from: word.from,
        options: [...systemOptions, ...variableOptions]
      };
    };

    return autocompletion({ 
      override: [myCompletionSource],
      icons: true, // 显示类型图标
      optionClass: () => 'cm-completion-option-custom' // 可选：自定义样式类
    });
  }, [aiMeanings, parsedLines]); // 关键：依赖 parsedLines 和 aiMeanings 实现实时更新

  return (
    <div className="course-ide flex flex-col h-full w-full max-w-[1400px] mx-auto p-4 md:p-8 animate-fade-in relative">
      
      {/* 顶部：标题 + AI 灵感库 */}
      <div className="course-ide-header flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 gap-6">
        <div className="text-left shrink-0">
            {/* [!code modification] 放大标题: text-4xl -> text-5xl */}
            <h2 className="text-5xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                <span className="text-6xl">🧪</span> 
                <span>AI 编程实验室</span>
            </h2>
            {/* [!code modification] 放大说明: text-lg -> text-2xl */}
            <p className="text-slate-500 mt-4 text-2xl font-medium">点选场景快速开始，或描述需求让 AI 生成代码。</p>
        </div>

        {/* AI 场景选择器 */}
        <div className="flex flex-col gap-4 w-full xl:w-auto">
            <div className="flex flex-wrap gap-4 bg-white p-3 rounded-3xl shadow-sm border border-slate-100">
                {[
                    { icon: '🛒', label: '超市购物', id: '计算总价，判断是否超预算' },
                    { icon: '💯', label: '成绩判断', id: '根据分数判断优秀或及格' },
                    { icon: '🔁', label: '循环累加', id: '计算1到100的和' },
                    { icon: '🎲', label: '猜数字', id: '猜一个数字，直到猜对为止' },
                ].map(scene => (
                    <button
                        key={scene.label}
                        onClick={() => handleGenerateCode(scene.id)}
                        disabled={isGenerating}
                        className={`
                            flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-200
                            ${isGenerating && currentScenario === scene.id 
                                ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md hover:-translate-y-0.5'}
                        `}
                    >
                        <span className="text-3xl">{isGenerating && currentScenario === scene.id ? '⏳' : scene.icon}</span>
                        <span className="font-bold text-xl">{scene.label}</span>
                    </button>
                ))}
            </div>
            
            {/* AI 自由需求输入区 */}
            <div className="flex gap-3">
                <button
                    onClick={() => setShowRequestInput(!showRequestInput)}
                    className={`
                        flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-200 font-bold text-xl
                        ${showRequestInput 
                            ? 'bg-indigo-500 border-indigo-600 text-white' 
                            : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400'}
                    `}
                >
                    <span className="text-3xl">🤖</span>
                    <span>{showRequestInput ? '收起' : 'AI 自由生成'}</span>
                </button>
                
                {showRequestInput && (
                    <div className="flex-1 flex gap-3 animate-fade-in">
                        <input
                            type="text"
                            value={userRequest}
                            onChange={(e) => setUserRequest(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleFreeFormGenerate()}
                            placeholder="描述你想要实现的功能，例如：写一个判断奇偶数的程序"
                            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 text-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            disabled={isGenerating}
                        />
                        <button
                            onClick={handleFreeFormGenerate}
                            disabled={isGenerating || !userRequest.trim()}
                            className="px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold text-xl hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? '⏳ 生成中...' : '✨ 生成'}
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* 核心区域容器 */}
      <div className="course-ide-workspace flex-1 flex flex-col rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-4 border-slate-100 relative min-h-[600px] transition-all">
        
        {/* 工具栏 */}
        <div className="course-ide-toolbar bg-slate-50/80 backdrop-blur-sm px-8 py-5 border-b border-slate-200 flex justify-between items-center z-20">
            <div className="flex items-center gap-6">
                <div className="flex gap-3">
                    {/* [!code modification] 放大图例圆点 */}
                    <div className="w-5 h-5 rounded-full bg-red-400/80 shadow-sm"></div>
                    <div className="w-5 h-5 rounded-full bg-yellow-400/80 shadow-sm"></div>
                    <div className="w-5 h-5 rounded-full bg-green-400/80 shadow-sm"></div>
                </div>
                <div className="h-8 w-0.5 bg-slate-300 mx-2"></div>
                {/* [!code modification] 放大图例文字: text-xs -> text-lg */}
                <div className="flex gap-6 text-lg font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-purple-500"></span>系统虚词</span>
                    <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-red-500"></span>符号标点</span>
                    <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-green-600"></span>具体内容</span>
                </div>
            </div>
            
            <div className="flex gap-4">
                {/* 运行按钮 */}
                <button 
                    onClick={isRunning ? handleStop : handleRunCode}
                    disabled={isGenerating}
                    className={`
                        px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 text-xl shadow-sm border-2
                        ${isRunning 
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700 cursor-wait'
                            : 'bg-emerald-500 border-emerald-600 text-white hover:bg-emerald-600 hover:shadow-md'}
                    `}
                >
                    {isRunning ? (
                        <><span className="animate-spin inline-block">⏳</span> 停止运行</>
                    ) : (
                        <><span>▶</span> 运行代码</>
                    )}
                </button>
                {isEditMode && (
                    <button 
                        onClick={handleAnalyzeCurrent}
                        disabled={isGenerating}
                        className="px-6 py-3 rounded-2xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold text-xl transition-colors border-2 border-indigo-100"
                    >
                        {isGenerating ? '分析中...' : '🪄 分析我的代码'}
                    </button>
                )}
                <button 
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`
                        px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 text-xl shadow-sm border-2
                        ${isEditMode 
                            ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-indigo-600'}
                    `}
                >
                    {isEditMode ? '👁️ 返回阅读模式' : '✏️ 手动修改代码'}
                </button>
            </div>
        </div>

        {/* 内容区域 */}
        <div className="course-ide-content flex-1 relative overflow-auto bg-slate-50/30">
            
            {/* 1. 阅读模式 (Visualizer) */}
            {!isEditMode && (
                <div className="p-8 md:p-12 space-y-8">
                    {code.split('\n').map((lineRaw, index) => {
                        const lineNum = index + 1;
                        const tokens = parsedLines[lineNum] || [];
                        
                        // 检查是否为空行：没有实际内容的token（排除纯空格）
                        const hasRealContent = tokens.some(t => t.type !== 'space' && t.text.trim() !== '');
                        if (!hasRealContent && !lineRaw.trim()) {
                            return <div key={lineNum} className="h-16 flex items-start">
                                <div className="w-10 text-right text-slate-300 text-lg font-mono mr-8 select-none pt-2 font-bold">{lineNum}</div>
                            </div>;
                        }

                        return (
                            <div key={lineNum} className="flex items-start group/line">
                                <div className="w-10 text-right text-slate-300 text-lg font-mono mr-8 select-none pt-2 font-bold">{lineNum}</div>
                                
                                {/* 使用 Phrase 包裹，step=3 开启划线效果 */}
                                <Phrase step={3} className="flex flex-wrap items-end gap-y-6">
                                    {tokens.map((token) => (
                                        <TokenBlock 
                                            key={token.id} 
                                            token={token} 
                                            meaning={getMeaning(token.text) || null} 
                                            detail={sourceTokens.find(t=>t.text===token.text)?.meaning}
                                        />
                                    ))}
                                </Phrase>
                            </div>
                        );
                    })}
                    
                    {isGenerating && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col items-center animate-scale-in border-4 border-indigo-50">
                                <div className="text-6xl animate-bounce mb-6">🤖</div>
                                <div className="text-slate-700 font-bold text-3xl">AI 正在编写代码...</div>
                                <div className="text-slate-400 text-xl mt-4 font-medium">{currentScenario}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 2. 编辑模式 (Editor) */}
            {isEditMode && (
                <div className="absolute inset-0 bg-white z-10 p-8 animate-fade-in">
                    <CodeMirror
                        value={code}
                        height="100%"
                        extensions={[cpp(), customCompletionExtension, linguisticTheme]}
                        onChange={(value) => setCode(value)}
                        className="text-2xl font-mono border-4 border-indigo-100 rounded-3xl h-full overflow-hidden shadow-inner"
                        basicSetup={{
                            lineNumbers: true,
                            highlightActiveLine: true,
                            foldGutter: true,
                        }}
                    />
                </div>
            )}
        </div>

        {/* ===== 运行输出面板 ===== */}
        {showOutput && (
          <div className="course-ide-output mt-4 rounded-[2rem] overflow-hidden shadow-xl border-4 border-slate-100 bg-white animate-fade-in">
            {/* 输出面板头部 */}
            <div className="bg-slate-800 px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 text-2xl font-bold">⬤</span>
                <span className="text-white font-bold text-xl tracking-wide">运行结果</span>
                {isRunning && <span className="text-yellow-300 text-lg animate-pulse font-medium">● 执行中...</span>}
                {!isRunning && !runError && <span className="text-emerald-300 text-lg font-medium">✓ 完成</span>}
                {!isRunning && runError && <span className="text-red-300 text-lg font-medium">✕ 出错</span>}
                <span className="text-slate-400 text-base ml-4">{runStatus}</span>
              </div>
              <button 
                onClick={() => { handleStop(); setShowOutput(false); }}
                className="text-slate-400 hover:text-white text-2xl font-bold transition-colors px-3"
              >
                ✕
              </button>
            </div>

            {/* 输出内容 */}
            <div className="bg-slate-900 px-8 py-6 max-h-[300px] overflow-auto">
              {runOutput.length > 0 && (
                <pre className="text-emerald-300 font-mono text-xl md:text-2xl whitespace-pre-wrap leading-relaxed">
                  {runOutput.join('')}
                </pre>
              )}
              {runError && (
                <div className="mt-2">
                  <pre className="text-red-400 font-mono text-lg md:text-xl whitespace-pre-wrap leading-relaxed bg-red-950/30 p-4 rounded-xl border border-red-800/30">
                    {runError}
                  </pre>
                </div>
              )}
              {isRunning && runOutput.length === 0 && !waitingForInput && (
                <div className="flex items-center gap-4 text-slate-400 text-xl">
                  <span className="animate-spin text-2xl">⏳</span>
                  <span>正在编译并执行 {languageName} 代码...</span>
                </div>
              )}

              {/* input() 交互输入框 */}
              {waitingForInput && (
                <div className="mt-4 animate-fade-in">
                  <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-2 border-2 border-cyan-500/50">
                    <span className="text-cyan-400 font-mono text-xl font-bold pl-3 shrink-0">⌨️ 输入 &gt;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitInput(); }}
                      placeholder="请输入内容后按回车..."
                      className="flex-1 bg-transparent text-cyan-200 font-mono text-xl md:text-2xl outline-none placeholder:text-slate-500 px-2 py-2"
                      autoFocus
                    />
                    <button
                      onClick={handleSubmitInput}
                      className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-bold text-lg hover:bg-cyan-600 transition-colors shrink-0"
                    >
                      确认 ↵
                    </button>
                  </div>
                  <p className="text-slate-500 text-base mt-2 ml-2">程序运行时可逐次输入，按回车发送并继续运行</p>
                </div>
              )}
            </div>


          </div>
        )}
      </div>
    </div>
  );
};
