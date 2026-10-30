#!/usr/bin/env python3
"""Foto de capa e "Resumo rápido" no topo de cada ficha.

Foto de capa
- Fonte: dados/capas.tsv (slug, arquivo no Wikimedia Commons, largura, altura,
  autor, licença, URL da licença). Fotos livres (CC BY, CC BY-SA, CC0, domínio
  público), escolhidas a dedo: paisagem da cidade, sem fardados, quartéis,
  brasões ou bandeiras.
- A imagem é servida pelo próprio Wikimedia (miniaturas de 500/960/1280 px),
  com crédito e licença na legenda, como as licenças exigem.
- Fichas sem foto adequada recebem uma faixa gráfica no lugar.
- Para trocar uma foto: edite a linha no TSV e rode este script.

Resumo rápido (6 cartões, mesmo formato em todas as fichas)
- Aluguel 2 quartos, Colégio Militar mais próximo, distância até a capital,
  saúde militar, fuso e população.
- Fonte dos números: comparar-dados.js (resumo padronizado das fichas) e
  calculadora-distancias.js (distâncias rodoviárias OSRM/OpenStreetMap).
  Localidades sem ligação por estrada são tratadas à parte (NOROAD).
- O bloco antigo de números (.facts) perde os itens repetidos no resumo.

Idempotente:  python3 capa_resumo.py   (depois  python3 otimizar.py  se mexer no style.css)
"""
import csv, hashlib, html as H, json, math, pathlib, re, urllib.parse

RAIZ = pathlib.Path(__file__).resolve().parent

def carrega_js(nome, var):
    txt = (RAIZ / nome).read_text(encoding="utf-8")
    m = re.search(r"window\.%s\s*=\s*" % var, txt)
    return json.loads(txt[m.end():].strip().rstrip(";"))

CMP = carrega_js("comparar-dados.js", "CMP")
LS = carrega_js("locais-dados.js", "LS")
DIST_TXT = (RAIZ / "calculadora-distancias.js").read_text(encoding="utf-8")
m = re.search(r"window\.GG_DIST\s*=\s*", DIST_TXT)
# GG_DIST não é JSON puro (chaves sem aspas): extrai os dois campos usados
IDS = json.loads(re.search(r"ids:(\[.*?\])", DIST_TXT).group(1))
VALS = re.search(r'd:"([^"]*)"', DIST_TXT).group(1).split(".")
N = len(IDS)
assert len(VALS) == N * (N - 1) // 2
M = {}
k = 0
for i in range(N):
    for j in range(i + 1, N):
        if VALS[k]:
            d = int(VALS[k], 36)
            M[(IDS[i], IDS[j])] = M[(IDS[j], IDS[i])] = d
        k += 1

# Sem ligação por estrada com o resto do país (rio ou avião). O OSRM "encaixa"
# essas localidades na estrada mais próxima e gera distâncias sem sentido.
NOROAD = {"macapa-ap", "barcelos-am", "sao-gabriel-da-cachoeira-am", "tefe-am", "tabatinga-am",
          "marechal-thaumaturgo-ac", "santa-rosa-do-purus-ac", "auaris-rr", "surucucu-rr",
          "cucui-am", "estirao-do-equador-am", "iauarete-am", "ipiranga-am", "maturaca-am",
          "palmeiras-do-javari-am", "pari-cachoeira-am", "querari-am", "sao-joaquim-am",
          "tunui-am", "vila-bittencourt-am"}
SO_AVIAO = {"auaris-rr", "surucucu-rr"}

def dist(a, b):
    if a == b:
        return 0
    if a in NOROAD or b in NOROAD:
        return None
    return M.get((a, b))

