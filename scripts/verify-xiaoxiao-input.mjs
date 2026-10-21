/** Read-only verification of the frozen Xiaoxiao input and every reachable raw string. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const read=file=>{const bytes=fs.readFileSync(path.join(root,file));return {file,sha256:sha(bytes),value:JSON.parse(bytes.toString('utf8'))};};
const current=read('test-results/xiaoxiao-narration-input.json'),input=current.value;
const voice={id:'microsoft-xiaoxiao-neural-normal',name:'晓晓',engine:'Microsoft Edge Online TTS',
  speaker:'zh-CN-XiaoxiaoNeural',synthesisRate:'+0%',playbackRate:1,pitch:'+0Hz',volume:'+0%'};
assert.equal(input.schemaVersion,1);assert.deepEqual(input.voice,voice);
assert.equal(input.sourceInput,'test-results/yaoyao-narration-input.json');
const previous=read(input.sourceInput);
assert.equal(input.sourceInputSha256,previous.sha256);
const sources=[read('test-results/narration-inventory.json'),read('test-results/python-narration-inventory.json')];
const languageOrder=['c','cpp','python'],merged=new Map(),languages={};
for(const source of sources)for(const [language,inventory]of Object.entries(source.value.languages)){
  assert(languageOrder.includes(language));assert.equal(inventory.pageCount,153);
  const feedback=[];
  for(const item of inventory.texts){
    assert.equal(typeof item.text,'string');assert(item.text.length>0);
    assert.equal(Buffer.from(item.text,'utf8').toString('utf8'),item.text);
    const key=merged.get(item.text)||{key:item.text,id:'xiaoxiao-'+sha(Buffer.from(item.text,'utf8')).slice(0,24),languages:new Set()};
    key.languages.add(language);merged.set(item.text,key);
    for(const origin of item.sources)if(['quiz-correct-feedback','quiz-wrong-feedback'].includes(origin.category))feedback.push(origin);
  }
  const slots=new Set(feedback.map(item=>`${item.page}:${item.optionIndex}`));
  assert.equal(feedback.length,143);assert.equal(slots.size,143);
  assert.equal(new Set(feedback.map(item=>item.page)).size,47);
  assert.equal(feedback.filter(item=>item.correct).length,47);
  assert.equal(feedback.filter(item=>!item.correct).length,96);
  languages[language]={inventory:source.file,inventorySha256:source.sha256,rawKeys:inventory.texts.length,
    pageCount:153,pagesWithNarration:inventory.pagesWithNarration,quizPages:47,quizFeedbackOccurrences:143,
    correctFeedbackOccurrences:47,wrongFeedbackOccurrences:96,allFeedbackKeysIncluded:true};
}
assert.deepEqual(Object.keys(languages).sort(),languageOrder.slice().sort());
const keys=[...merged.values()].map(item=>({key:item.key,id:item.id,languages:languageOrder.filter(language=>item.languages.has(language))}));
const entries=keys.map(item=>({id:item.id,key:item.key,spokenText:item.key}));
assert.equal(keys.length,907);assert.equal(new Set(keys.map(item=>item.id)).size,907);
assert.deepEqual(input.keys,keys);assert.deepEqual(input.entries,entries);
assert.deepEqual(input.keys.map(({key,languages})=>({key,languages})),previous.value.keys.map(({key,languages})=>({key,languages})));
assert.deepEqual(input.entries.map(({key,spokenText})=>({key,spokenText})),previous.value.entries.map(({key,spokenText})=>({key,spokenText})));
const result={schemaVersion:1,ok:true,scope:'frozen-xiaoxiao-input-and-static-raw-key-coverage-only',
  inputFile:current.file,inputSha256:current.sha256,sourceInput:previous.file,sourceInputSha256:previous.sha256,
  voice,uniqueRawKeys:keys.length,entries:entries.length,languages,
  sourceInventories:sources.map(({file,sha256})=>({file,sha256})),quizFeedbackPositions:429,
  rawTextChanged:false,normalizationApplied:false,audioGenerated:false,
  traceability:'Exact key -> inventory.languages[language].texts[].sources (page, component, data field and source line). Previous input is retained only as raw-text derivation evidence, not a current voice or audio dependency.'};
fs.writeFileSync(path.join(root,'test-results/xiaoxiao-narration-input-verification.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({ok:true,inputSha256:current.sha256,uniqueRawKeys:keys.length,quizFeedbackPositions:429,rawTextChanged:false},null,2));
