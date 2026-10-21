/** Focused real-compiler checks for the beginner C++ revision.
 * This supplements, rather than replaces, the shared 92-example validator.
 */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import ts from 'typescript';

const root=path.resolve(import.meta.dirname,'..'),results=path.join(root,'test-results','course-1.3.0');
fs.mkdirSync(results,{recursive:true});
const run=fs.mkdtempSync(path.join(results,'cpp-beginner-'));
const compiler=path.join(root,'vendor','compiler','bin','x86_64-w64-mingw32-clang++.exe');
const sha=value=>createHash('sha256').update(value).digest('hex');
const normalize=text=>text.replace(/\r\n/g,'\n');
const selected={word:[6,11],sentence:[7,12],essay:[2,3,4,5,6,7,9,10,11,12,13]};
const report={schemaVersion:1,generatedAt:new Date().toISOString(),ok:false,revision:'beginner',
 scope:'Fifteen beginner C++17 examples, targeted input/container/object/file boundaries, static advanced-content audit and authoring idempotence. The previous advanced attempt is retained as historical evidence and is not a current acceptance result.',
 supersededAttempt:'test-results/course-1.3.0/cpp-features-advanced-attempt.json',
 flags:['-std=c++17','-Wall','-Wextra','-Werror','-pedantic-errors','-static'],selected,sourceHashes:{},examples:[],audit:[],errors:[]};
const modules=new Map();
async function load(name){
 if(modules.has(name))return modules.get(name);
 const file=path.join(root,'src','adapted-data','cpp',name+'.ts'),source=fs.readFileSync(file,'utf8');
 report.sourceHashes[path.relative(root,file).replaceAll('\\','/')]=sha(source);
 const javascript=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
 assert(!/^\s*import\s/m.test(javascript),'Only static course modules may be loaded');
 const module=await import('data:text/javascript;base64,'+Buffer.from(javascript).toString('base64'));
 modules.set(name,module[name]);return module[name];
}
const jobs=[];
for(const [group,ids]of Object.entries(selected))for(const example of (await load(group+'Examples')).filter(row=>ids.includes(row.id))){
 jobs.push({name:group+'-'+example.id,code:example.code,expected:example.expectedOutput,input:example.stdin||'',exit:0});
}
function sample(group,id){return jobs.find(job=>job.name===group+'-'+id);}
function changedMain(group,id,name,body,expected){
 const original=sample(group,id);assert(original);
 jobs.push({name,code:original.code.slice(0,original.code.indexOf('int main()'))+'int main() {\n'+body+'\nreturn 0;\n}\n',expected,exit:0});
}
function changedText(group,id,name,from,to,expected){
 const original=sample(group,id);assert(original.code.includes(from));
 jobs.push({name,code:original.code.replace(from,to),expected,exit:0});
}
changedMain('sentence',7,'reference-zero-and-negative',String.raw`int zero = 0; int negative = -5;
add_bonus(zero); add_bonus(negative);
std::cout << zero << ' ' << negative << '\n';`,'5 0\n');
changedText('essay',4,'average-empty-list','std::vector<int> scores{80, 90, 85};','std::vector<int> scores{};','');
changedText('essay',5,'highest-negative-list','std::vector<int> scores{85, 92, 78};','std::vector<int> scores{-7, -2, -9};','-2\n');
changedText('essay',6,'filter-no-even-values','std::vector<int> numbers{1, 2, 3, 4};','std::vector<int> numbers{1, 3, 5};','\n');
changedMain('essay',9,'cart-empty-and-independent',String.raw`ShoppingCart first; ShoppingCart second;
first.add(5); first.add(3);
std::cout << second.total << ' ' << first.total << '\n';`,'0 8\n');
changedText('essay',10,'reference-range-negative-list','std::vector<int> scores{70, 80, 90};','std::vector<int> scores{-5, 0, 5};','0 5 10 \n');
changedMain('essay',11,'student-independent-names',String.raw`Student first("小明"); Student second("小红");
std::cout << first.name << ' ' << second.name << '\n';`,'小明 小红\n');
changedMain('essay',12,'count-missing-and-repeated-letter',String.raw`std::cout << count_char("hello", 'z') << ' ' << count_char("aaa", 'a') << '\n';`,'0 3\n');

