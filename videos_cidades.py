#!/usr/bin/env python3
"""Insere a seção "Vídeo" (YouTube) antes das Perguntas frequentes de cada ficha.

Fonte: dados/videos.tsv  (cma, cidade, UF, id do vídeo, canal, duração, título, marca)
- O player só é carregado no clique (miniatura + youtube-nocookie): página leve e
  sem cookies do YouTube até o visitante dar play.
- Adiciona o atalho "Vídeo" no menu de seções da ficha.
- Fichas listadas em PULAR ficam sem vídeo (sem material adequado no YouTube ou
  vídeo centrado em tropa/pelotão, contra as diretrizes do guia).

Idempotente: para trocar um vídeo, edite o TSV e rode:  python3 videos_cidades.py
Depois rode  python3 otimizar.py  se mexer no style.css.
"""
import csv, html as H, pathlib, re, unicodedata

RAIZ = pathlib.Path(__file__).resolve().parent
MES = "out/2026"
PULAR = {"sao-joaquim-am", "surucucu-rr", "auaris-rr", "querari-am", "maturaca-am",
         "tunui-am", "vila-bittencourt-am", "ipiranga-am", "estirao-do-equador-am"}

def slug(n, uf):
    s = unicodedata.normalize("NFD", f"{n}-{uf}").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")

JS = ("<script>document.addEventListener('click',function(e){var b=e.target.closest('.yt');"
      "if(!b||b.querySelector('iframe'))return;var f=document.createElement('iframe');"
      "f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0';"
      "f.title=b.getAttribute('aria-label');f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';"
      "f.allowFullscreen=true;b.replaceChildren(f);});</script>")

RE_SEC = re.compile(r'\n?    <section class="sec" id="sec-video">.*?</section>', re.S)
feitas = removidas = 0
for r in csv.reader(open(RAIZ / "dados/videos.tsv", encoding="utf-8"), delimiter="\t"):
    if not r: continue
    _, nome, uf, vid, canal, dur, titulo = r[:7]
    s = slug(nome, uf)
    p = RAIZ / f"{s}.html"
    if not p.exists():
        print("sem ficha:", s); continue
    t = p.read_text(encoding="utf-8")
    t = RE_SEC.sub("", t)
    t = t.replace('<a href="#sec-video">Vídeo</a>', "")
    if s in PULAR or vid == "-":
        removidas += 1; p.write_text(t, encoding="utf-8"); continue
    m = re.search(r'id="sec-faq">\s*<div><h2>[^<]*</h2><div class="eyebrow">([^·<]+)·', t)
    curto = m.group(1).strip() if m else nome
    e = H.escape
    sec = f'''
    <section class="sec" id="sec-video">
      <div><h2>Vídeo de {e(curto)}</h2><div class="eyebrow">{e(curto)} · {MES}</div></div>
      <div class="body">
<button type="button" class="yt" data-yt="{vid}" aria-label="Assistir: {e(titulo)}"><img src="https://i.ytimg.com/vi/{vid}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><span class="yt-play"></span></button>
<p class="yt-cap">{e(titulo)} · {e(canal)} · {dur}. Vídeo de terceiros, hospedado no YouTube; o conteúdo é de responsabilidade do canal. <a href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener">Abrir no YouTube</a></p>
{JS}</div>
    </section>'''
    t = t.replace('\n    <section class="sec faq" id="sec-faq">', sec + '\n    <section class="sec faq" id="sec-faq">', 1)
    t = t.replace('<a href="#sec-faq">Perguntas</a>', '<a href="#sec-video">Vídeo</a><a href="#sec-faq">Perguntas</a>', 1)
    p.write_text(t, encoding="utf-8"); feitas += 1
print(f"{feitas} fichas com vídeo, {removidas} sem vídeo")
