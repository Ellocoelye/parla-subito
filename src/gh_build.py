import json, re
from PIL import Image, ImageDraw, ImageFont
s=open('index.html').read()
reps=[
 ("abrís la app dentro de Claude","cargás tu clave de IA en Ajustes"),
 ("abrí esta página dentro de Claude","cargá tu clave de IA en Ajustes (la L en Inicio)"),
 ("abrís esta página dentro de Claude","cargás tu clave de IA en Ajustes"),
 ("Traducción disponible dentro de Claude","Cargá tu clave de IA en Ajustes para traducir"),
 ("Claude está tardando más de lo normal.","La IA está tardando más de lo normal."),
 ("Si ves un aviso para permitir que esta página use Claude, aceptalo.",""),
 ("Claude está armando","La IA está armando"),("Claude está pensando","La IA está pensando"),
 ("Claude lo arma","La IA lo arma"),("Claude mira","La IA mira"),("Claude arma","La IA arma"),("Claude escribe","La IA escribe"),
 ("Claude elige","La IA elige"),("Claude te lo explica","La IA te lo explica"),("Claude tardó demasiado","La IA tardó demasiado"),
 ("Necesito permiso para usar Claude desde esta página.","No tengo permiso para usar la IA. Revisá tu clave en Ajustes."),
 ("Claude no está disponible en esta cuenta.","La IA no está disponible. Revisá tu clave en Ajustes."),
 ("La conversación con Claude funciona cuando","La conversación funciona cuando"),
]
for a,b in reps:
    s=s.replace(a,b)
head='''<meta name="theme-color" content="#111111">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Parla Subito">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-192.png">
'''
s=s.replace('<title>Parla Subito</title>','<title>Parla Subito</title>\n'+head,1)
s=s.replace('<script>','<script src="shim.js"></script>\n<script>',1)
open('gh/index.html','w').write(s)
json.dump({"name":"Parla Subito","short_name":"Parla Subito","start_url":"./","scope":"./","display":"standalone","background_color":"#111111","theme_color":"#111111",
 "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png"}]},open('gh/manifest.json','w'),ensure_ascii=False,indent=1)
open('gh/.nojekyll','w').write('')
for n in (180,192,512):
    im=Image.new('RGB',(n,n),'#111111');d=ImageDraw.Draw(im)
    d.rounded_rectangle([n*.12,n*.12,n*.88,n*.72],radius=n*.14,fill='#f6c85f')
    d.polygon([(n*.30,n*.70),(n*.26,n*.86),(n*.46,n*.70)],fill='#f6c85f')
    for i,c in enumerate(['#7fc27b','#f3f0e7','#e9604f']):
        x=n*(.32+.18*i);d.ellipse([x-n*.06,n*.36,x+n*.06,n*.48],fill=c)
    im.save(f'gh/icon-{n}.png')
print('gh ok', len(s))
