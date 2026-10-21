const fs=require('node:fs');
const fsp=require('node:fs/promises');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const {_electron:electron}=require('playwright');
const root=path.resolve(__dirname,'..'),products=require('../products.json');
async function hash(file){const h=crypto.createHash('sha256');for await(const chunk of fs.createReadStream(file))h.update(chunk);return h.digest('hex');}
(async()=>{
 const results=[];
 for(const language of ['c','cpp']){
  const product=products[language],destination=path.join('E:\\vkk',product.installDirectory);
  const manifest=JSON.parse(await fsp.readFile(path.join(root,'releases',`${language}-${product.version}-manifest.json`),'utf8'));
  let next=0,verified=0;
  await Promise.all(Array.from({length:8},async()=>{while(next<manifest.files.length){const entry=manifest.files[next++],file=path.join(destination,entry.path);assert.equal((await fsp.stat(file)).size,entry.size,entry.path);assert.equal(await hash(file),entry.sha256,entry.path);verified++;}}));
  const app=await electron.launch({executablePath:path.join(destination,product.executable),args:['--user-data-dir='+path.join(root,'test-results','official-profile-'+language)],timeout:30000});
  try{const page=await app.firstWindow();await page.locator('.app-footer').waitFor();const info=await page.evaluate(()=>window.learning.getProduct());assert.equal(info.version,product.version);assert.equal(info.language,language);assert((await page.locator('.app-footer').innerText()).includes('共 153 页'));assert.equal(await page.title(),product.name);results.push({language,version:info.version,pages:153,directory:destination,filesVerified:verified,manifestMatched:true,launched:true,appId:info.appId});}
  finally{await app.close();}
 }
 const report={verifiedAt:new Date().toISOString(),installedForUser:true,results};await fsp.writeFile(path.join(root,'test-results','official-installation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1;});
