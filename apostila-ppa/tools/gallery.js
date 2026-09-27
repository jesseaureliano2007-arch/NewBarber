// Galeria de símbolos do sprite para revisão visual: node tools/gallery.js id1,id2 out.png
const fs=require('fs'),path=require('path');const pw=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const ids=process.argv[2].split(',');const sp=fs.readFileSync('src/sprite.svg','utf8');
const cells=ids.map(i=>{const vb=(sp.match(new RegExp('<symbol id="'+i+'" viewBox="([^"]+)"'))||[])[1]||'0 0 100 100';const [,, w,h]=vb.split(' ').map(Number);const H=+(process.argv[4]||200),W=Math.round(H*w/h);
return `<div style="display:inline-block;margin:6px;text-align:center;font:12px sans-serif"><svg width="${W}" height="${H}" viewBox="${vb}" style="background:#6aa9e6"><use href="#${i}"/></svg><br>${i}</div>`}).join('');
fs.writeFileSync('build/gal.html',`<!doctype html><html><body style="margin:0;width:1400px">${sp}${cells}</body></html>`);
const b=await pw.chromium.launch();const p=await b.newPage({viewport:{width:1400,height:400}});await p.goto('file://'+path.resolve('build/gal.html'));await p.screenshot({path:process.argv[3],fullPage:true});await b.close();})();
