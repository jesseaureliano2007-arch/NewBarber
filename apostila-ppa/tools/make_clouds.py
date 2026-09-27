import sys, re; sys.path.insert(0,'tools'); import cloudgen as C
W=['rg-puff','rg-puff-lo','rg-puff-base']; D=['rg-puff-d1','rg-puff-d1','rg-puff-d2']; S=['rg-puff-s1','rg-puff-s2','rg-puff-s3']
def sym(i,vb,body): return f'<symbol id="{i}" viewBox="{vb}">{body}</symbol>'
out={}
out['cloud']=sym('cloud','0 0 100 60',C.cloud('cl',5,12,88,50,40,46,5,10,W))
out['cloud-dark']=sym('cloud-dark','0 0 100 60',C.cloud('cd',8,12,88,50,40,52,5,10,D,core='lg-core-d').replace('#41557a','#1c2433'))
out['cloud-sunset']=sym('cloud-sunset','0 0 100 60',C.cloud('cs',11,10,90,50,34,56,5,10,S,shadow=False,core='lg-core-s'))
out['tcu']=sym('tcu','0 0 100 110',C.cloud('tc',21,10,90,100,92,70,6,12,W,power=1.4))
cbtower=C.cloud('cbt',31,22,118,118,98,100,7,14,['rg-puff','rg-puff-lo','rg-puff-d1'],power=1.5,flt='f-fluffy-big',core='lg-core-cb')
anvil=C.cloud('cba',41,4,136,42,20,60,4,8,['rg-puff','rg-puff','rg-puff-lo'],shadow=False,power=0.35,flt='f-fluffy-big',clip=False)
rain='<path d="M34 120 L106 120 L116 140 L26 140Z" fill="url(#g-rainshaft)"/><g stroke="#8fa2bb" stroke-width="1" opacity=".6"><path d="M40 121 L36 139 M50 121 L46 139 M60 121 L56 139 M70 121 L66 139 M80 121 L76 139 M90 121 L86 139 M100 121 L96 139"/></g>'
base=C.cloud('cbb',61,18,122,121,12,30,5,9,['rg-puff-d1','rg-puff-d2','rg-puff-d2'],shadow=False,power=0.3,core='lg-core-d')
out['cb']=sym('cb','0 0 140 140',rain+anvil+cbtower+base)
out['stratus']=sym('stratus','0 0 160 30',C.cloud('st',51,4,156,24,7,60,3,5.5,['rg-puff-lo','rg-puff-base','rg-puff-base'],power=0.25))
sp=open('src/sprite.svg').read()
for k,b in out.items():
    pat=re.compile(r'<symbol id="'+re.escape(k)+r'".*?</symbol>',re.S)
    assert pat.search(sp),k; sp=pat.sub(lambda m:b,sp,count=1)
open('src/sprite.svg','w').write(sp); print('ok')
