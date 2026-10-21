import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/speech/player.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replaceAll('import.meta.env.BASE_URL', JSON.stringify('./'));
// Import must succeed without window/document/Audio/speechSynthesis globals.
const {createNarrationPlayer,resolveNarrationURL,selectSystemVoice,speakText,stopSpeech}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const voice={id:'python-original-20261019',name:'Python 原版配音',engine:'Edge-TTS + System SpeechSynthesis',recordedVoice:'zh-CN-XiaoxiaoNeural'};
const fallback={lang:'zh-CN',rate:1,preferredVoices:['Xiaoxiao','Yaoyao','Huihui','Tingting','Meijia','Google 普通话']};
const manifest={schemaVersion:1,voice,fallback,entries:{
 first:{mode:'recorded',file:'narration/clips/first.mp3',spokenText:'first'},
 second:{mode:'recorded',file:'narration/clips/second.mp3',spokenText:'second'},
 system1:{mode:'system',spokenText:'system1'}, system2:{mode:'system',spokenText:'system2'},
}};
const makeVoice=(name,lang='zh-CN',isDefault=false)=>({name,lang,voiceURI:name,localService:true,default:isDefault});
const voices=[makeVoice('Microsoft Huihui',undefined,true),makeVoice('Microsoft Kangkang'),makeVoice('Microsoft Yaoyao')];
const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};};
const flush=async()=>{for(let i=0;i<16;i++)await Promise.resolve();};
class FakeAudio {
 constructor(url,promise=Promise.resolve()){this.url=url;this.promise=promise;this.onplaying=this.onended=this.onerror=null;this.error=null;this.pauses=this.loads=this.plays=0;this.removed=[];}
 play(){++this.plays;return this.promise;}
 pause(){++this.pauses;}
 load(){++this.loads;}
 removeAttribute(name){this.removed.push(name);}
}
class FakeSpeech {
 constructor(initial=voices){this.voices=initial;this.utterances=[];this.listeners=new Set();this.cancels=0;}
 getVoices=()=>this.voices;
 createUtterance=text=>({text,lang:'',rate:1,volume:1,voice:null,onstart:null,onend:null,onerror:null});
 speak=utterance=>{this.utterances.push(utterance);};
 cancel=()=>{++this.cancels;};
 addVoicesChanged=listener=>{this.listeners.add(listener);return ()=>this.listeners.delete(listener);};
 publish(available){this.voices=available;for(const listener of [...this.listeners])listener();}
}
function fixture({loadManifest=async()=>manifest,playPromise,speech=new FakeSpeech(),voicesWaitMs=1000,systemStartTimeoutMs=10000}={}){
 const statuses=[],warnings=[],audios=[];
 const player=createNarrationPlayer({loadManifest,resolveFile:file=>resolveNarrationURL(file,'./','file:///C:/Study%20App/resources/app.asar/dist/index.html?page=20'),
  createAudio:url=>{const a=new FakeAudio(url,playPromise?.(audios.length));audios.push(a);return a;},getSystemSpeech:()=>speech,
  onStatus:s=>statuses.push(s),warn:(message,detail)=>warnings.push({message,detail}),voicesWaitMs,systemStartTimeoutMs});
 return {player,statuses,warnings,audios,speech};
}
const playing=f=>f.statuses.filter(s=>s.state==='playing');

test('file and HTTP asset resolution retain BASE_URL and handle spaces/query strings',()=>{
 const doc='file:///C:/Study%20App/resources/app.asar/dist/index.html?page=20';
 assert.equal(resolveNarrationURL('narration/manifest.json','./',doc),'file:///C:/Study%20App/resources/app.asar/dist/narration/manifest.json');
 assert.equal(resolveNarrationURL('narration/clips/a.mp3','/learning/','http://localhost:5173/index.html'),'http://localhost:5173/learning/narration/clips/a.mp3');
});

test('Python priority selects Yaoyao ahead of default Huihui, then first Chinese voice, then browser default',()=>{
 assert.equal(selectSystemVoice(voices,fallback).name,'Microsoft Yaoyao');
 assert.equal(selectSystemVoice([...voices,makeVoice('Microsoft Xiaoxiao')],fallback).name,'Microsoft Xiaoxiao');
 assert.equal(selectSystemVoice([makeVoice('English','en-US'),makeVoice('Other Chinese')],fallback).name,'Other Chinese');
 assert.equal(selectSystemVoice([makeVoice('English','en-US')],fallback),null);
});

