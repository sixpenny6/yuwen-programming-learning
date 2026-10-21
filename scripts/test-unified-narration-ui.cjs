/** Actual offline media playback, including all 47 quizzes / 143 answer feedbacks in each product. */
const {_electron:electron}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {createHash}=require('node:crypto'),asar=require('@electron/asar');
const root=path.resolve(__dirname,'..'),products=require('../products.json'),results=path.join(root,'test-results');
const args=process.argv.slice(2),arg=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];},revision=arg('--revision',null),selectedLanguages=arg('--languages',revision?'c,cpp':'python,c,cpp').split(',');
assert(selectedLanguages.length&&new Set(selectedLanguages).size===selectedLanguages.length&&selectedLanguages.every(l=>['python','c','cpp'].includes(l)));
if(revision){assert(/^\d+\.\d+\.\d+$/.test(revision));assert(!selectedLanguages.includes('python'),'Python is unchanged in a C/C++ revision');}
const hash=data=>createHash('sha256').update(data).digest('hex');
const readJSON=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const expectedVoice={id:'microsoft-xiaoxiao-neural-normal',name:'晓晓',engine:'Microsoft Edge Online TTS',speaker:'zh-CN-XiaoxiaoNeural',synthesisRate:'+0%',playbackRate:1,pitch:'+0Hz',volume:'+0%'};
const expectedFallback={lang:'zh-CN',rate:1,preferredVoices:['Xiaoxiao'],enabled:false};
// A fresh optional full retest uses the current stage versions and a separate report.
// The archived xiaoxiao-ui.json remains the inherited 1.2.3 / Python 1.0.4 evidence.
const expectedVersions={python:selectedLanguages.includes('python')?readJSON(path.join(root,'python-voice-update','build-report.json')).version:'1.0.5',c:products.c.version,cpp:products.cpp.version};
const outputReport=revision?`course-${revision}/narration-ui.json`:'xiaoxiao-ui-retest.json';
const inputFile=path.resolve(root,arg('--input',revision?`test-results/course-${revision}/narration-input.json`:'test-results/xiaoxiao-narration-input.json'));
const inputBytes=fs.readFileSync(inputFile),input=JSON.parse(inputBytes);
assert.deepEqual(input.voice,expectedVoice);assert.equal(input.entries.length,input.keys.length);assert(input.entries.length>0);
const representatives=arg('--representatives',revision?'compact':'full');assert(['compact','full'].includes(representatives));
for(const item of input.keys)assert.equal(item.id,'xiaoxiao-'+hash(Buffer.from(item.key,'utf8')).slice(0,24));
const report={schemaVersion:1,generatedAt:new Date().toISOString(),ok:false,
 voice:expectedVoice,inputSha256:hash(inputBytes),expectedVersions,revision,inputFile:path.relative(root,inputFile).replaceAll('\\','/'),representatives,
 scope:'Voice regression for selected products: '+selectedLanguages.join(', ')+'. All 47 quiz pages and all 143 option feedbacks in each selected product must start real bundled Xiaoxiao media. Representative natural completion mode: '+representatives+'. No unselected product, compiler or installer suite is retested.',
 evidenceBoundary:'All 143 feedbacks are checked for actual native Audio playing, exact raw text/file/voice and correct routing. Natural completion is checked on representative entrances; remaining feedbacks are deliberately interrupted by the next click. Audio.muted=true is test-only, and playbackRate remains 1. System speech is prohibited during normal recorded-path tests; no fake start/end events are emitted.',
 languages:[],errors:[]};
