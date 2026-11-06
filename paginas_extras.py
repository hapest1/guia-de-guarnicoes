#!/usr/bin/env python3
"""Gera as páginas institucionais e os guias (nov/2026).

- /sobre, /metodologia, /atualizacoes  (conteúdo neste arquivo)
- /guias/  (índice) e /guias/<slug>   (conteúdo em dados/guias/<slug>.json)

O cabeçalho, o estilo e o rodapé vêm de privacidade.html, para manter tudo igual
ao resto do site. Idempotente:  python3 paginas_extras.py
Depois:  python3 limpeza_fichas.py  (menu/rodapé)  e conferir o sitemap.xml.
"""
import html as H
import json
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent
SITE = "https://guiadeguarnicoes.com"
HOJE = "2026-11-02"

CSS = """<style>
.art{max-width:720px;padding-block:32px 56px}
.art h1{font-size:2.3rem;text-transform:uppercase;margin-bottom:12px;line-height:1.05}
.art h2{font-size:1.4rem;text-transform:uppercase;margin:30px 0 8px}
.art h3{font-size:1.1rem;margin:20px 0 6px}
.art p,.art li{line-height:1.65}
.art ul,.art ol{padding-left:1.2em}
.art li{margin:4px 0}
.art .resumo{font-size:1.12rem;color:var(--muted)}
.art table{width:100%;border-collapse:collapse;font-size:.92rem;margin:12px 0}
.art th,.art td{border-bottom:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top}
.art .tbl-wrap{overflow-x:auto}
.art .meta{font-family:var(--mono);font-size:.76rem;color:var(--muted)}
.cards-g{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));margin:20px 0}
.cards-g a{display:block;border:1px solid var(--line);border-radius:8px;padding:16px;color:inherit;text-decoration:none;background:var(--card,transparent)}
.cards-g a:hover{border-color:var(--accent)}
.cards-g b{display:block;font-family:var(--display,inherit);font-size:1.15rem;margin-bottom:4px}
.cards-g span{color:var(--muted);font-size:.93rem}
.crumbs-g{font-size:.85rem;color:var(--muted);margin-bottom:10px}
.crumbs-g a{color:inherit}
</style>"""


def molde():
    s = (RAIZ / "privacidade.html").read_text(encoding="utf-8")
    i, j = s.index("<main"), s.index("</main>") + len("</main>")
    return s[:i], s[j:]


def pagina(caminho, titulo, desc, corpo, ld=None):
    topo, fim = molde()
    url = SITE + caminho
    t = H.escape(titulo + " · Guia de Guarnições")
    d = H.escape(desc)
    topo = re.sub(r"<title>.*?</title>", f"<title>{t}</title>", topo)
    topo = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{d}">', topo)
    topo = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', topo)
    topo = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{t}">', topo)
    topo = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{d}">', topo)
    topo = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', topo)
    extra = CSS
    if ld:
        extra += '\n<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + "</script>"
    topo = topo.replace("</head>", extra + "\n</head>", 1)
    return topo + f'<main class="wrap art">\n{corpo}\n</main>' + fim


def grava(rel, html):
    p = RAIZ / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    if not p.exists() or p.read_text(encoding="utf-8") != html:
        p.write_text(html, encoding="utf-8")
        return True
    return False


