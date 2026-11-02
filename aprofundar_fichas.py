#!/usr/bin/env python3
"""Aprofunda fichas com texto próprio de cada cidade (nov/2026).

Lê dados/aprofundamento/<slug>.json e, na ficha <slug>.html:
- troca a frase de abertura (lede), se houver uma nova;
- cria a seção "A cidade" antes de "OM sediadas";
- acrescenta números locais em "Custo de vida e aluguel";
- cria Saúde, Escolas e Clima quando a ficha não tinha;
- refaz "O que fazer e lazer" com 5 a 7 lugares;
- põe dicas específicas da cidade no começo de "Antes de ir";
- refaz o índice de atalhos da ficha.

Cada bloco inserido fica entre <!-- aprof:x --> e <!-- /aprof:x -->, então dá
para rodar de novo depois de editar um JSON:  python3 aprofundar_fichas.py
"""
import html as H
import json
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent
MES = "nov/2026"
HOJE = "2026-11-02"
MESES = "JFMAMJJASOND"
ABREV = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
ORDEM = [("sec-cidade", "A cidade"), ("sec-om", "OM sediadas"), ("sec-acesso", "Como chegar"),
         ("sec-custo", "Custo de vida e moradia"), ("sec-saude", "Saúde"), ("sec-educacao", "Educação"),
         ("sec-clima", "Clima"), ("sec-cultura", "Cultura e lazer"), ("sec-chegada", "Antes de ir"),
         ("sec-video", "Vídeo")]


def e(s):
    return H.escape(s, quote=False)


def fontes(fs):
    if not fs:
        return ""
    lk = " · ".join(f'<a href="{H.escape(f["url"])}" rel="nofollow noopener" target="_blank">{e(f["nome"])}</a>' for f in fs)
    return f'<div class="src">Fontes: {lk} · conferido em {MES}</div>'


def ps(lst):
    return "".join(f"<p>{e(p)}</p>" for p in lst)


def secao(sid, titulo, cidade, corpo):
    return (f'<!-- aprof:{sid} --><section class="sec" id="{sid}">\n'
            f'      <div><h2>{titulo}</h2><div class="eyebrow">{e(cidade)} · {MES}</div></div>\n'
            f'      <div class="body">{corpo}</div>\n    </section><!-- /aprof:{sid} -->\n    ')


def limpa(h):
    # remove blocos de uma execução anterior
    h = re.sub(r"<!-- aprof:(sec-[a-z-]+) -->.*?<!-- /aprof:\1 -->\n?\s*", "", h, flags=re.S)
    h = re.sub(r"<!-- aprof:(custo|chegada) -->.*?<!-- /aprof:\1 -->", "", h, flags=re.S)
    return h


def faixas(meses):
    m = sorted(set(meses))
    if not m or len(m) == 12:
        return ""
    ini = [x for x in m if (x - 2) % 12 + 1 not in m][0]
    fim = ini
    while fim % 12 + 1 in m:
        fim = fim % 12 + 1
    secos = [x for x in range(1, 13) if x not in m]
    si = [x for x in secos if (x - 2) % 12 + 1 not in secos][0]
    sf = si
    while sf % 12 + 1 in secos:
        sf = sf % 12 + 1
    return f"{ABREV[ini-1]}–{ABREV[fim-1]}", f"{ABREV[si-1]}–{ABREV[sf-1]}"


def bloco_clima(c):
    meses = c.get("chuvoso") or []
    barras = "".join(f'<div class="{"wet" if i + 1 in meses else "dry"}">{l}</div>' for i, l in enumerate(MESES))
    fx = faixas(meses)
    leg = ""
    if fx:
        leg = (f'<div class="legend"><span><i style="background:var(--accent)"></i>Chuvoso ({fx[0]})</span>'
               f'<span><i style="background:var(--mark-soft); border:1px solid var(--line)"></i>Seco ({fx[1]})</span></div>')
    return (f"<p>{e(c['texto'])}</p><div class=\"climate\" aria-label=\"Estações por mês\">{barras}</div>{leg}"
            + fontes(c.get("fontes")))


def secao_html(h, sid):
    m = re.search(r'(<!-- aprof:' + sid + r' -->)?<section class="sec" id="' + sid + r'">.*?</section>(<!-- /aprof:' + sid + r' -->)?', h, re.S)
    return m


def insere_depois(h, sids, bloco):
    """Insere o bloco depois da primeira seção existente da lista (de trás para frente)."""
    for sid in sids:
        m = secao_html(h, sid)
        if m:
            return h[:m.end()] + "\n    " + bloco.rstrip() + h[m.end():]
    raise ValueError("âncora não encontrada")