function quizCases(inventory){
 const cases=[];for(const item of inventory.texts)for(const source of item.sources||[]){if(['quiz-correct-feedback','quiz-wrong-feedback'].includes(source.category))cases.push({page:source.page,option:source.optionIndex,correct:source.correct,text:item.text,section:source.section});}
 cases.sort((a,b)=>a.page-b.page||Number(a.correct)-Number(b.correct)||a.option-b.option);
 assert.equal(cases.length,143);assert.equal(new Set(cases.map(c=>c.page)).size,47);return cases;
}
function inventoryFor(language){return readJSON(path.resolve(root,arg('--inventory',revision?`test-results/course-${revision}/narration-inventory.json`:`test-results/${language==='python'?'python-narration-inventory.json':'narration-inventory.json'}`))).languages[language];}
async function testProduct(language){
 const python=language==='python';
 const pythonBuild=python?readJSON(path.join(root,'python-voice-update','build-report.json')):null;
 if(python)assert(pythonBuild.ok&&pythonBuild.readyForPlayback,'Python final narration stage has not been built');
 const product=python?{name:'像学习语文一样学习编程',version:pythonBuild.version,executable:'像学习语文一样学习编程.exe',appId:'python-learning'}:products[language];
 assert.equal(product.version,expectedVersions[language],'Only the final current Xiaoxiao product version may be tested');
 const application=python?path.join(root,'python-voice-update','build','application'):path.join(root,'build',language,'application');
 const manifestPath=python?path.join(root,'python-voice-update','narration','manifest.json'):path.join(root,'public','narration','manifest.json');
 const bytes=fs.readFileSync(manifestPath),manifest=JSON.parse(bytes),archive=path.join(application,'resources','app.asar');
 assert.equal(hash(asar.extractFile(archive,path.join('dist','narration','manifest.json'))),hash(bytes),'Stage manifest differs from final published narration');
 assert.deepEqual(manifest.voice,expectedVoice);
 assert.deepEqual(manifest.fallback,expectedFallback,'Current Xiaoxiao assets must disable system fallback');
 const groupKeys=input.keys.filter(item=>item.languages.some(value=>python?value==='python':['c','cpp'].includes(value)));
 assert(groupKeys.length>0);if(!revision)assert.equal(groupKeys.length,python?460:646);
 assert.deepEqual(Object.keys(manifest.entries).sort(),groupKeys.map(item=>item.key).sort());
 for(const item of groupKeys){const entry=manifest.entries[item.key];assert.equal(entry.mode,'recorded');assert.equal(entry.spokenText,item.key);assert.equal(entry.file,'narration/clips/'+item.id+'.mp3');}
 const inventory=inventoryFor(language),cases=quizCases(inventory);
 for(const item of inventory.texts){const entry=manifest.entries[item.text];assert(entry,'Static raw key is not covered');assert.equal(entry.mode,'recorded');assert.equal(entry.spokenText,item.text);}
 const result={language,product:{name:product.name,version:product.version,appId:product.appId},manifestSha256:hash(bytes),asarSha256:hash(fs.readFileSync(archive)),voice:manifest.voice,
  independentProfile:path.join(results,'xiaoxiao-ui-profiles',language+'-'+Date.now()),offline:false,mediaIndividuallyMuted:true,systemSpeechCalls:0,
  staticCoverage:{rawKeys:inventory.texts.length,allRecorded:true,allExactRawText:true},quizFeedbackAudit:{quizPages:47,optionFeedbacks:143,nativeStarts:0,cases:[]},
  representativeNaturalPlayback:[],rapidClicks:null,pageChangeCancellation:null,events:[],nativeEvents:[],httpRequestsBlocked:[],pageErrors:[],passed:false};
 report.languages.push(result);
 const app=await electron.launch({executablePath:path.join(application,product.executable),args:['--user-data-dir='+result.independentProfile],timeout:30000});
 let phase='startup';
 try{
  await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows().forEach(w=>w.webContents.setAudioMuted(true)));
  assert.equal(await app.evaluate(({app})=>app.getVersion()),product.version);
  assert.equal(path.resolve(await app.evaluate(({app})=>app.getPath('userData'))),path.resolve(result.independentProfile));
  const page=await app.firstWindow();page.on('pageerror',e=>result.pageErrors.push(e.message));
  await page.context().route(/^https?:/,route=>{result.httpRequestsBlocked.push(route.request().url().split('?')[0]);return route.abort();});
  await page.exposeFunction('__xiaoxiaoStatus',detail=>result.events.push({...detail,phase,sequence:result.events.length+1}));
  await page.exposeFunction('__xiaoxiaoNative',detail=>result.nativeEvents.push({...detail,phase,sequence:result.nativeEvents.length+1}));
  await page.addInitScript(()=>{
   window.__voiceStatuses=[];window.__voiceNative=[];window.__systemSpeechCalls=0;
   const native=detail=>{const event={...detail,at:performance.now()};window.__voiceNative.push(event);window.__xiaoxiaoNative(event).catch(()=>{});};
   window.addEventListener('narration-status',event=>{const detail={...event.detail,at:performance.now()};window.__voiceStatuses.push(detail);window.__xiaoxiaoStatus(detail).catch(()=>{});});
   const NativeAudio=window.Audio;
   window.Audio=function(url){const audio=new NativeAudio(url);audio.muted=true;native({kind:'created',file:String(url)});
    for(const kind of ['playing','ended','error'])audio.addEventListener(kind,()=>native({kind,file:String(url),muted:audio.muted,rate:audio.playbackRate,error:audio.error?.message}));return audio;};
   window.Audio.prototype=NativeAudio.prototype;
   if(window.speechSynthesis)window.speechSynthesis.speak=()=>{++window.__systemSpeechCalls;throw new Error('Static narration must use new Xiaoxiao recordings, not system or old audio fallback');};
  });
  await page.reload();await page.locator('.app-footer').waitFor();const base=page.url().split('?')[0];
  async function go(number,animation=true){
   if(!python){await page.goto(base+'?page='+number);await page.locator('.app-footer').waitFor();}
   else{
    const current=await page.locator('.app-footer').innerText();
    if(!current.includes('第 '+number+' 页')){
     const collapsed=page.getByTitle('展开导航',{exact:true});if(await collapsed.count())await collapsed.click();
     const destination=inventory.pages.find(p=>p.page===number);assert(destination,'Unknown original Python page');
     let target=page.getByRole('button',{name:destination.section,exact:true});
     if(!(await target.count())){
      const section=inventory.pages.filter(p=>p.page<=number&&p.section.startsWith('阶段')).at(-1);
      if(section)await page.locator('.app-navigation').getByRole('button').filter({hasText:section.section}).first().click();
      target=page.getByRole('button',{name:destination.section,exact:true});
     }
     if(await target.count())await target.first().click();
     else await page.locator('.app-navigation').getByText(destination.section,{exact:true}).click();
     const collapse=page.getByTitle('收起导航',{exact:true});if(await collapse.count())await collapse.click();
    }
   }
   await page.waitForFunction(n=>document.querySelector('.app-footer')?.innerText.includes('第 '+n+' 页'),number);
   if(animation)await page.waitForTimeout(700);
  }
  async function clear(){await page.evaluate(()=>{window.__voiceStatuses=[];window.__voiceNative=[];});}
  async function observed(){return page.evaluate(()=>({status:window.__voiceStatuses,native:window.__voiceNative}));}
  function assertVoice(event){const entry=manifest.entries[event.text];assert(entry,'Unexpected raw text');assert.deepEqual(event.voice,manifest.voice);assert.equal(event.source,'recorded');assert.equal(event.file,entry.file);assert.equal(entry.mode,'recorded');assert.equal(event.spokenText,event.text);return entry;}
  async function started(expected){
   await page.waitForFunction(text=>window.__voiceStatuses.some(e=>['error','missing'].includes(e.state)||(e.state==='playing'&&(!text||e.text===text))),expected||null,{timeout:15000});
   const all=await observed();assert(!all.status.some(e=>['error','missing'].includes(e.state)),'Narration failed: '+JSON.stringify(all.status));
   const event=all.status.find(e=>e.state==='playing'&&(!expected||e.text===expected));assert(event);assertVoice(event);
   await page.waitForFunction(file=>window.__voiceNative.some(e=>e.kind==='playing'&&e.file.endsWith(file)),event.file,{timeout:5000});
   const media=(await observed()).native.find(e=>e.kind==='playing'&&e.file.endsWith(event.file));assert(media.muted);assert.equal(media.rate,1);return event;
  }
  async function natural(name,number,action,expected){phase=name;await clear();await action();const start=await started(expected),entry=manifest.entries[start.text];
   await page.waitForFunction(text=>window.__voiceStatuses.some(e=>e.text===text&&['ended','error','missing'].includes(e.state)),start.text,{timeout:Math.max(15000,(entry.duration||60)*1000+15000)});
   const all=await observed(),end=all.status.find(e=>e.text===start.text&&e.state==='ended');assert(end&&!end.reason);assertVoice(end);assert(!all.status.some(e=>['error','missing'].includes(e.state)));assert(all.native.some(e=>e.kind==='ended'&&e.file.endsWith(start.file)));
   result.representativeNaturalPlayback.push({name,page:number,text:start.text,file:start.file,source:'recorded',voiceId:start.voice.id,nativeStart:true,nativeEnd:true,rate:1,elapsedMs:end.at-start.at});console.log('PASS '+language+' new Xiaoxiao natural '+name);
  }
  // Exercise every option before the correct answer locks each original ReviewCard.
  for(const number of [...new Set(cases.map(c=>c.page))]){
   await go(number);const group=cases.filter(c=>c.page===number),options=page.locator('main .space-y-4 > button');assert.equal(await options.count(),group.length);
   for(const item of group){phase='quiz-'+number+'-option-'+item.option;await clear();await options.nth(item.option).click();const event=await started(item.text);
    result.quizFeedbackAudit.cases.push({page:number,option:item.option,correct:item.correct,text:item.text,file:event.file,source:'recorded',voiceId:event.voice.id,nativeStart:true,completion:'interrupted by next test action; not required'});++result.quizFeedbackAudit.nativeStarts;
   }
  }
  assert.equal(result.quizFeedbackAudit.nativeStarts,143);console.log('PASS '+language+' all 47 quizzes / 143 real new-voice starts');
  if(representatives==='compact'){
   const added=revision?new Set(readJSON(path.join(results,`course-${revision}/narration-plan.json`)).added.map(item=>item.key)):new Set();
   const changedToken=inventory.texts.find(t=>added.has(t.text)&&t.sources.some(s=>s.category==='split-token'&&['GenericWordSlide','GenericSentenceSlide','GenericEssaySlide'].includes(s.component)));
   const tokenSource=changedToken?.sources.find(s=>s.category==='split-token'&&['GenericWordSlide','GenericSentenceSlide','GenericEssaySlide'].includes(s.component)),tokenPage=tokenSource?.page||20;
   const tokenText=changedToken?.text.slice(0,changedToken.text.lastIndexOf('，是')),exact=tokenText===undefined?null:new RegExp('^'+tokenText.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$');
   const changedLine=inventory.texts.find(t=>added.has(t.text)&&t.sources.some(s=>s.category==='sentence-line')),lineSource=changedLine?.sources.find(s=>s.category==='sentence-line'),linePage=lineSource?.page||75,lineIndex=Number(lineSource?.field.match(/^lines\[(\d+)\]/)?.[1]||0);
   const feedbackCase=cases.find(c=>added.has(c.text))||cases[0];
   await go(tokenPage);await natural('changed-teaching-token',tokenPage,()=>exact?page.locator('main span.group > span.font-mono').filter({hasText:exact}).first().click():page.locator('main span.group > span.font-mono').first().click(),changedToken?.text);
   await go(linePage);await natural('changed-sentence-blank-area',linePage,()=>page.locator('main div[title^="点击朗读："]').nth(lineIndex).click({position:{x:3,y:3}}),changedLine?.text);
   await go(feedbackCase.page);await natural('changed-quiz-feedback',feedbackCase.page,()=>page.locator('main .space-y-4 > button').nth(feedbackCase.option).click(),feedbackCase.text);
  }else{
   await go(2);await natural('overview-card',2,()=>page.getByTitle('点击朗读释意',{exact:true}).first().click());
   await go(20);await natural('word-token',20,()=>page.locator('main span.group > span.font-mono').first().click());
   await go(75);await natural('sentence-line-blank-area',75,()=>page.locator('main div[title^="点击朗读："]').first().click({position:{x:3,y:3}}));
   await natural('sentence-speaker',75,()=>page.getByTitle('朗读教学提示',{exact:true}).click());
   await go(114);await natural('essay-token',114,()=>page.locator('main span.group > span.font-mono').first().click());
  for(const [number,family]of[[8,'literacy'],[62,'word'],[99,'sentence'],[140,'essay']]){
   await go(number);const group=cases.filter(c=>c.page===number),wrong=group.find(c=>!c.correct),correct=group.find(c=>c.correct);
   await natural(family+'-quiz-wrong-feedback',number,()=>page.locator('main .space-y-4 > button').nth(wrong.option).click(),wrong.text);
   await natural(family+'-quiz-correct-feedback',number,()=>page.locator('main .space-y-4 > button').nth(correct.option).click(),correct.text);
  }
  }
  // Fast clicks must not allow an old clip or promise to start after the last loading request.
  await go(20);phase='rapid-click-last-wins';await clear();const tokens=page.locator('main span.group > span.font-mono');
  await tokens.nth(0).click();await tokens.nth(1).click();await page.waitForFunction(()=>window.__voiceStatuses.filter(e=>e.state==='loading').length>=2);
  const lastText=(await observed()).status.filter(e=>e.state==='loading').at(-1).text;await started(lastText);await page.waitForTimeout(100);const rapid=await observed(),cut=rapid.status.findLastIndex(e=>e.state==='loading'&&e.text===lastText);
  assert(rapid.status.slice(cut).filter(e=>e.state==='playing').every(e=>e.text===lastText));result.rapidClicks={passed:true,lastText,noStalePlayingAfterLastLoading:true,events:rapid};
  await go(2);phase='page-change-cancellation';await clear();await page.getByTitle('点击朗读释意',{exact:true}).first().click();const active=await started();
  await page.locator('.app-footer button').last().click();await page.waitForFunction(()=>document.querySelector('.app-footer')?.innerText.includes('第 3 页'));
  await page.waitForFunction(text=>window.__voiceStatuses.some(e=>e.text===text&&e.state==='ended'&&e.reason==='stopped'),active.text,{timeout:5000});
  result.pageChangeCancellation={passed:true,fromPage:2,toPage:3,source:'recorded',stopped:(await observed()).status.find(e=>e.state==='ended'&&e.reason==='stopped')};
  await page.locator('.app-footer button').first().click();await page.waitForFunction(()=>document.querySelector('.app-footer')?.innerText.includes('第 2 页'));
  result.systemSpeechCalls=await page.evaluate(()=>window.__systemSpeechCalls);assert.equal(result.systemSpeechCalls,0);assert.equal(result.httpRequestsBlocked.length,0);assert.deepEqual(result.pageErrors,[]);
  assert(!result.events.some(e=>['error','missing'].includes(e.state)));assert(!result.nativeEvents.some(e=>e.kind==='error'));assert.equal(hash(fs.readFileSync(manifestPath)),result.manifestSha256,'Manifest changed during UI test');
  assert.equal(hash(fs.readFileSync(archive)),result.asarSha256,'Stage ASAR changed during UI test');
  result.offline=result.passed=true;
 }catch(error){result.error=error.stack||String(error);throw error;}finally{await app.close();}
}
(async()=>{for(const language of selectedLanguages)try{await testProduct(language);}catch(error){report.errors.push({language,error:error.message});console.error('FAIL '+language+' unified voice '+error.message);}
 report.ok=report.languages.length===selectedLanguages.length&&report.languages.every(l=>l.passed)&&report.errors.length===0;fs.mkdirSync(path.dirname(path.join(results,outputReport)),{recursive:true});fs.writeFileSync(path.join(results,outputReport),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({ok:report.ok,languages:report.languages.map(l=>({language:l.language,version:l.product.version,passed:l.passed,quizFeedbackNativeStarts:l.quizFeedbackAudit.nativeStarts,naturalChecks:l.representativeNaturalPlayback.length})),report:'test-results/'+outputReport}));process.exitCode=report.ok?0:1;
})().catch(error=>{console.error(error);process.exitCode=1;});
