const {_electron:electron}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),products=require('../products.json');
const report=[];
async function testLanguage(language){
 const product=products[language],out=path.join(root,'test-results','original-ui');fs.mkdirSync(out,{recursive:true});
 const app=await electron.launch({executablePath:path.join(root,'build',language,'application',product.executable),args:['--user-data-dir='+path.join(out,'profile-'+language)],timeout:30000});
 try{
  const page=await app.firstWindow(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.context().route(/^https?:/,route=>route.abort());
  const base=page.url().split('?')[0];
  await page.locator('.app-footer').waitFor();
  assert((await page.locator('.app-footer').innerText()).includes('共 153 页'));
  assert((await page.locator('.app-header').innerText()).includes(language==='c'?'C':'C++'));
  for(const [width,height] of [[1400,1000],[1000,700],[760,540],[1920,1080]]){
    await app.evaluate(({BrowserWindow},size)=>BrowserWindow.getAllWindows()[0].setSize(...size),[width,height]);
    for(const number of [1,4,5,6,7,20,21,62,74,75,114,140,152]){
      await page.goto(base+'?page='+number);await page.locator('.app-footer').waitFor();await page.waitForTimeout(100);
      const geometry=await page.evaluate(()=>{const size={width:innerWidth,height:innerHeight};for(const selector of ['.app-header','.app-footer','main']){const r=document.querySelector(selector).getBoundingClientRect();size[selector]={x:r.x,y:r.y,right:r.right,bottom:r.bottom};}return size;});
      assert(geometry['.app-footer'].bottom<=geometry.height+1);assert(geometry['main'].right<=geometry.width+1);
      assert(!/Python|Pyodide|my_code\.py/.test(await page.locator('body').innerText()),'visible Python remnant page '+number);
      if(width===1400||((number===4||number===20||number===152)&&width===760)){await page.waitForTimeout(700);await page.screenshot({path:path.join(out,`${language}-${width}x${height}-page-${number}.png`)});}
    }
  }
  await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].setSize(1400,1000));
  // Every page from the original catalogue is independently mountable offline.
  for(let number=1;number<=153;number++){
   await page.goto(base+'?page='+number);await page.locator('.app-footer').waitFor();
   assert((await page.locator('.app-footer').innerText()).includes('第 '+number+' 页'));
   assert((await page.locator('main').innerText()).trim().length>0,'empty page '+number);
  }
  // Preserve lecture, three-step purpose and quiz interaction.
  await page.goto(base+'?page=20');await page.getByRole('button',{name:'下一步 ➡',exact:true}).click();
  await page.getByRole('button',{name:'下一步 ➡',exact:true}).click();
  await page.goto(base+'?page=21');await page.getByRole('button',{name:/下一步/}).first().click();
  await page.goto(base+'?page=8');await page.locator('main button').first().click();
  await page.goto(base+'?page=152');await page.getByRole('button',{name:/运行代码/}).click();
  await page.getByText('退出状态：0',{exact:true}).waitFor({timeout:30000});
  assert((await page.locator('main pre').innerText()).includes('太贵了'));
  await page.getByRole('button',{name:/运行代码/}).click();await page.getByText('退出状态：0',{exact:true}).waitFor({timeout:30000});
  // Use the original editor and output input box, including two separate Enter submissions.
  await page.getByRole('button',{name:/手动修改代码/}).click();
  const inputSource=language==='c'?'#include <stdio.h>\nint main(void){int a,b;printf("第一个数：");if(scanf("%d",&a)!=1)return 1;printf("第二个数：");if(scanf("%d",&b)!=1)return 1;printf("总计=%d\\n",a+b);return 0;}':'#include <iostream>\nint main(){int a,b;std::cout<<"第一个数：";if(!(std::cin>>a))return 1;std::cout<<"第二个数：";if(!(std::cin>>b))return 1;std::cout<<"总计="<<a+b<<"\\n";return 0;}';
  await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(inputSource);
  await page.getByRole('button',{name:/返回阅读模式/}).click();
  await page.getByRole('button',{name:/运行代码/}).click();
  const stdin=page.getByPlaceholder('请输入内容后按回车...');await stdin.waitFor({timeout:30000});await stdin.fill('3');await stdin.press('Enter');
  await page.waitForFunction(()=>document.querySelector('main pre')?.textContent.includes('第二个数：'));
  await stdin.fill('4');await stdin.press('Enter');await page.getByText('退出状态：0',{exact:true}).waitFor({timeout:30000});
  assert((await page.locator('main pre').innerText()).includes('总计=7'));
  await page.getByRole('button',{name:/手动修改代码/}).click();await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText('int main(void){for(;;){}}');
  await page.getByRole('button',{name:/返回阅读模式/}).click();await page.getByRole('button',{name:/运行代码/}).click();await stdin.waitFor({timeout:30000});await page.getByRole('button',{name:/停止运行/}).click();await page.getByText('已停止运行',{exact:false}).waitFor({timeout:30000});
  // CDP keyboard events bypass Electron native accelerators; exercise its native input API.
  await app.evaluate(({BrowserWindow})=>{const c=BrowserWindow.getAllWindows()[0].webContents;c.sendInputEvent({type:'keyDown',keyCode:'-',modifiers:['control']});c.sendInputEvent({type:'keyUp',keyCode:'-',modifiers:['control']});});
  assert((await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].webContents.getZoomLevel()))<0);
  await app.evaluate(({BrowserWindow})=>{const c=BrowserWindow.getAllWindows()[0].webContents;c.sendInputEvent({type:'keyDown',keyCode:'0',modifiers:['control']});c.sendInputEvent({type:'keyUp',keyCode:'0',modifiers:['control']});});
  // Exercise stdin and compile failures through the same restricted renderer API.
  const runtime=await page.evaluate(async(language)=>{
   async function run(source,inputs=[]){return await new Promise(async(resolve,reject)=>{let output='',error='',id=null,queue=[];const timer=setTimeout(()=>{off();reject(new Error('runner timeout'));},35000);const apply=event=>{if(event.runId!==id)return;if(event.type==='stdout')output+=event.text;if(event.type==='running')inputs.forEach(input=>window.learning.writeInput(id,input+'\n'));if(event.type==='compile-error')error=event.text;if(['exit','error','stopped'].includes(event.type)||event.type==='compile-error'){clearTimeout(timer);off();resolve({output,error,type:event.type,code:event.code});}};const off=window.learning.onRunnerEvent(event=>id?apply(event):queue.push(event));try{const r=await window.learning.run(source);id=r.runId;queue.forEach(apply);}catch(e){clearTimeout(timer);off();reject(e);}});}
   const io=language==='c'?'#include <stdio.h>\nint main(void){int a,b; printf("输入："); if(scanf("%d",&a)!=1)return 1;printf("再次输入："); if(scanf("%d",&b)!=1)return 1;printf("合计=%d\\n",a+b);return 0;}':'#include <iostream>\nint main(){int a,b; std::cout<<"输入：";if(!(std::cin>>a))return 1;std::cout<<"再次输入：";if(!(std::cin>>b))return 1;std::cout<<"合计="<<a+b<<"\\n";return 0;}';
   return {input:await run(io,['3','4']),compile:await run('int main( {')};
  },language);
  assert.equal(runtime.input.code,0);assert(runtime.input.output.includes('合计=7'));assert(runtime.compile.error.length>0);
  assert.deepEqual(errors,[]);
  report.push({language,pages:153,resolutions:4,offline:true,defaultProgram:true,multipleInput:true,inputViaOriginalUi:true,stopViaOriginalUi:true,compileError:true,zoomShortcut:true,consoleErrors:errors});
 }finally{await app.close();}
}
(async()=>{for(const language of process.argv[2]?[process.argv[2]]:['c','cpp'])await testLanguage(language);fs.writeFileSync(path.join(root,'test-results','original-ui.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));})().catch(e=>{console.error(e);process.exitCode=1;});
