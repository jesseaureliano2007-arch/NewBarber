// Desenha os ramos curvos do mapa mental (.mmap) ligando o medalhão central (.hub) a cada cartão (.br).
(function(){
  document.querySelectorAll('.mmap').forEach(function(m){
    var hub=m.querySelector('.hub .medal')||m.querySelector('.hub'); if(!hub) return;
    var R=m.getBoundingClientRect(), H=hub.getBoundingClientRect();
    var cx=H.left+H.width/2-R.left, cy=H.top+H.height/2-R.top, rad=H.width/2*0.92;
    var ns='http://www.w3.org/2000/svg', svg=document.createElementNS(ns,'svg');
    svg.setAttribute('class','links'); svg.setAttribute('viewBox','0 0 '+R.width+' '+R.height);
    var col=getComputedStyle(m).getPropertyValue('--mod')||'#4a3220';
    m.querySelectorAll('.br').forEach(function(b){
      var B=b.getBoundingClientRect(), left=(B.left+B.width/2-R.left)<cx;
      var ex=left?B.right-R.left:B.left-R.left, ey=B.top+B.height/2-R.top;
      var ang=Math.atan2(ey-cy,ex-cx), sx=cx+Math.cos(ang)*rad, sy=cy+Math.sin(ang)*rad;
      var mx=(sx+ex)/2;
      ['#d2b062','__mod'].forEach(function(c,i){
        var p=document.createElementNS(ns,'path');
        p.setAttribute('d','M'+sx+' '+sy+' C'+mx+' '+sy+' '+mx+' '+ey+' '+ex+' '+ey);
        p.setAttribute('fill','none'); p.setAttribute('stroke',i?col.trim():c);
        p.setAttribute('stroke-width',i?1.6:4.2); p.setAttribute('stroke-linecap','round');
        if(i) p.setAttribute('stroke-dasharray','0'); svg.appendChild(p);
      });
      var d=document.createElementNS(ns,'circle'); d.setAttribute('cx',ex); d.setAttribute('cy',ey); d.setAttribute('r',2.6);
      d.setAttribute('fill','#d2b062'); d.setAttribute('stroke',col.trim()); d.setAttribute('stroke-width',1); svg.appendChild(d);
    });
    m.insertBefore(svg,m.firstChild);
  });
})();