test('cold concurrent clicks share manifest loading and only the latest route is played',async()=>{
 const pending=deferred();let loads=0;
 const f=fixture({loadManifest:()=>{++loads;return pending.promise;}});
 const first=f.player.speakText('first'),second=f.player.speakText('system2');await flush();assert.equal(loads,1);
 pending.resolve(manifest);await Promise.all([first,second]);
 assert.equal(f.audios.length,0);assert.equal(f.speech.utterances.length,1);assert.equal(f.speech.utterances[0].text,'system2');
 assert.equal(playing(f).length,0,'queued synthesis must not claim playback');
 f.speech.utterances[0].onstart();assert.deepEqual(playing(f).map(s=>[s.text,s.source]),[['system2','system']]);f.player.stopSpeech();
});

test('system speech reports playing only after native onstart, natural completion only after onend',async()=>{
 const f=fixture();await f.player.speakText('system1');const u=f.speech.utterances[0];
 assert.equal(u.text,'system1');assert.equal(u.lang,'zh-CN');assert.equal(u.rate,1);assert.equal(u.volume,1);
 assert.equal(u.voice,voices[2]);assert.equal(playing(f).length,0);
 u.onstart();u.onstart();assert.equal(playing(f).length,1);assert.equal(playing(f)[0].systemVoice.name,'Microsoft Yaoyao');
 const end=u.onend;end();end();assert.equal(f.statuses.filter(s=>s.state==='ended').length,1);assert(!f.statuses.at(-1).reason);
});

test('first asynchronous voices wait for voiceschanged and cancel the listener after selection',async()=>{
 const speech=new FakeSpeech([]),f=fixture({speech});const task=f.player.speakText('system1');await flush();
 assert.equal(speech.utterances.length,0);assert.equal(speech.listeners.size,1);
 speech.publish(voices);await task;assert.equal(speech.listeners.size,0);assert.equal(speech.utterances[0].voice.name,'Microsoft Yaoyao');f.player.stopSpeech();
});

test('stopping or replacing while waiting for voices invalidates the old request without delayed speech',async()=>{
 const speech=new FakeSpeech([]),f=fixture({speech});const old=f.player.speakText('system1');await flush();
 const replacement=f.player.speakText('system2');await flush();assert.equal(speech.listeners.size,1);
 speech.publish(voices);await Promise.all([old,replacement]);assert.deepEqual(speech.utterances.map(u=>u.text),['system2']);
 f.player.stopSpeech();assert.equal(f.statuses.at(-1).reason,'stopped');assert.equal(speech.cancels,1);
 const speech2=new FakeSpeech([]),stopped=fixture({speech:speech2});const wait=stopped.player.speakText('system1');await flush();stopped.player.stopSpeech();await wait;
 speech2.publish(voices);assert.equal(speech2.utterances.length,0);assert.equal(speech2.listeners.size,0);
});

test('bounded voice wait uses browser language default if the platform never lists a Chinese voice',async()=>{
 const f=fixture({speech:new FakeSpeech([]),voicesWaitMs:5});await f.player.speakText('system1');
 assert.equal(f.speech.utterances.length,1);assert.equal(f.speech.utterances[0].voice,null);
 f.speech.utterances[0].onstart();assert.equal(playing(f)[0].systemVoice,null);f.player.stopSpeech();
});

test('stale SAPI start/end/error cannot affect the new recording or trigger another speech',async()=>{
 const f=fixture();await f.player.speakText('system1');const old=f.speech.utterances[0];
 const callbacks=[old.onstart,old.onend,old.onerror];await f.player.speakText('second');
 callbacks[0]();callbacks[1]();callbacks[2]({error:'interrupted'});
 assert.equal(f.speech.cancels,1);assert.equal(old.onstart,null);assert.equal(f.speech.utterances.length,1);
 assert.deepEqual(playing(f).map(s=>[s.text,s.source]),[['second','recorded']]);assert.equal(f.warnings.length,0);f.player.stopSpeech();
});

