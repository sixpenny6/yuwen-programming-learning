import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {idFor,sha,voice,validateRecord} from '../scripts/course-narration-lib.mjs';
test('content identity preserves spaces and Unicode instead of normalizing speech',()=>{
 assert.notEqual(idFor('cout，是系统定义'),idFor('cout ，是系统定义'));
 assert.notEqual(idFor('é'),idFor('e\u0301'));
 assert.equal(idFor('晓晓'),'xiaoxiao-'+sha(Buffer.from('晓晓')).slice(0,24));
});
test('cache reuse is bound to exact text, voice contract and bytes',()=>{
 const cache=fs.mkdtempSync(path.join(os.tmpdir(),'narration-cache-test-'));
 try{
  // Metadata integrity unit only; independent ffmpeg verification checks actual media.
  const entry={id:idFor('新课原文'),key:'新课原文',spokenText:'新课原文'},bytes=Buffer.from('unit-test-bytes');
  fs.writeFileSync(path.join(cache,entry.id+'.mp3'),bytes);
  const row={...entry,status:'ok',speaker:voice.speaker,engine:voice.engine,synthesisRate:'+0%',playbackRate:1,pitch:'+0Hz',volume:'+0%',spokenTextSha256:sha(Buffer.from(entry.key)),mp3:entry.id+'.mp3',sampleRate:24000,channels:1,fullDecodePassed:true,nonSilent:true,bytes:bytes.length,sha256:sha(bytes),duration:1};
  assert.equal(validateRecord(row,entry,cache).row.sha256,row.sha256);
  assert.throws(()=>validateRecord({...row,spokenText:'另一个文本'},entry,cache));
  assert.throws(()=>validateRecord({...row,speaker:'Other'},entry,cache));
  assert.throws(()=>validateRecord({...row,playbackRate:1.2},entry,cache));
  fs.writeFileSync(path.join(cache,entry.id+'.mp3'),Buffer.from('tampered-bytes!'));assert.throws(()=>validateRecord(row,entry,cache));
 }finally{fs.rmSync(cache,{recursive:true,force:true});}
});
