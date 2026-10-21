/** Visual-rectangle layout audit. Never changes production files, invokes AI or plays narration. */
const {_electron:electron}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),args=process.argv.slice(2);
const arg=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];};
const phase=arg('--phase','baseline'),language=arg('--language','cpp');
assert(['baseline','final'].includes(phase));assert(['python','c','cpp'].includes(language));
const revision=arg('--revision',null);if(revision){assert(/^\d+\.\d+\.\d+$/.test(revision));assert.notEqual(language,'python','A C/C++ revision must not retest or overwrite frozen Python evidence');}
const output=path.resolve(root,arg('--output',revision?`test-results/course-${revision}/layout`:'test-results/layout-'+phase));assert(output.startsWith(path.join(root,'test-results')+path.sep));fs.mkdirSync(output,{recursive:true});
const hash=data=>createHash('sha256').update(data).digest('hex');
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const names={python:'像学习语文一样学习编程.exe',c:'像学语文一样学 C.exe',cpp:'像学语文一样学 C++.exe'};
const sourceFor=l=>l==='python'?path.join(root,'python-voice-update/build/application'):path.join(root,'build',l,'application');
function cloneBaseline(){
 const snapshots=[];
 for(const l of ['python','c','cpp']){
  const destination=path.join(root,'test-results/layout-baseline',l,'application');
  const marker=path.join(root,'test-results/layout-baseline',l,'snapshot.json');
  if(fs.existsSync(marker)){snapshots.push(read(marker));continue;}
  assert(!fs.existsSync(destination),'Incomplete baseline clone exists; inspect it before replacing');
  const source=sourceFor(l),archive=path.join(source,'resources/app.asar');assert(fs.existsSync(archive));
  const before=hash(fs.readFileSync(archive));
  fs.cpSync(source,destination,{recursive:true,filter:file=>{
   const relative=path.relative(source,file).replaceAll('\\','/');
   return relative!=='resources/compiler'&&!relative.startsWith('resources/compiler/');
  }});
  assert.equal(hash(fs.readFileSync(path.join(destination,'resources/app.asar'))),before);
  const snapshot={language:l,source,destination,asarSha256:before,compilerExcluded:true,capturedAt:new Date().toISOString()};
  fs.writeFileSync(marker,JSON.stringify(snapshot,null,2));snapshots.push(snapshot);
 }
 return snapshots;
}
if(args.includes('--clone-only')){console.log(JSON.stringify(cloneBaseline(),null,2));process.exit(0);}
const application=arg('--stage',phase==='baseline'?path.join(output,language,'application'):sourceFor(language));
if(phase==='baseline'&&!fs.existsSync(path.join(application,'resources/app.asar')))cloneBaseline();
const resolutions=arg('--resolutions','760x540,1000x700,1400x1000,1920x1080').split(',').map(v=>v.split('x').map(Number));
const pages=arg('--pages','all')==='all'?Array.from({length:153},(_,i)=>i+1):arg('--pages').split(',').map(Number);
const stepLimit=Number(arg('--step-limit','99')),screenshotLimit=Number(arg('--screenshots','20'));
const inventoryFile=path.resolve(root,arg('--inventory',revision?`test-results/course-${revision}/narration-inventory.json`:`test-results/${language==='python'?'python-narration-inventory.json':'narration-inventory.json'}`));
const inventory=read(inventoryFile).languages[language];
const archive=path.join(application,'resources/app.asar');
const reportFile=path.join(output,language+(arg('--tag','')?'-'+arg('--tag',''):'')+'.json');
const report={schemaVersion:1,phase,language,generatedAt:new Date().toISOString(),ok:false,scanCompleted:false,
 application,asarSha256:hash(fs.readFileSync(archive)),version:null,revision,inventoryFile:path.relative(root,inventoryFile).replaceAll('\\','/'),inventorySha256:hash(fs.readFileSync(inventoryFile)),
 coverage:{requestedPages:pages,resolutions:resolutions.map(v=>v.join('x')),basePages:0,stateMeasurements:0,quizFeedbacks:0,stepStates:0,stepButtonsReachable:0},
 boundary:'All requested pages at every requested native window size. Every existing main next-step state is visited (word/sentence five, essay six, purpose three; theory static). Every quiz option feedback is expanded, wrong answers before the correct answer. Lab is default state only: no AI, editor, runner or help dialog. CSS animations disabled in test only. Geometry uses transformed getClientRects; legitimate axis scrolling is classified separately. Side navigation is collapsed consistently. No claim of pixel equivalence or subjective text readability.',
 states:[],findings:[],screenshots:[],httpRequests:[],pageErrors:[],errors:[]};
