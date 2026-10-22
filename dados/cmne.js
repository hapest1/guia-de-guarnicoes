/* Comando Militar do Nordeste (lotes CMNE-1 a CMNE-5) */
(function(){
const W = SRC.CMNE;
const FUSO = ["Fuso","0 h","horário de Brasília"];
const POP = (v)=>["População",v,"Censo 2022, aprox."];
const POPI = (v)=>["População",v,"estimativa IBGE 2025"];
const COSTA = {p:["Quente o ano todo, com brisa do mar. As chuvas se concentram entre abril e julho, e o resto do ano é ensolarado."], clima:"sssccccsssss", leg:["Chuvoso (abr–jul)","Seco (ago–mar)"]};
const SERTAO = {p:["Semiárido, quente e seco a maior parte do ano. As chuvas são poucas e irregulares, concentradas entre dezembro e abril."], clima:"ccccsssssssc", leg:["Chuvas (dez–abr)","Seco (mai–nov)"]};
const AGRESTE = {p:["Clima mais ameno que o do litoral por causa da altitude, com noites frescas no meio do ano, quando se concentram as chuvas."], clima:"sssccccsssss", leg:["Chuvoso (abr–jul)","Seco (ago–mar)"]};
const HMAR = "Recife, que tem o Hospital Militar de Área";
const S = (o)=>addG(Object.assign({regiao:"Nordeste", comando:"CMNE",
  acesso:{p:[o.acessoP]},
  custo:o.custoObj || {p:[o.custoP||"Cidade com comércio e serviços para o dia a dia."], note:TXT.pendAluguel},
  saude:o.saudeObj || {p:[`Casos especializados costumam ser encaminhados a ${o.ref||HMAR}.`], note:TXT.pendSaude},
  educacao:{p:[o.edu]},
  clima:o.climaObj || COSTA,
  cultura:{p:o.cultP||[], places:o.places, note:o.cultNote},
  chegada:o.chegadaX||[]
}, o));
const CAP = (cid,uf,fv,fvar,cv)=>({p:[TXT.fipe(cid,fv,fvar),TXT.cesta(cid,cv)], src:[SRC.fipe,SRC.dieese]});
const HG = (cid)=>({p:[`A guarnição tem o <b>Hospital de Guarnição de ${cid}</b>, que atende os beneficiários do FuSEx, além de rede conveniada. Casos de maior complexidade podem ser encaminhados ao Hospital Militar de Área de Recife.`], src:[W]});
const PE = {uf:"PE", estado:"Pernambuco"};

/* ---------- CMNE-1: Recife e Pernambuco ---------- */
S(Object.assign({}, PE, {id:"recife", cidade:"Recife", coord:"08°03′S 34°53′W · UTC−3",
  tags:["CMNE","7ª RM","7ª DE","10ª Bda Inf Mtz","Colégio Militar","Hospital Militar"], destaque:"Sede do CMNE",
  resumo:"Capital pernambucana e sede do Comando Militar do Nordeste, da 7ª Região Militar e da 7ª Divisão de Exército. Tem Colégio Militar e Hospital Militar de Área.",
  lede:"Metrópole do Nordeste, cortada por rios e pontes, com praias urbanas, Carnaval famoso e Olinda ao lado.",
  fatos:[POPI("1,59 mi"),FUSO,["Aluguel","R$ 62/m²","FipeZAP, fev/2026"],["Clima","23–31 °C","chuvas de abril a julho"],["Cesta básica","R$ 643","DIEESE, ago/2026"],["Grande Comando","CMNE","7ª RM / 7ª DE"]],
  omP:["Recife é sede do <b>Comando Militar do Nordeste</b>, da <b>7ª Região Militar</b> e da <b>7ª Divisão de Exército</b>."],
  om:[["CMNE e Cia Cmdo","Comando Militar de Área"],["7ª RM e 7ª DE","Região Militar e Divisão de Exército"],["Cmdo 10ª Bda Inf Mtz","Brigada de Infantaria Motorizada"],["Hospital Militar de Área de Recife","Referência de saúde do Exército no Nordeste"],["Colégio Militar do Recife","Sistema Colégio Militar do Brasil"],["Outras","4º B Com, 4º BPE, 10º Esqd C Mec, 14º B Log, 7º D Sup, Parque Regional de Manutenção, entre outras"]],
  acessoP:"O Aeroporto Internacional dos Guararapes tem voos para todo o país e para o exterior. A BR-101 e a BR-232 ligam a cidade ao litoral e ao interior.",
  custoObj:CAP("Recife","PE","62,29","+10,34%","643,02"),
  saudeObj:{p:["A guarnição tem o <b>Hospital Militar de Área de Recife</b>, que atende os beneficiários do FuSEx e recebe casos de outras guarnições do Nordeste, além de rede conveniada ampla."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar do Recife</b>. No ensino superior há a UFPE, a UFRPE, a UPE, o IFPE e muitas faculdades particulares.",
  places:[["Cidade","Recife Antigo","Bairro histórico com o Marco Zero e o Paço do Frevo."],["Fevereiro","Carnaval","Galo da Madrugada e frevo em Recife e Olinda."],["~60 km","Porto de Galinhas","Piscinas naturais no litoral sul."]],
  cultNote:"<b>Praia de Boa Viagem:</b> há risco de ataques de tubarão em trechos da orla. Respeite as placas e nade só onde é permitido.",
  chegadaX:["Peça vaga no Colégio Militar do Recife seguindo o calendário de matrícula de dependentes."]}));

const PEm = (o)=>S(Object.assign({}, PE, o));
PEm({id:"jaboatao-dos-guararapes", cidade:"Jaboatão dos Guararapes", coord:"08°07′S 35°00′W · Região Metropolitana · UTC−3",
  tags:["14º BI Mtz","Montes Guararapes"], destaque:"Região Metropolitana",
  resumo:"Cidade da Região Metropolitana do Recife, onde ficam os Montes Guararapes, berço do Exército Brasileiro. Sede do 14º BI Motorizado.",
  lede:"Nos Montes Guararapes foram travadas as batalhas de 1648 e 1649, cuja data deu origem ao Dia do Exército. A cidade é vizinha do Recife, com praias como Piedade.",
  fatos:[POPI("684 mil"),FUSO,["Até Recife","~15 km","BR-101"],["História","1648","Batalhas dos Guararapes"],["OM","14º BI Mtz","infantaria motorizada"],["Grande Comando","CMNE","10ª Bda Inf Mtz"]],
  om:[["14º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"A cidade fica ao lado do Recife e perto do aeroporto dos Guararapes.",
  edu:TXT.semCM+" O Colégio Militar do Recife e as universidades da capital ficam perto.",
  places:[["Cidade","Parque Histórico Nacional dos Guararapes","Local das batalhas e Igreja de Nossa Senhora dos Prazeres."],["Cidade","Praia de Piedade","Orla urbana vizinha a Boa Viagem."]]});

PEm({id:"olinda", cidade:"Olinda", coord:"08°00′S 34°51′W · Região Metropolitana · UTC−3",
  tags:["7º GAC","Patrimônio Mundial","Carnaval"], destaque:"Região Metropolitana",
  resumo:"Cidade histórica vizinha do Recife, Patrimônio Mundial da Unesco. Sede do 7º Grupo de Artilharia de Campanha.",
  lede:"Casario colonial no alto das colinas, ladeiras famosas pelo Carnaval de rua e vista para o Recife.",
  fatos:[POPI("365 mil"),FUSO,["Até Recife","~7 km","por avenidas"],["Patrimônio","Unesco","centro histórico"],["OM","7º GAC","artilharia de campanha"],["Grande Comando","CMNE","7ª DE"]],
  om:[["7º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"Olinda é vizinha do Recife, ligada por avenidas.",
  edu:TXT.semCM+" O Colégio Militar do Recife e as universidades da capital ficam perto.",
  places:[["Centro","Sítio histórico","Igrejas, conventos e casarões coloniais."],["Fevereiro","Carnaval de Olinda","Bonecos gigantes e frevo nas ladeiras."]]});

PEm({id:"garanhuns", cidade:"Garanhuns", coord:"08°53′S 36°29′W · alt. 900 m · UTC−3",
  tags:["71º BI Mtz","Agreste","Festival de Inverno"], destaque:"Interior",
  resumo:"A Suíça Pernambucana, no agreste, com clima ameno. Sede do 71º Batalhão de Infantaria Motorizado.",
  lede:"Cidade de altitude, conhecida pelo Festival de Inverno e pelo frio do meio do ano, a cerca de 230 km do Recife.",
  fatos:[POPI("152 mil"),FUSO,["Até Recife","~230 km","BR-232 e BR-423"],["Altitude","~900 m","clima ameno"],["Festa","Festival de Inverno","em julho"],["Grande Comando","CMNE","7ª RM"]],
  om:[["71º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"A cidade fica a cerca de 230 km do Recife, por rodovias asfaltadas, e tem aeroporto regional.",
  edu:TXT.semCM+" A cidade tem campus da UPE, da UFAPE e do IFPE.",
  climaObj:AGRESTE,
  places:[["Julho","Festival de Inverno de Garanhuns","Música, teatro e gastronomia no frio do agreste."]]});

PEm({id:"sao-bento-do-una", cidade:"São Bento do Una", coord:"08°31′S 36°26′W · Agreste · UTC−3",
  tags:["10ª Cia E Cmb","Agreste"], destaque:"Interior",
  resumo:"Cidade do agreste pernambucano. Sede da 10ª Companhia de Engenharia de Combate.",
  lede:"Cidade pequena do agreste, a cerca de 200 km do Recife, com Caruaru e Garanhuns como polos próximos.",
  fatos:[POPI("51 mil"),FUSO,["Até Recife","~200 km","BR-232"],["Região","Agreste","perto de Caruaru"],["OM","10ª Cia E Cmb","engenharia de combate"],["Grande Comando","CMNE","7ª RM"]],
  om:[["10ª Cia E Cmb","Companhia de Engenharia de Combate"]],
  acessoP:"O acesso é pela BR-232 e rodovias estaduais. Caruaru, a cerca de 70 km, é o polo regional.",
  edu:TXT.semCM+" Caruaru e Garanhuns concentram faculdades e universidades da região.",
  climaObj:AGRESTE,
  places:[["~70 km","Caruaru","Feira de Caruaru e o São João mais famoso de Pernambuco."]]});

/* ---------- CMNE-2: São Francisco, Alagoas e Sergipe ---------- */
PEm({id:"petrolina", cidade:"Petrolina", coord:"09°23′S 40°30′W · rio São Francisco · UTC−3",
  tags:["72º BI Mtz","Vale do São Francisco","Juazeiro"], destaque:"Polo regional",
  resumo:"Polo do Vale do São Francisco, de fruticultura irrigada, em frente a Juazeiro (BA). Sede do 72º Batalhão de Infantaria Motorizado.",
  lede:"Cidade do sertão que virou polo de uvas, mangas e vinhos, à beira do São Francisco.",
  fatos:[POPI("418 mil"),FUSO,["Vizinha","Juazeiro (BA)","ponte sobre o São Francisco"],["Até Recife","~710 km","BR-232 e BR-428"],["Economia","Fruticultura","uva, manga e vinho"],["Grande Comando","CMNE","7ª RM"]],
  om:[["72º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"Petrolina tem aeroporto com voos para várias capitais. Fica a cerca de 710 km do Recife.",
  custoP:"Polo regional com comércio e serviços completos.",
  edu:TXT.semCM+" A cidade tem a Univasf, a UPE e o IF Sertão.",
  climaObj:SERTAO,
  places:[["Região","Vinícolas do São Francisco","Vinhos tropicais do Vale."],["Rio","Ilhas do São Francisco","Passeios de barco e praias de rio."]], cultNote:TXT.rios});

S({id:"paulo-afonso", cidade:"Paulo Afonso", uf:"BA", estado:"Bahia", coord:"09°24′S 38°13′W · rio São Francisco · UTC−3",
  tags:["1ª Cia Inf","Chesf","Cânion"], destaque:"Interior",
  resumo:"Cidade das usinas hidrelétricas da Chesf, no cânion do São Francisco. Sede da 1ª Companhia de Infantaria.",
  lede:"Cidade do sertão baiano, na divisa com Pernambuco e Alagoas, cercada pelo cânion do rio São Francisco.",
  fatos:[POP("~112 mil"),FUSO,["Até Salvador","~470 km","por rodovia"],["Destaque","Usinas","complexo da Chesf"],["OM","1ª Cia Inf","infantaria"],["Grande Comando","CMNE","6ª RM"]],
  om:[["1ª Cia Inf","Companhia de Infantaria"]],
  acessoP:"A cidade tem aeroporto regional e fica a cerca de 470 km de Salvador.",
  ref:"Salvador ou Recife",
  edu:TXT.semCM+" A cidade tem campus da UNEB e do IFBA.",
  climaObj:SERTAO,
  places:[["Rio","Cânion do São Francisco","Passeios de barco entre paredões de rocha."]], cultNote:TXT.rios});

S({id:"maceio", cidade:"Maceió", uf:"AL", estado:"Alagoas", coord:"09°40′S 35°44′W · UTC−3",
  tags:["59º BI Mtz","Praias"], destaque:"Capital",
  resumo:"Capital alagoana, de praias de águas verdes e piscinas naturais. Sede do 59º Batalhão de Infantaria Motorizado.",
  lede:"Cidade litorânea com orla urbana movimentada e destinos como Maragogi e São Miguel dos Milagres por perto.",
  fatos:[POP("~957 mil"),FUSO,["Aluguel","R$ 57/m²","FipeZAP, fev/2026"],["Clima","22–31 °C","chuvas de abril a julho"],["Cesta básica","R$ 627","DIEESE, ago/2026"],["Grande Comando","CMNE","7ª RM"]],
  om:[["59º BI Mtz","Batalhão de Infantaria Motorizado"],["20ª CSM","Circunscrição de Serviço Militar"]],
  acessoP:"O aeroporto tem voos para várias capitais. A BR-101 e a BR-104 ligam a cidade a Recife e a Aracaju.",
  custoObj:CAP("Maceió","AL","56,64","+11,11%","627,45"),
  edu:TXT.semCM+" A cidade tem a UFAL, a UNCISAL, o IFAL e faculdades particulares.",
  places:[["Cidade","Pajuçara","Jangadas até as piscinas naturais."],["~130 km","Maragogi","Galés e praias do litoral norte."]],
  cultNote:"<b>Bairros afetados:</b> o afundamento do solo causado pela mineração atingiu bairros como Pinheiro e Mutange. Pergunte sobre a área antes de alugar."});

S({id:"aracaju", cidade:"Aracaju", uf:"SE", estado:"Sergipe", coord:"10°55′S 37°03′W · UTC−3",
  tags:["28º BC","Orla de Atalaia"], destaque:"Capital",
  resumo:"Capital sergipana, planejada e tranquila, com a cesta básica mais barata entre as capitais. Sede do 28º Batalhão de Caçadores.",
  lede:"Uma das capitais com melhor custo de vida do país, com orla extensa e vida calma.",
  fatos:[POP("~602 mil"),FUSO,["Aluguel","R$ 32/m²","FipeZAP, fev/2026"],["Clima","22–31 °C","chuvas de abril a julho"],["Cesta básica","R$ 571","DIEESE, ago/2026, a mais barata"],["Grande Comando","CMNE","6ª RM"]],
  om:[["28º BC","Batalhão de Caçadores"]],
  acessoP:"O aeroporto tem voos para várias capitais. A BR-101 liga a cidade a Salvador e a Maceió.",
  custoObj:{p:[TXT.fipe("Aracaju","31,94","+10,60%"),TXT.cesta("Aracaju","570,98")+" É a cesta mais barata entre as capitais."], src:[SRC.fipe,SRC.dieese]},
  ref:"Salvador ou Recife",
  edu:TXT.semCM+" A cidade tem a UFS, o IFS e faculdades particulares.",
  places:[["Cidade","Orla de Atalaia","Calçadão com lagos, quadras e restaurantes."],["Barco","Cânion do Xingó","Passeio no São Francisco, a cerca de 200 km."]]});

/* ---------- CMNE-3: Paraíba e Rio Grande do Norte ---------- */
const PB = {uf:"PB", estado:"Paraíba"};
S(Object.assign({}, PB, {id:"joao-pessoa", cidade:"João Pessoa", coord:"07°07′S 34°52′W · ponto mais oriental das Américas · UTC−3",
  tags:["1º Gpt E","15º BI Mtz","H Gu João Pessoa"], destaque:"Capital",
  resumo:"Capital paraibana, onde fica o ponto mais oriental das Américas. Sede do 1º Grupamento de Engenharia, do 15º BI Mtz e de um Hospital de Guarnição.",
  lede:"Cidade verde e tranquila, com orla sem prédios altos e uma das melhores relações entre qualidade de vida e custo no Nordeste.",
  fatos:[POPI("898 mil"),FUSO,["Aluguel","R$ 50/m²","FipeZAP, fev/2026"],["Saúde militar","H Gu","Hospital de Guarnição"],["Cesta básica","R$ 641","DIEESE, ago/2026"],["Grande Comando","CMNE","1º Gpt E"]],
  om:[["1º Gpt E e Cia Cmdo","Grupamento de Engenharia"],["15º BI Mtz","Batalhão de Infantaria Motorizado"],["H Gu João Pessoa","Hospital de Guarnição"],["23ª CSM","Circunscrição de Serviço Militar"]],
  acessoP:"O aeroporto, em Bayeux, tem voos para várias capitais. A BR-101 liga a cidade a Recife (cerca de 120 km) e a Natal.",
  custoObj:CAP("João Pessoa","PB","49,75","+12,64%","641,13"),
  saudeObj:HG("João Pessoa"),
  edu:TXT.semCM+" A cidade tem a UFPB, o IFPB e faculdades particulares.",
  places:[["Cidade","Ponta do Seixas","Ponto mais oriental das Américas."],["Cidade","Tambaú e Cabo Branco","Orla com ciclovia e piscinas naturais."]]}));

S(Object.assign({}, PB, {id:"bayeux", cidade:"Bayeux", coord:"07°08′S 34°56′W · Grande João Pessoa · UTC−3",
  tags:["16º RC Mec","Cavalaria"], destaque:"Região Metropolitana",
  resumo:"Cidade da Grande João Pessoa, onde fica o aeroporto da capital. Sede do 16º Regimento de Cavalaria Mecanizado.",
  lede:"Vizinha de João Pessoa, separada pelo rio Sanhauá. Muitos militares moram na capital.",
  fatos:[POPI("84 mil"),FUSO,["Até João Pessoa","~10 km","BR-230"],["Aeroporto","Castro Pinto","na cidade"],["OM","16º RC Mec","cavalaria mecanizada"],["Grande Comando","CMNE","7ª RM"]],
  om:[["16º RC Mec","Regimento de Cavalaria Mecanizado"]],
  acessoP:"A cidade fica ao lado de João Pessoa, na BR-230, e abriga o aeroporto da capital.",
  ref:"João Pessoa, que tem Hospital de Guarnição",
  edu:TXT.semCM+" As universidades de João Pessoa ficam a poucos quilômetros.",
  cultP:["O lazer da família militar costuma estar em João Pessoa, com praias e orla."]}));

S(Object.assign({}, PB, {id:"campina-grande", cidade:"Campina Grande", coord:"07°13′S 35°53′W · alt. 550 m · UTC−3",
  tags:["31º BI Mtz","São João","Agreste"], destaque:"Polo regional",
  resumo:"Polo do agreste paraibano, com o Maior São João do Mundo. Sede do 31º Batalhão de Infantaria Motorizado.",
  lede:"Cidade universitária e tecnológica, de clima ameno, a cerca de 130 km de João Pessoa.",
  fatos:[POPI("444 mil"),FUSO,["Até João Pessoa","~130 km","BR-230"],["Festa","São João","em junho"],["OM","31º BI Mtz","infantaria motorizada"],["Grande Comando","CMNE","7ª RM"]],
  om:[["31º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"A cidade fica na BR-230, a cerca de 130 km de João Pessoa, e tem aeroporto com voos regionais.",
  custoP:"Polo regional com comércio e serviços completos.",
  ref:"João Pessoa, que tem Hospital de Guarnição, ou Recife",
  edu:TXT.semCM+" A cidade tem a UFCG, a UEPB e o IFPB.",
  climaObj:AGRESTE,
  places:[["Junho","Maior São João do Mundo","Um mês de festa no Parque do Povo."]]}));

const RN = {uf:"RN", estado:"Rio Grande do Norte"};
S(Object.assign({}, RN, {id:"natal", cidade:"Natal", coord:"05°47′S 35°12′W · UTC−3",
  tags:["7ª Bda Inf Mtz","16º BI Mtz","17º GAC","H Gu Natal"], destaque:"Sede de Brigada",
  resumo:"Capital potiguar, de dunas e praias. Sede da 7ª Brigada de Infantaria Motorizada e de um Hospital de Guarnição.",
  lede:"Cidade do sol, com uma das menores taxas de chuva do litoral nordestino e passeios de buggy pelas dunas.",
  fatos:[POPI("784 mil"),FUSO,["Aluguel","R$ 42/m²","FipeZAP, fev/2026"],["Saúde militar","H Gu","Hospital de Guarnição"],["Cesta básica","R$ 627","DIEESE, ago/2026"],["Grande Comando","CMNE","7ª Bda Inf Mtz"]],
  om:[["Cmdo 7ª Bda Inf Mtz e Cia Cmdo","Comando da Brigada"],["16º BI Mtz","Batalhão de Infantaria Motorizado"],["17º GAC","Grupo de Artilharia de Campanha"],["7º BE Cmb","Batalhão de Engenharia de Combate"],["7ª Cia Com e 7º Pel PE","Comunicações e Polícia do Exército"],["H Gu Natal","Hospital de Guarnição"]],
  acessoP:"O aeroporto, em São Gonçalo do Amarante, tem voos para várias capitais. A BR-101 liga a cidade a João Pessoa e Recife.",
  custoObj:CAP("Natal","RN","41,86","+12,59%","627,42"),
  saudeObj:HG("Natal"),
  edu:TXT.semCM+" A cidade tem a UFRN, o IFRN, a UERN e faculdades particulares.",
  places:[["Cidade","Ponta Negra e Morro do Careca","Praia mais famosa da cidade."],["~25 km","Genipabu","Dunas e passeios de buggy."],["Cidade","Forte dos Reis Magos","Fortaleza do século XVI."]]}));

S(Object.assign({}, RN, {id:"caico", cidade:"Caicó", coord:"06°27′S 37°06′W · Seridó · UTC−3",
  tags:["1º BEC","Seridó","Engenharia"], destaque:"Interior",
  resumo:"Capital do Seridó potiguar, no sertão. Sede do 1º Batalhão de Engenharia de Construção.",
  lede:"Cidade sertaneja de tradição, famosa pela carne de sol, pelo queijo de manteiga e pela festa de Sant'Ana.",
  fatos:[POPI("63 mil"),FUSO,["Até Natal","~280 km","BR-226 e BR-427"],["Clima","Semiárido","muito quente"],["OM","1º BEC","engenharia de construção"],["Grande Comando","CMNE","1º Gpt E"]],
  om:[["1º BEC","Batalhão de Engenharia de Construção"]],
  acessoP:"A cidade fica a cerca de 280 km de Natal, por rodovias asfaltadas.",
  ref:"Natal, que tem Hospital de Guarnição",
  edu:TXT.semCM+" A cidade tem campus da UFRN, da UERN e do IFRN.",
  climaObj:SERTAO,
  places:[["Julho","Festa de Sant'Ana","Festa religiosa e popular que reúne a região."]]}));

/* ---------- CMNE-4: Ceará e Piauí ---------- */
S({id:"fortaleza", cidade:"Fortaleza", uf:"CE", estado:"Ceará", coord:"03°43′S 38°31′W · UTC−3",
  tags:["10ª RM","23º BC","Colégio Militar","H Gu Fortaleza"], destaque:"Capital",
  resumo:"Capital cearense e sede da 10ª Região Militar. Tem Colégio Militar, Hospital de Guarnição e aluguel abaixo da média nacional.",
  lede:"Uma das maiores cidades do país, com praias urbanas, vento constante e acesso a Jericoacoara e Canoa Quebrada.",
  fatos:[POPI("2,58 mi"),FUSO,["Aluguel","R$ 38/m²","FipeZAP, fev/2026"],["Clima","24–31 °C","chuvas de fevereiro a maio"],["Cesta básica","R$ 756","DIEESE, ago/2026"],["Grande Comando","CMNE","10ª RM"]],
  om:[["10ª RM e Cia Cmdo","Região Militar"],["23º BC","Batalhão de Caçadores"],["H Gu Fortaleza","Hospital de Guarnição"],["Colégio Militar de Fortaleza","Sistema Colégio Militar do Brasil"],["Outras","10º D Sup, Parque Regional de Manutenção, 25ª CSM, 52º Centro de Telemática"]],
  acessoP:"O aeroporto tem voos para todo o país e para a Europa. A BR-116 e a BR-222 ligam a cidade ao interior e a outras capitais.",
  custoObj:CAP("Fortaleza","CE","38,02","+12,06%","755,56"),
  saudeObj:{p:["A guarnição tem o <b>Hospital de Guarnição de Fortaleza</b>, que atende os beneficiários do FuSEx, além de rede conveniada ampla."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar de Fortaleza</b>. No ensino superior há a UFC, a UECE, o IFCE e muitas faculdades particulares.",
  climaObj:{p:["Quente o ano todo, com vento constante. A quadra chuvosa vai de fevereiro a maio, e o segundo semestre é seco e ensolarado."], clima:"scccccssssss", leg:["Chuvoso (fev–mai)","Seco (jun–jan)"]},
  places:[["Cidade","Beira-Mar e Praia do Futuro","Orla com feirinha e barracas de praia."],["~300 km","Jericoacoara","Dunas, lagoas e pôr do sol."],["~160 km","Canoa Quebrada","Falésias coloridas."]],
  chegadaX:["Peça vaga no Colégio Militar de Fortaleza seguindo o calendário de matrícula de dependentes."]});

S({id:"crateus", cidade:"Crateús", uf:"CE", estado:"Ceará", coord:"05°10′S 40°40′W · Sertão · UTC−3",
  tags:["40º BI","Sertão"], destaque:"Interior",
  resumo:"Cidade do sertão cearense, perto da divisa com o Piauí. Sede do 40º Batalhão de Infantaria.",
  lede:"Polo do sertão dos Inhamuns e Crateús, a cerca de 350 km de Fortaleza.",
  fatos:[POPI("80 mil"),FUSO,["Até Fortaleza","~350 km","BR-020 e BR-226"],["Clima","Semiárido","muito quente"],["OM","40º BI","infantaria"],["Grande Comando","CMNE","10ª RM"]],
  om:[["40º BI","Batalhão de Infantaria"]],
  acessoP:"A cidade fica a cerca de 350 km de Fortaleza, por rodovias asfaltadas.",
  ref:"Fortaleza, que tem Hospital de Guarnição",
  edu:TXT.semCM+" A cidade tem campus da UFC e do IFCE.",
  climaObj:SERTAO,
  cultP:["Cidade sertaneja, com festas juninas e tradição de vaquejada."]});

S({id:"teresina", cidade:"Teresina", uf:"PI", estado:"Piauí", coord:"05°05′S 42°48′W · rios Parnaíba e Poti · UTC−3",
  tags:["25º BC","2º BEC","Capital"], destaque:"Capital",
  resumo:"Capital piauiense, entre os rios Parnaíba e Poti, uma das mais quentes do país. Sede do 25º Batalhão de Caçadores e do 2º BEC.",
  lede:"Única capital do Nordeste fora do litoral, com custo de moradia baixo e calor intenso no segundo semestre.",
  fatos:[POPI("906 mil"),FUSO,["Aluguel","R$ 30/m²","FipeZAP, fev/2026"],["Clima","Muito quente","até 40 °C em set–nov"],["Cesta básica","R$ 690","DIEESE, ago/2026"],["Grande Comando","CMNE","10ª RM"]],
  om:[["25º BC","Batalhão de Caçadores"],["2º BEC","Batalhão de Engenharia de Construção"],["26ª CSM","Circunscrição de Serviço Militar"]],
  acessoP:"O aeroporto tem voos para várias capitais. A cidade é um entroncamento rodoviário entre o Norte e o Nordeste.",
  custoObj:CAP("Teresina","PI","29,51","+18,70%","689,81"),
  ref:"Fortaleza, que tem Hospital de Guarnição, ou Recife",
  edu:TXT.semCM+" A cidade tem a UFPI, a UESPI, o IFPI e faculdades particulares.",
  climaObj:{p:["Muito quente. As chuvas vão de dezembro a abril, e entre setembro e novembro as máximas chegam perto dos 40 °C."], clima:"ccccsssssssc", leg:["Chuvoso (dez–abr)","Seco (mai–nov)"]},
  places:[["Cidade","Encontro dos Rios","Parque no encontro do Parnaíba com o Poti."],["~350 km","Delta do Parnaíba","Ilhas, dunas e passeios de barco no litoral."]]});

S({id:"picos", cidade:"Picos", uf:"PI", estado:"Piauí", coord:"07°05′S 41°28′W · Sertão · UTC−3",
  tags:["3º BEC","Sertão","Engenharia"], destaque:"Interior",
  resumo:"Polo comercial do sertão piauiense, no cruzamento de rodovias federais. Sede do 3º Batalhão de Engenharia de Construção.",
  lede:"Cidade de comércio forte, entre o Piauí, o Ceará e Pernambuco, a cerca de 310 km de Teresina.",
  fatos:[POPI("87 mil"),FUSO,["Até Teresina","~310 km","BR-316"],["Clima","Semiárido","muito quente"],["OM","3º BEC","engenharia de construção"],["Grande Comando","CMNE","1º Gpt E"]],
  om:[["3º BEC","Batalhão de Engenharia de Construção"]],
  acessoP:"A cidade é um entroncamento rodoviário, na BR-316 e na BR-230, a cerca de 310 km de Teresina.",
  ref:"Teresina ou Fortaleza",
  edu:TXT.semCM+" A cidade tem campus da UFPI, da UESPI e do IFPI.",
  climaObj:SERTAO,
  cultP:["Polo comercial do sertão, com feiras e festas tradicionais."]});

/* ---------- CMNE-5: Bahia ---------- */
const BA = {uf:"BA", estado:"Bahia"};
S(Object.assign({}, BA, {id:"salvador", cidade:"Salvador", coord:"12°58′S 38°30′W · Baía de Todos os Santos · UTC−3",
  tags:["6ª RM","19º BC","Colégio Militar","Hospital Geral"], destaque:"Capital",
  resumo:"Primeira capital do Brasil e sede da 6ª Região Militar. Tem Colégio Militar e Hospital Geral do Exército.",
  lede:"Cidade de cultura afro-brasileira, Pelourinho, Carnaval e praias, com trânsito e calor de cidade grande.",
  fatos:[POP("~2,4 mi"),FUSO,["Aluguel","R$ 53/m²","FipeZAP, fev/2026"],["Clima","22–31 °C","chuvas de abril a julho"],["Cesta básica","R$ 629","DIEESE, ago/2026"],["Grande Comando","CMNE","6ª RM"]],
  om:[["6ª RM e Cia Cmdo","Região Militar"],["19º BC","Batalhão de Caçadores"],["6º BPE","Batalhão de Polícia do Exército"],["Hospital Geral de Salvador","Hospital do Exército"],["Colégio Militar de Salvador","Sistema Colégio Militar do Brasil"],["Outras","Parque Regional de Manutenção, 16ª Cia Com"]],
  omSrc:[W,["Hospital Geral de Salvador","https://hges.eb.mil.br"]],
  acessoP:"O aeroporto tem voos para todo o país e para o exterior. A BR-324 liga a cidade a Feira de Santana e ao interior.",
  custoObj:CAP("Salvador","BA","53,05","+8,18%","628,89"),
  saudeObj:{p:["A guarnição tem o <b>Hospital Geral de Salvador</b>, que atende os beneficiários do FuSEx, além de rede conveniada ampla."], src:[["Hospital Geral de Salvador","https://hges.eb.mil.br"]]},
  edu:"A cidade tem o <b>Colégio Militar de Salvador</b>. No ensino superior há a UFBA, a UNEB, o IFBA e muitas faculdades particulares.",
  places:[["Centro","Pelourinho","Centro histórico, Patrimônio Mundial."],["Fevereiro","Carnaval","Circuitos de trios elétricos na orla e no centro."],["Barco","Ilhas da baía","Morro de São Paulo, Itaparica e outras."]],
  chegadaX:["Peça vaga no Colégio Militar de Salvador seguindo o calendário de matrícula de dependentes."]}));

S(Object.assign({}, BA, {id:"feira-de-santana", cidade:"Feira de Santana", coord:"12°16′S 38°58′W · UTC−3",
  tags:["35º BI","Micareta"], destaque:"Polo regional",
  resumo:"Segunda maior cidade da Bahia, grande entroncamento rodoviário. Sede do 35º Batalhão de Infantaria.",
  lede:"Polo comercial a cerca de 110 km de Salvador, conhecido pela Micareta.",
  fatos:[POP("~616 mil"),FUSO,["Até Salvador","~110 km","BR-324"],["Festa","Micareta","carnaval fora de época"],["OM","35º BI","infantaria"],["Grande Comando","CMNE","6ª RM"]],
  om:[["35º BI","Batalhão de Infantaria"]],
  acessoP:"A cidade fica na BR-324, a cerca de 110 km de Salvador, e é cortada pela BR-116 e pela BR-101.",
  custoP:"Polo regional com comércio forte e custo menor que o de Salvador.",
  ref:"Salvador, que tem o Hospital Geral",
  edu:TXT.semCM+" A cidade tem a UEFS, campus do IFBA e faculdades particulares.",
  climaObj:{p:["Quente e mais seco que Salvador, com chuvas concentradas entre abril e julho."], clima:"sssccccsssss", leg:["Chuvoso (abr–jul)","Seco (ago–mar)"]},
  places:[["Abril","Micareta","Carnaval fora de época, tradicional na cidade."]]}));

S(Object.assign({}, BA, {id:"barreiras", cidade:"Barreiras", coord:"12°09′S 44°59′W · Oeste baiano · UTC−3",
  tags:["4º BEC","Agronegócio","Cerrado"], destaque:"Polo regional",
  resumo:"Polo do oeste baiano, região de agronegócio no Cerrado. Sede do 4º Batalhão de Engenharia de Construção.",
  lede:"Cidade em crescimento, mais perto de Brasília que de Salvador, com cachoeiras e rios de água clara.",
  fatos:[POP("~159 mil"),FUSO,["Até Brasília","~620 km","BR-020"],["Até Salvador","~860 km","BR-242"],["OM","4º BEC","engenharia de construção"],["Grande Comando","CMNE","1º Gpt E"]],
  om:[["4º BEC","Batalhão de Engenharia de Construção"]],
  acessoP:"A cidade tem aeroporto regional e fica na BR-242 e na BR-020. Brasília, a cerca de 620 km, é muitas vezes a referência mais próxima.",
  custoP:"O agronegócio movimenta a cidade e aquece o mercado de imóveis.",
  ref:"Brasília ou Salvador",
  edu:TXT.semCM+" A cidade tem a Universidade Federal do Oeste da Bahia (UFOB) e o IFBA.",
  climaObj:{p:["Clima de Cerrado, com chuvas de outubro a abril e inverno seco."], clima:"ccccsssssccc", leg:["Chuvoso (out–abr)","Seco (mai–set)"]},
  places:[["Região","Cachoeiras do oeste baiano","Rios de água clara e cachoeiras como Acaba Vida."]]}));
})();
