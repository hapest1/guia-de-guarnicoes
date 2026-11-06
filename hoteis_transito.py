#!/usr/bin/env python3
"""Aba "Hotéis de Trânsito" (nov/2026).

A DAP publicou o sistema "Meios de Hospedagem do Exército" (Rede Rosa da
Fonseca), com a lista oficial de hotéis de trânsito e casas de hóspedes.
O guia NÃO copia essa lista (nomes, endereços, telefones, quartos): só aponta
para o sistema oficial, já filtrado por cidade ou estado.

- gera /hoteis-de-transito  (explicação + busca que abre o sistema da DAP);
- põe "Hotéis de Trânsito" no menu de todas as páginas;
- nas fichas: atalho no topo e link em "Antes de ir" (filtro da cidade quando
  ela aparece no sistema; senão, filtro do estado);
- sitemap, Atualizações e Sobre.

O mapeamento ficha -> nome da cidade no sistema da DAP fica em DAP_CIDADE
(conferido em 06/11/2026: cada filtro retorna ao menos um meio de hospedagem).
Idempotente:  python3 hoteis_transito.py
"""
import html as H
import json
import pathlib
import re
from urllib.parse import quote

from paginas_extras import pagina, grava, SITE

RAIZ = pathlib.Path(__file__).resolve().parent
HOJE = "2026-11-06"
DAP = "https://www.dap.eb.mil.br/index.php?option=com_mhex&view=catalogo&Itemid=317"
DAP_HOME = "https://www.dap.eb.mil.br/index.php/meios-de-hospedagem"

