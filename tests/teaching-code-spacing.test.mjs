import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ts from 'typescript';

const source=readFileSync(new URL('../src/teaching-code-spacing.ts',import.meta.url),'utf8');
const javascript=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const spacing=await import('data:text/javascript;base64,'+Buffer.from(javascript).toString('base64'));
const {teachingCodeSeparators,joinTeachingCode}=spacing;
const tokens=(...texts)=>texts.map(text=>({text}));

test('C++ qualified type and variable remain distinct words',()=>{
 const input=tokens('std','::','string','name','=','"小红"',';');
 assert.equal(joinTeachingCode(input),'std::string name="小红";');
 assert.deepEqual(teachingCodeSeparators(input),['','','',' ','','','']);
});
test('C type qualifiers, function declarations and return values gain required separators',()=>{
 assert.equal(joinTeachingCode(tokens('const','char','*','name')),'const char*name');
 assert.equal(joinTeachingCode(tokens('int','add','(','int','a',',','int','b',')')),'int add(int a,int b)');
 assert.equal(joinTeachingCode(tokens('return','a','+','b',';')),'return a+b;');
 assert.equal(joinTeachingCode(tokens('return','0',';')),'return 0;');
});
test('else if is separated without repairing intentional syntax-error questions',()=>{
 assert.equal(joinTeachingCode(tokens('}','else','if','(','score','>=','60',')','{')),'}else if(score>=60){');
 assert.equal(joinTeachingCode(tokens('if','score','>','60','{')),'if score>60{');
 assert.equal(joinTeachingCode(tokens('std','::','couut','<<','name',';')),'std::couut<<name;');
});
test('template closing delimiters separate from following variable names',()=>{
 assert.equal(joinTeachingCode(tokens('std','::','vector','<','int','>','scores')),'std::vector<int> scores');
 assert.equal(joinTeachingCode(tokens('std','::','vector','<','std','::','vector','<','int','>','>','values')),'std::vector<std::vector<int>> values');
});
test('existing spaces, tabs, indentation and separate whitespace tokens are retained exactly',()=>{
 for(const input of [tokens('int ','age'),tokens('int',' age'),tokens('int',' ','age'),tokens('int','\t','age'),tokens('  int',' ',' age')]){
  assert(teachingCodeSeparators(input).every(separator=>separator===''));
  assert.equal(joinTeachingCode(input),input.map(token=>token.text).join(''));
 }
});
test('qualified access, compound operators and brackets are never split',()=>{
 const cases=[
  [tokens('std','::','cout','<<','name',';'),'std::cout<<name;'],
  [tokens('++','count'),'++count'],[tokens('count','++'),'count++'],
  [tokens('stream','>>','age'),'stream>> age'],
  // The generic trailing-'>' rule may add space after ->, but never inside it.
  [tokens('pointer','->','name'),'pointer-> name'],
  [tokens('scores','[','0',']'),'scores[0]'],[tokens('values','[',']'),'values[]'],
  [tokens('score','+=','5'),'score+=5'],[tokens('a','&&','b'),'a&&b'],
 ];
 for(const [input,expected]of cases)assert.equal(joinTeachingCode(input),expected);
});
test('complete strings and character literals retain their contents, quotes and escapes',()=>{
 const escape=String.fromCharCode(92);
 const literal='"std::stringname else if ++ '+escape+'"quote'+escape+'" '+escape+'n"';
 const input=tokens('std','::','cout','<<',literal,'<<',String.raw`'\n'`,';');
 assert.equal(joinTeachingCode(input),'std::cout<<'+literal+'<<'+String.raw`'\n'`+';');
 for(const text of ['"a  b"','"a\u00a0b"',"' '","'!'",'"<tag> & text"'])assert.equal(joinTeachingCode(tokens(text)),text);
 assert.equal(joinTeachingCode(tokens('return','1u',';')),'return 1u;');
});
test('frozen token objects, original text and pronunciation keys are never mutated',()=>{
 const input=Object.freeze([
  Object.freeze({text:'const',type:'系统定义',colorClass:'text-purple-600'}),
  Object.freeze({text:'char',type:'系统定义',colorClass:'text-purple-600'}),
 ]);
 const before=JSON.stringify(input),keys=input.map(token=>`${token.text}，是${token.type}`);
 assert.equal(joinTeachingCode(input),'const char');
 assert.deepEqual(teachingCodeSeparators(input),['',' ']);
 assert.equal(JSON.stringify(input),before);
 assert.deepEqual(input.map(token=>`${token.text}，是${token.type}`),keys);
 assert.equal(input[1].text,'char');
});

