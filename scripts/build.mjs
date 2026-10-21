import fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {build as viteBuild} from 'vite';
import {createPackage} from '@electron/asar';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const PRODUCTS=JSON.parse(await fs.readFile(path.join(ROOT,'products.json'),'utf8'));
const language=process.argv[2];
if(!PRODUCTS[language])throw new Error('Usage: node scripts/build.mjs c|cpp [--stage-only|--refresh-ui|--installer-only]');
const product=PRODUCTS[language];
const refreshUi=process.argv.includes('--refresh-ui');
const stageOnly=process.argv.includes('--stage-only')||refreshUi;
async function firstAvailable(candidates){for(const candidate of candidates){try{await fs.access(candidate);return candidate;}catch{}}return candidates[0];}
const runtimeRoot=process.env.LEARNING_ELECTRON_RUNTIME||await firstAvailable([path.join(ROOT,'vendor','electron-runtime'),'E:\\knowledge\\ai-repair\\像学习语文一样学习编程-AI版']);
const nsis=process.env.LEARNING_NSIS||await firstAvailable([path.join(ROOT,'vendor','nsis','makensis.exe'),'E:\\knowledge\\ai-repair\\tools\\nsis-3.13\\nsis-3.13\\makensis.exe']);
const bundledPython='C:\\Users\\27459\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe';
const python=process.env.LEARNING_PYTHON||await fs.access(bundledPython).then(()=>bundledPython,()=> 'python');
const work=path.join(ROOT,'build',language);
const appRoot=path.join(work,'application');
const asarRoot=path.join(work,'asar-source');
const dist=path.join(asarRoot,'dist');
const releases=path.join(ROOT,'releases');
const icon=path.join(ROOT,'build','icons',language,'app-icon.ico');
const compilerSource=path.join(ROOT,'vendor','compiler');
const setup=path.join(releases,`${product.name} Setup ${product.version}.exe`);
const pendingSetup=path.join(work,'setup-pending.exe');
const excludedCompilerRoots=new Set(['aarch64-w64-mingw32','armv7-w64-mingw32','i686-w64-mingw32']);

function command(executable,args){return new Promise((resolve,reject)=>{const child=spawn(executable,args,{cwd:ROOT,shell:false,windowsHide:true,stdio:'inherit'});child.once('error',reject);child.once('close',code=>code===0?resolve():reject(new Error(`${path.basename(executable)} exited ${code}`)));});}
async function buildInstaller(){
  await command(nsis,['/V2',path.join(work,'installer.nsi')]);
  await fs.rename(pendingSetup,setup);
  console.log(`Created ${setup} (${((await fs.stat(setup)).size/1024/1024).toFixed(1)} MiB).`);
}
function assertBuildPath(target){const resolved=path.resolve(target);const buildRoot=path.join(ROOT,'build')+path.sep;if(!resolved.startsWith(buildRoot))throw new Error(`Unsafe build output: ${resolved}`);return resolved;}
function quoted(value){return '"'+String(value).replaceAll('$','$$').replaceAll('"','$\\"')+'"';}
function nsisRelative(value){return value.split(path.sep).join('\\');}
async function filesIn(directory,prefix=''){const files=[];for(const entry of await fs.readdir(directory,{withFileTypes:true})){const relative=path.join(prefix,entry.name);if(entry.isDirectory())files.push(...await filesIn(path.join(directory,entry.name),relative));else files.push(relative);}return files.sort();}
async function hashFile(file){const digest=createHash('sha256');for await(const chunk of createReadStream(file))digest.update(chunk);return digest.digest('hex');}

