"""Gera nuvens 'couve-flor' com muitos gomos sombreados (SVG) para o sprite."""
import math, random

def _cluster(seed, n, x0, x1, ybase, height, rmin, rmax, power=0.6):
    random.seed(seed); cs=[]
    for i in range(n):
        u=random.random(); x=x0+(x1-x0)*u
        top=ybase-height*(math.sin(math.pi*u)**power)
        r=rmin+(rmax-rmin)*random.random()
        y=top+r*0.7+(ybase-top)*random.random()**1.3
        cs.append((x,y,r))
    # cristas ao longo do topo
    k=max(6,int((x1-x0)/8))
    for i in range(k):
        u=(i+0.5)/k; x=x0+(x1-x0)*u; top=ybase-height*(math.sin(math.pi*u)**power)
        r=rmax*(0.7+0.4*random.random()); cs.append((x,top+r*0.9,r))
    cs.sort(key=lambda c:c[1])
    return cs

def cloud(cid, seed, x0, x1, ybase, height, n, rmin, rmax, grads, shadow=True, flt='f-fluffy', power=0.6, core='lg-core', clip=True):
    cs=_cluster(seed,n,x0,x1,ybase,height,rmin,rmax,power)
    top=min(c[1]-c[2] for c in cs)
    body=[]
    for x,y,r in cs:
        t=(y-top)/(ybase-top+1e-6)
        g=grads[0] if t<0.45 else (grads[1] if t<0.8 else grads[2])
        body.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="url(#{g})"/>')
    s=''
    if shadow: s+=f'<ellipse cx="{(x0+x1)/2:.1f}" cy="{ybase+4:.1f}" rx="{(x1-x0)/2:.1f}" ry="3" fill="#41557a" opacity=".22" filter="url(#f-blur1)"/>'
    if clip: s+=f'<clipPath id="clip-{cid}"><rect x="-50" y="-50" width="400" height="{ybase+50+1.5:.1f}"/></clipPath>'
    pts=[]
    for i in range(41):
        u=i/40; x=x0+(x1-x0)*u; top=ybase-height*(math.sin(math.pi*u)**power)+rmax*0.8
        pts.append(f'{x:.1f},{min(top,ybase):.1f}')
    corep=f'<polygon points="{" ".join(pts)}" fill="url(#{core})"/>'
    cp=f' clip-path="url(#clip-{cid})"' if clip else ''
    s+=f'<g{cp}><g filter="url(#{flt})">{corep}{"".join(body)}</g></g>'
    return s
