// Mapa mental V2: ramos dourados afunilados ligando o medalhão (.mm .hub svg.medallion) a cada .node .orb.
(function(){
  var ns='http://www.w3.org/2000/svg';
  function bez(p0,p1,p2,p3,t){var u=1-t;return [u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0], u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]];}
  function taper(p0,p1,p2,p3,w0,w1){
    var L=[],R=[],N=28;
    for(var i=0;i<=N;i++){var t=i/N,a=bez(p0,p1,p2,p3,Math.max(0,t-0.01)),b=bez(p0,p1,p2,p3,Math.min(1,t+0.01)),c=bez(p0,p1,p2,p3,t);
      var dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,w=(w0+(w1-w0)*t)/2;
      L.push([c[0]+nx*w,c[1]+ny*w]);R.push([c[0]-nx*w,c[1]-ny*w]);}
    var d='M'+L.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join(' L');
    d+=' L'+R.reverse().map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join(' L')+'Z';return d;}
  function draw(m, hubSel, nodeSel){
    var hub=m.querySelector(hubSel); if(!hub) return;
    var R=m.getBoundingClientRect(),H=hub.getBoundingClientRect();
    var cx=H.left+H.width/2-R.left, cy=H.top+H.height/2-R.top, rad=H.width/2*0.86;
    var svg=document.createElementNS(ns,'svg'); svg.setAttribute('class','links');
    svg.setAttribute('viewBox','0 0 '+R.width+' '+R.height);
    var defs=document.createElementNS(ns,'defs');
    defs.innerHTML='<linearGradient id="br-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3dc98"/><stop offset=".6" stop-color="#c9a44f"/><stop offset="1" stop-color="#8a6a22"/></linearGradient>';
    svg.appendChild(defs);
    m.querySelectorAll(nodeSel).forEach(function(o){
      var B=o.getBoundingClientRect(), ox=B.left+B.width/2-R.left, oy=B.top+B.height/2-R.top;
      var ang=Math.atan2(oy-cy,ox-cx), sx=cx+Math.cos(ang)*rad, sy=cy+Math.sin(ang)*rad;
      var ex=ox-Math.cos(ang)*B.width*0.42, ey=oy-Math.sin(ang)*B.width*0.42;
      var mx=(sx+ex)/2;
      var p0=[sx,sy],p1=[mx,sy],p2=[mx,ey],p3=[ex,ey];
      var glow=document.createElementNS(ns,'path'); glow.setAttribute('d',taper(p0,p1,p2,p3,9,3));
      glow.setAttribute('fill','#c9a44f'); glow.setAttribute('opacity','.16'); svg.appendChild(glow);
      var p=document.createElementNS(ns,'path'); p.setAttribute('d',taper(p0,p1,p2,p3,4.2,1.1));
      p.setAttribute('fill','url(#br-g)'); svg.appendChild(p);
      // pequenas folhas ornamentais no meio do ramo
      var c=bez(p0,p1,p2,p3,0.5), leaf=document.createElementNS(ns,'circle');
      leaf.setAttribute('cx',c[0]);leaf.setAttribute('cy',c[1]);leaf.setAttribute('r',1.6);leaf.setAttribute('fill','#f3dc98');svg.appendChild(leaf);
    });
    m.insertBefore(svg,m.firstChild);
  }
  document.querySelectorAll('.mm').forEach(function(m){draw(m,'.hub svg.medallion','.node .orb');});
  document.querySelectorAll('.mapx').forEach(function(m){draw(m,'.hubx','.nodex');});
})();
