"""Download the pinned official Electron/NSIS build tools into vendor/."""
from pathlib import Path
import hashlib
import json
import shutil
import urllib.request
import zipfile

ROOT=Path(__file__).resolve().parent.parent
VENDOR=ROOT/'vendor'
CACHE=VENDOR/'downloads'
ELECTRON_VERSION='39.2.7'
ELECTRON_ARCHIVE=f'electron-v{ELECTRON_VERSION}-win32-x64.zip'
ELECTRON_BASE=f'https://github.com/electron/electron/releases/download/v{ELECTRON_VERSION}/'
NSIS_URL='https://github.com/tauri-apps/binary-releases/releases/download/nsis-3.13/nsis-3.13.zip'
NSIS_SHA256='ba63dffc4410ee89193e1cb5a41989991bd77c61068da17e3156d136b7b0b3d8'


def fetch(url,destination):
    request=urllib.request.Request(url,headers={'User-Agent':'yuwen-programming-build/1.0'})
    temporary=destination.with_suffix(destination.suffix+'.part')
    with urllib.request.urlopen(request,timeout=120) as response,temporary.open('wb') as output:
        shutil.copyfileobj(response,output)
    temporary.replace(destination)


def checksum(file):
    digest=hashlib.sha256()
    with file.open('rb') as stream:
        for chunk in iter(lambda:stream.read(1024*1024),b''):digest.update(chunk)
    return digest.hexdigest()


def download_checked(url,filename,expected):
    destination=CACHE/filename
    if not destination.exists() or checksum(destination)!=expected:
        print('Downloading',url)
        fetch(url,destination)
    if checksum(destination)!=expected:raise RuntimeError(f'Checksum mismatch: {filename}')
    return destination


def extract_checked(archive,destination):
    destination.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(archive) as source:
        base=destination.resolve()
        for entry in source.infolist():
            target=(base/entry.filename).resolve()
            if not target.is_relative_to(base):raise RuntimeError('Unsafe archive path')
        source.extractall(destination)


def find_nsis_root(directory):
    candidates=[file.parent for file in directory.rglob('makensis.exe') if all((file.parent/name).is_dir() for name in ['Include','Stubs','Plugins'])]
    if len(candidates)!=1:raise RuntimeError('Cannot uniquely locate the complete NSIS compiler root')
    return candidates[0]


def main():
    CACHE.mkdir(parents=True,exist_ok=True)
    checksums=CACHE/f'electron-{ELECTRON_VERSION}-SHASUMS256.txt'
    fetch(ELECTRON_BASE+'SHASUMS256.txt',checksums)
    expected=None
    for line in checksums.read_text().splitlines():
        parts=line.split()
        if len(parts)==2 and parts[1].lstrip('*')==ELECTRON_ARCHIVE:expected=parts[0].lower();break
    if not expected:raise RuntimeError('Electron archive is absent from official checksums')
    electron_archive=download_checked(ELECTRON_BASE+ELECTRON_ARCHIVE,ELECTRON_ARCHIVE,expected)
    electron=VENDOR/'electron-runtime'
    extract_checked(electron_archive,electron)
    original=electron/'electron.exe'
    if original.exists():original.replace(electron/'像学习语文一样学习编程.exe')
    nsis_archive=download_checked(NSIS_URL,'nsis-3.13.zip',NSIS_SHA256)
    staging=VENDOR/'nsis-extract'
    extract_checked(nsis_archive,staging)
    compiler_root=find_nsis_root(staging)
    nsis=VENDOR/'nsis'
    shutil.copytree(compiler_root,nsis,dirs_exist_ok=True)
    manifest={'electron':{'version':ELECTRON_VERSION,'url':ELECTRON_BASE+ELECTRON_ARCHIVE,'sha256':expected},'nsis':{'version':'3.13','url':NSIS_URL,'sha256':NSIS_SHA256}}
    (VENDOR/'build-tools-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Build tools ready:',electron,nsis)


if __name__=='__main__':main()
