/** Final layout interaction smoke plus small-window real recorded-voice routing. */
const {_electron:electron}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),language=process.argv[2]||'cpp',python=language==='python',args=process.argv.slice(3),arg=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];},revision=arg('--revision',null);
assert(['python','c','cpp'].includes(language));
if(revision){assert(/^\d+\.\d+\.\d+$/.test(revision));assert(!python,'Python is frozen outside this C/C++ revision');}
const directory=python?path.join(root,'python-voice-update/build/application'):path.join(root,'build',language,'application');
const executable=python?'像学习语文一样学习编程.exe':language==='c'?'像学语文一样学 C.exe':'像学语文一样学 C++.exe';
const out=path.resolve(root,arg('--output',revision?`test-results/course-${revision}/layout`:'test-results/layout-final'));assert(out.startsWith(path.join(root,'test-results')+path.sep));fs.mkdirSync(out,{recursive:true});
const hash=bytes=>createHash('sha256').update(bytes).digest('hex'),read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const inventory=read(path.resolve(root,arg('--inventory',revision?`test-results/course-${revision}/narration-inventory.json`:`test-results/${python?'python-narration-inventory.json':'narration-inventory.json'}`))).languages[language];
const manifestPath=path.join(root,python?'python-voice-update/narration/manifest.json':'public/narration/manifest.json'),manifestBytes=fs.readFileSync(manifestPath),manifest=JSON.parse(manifestBytes);
const archive=path.join(directory,'resources/app.asar');
const report={schemaVersion:1,language,generatedAt:new Date().toISOString(),ok:false,version:null,asarSha256:hash(fs.readFileSync(archive)),manifestSha256:hash(manifestBytes),
 boundary:'Four native window sizes: navigation expanded/collapsed, empty AI help opened/closed without sending, real editor/read toggle, output open/close. C/C++ default program plus one input program runs only to inspect result/input controls; Python uses the existing simple local print execution path, not a new Python-runtime claim. Small-window voice tests use actual muted Audio, three representative routes only; the full 429 starts / 39 completions belong to the prior unchanged-audio release.',
 sizes:[],voiceRouting:[],ipcFeatureCases:[],httpRequests:[],pageErrors:[],errors:[]};
