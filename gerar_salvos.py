#!/usr/bin/env python3
"""Gera a página /salvos (guarnições salvas e vistas recentemente) e cidades-salvos.js.

As guarnições salvas ficam no próprio aparelho (localStorage no site, Preferences no app): o abas.js monta
a lista a partir de cidades-salvos.js, que traz nome, UF, Comando e descrição de cada ficha.
A página usa o cabeçalho e o rodapé do 404.html (noindex: não faz sentido no Google).
Rode de novo quando entrar ou sair uma ficha:  python3 gerar_salvos.py
"""
import html as H
import json
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent

MAIN = """<main>
  <div class="wrap gg-salvos">
    <p class="eyebrow">Neste aparelho</p>
    <h1>Guarnições salvas</h1>
    <p class="intro">Toque em <b>Salvar</b> em qualquer ficha para guardar a guarnição aqui. A lista fica guardada neste aparelho, sem cadastro.</p>
    <div id="gg-salvos" class="gg-lista" aria-live="polite"></div>
    <section class="gg-recentes" id="gg-recentes-sec" hidden>
      <h2>Vistas recentemente</h2>
      <div id="gg-recentes" class="gg-lista"></div>
    </section>
  </div>
</main>
<script src="/cidades-salvos.js?v=1"></script>"""


def main():
    cidades = {}
    for p in sorted(RAIZ.glob("*.html")):
        s = p.read_text(encoding="utf-8")
        if '<div class="fhead">' not in s:
            continue
        h1 = re.search(r'<div class="fhead">[\s\S]*?<h1>([^<]*)<span>([A-Z]{2})</span></h1>', s)
        if not h1:
            continue
        desc = re.search(r'<meta name="description" content="([^"]*)"', s)
        cm = re.search(r'<span class="tag hot">([A-Z]+) ·', s)
        cidades[p.stem] = {"n": H.unescape(h1.group(1).strip()), "uf": h1.group(2), "cm": cm.group(1) if cm else "",
                           "d": H.unescape(desc.group(1)) if desc else ""}
    (RAIZ / "cidades-salvos.js").write_text(
        "/* Fichas do Guia para a página Salvos. Gerado por gerar_salvos.py. Não edite à mão. */\n"
        "window.GG_CIDADES=" + json.dumps(cidades, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")

    base = (RAIZ / "404.html").read_text(encoding="utf-8")
    base = re.sub(r"<title>[^<]*</title>", "<title>Guarnições salvas · Guia de Guarnições</title>", base)
    base = re.sub(r'<meta name="description" content="[^"]*">',
                  '<meta name="description" content="As guarnições que você salvou no Guia de Guarnições e as fichas vistas recentemente.">', base)
    base = re.sub(r"<main[\s\S]*</main>", lambda m: MAIN, base)
    (RAIZ / "salvos.html").write_text(base, encoding="utf-8")
    print(f"salvos.html e cidades-salvos.js ({len(cidades)} fichas)")


if __name__ == "__main__":
    main()