XY = {g["s"]: (g["x"], g["y"]) for g in LS["g"]}
CM = {x["s"]: x["cm"] for x in CMP if x["cm"] and x["cm"].startswith("Colégio")}
CAP = {"AC": "rio-branco-ac", "AL": "maceio-al", "AP": "macapa-ap", "AM": "manaus-am",
       "BA": "salvador-ba", "CE": "fortaleza-ce", "DF": "brasilia-df", "GO": "goiania-go",
       "MA": "sao-luis-ma", "MT": "cuiaba-mt", "MS": "campo-grande-ms", "MG": "belo-horizonte-mg",
       "PA": "belem-pa", "PB": "joao-pessoa-pb", "PR": "curitiba-pr", "PE": "recife-pe",
       "PI": "teresina-pi", "RJ": "rio-de-janeiro-rj", "RN": "natal-rn", "RS": "porto-alegre-rs",
       "RO": "porto-velho-ro", "RR": "boa-vista-rr", "SC": "florianopolis-sc", "SP": "sao-paulo-sp",
       "SE": "aracaju-se", "TO": "palmas-to"}
NOME = {x["s"]: x["c"] for x in CMP}

def km(v):
    return "~" + f"{v:,}".replace(",", ".") + " km" if v >= 10 else "menos de 10 km"

def cm_curto(n):
    return n.replace("Colégio Militar d", "CM d")

def ate(fatos, alvo):
    """Distância já citada na própria ficha ("Até Manaus") prevalece sobre a do OSRM."""
    nome = NOME[alvo]
    for rot in (f"Até {nome}", "Até o Rio" if alvo == "rio-de-janeiro-rj" else None):
        if rot and rot in fatos and re.search(r"\d", fatos[rot][0]) and "km" in fatos[rot][0]:
            return fatos[rot]
    return None

def resumo(x, fatos=None):
    fatos = fatos or {}
    s = x["s"]
    r = {}
    a = x["alu"]
    if a and a["v"] != "Sem amostra":
        r["alu"] = (a["v"], re.sub(r"^2 quartos · ", "", a["s"]))
    elif a:
        r["alu"] = ("Sem amostra", a["s"])
    else:
        r["alu"] = ("Sem mercado", "sem aluguel anunciado; consulte a OM sobre moradia")
    if s in CM:
        r["cm"] = ("Na cidade", CM[s])
    else:
        best = min(((dist(s, c), c) for c in CM if dist(s, c) is not None), default=None)
        if best:
            f = ate(fatos, best[1])
            r["cm"] = ((f[0] if f else km(best[0])), f"{cm_curto(CM[best[1]])}, por estrada")
        else:
            c = min(CM, key=lambda c: math.dist(XY[s], XY[c]))
            r["cm"] = (cm_curto(CM[c]), "o mais próximo; sem ligação por estrada")
    cap = CAP.get(x["uf"])
    if x["uf"] == "ES":
        r["cap"] = ("Grande Vitória", "região metropolitana da capital")
    elif cap == s:
        r["cap"] = ("É a capital", "capital federal" if x["uf"] == "DF" else "capital do estado")
    else:
        d = dist(s, cap)
        if d is not None:
            f = ate(fatos, cap)
            r["cap"] = ((f[0] if f else km(d)), f"até {NOME[cap]}, por estrada")
        else:
            r["cap"] = ("Sem estrada", f"até {NOME[cap]}: " + ("só de avião" if s in SO_AVIAO else "barco ou avião"))
    t = x["saude"] or ""
    if t.startswith("O atendimento inicial é feito na seção"):
        r["sau"] = ("Rede FuSEx", "seção de saúde da OM e rede conveniada")
    elif "próprio pelotão" in t:
        r["sau"] = ("No pelotão", "casos maiores seguem para a sede")
    else:
        mm = re.match(r"(H Gu|HGe|P Med Gu) \(([^)]+)\)", t)
        if mm:
            r["sau"] = (mm.group(1), mm.group(2))
        else:
            mm = re.search(r"(Hospital (?:Militar|Geral|de Guarnição|Central|de Área)[^,(.]*?|Posto Médico[^,(.]*?)"
                           r"(?: \(([A-Z][A-Za-z ]+)\))?(?:,| que|\.| com)", t)
            if mm:
                full, sig = mm.group(1).strip(), mm.group(2)
                if full.startswith("Posto"):
                    full = full.replace("da Guarnição", "de Guarnição")
                    r["sau"] = ("P Med Gu" if "de Guarnição" in full else "Posto Médico", full)
                else:
                    sg = ("HMA" if "Militar de Área" in full else "HGe" if "Geral" in full
                          else "H Gu" if "de Guarnição" in full else "HCE" if "Central" in full else "Hospital militar")
                    r["sau"] = (sig or sg, re.sub(r" e uma Policlínica.*", " e Policlínica", full))
            else:
                r["sau"] = ("Rede FuSEx", "estrutura local e rede conveniada")
    r["fuso"] = (x["fuso"]["v"], x["fuso"]["s"]) if x["fuso"] else None
    r["pop"] = (x["pop"]["v"], x["pop"]["s"]) if x["pop"] else None
    return r