function installerScript(files){
  const directories=[...new Set(files.flatMap(file=>{const parts=file.split(path.sep);return parts.slice(0,-1).map((_,index)=>parts.slice(0,index+1).join('\\'));}))].sort((a,b)=>b.split('\\').length-a.split('\\').length||b.localeCompare(a));
  const appKey=`Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${product.appId}`;
  const menu=product.name;
  const q=quoted;
  const lines=[
    'Unicode true','!include "MUI2.nsh"','!include "FileFunc.nsh"','!include "LogicLib.nsh"',
    `Name ${q(product.name)}`,`OutFile ${q(pendingSetup)}`,`InstallDir "$LOCALAPPDATA\\Programs\\${product.installDirectory}"`,
    'RequestExecutionLevel user','SetCompressor zlib','ShowInstDetails show','ShowUninstDetails show',
    `!define MUI_ICON ${q(icon)}`,`!define MUI_UNICON ${q(icon)}`,'!define MUI_ABORTWARNING',
    '!insertmacro MUI_PAGE_WELCOME','!insertmacro MUI_PAGE_DIRECTORY','!insertmacro MUI_PAGE_INSTFILES','!insertmacro MUI_PAGE_FINISH',
    '!insertmacro MUI_UNPAGE_CONFIRM','!insertmacro MUI_UNPAGE_INSTFILES','!insertmacro MUI_LANGUAGE "SimpChinese"',
    `VIProductVersion "${product.version}.0"`,`VIAddVersionKey /LANG=2052 "ProductName" ${q(product.name)}`,
    `VIAddVersionKey /LANG=2052 "FileDescription" ${q(product.name+' 安装程序')}`,`VIAddVersionKey /LANG=2052 "FileVersion" "${product.version}.0"`,
    `VIAddVersionKey /LANG=2052 "ProductVersion" "${product.version}"`,'VIAddVersionKey /LANG=2052 "LegalCopyright" ""',
    'Var TestMode','Function .onInit',' SetShellVarContext current',' ${GetParameters} $0',' ClearErrors',' ${GetOptions} $0 "/TEST" $1',' ${IfNot} ${Errors}','  StrCpy $TestMode "1"',' ${EndIf}','FunctionEnd',
    'Section "主程序" SEC_MAIN',' SetOutPath "$INSTDIR"',' SetOverwrite on',` File /r ${q(appRoot+'\\*.*')}`,
    ' WriteUninstaller "$INSTDIR\\Uninstall.exe"',' ${If} $TestMode == "1"','  WriteINIStr "$INSTDIR\\setup-test.ini" "Setup" "TestMode" "1"',' ${Else}',
    `  CreateShortCut "$DESKTOP\\${menu}.lnk" "$INSTDIR\\${product.executable}" "" "$INSTDIR\\resources\\app-icon.ico" 0`,
    `  CreateDirectory "$SMPROGRAMS\\${menu}"`,`  CreateShortCut "$SMPROGRAMS\\${menu}\\${menu}.lnk" "$INSTDIR\\${product.executable}" "" "$INSTDIR\\resources\\app-icon.ico" 0`,
    `  CreateShortCut "$SMPROGRAMS\\${menu}\\卸载.lnk" "$INSTDIR\\Uninstall.exe"`,
    `  WriteRegStr HKCU ${q(appKey)} "DisplayName" ${q(product.name)}`,`  WriteRegStr HKCU ${q(appKey)} "DisplayVersion" "${product.version}"`,
    `  WriteRegStr HKCU ${q(appKey)} "Publisher" "语文式编程学习"`,
    `  WriteRegStr HKCU ${q(appKey)} "DisplayIcon" "$INSTDIR\\${product.executable},0"`,
    `  WriteRegStr HKCU ${q(appKey)} "InstallLocation" "$INSTDIR"`,
    `  WriteRegStr HKCU ${q(appKey)} "UninstallString" '"$INSTDIR\\Uninstall.exe"'`,
    `  WriteRegDWORD HKCU ${q(appKey)} "NoModify" 1`,`  WriteRegDWORD HKCU ${q(appKey)} "NoRepair" 1`,
    ' ${EndIf}','SectionEnd',
    'Function un.onInit',' SetShellVarContext current',' ReadINIStr $TestMode "$INSTDIR\\setup-test.ini" "Setup" "TestMode"','FunctionEnd',
    'Section "Uninstall"',
    ...files.map(file=>` Delete "$INSTDIR\\${nsisRelative(file)}"`),
    ' Delete "$INSTDIR\\Uninstall.exe"',' Delete "$INSTDIR\\setup-test.ini"',...directories.map(directory=>` RMDir "$INSTDIR\\${directory}"`),' RMDir "$INSTDIR"',' ${If} $TestMode != "1"',
    ` Delete "$DESKTOP\\${menu}.lnk"`,` Delete "$SMPROGRAMS\\${menu}\\${menu}.lnk"`,` Delete "$SMPROGRAMS\\${menu}\\卸载.lnk"`,` RMDir "$SMPROGRAMS\\${menu}"`,
    ` DeleteRegKey HKCU ${q(appKey)}`,' ${EndIf}','SectionEnd','',
  ];
  return '\uFEFF'+lines.join('\r\n');
}