test('stale recording events and rejected/fulfilled play promises cannot restart system fallback',async()=>{
 for(const reject of [true,false]){
  const pending=deferred(),f=fixture({playPromise:()=>pending.promise});const oldTask=f.player.speakText('first');await flush();
  const old=f.audios[0],callbacks=[old.onplaying,old.onended,old.onerror];await f.player.speakText('system2');
  callbacks[0]();callbacks[1]();callbacks[2]();if(reject)pending.reject(new Error('old abort'));else pending.resolve();await oldTask;
  assert.equal(f.speech.utterances.length,1);assert.equal(f.speech.utterances[0].text,'system2');assert.equal(f.warnings.length,0);
  assert.equal(old.pauses,1);assert.equal(old.loads,1);assert.deepEqual(old.removed,['src']);f.player.stopSpeech();
 }
});

test('recording decode failure remains explicit and falls back once to raw-text system speech',async()=>{
 const pending=deferred(),f=fixture({playPromise:()=>pending.promise});const task=f.player.speakText('first');await flush();
 const a=f.audios[0],error=a.onerror;a.error={code:3,message:'broken MP3'};error();error();pending.reject(new Error('decode failed'));await task;await flush();
 assert.equal(f.statuses.filter(s=>s.state==='error').length,1);assert.equal(f.statuses.find(s=>s.state==='error').source,'recorded');
 assert.equal(f.speech.utterances.length,1);assert.equal(f.speech.utterances[0].text,'first');assert.equal(playing(f).length,0);
 f.speech.utterances[0].onstart();assert.equal(playing(f)[0].source,'system');assert(!playing(f)[0].file);f.player.stopSpeech();
});

test('a voice-only manifest never changes speaker after a recording failure',async()=>{
 const pending=deferred(),strict={...manifest,fallback:{...fallback,preferredVoices:['Xiaoxiao'],enabled:false}};
 const f=fixture({loadManifest:async()=>strict,playPromise:()=>pending.promise});
 const task=f.player.speakText('first');await flush();
 const media=f.audios[0],error=media.onerror;media.error={code:3,message:'broken MP3'};
 error();error();pending.reject(new Error('decode failed'));await task;await flush();
 assert.equal(f.statuses.filter(s=>s.state==='error').length,1);
 assert.equal(f.statuses.at(-1).reason,'playback');
 assert.equal(f.statuses.at(-1).source,'recorded');
 assert.equal(f.speech.utterances.length,0);assert.equal(media.pauses,1);
 assert.equal(playing(f).length,0);
});

test('disabled fallback rejects system-only entries without invoking system speech',async()=>{
 const f=fixture({loadManifest:async()=>({...manifest,fallback:{...fallback,enabled:false}})});
 await f.player.speakText('system1');
 assert.equal(f.statuses.at(-1).reason,'system-unavailable');
 assert.equal(f.speech.utterances.length,0);assert.equal(f.audios.length,0);
 assert.equal(playing(f).length,0);
});

test('system unavailability/error/end-without-start never falsely reports playback',async()=>{
 const unavailable=fixture({speech:null});await unavailable.player.speakText('system1');assert.equal(unavailable.statuses.at(-1).reason,'system-unavailable');
 for(const event of ['error','end']){
  const f=fixture();await f.player.speakText('system1');const u=f.speech.utterances[0];
  if(event==='error')u.onerror({error:'synthesis-failed'});else u.onend();
  assert.equal(f.statuses.at(-1).state,'error');assert.equal(f.statuses.at(-1).reason,'system-speech');assert.equal(playing(f).length,0);
 }
});

test('native synthesis which never starts times out with an explicit error and is cancelled',async()=>{
 const f=fixture({systemStartTimeoutMs:5});await f.player.speakText('system1');await new Promise(resolve=>setTimeout(resolve,15));
 assert.equal(f.statuses.at(-1).reason,'system-speech');assert.equal(playing(f).length,0);assert.equal(f.speech.cancels,1);
});

