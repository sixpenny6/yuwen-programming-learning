/** Revision helpers: exact text, pinned voice, reusable content IDs and frozen Python. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export const root=path.resolve(import.meta.dirname,'..');
export const voice={id:'microsoft-xiaoxiao-neural-normal',name:'晓晓',engine:'Microsoft Edge Online TTS',speaker:'zh-CN-XiaoxiaoNeural',synthesisRate:'+0%',playbackRate:1,pitch:'+0Hz',volume:'+0%'};
export const fallback={lang:'zh-CN',rate:1,preferredVoices:['Xiaoxiao'],enabled:false};
export const pythonManifestSha256='992e522bf121f4ecc0c5aa75a1b582873959bc92d24a6fd071df0495560be196';
export const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
export const read=file=>JSON.parse(fs.readFileSync(path.resolve(root,file),'utf8'));
export const relative=file=>path.relative(root,file).replaceAll('\\','/');
export const fileSha=file=>sha(fs.readFileSync(path.resolve(root,file)));
export const idFor=text=>'xiaoxiao-'+sha(Buffer.from(text,'utf8')).slice(0,24);
export function write(file,value){const full=path.resolve(root,file);fs.mkdirSync(path.dirname(full),{recursive:true});const tmp=full+'.pending';fs.writeFileSync(tmp,JSON.stringify(value,null,2)+'\n');fs.renameSync(tmp,full);}
export function options(args=process.argv.slice(2)){
 const result={revision:'1.3.0',cache:path.join(root,'vendor/xiaoxiao-generated')};
 for(let i=0;i<args.length;i++){assert(['--revision','--cache'].includes(args[i])&&args[i+1],'Expected --revision or --cache value');result[args[i].slice(2)]=args[++i];}
 assert(/^\d+\.\d+\.\d+$/.test(result.revision));result.directory=`test-results/course-${result.revision}`;result.cache=path.resolve(root,result.cache);return result;
}
export function pythonState(){
 const directory=path.join(root,'python-voice-update/narration'),manifestFile=path.join(directory,'manifest.json'),manifest=read(manifestFile);
 assert.equal(fileSha(manifestFile),pythonManifestSha256,'Python 1.0.5 narration must remain byte-identical');
 assert.deepEqual(manifest.voice,voice);assert.deepEqual(manifest.fallback,fallback);assert.equal(Object.keys(manifest.entries).length,460);
 const files=new Map();for(const entry of Object.values(manifest.entries)){
  assert.equal(entry.mode,'recorded');assert(/^narration\/clips\/xiaoxiao-[a-f0-9]{24}\.mp3$/.test(entry.file));
  const name=entry.file.slice('narration/'.length);assert.equal(fileSha(path.join(directory,name)),entry.sha256);files.set(name,entry.sha256);
 }
 assert.deepEqual(fs.readdirSync(path.join(directory,'clips')).sort(),[...files.keys()].map(name=>name.slice('clips/'.length)).sort());
 return {version:'1.0.5',manifest:'python-voice-update/narration/manifest.json',manifestSha256:pythonManifestSha256,clips:files.size,filesAggregateSha256:sha([...files].sort(([a],[b])=>a<b?-1:a>b?1:0).map(([name,digest])=>name+'\0'+digest).join('\n'))};
}
export function records(directory){const found=new Map();for(const name of fs.readdirSync(directory).sort())if(/^manifest-shard.*\.jsonl$/.test(name))for(const line of fs.readFileSync(path.join(directory,name),'utf8').replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean)){const row=JSON.parse(line);if(row.status==='ok')found.set(row.id,row);}return found;}
export function validateRecord(row,entry,cache){
 assert(row,'Missing recording provenance: '+entry.id);
 for(const [key,value]of Object.entries({...entry,speaker:voice.speaker,engine:voice.engine,synthesisRate:'+0%',playbackRate:1,pitch:'+0Hz',volume:'+0%',spokenTextSha256:sha(Buffer.from(entry.key)),mp3:entry.id+'.mp3',sampleRate:24000,channels:1,fullDecodePassed:true,nonSilent:true}))assert.deepEqual(row[key],value,entry.id+': '+key);
 const file=path.join(cache,entry.id+'.mp3'),bytes=fs.readFileSync(file);assert.equal(bytes.length,row.bytes);assert.equal(sha(bytes),row.sha256);assert(Number.isFinite(row.duration)&&row.duration>0);return {file,bytes,row};
}
export function validateInput(config){
 const name=config.directory+'/narration-input.json',input=read(name);assert.equal(input.schemaVersion,2);assert.equal(input.revision,config.revision);assert.deepEqual(input.voice,voice);
 assert.equal(fileSha(input.inventory),input.inventorySha256);assert.equal(fileSha(input.sourceInput),input.sourceInputSha256);assert.deepEqual(pythonState(),input.unchangedPython);
 const inventory=read(input.inventory);assert.deepEqual(Object.keys(inventory.languages).sort(),['c','cpp']);
 for(const source of inventory.sourceFiles||[])assert.equal(fileSha(source.file),source.sha256,'Course source changed after inventory: '+source.file);
 assert((inventory.sourceFiles||[]).length>0,'Revision inventory needs source-file hashes');
 const merged=new Map();for(const language of ['c','cpp']){
  const data=inventory.languages[language];assert.equal(data.pageCount,153);
  const slots=[];for(const item of data.texts){const record=merged.get(item.text)||{key:item.text,id:idFor(item.text),languages:[]};record.languages.push(language);merged.set(item.text,record);for(const source of item.sources)if(['quiz-correct-feedback','quiz-wrong-feedback'].includes(source.category))slots.push(source);}
  assert.equal(slots.length,143);assert.equal(new Set(slots.map(s=>s.page+':'+s.optionIndex)).size,143);assert.equal(new Set(slots.map(s=>s.page)).size,47);
 }
 const keys=[...merged.values()];assert.deepEqual(input.keys,keys);assert.deepEqual(input.entries,keys.map(({key,id})=>({id,key,spokenText:key})));assert.equal(new Set(keys.map(k=>k.id)).size,keys.length);
 return {input,inventory,inputFile:name,inputSha256:fileSha(name)};
}
