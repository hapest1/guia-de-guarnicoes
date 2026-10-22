/* Comando Militar do Sudeste (lotes CMSE-1 a CMSE-4) */
(function(){
const W = SRC.CMSE;
const FUSO = ["Fuso","0 h","horário de Brasília"];
const POP = (v)=>["População",v,"Censo 2022, aprox."];
const CL = {p:["Subtropical, com verão quente e chuvoso (outubro a março) e inverno seco e mais fresco."], clima:"cccssssssccc", leg:["Chuvoso (out–mar)","Seco (abr–set)"]};
const LIT = {p:["Litoral quente e úmido, com verão chuvoso e inverno ameno. A umidade é alta o ano todo."], clima:"cccssssssccc", leg:["Mais chuvoso (out–mar)","Menos chuvoso (abr–set)"]};
const HMASP = "São Paulo, que tem o Hospital Militar de Área";
const S = (o)=>addG(Object.assign({regiao:"Sudeste", comando:"CMSE",
  acesso:{p:[o.acessoP]},
  custo:o.custoObj || {p:[o.custoP||"Cidade com comércio e serviços completos."], note:TXT.pendAluguel},
  saude:o.saudeObj || {p:[`Casos especializados costumam ser encaminhados a ${o.ref||HMASP}.`], note:TXT.pendSaude},
  educacao:{p:[o.edu]},
  clima:o.climaObj || CL,
  cultura:{p:o.cultP||[], places:o.places, note:o.cultNote},
  chegada:o.chegadaX||[]
}, o));

/* ---------- CMSE-1: Grande SP e Baixada Santista ---------- */
S({id:"sao-paulo", cidade:"São Paulo", uf:"SP", estado:"São Paulo", coord:"23°33′S 46°38′W · alt. 760 m · UTC−3",
  tags:["CMSE","2ª RM","2ª DE","Hospital Militar","8º BPE"], destaque:"Sede do CMSE",
  resumo:"Maior cidade do país e sede do Comando Militar do Sudeste, da 2ª Região Militar e da 2ª Divisão de Exército.",
  lede:"Metrópole com oferta de tudo, de saúde a educação e cultura, mas também com o aluguel e a cesta básica mais caros do país e trânsito pesado.",
  fatos:[["População","11,9 mi","estimativa IBGE 2025"],FUSO,["Aluguel","R$ 63/m²","FipeZAP, fev/2026"],["Clima","12–29 °C","verão chuvoso"],["Cesta básica","R$ 901","DIEESE, ago/2026, a mais cara"],["Grande Comando","CMSE","2ª RM"]],
  omP:["São Paulo é sede do <b>Comando Militar do Sudeste</b>, da <b>2ª Região Militar</b> e da <b>2ª Divisão de Exército</b>."],
  om:[["CMSE e Cia Cmdo","Comando Militar de Área"],["2ª RM","Região Militar"],["2ª DE e AD/2","Divisão de Exército e Artilharia Divisionária"],["Hospital Militar de Área de São Paulo","Referência de saúde do Exército no Sudeste"],["8º BPE","Polícia do Exército"],["Outras","3ª Cia Intlg, 21º D Sup, 2ª Cia Trnsp, Base de Administração do Ibirapuera, entre outras"]],
  omSrc:[W,["Viva (IBGE)","https://viva.com.br/noticias/sao-paulo-segue-como-municipio-mais-populoso-com-119-milhoes-de-habitantes.html"]],
  acessoP:"A cidade tem os aeroportos de Congonhas e Guarulhos e as principais rodovias do país. O metrô e os trens metropolitanos são essenciais para fugir do trânsito.",
  custoObj:{p:[TXT.fipe("São Paulo","63,28","+6,67%"),TXT.cesta("São Paulo","900,59")+" É a cesta mais cara entre as capitais."], note:"<b>Na prática:</b> escolha onde morar pelo trajeto até a OM. Morar perto de metrô ou trem economiza horas por semana.", src:[SRC.fipe,SRC.dieese]},
  saudeObj:{p:["A guarnição tem o <b>Hospital Militar de Área de São Paulo</b>, que atende os beneficiários do FuSEx, e uma rede conveniada muito ampla."], src:[W]},
  edu:"A cidade tem a USP, a Unifesp, a Unesp e centenas de faculdades, além de escolas de todos os tipos.",
  places:[["Cidade","Parque Ibirapuera","O maior parque urbano da cidade, perto da área militar do Ibirapuera."],["Cidade","Avenida Paulista","Museus, centros culturais e fechamento para pedestres aos domingos."],["~80 km","Litoral paulista","Praias da Baixada Santista e do litoral norte."]]});

const SPM = (o)=>S(Object.assign({ref:HMASP}, o));
SPM({id:"osasco", cidade:"Osasco", uf:"SP", estado:"São Paulo", coord:"23°32′S 46°47′W · Grande São Paulo · UTC−3",
  tags:["4º BI L","2º BPE","5ª Bia AAAe L"], destaque:"Região Metropolitana",
  resumo:"Cidade da Grande São Paulo, colada à capital. Sede do 4º Batalhão de Infantaria Leve e do 2º Batalhão de Polícia do Exército.",
  lede:"Polo de serviços na zona oeste da Grande São Paulo, com trem até a capital.",
  fatos:[POP("~728 mil"),FUSO,["Até São Paulo","~20 km","trem e rodovias"],["Região","Metropolitana","de São Paulo"],["OM","4º BI L","e 2º BPE"],["Grande Comando","CMSE","2ª RM"]],
  om:[["4º BI L","Batalhão de Infantaria Leve"],["2º BPE","Batalhão de Polícia do Exército"],["5ª Bia AAAe L","Bateria de Artilharia Antiaérea Leve"]],
  acessoP:"A cidade é ligada a São Paulo pela linha de trem da CPTM e pelas rodovias Castello Branco e Raposo Tavares.",
  edu:"A cidade e a capital vizinha concentram muitas escolas e faculdades.",
  cultP:["Cidade de serviços e comércio, com acesso rápido à vida cultural da capital."]});

SPM({id:"barueri", cidade:"Barueri", uf:"SP", estado:"São Paulo", coord:"23°30′S 46°52′W · Grande São Paulo · UTC−3",
  tags:["20º GAC L","22º B Log L","Alphaville"], destaque:"Região Metropolitana",
  resumo:"Cidade da Grande São Paulo onde fica Alphaville. Sede do 20º GAC Leve e do 22º Batalhão Logístico Leve.",
  lede:"Município rico da zona oeste metropolitana, com o aluguel por metro quadrado mais caro do índice FipeZAP.",
  fatos:[POP("~316 mil"),FUSO,["Aluguel","R$ 71/m²","FipeZAP, fev/2026, o mais caro"],["Até São Paulo","~30 km","Castello Branco"],["OM","20º GAC L","e 22º B Log L"],["Grande Comando","CMSE","2ª RM"]],
  om:[["20º GAC L","Grupo de Artilharia de Campanha Leve"],["22º B Log L","Batalhão Logístico Leve"],["22º D Sup","Depósito de Suprimento"]],
  acessoP:"A cidade é ligada a São Paulo pela Rodovia Castello Branco e pela linha de trem da CPTM.",
  custoObj:{p:[TXT.fipe("Barueri","71,40","+11,57%")+" É o aluguel mais caro do índice, puxado pelos condomínios de Alphaville."], note:"<b>Na prática:</b> muitos militares moram em cidades vizinhas, como Carapicuíba, Jandira ou Osasco, onde o aluguel é mais baixo.", src:[SRC.fipe]},
  edu:"A região tem muitas escolas particulares e faculdades, além das opções da capital.",
  cultP:["Alphaville concentra shoppings, restaurantes e serviços."]});

const BX = (o)=>SPM(Object.assign({climaObj:LIT}, o));
BX({id:"guaruja", cidade:"Guarujá", uf:"SP", estado:"São Paulo", coord:"23°59′S 46°15′W · Baixada Santista · UTC−3",
  tags:["1ª Bda AAAe","Praias"], destaque:"Litoral",
  resumo:"Cidade de praias na Baixada Santista. Sede do Comando da 1ª Brigada de Artilharia Antiaérea, que enquadra grupos antiaéreos em vários estados.",
  lede:"Ilha de Santo Amaro, com praias famosas e ligação com Santos por balsa.",
  fatos:[POP("~287 mil"),FUSO,["Até São Paulo","~90 km","Imigrantes e Anchieta"],["Lazer","Praias","Pitangueiras, Enseada e outras"],["OM","1ª Bda AAAe","artilharia antiaérea"],["Grande Comando","CMSE","1ª Bda AAAe"]],
  om:[["Cmdo 1ª Bda AAAe e Bia Cmdo","Comando da Brigada de Artilharia Antiaérea"]],
  acessoP:"A cidade é ligada a Santos por balsa e por rodovia, e a São Paulo pelo sistema Anchieta-Imigrantes, que fica congestionado nos feriados.",
  custoP:"Na temporada de verão, aluguel e serviços ficam mais caros.",
  edu:"Santos, vizinha, concentra universidades e escolas da região.",
  places:[["Cidade","Praias","Pitangueiras, Enseada, Tombo e outras."]], cultNote:"<b>Na prática:</b> evite descer ou subir a serra nos horários de pico dos feriados."});

BX({id:"sao-vicente", cidade:"São Vicente", uf:"SP", estado:"São Paulo", coord:"23°58′S 46°23′W · Baixada Santista · UTC−3",
  tags:["2º BI L","Primeira vila do Brasil"], destaque:"Litoral",
  resumo:"A primeira vila fundada no Brasil, em 1532, vizinha de Santos. Sede do 2º Batalhão de Infantaria Leve.",
  lede:"Cidade da Baixada Santista com praias, ilha e parte continental, ao lado de Santos.",
  fatos:[POP("~330 mil"),FUSO,["Até São Paulo","~75 km","Imigrantes"],["História","1532","primeira vila do Brasil"],["OM","2º BI L","infantaria leve"],["Grande Comando","CMSE","2ª RM"]],
  om:[["2º BI L","Batalhão de Infantaria Leve"]],
  acessoP:"A cidade fica ao lado de Santos e é ligada a São Paulo pela Rodovia dos Imigrantes.",
  edu:"Santos, vizinha, concentra universidades e escolas da região.",
  places:[["Cidade","Ilha Porchat","Mirante sobre as praias da Baixada."],["~5 km","Santos","Orla com jardins, Museu do Café e porto."]]});

BX({id:"praia-grande", cidade:"Praia Grande", uf:"SP", estado:"São Paulo", coord:"24°00′S 46°24′W · Baixada Santista · UTC−3",
  tags:["2º GAAAe","Praias"], destaque:"Litoral",
  resumo:"Cidade litorânea da Baixada Santista, com longa orla. Sede do 2º Grupo de Artilharia Antiaérea.",
  lede:"Uma das cidades que mais crescem no litoral paulista, com aluguel mais baixo que o de Santos.",
  fatos:[POP("~350 mil"),FUSO,["Aluguel","R$ 45/m²","FipeZAP, fev/2026"],["Até São Paulo","~75 km","Imigrantes"],["OM","2º GAAAe","artilharia antiaérea"],["Grande Comando","CMSE","1ª Bda AAAe"]],
  om:[["2º GAAAe","Grupo de Artilharia Antiaérea"]],
  acessoP:"A cidade é ligada a São Paulo pela Rodovia dos Imigrantes e a Santos e São Vicente por avenidas e pontes.",
  custoObj:{p:[TXT.fipe("Praia Grande","44,60","+8,77%")], src:[SRC.fipe]},
  edu:"A cidade tem escolas e faculdades, e Santos concentra as universidades da região.",
  places:[["Cidade","Orla","Calçadão extenso, com quiosques e ciclovia."]]});

/* ---------- CMSE-2: Campinas e região ---------- */
S({id:"campinas", cidade:"Campinas", uf:"SP", estado:"São Paulo", coord:"22°54′S 47°03′W · UTC−3",
  tags:["11ª Bda Inf L","EsPCEx","28º BI L"], destaque:"Sede de Brigada",
  resumo:"Metrópole do interior paulista, polo de tecnologia. Sede da 11ª Brigada de Infantaria Leve e da Escola Preparatória de Cadetes do Exército.",
  lede:"Uma das guarnições mais procuradas do interior, com Unicamp, aeroporto de Viracopos e acesso rápido a São Paulo.",
  fatos:[POP("~1,14 mi"),FUSO,["Aluguel","R$ 51/m²","FipeZAP, fev/2026"],["Até São Paulo","~95 km","Anhanguera e Bandeirantes"],["Ensino","EsPCEx","Escola Preparatória de Cadetes"],["Grande Comando","CMSE","11ª Bda Inf L"]],
  om:[["Cmdo 11ª Bda Inf L e Cia Cmdo","Comando da Brigada"],["EsPCEx","Escola Preparatória de Cadetes do Exército"],["28º BI L","Batalhão de Infantaria Leve"],["2º B Log L","Batalhão Logístico Leve"],["2ª Cia Com L e 11º Pel PE","Comunicações e Polícia do Exército"]],
  acessoP:"O Aeroporto de Viracopos tem voos para todo o país e para o exterior. As rodovias Anhanguera e Bandeirantes ligam a cidade a São Paulo.",
  custoObj:{p:[TXT.fipe("Campinas","51,41","+15,40%")+" A alta em 12 meses foi uma das maiores do índice."], src:[SRC.fipe]},
  edu:TXT.semCM+" A cidade tem a Unicamp, a PUC-Campinas e muitas outras instituições.",
  places:[["Cidade","Lagoa do Taquaral","Parque com lago, pista de caminhada e lazer."],["~50 km","Circuito das Águas","Cidades como Holambra, Serra Negra e Águas de Lindoia."]]});

S({id:"jundiai", cidade:"Jundiaí", uf:"SP", estado:"São Paulo", coord:"23°11′S 46°53′W · UTC−3",
  tags:["12º GAC","Serra do Japi"], destaque:"Interior",
  resumo:"Cidade entre São Paulo e Campinas, terra da uva e da Serra do Japi. Sede do 12º Grupo de Artilharia de Campanha.",
  lede:"Cidade com boa qualidade de vida, a menos de uma hora de São Paulo e de Campinas.",
  fatos:[POP("~444 mil"),FUSO,["Até São Paulo","~60 km","Anhanguera e Bandeirantes"],["Lazer","Serra do Japi","trilhas e mirantes"],["OM","12º GAC","artilharia de campanha"],["Grande Comando","CMSE","2ª RM"]],
  om:[["12º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"A cidade fica entre São Paulo e Campinas, nas rodovias Anhanguera e Bandeirantes, e tem trem da CPTM até a capital.",
  edu:TXT.semCM+" A cidade tem faculdades e campus de instituições públicas, e Campinas fica a cerca de 40 km.",
  places:[["Município","Serra do Japi","Reserva de Mata Atlântica com trilhas."],["Janeiro e fevereiro","Festa da Uva","Tradição dos imigrantes italianos."]]});

S({id:"itu", cidade:"Itu", uf:"SP", estado:"São Paulo", coord:"23°15′S 47°17′W · UTC−3",
  tags:["2º GAC L","Centro histórico"], destaque:"Interior",
  resumo:"Cidade histórica do interior paulista, berço da República. Sede do 2º Grupo de Artilharia de Campanha Leve.",
  lede:"Cidade de casario colonial, conhecida pela piada dos objetos gigantes, a cerca de 100 km de São Paulo.",
  fatos:[POP("~168 mil"),FUSO,["Até São Paulo","~100 km","Castello Branco"],["História","Convenção de Itu","berço da República"],["OM","2º GAC L","artilharia de campanha leve"],["Grande Comando","CMSE","2ª RM"]],
  om:[["2º GAC L","Grupo de Artilharia de Campanha Leve"],["11ª Bia AAAe L","Bateria de Artilharia Antiaérea Leve"]],
  acessoP:"A cidade fica perto da Rodovia Castello Branco e da Rodovia dos Bandeirantes, entre São Paulo, Campinas e Sorocaba.",
  edu:TXT.semCM+" A cidade tem faculdades, e Campinas e Sorocaba concentram universidades da região.",
  places:[["Centro","Centro histórico","Igrejas e casarões dos séculos XVIII e XIX."]]});

S({id:"sorocaba", cidade:"Sorocaba", uf:"SP", estado:"São Paulo", coord:"23°30′S 47°27′W · UTC−3",
  tags:["14ª CSM","Polo industrial"], destaque:"Polo regional",
  resumo:"Polo industrial do interior paulista, a cerca de 100 km de São Paulo. Sede da 14ª Circunscrição de Serviço Militar.",
  lede:"Uma das maiores cidades do interior de São Paulo, com indústria forte e boa infraestrutura.",
  fatos:[POP("~723 mil"),FUSO,["Até São Paulo","~100 km","Castello Branco"],["Região","Polo industrial","interior de SP"],["OM","14ª CSM","Serviço Militar"],["Grande Comando","CMSE","2ª RM"]],
  om:[["14ª CSM","Circunscrição de Serviço Militar"]],
  acessoP:"A cidade fica na Rodovia Castello Branco e na Raposo Tavares e tem aeroporto regional.",
  edu:TXT.semCM+" A cidade tem campus da UFSCar, da Unesp e várias faculdades.",
  cultP:["Cidade com parques, zoológico e vida de cidade grande no interior."]});

/* ---------- CMSE-3: Vale do Paraíba ---------- */
const VALE = "As cidades do Vale do Paraíba ficam ao longo da Via Dutra, entre São Paulo e o Rio de Janeiro, com acesso rápido ao litoral norte paulista e à Serra da Mantiqueira.";
S({id:"taubate", cidade:"Taubaté", uf:"SP", estado:"São Paulo", coord:"23°01′S 45°33′W · Vale do Paraíba · UTC−3",
  tags:["CAvEx","1º e 2º BAvEx","CIAvEx","Aviação"], destaque:"Aviação do Exército",
  resumo:"Polo do Vale do Paraíba e berço da Aviação do Exército. Sede do Comando de Aviação do Exército e dos batalhões e centro de instrução de aviação.",
  lede:"A principal guarnição da Aviação do Exército, na Via Dutra, a cerca de 130 km de São Paulo.",
  fatos:[POP("~310 mil"),FUSO,["Até São Paulo","~130 km","Via Dutra"],["Destaque","Aviação","Base de Aviação de Taubaté"],["OM","CAvEx","e outras OM de aviação"],["Grande Comando","CMSE","CAvEx"]],
  om:[["CAvEx e Cia Cmdo","Comando de Aviação do Exército"],["1º e 2º BAvEx","Batalhões de Aviação do Exército"],["CIAvEx","Centro de Instrução de Aviação do Exército"],["B Mnt Sup Av Ex e Cia Com Av Ex","Manutenção, suprimento e comunicações"],["Base de Aviação de Taubaté","Base de Aviação"]],
  acessoP:"A cidade fica na Via Dutra. Para voos comerciais, as referências são São José dos Campos e os aeroportos de São Paulo.",
  edu:TXT.semCM+" A cidade tem a Universidade de Taubaté (Unitau) e faculdades particulares.",
  cultP:[VALE+" Taubaté é a terra de Monteiro Lobato."],
  places:[["Cidade","Sítio do Picapau Amarelo","Museu na chácara onde viveu Monteiro Lobato."],["~100 km","Campos do Jordão","Serra da Mantiqueira, com clima frio."]]});

S({id:"cacapava", cidade:"Caçapava", uf:"SP", estado:"São Paulo", coord:"23°06′S 45°42′W · Vale do Paraíba · UTC−3",
  tags:["12ª Bda Inf L (Amv)","6º BI L","Aeromóvel"], destaque:"Sede de Brigada",
  resumo:"Cidade do Vale do Paraíba, entre São José dos Campos e Taubaté. Sede da 12ª Brigada de Infantaria Leve (Aeromóvel).",
  lede:"Cidade pequena na Via Dutra, com acesso fácil a São José dos Campos e Taubaté para compras e serviços.",
  fatos:[POP("~96 mil"),FUSO,["Até São Paulo","~110 km","Via Dutra"],["Destaque","Aeromóvel","12ª Bda Inf L"],["OM","Bda","e outras três OM"],["Grande Comando","CMSE","12ª Bda Inf L (Amv)"]],
  om:[["Cmdo 12ª Bda Inf L (Amv) e Cia Cmdo","Comando da Brigada Aeromóvel"],["6º BI L","Batalhão de Infantaria Leve"],["12ª Cia Com L e 12º Pel PE","Comunicações e Polícia do Exército"]],
  acessoP:"A cidade fica na Via Dutra, entre São José dos Campos e Taubaté. O aeroporto de São José dos Campos é o mais próximo.",
  custoP:"Muitos militares moram também em São José dos Campos ou em Taubaté, que têm mais oferta de imóveis e serviços.",
  edu:TXT.semCM+" São José dos Campos e Taubaté, vizinhas, concentram universidades da região.",
  cultP:[VALE]});

S({id:"pindamonhangaba", cidade:"Pindamonhangaba", uf:"SP", estado:"São Paulo", coord:"22°55′S 45°28′W · Vale do Paraíba · UTC−3",
  tags:["2º BE Cmb","Cia E Cmb L","Engenharia"], destaque:"Interior",
  resumo:"Cidade do Vale do Paraíba, ao pé da Serra da Mantiqueira. Sede do 2º Batalhão de Engenharia de Combate e de companhias de engenharia leve.",
  lede:"Cidade de porte médio na Via Dutra, porta de entrada para Campos do Jordão.",
  fatos:[POP("~165 mil"),FUSO,["Até São Paulo","~150 km","Via Dutra"],["Lazer","Mantiqueira","acesso a Campos do Jordão"],["OM","2º BE Cmb","e Cia E Cmb L"],["Grande Comando","CMSE","2ª RM"]],
  om:[["2º BE Cmb","Batalhão de Engenharia de Combate"],["11ª e 12ª Cia E Cmb L","Companhias de Engenharia de Combate Leves"]],
  omSrc:[W, SRC.CMO],
  acessoP:"A cidade fica na Via Dutra, perto de Taubaté.",
  edu:TXT.semCM+" Taubaté e São José dos Campos concentram universidades da região.",
  cultP:[VALE]});

S({id:"lorena", cidade:"Lorena", uf:"SP", estado:"São Paulo", coord:"22°43′S 45°07′W · Vale do Paraíba · UTC−3",
  tags:["5º BI L","Vale histórico"], destaque:"Interior",
  resumo:"Cidade histórica do Vale do Paraíba, perto de Aparecida. Sede do 5º Batalhão de Infantaria Leve.",
  lede:"Cidade de casarões do ciclo do café, na Via Dutra, a cerca de 15 km do Santuário de Aparecida.",
  fatos:[POP("~84 mil"),FUSO,["Até São Paulo","~180 km","Via Dutra"],["Vizinha","Aparecida","Santuário Nacional"],["OM","5º BI L","infantaria leve"],["Grande Comando","CMSE","2ª RM"]],
  om:[["5º BI L","Batalhão de Infantaria Leve"]],
  acessoP:"A cidade fica na Via Dutra, entre São Paulo e o Rio de Janeiro. Resende fica a cerca de 90 km.",
  edu:TXT.semCM+" A cidade tem a Escola de Engenharia de Lorena, da USP, e faculdades particulares.",
  places:[["~15 km","Aparecida","Santuário Nacional de Nossa Senhora Aparecida."],["~50 km","Cunha","Cidade serrana com ateliês de cerâmica."]]});

/* ---------- CMSE-4: Interior paulista ---------- */
S({id:"pirassununga", cidade:"Pirassununga", uf:"SP", estado:"São Paulo", coord:"21°59′S 47°25′W · UTC−3",
  tags:["13º RC Mec","Cavalaria","AFA"], destaque:"Interior",
  resumo:"Cidade do interior paulista, sede da Academia da Força Aérea. Sede do 13º Regimento de Cavalaria Mecanizado.",
  lede:"Cidade média e tranquila, com forte presença militar, a cerca de 210 km de São Paulo.",
  fatos:[POP("~74 mil"),FUSO,["Até São Paulo","~210 km","Anhanguera"],["Vizinhos","AFA","Academia da Força Aérea"],["OM","13º RC Mec","cavalaria mecanizada"],["Grande Comando","CMSE","2ª RM"]],
  om:[["13º RC Mec","Regimento de Cavalaria Mecanizado"]],
  acessoP:"A cidade fica na Via Anhanguera, entre Campinas e Ribeirão Preto.",
  ref:"Campinas ou São Paulo",
  edu:TXT.semCM+" A cidade tem campus da USP (Faculdade de Zootecnia e Engenharia de Alimentos).",
  cultP:["A Academia da Força Aérea e sua Esquadrilha da Fumaça fazem parte da identidade da cidade."]});

S({id:"ribeirao-preto", cidade:"Ribeirão Preto", uf:"SP", estado:"São Paulo", coord:"21°10′S 47°48′W · UTC−3",
  tags:["5ª CSM","Agronegócio"], destaque:"Polo regional",
  resumo:"Capital do agronegócio no interior paulista. Sede da 5ª Circunscrição de Serviço Militar.",
  lede:"Cidade grande, quente e com boa oferta de serviços, saúde e universidades, a cerca de 310 km de São Paulo.",
  fatos:[POP("~698 mil"),FUSO,["Aluguel","R$ 33/m²","FipeZAP, fev/2026"],["Até São Paulo","~310 km","Anhanguera"],["OM","5ª CSM","Serviço Militar"],["Grande Comando","CMSE","2ª RM"]],
  om:[["5ª CSM","Circunscrição de Serviço Militar"]],
  acessoP:"A cidade tem aeroporto com voos para várias capitais e fica na Via Anhanguera.",
  custoObj:{p:[TXT.fipe("Ribeirão Preto","32,58","+11,17%")], src:[SRC.fipe]},
  ref:"São Paulo",
  edu:TXT.semCM+" A cidade tem campus da USP e várias faculdades.",
  climaObj:{p:["Quente, com verão chuvoso e inverno seco e ensolarado."], clima:"cccssssssccc", leg:["Chuvoso (out–mar)","Seco (abr–set)"]},
  places:[["Abril e maio","Agrishow","Uma das maiores feiras agrícolas do mundo."],["Cidade","Choperia Pinguim","Ponto tradicional da cidade."]]});

S({id:"bauru", cidade:"Bauru", uf:"SP", estado:"São Paulo", coord:"22°19′S 49°04′W · Centro-Oeste paulista · UTC−3",
  tags:["6ª CSM","Polo regional"], destaque:"Polo regional",
  resumo:"Polo do centro-oeste paulista, terra do sanduíche bauru. Sede da 6ª Circunscrição de Serviço Militar.",
  lede:"Cidade universitária e entroncamento rodoviário, a cerca de 330 km de São Paulo.",
  fatos:[POP("~379 mil"),FUSO,["Até São Paulo","~330 km","Castello Branco"],["Ensino","Unesp e USP","campus na cidade"],["OM","6ª CSM","Serviço Militar"],["Grande Comando","CMSE","2ª RM"]],
  om:[["6ª CSM","Circunscrição de Serviço Militar"]],
  acessoP:"A cidade tem aeroporto regional e é cortada pela Rodovia Marechal Rondon, perto da Castello Branco.",
  ref:"São Paulo",
  edu:TXT.semCM+" A cidade tem campus da Unesp e da USP.",
  cultP:["Terra do sanduíche bauru, com vida universitária movimentada."]});

S({id:"lins", cidade:"Lins", uf:"SP", estado:"São Paulo", coord:"21°40′S 49°45′W · Noroeste paulista · UTC−3",
  tags:["37º BI L","Interior"], destaque:"Interior",
  resumo:"Cidade do noroeste paulista. Sede do 37º Batalhão de Infantaria Leve.",
  lede:"Cidade média do interior, tranquila, na Rodovia Marechal Rondon.",
  fatos:[POP("~78 mil"),FUSO,["Até Bauru","~100 km","Marechal Rondon"],["Região","Noroeste","paulista"],["OM","37º BI L","infantaria leve"],["Grande Comando","CMSE","2ª RM"]],
  om:[["37º BI L","Batalhão de Infantaria Leve"]],
  acessoP:"A cidade fica na Rodovia Marechal Rondon. Para voos, as referências são Bauru e São José do Rio Preto.",
  ref:"Bauru ou São Paulo",
  edu:TXT.semCM+" A cidade tem faculdades particulares e instituições técnicas.",
  cultP:["Cidade do interior, com clubes e parques como principais opções de lazer."]});
})();