test('missing or invalid entries never silently synthesize arbitrary text',async()=>{
 const missing=fixture();await missing.player.speakText('unknown');assert.equal(missing.statuses.at(-1).state,'missing');assert.equal(missing.speech.utterances.length,0);
 for(const entry of [{mode:'other',spokenText:'first'},{mode:'system',spokenText:'changed text'},{mode:'recorded',spokenText:'first',file:'https://bad.test/a.mp3'},{mode:'recorded',spokenText:'first',file:'narration/clips/../a.mp3'}]){
  const f=fixture({loadManifest:async()=>({...manifest,entries:{first:entry}})});await f.player.speakText('first');
  assert.equal(f.statuses.at(-1).reason,'invalid-entry');assert.equal(f.audios.length,0);assert.equal(f.speech.utterances.length,0);
 }
});

test('failed manifest loads can retry, stopped loads remain stale, and schema requires fallback config',async()=>{
 let count=0;const f=fixture({loadManifest:async()=>{if(++count===1)throw new Error('missing');return manifest;}});
 await f.player.speakText('first');assert.equal(f.statuses.at(-1).reason,'manifest');await f.player.speakText('second');assert.equal(count,2);f.player.stopSpeech();
 const pending=deferred(),stopped=fixture({loadManifest:()=>pending.promise});const old=stopped.player.speakText('system1');stopped.player.stopSpeech();pending.resolve(manifest);await old;
 assert.equal(stopped.audios.length,0);assert.equal(stopped.speech.utterances.length,0);
 let schemas=0;const invalid=fixture({loadManifest:async()=>++schemas===1?({...manifest,fallback:null}):manifest});
 await invalid.player.speakText('first');assert.equal(invalid.statuses.at(-1).reason,'manifest');
 await invalid.player.speakText('second');assert.equal(schemas,2);assert.equal(invalid.audios.length,1);invalid.player.stopSpeech();
});

test('recorded media event and play promise do not double report and stop carries source',async()=>{
 const pending=deferred(),f=fixture({playPromise:()=>pending.promise});const task=f.player.speakText('first');await flush();
 f.audios[0].onplaying();pending.resolve();await task;assert.equal(playing(f).length,1);f.player.stopSpeech();
 assert.equal(f.statuses.at(-1).reason,'stopped');assert.equal(f.statuses.at(-1).source,'recorded');
});

test('default bridge loads packaged manifest, dispatches source/voice and uses native speech events',async()=>{
 const names=['window','document','fetch','Audio','SpeechSynthesisUtterance'];const previous=Object.fromEntries(names.map(n=>[n,Object.getOwnPropertyDescriptor(globalThis,n)]));
 const statuses=[],fetches=[],audios=[],speech=new FakeSpeech();const originalWarn=console.warn;
 try{
  const window=new EventTarget();window.speechSynthesis={getVoices:speech.getVoices,speak:speech.speak,cancel:speech.cancel,addEventListener:()=>{},removeEventListener:()=>{}};
  window.addEventListener('narration-status',e=>statuses.push(e.detail));
  Object.assign(globalThis,{window,document:{baseURI:'file:///D:/Study/resources/app.asar/dist/index.html?page=75'},fetch:async url=>{fetches.push(url);return {ok:true,json:async()=>manifest};},
   Audio:class extends FakeAudio{constructor(url){super(url);audios.push(this);}},SpeechSynthesisUtterance:class{constructor(text){Object.assign(this,speech.createUtterance(text));}}});
  console.warn=()=>{};await speakText('first');stopSpeech();await speakText('system1');assert.equal(statuses.filter(s=>s.state==='playing').length,1);
  speech.utterances[0].onstart();speech.utterances[0].onend();assert.equal(statuses.at(-1).source,'system');assert.equal(statuses.at(-1).systemVoice.name,'Microsoft Yaoyao');
  assert.equal(fetches[0],'file:///D:/Study/resources/app.asar/dist/narration/manifest.json');assert.equal(audios[0].url,'file:///D:/Study/resources/app.asar/dist/narration/clips/first.mp3');
 }finally{stopSpeech();console.warn=originalWarn;for(const n of names){if(previous[n])Object.defineProperty(globalThis,n,previous[n]);else delete globalThis[n];}}
});
