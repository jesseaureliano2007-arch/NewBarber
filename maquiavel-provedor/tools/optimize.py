#!/usr/bin/env python3
"""Versão final do PDF: recomprime as imagens rasterizadas (compress.py) e reorganiza os objetos com qpdf (pikepdf).
Não usa rewrite do MuPDF — ele corrompia padrões/degradês (fundos sumiam no Preview do Mac).
Uso: optimize.py entrada.pdf saida.pdf qualidade escala"""
import sys, subprocess, os, pikepdf
src, out, q, scale = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
tmp = out + '.tmp.pdf'
subprocess.run([sys.executable, os.path.join(os.path.dirname(__file__), 'compress.py'), src, tmp, q, scale], check=True)
p = pikepdf.open(tmp); p.remove_unreferenced_resources()
p.save(out, object_stream_mode=pikepdf.ObjectStreamMode.generate, compress_streams=True, recompress_flate=True)
p.close(); os.remove(tmp)
print(f'{out}: {os.path.getsize(out)/1e6:.1f} MB')