# ---------------------------------------------------------------- Sobre
SOBRE = """<h1>Sobre o Guia de Guarnições</h1>
<p class="resumo">Um guia independente e gratuito para quem vai se mudar para uma cidade com organização militar do Exército: o militar, a família e também o civil que vai morar lá.</p>
<h2>Por que o guia existe</h2>
<p>Quando sai a movimentação, a família tem poucas semanas para decidir onde morar, como levar o carro, em que escola matricular os filhos e quanto vai custar a vida na nova cidade. A informação existe, mas está espalhada: um pouco no site da prefeitura, um pouco em grupos de mensagem, um pouco na memória de quem já serviu lá. O Guia de Guarnições junta o que é público e útil numa ficha por cidade, sempre com o mesmo formato, para que dê para ler rápido e comparar.</p>
<h2>O que você encontra aqui</h2>
<ul>
<li><b>171 fichas de guarnição</b>, das capitais aos pelotões de fronteira da Amazônia, organizadas pelos 8 Comandos Militares de Área. Cada ficha traz as OM sediadas, como chegar, custo de vida e aluguel, saúde, escolas, clima, lazer e dicas para a chegada.</li>
<li><b><a href="/guias/">Guias</a></b> sobre as decisões da mudança: como funciona a movimentação, ajuda de custo, PNR, aluguel à distância, carro, pets, escola dos filhos, trabalho do cônjuge e saúde.</li>
<li><b>Ferramentas</b>: a <a href="/calculadora-de-transferencia">Calculadora de Transferência</a> (ajuda de custo, bagagem, veículo e passagens), a <a href="/calculadora-de-ajuda-de-custo">Calculadora de Ajuda de Custo</a> (todas as situações, inclusive curso/estágio e inatividade), o <a href="/comparar">comparador de guarnições</a>, o mapa de <a href="/locais-de-servir">Locais de servir</a> por arma, o <a href="/checklist-da-chegada">Checklist da chegada</a> e a busca de <a href="/hoteis-de-transito">Hotéis de Trânsito</a>.</li>
</ul>
<h2>Independente e não oficial</h2>
<p>O guia não é publicação do Exército Brasileiro e não fala em nome de nenhuma OM ou comando. É feito por quem já viveu mudanças de guarnição e conhece o peso de chegar numa cidade sem referência. Prazos, direitos e procedimentos valem conforme a norma vigente e a orientação da sua OM; quando o guia explica uma regra, ele aponta a fonte para você conferir.</p>
<p>Por princípio, o guia publica só informação pública e de interesse da vida civil na cidade. Nada sobre efetivos, missões ou rotina de serviço, e nenhuma crítica a organizações militares. Também não usamos brasões, distintivos nem fotos de militares fardados.</p>
<h2>Como o guia se mantém</h2>
<p>O acesso é gratuito e continuará gratuito. Os custos do domínio e o tempo de pesquisa são cobertos por anúncios do Google AdSense e por espaços de divulgação para empresas que atendem famílias em mudança (veja <a href="/anuncie">Anuncie</a>). Anúncio não muda o conteúdo das fichas.</p>
<h2>Correções e contribuições</h2>
<p>As cidades mudam: o aluguel sobe, uma escola fecha, abre uma linha de voo. Se você serve ou já serviu numa guarnição e viu algo desatualizado, ou quer contar como é morar lá, use a página <a href="/contribuir">Contribua com o Guia</a>. Cada relato é lido; o que for confirmado entra na próxima revisão da ficha, sem identificar quem enviou, salvo autorização. As mudanças ficam registradas em <a href="/atualizacoes">Atualizações</a>.</p>
<h2>Contato</h2>
<p>guiadeguarnicoes@gmail.com</p>
<p class="meta">Página atualizada em novembro de 2026 · <a href="/metodologia">Como o guia é feito</a></p>"""

