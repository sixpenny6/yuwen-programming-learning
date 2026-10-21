"""Update only RT_VERSION in the private staged EXE; retain all icon bytes and other version strings."""
from pathlib import Path
import ctypes
from ctypes import wintypes
import struct
import json
import sys

ROOT = Path(__file__).resolve().parent
target = Path(sys.argv[1]).resolve()
if not target.is_relative_to((ROOT / 'build' / 'application').resolve()):
    raise ValueError('Version patch is restricted to the private application stage')
version = '1.0.5'
parts = [int(part) for part in version.split('.')] + [0]
high, low = parts[0] << 16 | parts[1], parts[2] << 16 | parts[3]
kernel = ctypes.WinDLL('kernel32', use_last_error=True)
kernel.LoadLibraryExW.argtypes = [wintypes.LPCWSTR, wintypes.HANDLE, wintypes.DWORD]
kernel.LoadLibraryExW.restype = wintypes.HMODULE
kernel.FreeLibrary.argtypes = [wintypes.HMODULE]
name_cb = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HMODULE, ctypes.c_void_p, ctypes.c_void_p, wintypes.LPARAM)
lang_cb = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HMODULE, ctypes.c_void_p, ctypes.c_void_p, wintypes.WORD, wintypes.LPARAM)
kernel.EnumResourceNamesW.argtypes = [wintypes.HMODULE, ctypes.c_void_p, name_cb, wintypes.LPARAM]
kernel.EnumResourceLanguagesW.argtypes = [wintypes.HMODULE, ctypes.c_void_p, ctypes.c_void_p, lang_cb, wintypes.LPARAM]
kernel.FindResourceExW.argtypes = [wintypes.HMODULE, ctypes.c_void_p, ctypes.c_void_p, wintypes.WORD]
kernel.FindResourceExW.restype = wintypes.HANDLE
kernel.LoadResource.argtypes = [wintypes.HMODULE, wintypes.HANDLE]
kernel.LoadResource.restype = wintypes.HANDLE
kernel.LockResource.argtypes = [wintypes.HANDLE]
kernel.LockResource.restype = ctypes.c_void_p
kernel.SizeofResource.argtypes = [wintypes.HMODULE, wintypes.HANDLE]
kernel.SizeofResource.restype = wintypes.DWORD

def resources(executable):
    module = kernel.LoadLibraryExW(str(executable), None, 2)
    if not module:
        raise ctypes.WinError(ctypes.get_last_error())
    output = {}
    try:
        for kind in [3, 14, 16]:
            @name_cb
            def collect_name(handle, typ, name, ignored):
                identifier = name if name <= 65535 else ctypes.wstring_at(name)
                @lang_cb
                def collect_language(handle, typ, name, language, ignored):
                    resource = kernel.FindResourceExW(handle, typ, name, language)
                    loaded = kernel.LoadResource(handle, resource)
                    pointer = kernel.LockResource(loaded)
                    output[(kind, identifier, language)] = ctypes.string_at(pointer, kernel.SizeofResource(handle, resource))
                    return True
                kernel.EnumResourceLanguagesW(handle, typ, name, collect_language, 0)
                return True
            kernel.EnumResourceNamesW(module, kind, collect_name, 0)
    finally:
        kernel.FreeLibrary(module)
    return output

def aligned(position):
    return (position + 3) & ~3

def parse(data, offset=0):
    length, value_length, typ = struct.unpack_from('<HHH', data, offset)
    end = offset + length
    cursor = offset + 6
    key_start = cursor
    while data[cursor:cursor+2] != b'\0\0':
        cursor += 2
    key = data[key_start:cursor].decode('utf-16le')
    cursor = aligned(cursor + 2)
    size = value_length * (2 if typ == 1 else 1)
    value = data[cursor:cursor+size]
    cursor = aligned(cursor + size)
    children = []
    while cursor + 6 <= end:
        child_length = struct.unpack_from('<H', data, cursor)[0]
        if not child_length:
            break
        children.append(parse(data, cursor))
        cursor = aligned(cursor + child_length)
    return {'key':key, 'type':typ, 'value':value, 'children':children}

def serialize(node):
    key, typ, value = node['key'], node['type'], node['value']
    if key == 'VS_VERSION_INFO':
        fields = list(struct.unpack('<13I', value))
        assert fields[0] == 0xFEEF04BD
        fields[2:6] = [high, low, high, low]
        value = struct.pack('<13I', *fields)
    elif key in ['FileVersion', 'ProductVersion']:
        value = ((version + '.0' if key == 'FileVersion' else version) + '\0').encode('utf-16le')
    payload = struct.pack('<HHH', 0, len(value)//2 if typ == 1 else len(value), typ) + (key+'\0').encode('utf-16le')
    payload += b'\0' * (-len(payload) % 4)
    payload += value
    for child in node['children']:
        payload += b'\0' * (-len(payload) % 4)
        payload += serialize(child)
    return struct.pack('<H', len(payload)) + payload[2:]

before = resources(target)
versions = {key:value for key,value in before.items() if key[0] == 16}
assert versions, 'Native EXE has no version resource'
kernel.BeginUpdateResourceW.argtypes = [wintypes.LPCWSTR, wintypes.BOOL]
kernel.BeginUpdateResourceW.restype = wintypes.HANDLE
kernel.UpdateResourceW.argtypes = [wintypes.HANDLE, ctypes.c_void_p, ctypes.c_void_p, wintypes.WORD, ctypes.c_void_p, wintypes.DWORD]
kernel.EndUpdateResourceW.argtypes = [wintypes.HANDLE, wintypes.BOOL]
update = kernel.BeginUpdateResourceW(str(target), False)
if not update:
    raise ctypes.WinError(ctypes.get_last_error())
try:
    for (kind, name, language), raw in versions.items():
        data = serialize(parse(raw))
        buffer = ctypes.create_string_buffer(data)
        name_buffer = ctypes.create_unicode_buffer(name) if isinstance(name, str) else None
        identifier = ctypes.cast(name_buffer, ctypes.c_void_p) if name_buffer else name
        if not kernel.UpdateResourceW(update, kind, identifier, language, buffer, len(data)):
            raise ctypes.WinError(ctypes.get_last_error())
except BaseException:
    kernel.EndUpdateResourceW(update, True)
    raise
if not kernel.EndUpdateResourceW(update, False):
    raise ctypes.WinError(ctypes.get_last_error())
after = resources(target)
assert {k:v for k,v in before.items() if k[0] != 16} == {k:v for k,v in after.items() if k[0] != 16}, 'Icon resources changed'
for key, value in after.items():
    if key[0] == 16:
        fixed = struct.unpack('<13I', parse(value)['value'])
        assert fixed[2:6] == (high, low, high, low)
print(json.dumps({'fileVersion':version+'.0','productVersion':version,'versionResourcesUpdated':len(versions),'iconResourcesUnchanged':True}))