# nome da cidade como aparece no filtro do sistema da DAP (com a grafia de lá)
DAP_CIDADE = {
 "alegrete-rs": "ALEGRETE", "altamira-pa": "ALTAMIRA", "amambai-ms": "AMAMBAÍ", "aquidauana-ms": "AQUIDAUANA",
 "aracaju-se": "ARACAJU", "aragarcas-go": "ARAGARÇAS", "araguari-mg": "ARAGUARI", "bage-rs": "BAGÉ",
 "barcelos-am": "BARCELOS", "barreiras-ba": "BARREIRAS", "bela-vista-ms": "BELA VISTA", "belem-pa": "BELÉM",
 "belo-horizonte-mg": "BELO HORIZONTE", "bento-goncalves-rs": "BENTO GONÇALVES", "blumenau-sc": "BLUMENAU",
 "boa-vista-rr": "BOA VISTA", "brasilia-df": "BRASÍLIA", "cacapava-sp": "CAÇAPAVA", "caceres-mt": "CACERES",
 "cachoeira-do-sul-rs": "CACHOEIRA DO SUL", "caico-rn": "CAICÓ", "campinas-sp": "CAMPINAS",
 "campo-grande-ms": "CAMPO GRANDE", "campos-dos-goytacazes-rj": "CAMPOS DOS GOYTACAZES", "cascavel-pr": "CASCAVEL",
 "castro-pr": "CASTRO", "corumba-ms": "CORUMBÁ", "coxim-ms": "COXIM", "crateus-ce": "CRATEUS",
 "criciuma-sc": "CRICIÚMA", "cristalina-go": "CRISTALINA", "cruz-alta-rs": "CRUZ ALTA",
 "cruzeiro-do-sul-ac": "CRUZEIRO DO SUL", "cuiaba-mt": "CUIABÁ", "curitiba-pr": "CURITIBA", "dourados-ms": "DOURADOS",
 "feira-de-santana-ba": "FEIRA DE SANTANA", "florianopolis-sc": "FLORIANÓPOLIS", "formosa-go": "FORMOSA",
 "fortaleza-ce": "FORTALEZA", "foz-do-iguacu-pr": "FOZ DO IGUAÇU", "garanhuns-pe": "GARANHUS", "goiania-go": "GOIÂNIA",
 "guaira-pr": "GUAÍRA", "guajara-mirim-ro": "GUAJARÁ MIRIM", "guarapuava-pr": "GUARAPUAVA", "guaruja-sp": "GUARUJÁ",
 "humaita-am": "HUMAITÁ", "ijui-rs": "IJUÍ", "imperatriz-ma": "IMPERATRIZ", "itaituba-pa": "ITAIATUBA",
 "itajuba-mg": "ITAJUBÁ", "itaqui-rs": "ITAQUI", "jaboatao-dos-guararapes-pe": "JABOATÃO DOS GUARARAPES",
 "jaguarao-rs": "JAGUARÃO", "jardim-ms": "JARDIM", "jatai-go": "JATAÍ", "joao-pessoa-pb": "JOÃO PESSOA",
 "joinville-sc": "JOINVILLE", "juiz-de-fora-mg": "JUIZ DE FORA", "lages-sc": "LAGES", "lapa-pr": "LAPA",
 "lins-sp": "LINS", "lorena-sp": "LORENA", "macae-rj": "MACAÉ", "macapa-ap": "MACAPÁ", "maceio-al": "MACEIÓ",
 "manaus-am": "MANAUS", "maraba-pa": "MARABÁ", "montes-claros-mg": "MONTES CLAROS", "natal-rn": "NATAL",
 "nioaque-ms": "NIOAQUE", "niteroi-rj": "NITERÓI", "nova-santa-rita-rs": "NOVA SANTA RITA", "olinda-pe": "OLINDA",
 "osasco-sp": "OSASCO", "palmas-to": "PALMAS", "paulo-afonso-ba": "PAULO AFONSO", "pelotas-rs": "PELOTAS",
 "petrolina-pe": "PETROLINA", "petropolis-rj": "PETRÓPOLIS", "picos-pi": "PICOS", "pindamonhangaba-sp": "PINDAMONHANGABA",
 "pirassununga-sp": "PIRASSUNUNGA", "ponta-grossa-pr": "PONTA GROSSA", "ponta-pora-ms": "PONTA PORÃ",
 "porto-alegre-rs": "PORTO ALEGRE", "porto-murtinho-ms": "PORTO MURTINHO", "porto-velho-ro": "PORTO VELHO",
 "pouso-alegre-mg": "POUSO ALEGRE", "praia-grande-sp": "PRAIA GRANDE", "quarai-rs": "QUARAÍ", "recife-pe": "RECIFE",
 "resende-rj": "RESENDE", "rio-branco-ac": "RIO BRANCO", "rio-de-janeiro-rj": "RIO DE JANEIRO",
 "rio-grande-rs": "RIO GRANDE", "rio-negro-pr": "RIO NEGRO", "rondonopolis-mt": "Rondonópolis",
 "rosario-do-sul-rs": "ROSÁRIO DO SUL", "salvador-ba": "SALVADOR", "santa-maria-rs": "SANTA MARIA",
 "santa-rosa-rs": "SANTA ROSA", "santana-do-livramento-rs": "SANTANA DO LIVRAMENTO", "santiago-rs": "SANTIAGO",
 "santo-angelo-rs": "SANTO ÂNGELO", "santos-dumont-mg": "SANTOS DUMONT", "sao-bento-do-una-pe": "SÃO BENTO DO UNA",
 "sao-borja-rs": "SÃO BORJA", "sao-gabriel-da-cachoeira-am": "SÃO GABRIEL DA CACHOEIRA", "sao-gabriel-rs": "SÃO GABRIEL",
 "sao-joao-del-rei-mg": "SÃO JOÃO DEL REI", "sao-leopoldo-rs": "SÃO LEOPOLDO", "sao-luis-ma": "SÃO LUÍS",
 "sao-luiz-gonzaga-rs": "SÃO LUÍS GONZAGA", "sao-miguel-do-oeste-sc": "SÃO MIGUEL DO OESTE", "sao-paulo-sp": "SÃO PAULO",
 "sao-vicente-sp": "SÃO VICENTE", "sete-lagoas-mg": "SETE LAGOAS", "tabatinga-am": "TABATINGA", "taubate-sp": "TAUBATÉ",
 "tefe-am": "TEFÉ", "teresina-pi": "TERESINA", "tres-coracoes-mg": "TRÊS CORAÇÕES", "tres-lagoas-ms": "TRÊS LAGOAS",
 "uberlandia-mg": "UBERLÂNDIA", "uruguaiana-rs": "URUGUAIANA", "vila-velha-es": "VILA VELHA",
}

UFS = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR",
       "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]


def url_cidade(slug):
    return f"{DAP}&uf={slug[-2:].upper()}&city={quote(DAP_CIDADE[slug])}"


def url_uf(uf):
    return f"{DAP}&uf={uf}"


EXT = 'target="_blank" rel="noopener"'

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


