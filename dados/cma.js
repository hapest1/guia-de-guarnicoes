/* Comando Militar da Amazônia — fichas do Guia de Guarnições.
   Para adicionar uma guarnição, copie um bloco e preencha os campos. */
window.GUARNICOES = (window.GUARNICOES || []).concat([
{
  id: "boa-vista",
  cidade: "Boa Vista",
  uf: "RR",
  estado: "Roraima",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "02°49′N 60°40′W · alt. 90 m · UTC−4",
  conferido: "out/2026",
  tags: ["1ª Bda Inf Sl", "18º RC Mec", "7º BIS", "10º GAC Sl", "Fronteira", "Selva"],
  destaque: "Fronteira",
  resumo: "Capital de Roraima e sede da Brigada Lobo D'Almada. Cidade planejada, quente o ano todo, porta de entrada para a Venezuela e a Guiana.",
  lede: "Única capital brasileira inteiramente ao norte da Linha do Equador. Concentra cerca de dois terços da população de Roraima e reúne o comando e a maior parte das unidades da 1ª Brigada de Infantaria de Selva.",
  fatos: [
    {r:"População", v:"485 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Até Manaus", v:"~785 km", s:"BR-174, única ligação por terra"},
    {r:"Clima", v:"23–36 °C", s:"chuvas de abril a setembro"},
    {r:"Cesta básica", v:"R$ 698", s:"DIEESE, ago/2026"},
    {r:"Grande Comando", v:"CMA", s:"1ª Bda Inf Sl"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<p>Boa Vista é sede da <b>1ª Brigada de Infantaria de Selva</b>, a Brigada Lobo D'Almada, instalada na cidade em 1992 e subordinada ao Comando Militar da Amazônia. O complexo fica no bairro Marechal Rondon.</p>
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo 1ª Bda Inf Sl e Cia Cmdo</td><td>Comando da Brigada</td></tr>
<tr><td class="k">Cmdo Fron RR / 7º BIS</td><td>Responde pelos Pelotões Especiais de Fronteira do estado</td></tr>
<tr><td class="k">18º RC Mec</td><td>Criado a partir do 12º Esqd C Mec. Previsto com três esquadrões e cerca de 600 militares. Recebeu Guarani, Guaicurus e Cascavel a partir de 2024</td></tr>
<tr><td class="k">10º GAC Sl</td><td>Artilharia de campanha de selva</td></tr>
<tr><td class="k">1º B Log Sl</td><td>Apoio logístico da Brigada</td></tr>
<tr><td class="k">1º Pel Com Sl</td><td>Comunicações</td></tr>
<tr><td class="k">32º Pel PE</td><td>Polícia do Exército</td></tr>
<tr><td class="k">6º BEC</td><td>Engenharia de construção. Construiu a BR-174 e a BR-401</td></tr>
<tr><td class="k">P Med Gu Boa Vista</td><td>Posto Médico de Guarnição (ver Saúde)</td></tr>
</tbody></table></div>
<p>No interior do estado há Pelotões Especiais de Fronteira, entre eles Pacaraima, Uiramutã, Surucucu, Bonfim e Normandia. A Base Aérea de Boa Vista, da FAB, também fica na cidade.</p>
<div class="src">Fontes: <a href="https://ompv.eceme.eb.mil.br/images/geop/geocapac/forca-prontidao-lobo-d-almada-crise-yanomami.pdf">ECEME</a> · <a href="https://www.folhabv.com.br/?p=114455">Folha BV</a> · <a href="https://defesaaereanaval.com.br/exercito/comandante-do-exercito-supervisiona-a-implantacao-de-novas-capacidades-em-roraima">Defesa Aérea & Naval</a> · <a href="https://opovo.com.br/trends/exercito-leva-28-blindados-para-o-extremo-norte-e-reforca-a-fronteira-com-venezuela-e-guiana/">O Povo</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<h3>De avião</h3>
<p>O Aeroporto Internacional de Boa Vista (BVB) fica a cerca de 3,5 km do centro. Em 2026 a cidade ganhou voos diretos da Gol para Manaus (abril) e da Azul para Campinas (agosto, cerca de 5 horas, a rota doméstica mais longa do país). Há ligação com Brasília e um voo internacional para Puerto Ordaz, na Venezuela.</p>
<h3>De carro</h3>
<p>A BR-174 é a única rodovia que liga Roraima ao resto do Brasil. São cerca de 785 km entre Manaus e Boa Vista. Cerca de 125 km da estrada atravessam a Terra Indígena Waimiri-Atroari, onde o tráfego é interrompido todas as noites.</p>
<div class="note"><b>Atenção:</b> o trecho Waimiri-Atroari fica fechado à noite (historicamente das 18h30 às 5h30). Planeje a viagem para atravessar de dia e confirme o horário com a PRF antes de sair.</div>
<p>Quem vem do Sul, Sudeste ou Nordeste com o próprio carro normalmente chega a Manaus de balsa (de Belém ou Porto Velho) e segue pela BR-174. Compare o custo do frete do veículo com a opção de vender e comprar outro em Boa Vista.</p>
<h3>Fronteiras próximas</h3>
<ul>
<li><b>Bonfim / Lethem (Guiana):</b> cerca de 125 km pela BR-401, 1h30 de carro. Lethem é conhecida pelas compras baratas.</li>
<li><b>Pacaraima / Santa Elena de Uairén (Venezuela):</b> cerca de 210 km pela BR-174, sentido norte.</li>
</ul>
<div class="src">Fontes: <a href="https://www.panrotas.com.br/tudo-sobre/boa-vista">Panrotas</a> · <a href="https://www.logitravel.pt/voos/america/brasil/de/boa-vista/">Logitravel</a> · <a href="https://documentacao.socioambiental.org/noticias/anexo_noticia/40579_20170410_134016.PDF">Folha de S.Paulo/ISA</a> · <a href="https://portalamazonia.com/roraima/bonfim-e-pacaraima-conheca-as-cidades-na-fronteira-com-regiao-disputada-pela-venezuela-e-guiana/">Portal Amazônia</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<h3>Alimentação</h3>
<p>Pela pesquisa nacional do DIEESE, a cesta básica em Boa Vista custou <b class="num">R$ 698,04</b> em agosto de 2026, valor que permite comparar com as outras capitais deste guia. A pesquisa estadual da Secretaria de Planejamento de Roraima, que usa outra cesta, apontou R$ 603,46 em fevereiro de 2026.</p>
<h3>Aluguel</h3>
<p>Corretores locais citam valores entre <b class="num">R$ 1.500 e R$ 2.000</b> para uma casa simples de 2 quartos nas áreas mais procuradas. As zonas Norte e Leste concentram os bairros considerados nobres. Aparecida (Norte) e Cidade Satélite (Oeste) estão entre os bairros com mais imóveis alugados, e na zona Oeste os valores costumam ser menores.</p>
<div class="note"><b>Valor indicativo:</b> os preços de aluguel vêm de reportagens locais e podem estar defasados. Use como ponto de partida e confira em imobiliárias e com militares que já estão na guarnição.</div>
<h3>Energia elétrica</h3>
<p>Roraima foi o último estado fora do sistema elétrico nacional. O Linhão de Tucuruí foi energizado em setembro de 2025, e a interligação efetiva começou em 1º de janeiro de 2026. Antes disso o estado dependia de termelétricas e de energia importada da Venezuela, com quedas frequentes. Como o ar-condicionado é praticamente obrigatório, inclua a conta de luz no orçamento.</p>
<div class="src">Fontes: <a href="https://www.dieese.org.br/analisecestabasica/2026/202608cestabasica.pdf">DIEESE</a> · <a href="https://seplan.rr.gov.br/wp-content/uploads/2026/04/Cesta-Basica-fevereiro-2026-Versao-1-26.02.2026.pdf">SEPLAN-RR</a> · <a href="https://www.folhabv.com.br/?p=55401">Folha BV</a> · <a href="https://www.folhabv.com.br/?p=24384">Folha BV</a> · <a href="https://www.poder360.com.br/poder-energia/roraima-sera-ligada-ao-sistema-nacional-de-energia-em-janeiro/">Poder360</a> · conferido em out/2026</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>A guarnição conta com o <b>Posto Médico de Guarnição de Boa Vista</b>, vinculado à 1ª Bda Inf Sl, que atende os beneficiários do FuSEx. Exames e especialidades que o posto não oferece são feitos na rede civil conveniada, mediante guia.</p>
<p>Casos de maior complexidade podem exigir encaminhamento para outra guarnição, normalmente Manaus, que tem a estrutura hospitalar militar mais próxima. Já houve projeto de transformar o posto em Hospital de Guarnição; confirme a situação atual ao chegar.</p>
<div class="note"><b>Ao chegar:</b> atualize o cadastro seu e dos dependentes na UG/FuSEx da guarnição e peça a relação atual de médicos e clínicas conveniadas. Quem tem tratamento contínuo deve levar laudos e receitas.</div>
<div class="src">Fontes: <a href="https://1bdainfsl.eb.mil.br/images/artigos/2023/edital_pmgu/ANEXO_L.pdf">1ª Bda Inf Sl</a> · <a href="https://www.folhabv.com.br/?p=100567">Folha BV</a> · conferido em out/2026</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>Boa Vista não tem Colégio Militar do Sistema Colégio Militar do Brasil. O mais próximo é o Colégio Militar de Manaus.</p>
<p>Na cidade funciona o <b>Colégio Militar Estadual Coronel PM Derly Luiz Vieira Borges</b>, da Polícia Militar de Roraima, no bairro Canarinho. Até metade das vagas é reservada a dependentes de policiais e bombeiros militares; as demais são abertas à comunidade. O estado mantém ainda uma rede de colégios estaduais militarizados.</p>
<p>No ensino superior, a cidade tem a Universidade Federal de Roraima (UFRR), a Universidade Estadual de Roraima (UERR) e o Instituto Federal de Roraima (IFRR), além de faculdades particulares.</p>
<div class="note"><b>Transferência escolar:</b> procure as escolas antes da mudança. Vagas em colégios disputados costumam acabar cedo, principalmente para quem chega no meio do ano.</div>
<div class="src">Fontes: <a href="https://www.folhabv.com.br/?p=114731">Folha BV</a> · <a href="https://www.folhabv.com.br/educacao/entenda-as-diferencas-entre-os-sistemas-militarizado-e-civico-militar/">Folha BV</a> · conferido em out/2026</div>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Quente e úmido o ano inteiro, sem inverno no sentido do Sul. O ano se divide em duas estações:</p>
<div class="climate" aria-label="Estações por mês">
  <div class="dry">J</div><div class="dry">F</div><div class="dry">M</div><div class="wet">A</div><div class="wet">M</div><div class="wet">J</div><div class="wet">J</div><div class="wet">A</div><div class="wet">S</div><div class="dry">O</div><div class="dry">N</div><div class="dry">D</div>
</div>
<div class="legend"><span><i style="background:var(--accent)"></i>Chuvoso (abr–set, pico em jun–jul)</span><span><i style="background:var(--mark-soft); border:1px solid var(--line)"></i>Seco (out–mar)</span></div>
<p style="margin-top:14px">No período chuvoso as máximas ficam abaixo de 31 °C. No seco o calor aperta: de setembro a dezembro a máxima média passa de 33 °C, e em março há semanas com picos de 36 a 38 °C e umidade baixa. A chuva anual gira em torno de 1.750 mm.</p>
<div class="note"><b>Na prática:</b> ar-condicionado em todos os quartos, protetor solar diário (o índice UV chega a extremo) e roupa leve. Fardamento de instrução sofre com o sol; tenha peças de reserva.</div>
<div class="src">Fontes: <a href="https://www.folhabv.com.br/?p=19318">Folha BV / FEMARH</a> · <a href="https://webarcondicionado.com.br/temperatura-de-boa-vista">Web Ar Condicionado</a> · <a href="https://www.cnnbrasil.com.br/nacional/norte/rr/boa-vista-tera-semana-com-periodos-de-chuva-e-ceu-parcialmente-nublado/">CNN Brasil</a> · conferido em out/2026</div>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<h3>Na cidade</h3>
<p>Boa Vista foi planejada em forma de leque, com avenidas largas partindo do centro, à margem do Rio Branco. A cultura mistura migrantes de todo o país, sobretudo nordestinos, com a presença indígena (macuxi, wapixana e outros povos) e, mais recentemente, a venezuelana.</p>
<p>O ponto alto do calendário é o <b>Boa Vista Junina</b>, que se apresenta como o maior arraial da Amazônia. Em 2026 teve sua 26ª edição, de 13 a 19 de junho, na Praça Fábio Marques Paracat, com 28 quadrilhas e a tradicional Maior Paçoca do Mundo. O aniversário da cidade é em 9 de julho.</p>
<h3>Fim de semana fora</h3>
<div class="places">
  <div class="place"><span class="km">~60 km · Cantá</span><b>Serra Grande</b><p>Trilhas e natureza a pouco mais de uma hora da capital.</p></div>
  <div class="place"><span class="km">~25 km</span><b>Comunidades indígenas</b><p>A comunidade Tabalascada, do povo wapixana, recebe visitantes com turismo de base comunitária.</p></div>
  <div class="place"><span class="km">~180 km · Normandia</span><b>Lago Caracaranã</b><p>Água clara e praias de areia branca, dentro da TI Raposa Serra do Sol. A comunidade cobra uma taxa de visita e de pernoite.</p></div>
  <div class="place"><span class="km">~210 km · Amajari</span><b>Serra do Tepequém</b><p>Antigo garimpo, hoje polo de ecoturismo com cachoeiras, mirantes e clima mais ameno. Vale ir de carro e passar a noite.</p></div>
  <div class="place"><span class="km">via Pacaraima</span><b>Monte Roraima</b><p>O tepui da tríplice fronteira. A trilha clássica sai do lado venezuelano e exige vários dias e guia.</p></div>
  <div class="place"><span class="km">~125 km · Bonfim</span><b>Lethem (Guiana)</b><p>Bate-volta de compras do outro lado da ponte sobre o rio Tacutu.</p></div>
</div>
<div class="note"><b>Cuidado com os rios:</b> praias de rio e igarapés são o lazer mais comum, e há afogamentos todos os anos, inclusive de militares. Correnteza e profundidade mudam muito entre o período seco e o chuvoso.</div>
<div class="src">Fontes: <a href="https://portalamazonia.com/cultura/programacao-boa-vista-junina-2026/">Portal Amazônia</a> · <a href="https://portalamazonia.com/bora-de-trip/o-lindo-e-sagrado-lago-caracarana/">Portal Amazônia</a> · <a href="https://quantocustaviajar.com/brasil/boa-vista/">Quanto Custa Viajar</a> · <a href="https://all.accor.com/a/pt-br/limitless/thematics/travel-tips-guides/pontos-turisticos-para-visitar-em-roraima.html">Accor</a> · <a href="https://www.folhabv.com.br/?p=540720">Folha BV</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<p>Lista prática para quem foi movimentado para Boa Vista:</p>
<ul>
<li>Decida cedo se o carro vai junto. O transporte por balsa até Manaus mais os 785 km de BR-174 levam tempo e dinheiro.</li>
<li>Ajuste relógios e compromissos: Roraima está uma hora atrás de Brasília.</li>
<li>Procure a seção da guarnição responsável pelos PNR para saber a situação da fila e o prazo médio de espera.</li>
<li>Reserve hospedagem para os primeiros dias e visite imóveis pessoalmente antes de assinar contrato.</li>
<li>Leve laudos, receitas e o cartão do FuSEx de todos os dependentes.</li>
<li>Para pets, viajar de avião exige reserva antecipada e cuidado com o calor na chegada.</li>
<li>Se pretende ir à Venezuela ou à Guiana, veja com a OM as regras para militares deixarem o território nacional.</li>
</ul>`
  }
  ]
},
{
  id: "manaus",
  cidade: "Manaus",
  uf: "AM",
  estado: "Amazonas",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "03°06′S 60°01′W · alt. 92 m · UTC−4",
  conferido: "out/2026",
  tags: ["CMA", "12ª RM", "CIGS", "Colégio Militar", "HMAM", "Aviação"],
  destaque: "Sede do CMA",
  resumo: "Metrópole da Amazônia e sede do Comando Militar da Amazônia. Concentra escolas, hospital de área, Colégio Militar e dezenas de OM.",
  lede: "Sétima capital mais populosa do país, na confluência dos rios Negro e Solimões. É a maior guarnição da Amazônia e o centro logístico de todo o CMA, com estrutura de cidade grande e acesso por terra limitado ao resto do Brasil.",
  fatos: [
    {r:"População", v:"2,3 mi", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Aluguel", v:"R$ 52/m²", s:"FipeZAP, mar/2026"},
    {r:"Clima", v:"24–34 °C", s:"chuvas de dezembro a maio"},
    {r:"Cesta básica", v:"R$ 666", s:"DIEESE, ago/2026"},
    {r:"Grande Comando", v:"CMA", s:"12ª RM"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<p>Manaus é sede do <b>Comando Militar da Amazônia</b> e da <b>12ª Região Militar</b>. A guarnição reúne estruturas de comando, ensino, saúde, logística e tropa.</p>
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">CMA e Cia Cmdo</td><td>Comando Militar de Área</td></tr>
<tr><td class="k">12ª RM</td><td>Região Militar, com 12º B Sup e Parque Regional de Manutenção</td></tr>
<tr><td class="k">CIGS</td><td>Centro de Instrução de Guerra na Selva</td></tr>
<tr><td class="k">Colégio Militar de Manaus</td><td>Sistema Colégio Militar do Brasil</td></tr>
<tr><td class="k">Hospital Militar de Área de Manaus</td><td>Referência de saúde do Exército na Amazônia</td></tr>
<tr><td class="k">1º BIS (Amv)</td><td>Infantaria de selva aeromóvel</td></tr>
<tr><td class="k">4º BAvEx</td><td>Aviação do Exército</td></tr>
<tr><td class="k">2º Gpt E</td><td>Grupamento de Engenharia</td></tr>
<tr><td class="k">Outras</td><td>1º B Com GE, 4º B Inf Mtz, 7º BPE, 12º GAAAe Sl, 4º CGEO, Centro de Embarcações do CMA, entre outras</td></tr>
</tbody></table></div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · <a href="https://hmam.eb.mil.br/images/arquivos/credenciamento/14AnexoM_ListaReferencialDeProcedimentosHospitalaresDoHMilAManaus.pdf">HMAM</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<h3>De avião</h3>
<p>O Aeroporto Internacional Eduardo Gomes tem voos diretos para as principais capitais e é o ponto de conexão para o interior do Amazonas, Roraima e Rondônia.</p>
<h3>Por terra e por rio</h3>
<p>Manaus não tem ligação rodoviária pavimentada com o Centro-Sul. A BR-174 liga a cidade a Boa Vista. A BR-319, para Porto Velho, tem um longo trecho central sem asfalto que fica intransitável nas chuvas.</p>
<p>Para trazer o carro, o caminho usual é de balsa a partir de Belém ou de Porto Velho. A viagem leva dias, então planeje com antecedência e compare com vender o carro e comprar outro em Manaus.</p>
<div class="note"><b>Atenção:</b> não conte com a BR-319 para a mudança. Mesmo no período seco, o trecho do meio exige veículo preparado e tem pouca estrutura de apoio.</div>
<div class="src">Fontes: <a href="https://www.poder360.com.br/poder-infra/rodovia-da-lama-na-amazonia-espera-asfalto-ha-mais-de-meio-seculo/">Poder360</a> · <a href="https://portalamazonia.com/cidades/br-319-esta-novamente-intransitavel-por-falta-de-manutencao-no-trecho-do-meio/">Portal Amazônia</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<h3>Aluguel</h3>
<p>O aluguel residencial em Manaus custava em média <b class="num">R$ 52,63 por m²</b> em março de 2026, pelo índice FipeZAP, praticamente igual à média nacional. Um apartamento de 60 m² sai por volta de R$ 3.150. A alta foi forte em 2026: mais de 10% só no primeiro trimestre.</p>
<div class="tbl-wrap"><table>
<thead><tr><th>Bairro</th><th>R$/m²</th><th>Perfil</th></tr></thead>
<tbody>
<tr><td class="k">Adrianópolis</td><td class="num">66,90</td><td>Mais caro da cidade</td></tr>
<tr><td class="k">Aleixo</td><td class="num">63,60</td><td>Alta de quase 20% em 12 meses</td></tr>
<tr><td class="k">Ponta Negra</td><td class="num">55,90</td><td>Orla, condomínios</td></tr>
<tr><td class="k">Centro</td><td class="num">41,30</td><td>Entre os mais baratos</td></tr>
<tr><td class="k">Flores</td><td class="num">40,30</td><td>Entre os mais baratos</td></tr>
</tbody></table></div>
<p>A reportagem que analisou o índice cita a chegada de militares, servidores e empresas do Polo Industrial entre os motivos da alta, junto com a migração de imóveis para aluguel por temporada.</p>
<h3>Alimentação</h3>
<p>A cesta básica custou <b class="num">R$ 666,02</b> em agosto de 2026, segundo o DIEESE.</p>
<div class="note"><b>Na prática:</b> o aluguel subiu mais rápido que os salários. Se houver PNR disponível, a diferença no orçamento é grande.</div>
<div class="src">Fontes: <a href="https://portas.com.br/dados-inteligencia/por-que-manaus-lidera-a-alta-do-aluguel-no-brasil-em-2026/">Portas / FipeZAP</a> · <a href="https://www.dieese.org.br/analisecestabasica/2026/202608cestabasica.pdf">DIEESE</a> · conferido em out/2026</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>Manaus tem o <b>Hospital Militar de Área de Manaus (HMAM)</b>, que atende os beneficiários do FuSEx e recebe casos encaminhados de outras guarnições da Amazônia. A cidade também tem rede civil conveniada ampla.</p>
<div class="note"><b>Ao chegar:</b> atualize o cadastro no FuSEx e peça a relação de credenciados. Para quem vai depois para uma guarnição do interior, Manaus costuma ser o destino das evacuações.</div>
<div class="src">Fontes: <a href="https://hmam.eb.mil.br/images/arquivos/credenciamento/14AnexoM_ListaReferencialDeProcedimentosHospitalaresDoHMilAManaus.pdf">HMAM</a> · conferido em out/2026</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem o <b>Colégio Militar de Manaus</b>, do Sistema Colégio Militar do Brasil, que atende dependentes de militares. É também o colégio militar mais próximo de quem serve em Roraima e no interior do Amazonas.</p>
<p>No ensino superior há a Universidade Federal do Amazonas (UFAM), a Universidade do Estado do Amazonas (UEA), o Instituto Federal do Amazonas (IFAM) e muitas faculdades particulares.</p>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Quente e úmido o ano todo. A estação chuvosa vai de dezembro a maio. De agosto a novembro chove menos e o calor é mais forte. Os rios seguem outro ritmo: a cheia atinge o pico por volta de junho e a seca, em outubro e novembro.</p>
<div class="climate" aria-label="Estações por mês">
  <div class="wet">J</div><div class="wet">F</div><div class="wet">M</div><div class="wet">A</div><div class="wet">M</div><div class="dry">J</div><div class="dry">J</div><div class="dry">A</div><div class="dry">S</div><div class="dry">O</div><div class="dry">N</div><div class="wet">D</div>
</div>
<div class="legend"><span><i style="background:var(--accent)"></i>Mais chuvoso (dez–mai)</span><span><i style="background:var(--mark-soft); border:1px solid var(--line)"></i>Menos chuvoso (jun–nov)</span></div>
<div class="note"><b>Na prática:</b> nas secas fortes dos últimos anos houve fumaça de queimadas e dificuldade de navegação, com reflexo no preço de produtos que chegam por rio.</div>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>Manaus tem vida de capital: shoppings, restaurantes, teatro e eventos o ano todo, com uma culinária baseada em peixes de rio, como tambaqui e pirarucu, e frutas regionais.</p>
<div class="places">
  <div class="place"><span class="km">Centro</span><b>Teatro Amazonas</b><p>Símbolo do ciclo da borracha, com programação de óperas e concertos.</p></div>
  <div class="place"><span class="km">Passeio de barco</span><b>Encontro das Águas</b><p>Onde o Rio Negro e o Solimões correm lado a lado sem se misturar.</p></div>
  <div class="place"><span class="km">Zona Oeste</span><b>Praia da Ponta Negra</b><p>Orla com calçadão, bares e praia de rio, que aparece mais na seca.</p></div>
  <div class="place"><span class="km">~107 km</span><b>Presidente Figueiredo</b><p>Cachoeiras e grutas, o bate-volta mais procurado a partir de Manaus.</p></div>
  <div class="place"><span class="km">por barco ou avião</span><b>Parintins</b><p>Festival dos bois Garantido e Caprichoso, no fim de junho.</p></div>
</div>
<div class="note"><b>Cuidado com os rios:</b> correnteza e profundidade mudam muito entre cheia e seca. Respeite as áreas sinalizadas para banho.</div>
<div class="src">Fontes: <a href="https://periodicos.ufpel.edu.br/index.php/tessituras/article/view/4816/3794">UFPel (distância de Presidente Figueiredo)</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Decida cedo sobre o carro: o transporte é por balsa e leva dias.</li>
<li>Procure a seção da guarnição responsável pelos PNR para saber a situação da fila. Com o aluguel em alta, vale a pena.</li>
<li>Pesquise bairros pelo trajeto até a OM. O trânsito de Manaus é pesado nos horários de pico.</li>
<li>Peça vaga no Colégio Militar de Manaus seguindo o calendário do processo de matrícula de dependentes.</li>
<li>Ajuste relógios: o Amazonas está uma hora atrás de Brasília.</li>
</ul>`
  }
  ]
},
{
  id: "porto-velho",
  cidade: "Porto Velho",
  uf: "RO",
  estado: "Rondônia",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "08°46′S 63°54′W · alt. 85 m · UTC−4",
  conferido: "out/2026",
  tags: ["17ª Bda Inf Sl", "5º BEC", "H Gu Porto Velho", "Rio Madeira"],
  destaque: "Sede de Brigada",
  resumo: "Capital de Rondônia, à beira do Rio Madeira. Sede da 17ª Brigada de Infantaria de Selva, com ligação por asfalto ao Centro-Oeste.",
  lede: "Capital de Rondônia e sede da Brigada Príncipe da Beira. Diferente de Manaus e Boa Vista, tem ligação rodoviária asfaltada com o resto do país pela BR-364, o que facilita mudança e viagens de carro.",
  fatos: [
    {r:"População", v:"518 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Até Cuiabá", v:"~1.450 km", s:"BR-364 asfaltada"},
    {r:"Clima", v:"22–34 °C", s:"chuvas de novembro a abril"},
    {r:"Cesta básica", v:"R$ 665", s:"DIEESE, ago/2026"},
    {r:"Grande Comando", v:"CMA", s:"17ª Bda Inf Sl"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<p>Porto Velho é sede da <b>17ª Brigada de Infantaria de Selva</b>, responsável pela fronteira de Rondônia com a Bolívia.</p>
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo 17ª Bda Inf Sl e Cia Cmdo</td><td>Comando da Brigada</td></tr>
<tr><td class="k">5º BEC</td><td>Engenharia de construção</td></tr>
<tr><td class="k">17º B Log Sl</td><td>Apoio logístico</td></tr>
<tr><td class="k">17ª Cia Inf Sl</td><td>Infantaria de selva</td></tr>
<tr><td class="k">17º Pel Com Sl e 17º Pel PE</td><td>Comunicações e Polícia do Exército</td></tr>
<tr><td class="k">H Gu Porto Velho</td><td>Hospital de Guarnição (ver Saúde)</td></tr>
</tbody></table></div>
<p>O Comando de Fronteira Rondônia / 6º BIS fica em Guajará-Mirim, e o 1º PEF em Príncipe da Beira.</p>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<h3>De carro</h3>
<p>A BR-364 é asfaltada e liga Porto Velho a Cuiabá (cerca de 1.450 km) e a Rio Branco (cerca de 510 km). É a guarnição da Amazônia Ocidental mais fácil de alcançar dirigindo a partir do Centro-Sul.</p>
<p>A BR-319, para Manaus, tem um trecho central sem asfalto que fica intransitável nas chuvas. Para Manaus, use avião ou balsa pelo Rio Madeira.</p>
<h3>De avião</h3>
<p>O aeroporto da cidade tem voos para Brasília e outras capitais, com conexões para o resto do país.</p>
<div class="note"><b>Atenção:</b> na BR-364, respeite as condições da pista e o fluxo de carretas. Planeje paradas e evite dirigir à noite.</div>
<div class="src">Fontes: <a href="https://www.poder360.com.br/poder-infra/rodovia-da-lama-na-amazonia-espera-asfalto-ha-mais-de-meio-seculo/">Poder360</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>A cesta básica custou <b class="num">R$ 664,79</b> em agosto de 2026, segundo o DIEESE, praticamente o mesmo valor de Manaus.</p>
<p>Porto Velho não entra nos índices nacionais de aluguel, como o FipeZAP. Para ter referência, consulte anúncios recentes e converse com militares da guarnição antes de fechar contrato.</p>
<div class="note"><b>Dado pendente:</b> esta seção ainda não tem um valor de aluguel confiável. Se você serve em Porto Velho, sua informação ajuda a completar a ficha.</div>
<div class="src">Fontes: <a href="https://www.dieese.org.br/analisecestabasica/2026/202608cestabasica.pdf">DIEESE</a> · <a href="https://www.datazap.com.br/wp-content/uploads/2026/03/fipezap-202602-residencial-locacao.pdf">FipeZAP</a> · conferido em out/2026</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>A guarnição conta com o <b>Hospital de Guarnição de Porto Velho</b>, que atende os beneficiários do FuSEx. Exames e especialidades não oferecidos no hospital são feitos na rede civil conveniada, mediante guia. Casos mais complexos podem ser encaminhados ao Hospital Militar de Área de Manaus.</p>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>Porto Velho não tem Colégio Militar do Sistema Colégio Militar do Brasil. A cidade tem rede particular, escolas estaduais e a Universidade Federal de Rondônia (UNIR), além do Instituto Federal de Rondônia (IFRO).</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Quente e úmido, com chuvas concentradas de novembro a abril. De junho a setembro é a época seca, com dias muito quentes e baixa umidade.</p>
<div class="climate" aria-label="Estações por mês">
  <div class="wet">J</div><div class="wet">F</div><div class="wet">M</div><div class="wet">A</div><div class="dry">M</div><div class="dry">J</div><div class="dry">J</div><div class="dry">A</div><div class="dry">S</div><div class="dry">O</div><div class="wet">N</div><div class="wet">D</div>
</div>
<div class="legend"><span><i style="background:var(--accent)"></i>Chuvoso (nov–abr)</span><span><i style="background:var(--mark-soft); border:1px solid var(--line)"></i>Seco (mai–out)</span></div>
<div class="note"><b>Na prática:</b> agosto e setembro costumam trazer fumaça das queimadas. Quem tem crianças pequenas ou problemas respiratórios deve se preparar.</div>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>A cidade nasceu com a construção da Estrada de Ferro Madeira-Mamoré e tem forte presença de migrantes de todo o país, sobretudo do Sul e do Nordeste.</p>
<div class="places">
  <div class="place"><span class="km">Centro</span><b>Complexo da Madeira-Mamoré</b><p>Estação, galpões e locomotivas históricas à beira do Rio Madeira, com pôr do sol concorrido.</p></div>
  <div class="place"><span class="km">Junho</span><b>Arraial Flor do Maracujá</b><p>A maior festa junina da cidade, com quadrilhas e bois-bumbás.</p></div>
  <div class="place"><span class="km">~510 km</span><b>Rio Branco</b><p>Viagem de carro pela BR-364 até a capital do Acre.</p></div>
</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Se for de carro pela BR-364, planeje paradas e dirija só de dia.</li>
<li>Procure a seção responsável pelos PNR para saber a situação da fila.</li>
<li>Atualize o cadastro no FuSEx e leve laudos e receitas.</li>
<li>Ajuste relógios: Rondônia está uma hora atrás de Brasília.</li>
</ul>`
  }
  ]
},
{
  id: "rio-branco",
  cidade: "Rio Branco",
  uf: "AC",
  estado: "Acre",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "09°58′S 67°48′W · alt. 153 m · UTC−5",
  conferido: "out/2026",
  tags: ["Cmdo Fron AC", "4º BIS", "7º BEC", "Fronteira"],
  destaque: "Fronteira",
  resumo: "Capital do Acre, às margens do Rio Acre. Sede do Comando de Fronteira Acre / 4º BIS e do 7º BEC, com saída por estrada para o Peru.",
  lede: "Capital do Acre e a guarnição mais a oeste deste guia. A cidade é tranquila e mais barata que Manaus, está duas horas atrás de Brasília e tem ligação por asfalto com Porto Velho e com o Pacífico, pelo Peru.",
  fatos: [
    {r:"População", v:"389 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−2 h", s:"em relação a Brasília"},
    {r:"Até Porto Velho", v:"~510 km", s:"BR-364"},
    {r:"Aluguel 3 quartos", v:"R$ 1,2–2 mil", s:"referência de mercado"},
    {r:"Cesta básica", v:"R$ 660", s:"DIEESE, ago/2026"},
    {r:"Grande Comando", v:"CMA", s:"Cmdo Fron Acre"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo Fron Acre / 4º BIS</td><td>Responde pela fronteira do Acre com o Peru e a Bolívia, com pelotões em Assis Brasil, Plácido de Castro e Santa Rosa do Purus e uma companhia em Epitaciolândia</td></tr>
<tr><td class="k">7º BEC</td><td>Engenharia de construção</td></tr>
</tbody></table></div>
<p>O Comando de Fronteira Juruá / 61º BIS fica em Cruzeiro do Sul, no oeste do estado.</p>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<h3>De carro</h3>
<p>A BR-364 liga Rio Branco a Porto Velho (cerca de 510 km) e, de lá, ao Centro-Oeste. Pela BR-317 e pela Estrada do Pacífico, a cidade tem saída para o Peru, via Assis Brasil.</p>
<h3>De avião</h3>
<p>O aeroporto tem voos para Brasília e outras capitais, com conexões.</p>
<div class="note"><b>Fuso:</b> o Acre está duas horas atrás de Brasília. Confira os horários de voos e de reuniões com outras guarnições.</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>Um apartamento de 3 quartos custa de <b class="num">R$ 1.200</b>, nas áreas mais acessíveis, a cerca de <b class="num">R$ 2.025</b>, nas mais valorizadas. Uma quitinete fica entre R$ 667 e R$ 800. A mesma fonte estima que a cidade é cerca de 18% mais barata que Manaus.</p>
<p>A cesta básica custou <b class="num">R$ 659,66</b> em agosto de 2026, segundo o DIEESE. Mensalidade média em escola particular: cerca de R$ 1.030 no ensino fundamental e R$ 1.330 no médio.</p>
<div class="note"><b>Valor indicativo:</b> os preços de aluguel vêm de levantamento atualizado em janeiro de 2026. Confira em imobiliárias antes de fechar.</div>
<div class="src">Fontes: <a href="https://seucreditodigital.com.br/custo-de-vida-em-rio-branco-quanto-custa/">Seu Crédito Digital</a> · <a href="https://www.dieese.org.br/analisecestabasica/2026/202608cestabasica.pdf">DIEESE</a> · conferido em out/2026</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>O atendimento aos beneficiários do FuSEx é feito pela estrutura de saúde da guarnição e pela rede civil conveniada. Casos de maior complexidade costumam ser encaminhados a Porto Velho ou Manaus, que têm hospitais militares.</p>
<div class="note"><b>Dado pendente:</b> confirme ao chegar qual é a estrutura de saúde militar da guarnição e a lista de conveniados.</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>Rio Branco não tem Colégio Militar do Sistema Colégio Militar do Brasil. A cidade tem rede particular, escolas estaduais, a Universidade Federal do Acre (UFAC) e o Instituto Federal do Acre (IFAC).</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Quente e úmido, com chuvas de novembro a abril e seca de junho a setembro. No inverno do Sul, frentes frias podem chegar ao Acre e derrubar a temperatura por alguns dias, a chamada friagem.</p>
<div class="climate" aria-label="Estações por mês">
  <div class="wet">J</div><div class="wet">F</div><div class="wet">M</div><div class="wet">A</div><div class="dry">M</div><div class="dry">J</div><div class="dry">J</div><div class="dry">A</div><div class="dry">S</div><div class="dry">O</div><div class="wet">N</div><div class="wet">D</div>
</div>
<div class="legend"><span><i style="background:var(--accent)"></i>Chuvoso (nov–abr)</span><span><i style="background:var(--mark-soft); border:1px solid var(--line)"></i>Seco (mai–out)</span></div>
<div class="note"><b>Cheias do Rio Acre:</b> nos anos de cheia forte, bairros perto do rio ficam alagados. Ao escolher onde morar, pergunte se o imóvel já foi atingido.</div>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>Terra de Chico Mendes e dos seringueiros, com culinária própria. A cidade é pequena para uma capital e tem vida concentrada no centro histórico, à beira do rio.</p>
<div class="places">
  <div class="place"><span class="km">Centro</span><b>Gameleira e Passarela</b><p>Calçadão histórico à beira do Rio Acre, ponto de encontro da cidade.</p></div>
  <div class="place"><span class="km">Cidade</span><b>Parque Chico Mendes</b><p>Área verde com trilhas e memória dos seringais.</p></div>
  <div class="place"><span class="km">via Assis Brasil</span><b>Peru</b><p>Pela Estrada do Pacífico é possível seguir de carro até o sul do Peru.</p></div>
</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Ajuste relógios: duas horas a menos que Brasília.</li>
<li>Evite imóveis em áreas de cheia do Rio Acre.</li>
<li>Procure a seção responsável pelos PNR para saber a situação da fila.</li>
<li>Para viajar ao Peru ou à Bolívia, veja com a OM as regras para militares deixarem o território nacional.</li>
</ul>`
  }
  ]
},
{
  id: "tefe",
  cidade: "Tefé",
  uf: "AM",
  estado: "Amazonas",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "03°21′S 64°43′W · Médio Solimões · UTC−4",
  conferido: "out/2026",
  tags: ["16ª Bda Inf Sl", "17º BIS", "16º B Log Sl", "Sem estrada"],
  destaque: "Sem acesso rodoviário",
  resumo: "Cidade do Médio Solimões, às margens do Lago de Tefé. Sede da 16ª Brigada de Infantaria de Selva. Chega-se só de avião ou de barco.",
  lede: "Sede da Brigada das Missões, no coração da Amazônia. Não há estrada até Tefé: pessoas e mercadorias chegam de avião ou pelo Solimões. A vida é de cidade pequena do interior amazônico, com a Reserva Mamirauá ao lado.",
  fatos: [
    {r:"População", v:"80 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Manaus de avião", v:"~1 h", s:"voos da Azul"},
    {r:"De lancha", v:"12–15 h", s:"a partir de Manaus"},
    {r:"Estrada", v:"Nenhuma", s:"só rio e avião"},
    {r:"Grande Comando", v:"CMA", s:"16ª Bda Inf Sl"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo 16ª Bda Inf Sl e Cia Cmdo</td><td>Comando da Brigada</td></tr>
<tr><td class="k">Cmdo Fron Japurá / 17º BIS</td><td>Responde pela fronteira com a Colômbia na região do Japurá, com pelotão em Vila Bittencourt</td></tr>
<tr><td class="k">16º B Log Sl</td><td>Apoio logístico</td></tr>
<tr><td class="k">16º Pel Com Sl e 34º Pel PE</td><td>Comunicações e Polícia do Exército</td></tr>
</tbody></table></div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<p>Não existe estrada até Tefé. As opções a partir de Manaus são:</p>
<div class="tbl-wrap"><table>
<thead><tr><th>Meio</th><th>Tempo</th><th>Referência de preço</th></tr></thead>
<tbody>
<tr><td class="k">Avião (Azul)</td><td>1 a 1h30</td><td>Varia com a antecedência</td></tr>
<tr><td class="k">Lancha rápida</td><td>12 a 15 h</td><td>R$ 230 a R$ 300</td></tr>
<tr><td class="k">Barco regional</td><td>2 a 3 dias</td><td>Cerca de R$ 150, em rede</td></tr>
</tbody></table></div>
<p>Na cidade, o transporte do dia a dia é o mototáxi.</p>
<div class="note"><b>Mudança:</b> carro e móveis vão de balsa a partir de Manaus. Avalie se vale levar o carro para uma cidade pequena, onde moto é o veículo mais comum.</div>
<div class="src">Fontes: <a href="https://kwx.liehendr.com/content/wikivoyage_en_all_maxi_2025-02/A/Tef%C3%A9">Wikivoyage</a> · <a href="https://www.momondo.com.br/passagem/tefe">Momondo</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>Quase tudo chega a Tefé de barco, o que encarece produtos industrializados e pode causar falta de itens, principalmente na vazante dos rios. Peixe, farinha e frutas regionais costumam ser baratos.</p>
<div class="note"><b>Dado pendente:</b> não há índice público de preços ou aluguel para Tefé. Se você serve na guarnição, sua informação ajuda a completar a ficha.</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>O atendimento aos beneficiários do FuSEx é feito pela estrutura de saúde da guarnição e pela rede local, que é limitada. Casos de maior complexidade são encaminhados a Manaus, onde fica o Hospital Militar de Área.</p>
<div class="note"><b>Ao chegar:</b> confirme a estrutura de saúde da guarnição e como funciona a evacuação para Manaus. Quem tem tratamento contínuo deve planejar consultas na capital.</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem escolas públicas e particulares e unidades de ensino superior, como a Universidade do Estado do Amazonas (UEA). O Colégio Militar mais próximo é o de Manaus.</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Equatorial, quente e úmido o ano inteiro, com chuva frequente. O que mais muda a vida local é o nível do Solimões: na cheia, o rio ocupa as várzeas; na vazante, a navegação fica difícil e o abastecimento atrasa.</p>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>O lazer gira em torno do rio e do lago: praias na vazante, pesca e passeios de barco.</p>
<div class="places">
  <div class="place"><span class="km">a partir de Tefé</span><b>Reserva Mamirauá</b><p>Reserva de várzea famosa pela fauna, com pousada flutuante e turismo de base comunitária.</p></div>
  <div class="place"><span class="km">Cidade</span><b>Lago de Tefé</b><p>Orla e praias que aparecem na vazante.</p></div>
</div>
<div class="src">Fontes: <a href="https://kwx.liehendr.com/content/wikivoyage_en_all_maxi_2025-02/A/Tef%C3%A9">Wikivoyage</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Planeje a mudança de balsa com antecedência a partir de Manaus.</li>
<li>Faça um estoque inicial de itens que você usa sempre e que podem faltar.</li>
<li>Procure a seção responsável pelos PNR: em cidade pequena, a oferta de imóveis é limitada.</li>
<li>Pergunte sobre a qualidade da internet antes de contratar.</li>
</ul>`
  }
  ]
},
{
  id: "sao-gabriel-da-cachoeira",
  cidade: "São Gabriel da Cachoeira",
  uf: "AM",
  estado: "Amazonas",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "00°08′S 67°05′W · Alto Rio Negro · UTC−4",
  conferido: "out/2026",
  tags: ["2ª Bda Inf Sl", "5º BIS", "H Gu SGC", "Sem estrada", "Fronteira"],
  destaque: "Sem acesso rodoviário",
  resumo: "No Alto Rio Negro, perto da Colômbia e da Venezuela. Sede da 2ª Brigada de Infantaria de Selva, numa das cidades mais indígenas do Brasil.",
  lede: "Sede da Brigada Ararigboia, no extremo noroeste do Amazonas. É o terceiro maior município do país em área, com cerca de três quartos da população indígena e quatro línguas oficiais. Chega-se de avião ou por uma longa viagem de barco.",
  fatos: [
    {r:"População", v:"57 mil", s:"município, IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Até Manaus", v:"~850 km", s:"pelo Rio Negro"},
    {r:"Chuva", v:"~3.000 mm", s:"por ano, uma das maiores do país"},
    {r:"Línguas oficiais", v:"4", s:"português e três indígenas"},
    {r:"Grande Comando", v:"CMA", s:"2ª Bda Inf Sl"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<p>A <b>2ª Brigada de Infantaria de Selva</b> responde por cerca de 1.700 km de fronteira com a Colômbia e a Venezuela.</p>
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo 2ª Bda Inf Sl e Cia Cmdo</td><td>Comando da Brigada</td></tr>
<tr><td class="k">Cmdo Fron Rio Negro / 5º BIS</td><td>Batalhão Forte São Gabriel. Enquadra sete PEF: Iauaretê, Querari, São Joaquim, Cucuí, Maturacá, Pari-Cachoeira e Tunuí</td></tr>
<tr><td class="k">2º B Log Sl</td><td>Apoio logístico</td></tr>
<tr><td class="k">22º Pel Com Sl e 22º Pel PE</td><td>Comunicações e Polícia do Exército</td></tr>
<tr><td class="k">21ª Cia E Cnst</td><td>Engenharia de construção, não subordinada à Brigada</td></tr>
<tr><td class="k">H Gu São Gabriel da Cachoeira</td><td>Hospital de Guarnição, não subordinado à Brigada</td></tr>
</tbody></table></div>
<p>O 3º BIS fica em Barcelos, a cerca de 450 km rio abaixo.</p>
<div class="src">Fontes: <a href="https://bdex.eb.mil.br/jspui/bitstream/123456789/12602/1/TCC%20Cap%20Vieira.pdf">BDEx (TCC, 2022)</a> · <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<p>Não há estrada ligando a cidade a Manaus. A Azul opera voos regulares entre Manaus e São Gabriel da Cachoeira. Por rio, são cerca de 850 km subindo o Rio Negro.</p>
<p>O abastecimento das OM é feito principalmente por barco, pelo Centro de Embarcações do CMA. A navegação acima da cidade é difícil, com cachoeiras e pedrais, e piora na vazante.</p>
<div class="note"><b>Mudança:</b> carga e veículos sobem o Rio Negro de balsa e a viagem leva dias. Combine com a OM o transporte da bagagem e confirme os prazos.</div>
<div class="src">Fontes: <a href="https://passagens.voeazul.com.br/pt/voos-de-s%C3%A3o-gabriel-da-cachoeira-para-manaus">Azul</a> · <a href="https://bdex.eb.mil.br/jspui/bitstream/123456789/12602/1/TCC%20Cap%20Vieira.pdf">BDEx</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>Como quase tudo chega de barco ou de avião, produtos industrializados custam mais que em Manaus e alguns itens faltam por períodos. Os solos são pouco férteis e os rios têm pouco peixe, então a produção local de alimentos é limitada.</p>
<div class="note"><b>Dado pendente:</b> não há índice público de preços ou aluguel para a cidade. Se você serve na guarnição, sua informação ajuda a completar a ficha.</div>
<div class="src">Fontes: <a href="https://bdex.eb.mil.br/jspui/bitstream/123456789/12602/1/TCC%20Cap%20Vieira.pdf">BDEx</a> · conferido em out/2026</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>A guarnição tem o <b>Hospital de Guarnição de São Gabriel da Cachoeira</b>, que é também referência para a população da região. Casos de maior complexidade são encaminhados a Manaus.</p>
<div class="note"><b>Ao chegar:</b> leve laudos e receitas e confirme como funciona a evacuação para Manaus. Remédios de uso contínuo podem demorar a chegar às farmácias locais.</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem escolas públicas e particulares e unidades de ensino superior e técnico, como o Instituto Federal do Amazonas (IFAM). O Colégio Militar mais próximo é o de Manaus.</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Muito úmido e chuvoso o ano todo, com cerca de 3.000 mm de chuva anual e umidade média perto de 87%. As máximas ficam em torno de 32 °C. O Rio Negro enche de maio a agosto e baixa de dezembro a fevereiro.</p>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/S%C3%A3o_Gabriel_da_Cachoeira">Wikipédia</a> · <a href="https://bdex.eb.mil.br/jspui/bitstream/123456789/12602/1/TCC%20Cap%20Vieira.pdf">BDEx</a> · conferido em out/2026</div>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>É uma das cidades mais indígenas do Brasil, com 23 etnias. Além do português, o nheengatu, o baniwa e o tukano (yepá-masã) são línguas oficiais do município. Respeito às comunidades e às regras de acesso às terras indígenas faz parte do dia a dia.</p>
<div class="places">
  <div class="place"><span class="km">Cidade</span><b>Praias do Rio Negro</b><p>Praias de areia branca entre as pedras, que aparecem na vazante.</p></div>
  <div class="place"><span class="km">Município</span><b>Parque Nacional do Pico da Neblina</b><p>Parte do parque fica no município. A visita exige autorização e acompanhamento.</p></div>
</div>
<div class="note"><b>Cuidado com os rios:</b> o Rio Negro tem corredeiras e pedras perto da cidade. Só nade em locais conhecidos.</div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/S%C3%A3o_Gabriel_da_Cachoeira">Wikipédia</a> · <a href="https://bdex.eb.mil.br/jspui/bitstream/123456789/12602/1/TCC%20Cap%20Vieira.pdf">BDEx</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Combine com a OM o transporte da bagagem pelo Rio Negro e os prazos.</li>
<li>Leve um estoque de remédios de uso contínuo e itens que podem faltar.</li>
<li>Procure a seção responsável pelos PNR: a oferta de imóveis na cidade é pequena.</li>
<li>Pergunte sobre a qualidade da internet e da telefonia antes de contratar.</li>
<li>Informe-se sobre as regras de acesso a terras indígenas antes de passeios fora da cidade.</li>
</ul>`
  }
  ]
},
{
  id: "tabatinga",
  cidade: "Tabatinga",
  uf: "AM",
  estado: "Amazonas",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "04°15′S 69°56′W · Alto Solimões · UTC−4",
  conferido: "out/2026",
  tags: ["Cmdo Fron Solimões", "8º BIS", "H Gu Tabatinga", "Tríplice fronteira", "Sem estrada"],
  destaque: "Tríplice fronteira",
  resumo: "Na tríplice fronteira com a Colômbia e o Peru, colada a Letícia. Sede do Comando de Fronteira Solimões / 8º BIS e de um Hospital de Guarnição.",
  lede: "Guarnição no extremo oeste do Amazonas, a mais de 1.100 km de Manaus e sem ligação por estrada. Tabatinga e a colombiana Letícia formam praticamente uma só cidade, separadas por uma avenida sem posto de fronteira.",
  fatos: [
    {r:"População", v:"73 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Até Manaus", v:"~1.100 km", s:"só avião ou rio"},
    {r:"Fronteira", v:"2 países", s:"Colômbia e Peru"},
    {r:"Saúde militar", v:"H Gu", s:"Hospital de Guarnição"},
    {r:"Grande Comando", v:"CMA", s:"Cmdo Fron Solimões"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo Fron Solimões / 8º BIS</td><td>Responde pela fronteira do Alto Solimões, com pelotões em Palmeiras do Javari, Ipiranga e Estirão do Equador</td></tr>
<tr><td class="k">H Gu Tabatinga</td><td>Hospital de Guarnição (ver Saúde)</td></tr>
</tbody></table></div>
<p>A cidade também tem uma base da Força Aérea, e a presença federal (Exército, FAB, Polícia Federal) é uma das principais fontes de renda local.</p>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · <a href="https://smargiassi.com.br/am/tabatinga/">Smargiassi</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<p>Não há estrada até Tabatinga. A forma mais prática é o avião, com voos da Azul a partir de Manaus. Pelo Solimões, há lanchas rápidas e barcos regionais; subindo o rio a partir de Manaus, a viagem de barco leva vários dias.</p>
<p>Do lado colombiano, o aeroporto de Letícia tem voos para Bogotá.</p>
<div class="note"><b>Mudança:</b> bagagem e veículo sobem o Solimões de balsa e a viagem é longa. Combine com a OM os prazos e avalie se vale levar o carro.</div>
<div class="src">Fontes: <a href="https://smargiassi.com.br/am/tabatinga/">Smargiassi</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>A economia gira em torno do comércio de fronteira com Letícia e Santa Rosa, do emprego público e da presença militar. Muitos produtos podem ser comprados do lado colombiano, e o peso colombiano circula no comércio local.</p>
<div class="note"><b>Dado pendente:</b> não há índice público de preços ou aluguel para Tabatinga. Se você serve na guarnição, sua informação ajuda a completar a ficha.</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>A guarnição tem o <b>Hospital de Guarnição de Tabatinga</b>, que absorve boa parte dos casos complexos da região. A cidade tem ainda um hospital regional estadual, que recebeu investimento para ampliação em 2026, e uma UPA. Casos que exigem estrutura maior são encaminhados a Manaus.</p>
<div class="src">Fontes: <a href="https://smargiassi.com.br/am/tabatinga/">Smargiassi</a> · conferido em out/2026</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem o Centro de Estudos Superiores da UEA e um campus do IFAM, com cursos técnicos e de formação de professores, inclusive em educação indígena bilíngue (português e ticuna). O Colégio Militar mais próximo é o de Manaus.</p>
<div class="src">Fontes: <a href="https://smargiassi.com.br/am/tabatinga/">Smargiassi</a> · conferido em out/2026</div>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Equatorial, quente e muito úmido o ano todo, com chuva frequente. O nível do Solimões define o ritmo da região: a vazante dificulta a navegação e pode atrasar o abastecimento.</p>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>A vida na tríplice fronteira mistura português, espanhol e línguas indígenas, com forte presença do povo ticuna. Atravessar para Letícia é rotina para compras, restaurantes e passeios.</p>
<div class="places">
  <div class="place"><span class="km">Avenida da Amizade</span><b>Letícia (Colômbia)</b><p>Do outro lado da avenida, com comércio, restaurantes e o aeroporto com voos para Bogotá.</p></div>
  <div class="place"><span class="km">de barco</span><b>Santa Rosa (Peru)</b><p>Na ilha em frente, acessível por barco.</p></div>
</div>
<div class="note"><b>Segurança:</b> Tabatinga fica numa rota de entrada de cocaína pelo Solimões e registrou taxas de mortes violentas muito acima da média nacional entre 2022 e 2024. Siga as orientações da OM sobre áreas e horários a evitar, dos dois lados da fronteira.</div>
<div class="src">Fontes: <a href="https://smargiassi.com.br/am/tabatinga/">Smargiassi</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Combine com a OM o transporte da bagagem pelo Solimões e os prazos.</li>
<li>Veja com a OM as regras para militares atravessarem para a Colômbia e o Peru, mesmo em passeios curtos.</li>
<li>Procure a seção responsável pelos PNR: a oferta de imóveis é limitada.</li>
<li>Leve laudos e receitas e confirme como funciona a evacuação para Manaus.</li>
</ul>`
  }
  ]
},
{
  id: "barcelos",
  cidade: "Barcelos",
  uf: "AM",
  estado: "Amazonas",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "00°58′S 62°55′W · Médio Rio Negro · UTC−4",
  conferido: "out/2026",
  tags: ["3º BIS", "2ª Bda Inf Sl", "Rio Negro", "Sem estrada"],
  destaque: "Sem acesso rodoviário",
  resumo: "Primeira capital do Amazonas, no Médio Rio Negro. Sede do 3º BIS. Cidade pequena, conhecida pelos peixes ornamentais e pela pesca do tucunaré.",
  lede: "Guarnição pequena no Rio Negro, entre Manaus e São Gabriel da Cachoeira. Barcelos foi a primeira capital da antiga Capitania de São José do Rio Negro e hoje é o segundo maior município do Brasil em área.",
  fatos: [
    {r:"População", v:"18 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Até Manaus", v:"~400 km", s:"pelo Rio Negro"},
    {r:"Estrada", v:"Nenhuma", s:"só rio e avião"},
    {r:"Ilhas", v:"~700", s:"Arquipélago de Mariuá"},
    {r:"Grande Comando", v:"CMA", s:"2ª Bda Inf Sl"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">3º BIS</td><td>Batalhão de infantaria de selva, na área da 2ª Bda Inf Sl, sediada em São Gabriel da Cachoeira</td></tr>
</tbody></table></div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · <a href="https://bdex.eb.mil.br/jspui/bitstream/123456789/12602/1/TCC%20Cap%20Vieira.pdf">BDEx</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<p>Não há estrada até Barcelos. O acesso é pelo Rio Negro, a cerca de 400 km de Manaus, ou por voos regionais e táxi aéreo, conforme a oferta do momento. São Gabriel da Cachoeira fica cerca de 450 km rio acima.</p>
<div class="note"><b>Confirme antes:</b> a oferta de voos para cidades pequenas do Amazonas muda com frequência. Verifique com a OM qual é o meio mais usado pelos militares e suas famílias.</div>
<div class="src">Fontes: <a href="https://portalamazonia.com/amazonas/saiba-qual-cidade-foi-a-primeira-capital-do-amazonas/">Portal Amazônia</a> · <a href="https://bdex.eb.mil.br/jspui/bitstream/123456789/12602/1/TCC%20Cap%20Vieira.pdf">BDEx</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>Produtos industrializados chegam de barco e custam mais que em Manaus. A economia local se apoia na pesca, nos peixes ornamentais, no turismo de pesca esportiva e no emprego público.</p>
<div class="note"><b>Dado pendente:</b> não há índice público de preços ou aluguel para Barcelos. Se você serve no 3º BIS, sua informação ajuda a completar a ficha.</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>A estrutura de saúde da cidade é limitada. Casos que precisam de atendimento especializado são encaminhados a Manaus, onde fica o Hospital Militar de Área.</p>
<div class="note"><b>Dado pendente:</b> confirme ao chegar como funciona o atendimento de saúde na OM e a evacuação para Manaus.</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem escolas públicas de ensino fundamental e médio. Para ensino superior presencial e Colégio Militar, a referência é Manaus.</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Equatorial, quente e úmido o ano todo. Na seca do Rio Negro aparecem praias de areia branca e começa a melhor época para a pesca esportiva.</p>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>Barcelos é conhecida como a terra dos peixes ornamentais, exportados para outros estados e para fora do país. O Festival do Peixe Ornamental, criado em 1994, é a principal festa da cidade.</p>
<div class="places">
  <div class="place"><span class="km">Rio Negro</span><b>Arquipélago de Mariuá</b><p>Cerca de 700 ilhas, apontado como o maior arquipélago fluvial do mundo.</p></div>
  <div class="place"><span class="km">na seca</span><b>Pesca do tucunaré</b><p>Destino conhecido de pesca esportiva, com soltura do peixe.</p></div>
</div>
<div class="src">Fontes: <a href="https://portalamazonia.com/amazonas/saiba-qual-cidade-foi-a-primeira-capital-do-amazonas/">Portal Amazônia</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Combine com a OM o transporte da bagagem pelo Rio Negro.</li>
<li>Leve estoque de remédios de uso contínuo e itens que podem faltar.</li>
<li>Pergunte sobre PNR, internet e telefonia antes da mudança.</li>
</ul>`
  }
  ]
},
{
  id: "humaita",
  cidade: "Humaitá",
  uf: "AM",
  estado: "Amazonas",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "07°30′S 63°01′W · Rio Madeira · UTC−4",
  conferido: "out/2026",
  tags: ["54º BIS", "Rio Madeira", "BR-319", "Transamazônica"],
  destaque: "Acesso por estrada",
  resumo: "No sul do Amazonas, à beira do Rio Madeira. Sede do 54º BIS, no cruzamento da BR-319 com a Transamazônica e perto de Porto Velho.",
  lede: "Cidade do sul do Amazonas, mais ligada a Porto Velho do que a Manaus. Fica no encontro da BR-319 com a BR-230, a Transamazônica, o que dá acesso por estrada à capital de Rondônia.",
  fatos: [
    {r:"População", v:"63 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Até Porto Velho", v:"~200 km", s:"BR-319, trecho sul"},
    {r:"Rodovias", v:"2", s:"BR-319 e BR-230"},
    {r:"Rio", v:"Madeira", s:"ligação fluvial com Manaus"},
    {r:"Grande Comando", v:"CMA", s:"54º BIS"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">54º BIS</td><td>Batalhão de infantaria de selva no sul do Amazonas</td></tr>
</tbody></table></div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · <a href="https://www.folhabv.com.br/?p=77685">Folha BV</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<p>O trecho sul da BR-319 liga Humaitá a Porto Velho, a cerca de 200 km, e é por lá que chega a maior parte das pessoas e mercadorias. A Transamazônica (BR-230) também passa pela cidade, mas tem longos trechos de terra.</p>
<p>Para Manaus, a BR-319 tem um trecho central sem asfalto que fica intransitável nas chuvas. A alternativa é o Rio Madeira ou o avião, com conexão em Porto Velho ou Manaus.</p>
<div class="note"><b>Na prática:</b> para voos, compras maiores e atendimento especializado, a referência costuma ser Porto Velho.</div>
<div class="src">Fontes: <a href="https://www.poder360.com.br/poder-infra/rodovia-da-lama-na-amazonia-espera-asfalto-ha-mais-de-meio-seculo/">Poder360</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>Com acesso por estrada a Porto Velho, o abastecimento é mais regular que nas guarnições só acessíveis por rio. A região tem crescido com a expansão da agropecuária no sul do Amazonas.</p>
<div class="note"><b>Dado pendente:</b> não há índice público de preços ou aluguel para Humaitá. Se você serve no 54º BIS, sua informação ajuda a completar a ficha.</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>A cidade tem atendimento básico e hospitalar de pequeno porte. Casos especializados costumam ser encaminhados a Porto Velho, que tem Hospital de Guarnição, ou a Manaus.</p>
<div class="note"><b>Dado pendente:</b> confirme ao chegar como funciona o atendimento de saúde na OM e os encaminhamentos pelo FuSEx.</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem um campus da Universidade Federal do Amazonas (UFAM), além de escolas públicas e particulares. Não há Colégio Militar na cidade; o mais próximo é o de Manaus.</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Quente e úmido, com chuvas concentradas de novembro a abril e período mais seco no meio do ano, quando as queimadas da região podem trazer fumaça.</p>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>O lazer gira em torno do Rio Madeira, com praias na seca e pesca. Porto Velho, a cerca de duas horas e meia de carro, é o destino para programas de cidade grande.</p>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Se for de carro, o caminho é por Porto Velho e o trecho sul da BR-319.</li>
<li>Não planeje a mudança pela BR-319 a partir de Manaus.</li>
<li>Pergunte sobre PNR e oferta de imóveis antes de chegar.</li>
</ul>`
  }
  ]
},
{
  id: "guajara-mirim",
  cidade: "Guajará-Mirim",
  uf: "RO",
  estado: "Rondônia",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "10°47′S 65°20′W · Rio Mamoré · UTC−4",
  conferido: "out/2026",
  tags: ["Cmdo Fron RO", "6º BIS", "Fronteira", "Bolívia", "Livre comércio"],
  destaque: "Fronteira",
  resumo: "Na fronteira com a Bolívia, de frente para Guayaramerín, do outro lado do Rio Mamoré. Sede do Comando de Fronteira Rondônia / 6º BIS.",
  lede: "A Pérola do Mamoré, ponto final da antiga Estrada de Ferro Madeira-Mamoré. A cidade é área de livre comércio e vive em contato direto com a boliviana Guayaramerín, a uma travessia de barco.",
  fatos: [
    {r:"População", v:"44 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−1 h", s:"em relação a Brasília"},
    {r:"Até Porto Velho", v:"~330 km", s:"BR-425 e BR-364"},
    {r:"Fronteira", v:"Bolívia", s:"Guayaramerín, em frente"},
    {r:"Comércio", v:"ALC", s:"Área de Livre Comércio"},
    {r:"Grande Comando", v:"CMA", s:"17ª Bda Inf Sl"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo Fron RO / 6º BIS</td><td>Responde pela fronteira de Rondônia com a Bolívia, com o 1º PEF em Príncipe da Beira. Enquadrado pela 17ª Bda Inf Sl, de Porto Velho</td></tr>
</tbody></table></div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<p>Por estrada, Guajará-Mirim fica a cerca de 330 km de Porto Velho, pela BR-425 e pela BR-364, ambas asfaltadas. Para voos, o aeroporto de referência é o de Porto Velho.</p>
<p>A travessia para Guayaramerín, na Bolívia, é feita de barco pelo Rio Mamoré.</p>
<div class="src">Fontes: <a href="https://smargiassi.com.br/ro/guajara-mirim/">Smargiassi</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>Guajará-Mirim é Área de Livre Comércio, com benefícios fiscais para o comércio local, e muitos moradores fazem compras também em Guayaramerín.</p>
<div class="note"><b>Dado pendente:</b> não há índice público de preços ou aluguel para a cidade. Se você serve no 6º BIS, sua informação ajuda a completar a ficha.</div>
<div class="src">Fontes: <a href="https://smargiassi.com.br/ro/guajara-mirim/">Smargiassi</a> · <a href="https://planalto.gov.br/ccivil_03/LEIS/1989_1994/L8210.htm">Lei 8.210/1991</a> · conferido em out/2026</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>Casos especializados costumam ser encaminhados a Porto Velho, que tem Hospital de Guarnição.</p>
<div class="note"><b>Dado pendente:</b> confirme ao chegar a estrutura de saúde da OM e a rede conveniada ao FuSEx na cidade.</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem um campus da Universidade Federal de Rondônia (UNIR), além de escolas públicas e particulares. Não há Colégio Militar na cidade.</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Quente e úmido, com chuvas de novembro a abril e seca no meio do ano. Como em Porto Velho, agosto e setembro podem trazer fumaça das queimadas.</p>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<div class="places">
  <div class="place"><span class="km">Centro</span><b>Museu Histórico Municipal</b><p>Na antiga estação da Madeira-Mamoré, com locomotivas e vagões. O conjunto ferroviário é tombado pelo Iphan.</p></div>
  <div class="place"><span class="km">travessia de barco</span><b>Guayaramerín (Bolívia)</b><p>Comércio e culinária boliviana do outro lado do Mamoré.</p></div>
  <div class="place"><span class="km">Centro</span><b>Igreja Matriz</b><p>Igreja em estilo colonial no centro da cidade.</p></div>
</div>
<div class="src">Fontes: <a href="https://smargiassi.com.br/ro/guajara-mirim/">Smargiassi</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>A mudança pode ir de caminhão até a cidade, via Porto Velho.</li>
<li>Veja com a OM as regras para militares atravessarem para a Bolívia.</li>
<li>Pergunte sobre PNR e oferta de imóveis antes de chegar.</li>
</ul>`
  }
  ]
},
{
  id: "cruzeiro-do-sul",
  cidade: "Cruzeiro do Sul",
  uf: "AC",
  estado: "Acre",
  regiao: "Norte",
  comando: "CMA",
  comandoNome: "Comando Militar da Amazônia",
  coord: "07°38′S 72°40′W · Vale do Juruá · UTC−5",
  conferido: "out/2026",
  tags: ["Cmdo Fron Juruá", "61º BIS", "Fronteira", "Serra do Divisor"],
  destaque: "Fronteira",
  resumo: "Segunda maior cidade do Acre, no Vale do Juruá, perto do Peru. Sede do Comando de Fronteira Juruá / 61º BIS, ao lado da Serra do Divisor.",
  lede: "A guarnição mais a oeste do Brasil, no Vale do Juruá. A cidade é polo regional do oeste acreano, famosa pela farinha de mandioca, e porta de entrada do Parque Nacional da Serra do Divisor.",
  fatos: [
    {r:"População", v:"99 mil", s:"estimativa IBGE 2025"},
    {r:"Fuso", v:"−2 h", s:"em relação a Brasília"},
    {r:"Até Rio Branco", v:"~630 km", s:"BR-364"},
    {r:"Chuva", v:"~2.170 mm", s:"por ano"},
    {r:"Fronteira", v:"Peru", s:"limite sul do município"},
    {r:"Grande Comando", v:"CMA", s:"Cmdo Fron Juruá"}
  ],
  secoes: [
  {
    id:"om", titulo:"OM sediadas",
    html:`
<div class="tbl-wrap"><table>
<thead><tr><th>OM</th><th>Observação</th></tr></thead>
<tbody>
<tr><td class="k">Cmdo Fron Juruá / 61º BIS</td><td>Responde pela fronteira do Vale do Juruá com o Peru, com destacamento em Marechal Thaumaturgo</td></tr>
</tbody></table></div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Amazon_Military_Command">Wikipédia (CMA)</a> · conferido em out/2026</div>`
  },
  {
    id:"acesso", titulo:"Como chegar",
    html:`
<p>A cidade tem aeroporto internacional e fica a cerca de 630 km de Rio Branco pela BR-364, que cruza o Rio Juruá pela Ponte da União.</p>
<div class="note"><b>Atenção:</b> a BR-364 entre Rio Branco e Cruzeiro do Sul tem trechos que se deterioram no período chuvoso. Confirme as condições da estrada antes de viajar de carro.</div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Cruzeiro_do_Sul,_Acre">Wikipédia</a> · conferido em out/2026</div>`
  },
  {
    id:"custo", titulo:"Custo de vida e moradia",
    html:`
<p>Cruzeiro do Sul é o centro comercial do Vale do Juruá. Produtos que vêm de fora dependem da BR-364 e encarecem quando a estrada fica ruim.</p>
<div class="note"><b>Dado pendente:</b> não há índice público de preços ou aluguel para a cidade. Se você serve no 61º BIS, sua informação ajuda a completar a ficha.</div>`
  },
  {
    id:"saude", titulo:"Saúde",
    html:`
<p>A cidade é o polo de saúde do Vale do Juruá. Casos especializados costumam ser encaminhados a Rio Branco ou a Porto Velho, que tem Hospital de Guarnição.</p>
<div class="note"><b>Dado pendente:</b> confirme ao chegar a estrutura de saúde da OM e a rede conveniada ao FuSEx.</div>`
  },
  {
    id:"educacao", titulo:"Educação",
    html:`
<p>A cidade tem o Campus Floresta da Universidade Federal do Acre (UFAC), além de escolas públicas e particulares. Não há Colégio Militar no Acre.</p>`
  },
  {
    id:"clima", titulo:"Clima",
    html:`
<p>Quente e úmido, com média anual de 25,6 °C e cerca de 2.170 mm de chuva por ano. As chuvas vão de outubro a abril, e o período mais seco, de junho a setembro. A friagem pode derrubar a temperatura por alguns dias no inverno.</p>
<div class="climate" aria-label="Estações por mês">
  <div class="wet">J</div><div class="wet">F</div><div class="wet">M</div><div class="wet">A</div><div class="dry">M</div><div class="dry">J</div><div class="dry">J</div><div class="dry">A</div><div class="dry">S</div><div class="wet">O</div><div class="wet">N</div><div class="wet">D</div>
</div>
<div class="legend"><span><i style="background:var(--accent)"></i>Chuvoso (out–abr)</span><span><i style="background:var(--mark-soft); border:1px solid var(--line)"></i>Mais seco (mai–set)</span></div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Cruzeiro_do_Sul,_Acre">Wikipédia</a> · conferido em out/2026</div>`
  },
  {
    id:"cultura", titulo:"Cultura e lazer",
    html:`
<p>A farinha de mandioca de Cruzeiro do Sul é conhecida em todo o Norte e tem indicação geográfica. A cidade tem traços fortes da cultura seringueira e ribeirinha do Juruá.</p>
<div class="places">
  <div class="place"><span class="km">Município</span><b>Parque Nacional da Serra do Divisor</b><p>Cerca de um quarto do parque fica no município, com serras, cachoeiras e floresta na fronteira com o Peru.</p></div>
  <div class="place"><span class="km">Centro</span><b>Catedral Nossa Senhora da Glória</b><p>Igreja do século XX, cartão-postal da cidade.</p></div>
</div>
<div class="src">Fontes: <a href="https://en.wikipedia.org/wiki/Cruzeiro_do_Sul,_Acre">Wikipédia</a> · conferido em out/2026</div>`
  },
  {
    id:"chegada", titulo:"Antes de ir",
    html:`
<ul>
<li>Ajuste relógios: o Acre está duas horas atrás de Brasília.</li>
<li>Se for de carro, confirme as condições da BR-364 e evite o auge das chuvas.</li>
<li>Pergunte sobre PNR e oferta de imóveis antes de chegar.</li>
<li>Para ir ao Peru, veja com a OM as regras para militares.</li>
</ul>`
  }
  ]
}
]);
