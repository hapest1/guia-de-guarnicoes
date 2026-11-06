#!/usr/bin/env python3
"""Aba "Hotéis de Trânsito" (nov/2026) — busca dentro do próprio Guia.

Base: dados/hoteis-transito.json, montada a partir do cadastro público
"Meios de Hospedagem do Exército" da DAP (Rede Rosa da Fonseca). Guardamos só
dados factuais (nome, cidade, OM responsável, público, categoria, quartos,
quartos adaptados, quartos que aceitam pet, dentro/fora de OM). Endereço,
telefone, e-mail, WhatsApp e fotos NÃO são copiados: para contato e reserva o
Guia leva ao sistema da DAP já filtrado na cidade. A fonte e a data da
consulta aparecem na página.

- gera /hoteis-de-transito (lista estática por cidade + busca e filtros em JS);
- menu "Hotéis de Trânsito" em todas as páginas;
- fichas: atalho no topo e link em "Antes de ir" para a busca do Guia;
- sitemap, Atualizações e Sobre.

Para atualizar: refaça dados/hoteis-transito.json e rode  python3 hoteis_transito.py
"""
import html as H
import json
import pathlib
import re
from collections import OrderedDict
from urllib.parse import quote

from paginas_extras import pagina, grava, SITE

RAIZ = pathlib.Path(__file__).resolve().parent
HOJE = "2026-11-06"
DAP_HOME = "https://www.dap.eb.mil.br/index.php/meios-de-hospedagem"
DAP_CAT = "https://www.dap.eb.mil.br/index.php?option=com_mhex&view=catalogo&Itemid=317"
DADOS = json.loads((RAIZ / "dados" / "hoteis-transito.json").read_text(encoding="utf-8"))
ITENS = DADOS["itens"]
CONSULTA = "/".join(reversed(DADOS["consulta"].split("-")))

# nome da cidade como está no filtro da DAP (grafia de lá), para o botão de contato
DAP_GRAFIA = {"Garanhuns": "GARANHUS", "Itaituba": "ITAIATUBA", "Cáceres": "CACERES", "Crateús": "CRATEUS",
              "Guajará-Mirim": "GUAJARÁ MIRIM", "São Luiz Gonzaga": "SÃO LUÍS GONZAGA", "Rondonópolis": "Rondonópolis"}
UF_NOME = {"AC": "Acre", "AL": "Alagoas", "AM": "Amazonas", "AP": "Amapá", "BA": "Bahia", "CE": "Ceará",
           "DF": "Distrito Federal", "ES": "Espírito Santo", "GO": "Goiás", "MA": "Maranhão", "MG": "Minas Gerais",
           "MS": "Mato Grosso do Sul", "MT": "Mato Grosso", "PA": "Pará", "PB": "Paraíba", "PE": "Pernambuco",
           "PI": "Piauí", "PR": "Paraná", "RJ": "Rio de Janeiro", "RN": "Rio Grande do Norte", "RO": "Rondônia",
           "RR": "Roraima", "RS": "Rio Grande do Sul", "SC": "Santa Catarina", "SE": "Sergipe", "SP": "São Paulo",
           "TO": "Tocantins"}
EXT = 'target="_blank" rel="noopener"'
E = H.escape


def dap_cidade(cidade, uf):
    nome = DAP_GRAFIA.get(cidade, cidade.upper())
    return f"{DAP_CAT}&uf={uf}&city={quote(nome)}"


def sem_acento(s):
    import unicodedata
    return unicodedata.normalize("NFKD", s.lower()).encode("ascii", "ignore").decode()


def por_cidade():
    g = OrderedDict()
    for it in sorted(ITENS, key=lambda o: (sem_acento(o["cidade"]), o["uf"], o["nome"])):
        g.setdefault((it["cidade"], it["uf"]), []).append(it)
    return g


def contagem_slug():
    c = {}
    for it in ITENS:
        if it["slug"]:
            c[it["slug"]] = c.get(it["slug"], 0) + 1
    return c


# ---------------------------------------------------------------- menu
MENU_OLD = '<a href="/checklist-da-chegada">Checklist da chegada</a>\n    <a href="/guias/">Guias</a>'
MENU_NEW = ('<a href="/checklist-da-chegada">Checklist da chegada</a>\n'
            '    <a href="/hoteis-de-transito">Hotéis de Trânsito</a>\n    <a href="/guias/">Guias</a>')


