#!/usr/bin/env python3
"""Recomprime as imagens rasterizadas pelo Chromium (filtros SVG) como JPEG, preservando a transparência (SMask)."""
import sys, io, zlib
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, NumberObject, StreamObject
from PIL import Image
src, out = sys.argv[1:3]
q = int(sys.argv[3]) if len(sys.argv) > 3 else 82
r = PdfReader(src); w = PdfWriter(clone_from=r)
done = set(); saved = 0
SCALE = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
def recode(o):
    if o.get('/Filter') != '/FlateDecode' or o.get('/BitsPerComponent') != 8: return 0
    cs = o.get('/ColorSpace'); wdt, hgt = int(o['/Width']), int(o['/Height'])
    if wdt * hgt < 4000: return 0
    try: raw = o.get_data()
    except Exception: return 0
    ncomp = 3 if (cs == '/DeviceRGB' or isinstance(cs, list)) else (1 if cs == '/DeviceGray' else 0)
    if ncomp == 0 or len(raw) != wdt * hgt * ncomp: return 0
    im = Image.frombytes('RGB' if ncomp == 3 else 'L', (wdt, hgt), raw)
    if SCALE < 1 and wdt > 500:
        im = im.resize((max(1, int(wdt * SCALE)), max(1, int(hgt * SCALE))), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=q, optimize=True)
    jpg = buf.getvalue(); before = len(o._data)
    if len(jpg) >= before: return 0
    o._data = jpg
    o[NameObject('/Filter')] = NameObject('/DCTDecode')
    if '/DecodeParms' in o: del o['/DecodeParms']
    o[NameObject('/ColorSpace')] = NameObject('/DeviceRGB' if ncomp == 3 else '/DeviceGray')
    o[NameObject('/Width')] = NumberObject(im.size[0]); o[NameObject('/Height')] = NumberObject(im.size[1])
    return before - len(jpg)
for page in w.pages:
    res = page.get('/Resources')
    if not res: continue
    stack = [res.get_object()]
    while stack:
        rr = stack.pop()
        xo = rr.get('/XObject')
        if not xo: continue
        for name, ref in xo.get_object().items():
            o = ref.get_object()
            key = id(o)
            if key in done: continue
            done.add(key)
            st = o.get('/Subtype')
            if st == '/Form' and o.get('/Resources'):
                stack.append(o['/Resources'].get_object()); continue
            if st != '/Image': continue
            sm = o.get('/SMask')
            if sm is not None:
                smo = sm.get_object()
                if id(smo) not in done:
                    done.add(id(smo)); saved += recode(smo)
            if o.get('/Filter') != '/FlateDecode': continue
            saved += recode(o); continue
            if o.get('/BitsPerComponent') != 8: continue
            cs = o.get('/ColorSpace'); wdt, hgt = int(o['/Width']), int(o['/Height'])
            if wdt * hgt < 4000: continue
            try:
                raw = o.get_data()
            except Exception:
                continue
            ncomp = 3 if cs in ('/DeviceRGB',) or (isinstance(cs, list)) else (1 if cs == '/DeviceGray' else 0)
            if isinstance(cs, list): ncomp = 3
            if ncomp == 0 or len(raw) != wdt * hgt * ncomp: continue
            im = Image.frombytes('RGB' if ncomp == 3 else 'L', (wdt, hgt), raw)
            buf = io.BytesIO(); im.save(buf, 'JPEG', quality=q, optimize=True)
            jpg = buf.getvalue(); before = len(o._data)
            if len(jpg) >= before: continue
            o._data = jpg
            o[NameObject('/Filter')] = NameObject('/DCTDecode')
            if '/DecodeParms' in o: del o['/DecodeParms']
            o[NameObject('/ColorSpace')] = NameObject('/DeviceRGB' if ncomp == 3 else '/DeviceGray')
            saved += before - len(jpg)
w.compress_identical_objects(remove_identicals=True, remove_orphans=True)
with open(out, 'wb') as f: w.write(f)
print(f'economia ≈ {saved/1e6:.1f} MB')
