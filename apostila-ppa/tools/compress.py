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
            if st != '/Image' or o.get('/Filter') != '/FlateDecode': continue
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