def fichas():
    out = []
    for p in sorted(RAIZ.glob("*-??.html")):
        h = p.read_text(encoding="utf-8")
        m = re.search(r"<h1>(.*?) <span>", h)
        if m and 'class="atalhos"' in h:
            out.append((p, m.group(1)))
    return out


def ficha(h, slug, cidade, cont):
    uf = slug[-2:].upper()
    n = cont.get(slug, 0)
    if n:
        url = f"/hoteis-de-transito?c={slug}"
        rot = f"Hotéis de Trânsito ({n})"
        txt = (f'<a href="{url}" class="ck-link ht-link">{n} {"opção" if n == 1 else "opções"} de hotel de trânsito '
               f'em {cidade} →</a>')
    else:
        url = f"/hoteis-de-transito?uf={uf}"
        rot = f"Hotéis de Trânsito em {uf}"
        txt = (f'<a href="{url}" class="ck-link ht-link">{cidade} não tem hotel de trânsito cadastrado: '
               f'veja os de {UF_NOME[uf]} →</a>')
    atalho = f'<a class="atalho-ht" href="{url}">{rot}</a>'
    # atalho no topo (substitui versão anterior, se houver)
    if 'class="atalho-ht"' in h:
        h = re.sub(r'<a class="atalho-ht" href="[^"]*"[^>]*>[^<]*</a>', atalho, h, count=1)
    else:
        h = h.replace('<a href="/checklist-da-chegada">Checklist da chegada</a></div>',
                      f'<a href="/checklist-da-chegada">Checklist da chegada</a>{atalho}</div>', 1)
    # Antes de ir
    if 'ht-link' in h:
        h = re.sub(r'<a href="[^"]*" class="ck-link ht-link"[^>]*>.*?</a>', txt, h, count=1, flags=re.S)
    else:
        h = h.replace('<a href="/checklist-da-chegada" class="ck-link">Checklist da chegada (PNR, FuSEx, escola, documentos) →</a><br>',
                      f'{txt}<br><a href="/checklist-da-chegada" class="ck-link">Checklist da chegada (PNR, FuSEx, escola, documentos) →</a><br>', 1)
    return h


# ---------------------------------------------------------------- página
CSS_HT = """<style>
.art.ht{max-width:960px}
.ht-fonte{font-size:.88rem;color:var(--muted);border-left:3px solid var(--line);padding:4px 0 4px 12px;margin:14px 0}
.ht-busca{position:sticky;top:var(--hdr,0px);z-index:5;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:14px;margin:20px 0 8px;box-shadow:0 6px 16px rgba(0,0,0,.05)}
.ht-busca input[type=search],.ht-busca select{font:inherit;padding:9px 10px;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--ink);min-width:0}
.ht-busca input[type=search]{width:100%;font-size:1rem}
.ht-filtros{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin-top:10px;font-size:.92rem}
.ht-filtros select{flex:1 1 150px}
.ht-filtros label.ck{display:inline-flex;gap:6px;align-items:center;cursor:pointer;white-space:nowrap}
.ht-res{font-family:var(--mono);font-size:.78rem;color:var(--muted);margin:10px 2px 0;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
.ht-res button{font:inherit;background:none;border:0;color:var(--accent);cursor:pointer;padding:0;text-decoration:underline}
.ht-cid{margin:26px 0 0}
.ht-cid>h2{font-size:1.15rem;margin:0 0 8px;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline}
.ht-cid>h2 a.fic{font-family:var(--mono);font-size:.72rem;font-weight:400;text-transform:none;letter-spacing:0}
.ht-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr))}
.ht-card{border:1px solid var(--line);border-radius:8px;padding:14px;background:var(--surface);display:flex;flex-direction:column;gap:8px}
.ht-card h3{font-size:1rem;margin:0;line-height:1.3;text-transform:none}
.ht-tags{display:flex;flex-wrap:wrap;gap:5px}
.ht-tags span{font-family:var(--mono);font-size:.68rem;letter-spacing:.03em;border:1px solid var(--line);border-radius:4px;padding:2px 6px;color:var(--muted)}
.ht-tags span.p{border-color:var(--accent);color:var(--accent)}
.ht-nums{display:flex;gap:16px;font-size:.82rem;color:var(--muted)}
.ht-nums b{display:block;font-size:1.05rem;color:var(--ink)}
.ht-om{font-size:.86rem;margin:0;line-height:1.4}
.ht-card .ht-dap{margin-top:auto;font-size:.86rem;font-weight:600}
.ht-vazio{padding:20px;border:1px dashed var(--line);border-radius:8px;text-align:center;color:var(--muted)}
.ht-cid[hidden],.ht-card[hidden]{display:none}
</style>"""


