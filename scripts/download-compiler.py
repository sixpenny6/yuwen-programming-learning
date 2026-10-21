from pathlib import Path
import urllib.request,zipfile,json,hashlib,time
root=Path(__file__).resolve().parents[1]
vendor=root/'vendor';vendor.mkdir(exist_ok=True)
url='https://github.com/mstorsjo/llvm-mingw/releases/download/20261006/llvm-mingw-20261006-ucrt-x86_64.zip'
archive=vendor/'llvm-mingw-20261006-ucrt-x86_64.zip'
expected='317492c456aa27ee607a5919f1d2d38dcdc1112516a24d0bf4b00d078f52d17a'
target=vendor/'compiler'
if (target/'bin/x86_64-w64-mingw32-clang.exe').exists():
 print('Compiler already prepared:',target,flush=True)
 raise SystemExit(0)
with urllib.request.urlopen(url,timeout=60) as response,archive.open('wb') as output:
 total=int(response.headers.get('Content-Length',0));read=0;last=time.monotonic()
 while block:=response.read(1024*1024):
  output.write(block);read+=len(block)
  if time.monotonic()-last>12:print('Compiler download:',round(read/1048576,1),'MB /',round(total/1048576,1),'MB',flush=True);last=time.monotonic()
print('Download complete',archive.stat().st_size,flush=True)
digest=hashlib.sha256(archive.read_bytes()).hexdigest()
if digest!=expected:raise RuntimeError('Compiler archive SHA-256 mismatch')
with zipfile.ZipFile(archive) as z:
 top=z.namelist()[0].split('/')[0]
 for entry in z.infolist():
  if not (vendor/entry.filename).resolve().is_relative_to(vendor.resolve()):raise RuntimeError('Unsafe archive path')
 z.extractall(vendor)
folder=vendor/top
if folder!=target:folder.rename(target)
manifest={'version':'20261006','source':url,'sha256':digest}
(vendor/'compiler-manifest.json').write_text(json.dumps(manifest,indent=2))
print('Compiler ready:',target,flush=True)
