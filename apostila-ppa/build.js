#!/usr/bin/env node
/* Monta a apostila a partir de src/pages/*.html (ordem em src/order.txt),
   gera HTML, verifica estouro de conteúdo e produz o PDF A4.
   Uso:
     node build.js                 -> HTML + verificação + PDF
     node build.js --check         -> apenas HTML + verificação
     node build.js --shots=ID,ID   -> também salva PNG das páginas (por id ou nº) em build/shots
     node build.js --only=arquivo  -> monta só os fragmentos cujo nome contém "arquivo" (rápido p/ revisar)
*/
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
let pw;
try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const BUILD = path.join(ROOT, 'build');
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));

const MOD_LABEL = { reg: 'REGULAMENTOS', met: 'METEOROLOGIA', nav: 'NAVEGAÇÃO', tv: 'TEORIA DE VOO', cta: 'CONHECIMENTOS TÉCNICOS', c172: 'CESSNA 172R', gen: 'APOSTILA PPA' };

function readOrder() {
  const all = fs.readdirSync(path.join(SRC, 'pages')).filter(f => f.endsWith('.html')).sort();
  const out = [];
  for (const line of fs.readFileSync(path.join(SRC, 'order.txt'), 'utf8').split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('#'))) {
    if (line.includes('*')) {
      const re = new RegExp('^' + line.replace(/[.]/g, '\\.').replace(/\*/g, '.*') + '$');
      all.filter(f => re.test(f) && !out.includes(f)).forEach(f => out.push(f));
    } else if (!out.includes(line)) out.push(line);
  }
  return out;
}

