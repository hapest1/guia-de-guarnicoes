#!/usr/bin/env python3
"""Gera a Calculadora de Passagens e liga a página ao resto do site.

- calculadora-de-passagens.html: cabeçalho, estilo e rodapé vêm de calculadora-de-transferencia.html,
  para as duas calculadoras ficarem iguais. A conta está em calculadora-passagens.js
  (a tarifa por km é a constante TARIFA_PASSAGEM_KM, no começo do arquivo).
- menu "Calculadoras" de todas as páginas: ganha o link da página nova.
- fichas das guarnições: atalho "Calcular passagens para cá", que abre a calculadora com o destino preenchido.
- sitemap.xml: ganha a página nova.

Pode rodar de novo à vontade: só grava o que mudou.
Uso: python3 calculadora_passagens.py
"""
import datetime
import html as H
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent
SITE = "https://guiadeguarnicoes.com"
CAMINHO = "/calculadora-de-passagens"
TITULO = "Calculadora de Passagens"
DESC = ("Estime o valor das passagens da transferência pela distância entre a cidade de origem e a de destino, "
        "para adultos e crianças. Escolha as cidades e a distância por estrada é calculada na hora.")

MAIN = """<main class="wrap pagina calc-pagina">
  <nav class="crumbs" aria-label="Caminho"><a href="/">Início</a><span>›</span><span>Calculadora de Passagens</span></nav>
  <p class="kicker" style="margin-top:18px">Saiu a movimentação?</p>
  <h1 class="pg-title">Calculadora de Passagens</h1>
  <p class="intro">Estime o valor das passagens da transferência pela distância entre a cidade de origem e a de destino. Escolha as duas cidades: a distância por estrada é calculada na hora e pode ser ajustada à mão.</p>

  <form class="calc" id="passForm" autocomplete="off" onsubmit="return false">
    <fieldset class="calc-box">
      <legend><span class="calc-n">1</span>Origem e destino</legend>
      <div class="calc-rota">
        <div class="pass-ponta">
          <b class="eyebrow">Origem</b>
          <label class="calc-f"><span class="eyebrow">Estado</span><select id="ufO" aria-label="Estado de origem"></select></label>
          <label class="calc-f"><span class="eyebrow">Cidade</span><select id="cidO" aria-label="Cidade de origem"></select></label>
        </div>
        <button type="button" class="btn sec cmp-troca" id="troca" aria-label="Trocar origem e destino" title="Trocar origem e destino"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/></svg></button>
        <div class="pass-ponta">
          <b class="eyebrow">Destino</b>
          <label class="calc-f"><span class="eyebrow">Estado</span><select id="ufD" aria-label="Estado de destino"></select></label>
          <label class="calc-f"><span class="eyebrow">Cidade</span><select id="cidD" aria-label="Cidade de destino"></select></label>
        </div>
      </div>
      <div class="calc-dist calc-pinfo" id="rotaInfo" aria-live="polite"></div>
      <p style="margin:10px 0 0"><button type="button" class="btn sec" id="recalc" hidden>Recalcular rota manualmente</button></p>
      <div class="calc-grid">
        <label class="calc-f"><span class="eyebrow">Distância (KM)</span><input id="km" type="number" inputmode="decimal" min="0" step="1" placeholder="Escolha as cidades ou digite"></label>
      </div>
    </fieldset>

    <fieldset class="calc-box">
      <legend><span class="calc-n">2</span>Passagens</legend>
      <div class="calc-grid">
        <label class="calc-f"><span class="eyebrow">Valor unitário (adulto)</span><input id="ua" type="number" inputmode="decimal" min="0" step="0.01" placeholder="R$"></label>
        <label class="calc-f"><span class="eyebrow">Qtd adultos</span><input id="qa" type="number" inputmode="numeric" min="0" step="1" value="0"></label>
        <label class="calc-f"><span class="eyebrow">Valor unitário (criança)</span><input id="uc" type="number" inputmode="decimal" min="0" step="0.01" placeholder="R$"></label>
        <label class="calc-f"><span class="eyebrow">Qtd crianças</span><input id="qc" type="number" inputmode="numeric" min="0" step="1" value="0"></label>
      </div>
      <p class="calc-dica">Estimativa por distância (R$ 0,49/km). Edite o valor unitário com o preço real da passagem aérea ou rodoviária.</p>
    </fieldset>
  </form>

  <section class="calc-res" id="res" aria-live="polite"></section>

  <div class="note"><b>Estimativa não oficial.</b> Esta calculadora não substitui os cálculos nem as decisões da Administração Militar: o valor das passagens é apurado pela sua OM, com as tarifas vigentes na data. A distância é a rota por estrada calculada no OpenStreetMap.</div>

  <section class="calc-como">
    <h2>Como o cálculo é feito</h2>
    <dl>
      <dt>Distância</dt><dd>Rota por estrada entre a cidade de origem e a de destino, calculada no OpenStreetMap quando as duas estão escolhidas. O campo aceita outro valor, e o botão "Recalcular rota manualmente" refaz a consulta.</dd>
      <dt>Valor unitário</dt><dd>Distância em quilômetros × R$ 0,49, arredondado para centavos. O mesmo valor é sugerido para adulto e criança, e os dois campos podem ser editados separadamente. Ao mudar a distância, os dois voltam para o valor sugerido.</dd>
      <dt>Total</dt><dd>Valor unitário do adulto × quantidade de adultos, mais valor unitário da criança × quantidade de crianças.</dd>
    </dl>
    <p class="calc-dica">A estimativa é uma só para qualquer meio de transporte. Para ajuda de custo, bagagem e veículos, use a <a href="/calculadora-de-transferencia">Calculadora de Transferência</a>.</p>
  </section>
</main>"""

