#!/usr/bin/env python3
"""Enxuga o texto padrão repetido nas fichas (revisão para o AdSense, nov/2026).

O Google AdSense recusou o site por "conteúdo de baixo valor". Parte do motivo:
frases iguais em quase todas as fichas e uma seção de Perguntas frequentes que
só repetia o texto das seções. Este script:

- tira a seção "Perguntas frequentes" e o JSON-LD FAQPage (e o atalho no índice);
- troca o parágrafo de abertura padrão por uma linha curta;
- tira de "Antes de ir" os dois itens genéricos (PNR e FuSEx), que estão no
  checklist e nos guias, e aponta para os guias;
- troca o aviso genérico do FuSEx em Saúde por um link para o guia;
- tira as frases vazias de custo ("Cidade com comércio e serviços...");
- encurta o aviso "Sem amostra" de aluguel e aponta para o guia de aluguel;
- põe "Guias" no menu e Sobre/Metodologia/Guias/Atualizações no rodapé de
  todas as páginas;
- remove atalhos do índice da ficha que apontam para seções inexistentes.

2ª revisão (nov/2026, nova recusa por "conteúdo de baixo valor"):
- tira a linha de abertura igual em todas ("Para militares, famílias e civis...");
- encurta o selo "Ficha conferida em ..." (sem a frase-padrão sobre fontes);
- tira o parágrafo-padrão do convite "Serve ou já serviu?" (ficam o título e os botões);
- tira de Saúde o parágrafo genérico sobre a rede conveniada (está no guia do FuSEx);
- encurta a legenda dos vídeos de terceiros.
- põe em cada seção o link para o guia do assunto, se ainda não houver
  (Como chegar → carro; Custo → aluguel e PNR; Saúde → FuSEx; Educação → escola).

Idempotente:  python3 limpeza_fichas.py
"""
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent

MENU_OLD = '<a href="/checklist-da-chegada">Checklist da chegada</a>\n    <p class="aviso">'
MENU_NEW = ('<a href="/checklist-da-chegada">Checklist da chegada</a>\n    <a href="/guias/">Guias</a>\n'
            '    <p class="aviso">')
ROD_OLD = '<a href="/#sobre" style="color:inherit;font-weight:600">Sobre o Guia</a>'
ROD_NEW = ('<a href="/sobre" style="color:inherit;font-weight:600">Sobre o Guia</a>'
           '<a href="/guias/" style="color:inherit;font-weight:600">Guias</a>'
           '<a href="/metodologia" style="color:inherit;font-weight:600">Metodologia</a>'
           '<a href="/atualizacoes" style="color:inherit;font-weight:600">Atualizações</a>')

G_ALUGUEL = "/guias/alugar-imovel-na-nova-guarnicao"
G_FUSEX = "/guias/saude-fusex-na-transferencia"
G_MOV = "/guias/como-funciona-a-movimentacao"
G_PNR = "/guias/pnr-como-funciona"
G_ESCOLA = "/guias/escola-dos-filhos-na-transferencia"
G_CARRO = "/guias/levar-ou-vender-o-carro"
# Link para o guia do assunto no fim de cada seção da ficha (só entra se a seção ainda não aponta para ele)
LINKS_SECAO = [
    ("sec-acesso", G_CARRO, "Guia: levar ou vender o carro na transferência →"),
    ("sec-custo", G_ALUGUEL, "Guia: como alugar imóvel na nova guarnição →"),
    ("sec-custo", G_PNR, "Guia: PNR, fila, taxa de uso e vistoria →"),
    ("sec-saude", G_FUSEX, "Guia: como levar o atendimento do FuSEx para a nova guarnição →"),
    ("sec-educacao", G_ESCOLA, "Guia: escola dos filhos e Colégio Militar na transferência →"),
]


def nome_cidade(h):
    m = re.search(r"<h1>(.*?) <span>", h)
    return m.group(1) if m else None


def links_secoes(h):
    for sid, url, txt in LINKS_SECAO:
        m = re.search(r'<section class="sec" id="' + sid + r'">.*?</section>', h, re.S)
        if not m or f'href="{url}"' in m.group(0):
            continue
        sec = m.group(0)
        i = sec.rfind("</div>")  # fim do div.body
        sec2 = sec[:i] + f'<p class="guia-link"><a href="{url}" class="ck-link">{txt}</a></p>' + sec[i:]
        h = h[:m.start()] + sec2 + h[m.end():]
    return h


