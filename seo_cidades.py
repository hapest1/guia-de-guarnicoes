#!/usr/bin/env python3
"""SEO das fichas das guarnições para buscas de militares E civis.

Baseado nas sugestões de busca do Google (out/2026) para as 171 cidades.
Intenções mais buscadas: população/habitantes, clima/temperatura, onde fica e
como chegar, "é bom morar", custo de vida/"é caro", aluguel, melhores bairros,
o que fazer, tem aeroporto.

O que faz em cada ficha:
- <title> sem reticências, até ~60 caracteres, com "Morar em X-UF" + intenções.
- meta description única (inclui aluguel quando há) e até ~158 caracteres.
- og:title/og:description e o JSON-LD Article (headline, description, keywords).
- H2 com os termos buscados (aluguel, temperatura, hospitais, escolas, o que fazer).
- H3 dos bairros: "Melhores bairros para morar em X".
- Frase no início dizendo que a ficha também serve para civis.
- Seção "Perguntas frequentes sobre X" + JSON-LD FAQPage, com respostas tiradas
  do próprio texto da ficha (nada inventado).

Idempotente: pode rodar de novo após editar uma ficha:  python3 seo_cidades.py
Depois rode  python3 otimizar.py  se mexer no style.css.
"""
import html as H
import json
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent
HOJE = "2026-10-29"
MES = "out/2026"

# preposições para cidades com artigo
DO = ("Rio Grande do Sul", "Rio de Janeiro", "Rio Grande do Norte", "Paraná", "Pará", "Amazonas", "Amapá",
      "Acre", "Ceará", "Piauí", "Maranhão", "Tocantins", "Espírito Santo", "Mato Grosso", "Mato Grosso do Sul")
ARTIGO = {"rio-de-janeiro-rj": ("no", "do", "ao")}


def txt(s):
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\s+", " ", H.unescape(s)).strip()


def frases(s, n=2, lim=330):
    partes = re.split(r"(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9])", s)
    out = ""
    partes = [p for p in partes if not p.rstrip().endswith(":")]
    for p in partes[:n]:
        if out and len(out) + len(p) + 1 > lim:
            break
        out = (out + " " + p).strip()
    return out


def sec(h, sid):
    m = re.search(r'<section class="sec[^"]*" id="' + sid + r'">(.*?)</section>', h, re.S)
    return m.group(1) if m else ""


def primeiro_p(bloco):
    b = re.sub(r'<div class="(note|bairros|src)".*?</div>', "", bloco, flags=re.S)
    b = re.sub(r'<div class="tbl-wrap">.*?</div>', "", b, flags=re.S)
    for p in re.findall(r"<p>(.*?)</p>", b, re.S):
        t = txt(p)
        if len(t) > 40:
            return t
    return ""


def frase_com(bloco, palavra):
    b = bloco.split('<div class="body">', 1)[-1]
    b = re.sub(r'<div class="(src|note)".*?</div>|<h3>.*?</h3>', " ", b, flags=re.S)
    t = txt(b.replace("</p>", "</p> ").replace("</li>", "</li> "))
    for f in re.split(r"(?<=[.!?])\s+", t):
        if palavra.lower() in f.lower():
            return f.strip()
    return ""


def fato(h, rotulo):
    m = re.search(r'<div class="eyebrow">' + re.escape(rotulo) +
                  r'</div><div class="v num">([^<]+)</div><div class="s">([^<]*)</div>', h)
    return (H.unescape(m.group(1)), H.unescape(m.group(2))) if m else None


def populacao(v):
    v = v.replace("~", "").strip()
    m = re.match(r"([\d,]+)\s*mi$", v)
    if m:
        n = m.group(1)
        return f"cerca de {n} {'milhão' if n.startswith('1,') or n == '1' else 'milhões'}"
    return "cerca de " + v


def cortar(s, lim):
    """Corta em fronteira de vírgula/ponto, sem reticências."""
    if len(s) <= lim:
        return s
    corte = s[:lim]
    i = max(corte.rfind(","), corte.rfind("."))
    return corte[:i].rstrip(" ,") + "." if i > 40 else corte.rsplit(" ", 1)[0] + "."


