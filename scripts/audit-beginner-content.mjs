/** Static review aid, not a semantic blacklist. Reads only active C/C++ course data. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import ts from 'typescript';
const root=path.resolve(import.meta.dirname,'..'),args=process.argv.slice(2),at=args.indexOf('--report'),output=path.resolve(root,at<0?'test-results/course-1.3.0/beginner-audit.json':args[at+1]);
assert(output.startsWith(path.join(root,'test-results')+path.sep));
const names=['literacyQuizzes','wordSlides','wordPurposeSlides','wordQuizzes','wordExamples','sentenceSlides','sentencePurposeSlides','sentenceQuizzes','sentenceExamples','essaySlides','essayPurposeSlides','essayQuizzes','essayExamples'];
const rules=[
 ['ordered-set',/\bstd\s*::\s*set\s*</],['insert-result-pair',/\.\s*insert\s*\([^;]*\)\s*\.\s*second\b|\.\s*second\b/],
 ['iterator-algorithm',/\bstd\s*::\s*(?:max_element|accumulate|sort|find_if)\s*\(/],['begin-end-iterator',/\.\s*(?:c?begin|c?end)\s*\(|\bstd\s*::\s*(?:begin|end)\s*\(/],
 ['virtual-dispatch',/\b(?:virtual|override|dynamic_cast)\b/],['smart-pointer',/\b(?:unique_ptr|shared_ptr|weak_ptr|make_unique|make_shared)\b/],
 ['dynamic-allocation',/\b(?:malloc|calloc|realloc|free)\s*\(|\b(?:new|delete)\b/],['exceptions',/\btry\s*\{|\bcatch\s*\(|\bthrow\b|\bstd\s*::\s*runtime_error\b/],
 ['toupper-conversion',/\b(?:toupper|tolower)\s*\(/],['explicit-cpp-cast',/\b(?:static_cast|reinterpret_cast|const_cast)\s*</],
 ['template-definition',/\btemplate\s*</],
];
const sha=bytes=>createHash('sha256').update(bytes).digest('hex'),line=ls=>ls.map(l=>l.tokens.map(t=>t.text).join(' ')).join('\n');
const strip=code=>code.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\/\*[\s\S]*?\*\//g,match=>' '.repeat(match.length));
const report={schemaVersion:1,generatedAt:new Date().toISOString(),scanCompleted:false,codeFindings:[],proseMentions:[],sourceHashes:{},boundary:'Actual code constructs are matched after removing comments and string/character literals; ordinary variable names are not treated as API calls. Prose mentions, including wrong options and negative explanations, are separate review items. This aid cannot establish beginner suitability or unique correct quiz answers by itself.'};
for(const language of ['c','cpp'])for(const name of names){
 const relative=`src/adapted-data/${language}/${name}.ts`,source=fs.readFileSync(path.join(root,relative)),javascript=ts.transpileModule(source.toString('utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;assert(!/^\s*import\s/m.test(javascript));
 const rows=(await import('data:text/javascript;base64,'+Buffer.from(javascript).toString('base64')))[name];assert(Array.isArray(rows));report.sourceHashes[relative]=sha(source);
 for(const row of rows){
  const codes=[];if(name.endsWith('Examples'))codes.push({field:'code',code:row.code});else if(row.tokens)codes.push({field:'tokens',code:row.tokens.map(t=>t.text).join(' ')});else if(row.lines)codes.push({field:'lines',code:line(row.lines)});else if(row.blocks)row.blocks.forEach((b,i)=>codes.push({field:`blocks[${i}]`,code:line(b.lines)}));else if(Array.isArray(row.code))codes.push({field:'code',code:line(row.code)});
  if(row.codeVisual?.type==='code'){const visual=row.codeVisual;codes.push({field:'codeVisual',code:visual.tokens?visual.tokens.map(t=>t.text).join(' '):visual.lines?line(visual.lines):visual.content||''});}
  for(const item of codes){const cleaned=strip(item.code);for(const [rule,pattern]of rules){const match=pattern.exec(cleaned);if(match)report.codeFindings.push({language,dataset:name,id:row.id,file:relative,field:item.field,rule,construct:match[0],excerpt:item.code.slice(Math.max(0,match.index-45),match.index+140)});}}
  function prose(value,field){if(typeof value==='string'){
   const match=/\b(?:set|max_element|accumulate|virtual|override|unique_ptr|malloc|free|try|catch|runtime_error|toupper|static_cast)\b|虚函数|多态|迭代器|智能指针|动态分配|继承|析构/.exec(value);
   if(match)report.proseMentions.push({language,dataset:name,id:row.id,file:relative,field,text:value,negativeReference:/不(?:是|用|要|需要|属于)|没有|禁止|不能|无需/.test(value)});
  }else if(Array.isArray(value))value.forEach((v,i)=>prose(v,field+'['+i+']'));else if(value&&typeof value==='object')for(const [key,v]of Object.entries(value))if(!['tokens','lines','blocks','code','codeVisual','colorClass','scaleClass'].includes(key))prose(v,field?field+'.'+key:key);}
  prose(row,'');
  for(const [i,block]of(row.blocks||[]).entries())if(block.title)prose(block.title,`blocks[${i}].title`);
 }
}
report.sharedContextFiles=['src/original/App.tsx','src/original/language.ts','src/original/components/CodeStructureTheory.tsx'];
for(const file of report.sharedContextFiles)report.sourceHashes[file]=sha(fs.readFileSync(path.join(root,file)));
report.sharedContextBoundary='These three shared lesson sources are hash-bound for the separate static review; the construct scanner above processes adapted course datasets. Generic IDE dictionary entries and application TypeScript error handlers are not C/C++ course examples.';
report.scanCompleted=true;report.summary={codeFindings:report.codeFindings.length,proseMentions:report.proseMentions.length,affectedCodeCases:[...new Set(report.codeFindings.map(f=>f.language+'/'+f.dataset+'#'+f.id))]};fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({report:path.relative(root,output).replaceAll('\\','/'),...report.summary}));
