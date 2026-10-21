"""Draw the shared book/code icon with a C or C++ badge; optionally brand an EXE."""
from pathlib import Path
import argparse
import ctypes
from ctypes import wintypes
import struct
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'build' / 'icons'


def make_icon(language):
    label = 'C' if language == 'c' else 'C++'
    background = ('#123b78', '#0c234a') if language == 'c' else ('#873508', '#47200b')
    accent = '#72d8ff' if language == 'c' else '#ffd580'
    badge = '#2563eb' if language == 'c' else '#ea580c'
    folder = OUTPUT / language
    folder.mkdir(parents=True, exist_ok=True)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs><linearGradient id="bg" x2="0.9" y2="1"><stop stop-color="{background[0]}"/><stop offset="1" stop-color="{background[1]}"/></linearGradient></defs>
<rect x="16" y="16" width="480" height="480" rx="112" fill="url(#bg)"/>
<path d="M84 125 Q164 95 247 137 L247 350 Q165 310 84 335Z" fill="#f5f7ff"/>
<path d="M265 137 Q348 95 428 125 L428 335 Q347 310 265 350Z" fill="{accent}"/>
<path d="M183 190 L140 233 L183 276 M329 190 L372 233 L329 276" fill="none" stroke="{background[1]}" stroke-width="23" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M273 188 L239 278" stroke="{background[1]}" stroke-width="18" stroke-linecap="round"/>
<rect x="132" y="355" width="248" height="114" rx="35" fill="{badge}" stroke="#ffffff" stroke-width="7"/>
<text x="256" y="438" text-anchor="middle" font-family="Arial,sans-serif" font-size="89" font-weight="bold" fill="white">{label}</text>
</svg>'''
    (folder / 'app-icon.svg').write_text(svg, encoding='utf-8')
    scale = 3
    def coords(values): return tuple(round(value * scale) for value in values)
    canvas = Image.new('RGBA', (512 * scale, 512 * scale))
    gradient = Image.new('RGBA', canvas.size)
    gd = ImageDraw.Draw(gradient)
    start = tuple(bytes.fromhex(background[0][1:])); end = tuple(bytes.fromhex(background[1][1:]))
    for y in range(512 * scale):
        ratio = y / (512 * scale - 1)
        color = tuple(round(a + (b - a) * ratio) for a, b in zip(start, end)) + (255,)
        gd.line((0, y, 512 * scale, y), fill=color)
    mask = Image.new('L', canvas.size)
    ImageDraw.Draw(mask).rounded_rectangle(coords((16, 16, 496, 496)), radius=112 * scale, fill=255)
    canvas.paste(gradient, (0, 0), mask)
    draw = ImageDraw.Draw(canvas)
    draw.polygon([coords(point) for point in [(84,125),(125,114),(166,113),(207,123),(247,137),(247,350),(207,334),(166,326),(125,326),(84,335)]], fill='#f5f7ff')
    draw.polygon([coords(point) for point in [(265,137),(306,123),(347,113),(388,114),(428,125),(428,335),(388,326),(347,326),(306,334),(265,350)]], fill=accent)
    for points in [[(183,190),(140,233),(183,276)],[(329,190),(372,233),(329,276)]]:
        draw.line([coords(point) for point in points], fill=background[1], width=23 * scale, joint='curve')
        for x,y in [points[0],points[-1]]:draw.ellipse(coords((x-11.5,y-11.5,x+11.5,y+11.5)),fill=background[1])
    draw.line(coords((273,188,239,278)),fill=background[1],width=18*scale)
    draw.rounded_rectangle(coords((132,355,380,469)),radius=35*scale,fill=badge,outline='white',width=7*scale)
    font = ImageFont.truetype(str(Path('C:/Windows/Fonts/arialbd.ttf')), 89 * scale)
    box = draw.textbbox((0,0), label, font=font)
    draw.text((256*scale-(box[2]-box[0])/2, 412*scale-(box[3]-box[1])/2-box[1]), label, font=font, fill='white')
    canvas = canvas.resize((512,512),Image.Resampling.LANCZOS)
    canvas.save(folder/'app-icon.png')
    canvas.save(folder/'app-icon.ico',sizes=[(s,s) for s in (16,24,32,48,64,128,256)])
    return folder/'app-icon.ico'


def patch_executable(executable, icon_path):
    kernel = ctypes.WinDLL('kernel32', use_last_error=True)
    kernel.LoadLibraryExW.argtypes = [wintypes.LPCWSTR,wintypes.HANDLE,wintypes.DWORD]
    kernel.LoadLibraryExW.restype = wintypes.HMODULE
    kernel.FreeLibrary.argtypes = [wintypes.HMODULE]
    name_callback_type = ctypes.WINFUNCTYPE(wintypes.BOOL,wintypes.HMODULE,ctypes.c_void_p,ctypes.c_void_p,wintypes.LPARAM)
    language_callback_type = ctypes.WINFUNCTYPE(wintypes.BOOL,wintypes.HMODULE,ctypes.c_void_p,ctypes.c_void_p,wintypes.WORD,wintypes.LPARAM)
    kernel.EnumResourceNamesW.argtypes = [wintypes.HMODULE,ctypes.c_void_p,name_callback_type,wintypes.LPARAM]
    kernel.EnumResourceLanguagesW.argtypes = [wintypes.HMODULE,ctypes.c_void_p,ctypes.c_void_p,language_callback_type,wintypes.LPARAM]
    kernel.BeginUpdateResourceW.argtypes = [wintypes.LPCWSTR,wintypes.BOOL]
    kernel.BeginUpdateResourceW.restype = wintypes.HANDLE
    kernel.UpdateResourceW.argtypes = [wintypes.HANDLE,ctypes.c_void_p,ctypes.c_void_p,wintypes.WORD,ctypes.c_void_p,wintypes.DWORD]
    kernel.EndUpdateResourceW.argtypes = [wintypes.HANDLE,wintypes.BOOL]
    groups = []
    @name_callback_type
    def collect(module, kind, name, param):
        identifier = name if name <= 65535 else ctypes.wstring_at(name)
        @language_callback_type
        def language_collector(handle, typ, resource_name, language, ignored):
            groups.append((identifier, language)); return True
        kernel.EnumResourceLanguagesW(module, kind, name, language_collector, 0)
        return True
    module = kernel.LoadLibraryExW(str(executable),None,2)
    if not module: raise ctypes.WinError(ctypes.get_last_error())
    kernel.EnumResourceNamesW(module,14,collect,0)
    kernel.FreeLibrary(module)
    raw = icon_path.read_bytes()
    count = struct.unpack_from('<H',raw,4)[0]
    group = bytearray(raw[:6]); images=[]
    for i in range(count):
        offset=6+i*16; length,at=struct.unpack_from('<II',raw,offset+8)
        group.extend(raw[offset:offset+12]+struct.pack('<H',500+i))
        images.append((500+i,raw[at:at+length]))
    handle=kernel.BeginUpdateResourceW(str(executable),False)
    if not handle: raise ctypes.WinError(ctypes.get_last_error())
    try:
        for language in {language for _,language in groups} or {1033}:
            for identifier,data in images:
                buffer=ctypes.create_string_buffer(data)
                if not kernel.UpdateResourceW(handle,3,identifier,language,buffer,len(data)):raise ctypes.WinError(ctypes.get_last_error())
        for name,language in groups or [(1,1033)]:
            name_buffer=ctypes.create_unicode_buffer(name) if isinstance(name,str) else None
            identifier=ctypes.cast(name_buffer,ctypes.c_void_p) if name_buffer else name
            buffer=ctypes.create_string_buffer(bytes(group))
            if not kernel.UpdateResourceW(handle,14,identifier,language,buffer,len(group)):raise ctypes.WinError(ctypes.get_last_error())
    except:
        kernel.EndUpdateResourceW(handle,True);raise
    if not kernel.EndUpdateResourceW(handle,False):raise ctypes.WinError(ctypes.get_last_error())


def version_block(key, value=b'', children=b'', text=False):
    encoded=(key+'\0').encode('utf-16le')
    value_length=len(value)//2 if text else len(value)
    payload=struct.pack('<HHH',0,value_length,1 if text else 0)+encoded
    payload+=b'\0'*((-len(payload))%4)
    payload+=value
    if children:
        payload+=b'\0'*((-len(payload))%4)
        payload+=children
    return struct.pack('<H',len(payload))+payload[2:]


def patch_version(executable, language):
    product=json.loads((ROOT/'products.json').read_text(encoding='utf-8'))[language]
    version=[int(part) for part in product['version'].split('.')]+[0]
    high=version[0]<<16|version[1];low=version[2]<<16|version[3]
    fixed=struct.pack('<13I',0xFEEF04BD,0x00010000,high,low,high,low,0x3f,0,0x40004,1,0,0,0)
    fields={'CompanyName':'语文式编程学习','FileDescription':product['name'],'FileVersion':product['version']+'.0','InternalName':product['installDirectory'],'OriginalFilename':product['executable'],'ProductName':product['name'],'ProductVersion':product['version']}
    strings=[]
    for key,value in fields.items():
        item=version_block(key,(value+'\0').encode('utf-16le'),text=True)
        strings.append(item+b'\0'*((-len(item))%4))
    tables=[]
    for locale in ['040904b0','080404b0']:
        table=version_block(locale,children=b''.join(strings),text=True)
        tables.append(table+b'\0'*((-len(table))%4))
    string_info=version_block('StringFileInfo',children=b''.join(tables),text=True)
    translation=version_block('Translation',struct.pack('<4H',0x0409,1200,0x0804,1200))
    variable_info=version_block('VarFileInfo',children=translation,text=True)
    children=string_info+b'\0'*((-len(string_info))%4)+variable_info
    resource=version_block('VS_VERSION_INFO',fixed,children)
    kernel=ctypes.WinDLL('kernel32',use_last_error=True)
    kernel.BeginUpdateResourceW.argtypes=[wintypes.LPCWSTR,wintypes.BOOL];kernel.BeginUpdateResourceW.restype=wintypes.HANDLE
    kernel.UpdateResourceW.argtypes=[wintypes.HANDLE,ctypes.c_void_p,ctypes.c_void_p,wintypes.WORD,ctypes.c_void_p,wintypes.DWORD]
    kernel.EndUpdateResourceW.argtypes=[wintypes.HANDLE,wintypes.BOOL]
    handle=kernel.BeginUpdateResourceW(str(executable),False)
    if not handle:raise ctypes.WinError(ctypes.get_last_error())
    try:
        for locale in [0,1033,2052]:
            buffer=ctypes.create_string_buffer(resource)
            if not kernel.UpdateResourceW(handle,16,1,locale,buffer,len(resource)):raise ctypes.WinError(ctypes.get_last_error())
    except:
        kernel.EndUpdateResourceW(handle,True);raise
    if not kernel.EndUpdateResourceW(handle,False):raise ctypes.WinError(ctypes.get_last_error())


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--patch-exe',type=Path)
    parser.add_argument('--icon',type=Path)
    parser.add_argument('--product-language',choices=['c','cpp'])
    args=parser.parse_args()
    if args.patch_exe:
        if not args.icon and not args.product_language:parser.error('--patch-exe requires --icon or --product-language')
        if args.icon:patch_executable(args.patch_exe.resolve(),args.icon.resolve())
        if args.product_language:patch_version(args.patch_exe.resolve(),args.product_language)
        print('Executable resources updated.')
    else:
        for language in ['c','cpp']:
            print(make_icon(language))