if(process.argv.includes('--installer-only')){
  await fs.access(path.join(work,'installer.nsi'));
  await buildInstaller();
  process.exit(0);
}
await fs.access(path.join(ROOT,'electron','ai-config.json'));
await fs.access(path.join(compilerSource,'bin','x86_64-w64-mingw32-clang.exe'));
await fs.mkdir(releases,{recursive:true});
await fs.mkdir(path.join(ROOT,'build'),{recursive:true});
await command(python,[path.join(ROOT,'scripts','make-icons.py')]);
if(refreshUi){
  await fs.access(path.join(appRoot,product.executable));
  await fs.access(path.join(appRoot,'resources','compiler','bin','x86_64-w64-mingw32-clang.exe'));
  await fs.rm(assertBuildPath(asarRoot),{recursive:true,force:true});
}else await fs.rm(assertBuildPath(work),{recursive:true,force:true});
await fs.mkdir(path.join(appRoot,'resources'),{recursive:true});
await fs.mkdir(path.join(asarRoot,'electron'),{recursive:true});
process.env.LEARNING_LANGUAGE=language;
process.env.LEARNING_OUT_DIR=dist;
await viteBuild({root:ROOT});

if(!refreshUi){
  const runtimeEntries=await fs.readdir(runtimeRoot,{withFileTypes:true});
  for(const entry of runtimeEntries){
    if(entry.name==='resources'||entry.name==='使用说明.txt'||entry.name.toLowerCase().startsWith('uninstall'))continue;
    if(entry.name.endsWith('.exe')){
      if(entry.name==='像学习语文一样学习编程.exe')await fs.copyFile(path.join(runtimeRoot,entry.name),path.join(appRoot,product.executable));
      continue;
    }
    await fs.cp(path.join(runtimeRoot,entry.name),path.join(appRoot,entry.name),{recursive:true});
  }
}
await fs.access(path.join(appRoot,product.executable));
for(const name of ['main.cjs','preload.cjs','runtime.cjs','ai.cjs','ai-config.json'])await fs.copyFile(path.join(ROOT,'electron',name),path.join(asarRoot,'electron',name));
const publicProduct=Object.fromEntries(['language','name','appId','version','color'].map(key=>[key,product[key]]));
await fs.writeFile(path.join(asarRoot,'electron','product.json'),JSON.stringify(publicProduct,null,2));
await fs.writeFile(path.join(asarRoot,'package.json'),JSON.stringify({name:product.installDirectory,version:product.version,description:product.name,main:'electron/main.cjs',private:true},null,2));
await createPackage(asarRoot,path.join(appRoot,'resources','app.asar'));
await fs.copyFile(icon,path.join(appRoot,'resources','app-icon.ico'));
if(!refreshUi){
  await fs.cp(compilerSource,path.join(appRoot,'resources','compiler'),{recursive:true,filter:source=>!excludedCompilerRoots.has(path.relative(compilerSource,source).split(path.sep)[0])});
}
await command(python,[path.join(ROOT,'scripts','make-icons.py'),'--patch-exe',path.join(appRoot,product.executable),'--icon',icon,'--product-language',language]);
await fs.writeFile(path.join(appRoot,'使用说明.txt'),`${product.name} ${product.version}\r\n\r\n双击“${product.executable}”开始学习。\r\n学习课程与编译运行可离线使用；AI 助教需要联网。\r\n代码运行使用内置 LLVM-MinGW，支持交互输入、发送 EOF 与停止。\r\nCtrl+- 缩小，Ctrl+= 放大，Ctrl+0 恢复，F11 全屏。\r\n请只运行自己理解和信任的代码；源码另存后保管。\r\n\r\n本应用基于原 Python 教学项目的教学形式改造。第三方许可见同目录 LICENSE 文件和 resources/compiler/LICENSE.TXT。\r\n`,'utf8');
const files=await filesIn(appRoot);
const manifest=[];
for(const relative of files){const absolute=path.join(appRoot,relative);manifest.push({path:relative.split(path.sep).join('/'),size:(await fs.stat(absolute)).size,sha256:await hashFile(absolute)});}
await fs.writeFile(path.join(releases,`${language}-${product.version}-manifest.json`),JSON.stringify({product:publicProduct,compiler:'LLVM-MinGW 20261006 UCRT x86_64',files:manifest},null,2));
await fs.writeFile(path.join(work,'installer.nsi'),installerScript(files),'utf8');
console.log(`Staged ${product.name}: ${files.length} files, ${(manifest.reduce((sum,file)=>sum+file.size,0)/1024/1024).toFixed(1)} MiB.`);
if(!stageOnly)await buildInstaller();
else console.log(`Stage-only: ${appRoot}`);
