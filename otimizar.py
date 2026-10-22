#!/usr/bin/env python3
"""Otimiza o <head> de todas as páginas para o PageSpeed.

- Embute o style.css num <style> (sem requisição bloqueante de CSS).
- Carrega o Google Fonts sem bloquear a renderização (preload + onload).
- Adia AdSense e Google Analytics até a primeira interação ou ~3 s após o load.

Idempotente: após editar style.css, rode de novo:  python3 otimizar.py
"""
import pathlib, re

RAIZ = pathlib.Path(__file__).resolve().parent
FONTS = ("https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@500;600;700"
         "&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400"
         "&family=IBM+Plex+Mono:wght@400;500&display=swap")

def minify(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    css = re.sub(r"\s*([{};,>])\s*", r"\1", css)
    css = re.sub(r":\s+", ":", css)  # seguro: não há seletores com espaço após ':'
    return css.replace(";}", "}").strip()

CSS = minify((RAIZ / "style.css").read_text(encoding="utf-8"))
BLOCO_CSS = f'<style id="css-site">{CSS}</style>'
BLOCO_FONTES = (f'<link rel="preload" as="style" href="{FONTS}" onload="this.onload=null;this.rel=\'stylesheet\'">'
                f'<noscript><link rel="stylesheet" href="{FONTS}"></noscript>')
BLOCO_TERCEIROS = """<script id="terceiros">(function(){var f=0;function c(){if(f)return;f=1;
['scroll','pointerdown','keydown','touchstart','mousemove'].forEach(function(e){removeEventListener(e,c,{passive:true});});
var a=document.createElement('script');a.async=1;a.crossOrigin='anonymous';a.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9825265249384205';document.head.appendChild(a);
var g=document.createElement('script');g.async=1;g.src='https://www.googletagmanager.com/gtag/js?id=G-WCQ28WPS5S';document.head.appendChild(g);}
window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','G-WCQ28WPS5S');
['scroll','pointerdown','keydown','touchstart','mousemove'].forEach(function(e){addEventListener(e,c,{passive:true});});
addEventListener('load',function(){setTimeout(c,3000);});})();</script>"""

PADROES = [
    # fontes (versão original ou já otimizada)
    (re.compile(r'(?<!<noscript>)<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2[^"]*">'), BLOCO_FONTES),
    (re.compile(r'<link rel="preload" as="style" href="https://fonts\.googleapis\.com/.*?</noscript>'), BLOCO_FONTES),
    # CSS
    (re.compile(r'<link rel="stylesheet" href="/style\.css">'), BLOCO_CSS),
    (re.compile(r'<style id="css-site">.*?</style>', re.S), BLOCO_CSS),
    # AdSense + Analytics
    (re.compile(r'<script async src="https://pagead2\.googlesyndication\.com/[^"]*" crossorigin="anonymous"></script>\n?'), ""),
    (re.compile(r'<script async src="https://www\.googletagmanager\.com/gtag/js[^"]*"></script>\n?'), ""),
    (re.compile(r"<script>window\.dataLayer=window\.dataLayer\|\|\[\];function gtag\(\)\{dataLayer\.push\(arguments\);\}gtag\('js',new Date\(\)\);gtag\('config','G-WCQ28WPS5S'\);</script>"), BLOCO_TERCEIROS),
    (re.compile(r'<script id="terceiros">.*?</script>', re.S), BLOCO_TERCEIROS),
]

alteradas = 0
for p in sorted(RAIZ.glob("*.html")):
    html = orig = p.read_text(encoding="utf-8")
    for rx, novo in PADROES:
        html = rx.sub(lambda m: novo, html, count=1)
    if html != orig:
        p.write_text(html, encoding="utf-8"); alteradas += 1
print(f"{alteradas} páginas atualizadas; CSS embutido: {len(CSS)} bytes")