const require=createRequire(import.meta.url),componentExports={};
const componentSource=readFileSync(new URL('../src/original/components/TeachingTokens.tsx',import.meta.url),'utf8');
const componentJS=ts.transpileModule(componentSource,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
new Function('require','exports',componentJS)(name=>name==='../../teaching-code-spacing'?spacing:require(name),componentExports);
function plainText(markup){
 const entities={'&lt;':'<','&gt;':'>','&amp;':'&','&quot;':'"','&#x27;':"'",'&#39;':"'"};
 return markup.replace(/<[^>]*>/g,'').replace(/&(?:lt|gt|amp|quot|#x27|#39);/g,entity=>entities[entity]);
}
test('actual shared React renderer emits a real ASCII-space element and passes original child objects',()=>{
 const input=Object.freeze([Object.freeze({text:'int',type:'系统定义'}),Object.freeze({text:'score',type:'文本内容'})]);
 const children=[],rawKeys=[];
 const html=renderToStaticMarkup(React.createElement(componentExports.TeachingTokens,{tokens:input,children:(token,index)=>{
  children.push([token,index]);rawKeys.push(`${token.text}，是${token.type}`);return React.createElement('span',null,token.text);
 }}));
 assert.equal(plainText(html),'int score');
 assert(html.includes('<span class="course-code-space"> </span>'));
 assert(!html.includes('\u00a0'));
 assert.equal(children[0][0],input[0]);assert.equal(children[1][0],input[1]);
 assert.deepEqual(rawKeys,['int，是系统定义','score，是文本内容']);
 const css=readFileSync(new URL('../src/original/components/course-layout.css',import.meta.url),'utf8');
 assert(/\.course-code-space\s*\{[^}]*white-space\s*:\s*pre\b/.test(css),'The separator needs preserved whitespace inside flex-based phrases');
});
test('shared React renderer preserves literal text and all existing whitespace',()=>{
 for(const input of [tokens('int',' ','score'),tokens('std','::','cout','<<','"a  b <text>"',';')]){
  const html=renderToStaticMarkup(React.createElement(componentExports.TeachingTokens,{tokens:input,children:token=>React.createElement('span',null,token.text)}));
  assert.equal(plainText(html),joinTeachingCode(input));
  assert.equal((html.match(/class="course-code-space"/g)||[]).length,0);
 }
});

test('all active C/C++ teaching arrays keep raw tokens and receive their required word boundaries',async()=>{
 let arrays=0,required=0,templateBoundaries=0;
 const names=['literacyQuizzes','wordSlides','wordPurposeSlides','wordQuizzes','sentenceSlides','sentencePurposeSlides','sentenceQuizzes','essaySlides','essayPurposeSlides','essayQuizzes'];
 function walk(value){
  if(Array.isArray(value)){value.forEach(walk);return;}
  if(!value||typeof value!=='object')return;
  if(Array.isArray(value.tokens)){
   ++arrays;const before=JSON.stringify(value.tokens),separators=teachingCodeSeparators(value.tokens);
   assert(separators.every(separator=>separator===''||separator===' '));
   value.tokens.forEach((token,index)=>{
    const left=value.tokens[index-1]?.text||'',right=token.text;
    if(!left||!right||/\s$/.test(left)||/^\s/.test(right))return;
    if(/[A-Za-z_0-9]$/.test(left)&&/^[A-Za-z_0-9]/.test(right)){++required;assert.equal(separators[index],' ');}
    if(/^>+$/.test(left)&&/^[A-Za-z_]/.test(right)){++templateBoundaries;assert.equal(separators[index],' ');}
   });
   assert.equal(JSON.stringify(value.tokens),before);
  }
  Object.values(value).forEach(walk);
 }
 for(const language of ['c','cpp'])for(const name of names){
  const dataSource=readFileSync(new URL(`../src/adapted-data/${language}/${name}.ts`,import.meta.url),'utf8');
  const js=ts.transpileModule(dataSource,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  assert(!/^\s*import\s/m.test(js));
  const data=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));walk(data[name]);
 }
 assert(arrays>0);assert(required>0);assert(templateBoundaries>0);
});
