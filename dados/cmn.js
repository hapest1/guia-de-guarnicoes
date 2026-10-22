/* Comando Militar do Norte (lotes CMN-1 e CMN-2) */
(function(){
const N = {regiao:"Norte", comando:"CMN"};
const W = SRC.CMN;
const FUSO = ["Fuso","0 h","mesmo horário de Brasília"];

/* ---------- CMN-1 ---------- */
addG(Object.assign({}, N, {id:"belem", cidade:"Belém", uf:"PA", estado:"Pará", coord:"01°27′S 48°30′W · baía do Guajará · UTC−3",
  tags:["CMN","8ª RM","Colégio Militar","HGeB","2º BIS"], destaque:"Sede do CMN",
  resumo:"Metrópole da foz do Amazonas e sede do Comando Militar do Norte. Tem Colégio Militar, Hospital Geral e a cultura mais marcante do Norte.",
  lede:"Capital do Pará e porta de entrada da Amazônia oriental. Sede do CMN e da 8ª Região Militar, com estrutura de cidade grande, culinária famosa e o Círio de Nazaré, uma das maiores festas religiosas do mundo.",
  fatos:[["População","1,4 mi","estimativa IBGE 2025"],FUSO,["Aluguel","R$ 64/m²","FipeZAP, fev/2026"],["Clima","23–33 °C","chuvas de dezembro a maio"],["Cesta básica","R$ 709","DIEESE, ago/2026"],["Grande Comando","CMN","8ª RM"]],
  omP:["Belém é sede do <b>Comando Militar do Norte</b> e da <b>8ª Região Militar</b>."],
  om:[["CMN e Cia Cmdo","Comando Militar de Área"],["8ª RM","Região Militar e Circunscrições de Serviço Militar"],["Colégio Militar de Belém","Sistema Colégio Militar do Brasil"],["Hospital Geral de Belém","Referência de saúde do Exército no CMN"],["8º Gpt Log","Com 8º B Sup, 8º B Trnsp e 8º B Mnt"],["2º BIS","Infantaria de selva"],["Outras","8ª Cia Intlg, 15ª Cia PE, entre outras"]],
  acesso:{p:["O Aeroporto Internacional de Belém tem voos diretos para as principais capitais. Por terra, a cidade é ligada ao resto do país pela BR-316 e pela BR-010 (Belém–Brasília)."]},
  custo:{p:[TXT.fipe("Belém","63,79","+15,77%"),"É um dos aluguéis mais caros do país por metro quadrado, acima de capitais como Brasília e Porto Alegre.",TXT.cesta("Belém","709,12")], src:[SRC.fipe,SRC.dieese]},
  saude:{p:["A guarnição conta com o <b>Hospital Geral de Belém</b>, que atende os beneficiários do FuSEx, além de ampla rede civil conveniada."], src:[W]},
  educacao:{p:["A cidade tem o <b>Colégio Militar de Belém</b>. No ensino superior há a Universidade Federal do Pará (UFPA), a Universidade do Estado do Pará (UEPA), a UFRA, o IFPA e muitas faculdades particulares."]},
  clima:{p:["Equatorial, quente e muito úmido. Chove quase todo dia, com mais intensidade de dezembro a maio, geralmente em pancadas à tarde."], clima:"cccccssssssc", leg:["Mais chuvoso (dez–mai)","Menos chuvoso (jun–nov)"]},
  cultura:{p:["Belém tem uma das culinárias mais conhecidas do país, com açaí, tacacá, maniçoba e pato no tucupi. Em 2025 a cidade sediou a COP30."],
    places:[["Outubro","Círio de Nazaré","Procissão que reúne milhões de pessoas no segundo domingo de outubro."],["Centro","Ver-o-Peso","Mercado à beira da baía, com peixes, ervas e comida regional."],["Centro","Estação das Docas","Antigos galpões do porto com restaurantes à beira-rio."],["Barco","Ilha do Combu","Passeio curto de barco para restaurantes na floresta."],["Barco ou avião","Ilha de Marajó","Praias, búfalos e cerâmica marajoara."]]},
  chegada:["Pesquise bairros pelo trajeto até a OM e pela ocorrência de alagamentos.","Peça vaga no Colégio Militar de Belém seguindo o calendário de matrícula de dependentes."]}));

addG(Object.assign({}, N, {id:"macapa", cidade:"Macapá", uf:"AP", estado:"Amapá", coord:"00°02′N 51°03′W · Linha do Equador · UTC−3",
  tags:["22ª Bda Inf Sl","34º BIS","Cmdo Fron AP","Equador"], destaque:"Sede de Brigada",
  resumo:"Capital do Amapá, cortada pela Linha do Equador, à beira do Amazonas. Sede da 22ª Brigada de Infantaria de Selva e do Comando de Fronteira Amapá.",
  lede:"Única capital brasileira cortada pela Linha do Equador. Não tem ligação rodoviária com o resto do país: chega-se de avião ou de barco a partir de Belém.",
  fatos:[["População","490 mil","estimativa IBGE 2025"],FUSO,["Estrada","Isolada","só avião ou barco"],["Clima","23–33 °C","chuvas de janeiro a junho"],["Cesta básica","R$ 703","DIEESE, ago/2026"],["Grande Comando","CMN","22ª Bda Inf Sl"]],
  om:[["Cmdo 22ª Bda Inf Sl e Cia Cmdo","Comando da Brigada"],["Cmdo Fron AP / 34º BIS","Responde pela fronteira com a Guiana Francesa e o Suriname"]],
  acesso:{p:["Não há estrada ligando o Amapá ao resto do Brasil. O acesso é por avião ou por barco a partir de Belém. Dentro do estado, a BR-156 segue até Oiapoque, na fronteira com a Guiana Francesa."], note:"<b>Mudança:</b> carro e bagagem chegam de balsa a partir de Belém. Planeje com antecedência."},
  custo:{p:[TXT.cesta("Macapá","702,68"),"Macapá tem área de livre comércio, junto com Santana, o que reduz impostos sobre parte dos produtos."], note:TXT.pendAluguel, src:[SRC.dieese]},
  saude:{p:["Casos especializados podem ser encaminhados a Belém, que tem o Hospital Geral do Exército."], note:TXT.pendSaude},
  educacao:{p:[TXT.semCM+" A cidade tem a Universidade Federal do Amapá (UNIFAP), a UEAP e o IFAP."]},
  clima:{p:["Equatorial, quente e úmido. A estação chuvosa vai de janeiro a junho, e o segundo semestre é mais seco e quente."], clima:"ccccccssssss", leg:["Chuvoso (jan–jun)","Mais seco (jul–dez)"]},
  cultura:{places:[["Cidade","Marco Zero do Equador","Monumento sobre a linha do Equador. Nos equinócios, o sol se alinha com o marco."],["Orla","Fortaleza de São José","Fortaleza portuguesa do século XVIII à beira do Amazonas."],["Junho e julho","Marabaixo","Manifestação afro-amapaense de música e dança."]]},
  chegada:["Planeje a mudança por balsa a partir de Belém."]}));

addG(Object.assign({}, N, {id:"sao-luis", cidade:"São Luís", uf:"MA", estado:"Maranhão", coord:"02°31′S 44°18′W · ilha de São Luís · UTC−3",
  tags:["24º BI L","Patrimônio Mundial","Bumba meu boi"], destaque:"Capital",
  resumo:"Capital do Maranhão, numa ilha, com centro histórico tombado pela Unesco. Sede do 24º Batalhão de Infantaria Leve.",
  lede:"Cidade de casarões com fachadas de azulejo, capital do bumba meu boi e porta de entrada para os Lençóis Maranhenses.",
  fatos:[["População","1,09 mi","estimativa IBGE 2025"],FUSO,["Aluguel","R$ 58/m²","FipeZAP, fev/2026"],["Clima","24–32 °C","chuvas de janeiro a junho"],["Cesta básica","R$ 662","DIEESE, ago/2026"],["Grande Comando","CMN","8ª RM"]],
  om:[["24º BI L","Batalhão de Infantaria Leve"]],
  acesso:{p:["O aeroporto tem voos diretos para várias capitais. Por terra, a BR-135 liga a ilha ao continente e às rodovias para Teresina e o resto do Nordeste."]},
  custo:{p:[TXT.fipe("São Luís","57,73","+7,52%"),TXT.cesta("São Luís","661,79")], src:[SRC.fipe,SRC.dieese]},
  saude:{p:["Casos especializados podem ser encaminhados a Belém, que tem o Hospital Geral do Exército."], note:TXT.pendSaude},
  educacao:{p:[TXT.semCM+" A cidade tem a Universidade Federal do Maranhão (UFMA), a UEMA, o IFMA e faculdades particulares."]},
  clima:{p:["Quente o ano todo, com chuvas de janeiro a junho e segundo semestre seco e ventoso."], clima:"ccccccssssss", leg:["Chuvoso (jan–jun)","Seco (jul–dez)"]},
  cultura:{places:[["Centro","Centro Histórico","Conjunto de casarões coloniais com azulejos, Patrimônio Mundial da Unesco."],["Junho","Bumba meu boi","A maior festa da cidade, com grupos de vários sotaques."],["~250 km","Lençóis Maranhenses","Dunas e lagoas, com acesso por Barreirinhas. As lagoas enchem no meio do ano."]]},
  chegada:[]}));

addG(Object.assign({}, N, {id:"maraba", cidade:"Marabá", uf:"PA", estado:"Pará", coord:"05°22′S 49°07′W · rios Tocantins e Itacaiúnas · UTC−3",
  tags:["23ª Bda Inf Sl","52º BIS","1º GAC Sl","H Gu Marabá"], destaque:"Sede de Brigada",
  resumo:"Polo do sudeste do Pará, no encontro dos rios Tocantins e Itacaiúnas. Sede da 23ª Brigada de Infantaria de Selva e de um Hospital de Guarnição.",
  lede:"Cidade de porte médio, ligada à mineração de Carajás e à Transamazônica. Tem acesso por estrada e aeroporto com voos para capitais.",
  fatos:[["População","291 mil","estimativa IBGE 2025"],FUSO,["Rodovias","BR-230","Transamazônica, BR-155 e BR-222"],["Clima","22–34 °C","chuvas de novembro a abril"],["Saúde militar","H Gu","Hospital de Guarnição"],["Grande Comando","CMN","23ª Bda Inf Sl"]],
  om:[["Cmdo 23ª Bda Inf Sl e Cia Cmdo","Comando da Brigada"],["52º BIS","Infantaria de selva"],["1º GAC Sl","Artilharia de campanha de selva"],["23º B Log Sl","Apoio logístico"],["6ª Cia E Cmb Sl, 23ª Cia Com Sl e 33º Pel PE","Engenharia, comunicações e Polícia do Exército"],["H Gu Marabá","Hospital de Guarnição"]],
  omSrc:[W,["COFEN (H Gu Marabá)","https://inscricoes-cbcenf.cofen.gov.br/anais/20/24193/trabalhoresumodownload"]],
  acesso:{p:["Marabá tem aeroporto com voos para Belém, Brasília e outras capitais. Por terra, é cortada pela Transamazônica (BR-230) e ligada a Belém e ao Tocantins pela BR-155 e pela BR-222."]},
  custo:{p:["A economia ligada à mineração de Carajás mantém a cidade movimentada, o que pressiona o aluguel."], note:TXT.pendAluguel},
  saude:{p:["A guarnição tem o <b>Hospital de Guarnição de Marabá</b>, que atende os beneficiários do FuSEx com pronto atendimento todos os dias. Casos de maior complexidade podem ser encaminhados a Belém."], src:[["COFEN","https://inscricoes-cbcenf.cofen.gov.br/anais/20/24193/trabalhoresumodownload"]]},
  educacao:{p:[TXT.semCM+" A cidade tem a Universidade Federal do Sul e Sudeste do Pará (Unifesspa), a UEPA e o IFPA."]},
  clima:{p:["Quente, com chuvas de novembro a abril e seca no meio do ano, quando os rios baixam e aparecem praias no Tocantins."], clima:"ccccsssssscc", leg:["Chuvoso (nov–abr)","Seco (mai–out)"]},
  cultura:{places:[["Julho","Praias do Tocantins","Na seca, bancos de areia viram praias movimentadas."],["Região","Serra dos Carajás","Floresta Nacional e uma das maiores minas de ferro do mundo."]], note:TXT.rios},
  chegada:["Pesquise bairros longe das áreas que alagam na cheia do Tocantins."]}));

addG(Object.assign({}, N, {id:"imperatriz", cidade:"Imperatriz", uf:"MA", estado:"Maranhão", coord:"05°31′S 47°29′W · rio Tocantins · UTC−3",
  tags:["50º BIS","Rio Tocantins","BR-010"], destaque:"Polo regional",
  resumo:"Segunda maior cidade do Maranhão, à beira do Tocantins e da Belém–Brasília. Sede do 50º BIS.",
  lede:"Polo comercial e de serviços da divisa entre Maranhão, Pará e Tocantins, com acesso fácil por estrada e aeroporto regional.",
  fatos:[["População","286 mil","estimativa IBGE 2025"],FUSO,["Rodovia","BR-010","Belém–Brasília"],["Clima","22–34 °C","chuvas de novembro a abril"],["Rio","Tocantins","orla e praias na seca"],["Grande Comando","CMN","8ª RM"]],
  om:[["50º BIS","Batalhão de infantaria de selva"]],
  acesso:{p:["A cidade fica na BR-010, a Belém–Brasília, e tem aeroporto com voos para capitais próximas."]},
  custo:{p:["Imperatriz é polo de comércio e serviços para uma região grande, com boa oferta de produtos."], note:TXT.pendAluguel},
  saude:{p:["A cidade é polo regional de saúde. Casos especializados podem ser encaminhados a Belém ou a Brasília."], note:TXT.pendSaude},
  educacao:{p:[TXT.semCM+" A cidade tem a Universidade Federal do Maranhão (campus), a Universidade Estadual da Região Tocantina (UEMASUL) e o IFMA."]},
  clima:{p:["Quente, com chuvas de novembro a abril e seca no meio do ano."], clima:"ccccsssssscc", leg:["Chuvoso (nov–abr)","Seco (mai–out)"]},
  cultura:{places:[["Cidade","Beira-Rio","Orla do Tocantins, ponto de encontro da cidade."],["Na seca","Praias do Tocantins","Bancos de areia que viram praias no meio do ano."]], note:TXT.rios},
  chegada:[]}));

/* ---------- CMN-2: interior do Pará ---------- */
const PA = (o)=>addG(Object.assign({}, N, {
  custo:{p:[o.custoP||"O comércio local atende o básico. Compras maiores costumam ser feitas na capital ou em polos regionais."], note:TXT.pendAluguel},
  saude:{p:[`Casos especializados costumam ser encaminhados a ${o.ref}.`], note:TXT.pendSaude},
  clima:{p:["Quente e úmido, com chuvas de dezembro a maio e seca no segundo semestre."], clima:"cccccssssssc", leg:["Chuvoso (dez–mai)","Seco (jun–nov)"]}
}, o));

PA({id:"altamira", cidade:"Altamira", uf:"PA", estado:"Pará", coord:"03°12′S 52°12′W · rio Xingu · UTC−3",
  tags:["51º BIS","Rio Xingu","Belo Monte","Transamazônica"], destaque:"Interior",
  resumo:"Cidade às margens do Xingu, na Transamazônica, perto da usina de Belo Monte. Sede do 51º BIS.",
  lede:"Polo do médio Xingu, que cresceu com a construção da usina de Belo Monte. Tem aeroporto e acesso pela Transamazônica.",
  fatos:[["População","139 mil","estimativa IBGE 2025"],FUSO,["Rodovia","BR-230","Transamazônica"],["Rio","Xingu","praias na seca"],["OM","51º BIS","infantaria de selva"],["Grande Comando","CMN","8ª RM"]],
  om:[["51º BIS","Batalhão de infantaria de selva"]],
  acesso:{p:["Altamira tem aeroporto com voos regionais e fica na Transamazônica (BR-230), que tem trechos de terra em direção a Marabá e Itaituba."]},
  ref:"Belém ou Marabá",
  educacao:{p:[TXT.semCM+" A cidade tem campus da UFPA e do IFPA."]},
  cultura:{places:[["Cidade","Orla do Xingu","Calçadão à beira do rio e praias na seca."]], note:TXT.rios}});

PA({id:"itaituba", cidade:"Itaituba", uf:"PA", estado:"Pará", coord:"04°16′S 55°59′W · rio Tapajós · UTC−3",
  tags:["53º BIS","Rio Tapajós","BR-163","Garimpo"], destaque:"Interior",
  resumo:"Cidade às margens do Tapajós, no cruzamento da BR-163 com a Transamazônica. Sede do 53º BIS.",
  lede:"Polo do médio Tapajós, com economia ligada ao garimpo de ouro e ao escoamento de grãos pela BR-163.",
  fatos:[["População","135 mil","estimativa IBGE 2025"],FUSO,["Rodovias","BR-163","e BR-230"],["Rio","Tapajós","praias na seca"],["OM","53º BIS","infantaria de selva"],["Grande Comando","CMN","8ª RM"]],
  om:[["53º BIS","Batalhão de infantaria de selva"]],
  acesso:{p:["A cidade tem aeroporto regional e fica no encontro da BR-163, que liga ao Mato Grosso, com a Transamazônica (BR-230). Há também transporte fluvial pelo Tapajós até Santarém."]},
  ref:"Santarém ou Belém",
  educacao:{p:[TXT.semCM+" A cidade tem campus da Universidade Federal do Oeste do Pará (UFOPA) e do IFPA."]},
  cultura:{places:[["Região","Parque Nacional da Amazônia","Floresta preservada às margens do Tapajós."]], note:TXT.rios}});

PA({id:"tucurui", cidade:"Tucuruí", uf:"PA", estado:"Pará", coord:"03°46′S 49°40′W · rio Tocantins · UTC−3",
  tags:["23º Esqd C Sl","Cavalaria","UHE Tucuruí"], destaque:"Interior",
  resumo:"Cidade da usina hidrelétrica de Tucuruí, no rio Tocantins. Sede do 23º Esquadrão de Cavalaria de Selva.",
  lede:"Cidade que cresceu com a construção da Usina de Tucuruí, uma das maiores hidrelétricas do país, no baixo Tocantins.",
  fatos:[["População","96 mil","estimativa IBGE 2025"],FUSO,["Destaque","UHE","Usina de Tucuruí"],["Rio","Tocantins","lago da usina"],["OM","23º Esqd C Sl","cavalaria de selva"],["Grande Comando","CMN","23ª Bda Inf Sl"]],
  om:[["23º Esqd C Sl","Esquadrão de Cavalaria de Selva, na área da 23ª Bda Inf Sl"]],
  acesso:{p:["A cidade tem aeroporto regional e acesso rodoviário a Marabá e a Belém, pela BR-422 e rodovias estaduais."]},
  ref:"Marabá, que tem Hospital de Guarnição, ou Belém",
  educacao:{p:[TXT.semCM+" A cidade tem campus da UFPA e da UEPA."]},
  cultura:{places:[["Cidade","Lago de Tucuruí","Represa com ilhas, praias e pesca esportiva."]], note:TXT.rios}});

PA({id:"santarem", cidade:"Santarém", uf:"PA", estado:"Pará", coord:"02°26′S 54°42′W · rios Tapajós e Amazonas · UTC−3",
  tags:["8º BEC","Rio Tapajós","Alter do Chão"], destaque:"Polo regional",
  resumo:"Terceira maior cidade do Pará, no encontro do Tapajós com o Amazonas. Sede do 8º BEC e vizinha de Alter do Chão.",
  lede:"Polo do oeste paraense, com aeroporto, porto graneleiro e as praias de água doce de Alter do Chão a cerca de 30 km.",
  fatos:[["População","361 mil","estimativa IBGE 2025"],FUSO,["Rodovia","BR-163","até o Mato Grosso"],["Destaque","Alter do Chão","praias do Tapajós"],["OM","8º BEC","engenharia de construção"],["Grande Comando","CMN","território da 8ª RM"]],
  om:[["8º BEC","Batalhão de Engenharia de Construção, enquadrado pelo 2º Gpt E, de Manaus"]],
  omSrc:[SRC.CMA],
  acesso:{p:["Santarém tem aeroporto com voos para Belém, Manaus e outras capitais. A BR-163 liga a cidade ao Mato Grosso, e há barcos regulares para Belém e Manaus."]},
  custoP:"Santarém é polo comercial do oeste do Pará, com boa oferta de serviços.",
  ref:"Belém ou Manaus",
  educacao:{p:[TXT.semCM+" A cidade tem a Universidade Federal do Oeste do Pará (UFOPA), a UEPA e o IFPA."]},
  cultura:{places:[["~30 km","Alter do Chão","Praias de areia branca no Tapajós, que aparecem na seca."],["Setembro","Festa do Çairé","Festa tradicional de Alter do Chão."],["Orla","Encontro das águas","Tapajós e Amazonas correm lado a lado em frente à cidade."]], note:TXT.rios}});
})();
