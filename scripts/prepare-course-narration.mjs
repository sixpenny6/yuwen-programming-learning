/** Freeze a new C/C++ raw-text revision, preserving the previous three-product evidence. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {root,voice,read,write,fileSha,idFor,options,pythonState,records,validateRecord} from './course-narration-lib.mjs';
const config=options(),directory=config.directory,inventoryFile=directory+'/narration-inventory.json',inventory=read(inventoryFile);
assert.deepEqual(Object.keys(inventory.languages).sort(),['c','cpp']);assert((inventory.sourceFiles||[]).length>0);
const inherited=['narration-inventory.json','xiaoxiao-narration-input.json','xiaoxiao-generation-verification.json','xiaoxiao-publication.json','xiaoxiao-verification.json','xiaoxiao-ui.json'];
const evidence=[];for(const name of inherited){const source='test-results/'+name,destination=directory+'/baseline/'+name;fs.mkdirSync(path.dirname(path.join(root,destination)),{recursive:true});if(fs.existsSync(path.join(root,destination)))assert.equal(fileSha(destination),fileSha(source),'Historical baseline changed');else fs.copyFileSync(path.join(root,source),path.join(root,destination));evidence.push({source,snapshot:destination,sha256:fileSha(source)});}
const sourceInput=directory+'/baseline/xiaoxiao-narration-input.json',previous=read(sourceInput);assert.deepEqual(previous.voice,voice);
const merged=new Map(),languages={};for(const language of ['c','cpp']){const data=inventory.languages[language];assert.equal(data.pageCount,153);languages[language]={rawKeys:data.texts.length,inventory:inventoryFile};for(const item of data.texts){assert(typeof item.text==='string'&&item.text.length);const key=merged.get(item.text)||{key:item.text,id:idFor(item.text),languages:[]};key.languages.push(language);merged.set(item.text,key);}}
const keys=[...merged.values()],entries=keys.map(({key,id})=>({id,key,spokenText:key})),previousIds=new Set(previous.entries.map(e=>e.id)),cache=records(config.cache);
const reused=entries.filter(e=>previousIds.has(e.id)),added=entries.filter(e=>!previousIds.has(e.id));
for(const entry of reused)validateRecord(cache.get(entry.id),entry,config.cache);
const unchangedPython=pythonState(),input={schemaVersion:2,revision:config.revision,voice,sourceInput,sourceInputSha256:fileSha(sourceInput),inventory:inventoryFile,inventorySha256:fileSha(inventoryFile),unchangedPython,keys,entries};
const inputFile=directory+'/narration-input.json';if(fs.existsSync(path.join(root,inputFile)))assert.deepEqual(read(inputFile),input,'Revision already frozen; choose a new revision or explicitly archive the incomplete attempt');else write(inputFile,input);
const activeIds=new Set(entries.map(e=>e.id)),previousCCpp=previous.keys.filter(e=>e.languages.some(l=>['c','cpp'].includes(l)));
const plan={schemaVersion:1,revision:config.revision,ok:true,inputFile,inputSha256:fileSha(inputFile),voice,unchangedPython,languages,rawKeys:entries.length,reusableCachedClips:reused.length,newTexts:added.length,removedCCppKeys:previousCCpp.filter(e=>!activeIds.has(e.id)).length,added:added.map(e=>({id:e.id,key:e.key})),reused:reused.map(e=>({id:e.id,sha256:cache.get(e.id).sha256})),historicalEvidence:evidence,policy:'Only added exact raw texts need online synthesis; unchanged cache rows are contract/size/SHA verified. Never modify Python assets or historical evidence.'};
write(directory+'/narration-plan.json',plan);console.log(JSON.stringify({revision:config.revision,input:inputFile,rawKeys:entries.length,reusableCachedClips:reused.length,newTexts:added.length,pythonUnchanged:true}));
