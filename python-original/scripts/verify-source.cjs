/** Parse/source integrity checks only. Does not install dependencies, build or launch the application. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const ts=require('typescript');
const root=path.resolve(__dirname,'..'),files=[];
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function walk(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){if(['node_modules','dist','dist-electron','build','.git'].includes(entry.name))continue;const file=path.join(directory,entry.name);if(entry.isDirectory())walk(file);else files.push(file);}}
walk(root);
const errors=[],parsed=[],imports=[],pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
for(const file of files){
 if(!/\.(?:tsx?|js|cjs)$/.test(file))continue;
 const relative=path.relative(root,file).replaceAll('\\','/'),text=fs.readFileSync(file,'utf8');
 const source=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:/\.c?js$/.test(file)?ts.ScriptKind.JS:ts.ScriptKind.TS);
 for(const error of source.parseDiagnostics)errors.push({file:relative,code:error.code,message:ts.flattenDiagnosticMessageText(error.messageText,' ')});
 parsed.push(relative);
 function visit(node){
  if(ts.isImportDeclaration(node)&&ts.isStringLiteral(node.moduleSpecifier)){
   const value=node.moduleSpecifier.text;
   if(value.startsWith('.')){
    const base=path.resolve(path.dirname(file),value),found=['','.ts','.tsx','.js','.json','/index.ts','/index.tsx'].some(suffix=>fs.existsSync(base+suffix));
    if(!found)errors.push({file:relative,category:'missing-relative-import'});imports.push({file:relative,resolved:found});
   }else{
    const name=value.startsWith('@')?value.split('/').slice(0,2).join('/'):value.split('/')[0];
    if(!['path','node:path'].includes(name)&&!pkg.dependencies?.[name]&&!pkg.devDependencies?.[name])errors.push({file:relative,category:'undeclared-package',package:name});
   }
  }ts.forEachChild(node,visit);
 }visit(source);
}
const check=(condition,message)=>{if(!condition)errors.push({category:'entry',message});};
check(pkg.scripts.start==='vite','start entry');
check(pkg.scripts['electron:dev'].includes('http://localhost:9001'),'wait-on port');
check(fs.readFileSync(path.join(root,'electron/main.js'),'utf8').includes("loadURL('http://localhost:9001')"),'electron port');
check(fs.existsSync(path.join(root,pkg.main)),'Electron entry exists');
check(fs.existsSync(path.join(root,pkg.build.win.icon)),'Icon exists');
check(fs.readFileSync(path.join(root,'vite.config.ts'),'utf8').includes('port: 9001'),'Vite port');
check(fs.existsSync(path.join(root,'index.tsx')),'Browser entry exists');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'source-manifest.json'),'utf8'));
for(const row of manifest.files)check(hash(fs.readFileSync(path.join(root,row.path)))===row.sha256,'Copied source SHA: '+row.path);
const report={schemaVersion:1,ok:errors.length===0,typescript:ts.version,
 scope:'TypeScript/JavaScript parse diagnostics, relative import existence, declared external import names, package/dev/icon entry consistency and copied-file SHA only. No dependency install, build, runtime or installer test.',
 parsedFiles:parsed.length,relativeImports:imports.length,sourceFilesVerified:manifest.files.length,unchangedSourceFiles:manifest.byteIdenticalFiles,
 omittedAudioFiles:manifest.omittedAudioFiles,secretValuesPrinted:false,buildExecuted:false,errors};
fs.writeFileSync(path.join(root,'prepare-validation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));if(!report.ok)process.exitCode=1;
