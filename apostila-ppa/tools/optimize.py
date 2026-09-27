#!/usr/bin/env python3
"""Gera as versões finais do PDF: impressão (300 dpi) e iPad (150 dpi), recomprimindo as imagens rasterizadas."""
import sys, pymupdf
pymupdf.TOOLS.mupdf_display_errors(False)
src, out, dpi, q = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
doc = pymupdf.open(src)
doc.rewrite_images(dpi_threshold=dpi + 20, dpi_target=dpi, quality=q, lossy=True, lossless=True, bitonal=False, color=True, gray=True, set_to_gray=False)
doc.save(out, garbage=4, deflate=True, use_objstms=1)
d2 = pymupdf.open(out)
print(f'{out}: {d2.page_count} páginas, {len(d2.get_toc())} marcadores, links p.3: {len(d2[2].get_links())}')
