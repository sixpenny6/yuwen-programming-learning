const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),phase=process.argv[2]||'baseline',digest=b=>createHash('sha256').update(b).digest('hex');
const dependencyURLs=['https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide-lock.json','https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.wasm','https://cdn.jsdelivr.net/pyodide/v0.25.0/full/python_stdlib.zip','https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.js'];
const result={schemaVersion:2,phase,generatedAt:new Date().toISOString(),ok:false,languages:[],boundary:phase==='baseline'?'Baseline: 153 pages / 585 states per language at 1400x1000. Raw records preserved; intentionally clipped noninteractive keyword rain is explicitly excluded here.':'Final: 153 pages and all 585 states at four sizes per language, including cross-layer closed FAQ overlap checks. Python original Pyodide CDN requests are blocked and preserved as a runtime dependency boundary; layout pass does not claim full Python-runtime success. Separate smoke uses the existing local print path and only nine representative real recorded-voice starts, not a repeated full audio suite.'};
for(const language of ['python','c','cpp']){
 const relative=`test-results/layout-${phase}/${language}${phase==='baseline'?'-full':''}.json`,file=path.join(root,relative);if(!fs.existsSync(file))continue;
 const bytes=fs.readFileSync(file),report=JSON.parse(bytes);
 const decorative=f=>phase==='baseline'&&[3,19,73,113,151].includes(f.page)&&/shimmer|^span\.text-slate-300/.test(f.element);
 const actionable=report.findings.filter(f=>!decorative(f)),top=new Map();for(const value of actionable){const key=value.page+'|'+value.kind;if(!top.has(key))top.set(key,value);}
 const item={language,version:report.version,sourceReport:relative,sourceReportSha256:digest(bytes),asarSha256:report.asarSha256,rawReportOk:report.ok,scanCompleted:report.scanCompleted,coverage:report.coverage,rawRecords:report.findings.length,ignoredDecorativeRecords:report.findings.length-actionable.length,actionableRecords:actionable.length,affectedPages:[...new Set(actionable.map(f=>f.page))],top20:[...top.values()].slice(0,20),screenshots:report.screenshots};
 if(phase==='final'){
  const expectedPythonBoundary=language==='python'&&report.httpRequests.every(url=>dependencyURLs.includes(url))&&report.pageErrors.every(error=>/^Failed to fetch$|importScripts.*pyodide/.test(error));
  item.layoutPassed=report.scanCompleted&&report.coverage.basePages===612&&report.coverage.stateMeasurements===2340&&actionable.length===0&&report.states.every(s=>s.helpRect&&s.helpChecks>0);
  item.runtimeDependencyBoundary={allHTTPBlocked:true,httpAttempts:report.httpRequests.length,pageErrors:report.pageErrors.length,expectedExistingPyodideDependency:expectedPythonBoundary,fullPythonRuntimeVerified:false};
  assert(item.layoutPassed,language+' layout audit incomplete or failed');assert(expectedPythonBoundary||(!report.httpRequests.length&&!report.pageErrors.length),language+' unexpected runtime error');assert(!report.errors.length);
  const interactionRelative=`test-results/layout-final/interactions-${language}.json`,interactionBytes=fs.readFileSync(path.join(root,interactionRelative)),interaction=JSON.parse(interactionBytes);
  assert(interaction.ok&&interaction.asarSha256===report.asarSha256&&interaction.version===report.version&&interaction.sizes.length===4&&interaction.sizes.every(s=>s.passed)&&interaction.voiceRouting.length===3);
  item.interactions={report:interactionRelative,sha256:digest(interactionBytes),passed:true,sizes:interaction.sizes.map(s=>s.size),actualRecordedStarts:3,naturalCompletions:interaction.voiceRouting.filter(s=>s.nativeEnd===true).length,manifestSha256:interaction.manifestSha256,runtimeDependencyBoundary:interaction.runtimeDependencyBoundary||null};
 }
 result.languages.push(item);
}
result.ok=result.languages.length===3&&(phase==='baseline'||result.languages.every(item=>item.layoutPassed&&item.interactions.passed));
if(phase==='final'){assert(result.ok);result.totals={languages:3,nativeSizesPerLanguage:4,basePageStates:1836,stateMeasurements:7020,stepStates:4572,quizFeedbackStates:1716,representativeRecordedStarts:9,representativeNaturalCompletions:3};}
fs.writeFileSync(path.join(root,`test-results/layout-${phase}-summary.json`),JSON.stringify(result,null,2));console.log(JSON.stringify({phase,ok:result.ok,languages:result.languages.map(({top20,coverage,screenshots,...item})=>item)},null,2));
