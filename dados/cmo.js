/* Comando Militar do Oeste (lotes CMO-1 a CMO-3) */
(function(){
const B = {regiao:"Centro-Oeste", comando:"CMO"};
const W = SRC.CMO;
const FUSO = ["Fuso","−1 h","em relação a Brasília"];
const CLIMA = {p:["Tropical, com verão quente e chuvoso (outubro a abril) e inverno seco, quando frentes frias podem derrubar a temperatura por alguns dias."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]};
const PMGU = ["18ª Bda Inf Pan (P Med Gu Corumbá)","https://www.18bdainfpan.eb.mil.br/images/PMGU/MANUAL_DO_USURIO_-_PMGu_CORUMB-1.pdf"];
const FRONT_PY = "<b>Fronteira:</b> a faixa de fronteira com o Paraguai tem rotas de contrabando e tráfico. Siga as orientações da OM sobre áreas e horários a evitar dos dois lados.";
const S = (o)=>addG(Object.assign({}, B, {
  custo:{p:[o.custoP||"O comércio local atende o dia a dia. Compras maiores costumam ser feitas em Campo Grande ou em polos regionais."], note:TXT.pendAluguel},
  saude:{p:[`Casos especializados costumam ser encaminhados a ${o.ref||"Campo Grande, que tem o Hospital Militar de Área"}.`], note:TXT.pendSaude},
  clima:CLIMA
}, o));

/* ---------- CMO-1 ---------- */
S({id:"campo-grande", cidade:"Campo Grande", uf:"MS", estado:"Mato Grosso do Sul", coord:"20°28′S 54°37′W · alt. 590 m · UTC−4",
  tags:["CMO","9ª RM","20º RCB","Colégio Militar","Hospital Militar"], destaque:"Sede do CMO",
  resumo:"Capital de Mato Grosso do Sul e sede do Comando Militar do Oeste. Cidade arborizada, com Colégio Militar, Hospital Militar de Área e aluguel abaixo da média nacional.",
  lede:"Uma das guarnições mais procuradas do Centro-Oeste: capital planejada, com avenidas largas, custo de moradia baixo para uma capital e porta de entrada para o Pantanal e Bonito.",
  fatos:[["População","971 mil","estimativa IBGE 2026"],FUSO,["Aluguel","R$ 29/m²","FipeZAP, fev/2026"],["Clima","15–33 °C","chuvas de outubro a abril"],["Cesta básica","R$ 805","DIEESE, ago/2026"],["Grande Comando","CMO","9ª RM"]],
  omP:["Campo Grande é sede do <b>Comando Militar do Oeste</b> e da <b>9ª Região Militar</b>."],
  om:[["CMO e Cia Cmdo","Comando Militar de Área"],["9ª RM","Região Militar"],["9º Gpt Log","Com 9º B Sup, 9º B Trnsp, 9º B Mnt e 9º B Saúde"],["20º RCB","Regimento de Cavalaria Blindado"],["3º BAvEx","Aviação do Exército"],["3º Gpt E","Grupamento de Engenharia"],["Hospital Militar de Área de Campo Grande","Referência de saúde do Exército no CMO"],["Colégio Militar de Campo Grande","Sistema Colégio Militar do Brasil"],["Outras","9º B Com, 6º B Intlg, 14ª Cia PE, entre outras"]],
  omSrc:[W,["Correio do Estado","https://correiodoestado.com.br/cidades/campo-grande-se-aproxima-de-x-habitantes-em-nova-estimativa-do-ibge/471761/"]],
  acesso:{p:["O aeroporto tem voos diretos para São Paulo, Brasília e outras capitais. Por terra, a BR-163 e a BR-262 ligam a cidade ao Sudeste, ao Mato Grosso e a Corumbá."]},
  custo:{p:[TXT.fipe("Campo Grande","29,39","−5,24%")+" É um dos aluguéis mais baixos entre as capitais do índice.", TXT.cesta("Campo Grande","805,13")], src:[SRC.fipe,SRC.dieese]},
  saude:{p:["A guarnição tem o <b>Hospital Militar de Área de Campo Grande</b>, que atende os beneficiários do FuSEx e recebe casos de outras guarnições do CMO, além de ampla rede conveniada."], src:[W]},
  educacao:{p:["A cidade tem o <b>Colégio Militar de Campo Grande</b>. No ensino superior há a UFMS, a UEMS, o IFMS e várias faculdades particulares."]},
  cultura:{places:[["Cidade","Bioparque Pantanal","Grande aquário de água doce, com espécies do Pantanal."],["Cidade","Feira Central","Famosa pelo sobá, prato herdado dos imigrantes de Okinawa."],["Cidade","Parque das Nações Indígenas","Grande parque urbano para caminhada e lazer."],["~270 km","Bonito","Rios de água cristalina, grutas e flutuação."]]},
  chegada:["Peça vaga no Colégio Militar de Campo Grande seguindo o calendário de matrícula de dependentes."]});

S({id:"dourados", cidade:"Dourados", uf:"MS", estado:"Mato Grosso do Sul", coord:"22°13′S 54°48′W · UTC−4",
  tags:["4ª Bda C Mec","28º B Log","Cavalaria"], destaque:"Sede de Brigada",
  resumo:"Segunda maior cidade de Mato Grosso do Sul, polo do agronegócio. Sede da 4ª Brigada de Cavalaria Mecanizada.",
  lede:"Cidade de porte médio no sul do estado, perto da fronteira com o Paraguai, com universidades e boa oferta de serviços.",
  fatos:[["População","~243 mil","Censo 2022"],FUSO,["Até Campo Grande","~230 km","BR-163"],["Clima","12–33 °C","chuvas de outubro a abril"],["Fronteira","~120 km","Ponta Porã"],["Grande Comando","CMO","4ª Bda C Mec"]],
  om:[["Cmdo 4ª Bda C Mec e Esqd Cmdo","Comando da Brigada, que enquadra os RC Mec da fronteira"],["28º B Log","Apoio logístico"],["14ª Cia Com Mec e 4º Pel PE","Comunicações e Polícia do Exército"]],
  acesso:{p:["Dourados tem aeroporto regional e fica a cerca de 230 km de Campo Grande pela BR-163."]},
  custoP:"Polo regional do agronegócio, com comércio e serviços de cidade média.",
  educacao:{p:[TXT.semCM+" A cidade tem a Universidade Federal da Grande Dourados (UFGD), a UEMS e faculdades particulares."]},
  cultura:{p:["A cidade tem forte presença de migrantes do Sul e convive com as maiores reservas indígenas guarani-kaiowá do estado."]},
  chegada:[]});

const PY = (o)=>S(Object.assign({ref:"Campo Grande, que tem o Hospital Militar de Área, ou Dourados"}, o));
PY({id:"ponta-pora", cidade:"Ponta Porã", uf:"MS", estado:"Mato Grosso do Sul", coord:"22°32′S 55°43′W · fronteira seca · UTC−4",
  tags:["11º RC Mec","Cavalaria","Paraguai"], destaque:"Fronteira",
  resumo:"Cidade-gêmea de Pedro Juan Caballero, no Paraguai, separadas só por uma avenida. Sede do 11º RC Mec.",
  lede:"Fronteira seca com o Paraguai: a linha internacional é uma avenida, e o comércio de Pedro Juan Caballero faz parte do dia a dia.",
  fatos:[["População","99,6 mil","estimativa IBGE 2026"],FUSO,["Fronteira","Paraguai","Pedro Juan Caballero"],["Até Campo Grande","~330 km","BR-463 e BR-163"],["OM","11º RC Mec","cavalaria mecanizada"],["Grande Comando","CMO","4ª Bda C Mec"]],
  om:[["11º RC Mec","Regimento de Cavalaria Mecanizado, da 4ª Bda C Mec"]],
  omSrc:[W,["Correio do Estado","https://correiodoestado.com.br/cidades/campo-grande-se-aproxima-de-x-habitantes-em-nova-estimativa-do-ibge/471761/"]],
  acesso:{p:["A cidade tem aeroporto regional e fica a cerca de 120 km de Dourados. A fronteira com Pedro Juan Caballero é seca, sem rio."]},
  custoP:"O comércio de Pedro Juan Caballero, com importados mais baratos, faz parte da rotina de compras.",
  educacao:{p:[TXT.semCM+" A cidade tem campus da UEMS, do IFMS e faculdades particulares."]},
  cultura:{p:["A cultura de fronteira mistura português, espanhol e guarani, com culinária paraguaia como a chipa e a sopa paraguaia."], note:FRONT_PY},
  chegada:["Veja com a OM as regras para militares atravessarem para o Paraguai."]});

PY({id:"bela-vista", cidade:"Bela Vista", uf:"MS", estado:"Mato Grosso do Sul", coord:"22°06′S 56°31′W · rio Apa · UTC−4",
  tags:["10º RC Mec","Cavalaria","Paraguai"], destaque:"Fronteira",
  resumo:"Pequena cidade na fronteira com o Paraguai, separada de Bella Vista Norte pelo rio Apa. Sede do 10º RC Mec.",
  lede:"Cidade tranquila do sudoeste do estado, de pecuária e tradição de fronteira, com o rio Apa marcando a divisa.",
  fatos:[["População","~23 mil","Censo 2022"],FUSO,["Fronteira","Paraguai","Bella Vista Norte"],["Rio","Apa","divisa internacional"],["OM","10º RC Mec","cavalaria mecanizada"],["Grande Comando","CMO","4ª Bda C Mec"]],
  om:[["10º RC Mec","Regimento de Cavalaria Mecanizado, da 4ª Bda C Mec"]],
  acesso:{p:["O acesso é por rodovia, a partir de Campo Grande ou de Jardim. Para voos, a referência é Campo Grande."]},
  educacao:{p:[TXT.semCM+" A cidade tem escolas públicas e particulares de ensino fundamental e médio."]},
  cultura:{p:["Cidade de pecuária, com festas tradicionais e influência paraguaia."], note:FRONT_PY},
  chegada:["Veja com a OM as regras para militares atravessarem para o Paraguai."]});

PY({id:"amambai", cidade:"Amambai", uf:"MS", estado:"Mato Grosso do Sul", coord:"23°06′S 55°13′W · UTC−4",
  tags:["17º RC Mec","Cavalaria","Paraguai"], destaque:"Fronteira",
  resumo:"Cidade do sul do estado, na faixa de fronteira com o Paraguai. Sede do 17º RC Mec.",
  lede:"Município agrícola na região do Cone Sul de Mato Grosso do Sul, com grande população indígena guarani-kaiowá.",
  fatos:[["População","~39 mil","Censo 2022"],FUSO,["Faixa","Fronteira","com o Paraguai"],["Até Dourados","~120 km","por rodovia"],["OM","17º RC Mec","cavalaria mecanizada"],["Grande Comando","CMO","4ª Bda C Mec"]],
  om:[["17º RC Mec","Regimento de Cavalaria Mecanizado, da 4ª Bda C Mec"]],
  acesso:{p:["O acesso é por rodovia, a partir de Dourados ou Ponta Porã. Para voos, as referências são Dourados e Campo Grande."]},
  educacao:{p:[TXT.semCM+" A cidade tem campus da UEMS e escolas públicas e particulares."]},
  cultura:{p:["A região tem reservas indígenas guarani-kaiowá e forte economia agrícola."], note:FRONT_PY},
  chegada:[]});

S({id:"corumba", cidade:"Corumbá", uf:"MS", estado:"Mato Grosso do Sul", coord:"19°00′S 57°39′W · rio Paraguai · UTC−4",
  tags:["18ª Bda Inf Pan","17º B Fron","Pantanal","Bolívia"], destaque:"Sede de Brigada",
  resumo:"Capital do Pantanal, à beira do rio Paraguai e na fronteira com a Bolívia. Sede da 18ª Brigada de Infantaria de Pantanal e do 17º Batalhão de Fronteira.",
  lede:"Cidade histórica no coração do Pantanal, com casario do século XIX à beira do rio Paraguai e Puerto Quijarro, na Bolívia, ao lado.",
  fatos:[["População","~96 mil","Censo 2022"],FUSO,["Até Campo Grande","~420 km","BR-262"],["Clima","Muito quente","máximas acima de 35 °C"],["Fronteira","Bolívia","Puerto Quijarro"],["Grande Comando","CMO","18ª Bda Inf Pan"]],
  om:[["Cmdo 18ª Bda Inf Pan","Brigada de Infantaria de Pantanal"],["17º B Fron","Batalhão de Fronteira"],["P Med Gu Corumbá","Posto Médico de Guarnição"]],
  omSrc:[W, PMGU],
  acesso:{p:["Corumbá fica a cerca de 420 km de Campo Grande pela BR-262, que atravessa o Pantanal. A cidade tem aeroporto com voos regionais."]},
  custoP:"A cidade é polo comercial do Pantanal e da fronteira, e muitos moradores fazem compras do lado boliviano.",
  saude:{p:["A guarnição tem o <b>Posto Médico de Guarnição de Corumbá</b>, com ambulatório, pronto atendimento e encaminhamento à rede conveniada ao FuSEx. Casos especializados são encaminhados a Campo Grande."], src:[PMGU]},
  educacao:{p:[TXT.semCM+" A cidade tem o Campus do Pantanal da UFMS e o IFMS."]},
  clima:{p:["Um dos lugares mais quentes do país, com máximas que passam dos 35 °C boa parte do ano. As chuvas vão de outubro a abril, e o Pantanal fica alagado no primeiro semestre."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]},
  cultura:{places:[["Centro","Casario do Porto","Prédios históricos à beira do rio Paraguai."],["Fevereiro","Carnaval de Corumbá","Um dos carnavais mais tradicionais do Centro-Oeste."],["Região","Pantanal","Pesca, observação de fauna e passeios de barco."]], note:"<b>Fronteira:</b> siga as orientações da OM sobre circulação do lado boliviano."},
  chegada:["Veja com a OM as regras para militares atravessarem para a Bolívia."]});

S({id:"cuiaba", cidade:"Cuiabá", uf:"MT", estado:"Mato Grosso", coord:"15°36′S 56°06′W · centro geodésico · UTC−4",
  tags:["13ª Bda Inf Mtz","44º BI Mtz","9º BEC"], destaque:"Sede de Brigada",
  resumo:"Capital de Mato Grosso, uma das cidades mais quentes do país. Sede da 13ª Brigada de Infantaria Motorizada e do 9º BEC.",
  lede:"Capital do agronegócio, perto do centro geodésico da América do Sul, com acesso à Chapada dos Guimarães e ao Pantanal norte.",
  fatos:[["População","~651 mil","Censo 2022"],FUSO,["Aluguel","R$ 48/m²","FipeZAP, fev/2026"],["Clima","Muito quente","máximas perto de 40 °C na seca"],["Cesta básica","R$ 852","DIEESE, ago/2026"],["Grande Comando","CMO","13ª Bda Inf Mtz"]],
  om:[["Cmdo 13ª Bda Inf Mtz e Cia Cmdo","Comando da Brigada"],["44º BI Mtz","Infantaria motorizada"],["9º BEC","Engenharia de construção"],["13º Pel PE","Polícia do Exército"]],
  acesso:{p:["O aeroporto, em Várzea Grande, tem voos diretos para várias capitais. Por terra, a BR-163 e a BR-364 ligam a cidade ao resto do país."]},
  custo:{p:[TXT.fipe("Cuiabá","47,89","+17,58%")+" A alta foi uma das maiores entre as capitais.",TXT.cesta("Cuiabá","851,57")+" É a segunda cesta mais cara do país."], src:[SRC.fipe,SRC.dieese]},
  saude:{p:["Casos especializados podem ser encaminhados ao Hospital Militar de Área de Campo Grande."], note:TXT.pendSaude},
  educacao:{p:[TXT.semCM+" A cidade tem a UFMT, a UNEMAT, o IFMT e muitas faculdades particulares."]},
  clima:{p:["Muito quente o ano inteiro. Na seca, de maio a setembro, as máximas passam de 35 °C, a umidade cai muito e há fumaça de queimadas."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]},
  cultura:{places:[["~65 km","Chapada dos Guimarães","Cachoeiras, mirantes e clima mais ameno."],["~100 km","Pantanal norte","Pela Transpantaneira, a partir de Poconé."],["Cidade","Siriri e cururu","Danças tradicionais cuiabanas."]]},
  chegada:[]});

S({id:"caceres", cidade:"Cáceres", uf:"MT", estado:"Mato Grosso", coord:"16°04′S 57°41′W · rio Paraguai · UTC−4",
  tags:["2º B Fron","Pantanal","Bolívia"], destaque:"Fronteira",
  resumo:"Cidade histórica à beira do rio Paraguai, na entrada do Pantanal e perto da Bolívia. Sede do 2º Batalhão de Fronteira.",
  lede:"Uma das cidades mais antigas de Mato Grosso, conhecida pela pesca e pelo Festival Internacional de Pesca.",
  fatos:[["População","~89 mil","Censo 2022"],FUSO,["Até Cuiabá","~220 km","BR-070 e BR-174"],["Rio","Paraguai","pesca e Pantanal"],["OM","2º B Fron","Batalhão de Fronteira"],["Grande Comando","CMO","13ª Bda Inf Mtz"]],
  om:[["2º B Fron","Batalhão de Fronteira"]],
  acesso:{p:["Cáceres fica a cerca de 220 km de Cuiabá, por rodovia asfaltada. Para voos, a referência é Cuiabá."]},
  ref:"Cuiabá ou Campo Grande",
  educacao:{p:[TXT.semCM+" A cidade tem a sede da UNEMAT e um campus do IFMT."]},
  clima:{p:["Muito quente, com chuvas de outubro a abril e seca no inverno."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]},
  cultura:{places:[["Setembro","Festival Internacional de Pesca","Um dos maiores festivais de pesca de água doce do mundo."],["Região","Pantanal","Passeios de barco e pesca no rio Paraguai."]], note:"<b>Fronteira:</b> a região tem rotas de contrabando com a Bolívia. Siga as orientações da OM."},
  chegada:[]});

/* ---------- CMO-2 ---------- */
S({id:"rondonopolis", cidade:"Rondonópolis", uf:"MT", estado:"Mato Grosso", coord:"16°28′S 54°38′W · UTC−4",
  tags:["18º GAC","Agronegócio","BR-163"], destaque:"Polo regional",
  resumo:"Polo do agronegócio no sul de Mato Grosso, no cruzamento da BR-163 com a BR-364. Sede do 18º GAC.",
  lede:"Cidade de porte médio, com economia forte e muito movimento de carretas, a cerca de 210 km de Cuiabá.",
  fatos:[["População","~245 mil","Censo 2022"],FUSO,["Até Cuiabá","~210 km","BR-163/364"],["Clima","Quente","chuvas de outubro a abril"],["OM","18º GAC","artilharia de campanha"],["Grande Comando","CMO","13ª Bda Inf Mtz"]],
  om:[["18º GAC","Grupo de Artilharia de Campanha"]],
  acesso:{p:["A cidade tem aeroporto regional e fica no entroncamento da BR-163 com a BR-364."]},
  custoP:"Cidade com comércio e serviços completos, puxados pelo agronegócio.",
  ref:"Cuiabá ou Campo Grande",
  educacao:{p:[TXT.semCM+" A cidade tem a Universidade Federal de Rondonópolis (UFR), o IFMT e faculdades particulares."]},
  cultura:{p:["Cidade movida pelo agronegócio, com feiras e exposições agropecuárias."]},
  chegada:[]});

S({id:"coxim", cidade:"Coxim", uf:"MS", estado:"Mato Grosso do Sul", coord:"18°30′S 54°45′W · rio Taquari · UTC−4",
  tags:["47º BI","Rio Taquari","Pesca"], destaque:"Interior",
  resumo:"Cidade do norte de Mato Grosso do Sul, à beira do rio Taquari, na BR-163. Sede do 47º Batalhão de Infantaria.",
  lede:"Cidade tranquila conhecida pela pesca e pelas cachoeiras, entre Campo Grande e Cuiabá.",
  fatos:[["População","~32 mil","Censo 2022"],FUSO,["Até Campo Grande","~250 km","BR-163"],["Rio","Taquari","pesca"],["OM","47º BI","infantaria"],["Grande Comando","CMO","9ª RM"]],
  om:[["47º BI","Batalhão de Infantaria"]],
  acesso:{p:["Coxim fica na BR-163, a cerca de 250 km de Campo Grande. Para voos, a referência é Campo Grande."]},
  educacao:{p:[TXT.semCM+" A cidade tem campus da UFMS e do IFMS."]},
  cultura:{p:["A pesca no rio Taquari e as cachoeiras da região são os principais programas. Na piracema, a pesca é proibida."], note:TXT.rios},
  chegada:[]});

/* ---------- CMO-3 ---------- */
S({id:"nioaque", cidade:"Nioaque", uf:"MS", estado:"Mato Grosso do Sul", coord:"21°08′S 55°49′W · UTC−4",
  tags:["9º GAC","Retirada da Laguna"], destaque:"Interior",
  resumo:"Pequena cidade do sudoeste de Mato Grosso do Sul, ligada à história da Retirada da Laguna. Sede do 9º GAC.",
  lede:"Cidade pequena e tranquila, a cerca de 180 km de Campo Grande, na região entre Aquidauana e Jardim.",
  fatos:[["População","~14 mil","Censo 2022"],FUSO,["Até Campo Grande","~180 km","por rodovia"],["História","Laguna","Retirada da Laguna, 1867"],["OM","9º GAC","artilharia de campanha"],["Grande Comando","CMO","9ª RM"]],
  om:[["9º GAC","Grupo de Artilharia de Campanha"]],
  acesso:{p:["O acesso é por rodovia a partir de Campo Grande, a cerca de 180 km. Para voos, a referência é Campo Grande."]},
  educacao:{p:[TXT.semCM+" A cidade tem escolas públicas de ensino fundamental e médio."]},
  cultura:{p:["A cidade está ligada à memória da Retirada da Laguna, episódio da Guerra do Paraguai. Bonito e Jardim ficam na mesma região."]},
  chegada:[]});

S({id:"tres-lagoas", cidade:"Três Lagoas", uf:"MS", estado:"Mato Grosso do Sul", coord:"20°45′S 51°40′W · rio Paraná · UTC−4",
  tags:["3ª Bia AAAe","Celulose","Rio Paraná"], destaque:"Polo regional",
  resumo:"Cidade industrial na divisa com São Paulo, à beira do rio Paraná. Sede da 3ª Bateria de Artilharia Antiaérea.",
  lede:"Polo da indústria de celulose, perto da divisa com São Paulo, com fácil acesso ao interior paulista.",
  fatos:[["População","~132 mil","Censo 2022"],FUSO,["Divisa","São Paulo","ponte sobre o rio Paraná"],["Até Campo Grande","~330 km","BR-262"],["OM","3ª Bia AAAe","artilharia antiaérea"],["Grande Comando","CMO","9ª RM"]],
  om:[["3ª Bia AAAe","Bateria de Artilharia Antiaérea (localização a confirmar na fonte oficial)"]],
  acesso:{p:["A cidade fica na BR-262, a cerca de 330 km de Campo Grande, e tem ligação direta com o interior de São Paulo pela ponte sobre o rio Paraná. Tem aeroporto regional."]},
  custoP:"A indústria de celulose trouxe crescimento e movimenta o mercado de aluguel.",
  educacao:{p:[TXT.semCM+" A cidade tem campus da UFMS e do IFMS."]},
  cultura:{p:["Cidade com lagoas urbanas que dão nome ao município e orla do rio Paraná para pesca e lazer."], note:TXT.rios},
  chegada:[]});

S({id:"jardim", cidade:"Jardim", uf:"MS", estado:"Mato Grosso do Sul", coord:"21°29′S 56°08′W · Serra da Bodoquena · UTC−4",
  tags:["4ª Cia E Cmb Mec","Bonito","Ecoturismo"], destaque:"Interior",
  resumo:"Pequena cidade vizinha de Bonito, no polo de ecoturismo da Serra da Bodoquena. Sede da 4ª Companhia de Engenharia de Combate Mecanizada.",
  lede:"Cidade tranquila no caminho de Bonito, com rios cristalinos e o Buraco das Araras por perto.",
  fatos:[["População","~24 mil","Censo 2022"],FUSO,["Até Bonito","~60 km","por rodovia"],["Destaque","Ecoturismo","rios cristalinos"],["OM","4ª Cia E Cmb Mec","engenharia de combate"],["Grande Comando","CMO","4ª Bda C Mec"]],
  om:[["4ª Cia E Cmb Mec","Companhia de Engenharia de Combate Mecanizada, da 4ª Bda C Mec"]],
  acesso:{p:["O acesso é por rodovia a partir de Campo Grande, a cerca de 240 km. Para voos, a referência é Campo Grande; Bonito tem aeroporto com voos sazonais."]},
  educacao:{p:[TXT.semCM+" A cidade tem campus da UEMS e escolas públicas e particulares."]},
  cultura:{places:[["Município","Buraco das Araras","Dolina gigante onde vivem araras-vermelhas."],["Região","Rio da Prata","Flutuação em águas cristalinas."],["~60 km","Bonito","Grutas, rios e cachoeiras."]]},
  chegada:[]});

S({id:"porto-murtinho", cidade:"Porto Murtinho", uf:"MS", estado:"Mato Grosso do Sul", coord:"21°42′S 57°53′W · rio Paraguai · UTC−4",
  tags:["2ª Cia Fron","Paraguai","Rota Bioceânica"], destaque:"Fronteira",
  resumo:"Cidade à beira do rio Paraguai, na fronteira com o Paraguai e ponto de partida da Rota Bioceânica. Sede da 2ª Companhia de Fronteira.",
  lede:"Cidade pequena do Pantanal sul, de pesca e pecuária, que ganha importância com a ponte da Rota Bioceânica para Carmelo Peralta, no Paraguai.",
  fatos:[["População","~13 mil","Censo 2022"],FUSO,["Fronteira","Paraguai","Carmelo Peralta"],["Rio","Paraguai","pesca e Pantanal"],["OM","2ª Cia Fron","Companhia de Fronteira"],["Grande Comando","CMO","9ª RM"]],
  om:[["2ª Cia Fron","Companhia de Fronteira"]],
  acesso:{p:["O acesso é por rodovia a partir de Campo Grande ou de Jardim. A ponte da Rota Bioceânica sobre o rio Paraguai liga a cidade a Carmelo Peralta, no Paraguai."]},
  educacao:{p:[TXT.semCM+" A cidade tem escolas públicas de ensino fundamental e médio."]},
  clima:{p:["Muito quente, com chuvas de outubro a abril e cheias do rio Paraguai no primeiro semestre."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]},
  cultura:{p:["Destino de pesca esportiva no rio Paraguai, com acesso ao Pantanal sul."], note:FRONT_PY},
  chegada:["Veja com a OM as regras para militares atravessarem para o Paraguai."]});

S({id:"aquidauana", cidade:"Aquidauana", uf:"MS", estado:"Mato Grosso do Sul", coord:"20°28′S 55°47′W · Portal do Pantanal · UTC−4",
  tags:["9º BE Cmb","Pantanal"], destaque:"Interior",
  resumo:"Cidade conhecida como Portal do Pantanal, a cerca de 140 km de Campo Grande. Sede do 9º Batalhão de Engenharia de Combate.",
  lede:"Cidade de porte pequeno a médio, à beira do rio Aquidauana, com acesso fácil a Campo Grande e ao Pantanal.",
  fatos:[["População","~47 mil","Censo 2022"],FUSO,["Até Campo Grande","~140 km","BR-262"],["Destaque","Pantanal","Portal do Pantanal"],["OM","9º BE Cmb","engenharia de combate"],["Grande Comando","CMO","9ª RM"]],
  om:[["9º BE Cmb","Batalhão de Engenharia de Combate"]],
  acesso:{p:["Aquidauana fica na BR-262, a cerca de 140 km de Campo Grande, que é a referência para voos."]},
  educacao:{p:[TXT.semCM+" A cidade tem campus da UFMS e da UEMS."]},
  cultura:{p:["Ponto de partida para fazendas e passeios no Pantanal, com pesca no rio Aquidauana."], note:TXT.rios},
  chegada:[]});
})();