CSS = """<style id="css-pass">
.pass-ponta{display:grid;gap:8px;min-width:0;align-content:start}
.pass-ponta>b{color:var(--accent)}
.pass-ponta select:disabled{opacity:.6}
</style>"""

MENU_OLD = '<a href="/calculadora-de-ajuda-de-custo">Calculadora de Ajuda de Custo</a></div></details>'
MENU_NEW = ('<a href="/calculadora-de-ajuda-de-custo">Calculadora de Ajuda de Custo</a>'
            f'<a href="{CAMINHO}">{TITULO}</a></div></details>')


def grava(p, texto):
    if not p.exists() or p.read_text(encoding="utf-8") != texto:
        p.write_text(texto, encoding="utf-8")
        return True
    return False


def pagina():
    s = (RAIZ / "calculadora-de-transferencia.html").read_text(encoding="utf-8")
    i, j = s.index("<main"), s.index("</main>") + len("</main>")
    topo, fim = s[:i], s[j:]
    t, d, url = H.escape(TITULO + " · Guia de Guarnições"), H.escape(DESC), SITE + CAMINHO
    topo = re.sub(r"<title>.*?</title>", f"<title>{t}</title>", topo)
    topo = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{d}">', topo)
    topo = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', topo)
    topo = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{t}">', topo)
    topo = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{d}">', topo)
    topo = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', topo)
    topo = re.sub(r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{t}">', topo)
    topo = re.sub(r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{d}">', topo)
    topo = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', "", topo, flags=re.S)
    topo = topo.replace("</head>", CSS + "\n</head>", 1)
    # scripts da Calculadora de Transferência saem; entram os municípios e a conta das passagens
    fim = re.sub(r'<script src="/(?:comparar-dados|busca-guarnicao|calculadora-dados|calculadora-distancias|calculadora-aereo|calculadora)\.js[^"]*" defer></script>\s*', "", fim)
    fim = fim.replace("</body>", '<script src="/municipios-dados.js" defer></script>\n<script src="/calculadora-passagens.js?v=1" defer></script>\n</body>', 1)
    return topo + MAIN + fim


def main():
    n = 0
    n += grava(RAIZ / "calculadora-de-passagens.html", pagina())

    for p in sorted(list(RAIZ.glob("*.html")) + list((RAIZ / "guias").glob("*.html"))):
        h = p.read_text(encoding="utf-8")
        novo = h
        if CAMINHO not in novo.split("</header>", 1)[0]:
            novo = novo.replace(MENU_OLD, MENU_NEW)
        # fichas: atalho com o destino já preenchido
        m = re.search(r'<a class="atalho-calc" href="/calculadora-de-transferencia\?d=([a-z0-9-]+)">[^<]*</a>', novo)
        if m and f'{CAMINHO}?d=' not in novo:
            novo = novo.replace(m.group(0), m.group(0) + f'<a href="{CAMINHO}?d={m.group(1)}">Calcular passagens para cá</a>', 1)
        n += grava(p, novo)

    sm = RAIZ / "sitemap.xml"
    x = sm.read_text(encoding="utf-8")
    if SITE + CAMINHO + "<" not in x:
        ref = re.search(r'  <url><loc>' + re.escape(SITE) + r'/calculadora-de-ajuda-de-custo</loc>.*?</url>\n', x)
        hoje = datetime.date.today().isoformat()
        x = x.replace(ref.group(0), ref.group(0) + f'  <url><loc>{SITE}{CAMINHO}</loc><lastmod>{hoje}</lastmod>'
                      '<changefreq>monthly</changefreq><priority>0.7</priority></url>\n')
        n += grava(sm, x)
    print(f"{n} arquivos gravados")


if __name__ == "__main__":
    main()