def ficha(h, slug, cidade):
    uf = slug[-2:].upper()
    if slug in DAP_CIDADE:
        url, rot = url_cidade(slug), "Hotéis de Trânsito aqui"
        txt = (f'<a href="{H.escape(url)}" class="ck-link" {EXT}>Hotéis de Trânsito em {cidade} '
               f'(sistema oficial da DAP) ↗</a>')
    else:
        url, rot = url_uf(uf), f"Hotéis de Trânsito em {uf}"
        txt = (f'<a href="{H.escape(url)}" class="ck-link" {EXT}>{cidade} não aparece no sistema da DAP: '
               f'veja os Hotéis de Trânsito do estado ({uf}) ↗</a>')
    # atalho no topo
    if 'class="atalho-ht"' not in h:
        h = h.replace('<a href="/checklist-da-chegada">Checklist da chegada</a></div>',
                      f'<a href="/checklist-da-chegada">Checklist da chegada</a>'
                      f'<a class="atalho-ht" href="{H.escape(url)}" {EXT}>{rot} ↗</a></div>', 1)
    # Antes de ir
    if 'class="ck-link ht-link"' not in h:
        txt = txt.replace('class="ck-link"', 'class="ck-link ht-link"')
        h = h.replace('<a href="/checklist-da-chegada" class="ck-link">Checklist da chegada (PNR, FuSEx, escola, documentos) →</a><br>',
                      f'{txt}<br><a href="/checklist-da-chegada" class="ck-link">Checklist da chegada (PNR, FuSEx, escola, documentos) →</a><br>', 1)
    return h


# ---------------------------------------------------------------- página
CSS_HT = """<style>
.ht-busca{border:1px solid var(--line);border-radius:8px;padding:18px;margin:22px 0;background:var(--surface)}
.ht-busca h2{margin-top:0}
.ht-busca label{display:block;font-weight:600;margin:12px 0 6px}
.ht-linha{display:flex;flex-wrap:wrap;gap:8px}
.ht-linha select{flex:1 1 220px;min-width:0;font:inherit;padding:9px 10px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit}
.ht-linha .btn{text-decoration:none;display:inline-block}
.ht-linha .btn[aria-disabled="true"]{opacity:.5;pointer-events:none}
.ht-oficial{display:inline-block;margin:6px 0 4px;text-decoration:none}
</style>"""