let app;
function panelMetrics(selector){
 const element=document.querySelector(selector);if(!element)return null;
 const r=element.getBoundingClientRect(),f=document.querySelector('.app-footer').getBoundingClientRect();
 const shape=e=>{const x=e.getBoundingClientRect();return{x:x.x,y:x.y,width:x.width,height:x.height,right:x.right,bottom:x.bottom};};
 return{...shape(element),viewport:{width:innerWidth,height:innerHeight},footer:shape(document.querySelector('.app-footer')),
 controls:[...element.querySelectorAll('button,input')].filter(e=>getComputedStyle(e).display!=='none').map(e=>({text:(e.innerText||e.placeholder||'').slice(0,80),...shape(e)}))};
}
(async()=>{try{
 app=await electron.launch({executablePath:path.join(directory,executable),args:['--user-data-dir='+path.join(out,'interaction-profiles',language+'-'+Date.now())],timeout:30000});
 report.version=await app.evaluate(({app})=>app.getVersion());
 await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows().forEach(w=>w.webContents.setAudioMuted(true)));
 const page=await app.firstWindow();page.on('pageerror',e=>report.pageErrors.push(e.message));
 await page.context().route(/^https?:/,route=>{report.httpRequests.push(route.request().url().split('?')[0]);return route.abort();});
 await page.addInitScript(()=>{
  window.__layoutVoiceAllowed=false;window.__layoutVoiceStatus=[];window.__layoutNativeAudio=[];window.__layoutSystemCalls=0;
  window.addEventListener('narration-status',e=>window.__layoutVoiceStatus.push(e.detail));
  const NativeAudio=window.Audio;window.Audio=function(url){if(!window.__layoutVoiceAllowed)throw new Error('Narration disabled during layout smoke');
   const audio=new NativeAudio(url);audio.muted=true;for(const kind of ['playing','ended','error'])audio.addEventListener(kind,()=>window.__layoutNativeAudio.push({kind,file:String(url),rate:audio.playbackRate,muted:audio.muted}));return audio;};
  window.Audio.prototype=NativeAudio.prototype;if(window.speechSynthesis)window.speechSynthesis.speak=()=>{++window.__layoutSystemCalls;throw new Error('System voice forbidden');};
 });
 await page.reload();await page.locator('.app-footer').waitFor();const base=page.url().split('?')[0];
 const settle=()=>page.waitForTimeout(100);
 async function go(number){
  if(!python){await page.goto(base+'?page='+number);await page.locator('.app-footer').waitFor();}
  else await page.evaluate(async target=>{
   for(let i=0;i<160;i++){
    const footer=document.querySelector('.app-footer'),current=Number(footer.innerText.match(/第\s*(\d+)\s*页/)[1]);if(current===target)return;
    footer.querySelectorAll('button')[target>current?1:0].click();await new Promise(requestAnimationFrame);
   }
   throw new Error('Footer navigation did not reach requested page');
  },number);
  await page.waitForFunction(n=>document.querySelector('.app-footer')?.innerText.match(/第\s*(\d+)\s*页/)?.[1]===String(n),number);
  const collapse=page.getByTitle('收起导航',{exact:true});if(await collapse.count())await collapse.click();await settle();
 }
 async function stableFooter(){const r=await page.evaluate(()=>{const r=document.querySelector('.app-footer').getBoundingClientRect();return{right:r.right,bottom:r.bottom,width:innerWidth,height:innerHeight};});assert(r.right<=r.width+2&&r.bottom<=r.height+2);return r;}
 async function edit(code){await page.getByRole('button',{name:/手动修改代码/}).click();const content=page.locator('.cm-content');await content.waitFor();await content.click();await content.press('Control+a');await page.keyboard.insertText(code);await settle();}
 for(const size of [[760,540],[1000,700],[1400,1000],[1920,1080]]){
  await app.evaluate(({BrowserWindow},v)=>BrowserWindow.getAllWindows()[0].setSize(...v),size);await go(95);
  const item={size:size.join('x'),navigation:null,help:null,editor:null,output:null,input:null,passed:false};report.sizes.push(item);
  if(!(await page.getByTitle('展开导航',{exact:true}).count())&&!(await page.getByTitle('收起导航',{exact:true}).count()))await page.getByRole('button',{name:'☰',exact:true}).click();
  const expand=page.getByTitle('展开导航',{exact:true});if(await expand.count())await expand.click();await settle();
  await page.evaluate(()=>{const b=document.querySelector('[title="收起导航"]');b.parentElement.parentElement.dataset.layoutSidebarProbe='1';});
  item.navigation=await page.evaluate(panelMetrics,'[data-layout-sidebar-probe]');assert(item.navigation&&item.navigation.width>100);
  assert(item.navigation.x>=-2&&item.navigation.right<=item.navigation.viewport.width+2,'Expanded navigation escapes viewport');
  if(size[0]===760)await page.screenshot({path:path.join(out,`${language}-760x540-navigation-open.png`)});
  await page.getByTitle('收起导航',{exact:true}).click();await settle();await stableFooter();
  await page.locator('.ai-help').click();await page.locator('.ai-chat').waitFor();item.help=await page.evaluate(panelMetrics,'.ai-chat');
  assert(item.help.x>=-2&&item.help.right<=item.help.viewport.width+2&&item.help.y>=-2&&item.help.bottom<=item.help.viewport.height+2,'AI panel escapes window');
  for(const control of item.help.controls)assert(control.x>=-2&&control.right<=item.help.viewport.width+2&&control.y>=-2&&control.bottom<=item.help.viewport.height+2,'AI control inaccessible');
  await page.locator('.ai-chat').getByRole('button',{name:'✕',exact:true}).click();await page.locator('.ai-chat').waitFor({state:'detached'});
  await go(152);await page.getByRole('button',{name:/手动修改代码/}).click();await page.locator('.cm-content').waitFor();
  item.editor=await page.evaluate(panelMetrics,'.cm-editor');assert(item.editor&&item.editor.width>100&&item.editor.height>=80,'Editor collapses');await stableFooter();
  await page.getByRole('button',{name:/返回阅读模式/}).click();
  if(python){await edit('print("layout-check")');await page.getByRole('button',{name:/返回阅读模式/}).click();}
  await page.getByRole('button',{name:/运行代码/}).click();await page.getByText('运行结果',{exact:true}).waitFor();
  if(python)await page.waitForFunction(()=>[...document.querySelectorAll('main pre')].some(e=>e.innerText.includes('layout-check')));
  else await page.getByText('退出状态：0',{exact:true}).waitFor({timeout:30000});
  await page.locator('.course-ide-output').scrollIntoViewIfNeeded();
  item.output=await page.evaluate(panelMetrics,'.course-ide-output');assert(item.output&&item.output.width>100&&item.output.height>50);await stableFooter();
  assert(item.output.y>=-2&&item.output.bottom<=item.output.footer.y+2,'Result panel cannot be brought above the footer');
  if(size[0]===760)await page.screenshot({path:path.join(out,`${language}-760x540-lab-result.png`)});
  await page.locator('main').getByRole('button',{name:'✕',exact:true}).click();await page.getByText('运行结果',{exact:true}).waitFor({state:'detached'});
  if(!python){
   const code=language==='c'?'#include <stdio.h>\nint main(void){int n;printf("输入：");fflush(stdout);if(scanf("%d",&n)!=1)return 1;printf("结果=%d\\n",n+1);return 0;}':'#include <iostream>\nint main(){int n;std::cout<<"输入："<<std::flush;if(!(std::cin>>n))return 1;std::cout<<"结果="<<n+1<<"\\n";}';
   await edit(code);await page.getByRole('button',{name:/返回阅读模式/}).click();await page.getByRole('button',{name:/运行代码/}).click();
   const input=page.getByPlaceholder('请输入内容后按回车...');await input.waitFor({timeout:30000});await input.scrollIntoViewIfNeeded();await input.click({trial:true});
   item.input=await input.boundingBox();assert(item.input.height>=15&&item.input.width>60);await stableFooter();await input.fill('3');await input.press('Enter');await page.getByText('退出状态：0',{exact:true}).waitFor({timeout:30000});
   await page.locator('main').getByRole('button',{name:'✕',exact:true}).click();
  }else item.input={notExercised:true,reason:'Python input runtime may require environment loading; layout smoke only uses existing local print path.'};
  await page.screenshot({path:path.join(out,`${language}-${item.size}-lab-smoke.png`)});item.passed=true;console.log('PASS '+language+' interaction '+item.size);
 }
 if(revision&&!python){
  const ts=require('typescript'),dataFile=path.join(root,`src/adapted-data/${language}/essayExamples.ts`),dataBytes=fs.readFileSync(dataFile),javascript=ts.transpileModule(dataBytes.toString('utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  assert(!/^\s*import\s/m.test(javascript));const examples=(await import('data:text/javascript;base64,'+Buffer.from(javascript).toString('base64'))).essayExamples;
  for(const id of [13,language==='c'?10:9]){
   const example=examples.find(e=>e.id===id);assert(example);
   const result=await page.evaluate(async ({code,stdin})=>new Promise(async(resolve,reject)=>{
    let runId=null,queue=[],output='',stderr='',events=[];const timer=setTimeout(()=>{off();if(runId)window.learning.stop(runId);reject(new Error('Feature IPC run timeout'));},35000);
    const apply=event=>{if(event.runId!==runId)return;events.push({type:event.type,code:event.code});if(event.type==='stdout')output+=event.text;if(event.type==='stderr')stderr+=event.text;if(event.type==='running'&&stdin)window.learning.writeInput(runId,stdin);
     if(['exit','error','stopped','compile-error'].includes(event.type)){clearTimeout(timer);off();resolve({output,stderr,event:event.type,code:event.code,error:event.type==='compile-error'?event.text:null,events});}};
    const off=window.learning.onRunnerEvent(event=>runId?apply(event):queue.push(event));try{const start=await window.learning.run(code);runId=start.runId;queue.forEach(apply);}catch(error){clearTimeout(timer);off();reject(error);}
   }),{code:example.code,stdin:example.stdin||''});
   assert.equal(result.event,'exit');assert.equal(result.code,0);assert.equal(result.stderr,'');assert.equal(result.output.replace(/\r\n/g,'\n'),example.expectedOutput.replace(/\r\n/g,'\n'));
   report.ipcFeatureCases.push({dataset:'essayExamples',id,sourceFile:path.relative(root,dataFile).replaceAll('\\','/'),sourceFileSha256:hash(dataBytes),codeSha256:hash(Buffer.from(example.code)),expectedOutput:example.expectedOutput,...result,passed:true});
  }
 }
 // Representative actual recording routes, under the smallest supported window.
 await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].setSize(760,540));await go(95);
 async function voice(name,action,expected,natural=false){
  await page.evaluate(()=>{window.__layoutVoiceAllowed=true;window.__layoutVoiceStatus=[];window.__layoutNativeAudio=[];});await action();
  await page.waitForFunction(()=>window.__layoutVoiceStatus.some(e=>['playing','missing','error'].includes(e.state)),null,{timeout:15000});
  const data=await page.evaluate(()=>({status:window.__layoutVoiceStatus,native:window.__layoutNativeAudio}));assert(!data.status.some(e=>['missing','error'].includes(e.state)));
  const playing=data.status.find(e=>e.state==='playing');assert(playing);if(expected)assert.equal(playing.text,expected);
  assert.equal(playing.source,'recorded');assert.deepEqual(playing.voice,manifest.voice);assert.equal(playing.file,manifest.entries[playing.text].file);assert(playing.file.includes('/xiaoxiao-'));
  await page.waitForFunction(file=>window.__layoutNativeAudio.some(e=>e.kind==='playing'&&e.file.endsWith(file)),playing.file);
  const native=await page.evaluate(file=>window.__layoutNativeAudio.find(e=>e.kind==='playing'&&e.file.endsWith(file)),playing.file);assert(native.muted);assert.equal(native.rate,1);
  if(natural)await page.waitForFunction(file=>window.__layoutNativeAudio.some(e=>e.kind==='ended'&&e.file.endsWith(file)),playing.file,{timeout:15000});
  report.voiceRouting.push({name,page:name==='quiz-feedback'?107:95,raw:playing.text,file:playing.file,voiceId:playing.voice.id,source:'recorded',nativeStart:true,naturalCompletionChecked:natural,nativeEnd:natural?true:null,muted:native.muted,rate:native.rate});
 }
 await voice('point-token',()=>page.locator('main span.group > span.font-mono').first().click(),null,true);
 const line=inventory.texts.find(t=>t.sources.some(s=>s.page===95&&s.category==='sentence-line'));
 await voice('sentence-blank-area',()=>page.locator('main div[title^="点击朗读："]').first().click({position:{x:3,y:3}}),line.text);
 await go(107);const feedback=inventory.texts.flatMap(t=>t.sources.filter(s=>s.page===107&&s.category==='quiz-wrong-feedback').map(s=>({text:t.text,index:s.optionIndex})))[0];
 await voice('quiz-feedback',()=>page.locator('main .space-y-4 > button').nth(feedback.index).click(),feedback.text);
 assert.equal(await page.evaluate(()=>window.__layoutSystemCalls),0);
 const dependencyURLs=['https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide-lock.json','https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.wasm','https://cdn.jsdelivr.net/pyodide/v0.25.0/full/python_stdlib.zip','https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.js'];
 const expectedDependencyBoundary=python&&report.httpRequests.every(url=>dependencyURLs.includes(url))&&report.pageErrors.every(error=>/^Failed to fetch$|importScripts.*pyodide/.test(error));
 report.runtimeDependencyBoundary={allRequestsBlocked:true,existingPythonDependencyAttempts:python?report.httpRequests.length:0,expectedDependencyErrors:expectedDependencyBoundary?report.pageErrors.length:0,fullPythonRuntimeVerified:false,localPrintOutputObserved:python};
 if(!expectedDependencyBoundary){assert.deepEqual(report.pageErrors,[]);assert.deepEqual(report.httpRequests,[]);}
 assert.equal(hash(fs.readFileSync(archive)),report.asarSha256);assert.equal(hash(fs.readFileSync(manifestPath)),report.manifestSha256);report.ok=true;
 }catch(error){report.errors.push(error.stack||String(error));process.exitCode=1;if(app){const p=await app.firstWindow();report.failureState=await p.evaluate(()=>({footer:document.querySelector('.app-footer')?.innerText,titles:[...document.querySelectorAll('button[title]')].map(e=>({title:e.title,text:e.innerText})),bodyChildren:[...document.body.children].map(e=>e.tagName+':'+e.className)}));await p.screenshot({path:path.join(out,language+'-interaction-failure.png')});}}
 finally{if(app)await app.close().catch(e=>{report.errors.push(e.message);report.ok=false;process.exitCode=1;});report.completedAt=new Date().toISOString();fs.writeFileSync(path.join(out,`interactions-${language}.json`),JSON.stringify(report,null,2));console.log(JSON.stringify({language,ok:report.ok,sizes:report.sizes.length,voiceRoutes:report.voiceRouting.length,errors:report.errors}));}
})().catch(e=>{console.error(e);process.exitCode=1;});