def n_txt(v):
    return "—" if v is None else str(v)


def card(it):
    tags = [f'<span class="p">{E(it["publico"])}</span>']
    if it["cat"]:
        tags.append(f'<span>Categoria {E(it["cat"])}</span>')
    if it["pet"]:
        tags.append('<span>Aceita pet</span>')
    if it["adaptados"]:
        tags.append('<span>Quarto PcD</span>')
    if it["local"]:
        tags.append(f'<span>{"Dentro da OM" if it["local"] == "dentro" else "Fora da OM"}</span>')
    om = f'<p class="ht-om"><b>OM responsável:</b> {E(it["om"])}</p>' if it["om"] else ""
    busca = sem_acento(" ".join(filter(None, [it["nome"], it["cidade"], it["uf"], UF_NOME[it["uf"]], it["om"] or ""])))
    pub = sem_acento(it["publico"])
    return (f'<article class="ht-card" data-b="{E(busca)}" data-uf="{it["uf"]}" data-pub="{E(pub)}" '
            f'data-pet="{1 if it["pet"] else 0}" data-pcd="{1 if it["adaptados"] else 0}">'
            f'<h3>{E(it["nome"])}</h3><div class="ht-tags">{"".join(tags)}</div>'
            f'<div class="ht-nums"><span><b>{n_txt(it["quartos"])}</b>quartos</span>'
            f'<span><b>{n_txt(it["adaptados"])}</b>adaptados</span><span><b>{n_txt(it["pet"])}</b>com pet</span></div>'
            f'{om}<a class="ht-dap" href="{E(dap_cidade(it["cidade"], it["uf"]))}" {EXT}>Contato e reserva na DAP ↗</a>'
            f'</article>')


