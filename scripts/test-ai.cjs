const {requestAi}=require('../electron/ai.cjs');
const {RuntimeRunner}=require('../electron/runtime.cjs');
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const results=[];
 for(const language of ['c','cpp']){
  const sample=language==='c'?'#include <stdio.h>\nint main(void){printf("3\\n");return 0;}':'#include <iostream>\nint main(){std::cout<<3<<"\\n";}';
  const chat=await requestAi(language,{mode:'chat',code:sample,message:'用一句中文解释 main 的作用，不超过40字。'});assert(chat.content.length>3);
  const explanation=JSON.parse((await requestAi(language,{mode:'explain',code:sample})).content);assert(Object.keys(explanation.meanings).length>0);
  const generated=JSON.parse((await requestAi(language,{mode:'generate',message:'写最简单的完整程序，只输出数字3和一个换行，不读取输入，不添加其他输出。'})).content);assert(generated.code);
  let stdout='',ended;const done=new Promise(r=>ended=r);let failure;
  const runner=new RuntimeRunner({compilerRoot:path.join(root,'vendor/compiler'),language,onEvent:event=>{if(event.type==='stdout')stdout+=event.text;if(['error','compile-error'].includes(event.type))failure=event.text;if(['exit','error','compile-error'].includes(event.type))ended(event)}});
  const {runId}=runner.createRun(generated.code);const work=runner.start(runId);await done;await work;await runner.dispose();assert(!failure,failure);assert.equal(stdout.trim(),'3');
  results.push({language,model:'deepseek-flash',chat:true,meanings:true,generatedCodeCompiled:true});console.log(language+': live AI chat, word explanation, generated code + real compilation passed');
 }
 fs.mkdirSync(path.join(root,'test-results'),{recursive:true});fs.writeFileSync(path.join(root,'test-results/ai-verification.json'),JSON.stringify({verifiedAt:new Date().toISOString(),results},null,2));
})().catch(error=>{console.error(error.message);process.exit(1)});
