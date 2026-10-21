const { _electron: electron } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const root = path.resolve(__dirname, '..');
const report = {schemaVersion:1, generatedAt:new Date().toISOString(), ok:false,
  scope:'Read-only inspection of the existing Python 1.0.2 portable app. Recorded media is muted; native system speech is called with test-only volume=0. No AI request or code execution.',
  executable:'E:\\knowledge\\ai-repair\\像学习语文一样学习编程-AI版\\像学习语文一样学习编程.exe',
  profile:path.join(os.tmpdir(),'python-voice-audit-'+Date.now()), voices:[], selectedByOriginalPriority:null, interactions:[], events:[], console:[], errors:[]};
let app;
(async()=>{
 try {
  app=await electron.launch({executablePath:report.executable,args:['--user-data-dir='+report.profile],timeout:30000});
  await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows().forEach(w=>w.webContents.setAudioMuted(true)));
  report.audioMuted=await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows().every(w=>w.webContents.isAudioMuted()));
  report.version=await app.evaluate(({app})=>app.getVersion());
  report.actualUserData=await app.evaluate(({app})=>app.getPath('userData'));
  const page=await app.firstWindow();
  await page.context().route(/^https?:/,route=>route.abort());
  page.on('console',m=>{const text=m.text(); if(/音频|TTS|语音|映射表|降级/.test(text)&&!(/sk-|Bearer/i.test(text))) report.console.push(text.slice(0,500));});
  await page.exposeFunction('__reportVoice',e=>report.events.push(e));
  await page.addInitScript(()=>{
   window.__voiceEvents=[]; window.__voiceCase='startup';
   const record=e=>{const d={...e,case:window.__voiceCase,at:performance.now()};window.__voiceEvents.push(d);window.__reportVoice(d).catch(()=>{});};
   const NativeAudio=window.Audio;
   window.Audio=function(url){const a=new NativeAudio(url);record({kind:'audio-created',file:String(url)});for(const type of ['playing','ended','error']) a.addEventListener(type,()=>record({kind:'audio-'+type,file:String(url),error:a.error?.message}));return a;};
   window.Audio.prototype=NativeAudio.prototype;
   const synth=window.speechSynthesis, speak=synth.speak.bind(synth);
   synth.speak=u=>{u.volume=0;const voice=u.voice?{name:u.voice.name,lang:u.voice.lang,voiceURI:u.voice.voiceURI,localService:u.voice.localService}:null;record({kind:'system-request',text:u.text,lang:u.lang,rate:u.rate,volume:u.volume,voice});for(const type of ['start','end','error'])u.addEventListener(type,e=>record({kind:'system-'+type,text:u.text,error:e.error,voice}));return speak(u);};
  });
  await page.reload();
  await page.waitForFunction(()=>document.body.innerText.includes('共 153 页'));
  await page.waitForFunction(()=>speechSynthesis.getVoices().length>0,null,{timeout:10000}).catch(()=>{});
  report.voices=await page.evaluate(()=>speechSynthesis.getVoices().map(v=>({name:v.name,lang:v.lang,voiceURI:v.voiceURI,localService:v.localService,default:v.default})));
  const chinese=report.voices.filter(v=>v.lang.includes('zh'));
  report.selectedByOriginalPriority=['Xiaoxiao','Yaoyao','Huihui','Tingting','Meijia','Google 普通话'].map(name=>chinese.find(v=>v.name.includes(name))).find(Boolean)||chinese[0]||null;
  console.log(JSON.stringify({version:report.version,voices:report.voices,selectedByOriginalPriority:report.selectedByOriginalPriority}));
  let current=1;
  async function go(n){while(current!==n){const wanted=current+(n>current?1:-1);await page.getByRole('button',{name:n>current?/下一页|下页/:/上一页|上页/}).last().click();await page.waitForFunction(n=>document.body.innerText.includes('第 '+n+' 页'),wanted);current=wanted;}await page.waitForTimeout(700);}
  async function sample(name,action){await page.evaluate(n=>{speechSynthesis.cancel();window.__voiceCase=n;window.__voiceEvents=[];},name);await action();await page.waitForFunction(()=>window.__voiceEvents.some(e=>['audio-playing','system-request'].includes(e.kind)),null,{timeout:15000});await page.waitForTimeout(1000);const events=await page.evaluate(()=>window.__voiceEvents);report.interactions.push({name,events,route:events.some(e=>e.kind==='system-request')?'system':events.some(e=>e.kind==='audio-playing')?'recorded':'unknown',nativeSystemStarted:events.some(e=>e.kind==='system-start')});console.log('Python voice route '+name+': '+report.interactions.at(-1).route);}
  await go(2);await sample('overview-card',()=>page.getByTitle('点击朗读释意',{exact:true}).first().click());
  await go(20);const tokens=page.locator('main span.group > span.font-mono');
  for(let i=0;i<Math.min(3,await tokens.count());i++)await sample('word-token-'+i,()=>tokens.nth(i).click());
  await go(8);const literacy=page.locator('main .space-y-4 > button');await sample('literacy-quiz-wrong',()=>literacy.nth(1).click());await sample('literacy-quiz-correct',()=>literacy.nth(0).click());
  await go(62);const words=page.locator('main .space-y-4 > button');await sample('word-quiz-wrong',()=>words.nth(0).click());await sample('word-quiz-correct',()=>words.nth(1).click());
  report.ok=report.audioMuted&&report.voices.length>0&&report.interactions.every(i=>i.route!=='unknown');
  report.systemPlaybackEvidence={routeVerified:report.interactions.filter(i=>i.route==='system').every(i=>i.events.some(e=>e.kind==='system-request')),
   nativeStartObserved:report.events.some(e=>e.kind==='system-start'),nativeEndObserved:report.events.some(e=>e.kind==='system-end'),
   notAudiblePlaybackProof:true,note:'volume=0 can short-circuit SpeechSynthesis without native start; route/voice selection is the evidence here, not actual audible playback.'};
  report.interpretation='Representative click routes only; no assumption about the user’s historical click distribution. System volume=0 is a test injection; native start/end events, if present, are real.';
 }catch(e){report.errors.push(e.stack||String(e));}
 finally{if(app)await app.close();fs.mkdirSync(path.join(root,'test-results'),{recursive:true});fs.writeFileSync(path.join(root,'test-results','python-voice-runtime.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({ok:report.ok,report:'test-results/python-voice-runtime.json',errors:report.errors}));process.exitCode=report.ok?0:1;}
})();