# ---------------------------------------------------------------- Metodologia
METODO = """<h1>Metodologia: como o guia é feito</h1>
<p class="resumo">De onde vem cada número das fichas, como ele é conferido e com que frequência é revisto. Cada seção de ficha termina com as fontes e o mês da última conferência.</p>
<h2>Princípios</h2>
<ul>
<li><b>Fonte em tudo.</b> Todo dado traz a fonte e o mês em que foi conferido. Se não há fonte confiável, a ficha diz que não há, em vez de estimar.</li>
<li><b>Número antes de adjetivo.</b> "Cidade cara" não ajuda; aluguel mediano, cesta básica e tarifa de ônibus ajudam.</li>
<li><b>Mesmo modelo para todas as cidades</b>, para permitir comparação, com o texto de cada cidade escrito para ela.</li>
<li><b>Só informação pública.</b> Nada operacional sobre o Exército.</li>
</ul>
<h2>De onde vêm os dados</h2>
<div class="tbl-wrap"><table><thead><tr><th>Dado</th><th>Fonte principal</th><th>Como é tratado</th></tr></thead><tbody>
<tr><td>População</td><td>IBGE (estimativa 2025 e Censo 2022)</td><td>Arredondada; o ano aparece ao lado.</td></tr>
<tr><td>Aluguel de 2 quartos</td><td>Anúncios da OLX e de outros portais</td><td>Mediana de uma amostra de anúncios do mês, sem condomínio. Com poucos anúncios, a ficha não publica valor.</td></tr>
<tr><td>Aluguel por m² (capitais)</td><td>Índice FipeZAP</td><td>Valor médio e variação em 12 meses, comparados à média nacional.</td></tr>
<tr><td>Cesta básica</td><td>DIEESE</td><td>Valor do mês mais recente publicado para a capital.</td></tr>
<tr><td>Bairros indicados</td><td>Dados de segurança por bairro (SSP estaduais, quando há) e guias imobiliários</td><td>Sem juízo de valor; a ficha diz quando a indicação vem só do mercado local.</td></tr>
<tr><td>OM sediadas</td><td>Publicações abertas do Exército e enciclopédias</td><td>Só o nome e o tipo da organização.</td></tr>
<tr><td>Clima</td><td>INMET (normais climatológicas) e institutos estaduais</td><td>Estação chuvosa, temperaturas típicas e peculiaridades (seca, geada, fumaça).</td></tr>
<tr><td>Distâncias por estrada</td><td>OSRM / OpenStreetMap</td><td>Localidades sem ligação rodoviária aparecem como "Sem estrada".</td></tr>
<tr><td>Passagens aéreas</td><td>ANAC, microdados de tarifas comercializadas</td><td>Média ponderada por assentos do trimestre, sem taxa de embarque.</td></tr>
<tr><td>Ajuda de custo e transporte</td><td>Lei nº 13.954/2019 e Decreto nº 4.307/2002</td><td>A Calculadora reproduz as tabelas; foi conferida com um caso real de transferência.</td></tr>
<tr><td>Fotos</td><td>Wikimedia Commons</td><td>Só licenças livres, com autor e licença na legenda. Sem quartéis, brasões ou fardados.</td></tr>
</tbody></table></div>
<h2>Revisão</h2>
<p>As fichas foram todas conferidas em outubro de 2026. Aluguel e cesta básica são revistos a cada trimestre; tarifas aéreas, quando a ANAC publica um novo trimestre; o resto, sempre que chega uma correção ou muda algo relevante na cidade (nome de comando, nova OM, nova ligação aérea). Cada mudança relevante é registrada em <a href="/atualizacoes">Atualizações</a>.</p>
<h2>Relatos de quem serviu</h2>
<p>Os relatos enviados pela página <a href="/contribuir">Contribua</a> servem para conferir e completar as fichas. Uma informação de relato só entra quando é confirmada por outra fonte ou por mais de um relato. Nomes não são publicados.</p>
<h2>Limitações</h2>
<p>Valores de aluguel de anúncios mostram o que se pede, não o que se fecha. Em cidades pequenas e nas localidades de fronteira quase não há anúncios on-line; nelas, a ficha orienta a procurar imobiliárias locais e a OM. Normas de pessoal mudam: o guia explica a regra geral e sempre indica confirmar com a OM.</p>
<p class="meta">Página atualizada em novembro de 2026</p>"""

