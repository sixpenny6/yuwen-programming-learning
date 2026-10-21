/** Freeze inherited 1.3.0 evidence before a presentation-only 1.3.1 install. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..'),directory='test-results/spacing-1.3.1',sha=b=>createHash('sha256').update(b).digest('hex');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const sourceFiles=['test-results/official-installation.json','test-results/desktop-shortcuts.json','releases/c-1.3.0-manifest.json','releases/cpp-1.3.0-manifest.json'];
const official=read(sourceFiles[0]),shortcuts=read(sourceFiles[1]);assert(official.results.every(item=>item.version==='1.3.0'));assert(shortcuts.every(item=>item.version==='1.3.0'));
fs.mkdirSync(path.join(root,directory,'baseline'),{recursive:true});const snapshots=[];
for(const source of sourceFiles){const bytes=fs.readFileSync(path.join(root,source)),destination=directory+'/baseline/'+path.basename(source),file=path.join(root,destination);if(fs.existsSync(file))assert.equal(sha(fs.readFileSync(file)),sha(bytes));else fs.writeFileSync(file,bytes);snapshots.push({source,snapshot:destination,sha256:sha(bytes)});}
const inheritedFiles=['test-results/course-1.3.0/course-verification.json','test-results/course-1.3.0/narration-input.json','test-results/course-1.3.0/narration-publication.json','test-results/course-1.3.0/narration-verification.json','test-results/course-1.3.0/narration-ui.json','test-results/course-1.3.0/layout/c.json','test-results/course-1.3.0/layout/cpp.json','test-results/course-1.3.0/layout/interactions-c.json','test-results/course-1.3.0/layout/interactions-cpp.json'];
const inherited=inheritedFiles.map(file=>({file,sha256:sha(fs.readFileSync(path.join(root,file)))}));
const course=read(inheritedFiles[0]);assert(course.ok);const dataHashes=Object.entries(course.sourceHashes).filter(([file])=>file.startsWith('src/adapted-data/')).map(([file,sha256])=>({file,sha256}));assert.equal(dataHashes.length,26);for(const item of dataHashes)assert.equal(sha(fs.readFileSync(path.join(root,item.file))),item.sha256);
const cManifest='public/narration/manifest.json',pythonManifest='python-voice-update/narration/manifest.json';
assert.equal(sha(fs.readFileSync(path.join(root,cManifest))),'3d9f00b9f72b91acae798108d22e875187269e93b242c700299fcf08b4a985d9');assert.equal(sha(fs.readFileSync(path.join(root,pythonManifest))),'992e522bf121f4ecc0c5aa75a1b582873959bc92d24a6fd071df0495560be196');
const report={schemaVersion:1,ok:true,version:'1.3.1',inheritedVersion:'1.3.0',createdAt:new Date().toISOString(),snapshots,inherited,dataHashes,manifests:[cManifest,pythonManifest].map(file=>({file,sha256:sha(fs.readFileSync(path.join(root,file)))})),boundary:'Presentation-only spacing change. Historical course/audio/UI ASARs retain their original version; they are not current-stage tests. Course data and both released narration manifests are frozen.'};
const output=path.join(root,directory,'baseline.json');if(fs.existsSync(output)){const old=read(directory+'/baseline.json');assert.deepEqual({...old,createdAt:null},{...report,createdAt:null});}else fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({ok:true,baseline:directory+'/baseline.json',snapshots:snapshots.length,dataFiles:dataHashes.length}));