const screenshotKeys=new Set();
function geometry(){
 const round=v=>Math.round(v*100)/100;
 const rect=r=>({left:round(r.left),top:round(r.top),right:round(r.right),bottom:round(r.bottom),width:round(r.width),height:round(r.height)});
 const selector=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+('.'+String(e.className||'').trim().split(/\s+/).slice(0,4).join('.'));
 const viewport={left:0,top:0,right:innerWidth,bottom:innerHeight,width:innerWidth,height:innerHeight};
 const hidden=e=>{for(let p=e;p&&p!==document.documentElement;p=p.parentElement){const c=getComputedStyle(p);if(c.display==='none'||c.visibility==='hidden'||Number(c.opacity)<0.02)return true;}return false;};
 const issues=[],scrolls=[],seen=new Set();let textRects=0;
 const add=(kind,e,r,bound,extra={})=>{
  const text=(e.innerText||e.textContent||'').trim().slice(0,180),key=kind+'|'+selector(e)+'|'+text+'|'+Math.round(r.left)+'|'+Math.round(r.top);
  if(seen.has(key))return;seen.add(key);issues.push({kind,element:selector(e),text,rect:rect(r),bound:rect(bound),...extra});
 };
 function inspect(e,r,isButton=false){
  let sx=false,sy=false,cardChecked=false;
  for(let p=e.parentElement;p;p=p.parentElement){
   const c=getComputedStyle(p),b=p.getBoundingClientRect();
   const ax=['auto','scroll'].includes(c.overflowX)&&p.scrollWidth>p.clientWidth+2;
   const ay=['auto','scroll'].includes(c.overflowY)&&p.scrollHeight>p.clientHeight+2;
   const outsideX=r.left<b.left-3||r.right>b.right+3,outsideY=r.top<b.top-3||r.bottom>b.bottom+3;
   if(ax)sx=true;if(ay)sy=true;
   const white=c.backgroundColor==='rgb(255, 255, 255)'&&parseFloat(c.borderRadius)>=8&&(parseFloat(c.borderTopWidth)>0||c.boxShadow!=='none');
   if(white&&!cardChecked){
    cardChecked=true;
    if(outsideX&&!sx)add('card-content-escape-x',e,r,b,{card:selector(p)});
    if(outsideY&&!sy)add('card-content-escape-y',e,r,b,{card:selector(p)});
   }
   if(['hidden','clip'].includes(c.overflowX)&&outsideX&&!sx)add(isButton?'button-clipped-x':'hidden-text-x',e,r,b,{clip:selector(p)});
   if(['hidden','clip'].includes(c.overflowY)&&outsideY&&!sy)add(isButton?'button-clipped-y':'hidden-text-y',e,r,b,{clip:selector(p)});
   if(p===document.body)break;
  }
  if((r.left<-3||r.right>innerWidth+3)&&!sx)add(isButton?'button-outside-window-x':'text-outside-window-x',e,r,viewport);
  if((r.top<-3||r.bottom>innerHeight+3)&&!sy)add(isButton?'button-outside-window-y':'text-outside-window-y',e,r,viewport);
 }
 for(const scope of document.querySelectorAll('main,.app-header,.app-footer')){
  const walk=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);
  while(walk.nextNode()){
   const n=walk.currentNode,e=n.parentElement;if(!n.textContent.trim()||!e||hidden(e)||e.closest('script,style,svg,.cm-announced,.pointer-events-none.select-none,[aria-hidden="true"]'))continue;
   const range=document.createRange();range.selectNodeContents(n);
   for(const r of range.getClientRects()){if(r.width<0.5||r.height<0.5)continue;++textRects;inspect(e,r);}
  }
 }
 for(const e of document.querySelectorAll('main button,.app-header button,.app-footer button')){
  if(hidden(e))continue;const r=e.getBoundingClientRect();if(r.width<1||r.height<1)continue;inspect(e,r,true);
 }
 for(const e of document.querySelectorAll('main *')){
  if(hidden(e))continue;const c=getComputedStyle(e);
  const x=['auto','scroll'].includes(c.overflowX)&&e.scrollWidth>e.clientWidth+2;
  const y=['auto','scroll'].includes(c.overflowY)&&e.scrollHeight>e.clientHeight+2;
  if(x||y){inspect(e,e.getBoundingClientRect());scrolls.push({element:selector(e),x,y,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,rect:rect(e.getBoundingClientRect())});}
 }
 // A floating closed help button must not hide header content or lesson controls.
 const help=document.querySelector('.ai-help')||[...document.querySelectorAll('button')].find(e=>e.innerText.trim()==='?');
 let helpRect=null,helpChecks=0;
 if(help&&!hidden(help)&&!document.querySelector('.ai-chat')){
  const h=help.getBoundingClientRect();helpRect=rect(h);inspect(help,h,true);
  const targets=new Set([...document.querySelectorAll('main button,main input,main textarea,.app-header button')]);
  for(const e of targets){
   if(hidden(e)||e===help||e.contains(help)||help.contains(e))continue;
   const r=e.getBoundingClientRect();if(r.width<1||r.height<1||r.bottom<=0||r.top>=innerHeight||r.right<=0||r.left>=innerWidth)continue;
   ++helpChecks;
   const width=Math.min(h.right,r.right)-Math.max(h.left,r.left),height=Math.min(h.bottom,r.bottom)-Math.max(h.top,r.top);
   if(width>2&&height>2)add('floating-help-overlaps-control',e,r,h,{help:selector(help),overlapWidth:round(width),overlapHeight:round(height)});
  }
  const header=document.querySelector('.app-header');if(header){const walk=document.createTreeWalker(header,NodeFilter.SHOW_TEXT);while(walk.nextNode()){
   const n=walk.currentNode,e=n.parentElement;if(!n.textContent.trim()||hidden(e)||e.closest('.ai-help'))continue;
   const range=document.createRange();range.selectNodeContents(n);for(const r of range.getClientRects()){
    ++helpChecks;const width=Math.min(h.right,r.right)-Math.max(h.left,r.left),height=Math.min(h.bottom,r.bottom)-Math.max(h.top,r.top);
    if(width>2&&height>2)add('floating-help-overlaps-header-text',e,r,h,{help:selector(help),overlapWidth:round(width),overlapHeight:round(height)});
   }
  }}
 }
 const main=document.querySelector('main');
 const transformed=[...main.querySelectorAll('[style]')].filter(e=>getComputedStyle(e).transform!=='none'||getComputedStyle(e).zoom!=='1').map(e=>({element:selector(e),transform:getComputedStyle(e).transform,zoom:getComputedStyle(e).zoom,rect:rect(e.getBoundingClientRect())}));
 return {viewport:{width:innerWidth,height:innerHeight},title:main.querySelector('h1,h2')?.innerText,textRects,
  main:rect(main.getBoundingClientRect()),helpRect,helpChecks,issues:issues.slice(0,80),totalIssues:issues.length,controlledScrolls:scrolls.slice(0,30),transformed:transformed.slice(0,8)};
}
(async()=>{
 let app;
 try{
  app=await electron.launch({executablePath:path.join(application,names[language]),args:['--user-data-dir='+path.join(output,'profiles',language+'-'+Date.now())],timeout:30000});
  report.version=await app.evaluate(({app})=>app.getVersion());
  await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows().forEach(w=>w.webContents.setAudioMuted(true)));
  const page=await app.firstWindow();page.on('pageerror',error=>report.pageErrors.push(error.message));
  await page.context().route(/^https?:/,route=>{report.httpRequests.push(route.request().url().split('?')[0]);return route.abort();});
  await page.addInitScript(()=>{
   window.__layoutBlockedAudio=0;window.Audio=function(){++window.__layoutBlockedAudio;throw new Error('Narration disabled by layout-only audit');};
   if(window.speechSynthesis)window.speechSynthesis.speak=()=>{++window.__layoutBlockedAudio;};
   const style=document.createElement('style');style.textContent='*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}';
   const insert=()=>document.head.appendChild(style);if(document.head)insert();else document.addEventListener('DOMContentLoaded',insert,{once:true});
  });
  await page.reload();await page.locator('.app-footer').waitFor();const base=page.url().split('?')[0];
  async function settle(){await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await page.waitForTimeout(30);}
  async function collapse(){const b=page.getByTitle('收起导航',{exact:true});if(await b.count())await b.click();}
  async function go(number){
   if(language!=='python'){await page.goto(base+'?page='+number);await page.locator('.app-footer').waitFor();}
   else{
    const current=Number((await page.locator('.app-footer').innerText()).match(/第\s*(\d+)\s*页/)[1]);
    if(number===1&&current!==1){await page.reload();await page.locator('.app-footer').waitFor();}
    else if(number===current+1)await page.locator('.app-footer button').last().click();
    else if(number!==current){
     const expand=page.getByTitle('展开导航',{exact:true});if(await expand.count())await expand.click();
     const destination=inventory.pages.find(p=>p.page===number);assert(destination);
     let target=page.getByRole('button',{name:destination.section,exact:true});
     if(!(await target.count())){const section=inventory.pages.filter(p=>p.page<=number&&p.section.startsWith('阶段')).at(-1);if(section)await page.locator('.app-navigation').getByRole('button').filter({hasText:section.section}).first().click();target=page.getByRole('button',{name:destination.section,exact:true});}
     if(await target.count())await target.first().click();else await page.locator('.app-navigation').getByText(destination.section,{exact:true}).click();
    }
   }
   await page.waitForFunction(n=>document.querySelector('.app-footer')?.innerText.match(/第\s*(\d+)\s*页/)?.[1]===String(n),number);
   await collapse();await settle();
  }
  async function measure(number,state,size){
   await settle();const result=await page.evaluate(geometry),entry={page:number,section:inventory.pages.find(p=>p.page===number)?.section,state,size,...result};
   report.states.push(entry);++report.coverage.stateMeasurements;
   for(const issue of result.issues)report.findings.push({page:number,state,size,...issue});
   const key=number+'|'+(result.issues[0]?.kind||'target');
   const changedSamples=revision?(language==='c'?[36,87,95,97,120,126,132,138]:[30,40,87,116,122,124,130,132,134,138]):[];
   const sample=[3,46,95,117,121,137,152,...changedSamples].includes(number)&&['760x540','1400x1000'].includes(size)&&['base','step-0'].includes(state);
   if(sample||(number===95&&['step-0','step-1','base'].includes(state))||(result.issues.length&&screenshotKeys.size<screenshotLimit&&!screenshotKeys.has(key))){
    const filename=`${language}-${size}-page${number}-${state.replace(/[^A-Za-z0-9_-]/g,'_')}.png`,target=path.join(output,filename);
    await page.screenshot({path:target});report.screenshots.push({page:number,state,size,path:target,issues:result.totalIssues});screenshotKeys.add(key);
   }
  }
  for(const [width,height]of resolutions){
   const size=width+'x'+height;await app.evaluate(({BrowserWindow},v)=>BrowserWindow.getAllWindows()[0].setSize(...v),[width,height]);await settle();
   for(const number of pages){
    await go(number);++report.coverage.basePages;
    const stepButton=page.locator('main button').filter({hasText:/下一步|再来一次|重新开始/}).last();
    if(await stepButton.count()){
     const component=inventory.pages.find(p=>p.page===number)?.component;
     const count=Math.min(stepLimit,component==='GenericEssaySlide'?6:component==='CodePurposeSlide'?3:5);
     for(let s=0;s<count;s++){await measure(number,'step-'+s,size);++report.coverage.stepStates;await stepButton.click({trial:true,timeout:5000});++report.coverage.stepButtonsReachable;if(s+1<count)await stepButton.click();}
    }else await measure(number,'base',size);
    if(inventory.pages.find(p=>p.page===number)?.component?.endsWith('Quiz')){
     const records=[];for(const item of inventory.texts)for(const origin of item.sources)if(origin.page===number&&['quiz-correct-feedback','quiz-wrong-feedback'].includes(origin.category))records.push({...origin,text:item.text});
     records.sort((a,b)=>Number(a.correct)-Number(b.correct)||a.optionIndex-b.optionIndex);
     const options=page.locator('main .space-y-4 > button');assert.equal(await options.count(),records.length);
     for(const option of records){await options.nth(option.optionIndex).click();await measure(number,'feedback-'+option.optionIndex,size);++report.coverage.quizFeedbacks;}
    }
    if(number%20===0||number===pages.at(-1)){
     console.log(JSON.stringify({phase,language,size,page:number,states:report.coverage.stateMeasurements,findings:report.findings.length}));
     fs.writeFileSync(reportFile+'.progress.json',JSON.stringify({phase,language,version:report.version,coverage:report.coverage,firstFindings:report.findings.slice(0,20),screenshots:report.screenshots},null,2));
    }
   }
  }
  assert.equal(hash(fs.readFileSync(archive)),report.asarSha256,'Application changed while scanning');
  report.scanCompleted=true;report.ok=report.findings.length===0&&report.pageErrors.length===0&&report.httpRequests.length===0;
 }catch(error){report.errors.push(error.stack||String(error));process.exitCode=1;}
 finally{
  if(app)await app.close().catch(error=>{report.errors.push(error.message);report.ok=false;process.exitCode=1;});
  report.completedAt=new Date().toISOString();report.summary={states:report.coverage.stateMeasurements,findingCount:report.findings.length,affectedPages:[...new Set(report.findings.map(f=>f.page))],kinds:Object.fromEntries([...new Set(report.findings.map(f=>f.kind))].map(kind=>[kind,report.findings.filter(f=>f.kind===kind).length]))};
  fs.writeFileSync(reportFile,JSON.stringify(report,null,2));console.log(JSON.stringify({report:reportFile,scanCompleted:report.scanCompleted,ok:report.ok,...report.summary,errors:report.errors.length}));
 }
})().catch(error=>{console.error(error);process.exitCode=1;});