def processa(slug, d):
    p = RAIZ / f"{slug}.html"
    h = orig = p.read_text(encoding="utf-8")
    h = limpa(h)
    cidade = re.search(r"<h1>(.*?) <span>", h).group(1)

    if d.get("lede"):
        h = re.sub(r'<p class="lede">.*?</p>', f'<p class="lede">{e(d["lede"])}</p>', h, count=1, flags=re.S)

    # A cidade
    c = d.get("cidade")
    if c:
        bloco = secao("sec-cidade", f"Como é {cidade}", cidade, ps(c["paragrafos"]) + fontes(c.get("fontes")))
        m = secao_html(h, "sec-om")
        h = h[:m.start()] + bloco + h[m.start():]

    # custo
    ce = d.get("custo_extra")
    if ce and ce.get("paragrafos"):
        add = "<!-- aprof:custo -->" + ps(ce["paragrafos"]) + fontes(ce.get("fontes")) + "<!-- /aprof:custo -->"
        m = secao_html(h, "sec-custo")
        sec = m.group(0)
        if '<div class="bairros"' in sec:
            sec2 = sec.replace('<div class="bairros"', add + '<div class="bairros"', 1)
        else:
            i = sec.rfind("</div>\n    </section>")
            sec2 = sec[:i] + add + sec[i:]
        h = h[:m.start()] + sec2 + h[m.end():]

    # saúde / educação / clima (só se não existirem)
    ant = ["sec-custo"]
    for sid, tit, campo in [("sec-saude", "Saúde e hospitais", "saude"), ("sec-educacao", "Escolas e educação", "educacao"),
                            ("sec-clima", "Clima e temperatura", "clima")]:
        v = d.get(campo)
        if v and not secao_html(h, sid):
            corpo = bloco_clima(v) if campo == "clima" else ps(v["paragrafos"]) + fontes(v.get("fontes"))
            if campo == "saude":
                corpo += ('<p><a href="/guias/saude-fusex-na-transferencia" class="ck-link">'
                          'Guia: como levar o atendimento do FuSEx para a nova guarnição →</a></p>')
            h = insere_depois(h, list(reversed(ant)), secao(sid, tit, cidade, corpo))
        ant.append(sid)

    # lazer
    lz = d.get("lazer")
    if lz and lz.get("lugares"):
        lug = "".join(f'<div class="place"><span class="km">{e(x.get("km") or "")}</span><b>{e(x["nome"])}</b>'
                      f'<p>{e(x["desc"])}</p></div>' for x in lz["lugares"])
        corpo = (f"<p>{e(lz['intro'])}</p>" if lz.get("intro") else "") + f'<div class="places">{lug}</div>' + fontes(lz.get("fontes"))
        bloco = secao("sec-cultura", "O que fazer e lazer", cidade, corpo)
        m = secao_html(h, "sec-cultura")
        if m:
            h = h[:m.start()] + bloco.rstrip() + h[m.end():]
        else:
            h = insere_depois(h, ["sec-clima", "sec-educacao", "sec-saude", "sec-custo"], bloco)

    # antes de ir
    ai = d.get("antes_de_ir")
    if ai:
        add = "<!-- aprof:chegada --><ul>" + "".join(f"<li>{e(x)}</li>" for x in ai) + "</ul><!-- /aprof:chegada -->"
        m = secao_html(h, "sec-chegada")
        sec = m.group(0).replace('<div class="body">', '<div class="body">' + add, 1)
        h = h[:m.start()] + sec + h[m.end():]

    # índice de atalhos
    ids = set(re.findall(r'id="(sec-[a-z-]+)"', h))
    nav = "".join(f'<a href="#{sid}">{lab}</a>' for sid, lab in ORDEM if sid in ids)
    h = re.sub(r'(<a href="#sec-[a-z-]+">[^<]*</a>\s*)+', nav, h, count=1)

    h = h.replace("Ficha conferida em <b>outubro de 2026</b>", "Ficha atualizada em <b>novembro de 2026</b>")
    if h != orig:
        p.write_text(h, encoding="utf-8")
        return True
    return False


def main():
    alt = []
    for j in sorted((RAIZ / "dados" / "aprofundamento").glob("*.json")):
        d = json.loads(j.read_text(encoding="utf-8"))
        if processa(d["slug"], d):
            alt.append(d["slug"])
    sm = RAIZ / "sitemap.xml"
    x = sm.read_text(encoding="utf-8")
    for s in alt:
        x = re.sub(r"(<loc>https://guiadeguarnicoes\.com/" + re.escape(s) + r"</loc><lastmod>)[^<]+", r"\g<1>" + HOJE, x)
    sm.write_text(x, encoding="utf-8")
    print(len(alt), "fichas aprofundadas")


if __name__ == "__main__":
    main()
