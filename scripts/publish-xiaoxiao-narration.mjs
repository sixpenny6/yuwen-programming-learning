/** Publish newly synthesized Xiaoxiao recordings for all three products.
 * No old recording, different speaker or system-only entry is accepted.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const generated=path.resolve(process.argv[2]||path.join(root,'vendor/xiaoxiao-generated'));
const inputBytes=await fs.readFile(path.join(root,'test-results/xiaoxiao-narration-input.json'));
const input=JSON.parse(inputBytes);
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const expectedVoice={id:'microsoft-xiaoxiao-neural-normal',name:'晓晓',engine:'Microsoft Edge Online TTS',speaker:'zh-CN-XiaoxiaoNeural',synthesisRate:'+0%',playbackRate:1,pitch:'+0Hz',volume:'+0%'};
if(JSON.stringify(input.voice)!==JSON.stringify(expectedVoice)||input.entries.length!==907||input.keys.length!==907)throw new Error('Expected exactly 907 texts using actual zh-CN-XiaoxiaoNeural at normal speed');
const records=new Map();
for(const name of await fs.readdir(generated)){
  if(!name.endsWith('.jsonl'))continue;
  for(const line of (await fs.readFile(path.join(generated,name),'utf8')).replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean)){
    const record=JSON.parse(line);if(record.status==='ok')records.set(record.id,record);
  }
}
const verified=new Map();
for(const entry of input.entries){
  const record=records.get(entry.id);
  if(!/^xiaoxiao-[a-f0-9]{24}$/.test(entry.id)||entry.spokenText!==entry.key||entry.id!=='xiaoxiao-'+sha(Buffer.from(entry.key)).slice(0,24))throw new Error('Unsafe or mismatched exact-text recording task');
  if(!record||record.speaker!=='zh-CN-XiaoxiaoNeural'||record.engine!=='Microsoft Edge Online TTS'||record.synthesisRate!=='+0%'||record.playbackRate!==1||record.spokenText!==entry.key||record.key!==entry.key||record.spokenTextSha256!==sha(Buffer.from(entry.key)))throw new Error('Missing/mismatched Xiaoxiao generation provenance: '+entry.id);
  const source=path.join(generated,entry.id+'.mp3'),bytes=await fs.readFile(source);
  if(record.mp3!==entry.id+'.mp3'||!bytes.length||record.sha256!==sha(bytes)||record.sampleRate!==24000||record.channels!==1||!Number.isFinite(record.duration)||record.duration<=0)throw new Error('Invalid generated Xiaoxiao recording: '+entry.id);
  verified.set(entry.id,{entry,record,source,bytes});
}
const expectedLanguages=new Set(['c','cpp','python']);
for(const key of input.keys){
  if(!verified.has(key.id)||verified.get(key.id).entry.key!==key.key||!Array.isArray(key.languages)||!key.languages.length||key.languages.some(language=>!expectedLanguages.has(language)))throw new Error('Invalid product/text mapping');
}
const voice=input.voice,fallback={lang:'zh-CN',rate:1,preferredVoices:['Xiaoxiao'],enabled:false};
const generatedAt=new Date().toISOString();
const products=[
  {id:'c-cpp',languages:['c','cpp'],relative:'public/narration'},
  {id:'python',languages:['python'],relative:'python-voice-update/narration'},
];
const results=[];
for(const product of products){
  const keys=input.keys.filter(key=>key.languages.some(language=>product.languages.includes(language)));
  const pending=path.resolve(root,'build','xiaoxiao-publish-'+product.id);
  const buildRoot=path.resolve(root,'build');
  if(!pending.startsWith(buildRoot+path.sep))throw new Error('Unsafe staging path');
  await fs.rm(pending,{recursive:true,force:true});
  await fs.mkdir(path.join(pending,'clips'),{recursive:true});
  const entries={},clips=[];
  for(const key of keys){
    const {record,bytes}=verified.get(key.id),file='narration/clips/'+key.id+'.mp3';
    if(Object.hasOwn(entries,key.key))throw new Error('Duplicate raw text key');
    entries[key.key]={mode:'recorded',file,spokenText:key.key,sha256:record.sha256,duration:record.duration};
    await fs.writeFile(path.join(pending,'clips',key.id+'.mp3'),bytes);
    clips.push({id:key.id,file,sha256:record.sha256,duration:record.duration,bytes:bytes.length});
  }
  if(!keys.length||(product.id==='c-cpp'&&keys.length!==646))throw new Error('Unexpected product narration key count');
  const manifest={schemaVersion:1,voice,fallback,generatedAt,entries};
  const manifestBytes=Buffer.from(JSON.stringify(manifest,null,2));
  await fs.writeFile(path.join(pending,'manifest.json'),manifestBytes);
  await fs.writeFile(path.join(pending,'NOTICE.txt'),
    '所有现有朗读均使用新制作的微软晓晓（zh-CN-XiaoxiaoNeural）录音。\n'+
    '合成来源：Microsoft Edge Online TTS；正常语速 +0%；音调 +0Hz；音量 +0%；播放 1 倍速。\n'+
    '逐条朗读课程原始文字；讲解、代码词语与全部测验反馈使用相同声音。\n'+
    '安装包包含全部预生成 MP3，播放不依赖联网或目标电脑的系统声音。\n'+
    '已禁用其他系统声音备用路径，录音出错时报告失败，不切换到瑶瑶或其他声音。\n'+
    '声音服务列表、合成请求参数、每段录音及校验记录见随源码提供的验证报告。\n');
  const destination=path.resolve(root,product.relative);
  if(!destination.startsWith(root+path.sep))throw new Error('Unsafe product output');
  await fs.mkdir(path.dirname(destination),{recursive:true});
  try{
    await fs.access(destination);
    const backup=path.resolve(buildRoot,'xiaoxiao-previous-'+product.id+'-'+Date.now());
    if(!backup.startsWith(buildRoot+path.sep))throw new Error('Unsafe output backup');
    await fs.rename(destination,backup);
  }catch(error){if(error.code!=='ENOENT')throw error;}
  await fs.rename(pending,destination);
  results.push({product:product.id,languages:product.languages,directory:product.relative,rawKeys:keys.length,recordedKeys:keys.length,systemKeys:0,manifestSha256:sha(manifestBytes),clips});
}
const report={schemaVersion:1,generatedAt,ok:true,inputSha256:sha(inputBytes),voice,uniqueGeneratedClips:verified.size,products:results,scope:'Exact-text publication and provenance only. Complete decoding and application playback are checked separately.'};
await fs.writeFile(path.join(root,'test-results/xiaoxiao-publication.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({uniqueGeneratedClips:verified.size,products:results.map(({clips,...product})=>product)}));