function assemble() {
  let files = readOrder();
  if (args.only) files = files.filter(f => String(args.only).split(',').some(o => f.includes(o)));
  let body = '';
  for (const f of files) {
    const p = path.join(SRC, 'pages', f);
    if (!fs.existsSync(p)) { console.warn('!! fragmento ausente:', f); continue; }
    body += `\n<!-- ===== ${f} ===== -->\n` + fs.readFileSync(p, 'utf8');
  }
  // numeração de páginas + rótulo do módulo
  let n = 0; const toc = [];
  body = body.replace(/<section\b([^>]*)>/g, (m, attrs) => {
    if (!/class="[^"]*\bpage\b/.test(attrs)) return m;
    n++;
    const id = (attrs.match(/\bid="([^"]+)"/) || [])[1];
    const mod = ((attrs.match(/\bmod-(\w+)/) || [])[1]) || 'gen';
    const t = (attrs.match(/\bdata-toc="([^"]+)"/) || [])[1];
    const lvl = +((attrs.match(/\bdata-toc-level="(\d)"/) || [])[1] || 2);
    const bm = (attrs.match(/\bdata-bm="([^"]+)"/) || [])[1];
    let newAttrs = attrs;
    if (!id) newAttrs += ` id="p${n}"`;
    if (t) toc.push({ page: n, id: id || `p${n}`, title: t, level: lvl, mod, bm });
    return `<section${newAttrs} data-pn="${n}">`;
  });
  // rodapé com número (inserido antes de </section> de cada página)
  let k = 0;
  body = body.replace(/<\/section>/g, () => {
    k++;
    return `<div class="pnum"><a href="#sumario">APOSTILA PPA · PROVA ANAC · <span class="pmod"></span></a><span class="pn">${k}</span></div></section>`;
  });
  // rótulos de módulo
  body = body.replace(/(<section[^>]*\bmod-(\w+)[^>]*>)([\s\S]*?)<span class="pmod"><\/span>/g, (m, open, mod, mid) => `${open}${mid}<span class="pmod">${MOD_LABEL[mod] || ''}</span>`);

  // sumário automático
  body = body.replace(/<!--TOC:(\d+)\/(\d+)-->/g, (m, i, n) => buildToc(toc, +i, +n));

  const css = fs.readFileSync(path.join(SRC, 'style.css'), 'utf8');
  const sprite = fs.readFileSync(path.join(SRC, 'sprite.svg'), 'utf8');
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Apostila Infográfica PPA — Prova Teórica ANAC</title>
<style>${css}</style></head><body>
${sprite}
${body}
</body></html>`;
  return { html, toc, pages: n };
}

function buildToc(toc, i, n) {
  const colors = { reg: 'var(--blue)', met: 'var(--teal)', nav: 'var(--green)', tv: 'var(--red)', cta: 'var(--purple)', c172: 'var(--orange)', gen: 'var(--navy)' };
  const items = toc.filter(t => !t.noToc);
  const out = [];
  for (const t of items) {
    const c = colors[t.mod] || 'var(--navy)';
    if (t.level === 1) out.push(`<div class="tm" style="--c:${c}"><a href="#${t.id}">${t.title}</a><span>${t.page}</span></div>`);
    else out.push(`<div class="te" style="--c:${c}"><a class="tt" href="#${t.id}">${t.title}</a><a class="tp" href="#${t.id}">${t.page}</a></div>`);
  }
  const per = Math.ceil(out.length / n);
  return out.slice((i - 1) * per, i * per).join('\n');
}

async function main() {
  fs.mkdirSync(DIST, { recursive: true }); fs.mkdirSync(BUILD, { recursive: true });
  const { html, toc, pages } = assemble();
  const tag = args.only ? String(args.only).replace(/[^a-z0-9]+/gi, '_') : '';
  const htmlPath = path.join(DIST, args.only ? `preview-${tag}.html` : 'apostila-ppa.html');
  // caminhos de fonte relativos a dist/
  fs.writeFileSync(htmlPath, html.replace(/url\(\.\.\/assets\/fonts\//g, 'url(../assets/fonts/'));
  if (!args.only) fs.writeFileSync(path.join(BUILD, 'toc.json'), JSON.stringify(toc, null, 1));
  console.log(`HTML: ${htmlPath}  (${pages} páginas)`);

  const browser = await pw.chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });
  await page.goto('file://' + htmlPath, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  // ---------- verificação de estouro ----------
  const problems = await page.evaluate(() => {
    const out = [];
    const mm = 96 / 25.4;
    document.querySelectorAll('section.page').forEach(sec => {
      const pn = sec.dataset.pn; const id = sec.id;
      const r = sec.getBoundingClientRect();
      const limit = r.bottom - 8.5 * mm; // área do número de página
      const flag = (msg) => out.push(`p.${pn} [${id}] ${msg}`);
      // blocos/elementos cortados
      sec.querySelectorAll('.blk, .foot, .resumo, .q, .gab, .grid, .qgrid, .hero, table, .fig').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.height === 0) return;
        if (b.bottom > limit + 1) flag(`${el.className.split(' ')[0]} ultrapassa o rodapé em ${((b.bottom - limit) / mm).toFixed(1)} mm`);
        if (b.right > r.right + 1) flag(`${el.className.split(' ')[0]} ultrapassa a margem direita em ${((b.right - r.right) / mm).toFixed(1)} mm`);
      });
      sec.querySelectorAll('.blk, .foot > div, .hero, .postit').forEach(el => {
        const box = el.getBoundingClientRect();
        let maxB = 0;
        el.querySelectorAll('*').forEach(c => { if (c.closest('svg.scene') || c.closest('defs') || c.closest('symbol')) return; const cb = c.getBoundingClientRect(); if (cb.height > 0 && cb.width > 0) maxB = Math.max(maxB, cb.bottom); });
        if (maxB > box.bottom + 1.5) flag(`conteúdo cortado em "${((el.querySelector('.bh,.fh,.pt,.title')||el).textContent || el.className).trim().slice(0, 40)}" (${((maxB - box.bottom) / mm).toFixed(1)} mm)`);
      });
      sec.querySelectorAll('.qgrid').forEach(el => {
        if (el.scrollWidth > el.clientWidth + 2) flag(`colunas de questões transbordaram (conteúdo demais para a página)`);
      });
      if (sec.scrollHeight > sec.clientHeight + 2) flag(`página estourou verticalmente (${((sec.scrollHeight - sec.clientHeight) / mm).toFixed(1)} mm)`);
      // texto pequeno demais
      let tiny = 0; const samples = [];
      sec.querySelectorAll('p,li,td,span,div,small,text,tspan').forEach(el => {
        if (!el.childNodes.length) return;
        const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (!hasText) return;
        let fs = parseFloat(getComputedStyle(el).fontSize);
        if (el instanceof SVGElement) { const svg = el.ownerSVGElement; if (svg) { const vb = svg.viewBox.baseVal; const w = svg.getBoundingClientRect().width; if (vb && vb.width) fs = fs * w / vb.width; } }
        if (fs < 9.3) { tiny++; if (samples.length < 4) samples.push(`"${el.textContent.trim().slice(0, 22)}" ${(fs * 0.75).toFixed(1)}pt`); } // ~7 pt
      });
      if (tiny) flag(`${tiny} textos com fonte < 7 pt: ${samples.join(', ')}`);
    });
    return out;
  });
  if (problems.length) { console.log(`\n⚠ ${problems.length} problema(s) de layout:`); problems.forEach(p => console.log('  - ' + p)); }
  else console.log('✔ Nenhum estouro de layout detectado.');
  fs.writeFileSync(path.join(BUILD, `layout-report${tag ? '-' + tag : ''}.txt`), problems.join('\n'));

  // ---------- capturas ----------
  if (args.shots) {
    const dir = path.join(BUILD, tag ? `shots-${tag}` : 'shots'); fs.mkdirSync(dir, { recursive: true });
    const want = String(args.shots) === 'true' ? null : String(args.shots).split(',');
    const secs = await page.$$('section.page');
    for (const s of secs) {
      const id = await s.getAttribute('id'); const pn = await s.getAttribute('data-pn');
      if (want && !want.includes(id) && !want.includes(pn)) continue;
      await s.screenshot({ path: path.join(dir, `${String(pn).padStart(3, '0')}-${id}.png`) });
    }
    console.log('Capturas em', dir);
  }

  if (!args.check && !args.only) {
    const raw = path.join(BUILD, 'raw.pdf');
    await page.emulateMedia({ media: 'print' });
    await page.pdf({ path: raw, preferCSSPageSize: true, printBackground: true, tagged: true, outline: false });
    await browser.close();
    const out = path.join(DIST, 'Apostila-PPA-ANAC-2026.pdf');
    execFileSync('python3', [path.join(ROOT, 'tools', 'bookmarks.py'), raw, path.join(BUILD, 'toc.json'), out], { stdio: 'inherit' });
    // versão HTML autônoma (fontes embutidas) — versão editável
    let solo = fs.readFileSync(htmlPath, 'utf8').replace(/url\(\.\.\/assets\/fonts\/([^)]+)\)/g, (m, f) =>
      `url(data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, 'assets', 'fonts', f)).toString('base64')})`);
    fs.writeFileSync(path.join(DIST, 'Apostila-PPA-ANAC-2026-editavel.html'), solo);
    console.log('PDF:', out);
  } else await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
