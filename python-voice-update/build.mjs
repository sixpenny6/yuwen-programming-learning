/** Voice + responsive-layout Python 1.0.5 update from the immutable 1.0.2 baseline. Private inputs/stages never belong in the source ZIP. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import asar from '@electron/asar';
import ts from 'typescript';
import {createLayoutPatches,applyGuardedPatches} from './patch-layout.mjs';

const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'..');
const argv=process.argv.slice(2),arg=name=>{const i=argv.indexOf(name);return i>=0?argv[i+1]:null;};
const source=arg('--source')?path.resolve(arg('--source')):null;
const narration=path.resolve(arg('--narration')||path.join(here,'narration'));
const prepareOnly=argv.includes('--prepare-only'),noSetup=argv.includes('--no-setup');
const installerOnly=argv.includes('--installer-only');
const build=path.join(here,'build'),baseline=path.join(here,'private-baseline','application');
const application=path.join(build,'application'),packageRoot=path.join(build,'asar-source');
const executable='像学习语文一样学习编程.exe',version='1.0.5';
const expectedBundle='c297061d5b3e996a76c685c4dfbbe90f76c543d38760f0223d8ea2ef4805fb3e';
const expectedNarrationManifest='992e522bf121f4ecc0c5aa75a1b582873959bc92d24a6fd071df0495560be196';
const sha=data=>createHash('sha256').update(data).digest('hex');
const json=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const rel=file=>path.relative(here,file).replaceAll('\\','/');
function readFinalNarration(){
 assert.equal(sha(fs.readFileSync(path.join(narration,'manifest.json'))),expectedNarrationManifest,'The layout update must retain the released Python 1.0.4 Xiaoxiao narration byte-for-byte');
 const manifest=json(path.join(narration,'manifest.json'));
 assert.equal(manifest.schemaVersion,1);assert.equal(manifest.voice?.speaker,'zh-CN-XiaoxiaoNeural');
 assert.equal(manifest.voice?.engine,'Microsoft Edge Online TTS');assert.equal(manifest.voice?.synthesisRate,'+0%');assert.equal(manifest.voice?.playbackRate,1);
 assert.equal(manifest.voice?.pitch,'+0Hz');assert.equal(manifest.voice?.volume,'+0%');
 assert.equal(manifest.fallback?.enabled,false,'Xiaoxiao playback must not silently fall back to a different system voice');
 assert.equal(manifest.fallback?.lang,'zh-CN');assert.equal(manifest.fallback?.rate,1);assert.deepEqual(manifest.fallback?.preferredVoices,['Xiaoxiao']);
 assert.equal(Object.keys(manifest.entries||{}).length,460,'Expected all 460 reachable Python raw keys');
 for(const [raw,entry]of Object.entries(manifest.entries)){assert.equal(entry.spokenText,raw);assert.equal(entry.mode,'recorded');assert(/^narration\/clips\/[\w-]+\.mp3$/.test(entry.file));assert(!entry.file.includes('yaoyao-'),'Old Yaoyao recording path remains');}
 return manifest;
}
// Reject unpublished/old assets before resetting the previous private stage.
const finalNarration=prepareOnly?null:readFinalNarration();
function writeReport(report){
 const text=JSON.stringify(report,null,2)+'\n';fs.writeFileSync(path.join(here,'build-report.json'),text);
 if(report.ok&&report.readyForPlayback){fs.mkdirSync(path.join(root,'test-results'),{recursive:true});fs.writeFileSync(path.join(root,'test-results','python-voice-build.json'),text);}
}
fs.mkdirSync(build,{recursive:true});
function writableOutput(target){
 const absolute=path.resolve(target),allowed=path.resolve(here)+path.sep;
 assert(absolute.startsWith(allowed)&&absolute!==path.resolve(here),'Output must remain inside python-voice-update');
 if(fs.existsSync(absolute)){assert(!fs.lstatSync(absolute).isSymbolicLink(),'No symlink output');assert(fs.realpathSync(absolute).startsWith(fs.realpathSync(here)+path.sep),'Resolved output escaped workspace');}
 return absolute;
}
function reset(target){const checked=writableOutput(target);if(fs.existsSync(checked))fs.rmSync(checked,{recursive:true});fs.mkdirSync(checked,{recursive:true});}
function files(directory,prefix=''){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(path.join(directory,entry.name),prefix+entry.name+'/'):[prefix+entry.name]);}
function walk(node,predicate,result=[]){if(predicate(node))result.push(node);ts.forEachChild(node,child=>{walk(child,predicate,result);});return result;}
function baselineBundle(archive){
 const candidates=asar.listPackage(archive).filter(p=>/^[/\\]dist[/\\]assets[/\\]index-.*\.js$/.test(p));assert.equal(candidates.length,1,'Expected one original frontend bundle');
 const name=candidates[0].replace(/^[/\\]/,'');const bytes=asar.extractFile(archive,name);assert.equal(sha(bytes),expectedBundle,'Input is not the verified Python 1.0.2 layout/AI build');return {name,bytes};
}
function copyApplication(from,to){
 fs.cpSync(from,to,{recursive:true,filter:file=>{
  const relative=path.relative(from,file).replaceAll('\\','/');
  return !/^(?:.*Setup.*\.exe|Uninstall .*\.exe)$/i.test(relative);
 }});
}
function buildSetup(report,sourceArchive){
 const installer=fs.readFileSync(path.join(here,'installer.nsi'),'utf8').replaceAll('@STAGE@',application).replaceAll('@OUTPUT@',path.join(here,`像学习语文一样学习编程 Setup ${version}.exe`)).replaceAll('@ICON@',path.join(application,'resources','app-icon.ico'));
 const deployed=files(application),legacyAudio=asar.listPackage(sourceArchive).filter(p=>/^[/\\]dist[/\\]audio[/\\]/.test(p)&&!asar.statFile(sourceArchive,p.replace(/^[/\\]/,'')).files).map(p=>'resources/app.asar.unpacked/'+p.replace(/^[/\\]/,'').replaceAll('\\','/'));
 const priorBytes=fs.readFileSync(path.join(here,'legacy-yaoyao-audio-manifest.json'));assert.equal(sha(priorBytes),'a6484db49de96e1a7a081dfcc1716363a02f33e53db4c4d6bc3bb4d2dd1b8f08');
 const prior=JSON.parse(priorBytes);assert.equal(prior.schemaVersion,1);assert.equal(prior.sourceVersion,'1.0.3');assert.equal(prior.sourceVoice.speaker,'Microsoft Yaoyao');
 assert.equal(prior.sourceManifestSha256,'f97235ab7be0b2f41bb30b87b7b5237145ff445948223aa916ea2529370594fe');
 const priorAudio=prior.files;assert.equal(priorAudio.length,460);assert(priorAudio.every(file=>/^resources\/app\.asar\.unpacked\/dist\/narration\/clips\/yaoyao-[a-f0-9]{24}\.mp3$/.test(file.path)));
 const uninstallFiles=[...new Set([...deployed,...legacyAudio,...priorAudio.map(file=>file.path)])],dirs=new Set();for(const file of uninstallFiles){let d=path.posix.dirname(file);while(d!=='.'){dirs.add(d);d=path.posix.dirname(d);}}
 fs.writeFileSync(path.join(build,'uninstall-files.nsh'),'\ufeff'+uninstallFiles.map(f=>`Delete "$INSTDIR\\${f.replaceAll('/','\\')}"`).join('\n')+'\n'+[...dirs].sort((a,b)=>b.length-a.length).map(d=>`RMDir "$INSTDIR\\${d.replaceAll('/','\\')}"`).join('\n')+'\n');
 fs.writeFileSync(path.join(build,'installer.nsi'),'\ufeff'+installer);
 const nsis=arg('--nsis')||path.join(root,'vendor','nsis','makensis.exe');assert(fs.existsSync(nsis),'NSIS compiler is missing');
 const result=spawnSync(nsis,['/V2',path.join(build,'installer.nsi')],{cwd:build,encoding:'utf8',windowsHide:true});assert.equal(result.status,0,'NSIS failed: '+(result.error?.message||'')+(result.stdout||'')+(result.stderr||''));
 const setup=path.join(here,`像学习语文一样学习编程 Setup ${version}.exe`);report.setup={file:rel(setup),sha256:sha(fs.readFileSync(setup)),bytes:fs.statSync(setup).size};
}
if(!fs.existsSync(path.join(baseline,'resources','app.asar'))){
 assert(source,'The verified private 1.0.2 baseline is missing. Supply --source pointing to an original 1.0.2 copy; the installed newer app is never snapshotted automatically.');
 assert(fs.existsSync(path.join(source,executable)),'Python source executable is missing');baselineBundle(path.join(source,'resources','app.asar'));
 reset(baseline);copyApplication(source,baseline);
}
const sourceArchive=path.join(baseline,'resources','app.asar');
const original=baselineBundle(sourceArchive);
if(installerOnly){
 const previous=json(path.join(here,'build-report.json'));assert(previous.ok&&previous.readyForPlayback&&previous.version===version,'Build the final 1.0.5 stage first');
 assert.equal(sha(fs.readFileSync(path.join(application,'resources','app.asar'))),previous.asarSha256,'Staged app changed since verification');
 assert.equal(sha(fs.readFileSync(path.join(narration,'manifest.json'))),previous.narration.manifestSha256,'Published narration changed since staging');
 buildSetup(previous,sourceArchive);writeReport(previous);console.log(JSON.stringify({ok:true,installerOnly:true,setup:previous.setup}));process.exit(0);
}
const report={schemaVersion:1,generatedAt:new Date().toISOString(),ok:false,readyForPlayback:false,version,
 scope:'Voice and responsive-layout patch of the immutable Python 1.0.2 baseline. Only the guarded voice block, shared AutoFit component and component className expressions change; course text, code examples and AI behavior outside these named ranges remain byte-identical.',
 baseline:{explicitOriginalSource:source,selection:'verified immutable 1.0.2 private snapshot; never the installed newer app',privateSnapshot:rel(baseline),bundleSha256:sha(original.bytes),asarSha256:sha(fs.readFileSync(sourceArchive))},
 application:rel(application),changes:[],guards:{},errors:[]};
try{
 reset(application);copyApplication(baseline,application);
 const bundledPython=path.join(os.homedir(),'.cache','codex-runtimes','codex-primary-runtime','dependencies','python','python.exe');
 const python=arg('--python')||process.env.LEARNING_PYTHON||(fs.existsSync(bundledPython)?bundledPython:'python');
 const nativePatch=spawnSync(python,[path.join(here,'patch-version.py'),path.join(application,executable)],{encoding:'utf8',windowsHide:true});
 assert.equal(nativePatch.status,0,'Native version update failed: '+nativePatch.stderr);
 report.nativeVersion=JSON.parse(nativePatch.stdout.trim());
 reset(packageRoot);asar.extractAll(sourceArchive,packageRoot);
 const originalText=original.bytes.toString('utf8'),sf=ts.createSourceFile('bundle.js',originalText,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
 const targets=walk(sf,n=>ts.isArrowFunction(n)&&n.getText(sf).includes('尝试播放:'));
 assert.equal(targets.length,1,'Expected one old speakText function');const speak=targets[0],declaration=speak.parent;
 assert(ts.isVariableDeclaration(declaration)&&ts.isIdentifier(declaration.name));const name=declaration.name.text;
 const statement=sf.statements.find(s=>s.pos<=speak.pos&&s.end>=speak.end),index=sf.statements.indexOf(statement);
 assert(ts.isVariableStatement(statement));assert.deepEqual(statement.declarationList.declarations.slice(0,2).map(d=>d.name.getText(sf)),['Lr',name]);
 const start=sf.statements[index-5].getStart(sf),end=speak.end+1;
 const voiceRange=originalText.slice(start,end);
 assert.equal(originalText[speak.end],',');
 assert(voiceRange.includes('audio_map.json')&&voiceRange.includes('speechSynthesis')&&voiceRange.includes('new Audio')&&voiceRange.includes('Xiaoxiao'),'Voice block boundaries were not verified');
 assert(!voiceRange.includes('jsx(')&&!voiceRange.includes('jsxs('),'Voice block must not contain UI rendering');
 const replacement=`const ${name}=text=>window.__pythonNarrationPlayer.speakText(text),`;
 const layout=createLayoutPatches(originalText,sf,root);
 const {patched,guardedBundleRanges,unchangedBundleSegments}=applyGuardedPatches(originalText,[
  {label:'Legacy voice router replaced by the shared narration player',kind:'voice',start,end,replacement},...layout.ranges,
 ]);
 assert(!patched.includes('audio_map.json')&&!patched.includes('Xiaoxiao')&&!patched.includes('尝试播放:'),'Old voice routes remain reachable or present');
 const diagnostics=ts.createSourceFile('patched.js',patched,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS).parseDiagnostics;
 assert.equal(diagnostics.length,0,'Patched frontend has a syntax error');
 fs.writeFileSync(path.join(packageRoot,original.name),patched);
 report.guards={originalBundleSha256:sha(original.bytes),patchedBundleSha256:sha(patched),voiceRange:{start,end,sha256:sha(voiceRange)},
  guardedBundleRanges,unchangedBundleSegments,onlyGuardedVoiceAndLayoutRangesChanged:true,courseDataAndAIByteIdentical:true,layoutUpdated:true,legacyAudioMapAndVoiceRouterRemoved:true};
 report.layout=layout.metadata;
 report.changes.push('Replaced the legacy voice router; reused the shared measured AutoFit and layout CSS with guarded component class names. All bundle segments outside the named voice/layout ranges are byte-identical.');
 fs.writeFileSync(path.join(packageRoot,'dist','course-layout.css'),layout.css);

 const playerFile=path.join(root,'src','speech','player.ts'),playerSource=fs.readFileSync(playerFile,'utf8');
 const playerJS=ts.transpileModule(playerSource.replaceAll('import.meta.env.BASE_URL',JSON.stringify('./')),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 assert(!/\brequire\s*\(/.test(playerJS),'Standalone player unexpectedly requires a runtime module');
 const bridge=fs.readFileSync(path.join(here,'page-bridge.js'),'utf8');
 const standalone=`(function(){const exports={};\n${playerJS}\nwindow.__pythonNarrationPlayer=Object.freeze({speakText:exports.speakText,stopSpeech:exports.stopSpeech});\n${bridge}\n})();\n`;
 fs.writeFileSync(path.join(packageRoot,'dist','narration-player.js'),standalone);
 const indexPath=path.join(packageRoot,'dist','index.html'),originalHTML=fs.readFileSync(indexPath,'utf8');
 const marker=originalHTML.match(/<script\s+type="module"[^>]*>/g);assert.equal(marker?.length,1);
 const inserted='<script src="./narration-player.js"></script>\n  ';
 // The immutable Python 1.0.2 HTML contains a responsive padding shorthand
 // marked !important. Reserve the same help-button space as the shared layout
 // without changing that private baseline or weakening its other styles.
 const pythonHeaderReservation='.course-app .app-header{padding-right:80px!important}';
 assert(originalHTML.includes('padding: 0 20px !important'),'Expected the guarded legacy Python header padding rule');
 const layoutLink='<link rel="stylesheet" href="./course-layout.css">\n<style id="python-header-reservation">'+pythonHeaderReservation+'</style>\n';
 assert.equal((originalHTML.match(/<\/head>/g)||[]).length,1);
 const html=originalHTML.replace(marker[0],inserted+marker[0]).replace('</head>',layoutLink+'</head>');
 assert.equal(html.replace(inserted,'').replace(layoutLink,''),originalHTML);
 fs.writeFileSync(indexPath,html);
 report.layout.pythonHeaderReservation={reason:'Override the original Python responsive padding shorthand marked !important so the header reserves the shared 80px help-button area.',cssSha256:sha(pythonHeaderReservation)};
 const packagePath=path.join(packageRoot,'package.json'),pkg=json(packagePath);assert.equal(pkg.version,'1.0.2');pkg.version=version;fs.writeFileSync(packagePath,JSON.stringify(pkg,null,2)+'\n');
 for(const target of [path.join(packageRoot,'dist','audio'),path.join(packageRoot,'dist','audio_map.json'),path.join(application,'resources','app.asar.unpacked')]){
  writableOutput(target);if(fs.existsSync(target))fs.rmSync(target,{recursive:fs.statSync(target).isDirectory()});
 }
 report.guards.playerSourceSha256=sha(playerSource);report.guards.standalonePlayerSha256=sha(standalone);
 if(!prepareOnly){
  const manifest=finalNarration;
  assert(Object.keys(manifest.entries).length>0);const modes={recorded:0,system:0};
  for(const [raw,entry]of Object.entries(manifest.entries)){assert.equal(entry.spokenText,raw);assert(['recorded','system'].includes(entry.mode));++modes[entry.mode];if(entry.mode==='recorded'){assert(/^narration\/clips\/[\w-]+\.mp3$/.test(entry.file));const file=path.join(narration,entry.file.replace(/^narration\//,''));assert.equal(sha(fs.readFileSync(file)),entry.sha256);}}
  fs.cpSync(narration,path.join(packageRoot,'dist','narration'),{recursive:true});
  report.narration={manifestSha256:sha(fs.readFileSync(path.join(narration,'manifest.json'))),rawKeys:Object.keys(manifest.entries).length,modes,voice:manifest.voice,unchangedFromPython104:true};report.readyForPlayback=true;
 }
 const archive=path.join(application,'resources','app.asar');fs.rmSync(archive,{force:true});
 await asar.createPackageWithOptions(packageRoot,archive,{unpack:'**/narration/clips/*.mp3'});
 const changed=new Set([original.name.replaceAll('\\','/'),'dist/index.html','package.json']);let unchanged=0;
 for(const item of asar.listPackage(sourceArchive)){const name=item.replace(/^[/\\]/,'');const slash=name.replaceAll('\\','/');const stat=asar.statFile(sourceArchive,name);if(stat.files||slash.startsWith('dist/audio/')||slash==='dist/audio_map.json'||changed.has(slash))continue;
  assert.equal(sha(asar.extractFile(archive,name)),sha(asar.extractFile(sourceArchive,name)),`Original resource outside the voice/layout patch changed: ${slash}`);++unchanged;
 }
 report.guards.otherOriginalFilesByteIdentical=unchanged;
 report.asarSha256=sha(fs.readFileSync(archive));
 if(!prepareOnly){
  const payload={schemaVersion:1,generatedAt:new Date().toISOString(),product:{language:'python',name:'像学习语文一样学习编程',appId:'python-learning',version,
   executable,installDirectory:'E:\\ai\\python-learning',shortcut:{context:'all-users',name:'语文式 Python 学习.lnk',target:'E:\\ai\\python-learning\\'+executable}},
   stage:rel(application),nativeVersion:report.nativeVersion,narration:report.narration,layout:report.layout,sourceBundleSha256:expectedBundle,voicePatchGuards:report.guards,
   files:files(application).sort().map(file=>{const absolute=path.join(application,file);return {path:file,size:fs.statSync(absolute).size,sha256:sha(fs.readFileSync(absolute))};})};
  fs.mkdirSync(path.join(root,'releases'),{recursive:true});fs.writeFileSync(path.join(root,'releases','python-'+version+'-manifest.json'),JSON.stringify(payload,null,2)+'\n');
  report.payloadManifest='releases/python-'+version+'-manifest.json';
 }
 if(!prepareOnly&&!noSetup){
  buildSetup(report,sourceArchive);
 }
 report.ok=true;
}catch(error){report.errors.push(error.message);process.exitCode=1;}
writeReport(report);
console.log(JSON.stringify({ok:report.ok,version,readyForPlayback:report.readyForPlayback,application:rel(application),unchangedOriginalResources:report.guards.otherOriginalFilesByteIdentical,layout:report.layout,setup:report.setup,errors:report.errors}));