const author=spawnSync(process.execPath,[path.join(root,'scripts','author-cpp-features.mjs'),'--check'],{cwd:root,encoding:'utf8',windowsHide:true,timeout:30000});
report.authoringIdempotence={passed:author.status===0};
if(author.status!==0)report.errors.push({context:'authoring',error:String(author.error||author.stdout||author.stderr)});

const forbidden=/\b(?:decltype|virtual|override|RAII|max_element|accumulate|runtime_error|throw|catch|toupper)\b|std::set\b|\.begin\s*\(|\.end\s*\(|const\s+std::(?:string|vector)\s*[<&]/;
function strings(value,out=[]){if(typeof value==='string')out.push(value);else if(Array.isArray(value))for(const child of value)strings(child,out);else if(value&&typeof value==='object')for(const child of Object.values(value))strings(child,out);return out;}
for(const name of ['literacyQuizzes','wordSlides','wordPurposeSlides','wordExamples','wordQuizzes','sentenceSlides','sentencePurposeSlides','sentenceExamples','sentenceQuizzes','essaySlides','essayPurposeSlides','essayExamples','essayQuizzes']){
 const data=await load(name),matches=strings(data).filter(text=>forbidden.test(text));
 report.audit.push({dataset:name,advancedResiduals:matches.length,passed:matches.length===0});
 if(matches.length)report.errors.push({context:name,error:'Advanced content remains',matches});
}
for(const job of jobs){
 const directory=path.join(run,job.name);fs.mkdirSync(directory);
 const source=path.join(directory,'main.cpp'),executable=path.join(directory,'main.exe');fs.writeFileSync(source,job.code);
 const row={name:job.name,codeSha256:sha(job.code),compiled:false,passed:false};
 const compilation=spawnSync(compiler,[...report.flags,source,'-o',executable],{cwd:directory,encoding:'utf8',windowsHide:true,timeout:30000});
 row.compiled=compilation.status===0;
 if(!row.compiled){row.error=String(compilation.error||compilation.stderr||compilation.stdout);report.errors.push({context:job.name,error:row.error});}
 else{
  const execution=spawnSync(executable,[],{cwd:directory,input:job.input||'',encoding:'utf8',windowsHide:true,timeout:10000});
  row.actualOutput=normalize(execution.stdout||'');row.expectedOutput=job.expected;row.exitCode=execution.status;
  row.passed=execution.status===job.exit&&row.actualOutput===job.expected;
  if(!row.passed){row.error=String(execution.error||execution.stderr||'Output or exit mismatch');report.errors.push({context:job.name,error:row.error});}
  if(job.name==='sentence-12')for(const [name,input]of [['invalid-text','abc\n'],['end-of-input','']]){
   const failed=spawnSync(executable,[],{cwd:directory,input,encoding:'utf8',windowsHide:true,timeout:10000});
   const boundary={name:'input-'+name,compiled:true,actualOutput:normalize(failed.stdout||''),expectedOutput:'请输入整数\n',exitCode:failed.status};
   boundary.passed=failed.status===0&&boundary.actualOutput===boundary.expectedOutput;report.examples.push(boundary);
   if(!boundary.passed)report.errors.push({context:boundary.name,error:'Expected failed-input branch'});
  }
  if(job.name==='essay-13'){
   const blocked=path.join(directory,'blocked');fs.mkdirSync(blocked);fs.mkdirSync(path.join(blocked,'note.txt'));
   const failed=spawnSync(executable,[],{cwd:blocked,encoding:'utf8',windowsHide:true,timeout:10000});
   const boundary={name:'file-open-failure',compiled:true,exitCode:failed.status,expectedExit:1,actualOutput:normalize(failed.stdout||'')};
   boundary.passed=failed.status===1&&boundary.actualOutput==='';report.examples.push(boundary);
   if(!boundary.passed)report.errors.push({context:boundary.name,error:'Expected explicit file-open failure'});
  }
 }
 report.examples.push(row);console.log(JSON.stringify({name:row.name,compiled:row.compiled,passed:row.passed}));
}
report.ok=report.errors.length===0;report.completedAt=new Date().toISOString();
fs.writeFileSync(path.join(results,'cpp-features.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({ok:report.ok,revision:report.revision,checks:report.examples.length,report:'test-results/course-1.3.0/cpp-features.json',errors:report.errors}));
if(!report.ok)process.exitCode=1;
