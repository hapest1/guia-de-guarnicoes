#!/usr/bin/env python3
"""Decide quais fichas o Google deve indexar (revisão para o AdSense, nov/2026).

O AdSense recusou o site por "conteúdo de baixo valor". Parte do motivo são as
fichas ainda não aprofundadas: curtas e montadas sobre o mesmo modelo. Elas
continuam no ar e acessíveis pelo site, mas ficam fora do índice do Google
(noindex,follow) e fora do sitemap.xml até serem aprofundadas.

Regra: a ficha é indexada se já foi aprofundada (tem dados/aprofundamento/<slug>.json
e a seção "A cidade" na página) OU se o conteúdo principal tiver pelo menos
MIN_PALAVRAS palavras (fichas escritas à mão).

Idempotente. Rode de novo depois de aprofundar fichas:
    python3 aprofundar_fichas.py && python3 indexacao_fichas.py
"""
import pathlib
import re
from datetime import date

RAIZ = pathlib.Path(__file__).resolve().parent
SITE = "https://guiadeguarnicoes.com"
MIN_PALAVRAS = 1000
INDEX = '<meta name="robots" content="index,follow,max-image-preview:large">'
NOINDEX = '<meta name="robots" content="noindex,follow">'
# Páginas que só redirecionam: ficam sempre fora (já têm noindex próprio).
IGNORAR = {"sao-miguel-do-iguacu-pr"}


def palavras(h):
    m = re.search(r"<main[^>]*>([\s\S]*?)</main>", h)
    corpo = re.sub(r"<(script|style|nav)[\s\S]*?</\1>", " ", m.group(1) if m else "")
    return len(re.sub(r"<[^>]+>", " ", corpo).split())


def main():
    aprof = {p.stem for p in (RAIZ / "dados" / "aprofundamento").glob("*.json")}
    indexar, fora, alteradas = [], [], 0
    for p in sorted(RAIZ.glob("*-[a-z][a-z].html")):
        slug = p.stem
        if slug in IGNORAR:
            continue
        h = orig = p.read_text(encoding="utf-8")
        ok = (slug in aprof and 'id="sec-cidade"' in h) or palavras(h) >= MIN_PALAVRAS
        (indexar if ok else fora).append(slug)
        h = h.replace(NOINDEX if ok else INDEX, INDEX if ok else NOINDEX, 1)
        if h != orig:
            p.write_text(h, encoding="utf-8")
            alteradas += 1

    sm = RAIZ / "sitemap.xml"
    x = sm.read_text(encoding="utf-8")
    for slug in fora:
        x = re.sub(r"\s*<url><loc>" + re.escape(f"{SITE}/{slug}") + r"</loc>.*?</url>", "", x)
    hoje = date.today().isoformat()
    for slug in indexar:
        loc = f"{SITE}/{slug}"
        if f"<loc>{loc}</loc>" not in x:
            x = x.replace("</urlset>", f"  <url><loc>{loc}</loc><lastmod>{hoje}</lastmod>"
                                       f"<changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>")
    sm.write_text(x, encoding="utf-8")
    print(f"{len(indexar)} fichas indexadas, {len(fora)} fora do índice; {alteradas} arquivos alterados")


if __name__ == "__main__":
    main()