def ficha(h):
    c = nome_cidade(h)
    # FAQ
    h = re.sub(r'<section class="sec faq" id="sec-faq">.*?</section>\n?\s*', "", h, flags=re.S)
    h = re.sub(r'<script type="application/ld\+json" id="faq-ld">.*?</script>\n?', "", h, flags=re.S)
    h = h.replace('<a href="#sec-faq">Perguntas</a>', "")
    # abertura padrão
    h = re.sub(r'<p class="intro">Foi movimentado para .*?</p>\n?\s*', "", h, flags=re.S)
    h = re.sub(r'<p class="intro"><span class="civis">Para militares, famílias e civis que vão morar em [^<]*</span></p>\n?\s*',
               "", h)
    # selo de atualização e convite (frases iguais em todas as fichas)
    h = h.replace(". Cada dado traz a fonte e a data ao fim da seção.</p>", ".</p>")
    h = re.sub(r'(<section class="fix">\s*<h2>[^<]*</h2>)\s*<p>Conte como é morar lá: bairros, aluguel, escola, saúde e o que '
               r'você gostaria de ter sabido antes\. Se alguma informação desta ficha estiver desatualizada, avise\. '
               r'As contribuições entram nas próximas atualizações\.</p>', r"\1", h)
    # Saúde: parágrafo genérico (o guia do FuSEx explica)
    h = h.replace("<p>O atendimento inicial é feito na seção de saúde da própria OM. Consultas especializadas, exames e "
                  "internações são feitos na rede civil conveniada ao FuSEx, com guia emitida pela Unidade Gestora do FuSEx "
                  "que atende a guarnição.</p>", "")
    # legenda dos vídeos de terceiros
    h = h.replace("Vídeo de terceiros, hospedado no YouTube; o conteúdo é de responsabilidade do canal.", "Vídeo de terceiros.")
    # Antes de ir
    h = h.replace("<li>Procure a seção responsável pelos PNR para saber a situação da fila.</li>", "")
    h = h.replace("<li>Atualize o cadastro no FuSEx e leve laudos e receitas dos dependentes.</li>", "")
    h = h.replace("<ul></ul>\n", "").replace("<ul></ul>", "")
    h = h.replace('<p><a href="/checklist-da-chegada" class="ck-link">Veja também o checklist geral da mudança →</a></p>',
                  f'<p><a href="/checklist-da-chegada" class="ck-link">Checklist da chegada (PNR, FuSEx, escola, documentos) →</a><br>'
                  f'<a href="{G_MOV}" class="ck-link">Guia: como funciona a movimentação →</a></p>')
    # Saúde
    h = h.replace('<div class="note"><b>Ao chegar:</b> atualize o cadastro no FuSEx e peça a lista atualizada de médicos, '
                  'clínicas e hospitais credenciados.</div>',
                  f'<p><a href="{G_FUSEX}" class="ck-link">Guia: como levar o atendimento do FuSEx para a nova guarnição →</a></p>')
    # Custo
    h = re.sub(r"<p>Cidade com comércio e serviços (?:para o dia a dia|completos(?:, puxados pelo agronegócio)?)\.</p>", "", h)
    h = re.sub(r'<div class="note"><b>Sem amostra confiável:</b>.*?</div>',
               f'<div class="note"><b>Aluguel:</b> há poucos anúncios on-line nesta cidade; o mercado passa por imobiliárias '
               f'locais. Veja <a href="{G_ALUGUEL}">como alugar à distância com segurança</a>.</div>', h, flags=re.S)
    # atalhos para seções que não existem
    ids = set(re.findall(r'id="(sec-[a-z-]+)"', h))
    h = re.sub(r'<a href="#(sec-[a-z-]+)">[^<]*</a>', lambda m: m.group(0) if m.group(1) in ids else "", h)
    h = links_secoes(h)
    return h


def todas(h):
    if MENU_NEW not in h:
        h = h.replace(MENU_OLD, MENU_NEW)
    if ROD_NEW not in h:
        h = h.replace(ROD_OLD, ROD_NEW)
    return h


def main():
    n = 0
    for p in sorted(RAIZ.rglob("*.html")):
        if ".git" in p.parts:
            continue
        h = orig = p.read_text(encoding="utf-8")
        if 'http-equiv="refresh"' in h:
            continue
        if re.fullmatch(r"[a-z0-9-]+-[a-z]{2}", p.stem) and p.parent == RAIZ:
            h = ficha(h)
        h = todas(h)
        if h != orig:
            p.write_text(h, encoding="utf-8")
            n += 1
    print(n, "páginas alteradas")


if __name__ == "__main__":
    main()