def corpo():
    grupos = por_cidade()
    n_cid = len(grupos)
    n_fic = len({it["slug"] for it in ITENS if it["slug"]})
    secoes = []
    for (cid, uf), its in grupos.items():
        slug = its[0]["slug"]
        fic = f'<a class="fic" href="/{slug}">Ficha de {E(cid)} →</a>' if slug else ""
        secoes.append(f'<section class="ht-cid" data-slug="{slug or ""}" data-uf="{uf}">'
                      f'<h2>{E(cid)}-{uf} {fic}</h2><div class="ht-grid">{"".join(card(i) for i in its)}</div></section>')
    ufs = sorted({it["uf"] for it in ITENS})
    op_uf = "".join(f'<option value="{u}">{E(UF_NOME[u])}</option>' for u in ufs)
    return f"""<nav class="crumbs-g"><a href="/">Início</a> › Hotéis de Trânsito</nav>
<h1>Hotéis de Trânsito</h1>
<p class="resumo">Onde ficar nos primeiros dias da nova guarnição, enquanto a mudança não chega e o PNR ou o aluguel não sai. São {len(ITENS)} meios de hospedagem do Exército em {n_cid} cidades, {n_fic} delas com ficha no guia.</p>
<p class="ht-fonte">Fonte: <a href="{DAP_HOME}" {EXT}>DAP – Meios de Hospedagem do Exército (Rede Rosa da Fonseca)</a>, consultado em {CONSULTA}. O guia não é oficial e reúne aqui só os dados para a busca. Contato, endereço e reserva ficam no sistema da DAP, que é a fonte atualizada.</p>

<div class="ht-busca" role="search">
<label for="ht-q" class="sr-only" style="position:absolute;left:-9999px">Buscar</label>
<input type="search" id="ht-q" placeholder="Buscar por cidade, OM ou nome do hotel…" autocomplete="off">
<div class="ht-filtros">
<select id="ht-uf" aria-label="Estado"><option value="">Todos os estados</option>{op_uf}</select>
<select id="ht-pub" aria-label="Público"><option value="">Todos os públicos</option><option value="oficiais">Oficiais</option><option value="subtenentes">Subtenentes e Sargentos</option><option value="cabos">Cabos e Soldados</option><option value="misto">Misto</option></select>
<label class="ck"><input type="checkbox" id="ht-pet"> Aceita pet</label>
<label class="ck"><input type="checkbox" id="ht-pcd"> Quarto PcD</label>
</div>
<div class="ht-res"><span id="ht-n">{len(ITENS)} resultados</span><button type="button" id="ht-limpar" hidden>Limpar filtros</button></div>
</div>

<div id="ht-lista">
{"".join(secoes)}
</div>
<p class="ht-vazio" id="ht-vazio" hidden>Nenhum resultado com esses filtros. Tente outro estado ou limpe os filtros: a guarnição pode não ter hotel de trânsito cadastrado, e então vale procurar na cidade mais próxima ou perguntar à nova OM.</p>

<h2>Como usar</h2>
<ul>
<li><b>Público:</b> "Oficiais", "Subtenentes e Sargentos" ou "Cabos e Soldados" indicam a quem o hotel se destina; "Misto" atende mais de um círculo.</li>
<li><b>Categoria</b> (A, B ou C) é a classificação do próprio cadastro e costuma refletir estrutura e valor da diária.</li>
<li><b>Quartos com pet</b> e <b>adaptados</b> são os números informados pela OM. Traço (—) quer dizer que o dado não foi informado.</li>
<li><b>Contato e reserva na DAP</b> abre o sistema oficial já na cidade, com e-mail, telefone, WhatsApp e endereço de cada hospedagem.</li>
</ul>

<h2>Como se organizar</h2>
<ol>
<li><b>Procure assim que sair a movimentação.</b> Nos meses de maior movimentação, as vagas acabam cedo.</li>
<li><b>Fale com a OM responsável</b> pelos canais indicados no sistema da DAP. É ela que confirma vaga, valor da diária, prazo máximo de permanência e documentos.</li>
<li><b>Informe quem vai com você:</b> número de dependentes, se há criança pequena, pessoa com deficiência ou pet.</li>
<li><b>Tenha um plano B.</b> Se não houver vaga nas datas, pesquise hotéis e aluguel por temporada perto da OM e veja o guia <a href="/guias/alugar-imovel-na-nova-guarnicao">Alugar imóvel na nova guarnição</a>.</li>
<li><b>Guarde os comprovantes</b> da hospedagem junto com os da mudança.</li>
</ol>
<div class="note"><b>Regras mudam de um lugar para outro.</b> Diárias, público atendido, aceitação de pets e tempo de permanência são definidos por cada OM. Os dados desta página são uma cópia da consulta de {CONSULTA}: confirme sempre no sistema da DAP e com a OM antes de viajar. Viu algo diferente? <a href="/contribuir">Avise o guia</a>.</div>

<h2>Também ajuda na mudança</h2>
<div class="cards-g">
<a href="/checklist-da-chegada"><b>Checklist da chegada</b><span>O que resolver entre a movimentação e a primeira semana na nova cidade.</span></a>
<a href="/guias/pnr-como-funciona"><b>PNR: como funciona</b><span>Fila, taxa de uso, vistoria e prazos do Próprio Nacional Residencial.</span></a>
<a href="/guias/mudanca-com-pet"><b>Mudança com pet</b><span>Transporte, documentos e adaptação do animal na nova guarnição.</span></a>
</div>
<script>
(function(){{
  var q=document.getElementById('ht-q'),uf=document.getElementById('ht-uf'),pub=document.getElementById('ht-pub'),
      pet=document.getElementById('ht-pet'),pcd=document.getElementById('ht-pcd'),nEl=document.getElementById('ht-n'),
      limpar=document.getElementById('ht-limpar'),vazio=document.getElementById('ht-vazio'),
      secs=[].slice.call(document.querySelectorAll('.ht-cid')),slugFiltro='';
  function norm(s){{return (s||'').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').trim();}}
  function aplicar(){{
    var t=norm(q.value).split(/\\s+/).filter(Boolean),u=uf.value,p=pub.value,n=0;
    secs.forEach(function(s){{
      var vis=0;
      if(slugFiltro&&s.dataset.slug!==slugFiltro){{s.hidden=true;return;}}
      s.querySelectorAll('.ht-card').forEach(function(c){{
        var ok=(!u||c.dataset.uf===u)&&(!p||c.dataset.pub.indexOf(p)===0)&&(!pet.checked||c.dataset.pet==='1')&&(!pcd.checked||c.dataset.pcd==='1')
          &&t.every(function(w){{return c.dataset.b.indexOf(w)>=0;}});
        c.hidden=!ok; if(ok)vis++;
      }});
      s.hidden=!vis; n+=vis;
    }});
    nEl.textContent=n+(n===1?' resultado':' resultados')+(slugFiltro?' nesta guarnição':'');
    vazio.hidden=n>0;
    limpar.hidden=!(q.value||u||p||pet.checked||pcd.checked||slugFiltro);
  }}
  [q,uf,pub,pet,pcd].forEach(function(e){{e.addEventListener('input',function(){{slugFiltro='';aplicar();}});e.addEventListener('change',aplicar);}});
  limpar.addEventListener('click',function(){{q.value='';uf.value='';pub.value='';pet.checked=false;pcd.checked=false;slugFiltro='';
    try{{history.replaceState(null,'',location.pathname);}}catch(x){{}} aplicar();}});
  var ps=new URLSearchParams(location.search);
  if(ps.get('c')&&document.querySelector('.ht-cid[data-slug="'+ps.get('c').replace(/[^a-z-]/g,'')+'"]')) slugFiltro=ps.get('c').replace(/[^a-z-]/g,'');
  if(ps.get('uf')&&/^[A-Z]{{2}}$/.test(ps.get('uf'))) uf.value=ps.get('uf');
  if(ps.get('q')) q.value=ps.get('q');
  aplicar();
}})();
</script>"""


