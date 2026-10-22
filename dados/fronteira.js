/* Pelotões e destacamentos de fronteira do CMA (lotes FRON-1 a FRON-4) */
(function(){
const RSM = ["Revista Sociedade Militar","https://www.sociedademilitar.com.br/2026/08/alto-rio-negro-pelotoes-especiais-fronteira-colombia-1644-km-mpf-2022j.html"];
const FORTE = ["Forças Terrestres","https://www.forte.jor.br/2015/09/01/1a-brigada-de-infantaria-de-selva-rodizio-dos-4o-e-5o-pelotoes-especiais-de-fronteira/"];
const AERO = ["Aeroin","https://aeroin.net/exercito-fala-sobre-o-aerodromo-de-surucucu-am-criado-para-apoiar-o-4o-pelotao-especial-de-fronteira/"];
const BV = ["Portal Amazônia","https://portalamazonia.com/roraima/bonfim-e-pacaraima-conheca-as-cidades-na-fronteira-com-regiao-disputada-pela-venezuela-e-guiana/"];
const CARAC = ["Portal Amazônia","https://portalamazonia.com/bora-de-trip/o-lindo-e-sagrado-lago-caracarana/"];
const ISOL = {p:["Não há estrada até a localidade. O acesso é por avião, quando há pista, ou por barco subindo o rio, numa viagem que pode levar dias. O deslocamento de militares e famílias costuma ser feito em aeronaves da FAB ou fretadas, dentro do apoio logístico do CMA."],
  note:"<b>Mudança:</b> a bagagem que pode ser levada é limitada pelo transporte aéreo ou fluvial. Combine com a OM o que levar e os prazos."};
const EQ = {p:["Equatorial, quente e muito úmido, com chuva o ano todo. O nível dos rios muda o acesso e o abastecimento: na vazante, a navegação fica mais difícil."]};
const ENTRY = (txt)=>[ "Confirme com a OM a duração da permanência no pelotão e as regras para levar a família.", txt ].filter(Boolean);

/* ---------- FRON-1: Roraima ---------- */
addPEF({id:"bonfim", cidade:"Bonfim", uf:"RR", estado:"Roraima", coord:"03°21′N 59°50′W · fronteira com a Guiana · UTC−4",
  tags:["1º PEF","7º BIS","Guiana","BR-401"], resumo:"Cidade-gêmea de Lethem, na Guiana, ligada pela ponte sobre o rio Tacutu. Sede do 1º PEF, a 125 km de Boa Vista.",
  lede:"O pelotão de fronteira mais acessível de Roraima: fica numa cidade com estrada asfaltada até Boa Vista e comércio movimentado com a Guiana.",
  fatos:[["População","15,6 mil","estimativa IBGE 2025"],["Até Boa Vista","~125 km","BR-401, cerca de 1h30"],["Fronteira","Guiana","Lethem, do outro lado do Tacutu"],["Fuso","−1 h","em relação a Brasília"],["OM enquadrante","7º BIS","Cmdo Fron RR"],["Grande Comando","CMA","1ª Bda Inf Sl"]],
  om:[["1º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron RR / 7º BIS, de Boa Vista"]],
  acesso:{p:["Bonfim fica a cerca de 125 km de Boa Vista pela BR-401, aproximadamente 1h30 de carro. A ponte sobre o rio Tacutu liga a cidade a Lethem, na Guiana."], src:[BV]},
  vida:"Bonfim é uma cidade pequena, com comércio local e acesso fácil a Boa Vista para compras maiores. Lethem é conhecida pelas compras baratas.",
  evac:"Boa Vista",
  escola:"A cidade tem escolas públicas de ensino fundamental e médio. Para mais opções, a referência é Boa Vista.",
  clima:{p:["Quente o ano todo, com chuvas de abril a setembro e seca de outubro a março, como em Boa Vista. A região é de lavrado, a savana de Roraima."]},
  cultura:{places:[["do outro lado da ponte","Lethem (Guiana)","Comércio de produtos importados a preços baixos."],["~125 km","Boa Vista","Capital, com toda a estrutura de cidade grande."]], src:[BV]},
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Guiana.")});

addPEF({id:"normandia", cidade:"Normandia", uf:"RR", estado:"Roraima", coord:"03°53′N 59°37′W · fronteira com a Guiana · UTC−4",
  tags:["2º PEF","7º BIS","Guiana","Raposa Serra do Sol"], resumo:"Município na fronteira com a Guiana, cercado pela Terra Indígena Raposa Serra do Sol. Sede do 2º PEF, perto do Lago Caracaranã.",
  lede:"Pequena cidade do nordeste de Roraima, no lavrado, com forte presença indígena macuxi. O acesso é pela BR-401, passando por Bonfim.",
  fatos:[["População","16,3 mil","estimativa IBGE 2025"],["Até Boa Vista","~180 km","BR-401"],["Fronteira","Guiana","rio Maú"],["Fuso","−1 h","em relação a Brasília"],["OM enquadrante","7º BIS","Cmdo Fron RR"],["Grande Comando","CMA","1ª Bda Inf Sl"]],
  om:[["2º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron RR / 7º BIS"]],
  acesso:{p:["O acesso a partir de Boa Vista é pela BR-401, via Bonfim. Entre Bonfim e Normandia há trechos ainda sem asfalto, que pioram no período chuvoso."], src:[["Wikipédia (BR-401)","https://en.wikipedia.org/wiki/BR-401_(Brazil_highway)"]]},
  evac:"Boa Vista",
  clima:{p:["Quente, com chuvas de abril a setembro e seca de outubro a março. Paisagem de lavrado, com serras ao norte."]},
  cultura:{p:["A maior parte do município está dentro da Terra Indígena Raposa Serra do Sol, e o respeito às regras das comunidades faz parte do dia a dia."],
    places:[["~22 km","Lago Caracaranã","Águas claras e praias de areia branca, administrado pela comunidade da Raposa, que cobra taxa de visita."]], src:[CARAC]},
  chegada:ENTRY("Informe-se sobre as regras de acesso às terras indígenas antes de passeios.")});

addPEF({id:"pacaraima", cidade:"Pacaraima", uf:"RR", estado:"Roraima", coord:"04°25′N 61°08′W · fronteira com a Venezuela · UTC−4",
  tags:["3º PEF","7º BIS","Venezuela","Operação Acolhida"], resumo:"Cidade na fronteira com a Venezuela, colada a Santa Elena de Uairén. Sede do 3º PEF e porta de entrada dos migrantes venezuelanos.",
  lede:"A principal porta de entrada terrestre de venezuelanos no Brasil, no alto da serra, com clima mais ameno que o de Boa Vista. É também o caminho para o Monte Roraima.",
  fatos:[["População","23 mil","estimativa IBGE 2025"],["Até Boa Vista","~210 km","BR-174"],["Fronteira","Venezuela","Santa Elena de Uairén"],["Fuso","−1 h","em relação a Brasília"],["OM enquadrante","7º BIS","Cmdo Fron RR"],["Grande Comando","CMA","1ª Bda Inf Sl"]],
  om:[["3º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron RR / 7º BIS"]],
  omP2:["A cidade concentra estruturas da Operação Acolhida, de recepção de migrantes venezuelanos, com participação das Forças Armadas."],
  acesso:{p:["Pacaraima fica no fim da BR-174, a cerca de 210 km de Boa Vista, com estrada asfaltada. Há ônibus diários entre as duas cidades."], src:[["Rome2Rio","https://www.rome2rio.com/s/Pacaraima/Bonfim-Roraima-Brazil"]]},
  vida:"Pacaraima é uma cidade pequena que cresceu muito com a migração venezuelana: a população quase dobrou em dez anos. O comércio local atende o básico, e as compras maiores são feitas em Boa Vista.",
  evac:"Boa Vista",
  clima:{p:["Por ficar na serra, Pacaraima tem temperaturas mais amenas que Boa Vista, principalmente à noite. As chuvas se concentram no meio do ano."]},
  cultura:{places:[["do outro lado da fronteira","Santa Elena de Uairén","Cidade venezuelana vizinha, ponto de partida para a Gran Sabana."],["via Venezuela","Monte Roraima","O tepui da tríplice fronteira. A trilha sai do lado venezuelano e exige vários dias e guia."]],
    src:[["Folha BV","https://www.folhabv.com.br/?p=573187"],BV]},
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Venezuela.")});

addPEF({id:"surucucu", cidade:"Surucucu", uf:"RR", estado:"Roraima", coord:"Terra Indígena Yanomami · UTC−4",
  tags:["4º PEF","7º BIS","Yanomami","Só avião"], destaque:"Acesso só aéreo",
  resumo:"Pelotão no coração da Terra Indígena Yanomami, nas serras do oeste de Roraima. Acesso apenas por avião.",
  lede:"Um dos pelotões mais isolados do país. O aeródromo de Surucucu foi criado para apoiar o 4º PEF e ganhou importância nas operações de apoio ao povo Yanomami.",
  fatos:[["Acesso","Aéreo","sem estrada"],["Fuso","−1 h","em relação a Brasília"],["Território","Yanomami","Terra Indígena"],["Apoio","FAB","transporte e abastecimento"],["OM enquadrante","7º BIS","Cmdo Fron RR"],["Grande Comando","CMA","1ª Bda Inf Sl"]],
  om:[["4º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron RR / 7º BIS"]],
  omSrc:[SRC.CMA, AERO, FORTE],
  acesso:{p:["Surucucu só é acessível por avião, a partir de Boa Vista. O rodízio de militares e o abastecimento são feitos com apoio de aeronaves da FAB."], note:ISOL.note, src:[FORTE, AERO]},
  vida:"Militares e famílias moram no pelotão, que recebe alimentos e materiais por via aérea. Não há comércio nos moldes de uma cidade.",
  evac:"Boa Vista",
  clima:{p:["Por ficar em região serrana, as noites são mais frescas que em Boa Vista. Chove muito, principalmente no meio do ano, o que pode atrasar voos."]},
  cultura:{p:["O pelotão convive com comunidades yanomami. O contato segue regras rígidas de proteção à saúde e à cultura indígena, definidas pela OM e pelos órgãos responsáveis."]},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

addPEF({id:"auaris", cidade:"Auaris", uf:"RR", estado:"Roraima", coord:"Terra Indígena Yanomami · fronteira com a Venezuela · UTC−4",
  tags:["5º PEF","7º BIS","Yanomami","Só avião"], destaque:"Acesso só aéreo",
  resumo:"Pelotão no noroeste de Roraima, perto da fronteira com a Venezuela, dentro da Terra Indígena Yanomami. Acesso apenas por avião.",
  lede:"Pelotão isolado na região das nascentes do Uraricoera, onde vivem povos yanomami e ye'kwana. A pista de pouso é o único elo com Boa Vista.",
  fatos:[["Acesso","Aéreo","sem estrada"],["Fuso","−1 h","em relação a Brasília"],["Fronteira","Venezuela","noroeste de RR"],["Apoio","FAB","transporte e abastecimento"],["OM enquadrante","7º BIS","Cmdo Fron RR"],["Grande Comando","CMA","1ª Bda Inf Sl"]],
  om:[["5º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron RR / 7º BIS"]],
  omSrc:[SRC.CMA, FORTE, ["Aeroin","https://aeroin.net/mais-uma-pista-de-pouso-esta-sendo-recuperada-pelas-forcas-armadas-na-fronteira-norte-do-brasil-em-auaris/"]],
  acesso:{p:["Auaris só é acessível por avião. A pista foi recuperada pelas Forças Armadas, e o rodízio e o abastecimento dependem do transporte aéreo a partir de Boa Vista."], note:ISOL.note, src:[FORTE]},
  vida:"Militares e famílias moram no pelotão, abastecido por via aérea. Não há comércio nos moldes de uma cidade.",
  evac:"Boa Vista",
  clima:EQ,
  cultura:{p:["A região é habitada por povos yanomami e ye'kwana. O contato com as comunidades segue regras de proteção definidas pela OM e pelos órgãos responsáveis."]},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

addPEF({id:"uiramuta", cidade:"Uiramutã", uf:"RR", estado:"Roraima", coord:"04°36′N 60°10′W · Raposa Serra do Sol · UTC−4",
  tags:["6º PEF","7º BIS","Monte Caburaí","Raposa Serra do Sol"], resumo:"Município no extremo norte de Roraima, dentro da Terra Indígena Raposa Serra do Sol. Sede do 6º PEF, perto do Monte Caburaí.",
  lede:"No município fica o Monte Caburaí, ponto mais setentrional do Brasil. A paisagem é de serras e cachoeiras, e a população é majoritariamente indígena.",
  fatos:[["População","16,2 mil","estimativa IBGE 2025"],["Fuso","−1 h","em relação a Brasília"],["Destaque","Caburaí","ponto extremo norte do Brasil"],["Fronteira","Guiana","e Venezuela, ao norte"],["OM enquadrante","7º BIS","Cmdo Fron RR"],["Grande Comando","CMA","1ª Bda Inf Sl"]],
  om:[["6º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron RR / 7º BIS"]],
  acesso:{p:["O acesso a partir de Boa Vista é por estrada, com trechos de terra e serra que ficam difíceis no período chuvoso."], note:"<b>Confirme antes:</b> as condições da estrada mudam muito com as chuvas. Pergunte à OM qual é o melhor período e o tipo de veículo indicado."},
  evac:"Boa Vista",
  clima:{p:["Por estar nas serras do norte, o clima é um pouco mais ameno que o de Boa Vista. As chuvas se concentram no meio do ano."]},
  cultura:{p:["A população é majoritariamente indígena, de povos como os macuxi e ingarikó. A região tem serras, cachoeiras e o Monte Caburaí, ponto extremo norte do país."]},
  chegada:ENTRY("Informe-se sobre as regras de acesso às terras indígenas antes de passeios.")});

/* ---------- FRON-2: Acre e Rondônia ---------- */
addPEF({id:"epitaciolandia", cidade:"Epitaciolândia", uf:"AC", estado:"Acre", coord:"11°01′S 68°44′W · fronteira com a Bolívia · UTC−5",
  tags:["Cia Esp Fron","4º BIS","Bolívia","BR-317"], resumo:"Cidade na fronteira com a Bolívia, vizinha de Brasileia e em frente a Cobija. Sede de uma Companhia Especial de Fronteira.",
  lede:"Epitaciolândia e Brasileia formam uma área urbana contínua na divisa com Cobija, capital do departamento boliviano de Pando. Tem estrada asfaltada até Rio Branco.",
  fatos:[["População","19,9 mil","estimativa IBGE 2025"],["Até Rio Branco","~230 km","BR-317"],["Fronteira","Bolívia","Cobija"],["Fuso","−2 h","em relação a Brasília"],["OM enquadrante","4º BIS","Cmdo Fron AC"],["Grande Comando","CMA","17ª Bda Inf Sl"]],
  om:[["Cia Esp Fron","Companhia Especial de Fronteira, subordinada ao Cmdo Fron AC / 4º BIS, de Rio Branco"]],
  acesso:{p:["A cidade fica a cerca de 230 km de Rio Branco pela BR-317, asfaltada. Cobija, na Bolívia, está do outro lado do rio Acre."]},
  vida:"A cidade tem comércio local e está ao lado de Brasileia. Cobija, do lado boliviano, é zona franca e atrai compras.",
  evac:"Rio Branco",
  escola:"Há escolas públicas e particulares em Epitaciolândia e Brasileia. Para ensino superior, a referência é Rio Branco.",
  clima:{p:["Quente e úmido, com chuvas de novembro a abril. Frentes frias podem trazer friagem no inverno."]},
  cultura:{places:[["do outro lado do rio","Cobija (Bolívia)","Zona franca boliviana, com comércio de importados."],["~230 km","Rio Branco","Capital do Acre."]]},
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Bolívia.")});

addPEF({id:"assis-brasil", cidade:"Assis Brasil", uf:"AC", estado:"Acre", coord:"10°56′S 69°34′W · tríplice fronteira · UTC−5",
  tags:["2º PEF","4º BIS","Peru","Bolívia","Estrada do Pacífico"], resumo:"Na tríplice fronteira com o Peru e a Bolívia, no fim da BR-317. Sede do 2º PEF e ponto de passagem da Estrada do Pacífico.",
  lede:"Pequena cidade no extremo da BR-317, onde a Ponte da Integração liga o Brasil a Iñapari, no Peru. A Bolívia fica do outro lado do rio Acre.",
  fatos:[["População","8,6 mil","estimativa IBGE 2025"],["Até Rio Branco","~340 km","BR-317"],["Fronteira","Peru e Bolívia","Iñapari e Bolpebra"],["Fuso","−2 h","em relação a Brasília"],["OM enquadrante","4º BIS","Cmdo Fron AC"],["Grande Comando","CMA","17ª Bda Inf Sl"]],
  om:[["2º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron AC / 4º BIS"]],
  acesso:{p:["A cidade fica no fim da BR-317, asfaltada, a cerca de 340 km de Rio Branco. Pela Estrada do Pacífico é possível seguir de carro pelo Peru."]},
  vida:"O comércio local é pequeno. Compras maiores são feitas em Epitaciolândia, Brasileia ou Rio Branco.",
  evac:"Rio Branco",
  clima:{p:["Quente e úmido, com chuvas de novembro a abril e friagem ocasional no inverno."]},
  cultura:{places:[["Ponte da Integração","Iñapari (Peru)","Cidade peruana vizinha, início do trecho peruano da Estrada do Pacífico."]]},
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para o Peru e a Bolívia.")});

addPEF({id:"placido-de-castro", cidade:"Plácido de Castro", uf:"AC", estado:"Acre", coord:"10°20′S 67°11′W · fronteira com a Bolívia · UTC−5",
  tags:["3º PEF","4º BIS","Bolívia"], resumo:"Cidade na fronteira com a Bolívia, às margens do rio Abunã. Sede do 3º PEF, a cerca de 100 km de Rio Branco.",
  lede:"Uma das localidades de fronteira mais próximas de uma capital. Do outro lado do rio Abunã fica a vila boliviana de Montevidéu, com comércio voltado a brasileiros.",
  fatos:[["População","17,1 mil","estimativa IBGE 2025"],["Até Rio Branco","~100 km","por estrada"],["Fronteira","Bolívia","rio Abunã"],["Fuso","−2 h","em relação a Brasília"],["OM enquadrante","4º BIS","Cmdo Fron AC"],["Grande Comando","CMA","17ª Bda Inf Sl"]],
  om:[["3º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron AC / 4º BIS"]],
  acesso:{p:["A cidade fica a cerca de 100 km de Rio Branco, por estrada asfaltada."]},
  vida:"Plácido de Castro tem comércio local e fica perto o bastante de Rio Branco para compras e serviços.",
  evac:"Rio Branco",
  clima:{p:["Quente e úmido, com chuvas de novembro a abril e friagem ocasional no inverno."]},
  cultura:{places:[["~100 km","Rio Branco","Capital do Acre, com toda a estrutura de cidade."]]},
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Bolívia.")});

addPEF({id:"santa-rosa-do-purus", cidade:"Santa Rosa do Purus", uf:"AC", estado:"Acre", coord:"09°27′S 70°29′W · fronteira com o Peru · UTC−5",
  tags:["4º PEF","4º BIS","Peru","Sem estrada"], destaque:"Sem acesso rodoviário",
  resumo:"Município isolado no Alto Purus, na fronteira com o Peru. Sede do 4º PEF, sem ligação por estrada.",
  lede:"Uma das cidades mais isoladas do Acre. Fica às margens do rio Purus, perto do Peru, e depende de avião ou de longas viagens de barco.",
  fatos:[["População","7,2 mil","estimativa IBGE 2025"],["Acesso","Avião e rio","sem estrada"],["Fronteira","Peru","Alto Purus"],["Fuso","−2 h","em relação a Brasília"],["OM enquadrante","4º BIS","Cmdo Fron AC"],["Grande Comando","CMA","17ª Bda Inf Sl"]],
  om:[["4º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron AC / 4º BIS"]],
  acesso:ISOL, evac:"Rio Branco",
  clima:{p:["Quente e úmido, com chuvas de novembro a abril. Na seca, o rio Purus baixa e a navegação fica mais difícil."]},
  cultura:{p:["A vida gira em torno do rio Purus, com comunidades ribeirinhas e indígenas, como os kaxinawá (huni kuin)."], note:TXT.rios},
  chegada:ENTRY()});

addPEF({id:"marechal-thaumaturgo", cidade:"Marechal Thaumaturgo", uf:"AC", estado:"Acre", coord:"08°56′S 72°47′W · Alto Juruá · UTC−5",
  tags:["DEF","61º BIS","Peru","Sem estrada"], destaque:"Sem acesso rodoviário",
  resumo:"Município no Alto Juruá, perto do Peru. Sede de um Destacamento Especial de Fronteira, com acesso por rio ou avião a partir de Cruzeiro do Sul.",
  lede:"Pequena cidade ribeirinha no Alto Juruá, cercada por reservas extrativistas e terras indígenas, no extremo oeste do Brasil.",
  fatos:[["População","18 mil","estimativa IBGE 2025"],["Base","Cruzeiro do Sul","por rio ou avião"],["Fronteira","Peru","Alto Juruá"],["Fuso","−2 h","em relação a Brasília"],["OM enquadrante","61º BIS","Cmdo Fron Juruá"],["Grande Comando","CMA","17ª Bda Inf Sl"]],
  om:[["Destacamento Esp Fron","Subordinado ao Cmdo Fron Juruá / 61º BIS, de Cruzeiro do Sul"]],
  acesso:{p:["Não há estrada até a cidade. O acesso é pelo rio Juruá ou por avião, a partir de Cruzeiro do Sul."], note:ISOL.note},
  evac:"Cruzeiro do Sul ou Rio Branco",
  clima:{p:["Quente e úmido, com chuvas de outubro a abril. O nível do Juruá define o tempo de viagem."]},
  cultura:{p:["A região do Alto Juruá tem comunidades extrativistas e indígenas, como os ashaninka, e floresta preservada."], note:TXT.rios},
  chegada:ENTRY()});

addPEF({id:"principe-da-beira", cidade:"Príncipe da Beira", uf:"RO", estado:"Rondônia", coord:"12°25′S 64°25′W · rio Guaporé · UTC−4",
  tags:["1º PEF","6º BIS","Bolívia","Forte histórico"], resumo:"Pelotão ao lado do Real Forte Príncipe da Beira, à beira do rio Guaporé, na fronteira com a Bolívia, no município de Costa Marques.",
  lede:"Uma das guarnições com mais história do país: o pelotão fica junto ao Real Forte Príncipe da Beira, fortaleza portuguesa do século XVIII às margens do Guaporé.",
  fatos:[["Município","Costa Marques","13,5 mil hab. (IBGE 2025)"],["Fronteira","Bolívia","rio Guaporé"],["Fuso","−1 h","em relação a Brasília"],["Destaque","Forte","Real Forte Príncipe da Beira"],["OM enquadrante","6º BIS","Cmdo Fron RO"],["Grande Comando","CMA","17ª Bda Inf Sl"]],
  om:[["1º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron RO / 6º BIS, de Guajará-Mirim"]],
  acesso:{p:["O acesso é por estrada a partir de Porto Velho, passando por Costa Marques, com trechos que pioram no período chuvoso. Confirme com a OM as condições antes de viajar."]},
  evac:"Porto Velho",
  clima:{p:["Quente e úmido, com chuvas de novembro a abril e seca no meio do ano, quando há fumaça de queimadas na região."]},
  cultura:{places:[["junto ao pelotão","Real Forte Príncipe da Beira","Fortaleza portuguesa do século XVIII, uma das maiores construções militares coloniais do país."]], note:TXT.rios},
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Bolívia.")});

/* ---------- FRON-3: Alto Rio Negro (5º BIS) ---------- */
const RN = (o)=>addPEF(Object.assign({
  acesso:{p:["Não há estrada. O acesso é por avião, quando há pista, ou por barco a partir de São Gabriel da Cachoeira, numa viagem que pode levar dias. O abastecimento chega pelos mesmos meios, e o combustível é o item mais caro na manutenção do pelotão."], note:ISOL.note, src:[RSM]},
  vida:"Em boa parte dos casos, a família mora junto no pelotão durante o período fixo de permanência. A estrutura de vida inclui a escola, o posto de saúde e a mercearia da comunidade.",
  evac:"São Gabriel da Cachoeira, que tem Hospital de Guarnição, ou Manaus",
  clima:{p:["Muito chuvoso e úmido o ano todo. O Rio Negro e seus afluentes enchem de maio a agosto e baixam de dezembro a fevereiro, quando a navegação fica mais difícil."]},
  omSrc:[SRC.CMA, RSM]
}, o));

RN({id:"iauarete", cidade:"Iauaretê", uf:"AM", estado:"Amazonas", coord:"Rio Uaupés · fronteira com a Colômbia · UTC−4",
  tags:["1º PEF","5º BIS","Colômbia","Alto Rio Negro"], resumo:"Pelotão no rio Uaupés, na fronteira com a Colômbia, em São Gabriel da Cachoeira. Uma das maiores povoações indígenas do Alto Rio Negro.",
  lede:"Distrito de São Gabriel da Cachoeira no Uaupés, com grande população indígena de várias etnias do Alto Rio Negro.",
  fatos:[["Município","S. Gabriel da Cachoeira","AM"],["Fronteira","Colômbia","rio Uaupés"],["Acesso","Avião e rio","sem estrada"],["Efetivo PEF","35–50","militares, em média"],["OM enquadrante","5º BIS","Cmdo Fron Rio Negro"],["Grande Comando","CMA","2ª Bda Inf Sl"]],
  om:[["1º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Rio Negro / 5º BIS"]],
  cultura:{p:["A povoação reúne povos indígenas do Uaupés, como tariano, tukano e outros. O respeito às regras das comunidades faz parte do dia a dia."], note:TXT.rios},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

RN({id:"querari", cidade:"Querari", uf:"AM", estado:"Amazonas", coord:"Alto Uaupés · fronteira com a Colômbia · UTC−4",
  tags:["2º PEF","5º BIS","Colômbia","Alto Rio Negro"], resumo:"Pelotão no Alto Uaupés, na fronteira com a Colômbia. Um dos pontos mais isolados do Alto Rio Negro.",
  lede:"Pelotão em área de floresta e comunidades indígenas, no extremo noroeste do Amazonas, acessível por avião ou longa viagem de barco.",
  fatos:[["Município","S. Gabriel da Cachoeira","AM"],["Fronteira","Colômbia","Alto Uaupés"],["Acesso","Avião e rio","sem estrada"],["Efetivo PEF","35–50","militares, em média"],["OM enquadrante","5º BIS","Cmdo Fron Rio Negro"],["Grande Comando","CMA","2ª Bda Inf Sl"]],
  om:[["2º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Rio Negro / 5º BIS"]],
  cultura:{p:["A vida gira em torno do rio e das comunidades indígenas da região. O contato segue as orientações da OM."], note:TXT.rios},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

RN({id:"sao-joaquim", cidade:"São Joaquim", uf:"AM", estado:"Amazonas", coord:"Alto Rio Negro · fronteira com a Colômbia · UTC−4",
  tags:["3º PEF","5º BIS","Colômbia","Alto Rio Negro"], resumo:"Pelotão no noroeste do Amazonas, na fronteira com a Colômbia, subordinado ao 5º BIS de São Gabriel da Cachoeira.",
  lede:"Pelotão isolado na faixa de fronteira com a Colômbia, numa região de floresta e comunidades indígenas do Alto Rio Negro.",
  fatos:[["Município","S. Gabriel da Cachoeira","AM"],["Fronteira","Colômbia","Alto Rio Negro"],["Acesso","Avião e rio","sem estrada"],["Efetivo PEF","35–50","militares, em média"],["OM enquadrante","5º BIS","Cmdo Fron Rio Negro"],["Grande Comando","CMA","2ª Bda Inf Sl"]],
  om:[["3º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Rio Negro / 5º BIS"]],
  cultura:{p:["A vida gira em torno do rio e das comunidades indígenas da região. O contato segue as orientações da OM."], note:TXT.rios},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

RN({id:"cucui", cidade:"Cucuí", uf:"AM", estado:"Amazonas", coord:"Rio Negro · tríplice fronteira · UTC−4",
  tags:["4º PEF","5º BIS","Colômbia","Venezuela"], destaque:"Tríplice fronteira",
  resumo:"Pelotão na tríplice divisa entre Brasil, Colômbia e Venezuela, no ponto onde o Rio Negro entra no Brasil.",
  lede:"Base do 4º PEF, por onde passa o tráfego fluvial que desce o Rio Negro vindo da Colômbia e da Venezuela. Ao lado fica a Pedra do Cucuí, grande formação rochosa à beira do rio.",
  fatos:[["Município","S. Gabriel da Cachoeira","AM"],["Fronteira","2 países","Colômbia e Venezuela"],["Acesso","Avião e rio","sem estrada"],["Efetivo PEF","35–50","militares, em média"],["OM enquadrante","5º BIS","Cmdo Fron Rio Negro"],["Grande Comando","CMA","2ª Bda Inf Sl"]],
  om:[["4º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Rio Negro / 5º BIS. Controla o tráfego fluvial na tríplice divisa"]],
  cultura:{places:[["junto à vila","Pedra do Cucuí","Formação rochosa à beira do Rio Negro, marco da tríplice fronteira."]], note:TXT.rios},
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Colômbia e a Venezuela.")});

RN({id:"maturaca", cidade:"Maturacá", uf:"AM", estado:"Amazonas", coord:"Terra Indígena Yanomami · fronteira com a Venezuela · UTC−4",
  tags:["5º PEF","5º BIS","Yanomami","Pico da Neblina"], resumo:"Pelotão junto às aldeias yanomami de Maturacá, perto da fronteira com a Venezuela e da região do Pico da Neblina.",
  lede:"Pelotão em território yanomami, na área do Parque Nacional do Pico da Neblina, o ponto mais alto do Brasil.",
  fatos:[["Município","S. Gabriel da Cachoeira","AM"],["Fronteira","Venezuela","noroeste do AM"],["Acesso","Avião e rio","sem estrada"],["Destaque","Pico da Neblina","ponto mais alto do Brasil"],["OM enquadrante","5º BIS","Cmdo Fron Rio Negro"],["Grande Comando","CMA","2ª Bda Inf Sl"]],
  om:[["5º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Rio Negro / 5º BIS"]],
  omSrc:[SRC.CMA, RSM, ["Revista de Geografia (UFPE)","https://periodicos.ufpe.br/revistas/revistageografia/article/download/228661/23083"]],
  cultura:{p:["O pelotão convive com comunidades yanomami. A região é a porta de entrada para o Pico da Neblina, cuja visita exige autorização e acompanhamento indígena."]},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

RN({id:"pari-cachoeira", cidade:"Pari-Cachoeira", uf:"AM", estado:"Amazonas", coord:"Rio Tiquié · fronteira com a Colômbia · UTC−4",
  tags:["6º PEF","5º BIS","Colômbia","Rio Tiquié"], resumo:"Destacamento na calha do rio Tiquié, na fronteira com a Colômbia, no Alto Rio Negro.",
  lede:"Povoação indígena no rio Tiquié, afluente do Uaupés, com presença militar para vigilância da fronteira com a Colômbia.",
  fatos:[["Município","S. Gabriel da Cachoeira","AM"],["Fronteira","Colômbia","rio Tiquié"],["Acesso","Avião e rio","sem estrada"],["Efetivo","35–50","militares, em média"],["OM enquadrante","5º BIS","Cmdo Fron Rio Negro"],["Grande Comando","CMA","2ª Bda Inf Sl"]],
  om:[["6º PEF","Fração de fronteira subordinada ao Cmdo Fron Rio Negro / 5º BIS"]],
  cultura:{p:["A região é habitada por povos indígenas do Tiquié, como os tukano. O contato segue as orientações da OM."], note:TXT.rios},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

RN({id:"tunui", cidade:"Tunuí", uf:"AM", estado:"Amazonas", coord:"Rio Içana · fronteira com a Colômbia · UTC−4",
  tags:["7º PEF","5º BIS","Colômbia","Rio Içana"], resumo:"Destacamento em Tunuí-Cachoeira, no rio Içana, na região de fronteira com a Colômbia.",
  lede:"Povoação do rio Içana, território do povo baniwa, com presença militar para vigilância da fronteira com a Colômbia.",
  fatos:[["Município","S. Gabriel da Cachoeira","AM"],["Fronteira","Colômbia","rio Içana"],["Acesso","Avião e rio","sem estrada"],["Efetivo","35–50","militares, em média"],["OM enquadrante","5º BIS","Cmdo Fron Rio Negro"],["Grande Comando","CMA","2ª Bda Inf Sl"]],
  om:[["7º PEF","Fração de fronteira subordinada ao Cmdo Fron Rio Negro / 5º BIS"]],
  cultura:{p:["A região do Içana é território do povo baniwa. O contato com as comunidades segue as orientações da OM."], note:TXT.rios},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")});

/* ---------- FRON-4: Solimões e Japurá ---------- */
const SOL = (o, evacOM)=>addPEF(Object.assign({
  acesso:ISOL, evac:evacOM, clima:EQ, omSrc:[SRC.CMA],
  cultura:{p:["A vida gira em torno do rio, com comunidades ribeirinhas e indígenas. O contato segue as orientações da OM."], note:TXT.rios}
}, o));

SOL({id:"vila-bittencourt", cidade:"Vila Bittencourt", uf:"AM", estado:"Amazonas", coord:"Rio Japurá · fronteira com a Colômbia · UTC−4",
  tags:["3º PEF","17º BIS","Colômbia","Rio Japurá"], resumo:"Pelotão no rio Japurá, na fronteira com a Colômbia, no município de Japurá. Subordinado ao 17º BIS de Tefé.",
  lede:"Pelotão no ponto onde o Japurá entra no Brasil, vindo da Colômbia, onde o rio se chama Caquetá.",
  fatos:[["Município","Japurá","9,4 mil hab. (IBGE 2025)"],["Fronteira","Colômbia","rio Japurá"],["Acesso","Avião e rio","sem estrada"],["Fuso","−1 h","em relação a Brasília"],["OM enquadrante","17º BIS","Cmdo Fron Japurá"],["Grande Comando","CMA","16ª Bda Inf Sl"]],
  om:[["3º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Japurá / 17º BIS, de Tefé"]],
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Colômbia.")}, "Tefé ou Manaus");

SOL({id:"palmeiras-do-javari", cidade:"Palmeiras do Javari", uf:"AM", estado:"Amazonas", coord:"Rio Javari · fronteira com o Peru · UTC−4",
  tags:["1º PEF","8º BIS","Peru","Vale do Javari"], resumo:"Pelotão no alto rio Javari, na fronteira com o Peru, no município de Atalaia do Norte. Subordinado ao 8º BIS de Tabatinga.",
  lede:"Pelotão na região do Vale do Javari, área com a maior concentração de povos indígenas isolados do mundo.",
  fatos:[["Município","Atalaia do Norte","15,9 mil hab. (IBGE 2025)"],["Fronteira","Peru","rio Javari"],["Acesso","Avião e rio","sem estrada"],["Fuso","−1 h","em relação a Brasília"],["OM enquadrante","8º BIS","Cmdo Fron Solimões"],["Grande Comando","CMA","Cmdo Fron Solimões"]],
  om:[["1º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Solimões / 8º BIS"]],
  cultura:{p:["O Vale do Javari tem regras rígidas de proteção aos povos indígenas, inclusive isolados. Siga sempre as orientações da OM e da Funai."], note:TXT.rios},
  chegada:ENTRY("Siga as orientações sobre contato com as comunidades indígenas.")}, "Tabatinga, que tem Hospital de Guarnição, ou Manaus");

SOL({id:"ipiranga", cidade:"Ipiranga", uf:"AM", estado:"Amazonas", coord:"Rio Içá · fronteira com a Colômbia · UTC−4",
  tags:["2º PEF","8º BIS","Colômbia","Rio Içá"], resumo:"Pelotão no rio Içá, chamado Putumayo na Colômbia, na fronteira colombiana. Subordinado ao 8º BIS de Tabatinga.",
  lede:"Pelotão no ponto onde o Içá entra no Brasil, no município de Santo Antônio do Içá, com aeródromo próprio.",
  fatos:[["Município","Sto. Antônio do Içá","30,7 mil hab. (IBGE 2025)"],["Fronteira","Colômbia","rio Içá / Putumayo"],["Acesso","Avião e rio","sem estrada"],["Fuso","−1 h","em relação a Brasília"],["OM enquadrante","8º BIS","Cmdo Fron Solimões"],["Grande Comando","CMA","Cmdo Fron Solimões"]],
  om:[["2º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Solimões / 8º BIS"]],
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para a Colômbia.")}, "Tabatinga, que tem Hospital de Guarnição, ou Manaus");

SOL({id:"estirao-do-equador", cidade:"Estirão do Equador", uf:"AM", estado:"Amazonas", coord:"Rio Javari · fronteira com o Peru · UTC−4",
  tags:["4º PEF","8º BIS","Peru","Rio Javari"], resumo:"Pelotão no rio Javari, na fronteira com o Peru, no município de Atalaia do Norte. Subordinado ao 8º BIS de Tabatinga.",
  lede:"Pelotão às margens do Javari, rio que marca a fronteira com o Peru, em uma das regiões mais isoladas do Amazonas.",
  fatos:[["Município","Atalaia do Norte","15,9 mil hab. (IBGE 2025)"],["Fronteira","Peru","rio Javari"],["Acesso","Avião e rio","sem estrada"],["Fuso","−1 h","em relação a Brasília"],["OM enquadrante","8º BIS","Cmdo Fron Solimões"],["Grande Comando","CMA","Cmdo Fron Solimões"]],
  om:[["4º PEF","Pelotão Especial de Fronteira, subordinado ao Cmdo Fron Solimões / 8º BIS"]],
  chegada:ENTRY("Veja com a OM as regras para militares atravessarem para o Peru.")}, "Tabatinga, que tem Hospital de Guarnição, ou Manaus");
})();
