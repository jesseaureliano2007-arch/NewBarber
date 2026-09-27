#!/usr/bin/env python3
"""Adiciona marcadores (bookmarks) hierárquicos e metadados ao PDF gerado pelo Chromium."""
import json, sys
from pypdf import PdfReader, PdfWriter

raw, toc_path, out = sys.argv[1:4]
toc = json.load(open(toc_path, encoding="utf-8"))
reader = PdfReader(raw)
writer = PdfWriter(clone_from=reader)
parent = None
for t in toc:
    idx = t["page"] - 1
    if idx >= len(writer.pages):
        continue
    title = t.get("bm") or t["title"]
    if t["level"] == 1:
        parent = writer.add_outline_item(title, idx, bold=True)
    else:
        writer.add_outline_item(title, idx, parent=parent)
writer.add_metadata({
    "/Title": "Apostila Infográfica PPA — Prova Teórica ANAC 2026",
    "/Subject": "Regulamentos, Meteorologia, Navegação, Teoria de Voo e Conhecimentos Técnicos",
    "/Author": "Apostila PPA",
    "/Keywords": "PPA, ANAC, piloto privado, IS 00-003H, METAR, TAF, Cessna 172R",
})
writer.page_mode = "/UseOutlines"
with open(out, "wb") as f:
    writer.write(f)
print(f"Marcadores: {len(toc)} | páginas: {len(writer.pages)} -> {out}")