# ---------- ícones (traço, herdam a cor) ----------
def ic(p):
    return ('<svg class="ri" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" '
            'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>")
ICONES = {
    "alu": ic('<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>'),
    "cm": ic('<path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3V11"/><path d="M21.5 9v5"/>'),
    "cap": ic('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
    "sau": ic('<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M12 8v8M8 12h8"/>'),
    "fuso": ic('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    "pop": ic('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9.5" r="2.4"/><path d="M15.8 14.2c2.4.1 4.1 1.7 4.7 4.3"/>'),
}
ROTULO = {"alu": "Aluguel 2 quartos", "cm": "Colégio Militar", "cap": "Até a capital",
          "sau": "Saúde militar", "fuso": "Fuso", "pop": "População"}
LINK = {"alu": "#sec-custo", "cm": "#sec-educacao", "cap": "#sec-acesso", "sau": "#sec-saude"}

def bloco_resumo(r, html_ficha):
    cards = []
    for k in ["alu", "cm", "cap", "sau", "fuso", "pop"]:
        if not r.get(k):
            continue
        v, s = r[k]
        rot = "Aluguel por m²" if k == "alu" and "/m²" in v else ROTULO[k]
        inner = (f'{ICONES[k]}<span class="rl">{rot}</span>'
                 f'<span class="rv num">{H.escape(v)}</span><span class="rs">{H.escape(s)}</span>')
        alvo = LINK.get(k)
        if alvo and f'id="{alvo[1:]}"' in html_ficha:
            cards.append(f'<a class="rc" href="{alvo}">{inner}</a>')
        else:
            cards.append(f'<div class="rc">{inner}</div>')
    return ('<section class="resumo" aria-labelledby="resumo-t"><div class="resumo-h">'
            '<h2 id="resumo-t">Resumo rápido</h2><span class="eyebrow">o que a família pergunta primeiro</span></div>'
            '<div class="rgrid">' + "".join(cards) + "</div></section>")

# ---------- foto de capa ----------
def thumb(arq, w):
    a = arq.replace(" ", "_")
    h = hashlib.md5(a.encode("utf-8")).hexdigest()
    q = urllib.parse.quote(a)
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{w}px-{q}"

def bloco_capa(cidade, uf, foto, destaque, estado=""):
    if not foto:
        return ('<div class="capa capa-sem" role="img" aria-label="Faixa decorativa">'
                '<svg viewBox="0 0 28 28" width="44" height="44" aria-hidden="true"><circle cx="14" cy="14" r="12.5" fill="none" '
                'stroke="currentColor" stroke-width="1.2"/><path d="M14 3 L17 14 L14 25 L11 14 Z" fill="var(--mark)"/></svg>'
                f'<span>{H.escape(destaque or "Guarnição")}</span><small>{H.escape(estado)} · sem foto livre da cidade por enquanto</small></div>')
    w, hgt = int(foto["largura"]), int(foto["altura"])
    larg = [x for x in (500, 960, 1280) if x <= w]
    srcset = ", ".join(f"{thumb(foto['arquivo'], x)} {x}w" for x in larg)
    alt = f"Vista de {cidade}-{uf}"
    pagina = "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(foto["arquivo"].replace(" ", "_"))
    lic = H.escape(foto["licenca"])
    lic_html = f'<a href="{H.escape(foto["licenca_url"])}" rel="license noopener" target="_blank">{lic}</a>' if foto["licenca_url"] else lic
    autor = H.escape(foto["autor"] or "autor desconhecido")
    return (f'<figure class="capa"><img src="{thumb(foto["arquivo"], larg[-1])}" srcset="{srcset}" '
            f'sizes="(min-width:1072px) 1040px, calc(100vw - 32px)" width="{larg[-1]}" height="{round(larg[-1]*hgt/w)}" '
            f'alt="{H.escape(alt)}" fetchpriority="high" decoding="async">'
            f'<figcaption>Foto: {autor} · {lic_html} · <a href="{pagina}" rel="noopener" target="_blank">Wikimedia Commons</a></figcaption></figure>')

REPETIDOS = {"População", "Fuso", "Aluguel 2 quartos", "Aluguel", "Saúde militar"}

def limpa_facts(html):
    m = re.search(r'<div class="facts">(.*?)\n    </div>', html, flags=re.S)
    if not m:
        return html
    fatos = re.findall(r'<div class="fact"><div class="eyebrow">(.*?)</div>.*?</div></div>', m.group(1), flags=re.S)
    itens = re.findall(r'(<div class="fact"><div class="eyebrow">(.*?)</div><div class="v num">.*?</div><div class="s">.*?</div></div>)', m.group(1), flags=re.S)
    mantidos = [blk for blk, r in itens if H.unescape(r) not in REPETIDOS]
    if not mantidos:
        return html[:m.start()] + html[m.end():]
    novo = '<div class="facts">\n      ' + "".join(mantidos) + "\n    </div>"
    return html[:m.start()] + novo + html[m.end():]

def main():
    capas = {}
    tsv = RAIZ / "dados" / "capas.tsv"
    with open(tsv, encoding="utf-8") as f:
        for row in csv.DictReader((l for l in f if not l.startswith("#")), delimiter="\t"):
            capas[row["slug"]] = row
    n = 0
    for x in CMP:
        p = RAIZ / f"{x['s']}.html"
        html = p.read_text(encoding="utf-8")
        # remove versões anteriores (idempotência)
        html = re.sub(r'<!-- capa -->.*?<!-- /capa -->\n\s*', "", html, flags=re.S)
        html = re.sub(r'<!-- resumo -->.*?<!-- /resumo -->\n\s*', "", html, flags=re.S)
        fatos = {H.unescape(r): (H.unescape(v), H.unescape(sub)) for r, v, sub in re.findall(
            r'<div class="fact"><div class="eyebrow">(.*?)</div><div class="v num">(.*?)</div><div class="s">(.*?)</div></div>', html)}
        capa = bloco_capa(x["c"], x["uf"], capas.get(x["s"]) or capas.get(x["s"][:-3]), x.get("d"), x.get("e", ""))
        html = html.replace('<div class="fhead">', f'<!-- capa -->{capa}<!-- /capa -->\n    <div class="fhead">', 1)
        html = limpa_facts(html)
        res = bloco_resumo(resumo(x, fatos), html)
        # resumo logo abaixo do título e da data de conferência, antes dos botões
        i = html.find('<div class="atalhos">')
        if i < 0:
            i = html.find('<p class="lede">')
        html = html[:i] + f"<!-- resumo -->{res}<!-- /resumo -->\n      " + html[i:]
        # og:image da ficha continua o card próprio; a foto entra no JSON-LD
        p.write_text(html, encoding="utf-8")
        n += 1
    print(f"{n} fichas atualizadas · {sum(1 for x in CMP if x['s'] in capas or x['s'][:-3] in capas)} com foto")

if __name__ == "__main__":
    main()