def faq_html(c, itens):
    det = "".join(
        f'<details><summary><h3>{H.escape(q)}</h3></summary><p>{H.escape(a)}</p></details>'
        for q, a in itens)
    return (f'<section class="sec faq" id="sec-faq">\n      <div><h2>Perguntas frequentes</h2>'
            f'<div class="eyebrow">{H.escape(c)} · {MES}</div></div>\n      <div class="body">{det}'
            f'<p class="faq-nota">Respostas resumidas desta ficha. Os detalhes e as fontes estão nas seções acima.</p></div>\n    </section>')


def faq_ld(itens):
    d = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in itens]}
    return '<script type="application/ld+json" id="faq-ld">' + json.dumps(d, ensure_ascii=False) + "</script>"


def processa(p):
    h = orig = p.read_text(encoding="utf-8")
    if "http-equiv=\"refresh\"" in h:
        return False
    slug = p.stem
    uf = slug[-2:].upper()
    m = re.search(r'"about":\{"@type":"City","name":"([^"]+)","containedInPlace":\{"@type":"State","name":"([^"]+)"', h)
    if not m:
        return False
    c, estado = m.group(1), m.group(2)
    no, do, ao = ARTIGO.get(slug, ("em", "de", "a"))
    pef = "<h2>O pelotão</h2>" in h
    cA = {"rio-de-janeiro-rj": "O Rio de Janeiro"}.get(slug, c)
    cM = {"rio-de-janeiro-rj": "o Rio de Janeiro"}.get(slug, c)
    tem_bairros = 'id="bairros"' in h

    # ---------- dados da própria ficha ----------
    pop = fato(h, "População")
    alug = fato(h, "Aluguel 2 quartos")
    alug_m2 = fato(h, "Aluguel")
    cesta = fato(h, "Cesta básica")
    clima_f = fato(h, "Clima")
    dist = re.search(r'<div class="eyebrow">(Até [^<]+)</div><div class="v num">([^<]+)</div><div class="s">([^<]*)</div>', h)
    lede = txt(re.search(r'<p class="lede">(.*?)</p>', h, re.S).group(1)) if '<p class="lede">' in h else ""
    s_acesso, s_custo, s_saude = sec(h, "sec-acesso"), sec(h, "sec-custo"), sec(h, "sec-saude")
    s_edu, s_clima, s_cult = sec(h, "sec-educacao"), sec(h, "sec-clima"), sec(h, "sec-cultura")

    # ---------- title ----------
    base = f"Morar {no} {c}-{uf}"
    if pef:
        opcoes = [f"{base}: como é a vida no pelotão de fronteira",
                  f"{c}-{uf}: como é a vida no pelotão de fronteira",
                  f"{c}-{uf}: pelotão de fronteira, acesso e clima",
                  f"{c}-{uf}: pelotão de fronteira"]
    else:
        meio = "bairros" if tem_bairros else "aluguel"
        opcoes = [f"{base}: custo de vida, {meio} e clima",
                  f"{base}: custo de vida e {meio}",
                  f"{base}: custo de vida",
                  f"{base}"]
    titulo = next((t for t in opcoes if len(t) <= 60), opcoes[-1])

    # ---------- description ----------
    if pef:
        desc = (f"Como é morar e servir {no} {c} ({uf}): acesso, moradia, abastecimento, saúde, escola, "
                f"clima e o que levar. Guia para militares e famílias.")
    else:
        aluguel = "aluguel"
        if alug:
            aluguel = f"aluguel (2 quartos a {alug[0].replace('~', '')})"
        partes = [f"Vai morar {no} {c}-{uf}? Custo de vida, {aluguel}", "bairros" if tem_bairros else None,
                  "clima", "saúde", "escolas", "o que fazer"]
        def junta(ps, fim=" Para militares, famílias e civis."):
            ps = [x for x in ps if x]
            return ", ".join(ps[:-1]) + " e " + ps[-1] + "." + fim
        desc = junta(partes)
        for drop in ["saúde", "escolas", "bairros"]:
            if len(desc) <= 158:
                break
            partes = [x for x in partes if x != drop]
            desc = junta(partes)
        if len(desc) > 158:
            desc = junta(partes, "")
    desc = cortar(desc, 158)

    ea = H.escape(titulo, quote=True)
    ed = H.escape(desc, quote=True)
    h = re.sub(r"<title>.*?</title>", f"<title>{ea}</title>", h, count=1)
    h = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{ed}">', h, count=1)
    h = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{ea}">', h, count=1)
    h = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{ed}">', h, count=1)

    # ---------- JSON-LD Article ----------
    def fix_ld(mm):
        d = json.loads(mm.group(1))
        if d.get("@type") != "Article":
            return mm.group(0)
        d["headline"] = titulo
        d["description"] = desc
        d["dateModified"] = HOJE
        kw = [k.strip() for k in d.get("keywords", "").split(",") if k.strip()]
        novos = [f"morar {no} {c}", f"como é morar {no} {c}", f"custo de vida {no} {c}", f"aluguel {no} {c}",
                 f"melhores bairros de {c}", f"clima {no} {c}", f"o que fazer {no} {c}", f"{c} {uf}"]
        for k in novos:
            if k not in kw:
                kw.append(k)
        d["keywords"] = ", ".join(kw)
        return '<script type="application/ld+json">' + json.dumps(d, ensure_ascii=False) + "</script>"
    h = re.sub(r'<script type="application/ld\+json">(\{"@context":"https://schema.org","@type":"Article".*?)</script>',
               fix_ld, h, count=1, flags=re.S)

    # ---------- kicker + frase para civis ----------
    h = h.replace('<p class="kicker">Guia da guarnição para militares e famílias</p>',
                  '<p class="kicker">Guia da cidade e da guarnição · para quem vai se mudar</p>')
    if not pef and 'class="civis"' not in h:
        h = re.sub(r'(<p class="intro">.*?)(</p>)',
                   lambda mm: mm.group(1) + f' <span class="civis">Não é militar? Os dados de custo de vida, '
                   f'aluguel, bairros, clima e lazer valem para qualquer pessoa que vá morar {no} {c}.</span>' + mm.group(2),
                   h, count=1, flags=re.S)

    # ---------- H2/H3 com termos buscados ----------
    if not pef:
        for velho, novo in [("Custo de vida e moradia", "Custo de vida e aluguel"), ("Saúde", "Saúde e hospitais"),
                            ("Educação", "Escolas e educação"), ("Clima", "Clima e temperatura"),
                            ("Cultura e lazer", "O que fazer e lazer")]:
            h = h.replace(f"<h2>{velho}</h2>", f"<h2>{novo}</h2>")
    h = re.sub(r"<h3>(Onde morar: bairros indicados|Melhores bairros para morar [^<]*)</h3>",
               f"<h3>Melhores bairros para morar {no} {c}</h3>", h)

    # ---------- FAQ (só com o que a ficha já diz) ----------
    itens = []
    if lede:
        itens.append((f"Como é morar {no} {c}?", frases(lede, 2)))
    if pop:
        itens.append((f"Quantos habitantes tem {cM}?",
                      f"{cA} ({uf}) tem {populacao(pop[0])}{' de' if 'milh' in populacao(pop[0]) else ''} habitantes ({pop[1]})."))
    onde = []
    pa = primeiro_p(s_acesso)
    if estado == "Distrito Federal":
        local = "no Distrito Federal"
    else:
        art = "da" if estado in ("Bahia", "Paraíba") else ("do" if estado in DO else "de")
        local = f"no estado {art} {estado}"
    if dist and re.sub(r"\D", "", dist.group(2)) not in re.sub(r"\D", "", pa):
        destino = dist.group(1).replace("Até ", "")
        onde.append(f"{cA} fica {local}, a {dist.group(2).replace('~', 'cerca de ')} de {destino}"
                    + (f" ({dist.group(3)})." if dist.group(3) else "."))
    elif not pef:
        onde.append(f"{cA} fica {local}.")
    if pa:
        onde.append(frases(pa, 2, 260))
    if onde:
        itens.append((f"Onde fica {cM} e como chegar?", " ".join(onde)))
    aero = frase_com(s_acesso, "aeroporto")
    if aero and not pef:
        itens.append((f"{c} tem aeroporto?", aero))
    custo = []
    pc = primeiro_p(s_custo)
    if pc:
        custo.append(frases(pc, 2, 300))
    fa = frase_com(s_custo, "aluguel") or frase_com(s_custo, "quartos")
    if fa and "R$" not in fa:
        fa = frase_com(s_custo, "quartos") or fa
    if fa and fa not in " ".join(custo) and not re.search(r"aluguel|quartos", " ".join(custo), re.I):
        custo.append(fa)
    if alug and re.sub(r"\D", "", alug[0]) not in re.sub(r"\D", "", " ".join(custo)):
        custo.append(f"O aluguel de um imóvel de 2 quartos fica em torno de {alug[0].replace('~', '')} ({alug[1]}).")
    if cesta and re.sub(r"\D", "", cesta[0]) not in re.sub(r"\D", "", " ".join(custo)):
        custo.append(f"A cesta básica custou {cesta[0]} ({cesta[1]}).")
    if custo:
        tem_valor = "R$" in " ".join(custo)
        q = (f"Como é a moradia {no} {c}?" if pef else
             f"Quanto custa morar {no} {c}? Quanto é o aluguel?" if tem_valor else
             f"Como é o custo de vida {no} {c}?")
        itens.append((q, " ".join(custo)))
    if tem_bairros:
        nomes = [txt(x) for x in re.findall(r'<td class="k">(.*?)</td>', re.search(r'id="bairros".*?</table>', h, re.S).group(0))]
        intro_b = txt(re.search(r'id="bairros"><h3>.*?</h3><p>(.*?)</p>', h, re.S).group(1))
        intro_b = intro_b.replace("Os bairros abaixo", "Eles").replace("os bairros abaixo", "eles")
        itens.append((f"Quais são os melhores bairros para morar {no} {c}?",
                      f"Entre os mais procurados estão {', '.join(nomes[:-1]) + ' e ' + nomes[-1] if len(nomes) > 1 else nomes[0]}. {intro_b}"))
    pcl = primeiro_p(s_clima)
    if pcl or clima_f:
        a = frases(pcl, 2, 260) if pcl else ""
        if clima_f and clima_f[0] not in a:
            a = (f"As temperaturas ficam em geral entre {clima_f[0]}, com {clima_f[1]}. " if "°C" in clima_f[0] else "") + a
        itens.append((f"Como é o clima {no} {c}?", a.strip()))
    psa = primeiro_p(s_saude)
    if psa:
        itens.append((f"Como é a saúde {no} {c} para militares e dependentes?", frases(psa, 2, 280)))
    cm = frase_com(s_edu, "Colégio Militar")
    if cm:
        itens.append((f"Tem Colégio Militar {no} {c}?", cm))
    elif primeiro_p(s_edu):
        itens.append((f"Como são as escolas {no} {c}?", frases(primeiro_p(s_edu), 2, 260)))
    pcu = primeiro_p(s_cult)
    if pcu:
        itens.append((f"O que fazer {no} {c}?", frases(pcu, 2, 300)))
    itens = [(q, a) for q, a in itens if a and len(a) > 20]

    h = re.sub(r'<section class="sec faq" id="sec-faq">.*?</section>\n?\s*', "", h, flags=re.S)
    h = re.sub(r'<script type="application/ld\+json" id="faq-ld">.*?</script>\n?', "", h, flags=re.S)
    if itens:
        h = h.replace('<section class="fix">', faq_html(c, itens) + '\n    <section class="fix">', 1)
        h = h.replace("</head>", faq_ld(itens) + "\n</head>", 1)
        if 'href="#sec-faq"' not in h:
            h = h.replace('<a href="#sec-chegada">Antes de ir</a>', '<a href="#sec-chegada">Antes de ir</a><a href="#sec-faq">Perguntas</a>', 1)

    if h != orig:
        p.write_text(h, encoding="utf-8")
        return True
    return False


def sitemap(alteradas):
    sm = RAIZ / "sitemap.xml"
    x = sm.read_text(encoding="utf-8")
    for slug in alteradas:
        x = re.sub(r"(<loc>https://guiadeguarnicoes\.com/" + re.escape(slug) + r"</loc><lastmod>)[^<]+", r"\g<1>" + HOJE, x)
    sm.write_text(x, encoding="utf-8")


if __name__ == "__main__":
    alt = [p.stem for p in sorted(RAIZ.glob("*-[a-z][a-z].html")) if processa(p)]
    sitemap(alt)
    print(f"{len(alt)} fichas atualizadas")
