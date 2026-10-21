/** Controlled layout-only ranges for the immutable Python 1.0.2 frontend.
 * This file never persists or prints the private baseline bundle.
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import ts from 'typescript';

const hash=value=>createHash('sha256').update(value).digest('hex');
function descendants(node,predicate,result=[]){
 if(predicate(node))result.push(node);
 ts.forEachChild(node,child=>{descendants(child,predicate,result);});
 return result;
}
export function createLayoutPatches(originalText,sourceFile,root){
 const ranges=[];
 const declarations=descendants(sourceFile,node=>ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name));
 const component=name=>{
  const matches=declarations.filter(node=>node.name.text===name&&node.initializer);
  assert.equal(matches.length,1,'Expected one guarded layout component: '+name);
  return matches[0].initializer;
 };
 const autoFit=component('ug'),oldAutoFit=autoFit.getText(sourceFile);
 assert(oldAutoFit.includes('baseWidth')&&oldAutoFit.includes('baseHeight')&&oldAutoFit.includes('ResizeObserver'));
 const reactAliases=[...oldAutoFit.matchAll(/\b([\w$]+)\.use(?:State|Ref|Effect)\(/g)].map(match=>match[1]);
 const jsxAliases=[...oldAutoFit.matchAll(/\b([\w$]+)\.jsx\(/g)].map(match=>match[1]);
 assert(reactAliases.length&&reactAliases.every(alias=>alias===reactAliases[0]));
 assert(jsxAliases.length&&jsxAliases.every(alias=>alias===jsxAliases[0]));
 const autoFitPath=path.join(root,'src','original','components','AutoFitScale.tsx');
 const autoFitSource=fs.readFileSync(autoFitPath,'utf8');
 const compiled=ts.transpileModule(autoFitSource,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const adapted=compiled
  .replace(/require\(["']react\/jsx-runtime["']\)/g,'__jsxRuntime')
  .replace(/require\(["']react["']\)/g,'Object.assign({default:__reactRuntime},__reactRuntime)');
 assert(!/\brequire\s*\(/.test(adapted),'AutoFit must not introduce an external runtime dependency');
 assert(adapted.includes('exports.AutoFitScale'),'Shared AutoFit export was not found');
 const replacement=`(function(__reactRuntime,__jsxRuntime){const exports={};\n${adapted}\nreturn exports.AutoFitScale;})(${reactAliases[0]},${jsxAliases[0]})`;
 ranges.push({label:'AutoFitScale: shared measured responsive canvas',kind:'layout-component',start:autoFit.getStart(sourceFile),end:autoFit.end,replacement});

 // Only className expressions are changed in these existing components. Their
 // displayed text, tokens, event handlers and course data stay byte-identical.
 function markClassExpressions(classes,name,rules){
  for(const rule of rules){
   const selected=classes.filter(node=>rule.match(node.initializer.getText(sourceFile)));
   assert.equal(selected.length,rule.count??1,`Expected guarded class selector: ${name}/${rule.className}`);
   for(const selectedNode of selected){
    const node=selectedNode.initializer;
    const originalExpression=node.getText(sourceFile);
    const expression=rule.adjust?rule.adjust(originalExpression):originalExpression;
    ranges.push({label:`${name}: ${rule.className}`,kind:'layout-class',start:node.getStart(sourceFile),end:node.end,replacement:`(${JSON.stringify(rule.className+' ')}+(${expression}))`});
   }
  }
 }
 function prefixClasses(name,rules){
  const classes=descendants(component(name),node=>ts.isPropertyAssignment(node)&&node.name.getText(sourceFile)==='className');
  markClassExpressions(classes,name,rules);
 }
 function componentWithClass(fragment){
  const matches=declarations.filter(node=>node.initializer&&ts.isArrowFunction(node.initializer)&&node.initializer.getText(sourceFile).includes(fragment));
  assert.equal(matches.length,1,'Expected one component with guarded layout selector: '+fragment);
  return matches[0].name.text;
 }
 const exact=value=>text=>text===JSON.stringify(value);
 const slideRoot='h-full flex flex-col items-center justify-center py-8 animate-fade-in max-w-7xl mx-auto w-full px-4';
 prefixClasses('ws',[{className:'course-phrase',match:text=>text.includes('relative inline-flex items-end')}]);
 prefixClasses('Ds',[
  {className:'course-token',match:text=>text.includes('relative inline-flex flex-col items-center justify-end')},
  {className:'course-token-code',match:text=>text.includes('font-mono text-3xl md:text-4xl font-bold')},
 ]);
 prefixClasses('fp',[{className:'course-code-card',match:text=>text.includes('bg-white p-6 md:p-12 rounded-')}]);
 prefixClasses('Ke',[
  {className:'course-slide course-word-slide',match:exact(slideRoot)},
  {className:'course-slide-heading',match:exact('text-center mb-8')},
  {className:'course-code-body',match:text=>text.includes('transform origin-center')},
  {className:'course-legend',match:text=>text.includes('transition-opacity duration-500 mt-12')},
  {className:'course-step-controls',match:exact('mt-20')},
 ]);
 prefixClasses('$t',[
  {className:'course-slide course-sentence-slide',match:exact(slideRoot)},
  {className:'course-slide-heading',match:exact('text-center mb-8')},
  {className:'course-code-body',match:text=>text.includes('transform origin-center')},
  {className:'course-sentence-line',match:text=>text.includes('group/line')&&!text.includes('group-hover/line')},
  {className:'course-legend',match:text=>text.includes('transition-opacity duration-500 mt-12')},
  {className:'course-step-controls',match:exact('mt-20')},
 ]);
 prefixClasses(componentWithClass('max-h-[500px] overflow-y-auto'),[
  {className:'course-slide course-essay-slide',match:exact(slideRoot)},
  {className:'course-slide-heading',match:exact('text-center mb-10')},
  {className:'course-essay-code',match:text=>text.includes('max-h-[500px] overflow-y-auto')},
  {className:'course-essay-line',match:text=>text.startsWith('`flex flex-wrap ')},
  {className:'course-legend',match:text=>text.includes('transition-opacity duration-500 mt-8')},
  {className:'course-step-controls',match:exact('mt-12')},
 ]);
 prefixClasses(componentWithClass('text-center mb-6'),[
  {className:'course-slide course-purpose-slide',match:exact(slideRoot)},
  {className:'course-slide-heading',match:exact('text-center mb-6')},
  {className:'course-step-controls',match:exact('mt-10 flex gap-6')},
 ]);
 prefixClasses('yc',[
  {className:'course-review-card',match:text=>text.includes('relative flex flex-col h-full bg-white rounded-3xl')},
  {className:'course-review-body',match:exact('p-8 flex-1 flex flex-col')},
  {className:'course-review-code',match:text=>text.includes('mb-8 p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center justify-center min-h-[160px]')},
 ]);
 const allClasses=descendants(sourceFile,node=>ts.isPropertyAssignment(node)&&node.name.getText(sourceFile)==='className');
 markClassExpressions(allClasses,'existing application shells',[
  {className:'course-app',match:exact('h-screen w-screen flex bg-slate-50 overflow-hidden selection:bg-indigo-100 selection:text-indigo-700 relative')},
  {className:'app-brand',match:exact('font-bold text-slate-700 tracking-tight flex items-center gap-4 text-lg md:text-2xl lg:text-3xl')},
  {className:'app-section',match:exact('px-5 py-2 bg-slate-100 rounded-full text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap')},
  {className:'app-page-count',match:exact('text-slate-400 text-base md:text-xl font-medium hidden md:flex items-center gap-2'),adjust:text=>text.replace('hidden md:flex','flex')},
  {className:'app-page-controls',match:exact('flex gap-6 w-full md:w-auto justify-between md:justify-end items-center'),adjust:text=>text.replace('gap-6 w-full md:w-auto','gap-3 w-auto')},
  {className:'ai-help',match:exact('fixed bottom-32 right-10 w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all border-4 border-white/20')},
  {className:'ai-chat',match:exact('fixed bottom-52 right-10 w-[550px] bg-white rounded-3xl shadow-2xl border border-indigo-100 z-50 flex flex-col overflow-hidden')},
  {className:'course-sidebar course-sidebar-collapsed',match:text=>text.includes('app-navigation relative shrink-0 h-full w-16 bg-white border-r')},
  {className:'course-sidebar course-sidebar-expanded',match:text=>text.includes('app-navigation relative shrink-0 h-full w-80 bg-white border-r')},
  {className:'course-theory',match:exact('h-full flex flex-col py-4 md:py-6 max-w-7xl mx-auto w-full px-4 animate-fade-in')},
  {className:'course-quiz-slide',match:exact('max-w-5xl mx-auto min-h-full flex flex-col pt-12 pb-24 px-6 animate-fade-in'),count:4},
  {className:'course-ide',match:exact('flex flex-col h-full w-full max-w-[1400px] mx-auto p-4 md:p-8 animate-fade-in relative')},
  {className:'course-ide-header',match:exact('flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 gap-6')},
  {className:'course-ide-workspace',match:text=>text.includes('flex-1 flex flex-col rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-4 border-slate-100 relative min-h-[600px]')},
  {className:'course-ide-toolbar',match:exact('bg-slate-50/80 backdrop-blur-sm px-8 py-5 border-b border-slate-200 flex justify-between items-center z-20')},
  {className:'course-ide-content',match:exact('flex-1 relative overflow-auto bg-slate-50/30')},
  {className:'course-ide-token',match:exact('flex flex-col items-center justify-end mx-[2px] group relative shrink-0')},
  {className:'course-ide-token-code',match:text=>text.includes('font-mono text-2xl md:text-3xl font-bold leading-none')&&text.includes('group-hover:scale-110')},
  {className:'course-ide-token-meaning',match:text=>text.includes('mt-3 px-3 py-1.5 rounded-xl text-xl md:text-2xl font-bold tracking-wide')},
  {className:'course-ide-output',match:exact('mt-4 rounded-[2rem] overflow-hidden shadow-xl border-4 border-slate-100 bg-white animate-fade-in')},
 ]);

 const cssPath=path.join(root,'src','original','components','course-layout.css');
 const css=fs.readFileSync(cssPath,'utf8');
 assert(css.includes('.course-viewport')&&css.includes('.course-canvas'),'Shared layout stylesheet is not ready');
 return {ranges,css,metadata:{autoFitSource:'src/original/components/AutoFitScale.tsx',autoFitSourceSha256:hash(autoFitSource),autoFitAdapterSha256:hash(replacement),
  stylesheetSource:'src/original/components/course-layout.css',stylesheetSha256:hash(css),strategy:'Reuse the shared measured AutoFit component and layout stylesheet; add only guarded component class names. No course data, code examples, AI behavior or narration assets are rewritten.'}};
}

/** Apply disjoint, explicitly named ranges and prove every other byte stayed. */
export function applyGuardedPatches(originalText,ranges){
 const ordered=ranges.toSorted((a,b)=>a.start-b.start);
 const unchangedBundleSegments=[],guardedBundleRanges=[];
 let cursor=0,patched='';
 for(const range of ordered){
  assert(Number.isInteger(range.start)&&Number.isInteger(range.end)&&range.start>=cursor&&range.end>range.start&&range.end<=originalText.length&&typeof range.replacement==='string','Overlapping or invalid patch ranges');
  const unchanged=originalText.slice(cursor,range.start);
  unchangedBundleSegments.push({start:cursor,end:range.start,sha256:hash(unchanged)});
  guardedBundleRanges.push({label:range.label,kind:range.kind,start:range.start,end:range.end,originalSha256:hash(originalText.slice(range.start,range.end)),replacementSha256:hash(range.replacement)});
  patched+=unchanged+range.replacement;cursor=range.end;
 }
 const unchanged=originalText.slice(cursor);patched+=unchanged;
 unchangedBundleSegments.push({start:cursor,end:originalText.length,sha256:hash(unchanged)});
 let originalCursor=0,patchedCursor=0;
 for(const range of ordered){
  const length=range.start-originalCursor;
  assert.equal(patched.slice(patchedCursor,patchedCursor+length),originalText.slice(originalCursor,range.start));
  patchedCursor+=length;
  assert.equal(patched.slice(patchedCursor,patchedCursor+range.replacement.length),range.replacement);
  patchedCursor+=range.replacement.length;originalCursor=range.end;
 }
 assert.equal(patched.slice(patchedCursor),originalText.slice(originalCursor));
 return {patched,guardedBundleRanges,unchangedBundleSegments};
}
