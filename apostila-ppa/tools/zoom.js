// uso: node tools/zoom.js <html> <sectionId> <out.png> [seletor] [escala]
const pw=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const [h,id,out,sel,sc]=process.argv.slice(2);
const b=await pw.chromium.launch();const p=await b.newPage({deviceScaleFactor:+(sc||2),viewport:{width:1000,height:1400}});
await p.goto('file://'+require('path').resolve(h));await p.evaluate(()=>document.fonts.ready);
const el=await p.$(`#${id} ${sel||''}`);await el.screenshot({path:out});await b.close();})();