def main():
    n = 0
    cont = contagem_slug()
    html = pagina("/hoteis-de-transito", "Hotéis de Trânsito",
                  f"Busque entre os {len(ITENS)} hotéis de trânsito e casas de hóspedes do Exército por cidade, OM, "
                  "público, pet e acessibilidade. Dados do cadastro da DAP, com dicas para reservar.", corpo(),
                  {"@context": "https://schema.org", "@type": "WebPage", "url": SITE + "/hoteis-de-transito",
                   "name": "Hotéis de Trânsito", "inLanguage": "pt-BR",
                   "isBasedOn": DAP_HOME})
    html = html.replace("</head>", CSS_HT + "\n</head>", 1).replace('<main class="wrap art">', '<main class="wrap art ht">', 1)
    if MENU_NEW not in html:
        html = html.replace(MENU_OLD, MENU_NEW)
    n += grava("hoteis-de-transito.html", html)

    nomes = {p: c for p, c in fichas()}
    for p in sorted(RAIZ.rglob("*.html")):
        if p.name == "hoteis-de-transito.html":
            continue
        h0 = h = p.read_text(encoding="utf-8")
        if MENU_NEW not in h:
            h = h.replace(MENU_OLD, MENU_NEW)
        if p in nomes:
            h = ficha(h, p.stem, nomes[p], cont)
        if p.name == "atualizacoes.html":
            h = re.sub(r'<li><b>06/11</b> · Nova página <a href="/hoteis-de-transito">.*?</li>\n',
                       '<li><b>06/11</b> · Nova página <a href="/hoteis-de-transito">Hotéis de Trânsito</a>: busca entre os '
                       f'{len(ITENS)} meios de hospedagem do Exército por cidade, OM, público, pet e acessibilidade, com dados '
                       'do cadastro da DAP. As fichas ganharam o atalho para os hotéis de trânsito da cidade.</li>\n', h, count=1)
            if "/hoteis-de-transito" not in h.split("<main", 1)[1]:
                h = h.replace('<h2>Novembro de 2026</h2>\n<ul>\n',
                              '<h2>Novembro de 2026</h2>\n<ul>\n<li><b>06/11</b> · Nova página <a href="/hoteis-de-transito">'
                              'Hotéis de Trânsito</a>.</li>\n', 1)
        if p.name == "sobre.html" and "/hoteis-de-transito" not in h.split("<main", 1)[1]:
            h = h.replace(' e o <a href="/checklist-da-chegada">Checklist da chegada</a>.</li>',
                          ', o <a href="/checklist-da-chegada">Checklist da chegada</a> e a busca de '
                          '<a href="/hoteis-de-transito">Hotéis de Trânsito</a>.</li>', 1)
        if h != h0:
            p.write_text(h, encoding="utf-8")
            n += 1

    sm = RAIZ / "sitemap.xml"
    x = sm.read_text(encoding="utf-8")
    loc = SITE + "/hoteis-de-transito"
    if f"<loc>{loc}</loc>" not in x:
        x = x.replace("</urlset>", f"  <url><loc>{loc}</loc><lastmod>{HOJE}</lastmod>"
                                   f"<changefreq>monthly</changefreq><priority>0.7</priority></url>\n</urlset>")
        sm.write_text(x, encoding="utf-8")
        n += 1
    print(n, "arquivos gerados/alterados")


if __name__ == "__main__":
    main()