# ---------------------------------------------------------------- Atualizações
ATUAL = """<h1>Atualizações do guia</h1>
<p class="resumo">O que mudou no Guia de Guarnições, da mais recente para a mais antiga. Correções enviadas por leitores entram aqui.</p>
<h2>Novembro de 2026</h2>
<ul>
<li><b>06/11</b> · Nova página <a href="/hoteis-de-transito">Hotéis de Trânsito</a>: busca pela guarnição no sistema oficial Meios de Hospedagem da DAP. As fichas ganharam o atalho para os hotéis de trânsito da cidade.</li>
<li><b>02/11</b> · Mais 32 fichas aprofundadas, com foco no interior: Fronteira Oeste e Missões do RS, Vale do Paraíba, Baixada Santista, Grande São Paulo, Serra Fluminense, Sul de Minas, Santa Catarina, Pernambuco e Pará. Já são 72 fichas com a seção sobre a cidade.</li>
<li><b>02/11</b> · 40 fichas aprofundadas, entre elas todas as capitais: nova seção "A cidade" (história, economia e como a cidade se organiza), custo de vida com tarifa de ônibus e outros números locais, lazer com 5 a 7 lugares e dicas de chegada específicas de cada cidade. As capitais ganharam também as seções de saúde, escolas e clima.</li>
<li><b>02/11</b> · Nova seção <a href="/guias/">Guias</a>, com 10 guias sobre as decisões da mudança.</li>
<li><b>02/11</b> · Páginas <a href="/sobre">Sobre</a> e <a href="/metodologia">Metodologia</a>.</li>
<li><b>02/11</b> · Fichas mais enxutas: saiu a seção de perguntas frequentes, que repetia o texto das seções, e saíram frases genéricas.</li>
</ul>
<h2>Outubro de 2026</h2>
<ul>
<li><b>29/10</b> · Foto de capa em 129 fichas (Wikimedia Commons) e "Resumo rápido" no topo de todas: aluguel, Colégio Militar mais próximo, distância até a capital, saúde, fuso e população.</li>
<li><b>29/10</b> · Calculadora de Transferência passa a estimar passagens aéreas por trecho, com tarifas médias da ANAC.</li>
<li><b>27/10</b> · Campo de busca com sugestões nas páginas Contribua e Comparar (sugestão de leitor).</li>
<li><b>26/10</b> · Comando Militar do Norte passa a aparecer como Comando Militar da Amazônia Oriental (CMAO), nome adotado em maio de 2026.</li>
<li><b>26/10</b> · Página inicial organizada pelos 8 Comandos Militares de Área.</li>
<li><b>26/10</b> · "Onde morar: bairros indicados" em 31 fichas, com dados oficiais por bairro onde existem.</li>
<li><b>26/10</b> · Nova página <a href="/locais-de-servir">Locais de servir</a>, com mapa das guarnições e as OM de cada arma.</li>
<li><b>26/10</b> · Páginas <a href="/contribuir">Contribua com o Guia</a> e <a href="/anuncie">Anuncie</a>.</li>
<li><b>26/10</b> · Correção: a ficha do 14º RC Mec estava como São Miguel do Iguaçu-PR; o certo é <a href="/sao-miguel-do-oeste-sc">São Miguel do Oeste-SC</a>.</li>
<li><b>22/10</b> · Lançamento do guia com 171 fichas, Calculadora de Transferência, comparador e Checklist da chegada.</li>
</ul>
<p>Viu algo desatualizado? <a href="/contribuir">Avise pelo formulário</a>.</p>"""


def org():
    return {"@type": "Organization", "name": "Guia de Guarnições", "url": SITE + "/"}


