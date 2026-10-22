/* Comando Militar do Planalto (lotes CMP-1 e CMP-2) */
(function(){
const W = SRC.CMP;
const FUSO = ["Fuso","0 h","horário de Brasília"];
const POP = (v)=>["População",v,"Censo 2022, aprox."];
const CERR = {p:["Clima de Cerrado: verão chuvoso (outubro a abril) e inverno muito seco, com umidade do ar que pode ficar abaixo de 20% em agosto e setembro."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]};
const HMAB = "Brasília, que tem o Hospital Militar de Área";
const S = (o)=>addG(Object.assign({regiao:"Centro-Oeste", comando:"CMP",
  acesso:{p:[o.acessoP]},
  custo:o.custoObj || {p:[o.custoP||"Cidade com comércio e serviços para o dia a dia."], note:TXT.pendAluguel},
  saude:o.saudeObj || {p:[`Casos especializados costumam ser encaminhados a ${o.ref||HMAB}.`], note:TXT.pendSaude},
  educacao:{p:[o.edu]},
  clima:o.climaObj || CERR,
  cultura:{p:o.cultP||[], places:o.places, note:o.cultNote},
  chegada:o.chegadaX||[]
}, o));
const GO = {uf:"GO", estado:"Goiás"};

/* ---------- CMP-1: Brasília e entorno ---------- */
S({id:"brasilia", cidade:"Brasília", uf:"DF", estado:"Distrito Federal", coord:"15°47′S 47°52′W · alt. 1.170 m · UTC−3",
  tags:["CMP","11ª RM","QG do Exército","1º RCG","Colégio Militar","HMAB"], destaque:"Sede do CMP",
  resumo:"Capital federal, sede do Quartel-General do Exército e do Comando Militar do Planalto. Tem Colégio Militar, Hospital Militar de Área e o 1º RCG, os Dragões da Independência.",
  lede:"Cidade planejada, com setores bem definidos, muitas OM e órgãos de direção do Exército, boa estrutura para famílias e clima seco no inverno.",
  fatos:[["População","~3 mi","estimativa IBGE 2025"],FUSO,["Aluguel","R$ 52/m²","FipeZAP, fev/2026"],["Clima","13–29 °C","inverno muito seco"],["Cesta básica","R$ 734","DIEESE, ago/2026"],["Grande Comando","CMP","11ª RM"]],
  omP:["Brasília abriga o <b>Quartel-General do Exército</b>, os órgãos de direção da Força e o <b>Comando Militar do Planalto</b>, com a <b>11ª Região Militar</b>."],
  om:[["CMP e 11ª RM","Comando Militar de Área e Região Militar"],["1º RCG","Regimento de Cavalaria de Guardas, os Dragões da Independência"],["BGP","Batalhão da Guarda Presidencial"],["BPEB","Batalhão de Polícia do Exército de Brasília"],["32º GAC","Grupo de Artilharia de Campanha"],["16º B Log e 11º D Sup","Logística"],["Hospital Militar de Área de Brasília","Referência de saúde do Exército no Planalto"],["Colégio Militar de Brasília","Sistema Colégio Militar do Brasil"],["Outras","3º Esqd C Mec, 1ª Bia AAAe, 7ª Cia Intlg, entre outras"]],
  acessoP:"O aeroporto de Brasília é um dos maiores hubs do país, com voos para todas as capitais. A cidade é o centro da malha rodoviária federal.",
  custoObj:{p:[TXT.fipe("Brasília","51,64","+10,61%"),TXT.cesta("Brasília","734,35")], note:"<b>Na prática:</b> o aluguel varia muito entre o Plano Piloto e as regiões administrativas. Sudoeste, Cruzeiro e Octogonal concentram muitos militares, perto do Setor Militar Urbano.", src:[SRC.fipe,SRC.dieese]},
  saudeObj:{p:["A guarnição tem o <b>Hospital Militar de Área de Brasília</b>, que atende os beneficiários do FuSEx, além de rede conveniada ampla."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar de Brasília</b>. No ensino superior há a UnB, o IFB e muitas faculdades particulares.",
  places:[["Cidade","Eixo Monumental","Congresso, Catedral e obras de Niemeyer."],["Cidade","Parque da Cidade e Lago Paranoá","Lazer ao ar livre e esportes náuticos."],["~230 km","Chapada dos Veadeiros","Cachoeiras e trilhas no Cerrado."],["~120 km","Pirenópolis","Cidade histórica com cachoeiras."]],
  chegadaX:["Peça vaga no Colégio Militar de Brasília seguindo o calendário de matrícula de dependentes.","Prepare-se para a seca: umidificador de ar ajuda muito no inverno."]});

S(Object.assign({}, GO, {id:"goiania", cidade:"Goiânia", coord:"16°41′S 49°16′W · UTC−3",
  tags:["Cmdo Op Esp","Forças Especiais","1º B Aç Cmdos"], destaque:"Operações Especiais",
  resumo:"Capital de Goiás, sede do Comando de Operações Especiais, com os batalhões de Forças Especiais e de Ações de Comandos.",
  lede:"Capital arborizada e planejada, com custo de vida moderado, a cerca de 210 km de Brasília.",
  fatos:[POP("~1,44 mi"),FUSO,["Aluguel","R$ 43/m²","FipeZAP, fev/2026"],["Até Brasília","~210 km","BR-060"],["Cesta básica","R$ 773","DIEESE, ago/2026"],["Grande Comando","CMP","Cmdo Op Esp"]],
  om:[["Cmdo Op Esp","Comando de Operações Especiais"],["1º B F Esp","Batalhão de Forças Especiais"],["1º B Aç Cmdos","Batalhão de Ações de Comandos"],["CI Op Esp","Centro de Instrução de Operações Especiais"],["Outras","B Ap Op Esp, Cia DQBRN, 6º Pel PE"]],
  acessoP:"O aeroporto tem voos para várias capitais. A BR-060 liga Goiânia a Brasília, e a BR-153 ao Sudeste e ao Norte.",
  custoObj:{p:[TXT.fipe("Goiânia","42,58","+5,58%"),TXT.cesta("Goiânia","772,90")], src:[SRC.fipe,SRC.dieese]},
  edu:TXT.semCM+" A cidade tem a UFG, a PUC Goiás, o IFG e muitas faculdades particulares.",
  places:[["Cidade","Parques","Vaca Brava, Flamboyant e Lago das Rosas."],["~170 km","Caldas Novas","Águas termais."],["~130 km","Pirenópolis","Cidade histórica com cachoeiras."]]}));

S(Object.assign({}, GO, {id:"cristalina", cidade:"Cristalina", coord:"16°46′S 47°37′W · alt. 1.200 m · UTC−3",
  tags:["3ª Bda Inf Mtz","Cristais","Entorno do DF"], destaque:"Sede de Brigada",
  resumo:"Cidade goiana dos cristais, a cerca de 130 km de Brasília. Sede da 3ª Brigada de Infantaria Motorizada.",
  lede:"Cidade de altitude, conhecida pelo comércio de cristais e pela agricultura irrigada, com Brasília como referência de serviços.",
  fatos:[POP("~62 mil"),FUSO,["Até Brasília","~130 km","BR-040"],["Altitude","~1.200 m","noites frescas"],["OM","3ª Bda Inf Mtz","e OM de apoio"],["Grande Comando","CMP","3ª Bda Inf Mtz"]],
  om:[["Cmdo 3ª Bda Inf Mtz e Cia Cmdo","Comando da Brigada"],["6ª Cia Com e 23º Pel PE","Comunicações e Polícia do Exército"]],
  acessoP:"A cidade fica na BR-040, a cerca de 130 km de Brasília, que é a referência para voos.",
  custoP:"Para compras maiores e serviços especializados, a referência é Brasília.",
  edu:TXT.semCM+" O Colégio Militar de Brasília e as universidades do DF ficam a cerca de 130 km.",
  places:[["Cidade","Comércio de cristais","Lojas de pedras e artesanato mineral."],["Região","Cachoeiras","Rios e cachoeiras do Cerrado."]]}));

S(Object.assign({}, GO, {id:"formosa", cidade:"Formosa", coord:"15°32′S 47°20′W · Entorno do DF · UTC−3",
  tags:["6º GMF","Mísseis e Foguetes","Astros"], destaque:"Artilharia de Mísseis",
  resumo:"Cidade do entorno do DF, centro da Artilharia de Mísseis e Foguetes do Exército, com o 6º Grupo de Mísseis e Foguetes.",
  lede:"Cidade a cerca de 80 km de Brasília, com o Salto do Itiquira, uma das cachoeiras mais altas do país.",
  fatos:[POP("~115 mil"),FUSO,["Até Brasília","~80 km","BR-020"],["Lazer","Salto do Itiquira","cachoeira de ~170 m"],["OM","6º GMF","mísseis e foguetes"],["Grande Comando","CMP","11ª RM"]],
  om:[["6º GMF","Grupo de Mísseis e Foguetes (sistema Astros)"],["CLMF","Estrutura de apoio da artilharia de mísseis e foguetes (designação a confirmar)"]],
  acessoP:"A cidade fica na BR-020, a cerca de 80 km de Brasília.",
  custoP:"Muitos militares moram na própria cidade, e Brasília fica perto para compras e serviços.",
  edu:TXT.semCM+" A cidade tem campus da UEG e do IFG, e as instituições do DF ficam a cerca de 80 km.",
  places:[["~35 km","Salto do Itiquira","Uma das maiores quedas d'água do Brasil."],["Cidade","Lagoa Feia","Lagoa para lazer e esportes náuticos."]]}));

S(Object.assign({}, GO, {id:"ipameri", cidade:"Ipameri", coord:"17°43′S 48°09′W · Sudeste goiano · UTC−3",
  tags:["23ª Cia E Cmb","Engenharia"], destaque:"Interior",
  resumo:"Pequena cidade do sudeste goiano. Sede da 23ª Companhia de Engenharia de Combate.",
  lede:"Cidade tranquila, de agropecuária, entre Goiânia e o Triângulo Mineiro.",
  fatos:[POP("~27 mil"),FUSO,["Até Goiânia","~200 km","por rodovia"],["Região","Sudeste goiano","agropecuária"],["OM","23ª Cia E Cmb","engenharia de combate"],["Grande Comando","CMP","11ª RM"]],
  om:[["23ª Cia E Cmb","Companhia de Engenharia de Combate"]],
  acessoP:"O acesso é por rodovia, a cerca de 200 km de Goiânia. Para voos, as referências são Goiânia e Uberlândia.",
  ref:"Goiânia ou Brasília",
  edu:TXT.semCM+" A cidade tem campus da UEG.",
  places:[["~60 km","Caldas Novas","Águas termais."]]}));

/* ---------- CMP-2: Goiás, Tocantins e Triângulo ---------- */
S(Object.assign({}, GO, {id:"jatai", cidade:"Jataí", coord:"17°53′S 51°43′W · Sudoeste goiano · UTC−3",
  tags:["41º BI Mtz","Agronegócio"], destaque:"Interior",
  resumo:"Polo do agronegócio no sudoeste goiano. Sede do 41º Batalhão de Infantaria Motorizado.",
  lede:"Cidade média e próspera, a cerca de 320 km de Goiânia.",
  fatos:[POP("~105 mil"),FUSO,["Até Goiânia","~320 km","BR-060"],["Economia","Agronegócio","soja e milho"],["OM","41º BI Mtz","infantaria motorizada"],["Grande Comando","CMP","11ª RM"]],
  om:[["41º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"A cidade fica na BR-060 e na BR-364 e tem aeroporto regional.",
  custoP:"O agronegócio movimenta a cidade, com comércio e serviços completos.",
  ref:"Goiânia ou Brasília",
  edu:TXT.semCM+" A cidade tem a Universidade Federal de Jataí (UFJ) e o IFG.",
  cultP:["Cidade do interior goiano com exposições agropecuárias e festas sertanejas."]}));

S(Object.assign({}, GO, {id:"aragarcas", cidade:"Aragarças", coord:"15°53′S 52°15′W · rio Araguaia · UTC−3",
  tags:["58º BI Mtz","Araguaia","Barra do Garças"], destaque:"Interior",
  resumo:"Cidade à beira do rio Araguaia, na divisa com Mato Grosso, vizinha de Barra do Garças. Sede do 58º Batalhão de Infantaria Motorizado.",
  lede:"Cidade pequena no Vale do Araguaia, famosa pelas praias de rio na temporada de julho.",
  fatos:[POP("~20 mil"),FUSO,["Vizinha","Barra do Garças","Mato Grosso"],["Até Goiânia","~380 km","GO-060 e BR-070"],["OM","58º BI Mtz","infantaria motorizada"],["Grande Comando","CMP","11ª RM"]],
  om:[["58º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"O acesso é por rodovia. Barra do Garças, do outro lado do rio, tem aeroporto regional e mais comércio.",
  ref:"Goiânia ou Brasília",
  edu:TXT.semCM+" Barra do Garças, vizinha, tem campus da UFMT e do IFMT.",
  places:[["Julho","Praias do Araguaia","Temporada de praia de rio, muito movimentada."],["Barra do Garças","Serra Azul","Mirante e trilhas."]], cultNote:TXT.rios}));

S({id:"palmas", cidade:"Palmas", uf:"TO", estado:"Tocantins", coord:"10°11′S 48°20′W · lago do Lajeado · UTC−3",
  tags:["22º BI","Capital","Jalapão"], destaque:"Capital",
  resumo:"Capital mais jovem do país, planejada às margens do lago do Lajeado. Sede do 22º Batalhão de Infantaria.",
  lede:"Cidade nova, de avenidas largas e muito calor, porta de entrada para o Jalapão.",
  fatos:[["População","328 mil","estimativa IBGE 2025"],FUSO,["Clima","Muito quente","máximas acima de 35 °C"],["Cesta básica","R$ 719","DIEESE, ago/2026"],["OM","22º BI","infantaria"],["Grande Comando","CMP","11ª RM"]],
  om:[["22º BI","Batalhão de Infantaria"]],
  acessoP:"O aeroporto tem voos para Brasília e outras capitais. A BR-153, a Belém–Brasília, passa a cerca de 60 km.",
  custoObj:{p:[TXT.cesta("Palmas","718,54")], note:TXT.pendAluguel, src:[SRC.dieese,SRC.ibge]},
  ref:"Brasília",
  edu:TXT.semCM+" A cidade tem a Universidade Federal do Tocantins (UFT), a Unitins e o IFTO.",
  climaObj:{p:["Muito quente o ano todo, com chuvas de outubro a abril e seca forte no inverno."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]},
  places:[["Cidade","Praia da Graciosa","Praia no lago, com orla urbanizada."],["~200 km","Jalapão","Dunas, fervedouros e cachoeiras."]]});

const MG = {uf:"MG", estado:"Minas Gerais"};
S(Object.assign({}, MG, {id:"uberlandia", cidade:"Uberlândia", coord:"18°55′S 48°17′W · Triângulo Mineiro · UTC−3",
  tags:["36º BI Mtz","Triângulo Mineiro"], destaque:"Polo regional",
  resumo:"Maior cidade do Triângulo Mineiro, polo de logística e serviços. Sede do 36º Batalhão de Infantaria Motorizado.",
  lede:"Cidade grande e bem estruturada, entre Goiânia, Brasília, Belo Horizonte e São Paulo.",
  fatos:[POP("~713 mil"),FUSO,["Até Brasília","~430 km","BR-050"],["Região","Triângulo","polo logístico"],["OM","36º BI Mtz","infantaria motorizada"],["Grande Comando","CMP","11ª RM"]],
  om:[["36º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"O aeroporto tem voos para várias capitais. A cidade é cortada pela BR-050 e pela BR-365.",
  custoP:"Cidade com comércio e serviços completos.",
  ref:"Brasília ou Belo Horizonte",
  edu:TXT.semCM+" A cidade tem a Universidade Federal de Uberlândia (UFU), o IFTM e faculdades particulares.",
  cultP:["Cidade com vida universitária, parques e bares, perto de cachoeiras e represas do Triângulo."]}));

S(Object.assign({}, MG, {id:"araguari", cidade:"Araguari", coord:"18°39′S 48°11′W · Triângulo Mineiro · UTC−3",
  tags:["2º B Fv","11º BE Cnst","Ferrovia"], destaque:"Interior",
  resumo:"Cidade do Triângulo Mineiro, vizinha de Uberlândia. Sede do 2º Batalhão Ferroviário e do 11º Batalhão de Engenharia de Construção.",
  lede:"Cidade de tradição ferroviária, a cerca de 30 km de Uberlândia.",
  fatos:[POP("~117 mil"),FUSO,["Até Uberlândia","~30 km","BR-050"],["Tradição","Ferroviária","antigo entroncamento"],["OM","2º B Fv","e 11º BE Cnst"],["Grande Comando","CMP","11ª RM"]],
  om:[["2º B Fv","Batalhão Ferroviário"],["11º BE Cnst","Batalhão de Engenharia de Construção"]],
  omSrc:[W, SRC.CMO],
  acessoP:"A cidade fica a cerca de 30 km de Uberlândia, que é a referência para voos e serviços.",
  ref:"Uberlândia, Brasília ou Belo Horizonte",
  edu:TXT.semCM+" A cidade tem campus do IFTM, e Uberlândia concentra universidades.",
  cultP:["Cidade tranquila com estação ferroviária histórica, perto de tudo que Uberlândia oferece."]}));
})();