def corpo():
    fs = sorted(fichas(), key=lambda t: t[1])
    op_c = "".join(f'<option value="{H.escape(url_cidade(p.stem))}" data-ficha="/{p.stem}">'
                   f'{H.escape(c)}-{p.stem[-2:].upper()}</option>'
                   for p, c in fs if p.stem in DAP_CIDADE)
    op_u = "".join(f'<option value="{H.escape(url_uf(u))}">{u}</option>' for u in UFS)
    n = sum(1 for p, _ in fs if p.stem in DAP_CIDADE)
    return f"""<nav class="crumbs-g"><a href="/">Início</a> › Hotéis de Trânsito</nav>
<h1>Hotéis de Trânsito</h1>
<p class="resumo">Onde ficar nos primeiros dias da nova guarnição, enquanto a mudança não chega e o PNR ou o aluguel não sai. A consulta é feita direto no sistema oficial da Diretoria de Assistência ao Pessoal (DAP).</p>
<p><a class="btn ht-oficial" href="{DAP_HOME}" {EXT}>Abrir o sistema Meios de Hospedagem da DAP ↗</a></p>
<p class="meta">Guia independente · a lista, os contatos e as regras ficam no sistema da DAP, que é a fonte oficial e atualizada</p>

<section class="ht-busca" aria-labelledby="ht-b">
<h2 id="ht-b">Buscar pela guarnição</h2>
<p>Escolha a cidade e o guia abre o sistema da DAP já filtrado. {n} das 171 guarnições do guia aparecem lá com ao menos um meio de hospedagem.</p>
<label for="ht-cidade">Guarnição</label>
<div class="ht-linha"><select id="ht-cidade"><option value="">Escolha a guarnição…</option>{op_c}</select>
<a class="btn" id="ht-ir-c" href="{DAP_HOME}" {EXT} aria-disabled="true">Ver no sistema da DAP ↗</a></div>
<p class="meta" id="ht-ficha" hidden></p>
<label for="ht-uf">Ou por estado</label>
<div class="ht-linha"><select id="ht-uf"><option value="">Escolha o estado…</option>{op_u}</select>
<a class="btn sec" id="ht-ir-u" href="{DAP_HOME}" {EXT} aria-disabled="true">Ver no sistema da DAP ↗</a></div>
<p class="meta">Sua guarnição não está na lista? Ela pode não ter hotel de trânsito cadastrado. Busque pelo estado e veja as cidades mais próximas, ou pergunte à nova OM.</p>
</section>

<h2>O que é o hotel de trânsito</h2>
<p>É a hospedagem mantida por uma organização militar para quem está de passagem pela guarnição: militar transferido e família, quem vai fazer curso ou exame, quem está em missão ou em férias. Além dos hotéis, a rede inclui casas de hóspedes e outros alojamentos. Cada um é administrado por uma OM, que define vagas, valores e regras de uso.</p>
<p>Para quem acaba de ser movimentado, ele resolve o intervalo mais difícil da mudança: os dias entre a chegada e a entrega das chaves, seja do PNR, seja do imóvel alugado.</p>

<h2>O que o sistema da DAP mostra</h2>
<p>O sistema reúne os meios de hospedagem do Exército no país inteiro. Dá para filtrar por região militar, estado, cidade, tipo de público e categoria, e marcar se aceita pet e se tem quarto adaptado para pessoa com deficiência. Cada cadastro traz a OM responsável e os canais de contato para pedir a reserva.</p>

<h2>Como se organizar</h2>
<ol>
<li><b>Procure assim que sair a movimentação.</b> Nos meses de maior movimentação, as vagas acabam cedo.</li>
<li><b>Fale com a OM responsável</b> pelos canais indicados no sistema. É ela que confirma vaga, valor da diária, prazo máximo de permanência e documentos.</li>
<li><b>Informe quem vai com você:</b> número de dependentes, se há criança pequena, pessoa com deficiência ou pet.</li>
<li><b>Tenha um plano B.</b> Se não houver vaga nas datas, pesquise hotéis e aluguel por temporada perto da OM e veja o guia <a href="/guias/alugar-imovel-na-nova-guarnicao">Alugar imóvel na nova guarnição</a>.</li>
<li><b>Guarde os comprovantes</b> da hospedagem junto com os da mudança.</li>
</ol>
<div class="note"><b>Regras mudam de um lugar para outro.</b> Diárias, público atendido, aceitação de pets e tempo de permanência são definidos por cada OM. Confirme sempre no sistema da DAP e com a OM responsável antes de viajar.</div>

<h2>Também ajuda na mudança</h2>
<div class="cards-g">
<a href="/checklist-da-chegada"><b>Checklist da chegada</b><span>O que resolver entre a movimentação e a primeira semana na nova cidade.</span></a>
<a href="/guias/pnr-como-funciona"><b>PNR: como funciona</b><span>Fila, taxa de uso, vistoria e prazos do Próprio Nacional Residencial.</span></a>
<a href="/guias/mudanca-com-pet"><b>Mudança com pet</b><span>Transporte, documentos e adaptação do animal na nova guarnição.</span></a>
</div>
<p class="meta">Página criada em novembro de 2026 · o Guia de Guarnições não é publicação oficial do Exército e não mantém cópia dos dados da DAP</p>
<script>
(function(){{
  function liga(selId,btnId,cb){{var s=document.getElementById(selId),b=document.getElementById(btnId);
    s.addEventListener('change',function(){{var v=s.value;b.href=v||'{DAP_HOME}';b.setAttribute('aria-disabled',v?'false':'true');if(cb)cb(s);}});}}
  liga('ht-cidade','ht-ir-c',function(s){{var o=s.options[s.selectedIndex],f=document.getElementById('ht-ficha');
    if(o&&o.dataset.ficha){{f.innerHTML='Antes de ir, leia a <a href="'+o.dataset.ficha+'">ficha de '+o.textContent+'</a>.';f.hidden=false;}}else f.hidden=true;}});
  liga('ht-uf','ht-ir-u');
}})();
</script>"""


def main():
    n = 0
    html = pagina("/hoteis-de-transito", "Hotéis de Trânsito",
                  "Como encontrar hotel de trânsito na nova guarnição: busca pela cidade no sistema oficial "
                  "Meios de Hospedagem da DAP e dicas para reservar.", corpo(),
                  {"@context": "https://schema.org", "@type": "WebPage", "url": SITE + "/hoteis-de-transito",
                   "name": "Hotéis de Trânsito", "inLanguage": "pt-BR"})
    html = html.replace("</head>", CSS_HT + "\n</head>", 1)
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
            h = ficha(h, p.stem, nomes[p])
        if p.name == "atualizacoes.html" and "/hoteis-de-transito" not in h.split("<main", 1)[1]:
            h = h.replace('<h2>Novembro de 2026</h2>\n<ul>\n',
                          '<h2>Novembro de 2026</h2>\n<ul>\n<li><b>06/11</b> · Nova página <a href="/hoteis-de-transito">'
                          'Hotéis de Trânsito</a>: busca pela guarnição no sistema oficial Meios de Hospedagem da DAP. '
                          'As fichas ganharam o atalho para os hotéis de trânsito da cidade.</li>\n', 1)
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
