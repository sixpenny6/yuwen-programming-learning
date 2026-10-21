import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile),root=path.resolve(import.meta.dirname,'..');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const read=async name=>JSON.parse(await fs.readFile(path.join(root,name),'utf8'));
const report={schemaVersion:1,generatedAt:new Date().toISOString(),ok:false,voice:null,products:[],quizCoverage:{},files:[],errors:[],
  scope:'All three static narration inventories and all quiz feedback positions must use new Xiaoxiao recordings. Every product copy is hashed; all unique MP3s are completely decoded. Audible quality is assessed separately.'};
async function filesIn(directory){const results=[];for(const entry of await fs.readdir(directory,{withFileTypes:true})){const filename=path.join(directory,entry.name);if(entry.isDirectory())results.push(...await filesIn(filename));else results.push(filename);}return results;}
try{
  const inputBytes=await fs.readFile(path.join(root,'test-results/xiaoxiao-narration-input.json'));
  const input=JSON.parse(inputBytes),publication=await read('test-results/xiaoxiao-publication.json');
  const inventories={...(await read('test-results/narration-inventory.json')).languages,...(await read('test-results/python-narration-inventory.json')).languages};
  assert(publication.ok);assert.equal(publication.inputSha256,sha(inputBytes));
  assert.equal(input.entries.length,907);assert.equal(input.keys.length,907);
  const sourceBytes=await fs.readFile(path.join(root,'test-results/yaoyao-narration-input.json'));
  assert.equal(input.sourceInput,'test-results/yaoyao-narration-input.json');
  assert.equal(input.sourceInputSha256,sha(sourceBytes));
  const originalInput=JSON.parse(sourceBytes);
  assert.deepEqual(input.keys.map(({key,languages})=>({key,languages})),originalInput.keys.map(({key,languages})=>({key,languages})));
  assert.deepEqual(input.voice,{id:'microsoft-xiaoxiao-neural-normal',name:'晓晓',engine:'Microsoft Edge Online TTS',speaker:'zh-CN-XiaoxiaoNeural',synthesisRate:'+0%',playbackRate:1,pitch:'+0Hz',volume:'+0%'});
  assert.equal(input.voice.speaker,'zh-CN-XiaoxiaoNeural');assert.equal(input.voice.synthesisRate,'+0%');assert.equal(input.voice.playbackRate,1);
  report.voice=input.voice;report.inputSha256=sha(inputBytes);
  const originals=new Map(input.entries.map(entry=>[entry.id,entry]));
  const uniqueFiles=new Map();
  for(const product of publication.products){
    const directory=path.resolve(root,product.directory);
    assert(directory.startsWith(root+path.sep));
    const manifestBytes=await fs.readFile(path.join(directory,'manifest.json')),manifest=JSON.parse(manifestBytes);
    assert.equal(sha(manifestBytes),product.manifestSha256);assert.deepEqual(manifest.voice,input.voice);
    assert.deepEqual(manifest.fallback,{lang:'zh-CN',rate:1,preferredVoices:['Xiaoxiao'],enabled:false});
    const expected=input.keys.filter(key=>key.languages.some(language=>product.languages.includes(language)));
    assert.deepEqual(Object.keys(manifest.entries).sort(),expected.map(key=>key.key).sort());
    assert.equal(expected.length,product.product==='python'?460:646);
    assert.equal(product.systemKeys,0);assert.equal(product.recordedKeys,expected.length);
    const expectedPaths=new Set();
    for(const key of expected){
      const entry=manifest.entries[key.key],file='narration/clips/'+key.id+'.mp3';
      assert.equal(entry.mode,'recorded');assert.equal(entry.spokenText,key.key);assert.equal(entry.file,file);
      assert(/^xiaoxiao-[a-f0-9]{24}$/.test(key.id));assert.equal(originals.get(key.id)?.key,key.key);
      const filename=path.join(directory,'clips',key.id+'.mp3'),bytes=await fs.readFile(filename);
      assert.equal(sha(bytes),entry.sha256);assert(bytes.length>0);
      expectedPaths.add(filename);
      const previous=uniqueFiles.get(key.id);
      if(previous){assert.equal(previous.sha256,entry.sha256);previous.copies.push(path.relative(root,filename).replaceAll('\\','/'));}
      else uniqueFiles.set(key.id,{id:key.id,filename,sha256:entry.sha256,duration:entry.duration,bytes:bytes.length,copies:[path.relative(root,filename).replaceAll('\\','/')],fullyDecoded:false});
    }
    for(const filename of await filesIn(path.join(directory,'clips')))assert(expectedPaths.has(filename),'Unreferenced or old voice file shipped: '+filename);
    for(const language of product.languages){
      const inventory=inventories[language];assert.equal(inventory.pageCount,153);
      const languageKeys=new Set(inventory.texts.map(item=>item.text));
      const mergedKeys=new Set(input.keys.filter(key=>key.languages.includes(language)).map(key=>key.key));
      assert.deepEqual(mergedKeys,languageKeys);
      const feedback=inventory.texts.flatMap(item=>item.sources.filter(source=>['quiz-correct-feedback','quiz-wrong-feedback'].includes(source.category)).map(source=>({text:item.text,source})));
      assert.equal(feedback.length,143);assert.equal(new Set(feedback.map(item=>item.source.page)).size,47);
      for(const item of feedback){assert.equal(manifest.entries[item.text]?.mode,'recorded');assert(/^narration\/clips\/xiaoxiao-/.test(manifest.entries[item.text].file));}
      report.quizCoverage[language]={quizPages:47,feedbackOccurrences:143,newXiaoxiaoRecordedOccurrences:feedback.length,systemOrOldVoiceOccurrences:0};
    }
    report.products.push({product:product.product,languages:product.languages,manifestSha256:sha(manifestBytes),rawKeys:expected.length,recordedKeys:expected.length,systemKeys:0,allCopiesMatched:true});
  }
  assert.equal(uniqueFiles.size,907);
  const queue=[...uniqueFiles.values()];let next=0,completed=0;
  await Promise.all(Array.from({length:8},async()=>{
    while(next<queue.length){
      const item=queue[next++];
      try{
        const probe=await run(process.env.FFPROBE_PATH||'ffprobe.exe',['-v','error','-show_entries','format=duration:stream=codec_name,codec_type,sample_rate,channels','-of','json',item.filename],{windowsHide:true,timeout:60000,maxBuffer:1024*1024});
        assert.equal(probe.stderr.trim(),'');const metadata=JSON.parse(probe.stdout);
        const streams=metadata.streams.filter(stream=>stream.codec_type==='audio');assert.equal(streams.length,1);
        assert.equal(streams[0].codec_name,'mp3');assert.equal(Number(streams[0].sample_rate),24000);assert.equal(streams[0].channels,1);
        assert(Math.abs(Number(metadata.format.duration)-item.duration)<0.12);
        const decode=await run(process.env.FFMPEG_PATH||'ffmpeg.exe',['-nostdin','-hide_banner','-v','error','-xerror','-i',item.filename,'-map','0:a:0','-f','null','-'],{windowsHide:true,timeout:60000,maxBuffer:1024*1024});
        assert.equal(decode.stderr.trim(),'');item.fullyDecoded=true;
      }catch(error){report.errors.push({id:item.id,error:error.message});}
      const {filename,...result}=item;report.files.push(result);
      if(++completed%100===0||completed===queue.length)console.log(`Xiaoxiao full decode ${completed}/${queue.length}`);
    }
  }));
  report.files.sort((a,b)=>a.id.localeCompare(b.id));
  report.summary={uniqueClips:queue.length,fullyDecoded:report.files.filter(item=>item.fullyDecoded).length,productAudioCopies:report.files.reduce((n,item)=>n+item.copies.length,0),allQuizFeedbackOccurrences:429,newVoiceQuizFeedbackOccurrences:429,oldVoiceOrSystemEntries:0};
  assert.equal(report.errors.length,0);assert.equal(report.summary.fullyDecoded,907);
  for(const product of publication.products)assert.equal(sha(await fs.readFile(path.join(root,product.directory,'manifest.json'))),product.manifestSha256,'Manifest changed during verification');
  report.ok=true;
}catch(error){report.errors.push({error:error.stack||String(error)});}
await fs.writeFile(path.join(root,'test-results/xiaoxiao-verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({ok:report.ok,...report.summary,products:report.products,errors:report.errors.length}));
process.exitCode=report.ok?0:1;