def guias():
    pasta = RAIZ / "dados" / "guias"
    itens = []
    for p in sorted(pasta.glob("*.json")):
        g = json.loads(p.read_text(encoding="utf-8"))
        itens.append(g)
    ordem = ["como-funciona-a-movimentacao", "ajuda-de-custo-e-transporte", "pnr-como-funciona",
             "alugar-imovel-na-nova-guarnicao", "levar-ou-vender-o-carro", "mudanca-com-pet",
             "escola-dos-filhos-na-transferencia", "carreira-do-conjuge", "saude-fusex-na-transferencia",
             "o-que-muda-em-cada-regiao"]
    itens.sort(key=lambda g: ordem.index(g["slug"]) if g["slug"] in ordem else 99)
    alt = 0
    for g in itens:
        fontes = " · ".join(f'<a href="{H.escape(f["url"])}" rel="nofollow noopener" target="_blank">{H.escape(f["nome"])}</a>'
                            for f in g.get("fontes", []))
        outros = [o for o in itens if o["slug"] != g["slug"]][:0]
        relac = "".join(f'<a href="/guias/{o["slug"]}"><b>{H.escape(o["titulo"])}</b><span>{H.escape(o["resumo"][:120])}</span></a>'
                        for o in [x for x in itens if x["slug"] != g["slug"]][:4])
        corpo = (f'<nav class="crumbs-g"><a href="/">Início</a> › <a href="/guias/">Guias</a></nav>\n'
                 f'<h1>{H.escape(g["titulo"])}</h1>\n<p class="resumo">{H.escape(g["resumo"])}</p>\n'
                 f'<p class="meta">Guia independente · atualizado em novembro de 2026 · confirme sempre com a sua OM</p>\n'
                 f'{g["corpo_html"]}\n'
                 + (f'<h2>Fontes</h2><p class="src">{fontes}</p>\n' if fontes else "")
                 + '<div class="note">Serve ou já serviu numa guarnição e tem algo a acrescentar? '
                   '<a href="/contribuir">Conte para o guia</a>.</div>\n'
                 + f'<h2>Outros guias</h2><div class="cards-g">{relac}</div>')
        ld = {"@context": "https://schema.org", "@type": "Article", "headline": g["titulo"],
              "description": g["descricao"], "inLanguage": "pt-BR", "datePublished": HOJE, "dateModified": HOJE,
              "author": org(), "publisher": org(), "mainEntityOfPage": f"{SITE}/guias/{g['slug']}"}
        alt += grava(f"guias/{g['slug']}.html", pagina(f"/guias/{g['slug']}", g["titulo"], g["descricao"], corpo, ld))
    cards = "".join(f'<a href="/guias/{g["slug"]}"><b>{H.escape(g["titulo"])}</b><span>{H.escape(g["resumo"])}</span></a>'
                    for g in itens)
    corpo = ('<h1>Guias da mudança de guarnição</h1>\n'
             '<p class="resumo">O que decidir e quando, da publicação da movimentação à primeira semana na nova cidade. '
             'Cada guia junta regra, prática e exemplos de cidades, e aponta a fonte para você conferir.</p>\n'
             f'<div class="cards-g">{cards}</div>\n'
             '<p>Procura uma cidade específica? Veja as <a href="/">171 fichas de guarnição</a> ou '
             '<a href="/comparar">compare duas guarnições</a>.</p>')
    ld = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Guias da mudança de guarnição",
          "url": SITE + "/guias/", "inLanguage": "pt-BR", "publisher": org()}
    alt += grava("guias/index.html", pagina("/guias/", "Guias da mudança de guarnição",
                                             "Guias práticos para a transferência: movimentação, ajuda de custo, PNR, aluguel, carro, pets, "
                                             "escola, trabalho do cônjuge e saúde.", corpo, ld))
    return [g["slug"] for g in itens], alt


def main():
    n = 0
    n += grava("sobre.html", pagina("/sobre", "Sobre o Guia", "Quem faz o Guia de Guarnições, para quem ele é, como se mantém "
                                    "e como enviar correções e relatos.", SOBRE,
                                    {"@context": "https://schema.org", "@type": "AboutPage", "url": SITE + "/sobre", "publisher": org()}))
    n += grava("metodologia.html", pagina("/metodologia", "Metodologia", "De onde vêm os dados das fichas do Guia de "
                                          "Guarnições, como são conferidos e com que frequência são revistos.", METODO))
    n += grava("atualizacoes.html", pagina("/atualizacoes", "Atualizações", "Histórico de atualizações e correções do "
                                           "Guia de Guarnições.", ATUAL))
    slugs, a = guias()
    n += a
    # sitemap
    sm = RAIZ / "sitemap.xml"
    x = sm.read_text(encoding="utf-8")
    urls = ["/sobre", "/metodologia", "/atualizacoes", "/guias/"] + [f"/guias/{s}" for s in slugs]
    for u in urls:
        loc = SITE + u
        if f"<loc>{loc}</loc>" not in x:
            x = x.replace("</urlset>", f"  <url><loc>{loc}</loc><lastmod>{HOJE}</lastmod></url>\n</urlset>")
    sm.write_text(x, encoding="utf-8")
    print(n, "páginas geradas/alteradas;", len(slugs), "guias")


if __name__ == "__main__":
    main()
