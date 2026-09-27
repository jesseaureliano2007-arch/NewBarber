# Apostila Infográfica PPA — Prova Teórica ANAC (03/11/2026)

**Arquivo principal:** [`dist/Apostila-PPA-ANAC-2026.pdf`](dist/Apostila-PPA-ANAC-2026.pdf) — 159 páginas A4, texto pesquisável e selecionável,
sumário clicável, marcadores por matéria, número em todas as páginas (toque no rodapé para voltar ao sumário).

**Versão editável:** [`dist/Apostila-PPA-ANAC-2026-editavel.html`](dist/Apostila-PPA-ANAC-2026-editavel.html) — arquivo único
(abre em qualquer navegador, inclusive Safari no iPad) — e as fontes em `src/pages/*.html` (uma página A4 por `<section>`).

## Conteúdo
| Parte | Páginas |
|---|---|
| Capa, como usar, sumário, cronograma diário 27/09 → 03/11 | 1–8 |
| Módulo 1 — Regulamentos de Tráfego Aéreo (+30 questões e gabarito) | 9–29 |
| Módulo 2 — Meteorologia (+30 questões e gabarito) | 30–55 |
| Módulo 3 — Navegação Aérea (+30 questões e gabarito) | 56–79 |
| Módulo 4 — Teoria de Voo (+30 questões e gabarito) | 80–101 |
| Módulo 5 — Conhecimentos Técnicos (+30 questões e gabarito) | 102–130 |
| Capítulo complementar — Cessna 172R PT-WVR | 131–134 |
| Formulário e cálculos | 135–140 |
| Simulado final — 100 questões, folha de respostas, gabarito comentado, desempenho e mapa de revisão | 141–159 |

Os números exatos estão no sumário do PDF (gerado automaticamente).

## Avisos
- Material de estudo independente. As questões são inéditas, no estilo da prova — **não** são questões oficiais da ANAC.
- Base: conteúdo programático da IS 00-003H (Apêndice D). Valores regulamentares que dependem de publicação vigente
  estão marcados com **“CONFIRME NA FONTE”** (RBAC, ICA, AIP/AISWEB, REDEMET).
- Cessna 172R: os números mostrados são **referência do modelo (POH)**; confirme no POH/AFM, suplementos e checklist do PT-WVR.

## Como gerar de novo
```bash
node build.js --check --only=met- --shots=true   # revisar um prefixo (verifica estouros e gera PNG)
PDF_PY=/caminho/python-com-pypdf-e-pymupdf node build.js   # HTML + PDF final
```
Requisitos: Node + Playwright (Chromium), Python com `pypdf`, `pymupdf` e `pillow`.
Guia de autoria e fatos de referência: [`AUTHORING.md`](AUTHORING.md).
