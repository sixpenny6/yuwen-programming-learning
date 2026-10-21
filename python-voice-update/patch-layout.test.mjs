import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {applyGuardedPatches} from './patch-layout.mjs';

test('voice and layout ranges leave every intervening course/AI byte intact',()=>{
 const original='课程甲\nconst layout=OLD;\nCOURSE_DATA();\nconst voice=OLD;\nAI_CODE();';
 const layout=original.indexOf('OLD'),voice=original.indexOf('OLD',layout+3);
 const result=applyGuardedPatches(original,[
  {label:'voice',kind:'voice',start:voice,end:voice+3,replacement:'NEW_VOICE'},
  {label:'layout',kind:'layout-component',start:layout,end:layout+3,replacement:'NEW_LAYOUT'},
 ]);
 assert.equal(result.patched,'课程甲\nconst layout=NEW_LAYOUT;\nCOURSE_DATA();\nconst voice=NEW_VOICE;\nAI_CODE();');
 assert.equal(result.guardedBundleRanges.length,2);
 assert.equal(result.unchangedBundleSegments.length,3);
 for(const segment of result.unchangedBundleSegments){
  assert.equal(segment.sha256,createHash('sha256').update(original.slice(segment.start,segment.end)).digest('hex'));
 }
});
test('overlapping replacements are rejected instead of silently altering other code',()=>{
 assert.throws(()=>applyGuardedPatches('0123456789',[
  {start:2,end:5,replacement:'a'},{start:4,end:7,replacement:'b'},
 ]),/Overlapping or invalid/);
});
test('out-of-bounds, empty and invalid replacement ranges are rejected',()=>{
 for(const range of [{start:-1,end:2,replacement:'a'},{start:1,end:20,replacement:'a'},{start:2,end:2,replacement:'a'},{start:0,end:1,replacement:null}]){
  assert.throws(()=>applyGuardedPatches('01234',[range]),/Overlapping or invalid/);
 }
});
