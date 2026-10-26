/* Comando Militar do Leste (lotes CML-1 a CML-4) */
(function(){
const W = SRC.CML;
const FUSO = ["Fuso","0 h","horário de Brasília"];
const POP = (v)=>["População",v,"Censo 2022, aprox."];
const RJC = {p:["Quente e úmido, com verão chuvoso e muito quente (dezembro a março) e inverno ameno e mais seco."], clima:"cccssssssccc", leg:["Chuvoso (out–mar)","Mais seco (abr–set)"]};
const SERRA = {p:["Tropical de altitude: verão ameno e chuvoso e inverno frio e seco, com noites geladas."], clima:"cccssssssccc", leg:["Chuvoso (out–mar)","Seco (abr–set)"]};
const MG = {p:["Tropical de altitude, com verão quente e chuvoso (outubro a março) e inverno seco, de dias ensolarados e noites frias."], clima:"cccssssssccc", leg:["Chuvoso (out–mar)","Seco (abr–set)"]};
const HCE = "Rio de Janeiro, que tem o Hospital Central do Exército";
const HGUJF = "Juiz de Fora, que tem Hospital de Guarnição, ou Belo Horizonte";
const S = (o)=>addG(Object.assign({regiao:"Sudeste", comando:"CML",
  acesso:{p:[o.acessoP]},
  custo:o.custoObj || {p:[o.custoP||"Cidade com comércio e serviços para o dia a dia."], note:TXT.pendAluguel},
  saude:o.saudeObj || {p:[`Casos especializados costumam ser encaminhados a ${o.ref||HCE}.`], note:TXT.pendSaude},
  educacao:{p:[o.edu]},
  clima:o.climaObj || RJC,
  cultura:{p:o.cultP||[], places:o.places, note:o.cultNote},
  chegada:o.chegadaX||[]
}, o));
const RJ = {uf:"RJ", estado:"Rio de Janeiro"};
const M = {uf:"MG", estado:"Minas Gerais", climaObj:MG, ref:HGUJF};

/* ---------- CML-1: Rio de Janeiro e Serra ---------- */
S(Object.assign({}, RJ, {id:"rio-de-janeiro", cidade:"Rio de Janeiro", coord:"22°54′S 43°12′W · UTC−3",
  tags:["CML","1ª RM","Bda Inf Pqdt","Vila Militar","Colégio Militar","HCE"], destaque:"Sede do CML",
  resumo:"Maior guarnição do Exército, com o Comando Militar do Leste, a Vila Militar, a Brigada Paraquedista, escolas como ECEME, EsAO e IME e o Hospital Central do Exército.",
  lede:"O Rio concentra a maior quantidade de OM do país, espalhadas por bairros muito diferentes entre si. A escolha de onde morar depende muito de onde fica a OM.",
  fatos:[POP("~6,2 mi"),FUSO,["Aluguel","R$ 57/m²","FipeZAP, fev/2026"],["Clima","20–35 °C","verão muito quente"],["Cesta básica","R$ 851","DIEESE, ago/2026"],["Grande Comando","CML","1ª RM / 1ª DE"]],
  omP:["A cidade é sede do <b>Comando Militar do Leste</b>, da <b>1ª Região Militar</b> e da <b>1ª Divisão de Exército</b>. Boa parte da tropa fica na Vila Militar, em Deodoro, na Zona Oeste."],
  om:[["CML e 1ª RM","Comando Militar de Área e Região Militar"],["1ª DE","Divisão de Exército"],["Bda Inf Pqdt","Brigada de Infantaria Paraquedista, com seus batalhões, grupo de artilharia, 1º Esqd C Pqdt e OM de apoio"],["9ª Bda Inf Mtz (GU Escola)","Grande Unidade Escola, na Vila Militar"],["15º RC Mec","Regimento de Cavalaria Mecanizado (escola), na Vila Militar"],["Escolas","ECEME e IME (Praia Vermelha), EsAO (Vila Militar), Escola de Equitação do Exército, entre outras"],["Hospital Central do Exército","Referência nacional de saúde do Exército"],["Colégio Militar do Rio de Janeiro","Sistema Colégio Militar do Brasil"],["Outras","2º RCG, 1º BG, 1º BPE, 1º GAAAe, Bia Cmdo e OM de apoio, entre muitas outras"]],
  acessoP:"A cidade tem os aeroportos do Galeão e Santos Dumont e é ligada a São Paulo pela Via Dutra. O trânsito é pesado, e o trem e o metrô ajudam em alguns trajetos, como o ramal de Deodoro.",
  custoObj:{p:[TXT.fipe("Rio de Janeiro","56,71","+10,89%"),TXT.cesta("Rio de Janeiro","851,19")], note:"<b>Na prática:</b> o aluguel varia muito por bairro. Para quem serve na Vila Militar, bairros da Zona Oeste e a própria vila costumam ser mais práticos que a Zona Sul.", src:[SRC.fipe,SRC.dieese]},
  saudeObj:{p:["A guarnição tem o <b>Hospital Central do Exército</b>, referência nacional, e um Hospital de Guarnição na Vila Militar, além de policlínicas e ampla rede conveniada ao FuSEx."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar do Rio de Janeiro</b>. No ensino superior há a UFRJ, a UERJ, a UFF (em Niterói), a PUC-Rio, o IME e muitas outras instituições.",
  places:[["Zona Sul","Praias","Copacabana, Ipanema e Leblon, com o Forte de Copacabana."],["Cidade","Cristo Redentor e Pão de Açúcar","Os cartões-postais da cidade."],["Zona Oeste","Vila Militar","Bairro militar com estrutura própria."]],
  cultNote:"<b>Segurança:</b> algumas áreas da cidade têm conflitos armados frequentes. Peça orientação na OM antes de escolher onde morar e quais trajetos usar.",
  chegadaX:["Peça vaga no Colégio Militar do Rio de Janeiro seguindo o calendário de matrícula de dependentes."]}));

S(Object.assign({}, RJ, {id:"niteroi", cidade:"Niterói", coord:"22°53′S 43°06′W · baía de Guanabara · UTC−3",
  tags:["AD/1","21º GAC","UFF"], destaque:"Região Metropolitana",
  resumo:"Cidade do outro lado da baía de Guanabara, ligada ao Rio pela ponte. Sede da Artilharia Divisionária da 1ª DE e do 21º GAC.",
  lede:"Cidade com boa qualidade de vida, praias oceânicas e aluguel abaixo do Rio no índice FipeZAP.",
  fatos:[POP("~482 mil"),FUSO,["Aluguel","R$ 38/m²","FipeZAP, fev/2026"],["Até o Rio","~13 km","Ponte Rio-Niterói"],["OM","AD/1","e 21º GAC"],["Grande Comando","CML","1ª DE"]],
  om:[["AD/1 e Bia Cmdo","Artilharia Divisionária da 1ª DE"],["21º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"Niterói é ligada ao Rio pela Ponte Rio-Niterói e pelas barcas, que levam cerca de 20 minutos até o centro do Rio.",
  custoObj:{p:[TXT.fipe("Niterói","37,81","+18,07%")+" A alta em 12 meses foi uma das maiores do índice."], src:[SRC.fipe]},
  edu:TXT.semCM+" A cidade tem a Universidade Federal Fluminense (UFF), e o Colégio Militar do Rio de Janeiro fica do outro lado da baía.",
  places:[["Cidade","Museu de Arte Contemporânea","Obra de Oscar Niemeyer com vista para a baía."],["Região Oceânica","Praias de Itacoatiara e Camboinhas","Praias de mar aberto."]]}));

S(Object.assign({}, RJ, {id:"petropolis", cidade:"Petrópolis", coord:"22°30′S 43°10′W · Serra dos Órgãos · UTC−3",
  tags:["32º BI Mtz","Cidade Imperial","Serra"], destaque:"Interior",
  resumo:"Cidade Imperial na serra fluminense, a cerca de 70 km do Rio. Sede do 32º Batalhão de Infantaria Motorizado.",
  lede:"Cidade histórica de clima ameno, antiga residência de verão de D. Pedro II.",
  fatos:[POP("~278 mil"),FUSO,["Até o Rio","~70 km","BR-040"],["Clima","Ameno","serra"],["OM","32º BI Mtz","infantaria motorizada"],["Grande Comando","CML","1ª RM"]],
  om:[["32º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"A cidade fica na BR-040, a cerca de 70 km do Rio, subindo a serra.",
  edu:TXT.semCM+" A cidade tem campus da UCP, do CEFET e de outras instituições.",
  climaObj:SERRA,
  places:[["Centro","Museu Imperial","Antigo palácio de verão de D. Pedro II."],["Região","Itaipava","Restaurantes e cervejarias na serra."]],
  cultNote:"<b>Chuvas:</b> a cidade tem histórico de deslizamentos em chuvas fortes. Ao escolher onde morar, evite áreas de encosta e pergunte sobre o histórico do imóvel."}));

S(Object.assign({}, RJ, {id:"valenca", cidade:"Valença", coord:"22°14′S 43°42′W · Vale do Café · UTC−3",
  tags:["1º Esqd C L","Cavalaria","Vale do Café"], destaque:"Interior",
  resumo:"Cidade do Vale do Café fluminense, com fazendas históricas. Sede do 1º Esquadrão de Cavalaria Leve.",
  lede:"Cidade tranquila do interior do Rio, perto de Conservatória, a vila das serestas.",
  fatos:[POP("~68 mil"),FUSO,["Até o Rio","~160 km","por rodovia"],["Região","Vale do Café","fazendas históricas"],["OM","1º Esqd C L","cavalaria leve"],["Grande Comando","CML","1ª RM"]],
  om:[["1º Esqd C L","Esquadrão de Cavalaria Leve"]],
  acessoP:"O acesso é por rodovia, a cerca de 160 km do Rio de Janeiro e perto da divisa com Minas Gerais.",
  edu:TXT.semCM+" A cidade tem faculdades regionais.",
  climaObj:SERRA,
  places:[["~35 km","Conservatória","Vila conhecida pelas serestas nas ruas."],["Região","Fazendas do café","Casarões do século XIX abertos à visitação."]]}));

/* ---------- CML-2: Norte fluminense, ES e Zona da Mata ---------- */
S(Object.assign({}, RJ, {id:"campos-dos-goytacazes", cidade:"Campos dos Goytacazes", coord:"21°45′S 41°19′W · Norte fluminense · UTC−3",
  tags:["2ª Cia Inf","Norte fluminense"], destaque:"Polo regional",
  resumo:"Maior cidade do interior fluminense, polo do norte do estado. Sede da 2ª Companhia de Infantaria.",
  lede:"Cidade de economia ligada ao petróleo e à cana, a cerca de 280 km do Rio.",
  fatos:[POP("~483 mil"),FUSO,["Até o Rio","~280 km","BR-101"],["Região","Norte fluminense","petróleo e cana"],["OM","2ª Cia Inf","infantaria"],["Grande Comando","CML","1ª RM"]],
  om:[["2ª Cia Inf","Companhia de Infantaria"]],
  acessoP:"A cidade fica na BR-101, a cerca de 280 km do Rio, e tem aeroporto regional.",
  edu:TXT.semCM+" A cidade tem a UENF, o IFF e campus da UFF.",
  cultP:["Polo do norte fluminense, perto das praias de Farol de São Tomé."]}));

S(Object.assign({}, RJ, {id:"macae", cidade:"Macaé", coord:"22°22′S 41°47′W · litoral norte fluminense · UTC−3",
  tags:["9ª Bia AAAe","Petróleo"], destaque:"Interior",
  resumo:"Capital nacional do petróleo, no litoral norte fluminense. Sede da 9ª Bateria de Artilharia Antiaérea.",
  lede:"Cidade movida pela indústria do petróleo, com aluguel puxado pela demanda das empresas do setor.",
  fatos:[POP("~246 mil"),FUSO,["Até o Rio","~190 km","BR-101"],["Economia","Petróleo","Bacia de Campos"],["OM","9ª Bia AAAe","artilharia antiaérea"],["Grande Comando","CML","1ª RM"]],
  om:[["9ª Bia AAAe","Bateria de Artilharia Antiaérea"]],
  acessoP:"A cidade fica a cerca de 190 km do Rio, pela BR-101, e tem aeroporto com voos ligados ao setor de petróleo.",
  custoP:"A indústria do petróleo pressiona o aluguel e os serviços.",
  edu:TXT.semCM+" A cidade tem campus da UFRJ, da UFF e do IFF.",
  places:[["~50 km","Búzios e Rio das Ostras","Praias da Região dos Lagos e do litoral norte."]]}));

S({id:"vila-velha", cidade:"Vila Velha", uf:"ES", estado:"Espírito Santo", coord:"20°20′S 40°17′W · Grande Vitória · UTC−3",
  tags:["38º BI","Convento da Penha","Praias"], destaque:"Região Metropolitana",
  resumo:"Cidade mais antiga do Espírito Santo, na Grande Vitória, com praias urbanas. Sede do 38º Batalhão de Infantaria.",
  lede:"Cidade litorânea vizinha de Vitória, ligada à capital pela Terceira Ponte.",
  fatos:[POP("~467 mil"),FUSO,["Até Vitória","~10 km","Terceira Ponte"],["Cesta (Vitória)","R$ 790","DIEESE, ago/2026"],["OM","38º BI","infantaria"],["Grande Comando","CML","1ª RM"]],
  om:[["38º BI","Batalhão de Infantaria"]],
  acessoP:"A cidade é vizinha de Vitória, cujo aeroporto tem voos para várias capitais. A BR-101 liga a Grande Vitória ao Rio e à Bahia.",
  custoObj:{p:["Em Vitória, vizinha, o aluguel médio era de R$ 54,16 por m² em fevereiro de 2026 pelo FipeZAP, com alta de quase 19% em 12 meses. A cesta básica na capital custou R$ 790,00 em agosto de 2026, segundo o DIEESE."], note:TXT.pendAluguel, src:[SRC.fipe,SRC.dieese]},
  ref:HCE,
  edu:TXT.semCM+" A Grande Vitória tem a UFES, o IFES e várias faculdades.",
  places:[["Cidade","Convento da Penha","Igreja do século XVI no alto de um morro, com vista da baía."],["Cidade","Praia da Costa","Orla urbana movimentada."]]});

S(Object.assign({}, M, {id:"juiz-de-fora", cidade:"Juiz de Fora", coord:"21°45′S 43°21′W · Zona da Mata · UTC−3",
  tags:["4ª Bda Inf L Mth","Colégio Militar","H Gu Juiz de Fora","Montanha"], destaque:"Sede de Brigada",
  resumo:"Polo da Zona da Mata mineira. Sede da 4ª Brigada de Infantaria Leve de Montanha, de Colégio Militar e de Hospital de Guarnição.",
  lede:"Cidade universitária com estrutura completa para famílias militares, a cerca de 180 km do Rio e 270 km de Belo Horizonte.",
  fatos:[POP("~540 mil"),FUSO,["Até o Rio","~180 km","BR-040"],["Saúde militar","H Gu","Hospital de Guarnição"],["Ensino","Colégio Militar","de Juiz de Fora"],["Grande Comando","CML","4ª Bda Inf L Mth"]],
  om:[["Cmdo 4ª Bda Inf L Mth e Cia Cmdo","Brigada de Infantaria Leve de Montanha"],["10º BI L Mth","Infantaria leve de montanha"],["4º GAC L Mth","Artilharia de campanha"],["17º B Log L Mth","Batalhão Logístico"],["35º Pel PE","Polícia do Exército"],["H Gu Juiz de Fora","Hospital de Guarnição"],["Colégio Militar de Juiz de Fora","Sistema Colégio Militar do Brasil"]],
  acessoP:"A cidade fica na BR-040, entre o Rio e Belo Horizonte, e tem aeroporto regional.",
  custoP:"Cidade universitária, com boa oferta de imóveis e comércio completo.",
  saudeObj:{p:["A guarnição tem o <b>Hospital de Guarnição de Juiz de Fora</b>, que atende os beneficiários do FuSEx, além de rede conveniada ampla."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar de Juiz de Fora</b> e a Universidade Federal de Juiz de Fora (UFJF), além de faculdades particulares.",
  places:[["Cidade","Museu Mariano Procópio","Acervo do período imperial."],["Região","Serras da Zona da Mata","Cachoeiras e cidades históricas próximas."]],
  chegadaX:["Peça vaga no Colégio Militar de Juiz de Fora seguindo o calendário de matrícula de dependentes."]}));

S(Object.assign({}, M, {id:"santos-dumont", cidade:"Santos Dumont", coord:"21°27′S 43°33′W · Zona da Mata · UTC−3",
  tags:["4º Esqd C Mec","Cavalaria"], destaque:"Interior",
  resumo:"Terra natal de Alberto Santos Dumont, na Zona da Mata mineira. Sede do 4º Esquadrão de Cavalaria Mecanizado.",
  lede:"Cidade pequena a cerca de 45 km de Juiz de Fora, que é a referência para serviços.",
  fatos:[POP("~46 mil"),FUSO,["Até Juiz de Fora","~45 km","BR-040"],["História","Cabangu","casa natal de Santos Dumont"],["OM","4º Esqd C Mec","cavalaria mecanizada"],["Grande Comando","CML","4ª RM"]],
  om:[["4º Esqd C Mec","Esquadrão de Cavalaria Mecanizado"]],
  acessoP:"A cidade fica na BR-040, a cerca de 45 km de Juiz de Fora.",
  edu:TXT.semCM+" O Colégio Militar de Juiz de Fora e a UFJF ficam a cerca de 45 km.",
  places:[["Município","Museu de Cabangu","Casa onde nasceu Santos Dumont."]]}));

/* ---------- CML-3: BH e interior ---------- */
S(Object.assign({}, M, {id:"belo-horizonte", cidade:"Belo Horizonte", coord:"19°55′S 43°56′W · alt. 850 m · UTC−3",
  tags:["4ª RM","12º BI","Colégio Militar"], destaque:"Capital",
  resumo:"Capital mineira e sede da 4ª Região Militar. Tem Colégio Militar e estrutura de metrópole.",
  lede:"Capital planejada, cercada de montanhas, com culinária famosa e acesso às cidades históricas de Minas.",
  fatos:[POP("~2,3 mi"),FUSO,["Aluguel","R$ 48/m²","FipeZAP, fev/2026"],["Clima","15–29 °C","inverno seco"],["Cesta básica","R$ 760","DIEESE, ago/2026"],["Grande Comando","CML","4ª RM"]],
  om:[["4ª RM","Região Militar"],["12º BI","Batalhão de Infantaria"],["4ª Cia PE e 4ª Cia Com","Polícia do Exército e comunicações"],["11ª CSM","Circunscrição de Serviço Militar"],["Colégio Militar de Belo Horizonte","Sistema Colégio Militar do Brasil"]],
  acessoP:"O aeroporto de Confins tem voos para todo o país. A cidade é cortada pela BR-040, pela BR-381 e pela BR-262.",
  custoObj:{p:[TXT.fipe("Belo Horizonte","48,28","+10,52%"),TXT.cesta("Belo Horizonte","759,55")], src:[SRC.fipe,SRC.dieese]},
  ref:"Juiz de Fora, que tem Hospital de Guarnição, ou à ampla rede conveniada da capital",
  edu:"A cidade tem o <b>Colégio Militar de Belo Horizonte</b>. No ensino superior há a UFMG, o CEFET-MG, a PUC Minas e muitas outras instituições.",
  places:[["Cidade","Pampulha","Conjunto de Oscar Niemeyer, Patrimônio Mundial."],["Cidade","Mercado Central","Queijos, doces e cachaça."],["~100 km","Ouro Preto","Cidade histórica do ciclo do ouro."],["~60 km","Inhotim","Museu de arte contemporânea a céu aberto."]],
  chegadaX:["Peça vaga no Colégio Militar de Belo Horizonte seguindo o calendário de matrícula de dependentes."]}));

S(Object.assign({}, M, {id:"sete-lagoas", cidade:"Sete Lagoas", coord:"19°28′S 44°15′W · UTC−3",
  tags:["4º GAAAe","Gruta Rei do Mato"], destaque:"Interior",
  resumo:"Cidade a cerca de 70 km de Belo Horizonte, com lagoas urbanas. Sede do 4º Grupo de Artilharia Antiaérea.",
  lede:"Cidade de porte médio na região metropolitana expandida de BH, perto do aeroporto de Confins.",
  fatos:[POP("~227 mil"),FUSO,["Até BH","~70 km","BR-040"],["Lazer","Gruta Rei do Mato","caverna turística"],["OM","4º GAAAe","artilharia antiaérea"],["Grande Comando","CML","OM da 1ª Bda AAAe"]],
  om:[["4º GAAAe","Grupo de Artilharia Antiaérea, enquadrado pela 1ª Bda AAAe"]],
  omSrc:[SRC.CMSE],
  acessoP:"A cidade fica na BR-040, a cerca de 70 km de Belo Horizonte e perto do aeroporto de Confins.",
  edu:TXT.semCM+" A cidade tem campus da UFSJ e faculdades particulares.",
  places:[["~10 km","Gruta Rei do Mato","Caverna com formações calcárias."],["Cidade","Lagoa Paulino","Lagoa urbana com calçadão."]]}));

S(Object.assign({}, M, {id:"montes-claros", cidade:"Montes Claros", coord:"16°44′S 43°52′W · Norte de Minas · UTC−3",
  tags:["55º BI","Norte de Minas"], destaque:"Polo regional",
  resumo:"Capital do Norte de Minas, polo de comércio e serviços. Sede do 55º Batalhão de Infantaria.",
  lede:"Cidade grande e quente do sertão mineiro, a cerca de 420 km de Belo Horizonte.",
  fatos:[POP("~414 mil"),FUSO,["Até BH","~420 km","BR-135 e BR-040"],["Clima","Quente e seco","semiárido no inverno"],["OM","55º BI","infantaria"],["Grande Comando","CML","4ª RM"]],
  om:[["55º BI","Batalhão de Infantaria"]],
  acessoP:"A cidade tem aeroporto com voos para Belo Horizonte e outras capitais.",
  custoP:"Polo regional com comércio e serviços completos.",
  ref:"Belo Horizonte",
  edu:TXT.semCM+" A cidade tem a Unimontes, campus da UFMG e do IFNMG.",
  climaObj:{p:["Quente, com chuvas de novembro a março e inverno muito seco."], clima:"cccssssssscc", leg:["Chuvoso (nov–mar)","Seco (abr–out)"]},
  places:[["Agosto","Festas de Agosto","Festa tradicional com catopês e marujos."]]}));

S(Object.assign({}, M, {id:"sao-joao-del-rei", cidade:"São João del-Rei", coord:"21°08′S 44°16′W · Campo das Vertentes · UTC−3",
  tags:["11º BI Mth","Cidade histórica"], destaque:"Interior",
  resumo:"Cidade histórica do ciclo do ouro, vizinha de Tiradentes. Sede do 11º Batalhão de Infantaria de Montanha.",
  lede:"Cidade de igrejas barrocas e tradição musical, com a Maria Fumaça até Tiradentes.",
  fatos:[POP("~90 mil"),FUSO,["Até BH","~180 km","BR-040 e BR-383"],["Vizinha","Tiradentes","~13 km"],["OM","11º BI Mth","infantaria de montanha"],["Grande Comando","CML","4ª Bda Inf L Mth"]],
  om:[["11º BI Mth","Batalhão de Infantaria de Montanha"]],
  acessoP:"A cidade fica a cerca de 180 km de Belo Horizonte e tem aeroporto regional.",
  edu:TXT.semCM+" A cidade tem a Universidade Federal de São João del-Rei (UFSJ).",
  places:[["Centro","Igrejas barrocas","São Francisco de Assis e outras igrejas do século XVIII."],["~13 km","Tiradentes","De Maria Fumaça, pela ferrovia histórica."]]}));

/* ---------- CML-4: Resende e Sul de Minas ---------- */
S(Object.assign({}, RJ, {id:"resende", cidade:"Resende", coord:"22°28′S 44°27′W · Vale do Paraíba · UTC−3",
  tags:["AMAN","Ensino","Itatiaia"], destaque:"AMAN",
  resumo:"Cidade da Academia Militar das Agulhas Negras, no Vale do Paraíba fluminense, ao pé do Parque Nacional do Itatiaia.",
  lede:"Sede da AMAN, onde se formam os oficiais combatentes do Exército. Fica na Via Dutra, entre o Rio e São Paulo, com serra e cachoeiras por perto.",
  fatos:[POP("~130 mil"),FUSO,["Até o Rio","~170 km","Via Dutra"],["Até São Paulo","~260 km","Via Dutra"],["Lazer","Itatiaia","Parque Nacional"],["Grande Comando","CML","DECEx"]],
  om:[["AMAN","Academia Militar das Agulhas Negras, subordinada ao Departamento de Educação e Cultura do Exército (DECEx)"]],
  omSrc:[["Exército Brasileiro","https://www.eb.mil.br"]],
  acessoP:"Resende fica na Via Dutra, a cerca de 170 km do Rio e 260 km de São Paulo. Para voos, as referências são os aeroportos do Rio e de São Paulo.",
  custoP:"Cidade com comércio completo, indústria automotiva na região e boa oferta de imóveis.",
  ref:"Rio de Janeiro, que tem o Hospital Central do Exército, ou à rede conveniada da região",
  edu:TXT.semCM+" A região tem a UERJ (Faculdade de Tecnologia), a AEDB e faculdades particulares.",
  places:[["~20 km","Parque Nacional do Itatiaia","Primeiro parque nacional do Brasil, com Agulhas Negras e cachoeiras."],["~25 km","Penedo","Vila de colonização finlandesa."],["~60 km","Visconde de Mauá","Vale com pousadas e cachoeiras."]]}));

const SM = (o)=>S(Object.assign({}, M, o));
SM({id:"tres-coracoes", cidade:"Três Corações", coord:"21°41′S 45°15′W · Sul de Minas · UTC−3",
  tags:["EsSA","Ensino","Sul de Minas"], destaque:"EsSA",
  resumo:"Cidade da Escola de Sargentos das Armas, no Sul de Minas. Terra natal de Pelé.",
  lede:"Sede da EsSA, onde se formam os sargentos combatentes do Exército, na Rodovia Fernão Dias.",
  fatos:[POP("~75 mil"),FUSO,["Até BH","~280 km","Fernão Dias"],["Até São Paulo","~300 km","Fernão Dias"],["OM","EsSA","Escola de Sargentos das Armas"],["Grande Comando","CML","DECEx"]],
  om:[["EsSA","Escola de Sargentos das Armas, subordinada ao DECEx"]],
  acessoP:"A cidade fica perto da Rodovia Fernão Dias, entre Belo Horizonte e São Paulo, e tem aeroporto regional.",
  edu:TXT.semCM+" A cidade e a vizinha Varginha têm faculdades regionais.",
  climaObj:SERRA,
  places:[["Cidade","Casa de Pelé","Museu na casa onde nasceu o jogador."],["Região","Circuito das Águas","São Lourenço, Caxambu e Lambari."]]});

SM({id:"itajuba", cidade:"Itajubá", coord:"22°25′S 45°27′W · Sul de Minas · UTC−3",
  tags:["4º BE Cmb","UNIFEI","Sul de Minas"], destaque:"Interior",
  resumo:"Cidade universitária do Sul de Minas, na Serra da Mantiqueira. Sede do 4º Batalhão de Engenharia de Combate.",
  lede:"Cidade de clima ameno, conhecida pela universidade federal de engenharia e pela fábrica de armas da IMBEL.",
  fatos:[POP("~94 mil"),FUSO,["Até São Paulo","~250 km","BR-459 e Fernão Dias"],["Ensino","UNIFEI","engenharia"],["OM","4º BE Cmb","engenharia de combate"],["Grande Comando","CML","4ª RM"]],
  om:[["4º BE Cmb","Batalhão de Engenharia de Combate (designação a confirmar na fonte oficial)"]],
  acessoP:"A cidade fica na BR-459, perto da Fernão Dias, a cerca de 250 km de São Paulo.",
  edu:TXT.semCM+" A cidade tem a Universidade Federal de Itajubá (UNIFEI).",
  climaObj:SERRA,
  cultP:["Cidade universitária na Serra da Mantiqueira, perto de cidades turísticas como Maria da Fé e Gonçalves."]});

SM({id:"pouso-alegre", cidade:"Pouso Alegre", coord:"22°13′S 45°56′W · Sul de Minas · UTC−3",
  tags:["14º GAC","Sul de Minas"], destaque:"Polo regional",
  resumo:"Polo do Sul de Minas, na Rodovia Fernão Dias. Sede do 14º Grupo de Artilharia de Campanha.",
  lede:"Cidade em crescimento, com indústria e serviços, a cerca de 200 km de São Paulo.",
  fatos:[POP("~152 mil"),FUSO,["Até São Paulo","~200 km","Fernão Dias"],["Região","Sul de Minas","polo industrial"],["OM","14º GAC","artilharia de campanha"],["Grande Comando","CML","4ª RM"]],
  om:[["14º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"A cidade fica na Rodovia Fernão Dias, entre São Paulo e Belo Horizonte, e tem aeroporto regional.",
  custoP:"Polo regional com comércio e serviços completos.",
  edu:TXT.semCM+" A cidade tem a Univás, campus do IFSULDEMINAS e faculdades particulares.",
  climaObj:SERRA,
  cultP:["Base para conhecer a Serra da Mantiqueira e o Circuito das Águas."]});
})();
