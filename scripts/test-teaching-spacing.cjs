/** Independent lexical-boundary regression. Does not compile courses, synthesize speech or alter old evidence. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {createHash}=require('node:crypto'),{execFileSync}=require('node:child_process');
const ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const root=path.resolve(__dirname,'..'),directory=path.join(root,'test-results/spacing-1.3.1');
const sha=value=>createHash('sha256').update(value).digest('hex'),read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
fs.mkdirSync(directory,{recursive:true});
const baseline=read('test-results/spacing-1.3.1/baseline.json'),inventory=read('test-results/course-1.3.0/narration-inventory.json');
const stat={schemaVersion:1,version:'1.3.1',ok:false,generatedAt:new Date().toISOString(),method:'independent lexemes; actual React server markup for all records and states; exact raw speech inventory comparison',
 boundary:'Server-render evidence includes inactive SmartShowcase views but does not execute its legacy simulator. Current-stage native DOM and media evidence is recorded separately. Historical 1.3.0 compiler/layout/full-voice reports retain their original versions and ASARs.',
 inherited:[],dataHashes:[],manifests:[],sourceHashes:{},fixtures:[],languages:[],errors:[]};
let state=0;const cache=new Map();
function load(file){
 file=path.resolve(root,file);if(cache.has(file))return cache.get(file).exports;
 const module={exports:{}};cache.set(file,module);
 let source=fs.readFileSync(file,'utf8');stat.sourceHashes[path.relative(root,file).replaceAll('\\','/')]=sha(Buffer.from(source));
 if(file.includes(path.join('original','components')))source=source.replace(/useState\(0\)/g,'useState(globalThis.__spacingStep())');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 const localRequire=name=>{
  if(!name.startsWith('.'))return require(name);
  const base=path.resolve(path.dirname(file),name);
  if(base===path.join(root,'src/speech/player'))return {speakText:()=>{throw new Error('SSR must not invoke speech');}};
  const resolved=['.ts','.tsx','.js','/index.ts'].map(suffix=>base+suffix).find(fs.existsSync);assert(resolved,'Missing safe module '+name);return load(resolved);
 };
 const context={module,exports:module.exports,require:localRequire,console,globalThis:{__spacingStep:()=>state},setTimeout,clearTimeout};
 vm.runInNewContext(code,context,{filename:file});return module.exports;
}
const decode=s=>s.replace(/&(?:amp|lt|gt|quot|apos|#x[0-9a-f]+|#\d+);/gi,v=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[v.slice(1,-1)]??String.fromCodePoint(v[2].toLowerCase()==='x'?parseInt(v.slice(3,-1),16):parseInt(v.slice(2,-1),10))));
function markedText(html){
 const stack=[],rows=[];let current=null;
 for(const part of html.match(/<[^>]*>|[^<]+/g)||[]){
  if(part.startsWith('</')){const item=stack.pop();if(item?.marked){rows.push(current);current=null;}}
  else if(part.startsWith('<')){if(/^<!/.test(part))continue;const marked=/\bdata-teaching-code-line=/.test(part);if(marked){assert.equal(current,null);current='';}if(!/\/>$/.test(part)&&!/^<(?:br|hr|img|input|link|meta)\b/.test(part))stack.push({marked});}
  else if(current!==null)current+=decode(part);
 }return rows;
}
/** Strings and chars are indivisible. Identifiers/numbers retain boundaries; punctuation stays byte-for-byte, apart from inter-token whitespace. */
function lex(source){
 const result=[];let i=0;
 while(i<source.length){const rest=source.slice(i);if(/^\s/u.test(rest)){i+=rest.match(/^\s+/u)[0].length;continue;}
  if(rest[0]==='"'||rest[0]==="'"){const quote=rest[0];let j=1;for(;j<rest.length;j++){if(rest[j]==='\\'){j++;continue;}if(rest[j]===quote){j++;break;}}result.push(rest.slice(0,j));i+=j;continue;}
  const word=rest.match(/^[\p{L}_][\p{L}\p{N}_]*|^\d+(?:\.\d+)?/u);if(word){result.push(word[0]);i+=word[0].length;}else{result.push(rest[0]);i++;}
 }return result;
}
function rowsFor(component,data,step){
 let rows;
 if(component==='GenericWordSlide')rows=[data.tokens];
 else if(component==='GenericSentenceSlide')rows=data.lines.map(l=>l.tokens);
 else if(component==='GenericEssaySlide')rows=data.blocks.flatMap(b=>b.lines.map(l=>l.tokens));
 else if(component==='CodePurposeSlide'||component==='SmartShowcaseSlide')rows=data.code.map(l=>l.tokens.map(t=>{
  let text=t.text;
  if(step>=(component==='CodePurposeSlide'?1:3))for(const [pattern,replacement]of Object.entries(data.ghostText||{}))if(component==='CodePurposeSlide'?(text===pattern||text.includes(pattern)):text===pattern)text=text.replace(pattern,replacement);
  return {...t,text};
 }));
 else if(data.codeVisual?.type==='code'){
  if(data.codeVisual.tokens)rows=[data.codeVisual.tokens];
  else if(data.codeVisual.lines)rows=data.codeVisual.lines.map(l=>l.tokens);
  else return [{plain:data.codeVisual.content}];
 }else rows=[];
 return rows.map(tokens=>({tokens}));
}
function checkRows(actual,expected,label){
 assert.equal(actual.length,expected.length,label+' marker count');
 expected.forEach((row,index)=>{
  if(row.plain!==undefined)assert.equal(actual[index],row.plain,label+' plain bytes');
  else assert.deepEqual(lex(actual[index]),Array.from(row.tokens,t=>lex(t.text)).flat(),label+' row '+index+' lexical boundaries');
 });
}
const components=['GenericLiteracyQuiz','GenericWordQuiz','GenericSentenceQuiz','GenericEssayQuiz','GenericWordSlide','GenericSentenceSlide','GenericEssaySlide','CodePurposeSlide','SmartShowcaseSlide'];
const dataNames=['literacyQuizzes','wordQuizzes','sentenceQuizzes','essayQuizzes','wordSlides','sentenceSlides','essaySlides','wordPurposeSlides','sentencePurposeSlides','essayPurposeSlides'];
const constructorName=name=>name.endsWith('PurposeSlides')?'CodePurposeSlide':({literacyQuizzes:'GenericLiteracyQuiz',wordQuizzes:'GenericWordQuiz',sentenceQuizzes:'GenericSentenceQuiz',essayQuizzes:'GenericEssayQuiz',wordSlides:'GenericWordSlide',sentenceSlides:'GenericSentenceSlide',essaySlides:'GenericEssaySlide'})[name];
const constructors=Object.fromEntries(components.map(name=>[name,load('src/original/components/'+name+'.tsx')[name]]));
const datasets={};
function staticAudit(){
 for(const item of baseline.inherited){assert.equal(sha(fs.readFileSync(path.join(root,item.file))),item.sha256);stat.inherited.push(item);}
 for(const item of baseline.dataHashes){assert.equal(sha(fs.readFileSync(path.join(root,item.file))),item.sha256);stat.dataHashes.push(item);}
 for(const item of baseline.manifests){assert.equal(sha(fs.readFileSync(path.join(root,item.file))),item.sha256);stat.manifests.push(item);}
 const fixtureTokens=[
  {tokens:['std::string','name',';'],expected:'std::string name;'},
  {tokens:['const','int','count','=','3',';'],expected:'const int count=3;'},
  {tokens:['else','if','(','ready',')'],expected:'else if(ready)'},
  {tokens:['std::vector<int>','values',';'],expected:'std::vector<int> values;'},
  {tokens:['i','++',';'],expected:'i++;'},
  {tokens:['std','::','cout','<<','"a b\\n"',';'],expected:'std::cout<<"a b\\n";'},
  {tokens:['char','letter','=','\' \'',';'],expected:'char letter=\' \';'},
 ];
 const TeachingTokens=load('src/original/components/TeachingTokens.tsx').TeachingTokens;
 for(const fixture of fixtureTokens){const tokens=fixture.tokens.map(text=>({text}));const html=renderToStaticMarkup(React.createElement(TeachingTokens,{tokens,children:t=>React.createElement('span',null,t.text)}));const actual=markedText(html);assert.deepEqual(actual,[fixture.expected]);stat.fixtures.push({input:fixture.tokens,expected:fixture.expected,actual:actual[0],passed:true});}
 for(const language of ['c','cpp']){
  const result={language,records:0,serverStates:0,markedLines:0,byComponent:{},inactiveShowcase:{records:0,serverStates:0,markedLines:0},passed:false};datasets[language]={};
  for(const name of dataNames){const data=load('src/adapted-data/'+language+'/'+name+'.ts')[name];datasets[language][name]=data;const component=constructorName(name),count=component==='CodePurposeSlide'?3:component==='GenericEssaySlide'?6:component.endsWith('Slide')?5:1;
   for(const item of data){result.records++;for(state=0;state<count;state++){const actual=markedText(renderToStaticMarkup(React.createElement(constructors[component],{data:item})));checkRows(actual,rowsFor(component,item,state),language+' '+name+'#'+item.id+' step'+state);result.serverStates++;result.markedLines+=actual.length;result.byComponent[component]=(result.byComponent[component]||0)+1;}
    if(component==='CodePurposeSlide'){result.inactiveShowcase.records++;for(state=0;state<5;state++){const actual=markedText(renderToStaticMarkup(React.createElement(constructors.SmartShowcaseSlide,{data:item})));checkRows(actual,rowsFor('SmartShowcaseSlide',item,state),language+' inactive Showcase '+name+'#'+item.id+' step'+state);result.inactiveShowcase.serverStates++;result.inactiveShowcase.markedLines+=actual.length;}}
   }
  }result.passed=true;stat.languages.push(result);
 }
 const current='test-results/spacing-1.3.1/reachable-narration.json';execFileSync(process.execPath,['scripts/collect-narration.mjs','--output',current,...(fs.existsSync(path.join(root,current))?['--dry-run']:[])],{cwd:root,stdio:'pipe'});
 const updated=read(current);for(const language of ['c','cpp'])assert.deepEqual(updated.languages[language].texts.map(t=>t.text).sort(),inventory.languages[language].texts.map(t=>t.text).sort(),'Raw pronunciation keys changed');
 stat.speechInventory={file:current,sha256:sha(fs.readFileSync(path.join(root,current))),unchangedRawKeys:true,counts:Object.fromEntries(['c','cpp'].map(l=>[l,updated.languages[l].texts.length])),allFeedbacksUnchanged:true};
 stat.ok=true;
}
async function uiAudit(){
 const {_electron:electron}=require('playwright'),asar=require('@electron/asar'),products=read('products.json'),manifest=read('public/narration/manifest.json');
 const report={schemaVersion:1,version:'1.3.1',ok:false,generatedAt:new Date().toISOString(),staticReportSha256:sha(fs.readFileSync(path.join(directory,'static.json'))),
  boundary:'Real installed-stage Electron DOM: all 153 pages at 1400x1000 initial state, targeted slide/purpose last states and quiz pages at 760x540 and 1400x1000. Three recorded narration starts per language; not a repeat of 1.3.0 full voice/layout/compiler suites. SmartShowcase is server-render only.',languages:[],errors:[]};
 for(const language of ['c','cpp']){
  const product=products[language],application=path.join(root,'build',language,'application'),archive=path.join(application,'resources/app.asar');
  const result={language,version:null,asarSha256:sha(fs.readFileSync(archive)),manifestSha256:sha(fs.readFileSync(path.join(root,'public/narration/manifest.json'))),pages:[],targetStates:[],spaces:[],screenshots:[],narration:[],pageErrors:[],httpRequests:[],systemCalls:0,passed:false};report.languages.push(result);let app;
  try{
   assert.equal(sha(asar.extractFile(archive,path.join('dist','narration','manifest.json'))),result.manifestSha256);
   app=await electron.launch({executablePath:path.join(application,product.executable),args:['--user-data-dir='+path.join(directory,'profiles',language+'-'+Date.now())],timeout:30000});
   result.version=await app.evaluate(({app})=>app.getVersion());assert.equal(result.version,'1.3.1');
   const page=await app.firstWindow();page.on('pageerror',e=>result.pageErrors.push(e.message));await page.context().route(/^https?:/,r=>{result.httpRequests.push(r.request().url().split('?')[0]);return r.abort();});
   await page.addInitScript(()=>{
    window.__spacingStatuses=[];window.__spacingMedia=[];window.__spacingSystem=0;
    window.addEventListener('narration-status',e=>window.__spacingStatuses.push(e.detail));
    const Native=window.Audio;window.Audio=function(url){const a=new Native(url);a.muted=true;for(const kind of ['playing','error'])a.addEventListener(kind,()=>window.__spacingMedia.push({kind,file:String(url),muted:a.muted,rate:a.playbackRate}));return a;};window.Audio.prototype=Native.prototype;
    if(window.speechSynthesis)window.speechSynthesis.speak=()=>{window.__spacingSystem++;throw new Error('System speech forbidden');};
    document.addEventListener('DOMContentLoaded',()=>{const style=document.createElement('style');style.textContent='*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}';document.head.append(style);},{once:true});
   });
   await page.reload();await page.locator('.app-footer').waitFor();const base=page.url().split('?')[0];
   const settle=()=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   async function go(number){await page.goto(base+'?page='+number);await page.waitForFunction(n=>document.querySelector('.app-footer')?.innerText.match(/第\s*(\d+)\s*页/)?.[1]===String(n),number);const collapse=page.getByTitle('收起导航',{exact:true});if(await collapse.count())await collapse.click();await settle();}
   async function check(number,step,size){const route=inventory.languages[language].pages.find(p=>p.page===number),item=route.dataName?datasets[language][route.dataName]?.[route.recordIndex]:null;const actual=await page.locator('main [data-teaching-code-line]').evaluateAll(nodes=>nodes.map(n=>n.textContent));if(item)checkRows(actual,rowsFor(route.component,item,step),language+' DOM page'+number+' step'+step);else assert.equal(actual.length,0);return {page:number,component:route.component,step,size,markedLines:actual.length,text:actual};}
   await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].setSize(1400,1000));
   for(let number=1;number<=153;number++){await go(number);result.pages.push(await check(number,0,'1400x1000'));}
   console.log('PASS '+language+' all153 native DOM initial states');
   const targets=[20,21,75,76,95,96,103,108,109,112,114,115,138,139];
   for(const [width,height]of [[760,540],[1400,1000]]){
    await app.evaluate(({BrowserWindow},s)=>BrowserWindow.getAllWindows()[0].setSize(...s),[width,height]);const size=width+'x'+height;
    for(const number of targets){await go(number);const route=inventory.languages[language].pages.find(p=>p.page===number),last=route.component==='GenericEssaySlide'?5:route.component==='CodePurposeSlide'?2:route.component.endsWith('Slide')?4:0;result.targetStates.push(await check(number,0,size));
     const spaces=await page.locator('main .course-code-space').evaluateAll(nodes=>nodes.map(n=>{const range=document.createRange();range.selectNodeContents(n);const r=range.getBoundingClientRect();return {text:n.textContent,width:r.width,whiteSpace:getComputedStyle(n).whiteSpace};}));for(const s of spaces){assert.equal(s.text,' ');assert(s.width>0.1,'Inserted lexical separator has zero visual width');assert.equal(s.whiteSpace,'pre');}result.spaces.push({page:number,step:0,size,count:spaces.length,minWidth:spaces.length?Math.min(...spaces.map(s=>s.width)):null});
     if([103,108,109,112].includes(number)){const file=language+'-'+size+'-page'+number+'.png';await page.screenshot({path:path.join(directory,file)});result.screenshots.push(file);}
     if(last){const button=page.locator('main button').filter({hasText:/下一步/}).last();for(let s=1;s<=last;s++){await button.click();await settle();}result.targetStates.push(await check(number,last,size));if([20,95,114].includes(number)){const file=language+'-'+size+'-page'+number+'-step'+last+'.png';await page.screenshot({path:path.join(directory,file)});result.screenshots.push(file);}}
    }
   }
   async function playback(kind,number,click){await go(number);await page.evaluate(()=>{window.__spacingStatuses=[];window.__spacingMedia=[];});await click();await page.waitForFunction(()=>window.__spacingStatuses.some(e=>e.state==='playing'||e.state==='missing'||e.state==='error'),null,{timeout:15000});const events=await page.evaluate(()=>({status:window.__spacingStatuses,media:window.__spacingMedia}));assert(!events.status.some(e=>['missing','error'].includes(e.state)));const event=events.status.find(e=>e.state==='playing');assert(event);const entry=manifest.entries[event.text];assert(entry&&entry.mode==='recorded');assert.equal(event.spokenText,event.text);assert.equal(event.file,entry.file);assert.deepEqual(event.voice,manifest.voice);await page.waitForFunction(file=>window.__spacingMedia.some(e=>e.kind==='playing'&&e.file.endsWith(file)),entry.file);result.narration.push({kind,page:number,text:event.text,file:event.file,voiceId:event.voice.id,nativeStart:true});}
   await playback('unchanged-token',20,()=>page.locator('main .course-token-code').first().click());
   await playback('unchanged-sentence-line',75,()=>page.locator('main div[title^="点击朗读："]').first().click({position:{x:3,y:3}}));
   await playback('unchanged-quiz-feedback',108,()=>page.locator('main .space-y-4 > button').first().click());
   result.systemCalls=await page.evaluate(()=>window.__spacingSystem);assert.equal(result.systemCalls,0);assert.deepEqual(result.pageErrors,[]);assert.deepEqual(result.httpRequests,[]);assert.equal(sha(fs.readFileSync(archive)),result.asarSha256);result.passed=true;
   console.log('PASS '+language+' target first/last states, real space widths, 3 raw-key recorded starts');
  }catch(error){result.error=error.stack;report.errors.push({language,error:error.message});console.error('FAIL '+language+' '+error.message);}finally{if(app)await app.close();}
 }
 report.ok=report.languages.length===2&&report.languages.every(l=>l.passed)&&!report.errors.length;
 fs.writeFileSync(path.join(directory,'ui.json'),JSON.stringify(report,null,2)+'\n');assert(report.ok,'Spacing UI regression failed');return report;
}
(async()=>{try{staticAudit();}catch(e){stat.errors.push(e.stack);console.error(e.stack);}const output=path.join(directory,'static.json');let identical=false;if(fs.existsSync(output)){const old=JSON.parse(fs.readFileSync(output,'utf8'));identical=JSON.stringify({...old,generatedAt:null})===JSON.stringify({...stat,generatedAt:null});}if(!identical)fs.writeFileSync(output,JSON.stringify(stat,null,2)+'\n');assert(stat.ok,'Static spacing audit failed');console.log(JSON.stringify({ok:stat.ok,staticStates:stat.languages.map(l=>({language:l.language,states:l.serverStates,showcase:l.inactiveShowcase.serverStates})),report:'test-results/spacing-1.3.1/static.json'}));if(!process.argv.includes('--static-only'))await uiAudit();})().catch(e=>{console.error(e.stack);process.exitCode=1;});
