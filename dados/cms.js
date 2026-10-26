/* Comando Militar do Sul (lotes CMS-1 a CMS-10) */
(function(){
const W = SRC.CMS;
const FAMURS = ["FAMURS (IBGE 2025)","https://famurs.com.br/uploads/midia/48757/Pop_2025_x_coef_FPM.pdf"];
const FUSO = ["Fuso","0 h","mesmo horário de Brasília"];
const POP = (v)=>["População",v,"Censo 2022, aprox."];
const FRIO = {p:["Subtropical, com as quatro estações bem marcadas. O inverno é frio, com geadas e vento minuano, e o verão é quente. Chove o ano todo, sem estação seca definida."]};
const SERRA = {p:["Subtropical de altitude, com inverno rigoroso, geadas frequentes e possibilidade de neve nos dias mais frios. O verão é ameno."]};
const LITORAL = {p:["Subtropical, com verão quente e úmido e inverno ameno. Chove o ano todo."]};
const FRONT = (pais)=>`<b>Fronteira:</b> veja com a OM as regras para militares atravessarem para ${pais}.`;
/* Monta ficha do CMS com padrões regionais */
const S = (o)=>addG(Object.assign({regiao:"Sul", comando:"CMS",
  acesso:{p:[o.acessoP]},
  custo:o.custoObj || {p:[o.custoP||"O comércio local atende o dia a dia, e cidades maiores da região ficam a poucas horas."], note:TXT.pendAluguel},
  saude:o.saudeObj || {p:[`Casos especializados costumam ser encaminhados a ${o.ref}.`], note:TXT.pendSaude},
  educacao:{p:[o.edu]},
  clima:o.climaObj || FRIO,
  cultura:{p:o.cultP||[], places:o.places, note:o.cultNote},
  chegada:o.chegadaX||[]
}, o));
const HMAPA = "Porto Alegre, que tem o Hospital Militar de Área";
const HGUSM = "Santa Maria, que tem Hospital de Guarnição";
const HGEC = "Curitiba, que tem o Hospital Geral";
const HGUFLN = "Florianópolis, que tem Hospital de Guarnição";
const HG = (cid)=>({p:[`A guarnição conta com o <b>Hospital de Guarnição de ${cid}</b>, que atende os beneficiários do FuSEx. Casos de maior complexidade podem ser encaminhados a Porto Alegre, onde fica o Hospital Militar de Área.`], src:[W]});

/* ---------- CMS-1: Fronteira oeste ---------- */
S({id:"uruguaiana", cidade:"Uruguaiana", uf:"RS", estado:"Rio Grande do Sul", coord:"29°45′S 57°05′W · rio Uruguai · UTC−3",
  tags:["2ª Bda C Mec","8º RC Mec","22º GAC","P Med Gu","Cavalaria","Argentina"], destaque:"Sede de Brigada",
  resumo:"Cidade da fronteira oeste gaúcha, ligada à argentina Paso de los Libres por ponte internacional. Sede da 2ª Brigada de Cavalaria Mecanizada e de um Posto Médico de Guarnição.",
  lede:"Uma das guarnições mais tradicionais da Cavalaria, à beira do rio Uruguai, com um dos maiores portos secos da América Latina e cultura gaúcha de campanha.",
  fatos:[["População","121 mil","estimativa IBGE 2025"],FUSO,["Aluguel 2 quartos","~R$ 1.275","mediana de anúncios, out/2026"],["Saúde militar","P Med Gu","Posto Médico de Guarnição"],["Fronteira","Argentina","Paso de los Libres"],["Grande Comando","CMS","2ª Bda C Mec"]],
  om:[["Cmdo 2ª Bda C Mec e Esqd Cmdo","Comando da Brigada"],["8º RC Mec","Regimento de Cavalaria Mecanizado"],["22º GAC","Grupo de Artilharia de Campanha"],["2º Pel PE","Polícia do Exército"],["P Med Gu Uruguaiana","Posto Médico da Guarnição, vinculado ao Cmdo da 2ª Bda C Mec"]],
  omSrc:[W,["2ª Bda C Mec (P Med Gu)","http://2bdacmec.eb.mil.br/index.php/pt/posto-medico-da-guarnicao-de-uruguaiana"]],
  acessoP:"Uruguaiana fica a cerca de 630 km de Porto Alegre pela BR-290. O aeroporto regional tem voo da Azul para Porto Alegre, com movimento pequeno: cerca de 19 mil passageiros em 2025. A Ponte Internacional liga a cidade a Paso de los Libres, na Argentina.",
  custoObj:{p:["Num levantamento de anúncios de apartamentos para alugar em outubro de 2026, a mediana foi de <b class=\"num\">R$ 1.275</b> para 2 quartos (10 anúncios, de R$ 780 a R$ 2.500) e de <b class=\"num\">R$ 1.200</b> para 3 quartos (8 anúncios, de R$ 900 a R$ 1.800), sem condomínio. A maior parte da oferta fica no Centro.","Muitos moradores fazem compras e abastecem do lado argentino quando o câmbio favorece."],
    note:"<b>Valor de referência:</b> a amostra de anúncios é pequena. Use como ponto de partida e confirme com imobiliárias e com militares da guarnição.",
    src:[["Imovelweb","https://www.imovelweb.com.br/apartamentos-aluguel-uruguaiana-rs.html"]]},
  saudeObj:{p:["A guarnição tem o <b>Posto Médico da Guarnição de Uruguaiana</b>, vinculado ao Comando da 2ª Bda C Mec, que atende os beneficiários do FuSEx em baixa e média complexidade e encaminha para a rede civil conveniada.","O Hospital de Guarnição de Alegrete, a cerca de 140 km, apoia o posto com mutirões de especialistas, como ginecologia e ortopedia. Casos de maior complexidade vão para Alegrete ou para o Hospital Militar de Área de Porto Alegre."],
    src:[["2ª Bda C Mec","http://2bdacmec.eb.mil.br/index.php/pt/posto-medico-da-guarnicao-de-uruguaiana"],["Alegrete Tudo","https://www.alegretetudo.com.br/hgua-realiza-acao-de-apoio-ao-posto-medico-da-guarnicao-de-uruguaiana/"]]},
  edu:TXT.semCM+" No ensino superior, a cidade tem campus da Unipampa, com cursos como Farmácia e Agronomia, além de faculdades particulares.",
  cultP:["A cultura é de fronteira e de campanha: tradição gaúcha, influência argentina e um dos carnavais mais conhecidos do interior gaúcho."],
  places:[["Cidade","Califórnia da Canção Nativa","Festival de música nativista criado na cidade, referência no Sul."],["Ponte Internacional","Paso de los Libres","Cidade argentina vizinha, para compras e passeios."],["Cidade","Orla do rio Uruguai","Pôr do sol e pesca à beira do rio."]],
  cultNote:FRONT("a Argentina")});

S({id:"alegrete", cidade:"Alegrete", uf:"RS", estado:"Rio Grande do Sul", coord:"29°47′S 55°47′W · UTC−3",
  tags:["6º RCB","10º B Log","12º BE Cmb Bld","H Gu Alegrete"], destaque:"Interior",
  resumo:"Cidade da fronteira oeste gaúcha, terra de Mario Quintana. Sede do 6º RCB, de outras OM e de um Hospital de Guarnição.",
  lede:"Uma das maiores guarnições da fronteira oeste, com vida tranquila de cidade média do pampa.",
  fatos:[["População","74,3 mil","estimativa IBGE 2025"],FUSO,["Até Uruguaiana","~140 km","BR-290"],["Saúde militar","H Gu","Hospital de Guarnição"],["OM","6º RCB","e outras quatro OM"],["Grande Comando","CMS","3ª RM"]],
  om:[["6º RCB","Regimento de Cavalaria Blindado"],["10º B Log","Batalhão Logístico"],["12º BE Cmb Bld","Engenharia de combate blindada"],["2ª Cia E Cmb Mec e 12ª Cia Com","Engenharia e comunicações"],["H Gu Alegrete","Hospital de Guarnição"]],
  acessoP:"Alegrete fica na BR-290, entre Uruguaiana e São Gabriel, a cerca de 500 km de Porto Alegre. Para voos, as referências são Uruguaiana e Santa Maria.",
  saudeObj:HG("Alegrete"),
  edu:TXT.semCM+" A cidade tem campus da Unipampa e do IFFar.",
  cultP:["Terra do poeta Mario Quintana, com tradição campeira e rodeios."]});

S({id:"itaqui", cidade:"Itaqui", uf:"RS", estado:"Rio Grande do Sul", coord:"29°07′S 56°33′W · rio Uruguai · UTC−3",
  tags:["1º RC Mec","Cavalaria","Argentina"], destaque:"Fronteira",
  resumo:"Cidade à beira do rio Uruguai, na fronteira com a Argentina. Sede do 1º Regimento de Cavalaria Mecanizado.",
  lede:"Cidade pequena da fronteira oeste, de economia ligada ao arroz, com travessia de balsa para Alvear, na Argentina.",
  fatos:[["População","36,8 mil","estimativa IBGE 2025"],FUSO,["Fronteira","Argentina","Alvear, por balsa"],["Até Uruguaiana","~100 km","por rodovia"],["OM","1º RC Mec","cavalaria mecanizada"],["Grande Comando","CMS","3ª RM"]],
  om:[["1º RC Mec","Regimento de Cavalaria Mecanizado"]],
  acessoP:"O acesso é por rodovia, a partir de Uruguaiana ou São Borja. Para voos, a referência é Uruguaiana.",
  ref:"Alegrete, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem campus da Unipampa.",
  cultP:["Cidade ribeirinha, com pesca no rio Uruguai e lavouras de arroz."], cultNote:FRONT("a Argentina")});

S({id:"sao-borja", cidade:"São Borja", uf:"RS", estado:"Rio Grande do Sul", coord:"28°39′S 56°00′W · rio Uruguai · UTC−3",
  tags:["2º RC Mec","1ª Cia E Cmb Mec","Argentina"], destaque:"Fronteira",
  resumo:"Primeiro dos Sete Povos das Missões e terra de Getúlio Vargas e João Goulart. Sede do 2º RC Mec, com ponte para a Argentina.",
  lede:"Cidade histórica à beira do rio Uruguai, ligada a Santo Tomé, na Argentina, por ponte internacional.",
  fatos:[["População","61,3 mil","estimativa IBGE 2025"],FUSO,["Fronteira","Argentina","Santo Tomé"],["Até Porto Alegre","~600 km","por rodovia"],["OM","2º RC Mec","cavalaria mecanizada"],["Grande Comando","CMS","3ª RM"]],
  om:[["2º RC Mec","Regimento de Cavalaria Mecanizado"],["1ª Cia E Cmb Mec","Engenharia de combate"]],
  acessoP:"O acesso é por rodovia, pela BR-285 e pela BR-472. A ponte internacional liga a cidade a Santo Tomé, na Argentina.",
  ref:"Santiago, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem campus da Unipampa e do IFFar.",
  places:[["Cidade","Memoriais de Getúlio e Jango","Museus e túmulos dos dois presidentes."],["Ponte internacional","Santo Tomé","Cidade argentina vizinha."]],
  cultNote:FRONT("a Argentina")});

/* ---------- CMS-2: Campanha e fronteira sul ---------- */
S({id:"quarai", cidade:"Quaraí", uf:"RS", estado:"Rio Grande do Sul", coord:"30°23′S 56°27′W · rio Quaraí · UTC−3",
  tags:["5º RC Mec","Cavalaria","Uruguai"], destaque:"Fronteira",
  resumo:"Pequena cidade na fronteira com o Uruguai, em frente a Artigas. Sede do 5º Regimento de Cavalaria Mecanizado.",
  lede:"Cidade da campanha gaúcha, ligada a Artigas pela Ponte da Concórdia sobre o rio Quaraí.",
  fatos:[["População","24 mil","estimativa IBGE 2025"],FUSO,["Fronteira","Uruguai","Artigas"],["Até Uruguaiana","~120 km","por rodovia"],["OM","5º RC Mec","cavalaria mecanizada"],["Grande Comando","CMS","3ª RM"]],
  om:[["5º RC Mec","Regimento de Cavalaria Mecanizado"]],
  acessoP:"O acesso é por rodovia, a partir de Uruguaiana, Alegrete ou Santana do Livramento. A Ponte da Concórdia liga a cidade a Artigas, no Uruguai.",
  custoP:"Do lado uruguaio, os free shops de Artigas vendem importados com preços mais baixos.",
  ref:"Alegrete, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem escolas públicas e particulares de ensino fundamental e médio.",
  cultP:["Paisagem de pampa, com cerros e tradição gaúcha."], cultNote:FRONT("o Uruguai")});

S({id:"santana-do-livramento", cidade:"Santana do Livramento", uf:"RS", estado:"Rio Grande do Sul", coord:"30°53′S 55°31′W · fronteira seca · UTC−3",
  tags:["7º RC Mec","Cavalaria","Uruguai","Free shops"], destaque:"Fronteira",
  resumo:"Cidade-gêmea de Rivera, no Uruguai, separadas só por uma praça. Sede do 7º Regimento de Cavalaria Mecanizado.",
  lede:"Fronteira seca mais famosa do Sul: Livramento e Rivera dividem a Praça Internacional, e os free shops uruguaios fazem parte da rotina.",
  fatos:[["População","87,3 mil","estimativa IBGE 2025"],FUSO,["Fronteira","Uruguai","Rivera, fronteira seca"],["Até Porto Alegre","~490 km","por rodovia"],["OM","7º RC Mec","cavalaria mecanizada"],["Grande Comando","CMS","3ª RM"]],
  om:[["7º RC Mec","Regimento de Cavalaria Mecanizado"],["2ª Bia AAAe","Bateria de artilharia antiaérea (a confirmar na fonte oficial)"]],
  acessoP:"A cidade fica a cerca de 490 km de Porto Alegre e tem aeroporto com voos regionais, conforme a oferta. A divisa com Rivera é seca, sem rio.",
  custoP:"Os free shops de Rivera vendem importados com preço mais baixo, e o comércio dos dois lados é integrado.",
  ref:"Bagé, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem campus da Unipampa e do IFSul.",
  places:[["Centro","Parque Internacional","Praça dividida entre Brasil e Uruguai."],["Região","Vinícolas da Campanha","A Campanha Gaúcha é uma das regiões de vinho do estado."]],
  cultNote:FRONT("o Uruguai")});

S({id:"bage", cidade:"Bagé", uf:"RS", estado:"Rio Grande do Sul", coord:"31°19′S 54°06′W · UTC−3",
  tags:["3ª Bda C Mec","3º RC Mec","25º GAC","H Gu Bagé","Cavalaria"], destaque:"Sede de Brigada",
  resumo:"A Rainha da Fronteira, no coração da Campanha gaúcha. Sede da 3ª Brigada de Cavalaria Mecanizada e de um Hospital de Guarnição.",
  lede:"Cidade de tradição pecuária e militar, com casarões históricos e o Uruguai a cerca de 60 km, em Aceguá.",
  fatos:[["População","122 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~380 km","BR-153 e BR-293"],["Saúde militar","H Gu","Hospital de Guarnição"],["Fronteira","~60 km","Aceguá (Uruguai)"],["Grande Comando","CMS","3ª Bda C Mec"]],
  om:[["Cmdo 3ª Bda C Mec e Esqd Cmdo","Comando da Brigada"],["3º RC Mec","Regimento de Cavalaria Mecanizado"],["25º GAC","Grupo de Artilharia de Campanha"],["3º B Log","Batalhão Logístico"],["3º Pel PE","Polícia do Exército"],["H Gu Bagé","Hospital de Guarnição"]],
  acessoP:"Bagé fica a cerca de 380 km de Porto Alegre e tem aeroporto regional. A fronteira com o Uruguai, em Aceguá, fica a cerca de 60 km.",
  saudeObj:HG("Bagé"),
  edu:TXT.semCM+" A cidade tem campus da Unipampa, da URCAMP e do IFSul.",
  cultP:["Cidade de estâncias, cavalos crioulos e culinária campeira, com casario histórico no centro."]});

S({id:"jaguarao", cidade:"Jaguarão", uf:"RS", estado:"Rio Grande do Sul", coord:"32°34′S 53°23′W · rio Jaguarão · UTC−3",
  tags:["12º RC Mec","Cavalaria","Uruguai","Patrimônio histórico"], destaque:"Fronteira",
  resumo:"Cidade histórica na fronteira com o Uruguai, ligada a Río Branco pela Ponte Mauá. Sede do 12º RC Mec.",
  lede:"Conjunto histórico tombado pelo Iphan, à beira do rio Jaguarão, com free shops do lado uruguaio.",
  fatos:[["População","27,4 mil","estimativa IBGE 2025"],FUSO,["Fronteira","Uruguai","Río Branco"],["Até Pelotas","~140 km","BR-116"],["OM","12º RC Mec","cavalaria mecanizada"],["Grande Comando","CMS","3ª RM"]],
  om:[["12º RC Mec","Regimento de Cavalaria Mecanizado"]],
  acessoP:"Jaguarão fica no fim da BR-116, a cerca de 140 km de Pelotas, que é a referência para compras maiores. A Ponte Mauá liga a cidade a Río Branco, no Uruguai.",
  custoP:"Os free shops de Río Branco, do outro lado da ponte, vendem importados com preço mais baixo.",
  ref:"Pelotas ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem campus da Unipampa e do IFSul.",
  places:[["Centro","Centro histórico","Casarões do século XIX tombados pelo Iphan."],["Ponte Mauá","Río Branco (Uruguai)","Free shops e comércio uruguaio."]],
  cultNote:FRONT("o Uruguai")});

S({id:"dom-pedrito", cidade:"Dom Pedrito", uf:"RS", estado:"Rio Grande do Sul", coord:"30°59′S 54°40′W · UTC−3",
  tags:["3ª Cia E Cmb Mec","Campanha"], destaque:"Interior",
  resumo:"A Capital da Paz, onde foi assinado o fim da Revolução Farroupilha. Sede da 3ª Companhia de Engenharia de Combate Mecanizada.",
  lede:"Cidade pequena da Campanha gaúcha, de pecuária, arroz e vinhedos, entre Bagé e Santana do Livramento.",
  fatos:[["População","38,1 mil","estimativa IBGE 2025"],FUSO,["Até Bagé","~80 km","por rodovia"],["História","Paz","Tratado de Ponche Verde, 1845"],["OM","3ª Cia E Cmb Mec","engenharia de combate"],["Grande Comando","CMS","3ª RM"]],
  om:[["3ª Cia E Cmb Mec","Companhia de Engenharia de Combate Mecanizada"]],
  acessoP:"O acesso é por rodovia, a partir de Bagé ou de Santana do Livramento.",
  ref:"Bagé, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem campus da Unipampa.",
  cultP:["Conhecida como Capital da Paz pelo tratado que encerrou a Revolução Farroupilha, tem tradição campeira e vinícolas na região."]});

/* ---------- CMS-3: Centro do RS ---------- */
S({id:"santa-maria", cidade:"Santa Maria", uf:"RS", estado:"Rio Grande do Sul", coord:"29°41′S 53°48′W · Coração do Rio Grande · UTC−3",
  tags:["3ª DE","6ª Bda Inf Bld","1º RCC","Colégio Militar","H Gu Santa Maria"], destaque:"Grande guarnição",
  resumo:"Coração do Rio Grande e uma das maiores guarnições do país. Sede da 3ª Divisão de Exército, da 6ª Brigada de Infantaria Blindada, de Colégio Militar e Hospital de Guarnição.",
  lede:"Cidade universitária no centro do estado, com grande concentração de OM do Exército, Base Aérea e estrutura completa para famílias militares.",
  fatos:[["População","282 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~290 km","BR-287 e BR-290"],["Saúde militar","H Gu","Hospital de Guarnição"],["Ensino","Colégio Militar","de Santa Maria"],["Grande Comando","CMS","3ª DE"]],
  om:[["Cmdo 3ª DE e Cia Cmdo","Divisão de Exército"],["Cmdo 6ª Bda Inf Bld","Brigada de Infantaria Blindada"],["1º RCC","Regimento de Carros de Combate"],["6º Esqd C Mec","Esquadrão de Cavalaria Mecanizado"],["CI Bld","Centro de Instrução de Blindados"],["29º BI Bld","Infantaria blindada"],["3º GAC AP","Artilharia autopropulsada"],["4º B Log","Batalhão Logístico"],["6ª Bia AAAe, 3ª Cia Com Bld, 26º Pel PE","Antiaérea, comunicações e PE"],["Parque Regional de Manutenção","Manutenção da 3ª RM"],["H Gu Santa Maria","Hospital de Guarnição"],["Colégio Militar de Santa Maria","Sistema Colégio Militar do Brasil"]],
  acessoP:"Santa Maria fica a cerca de 290 km de Porto Alegre e tem aeroporto com voos regionais. Por terra, é um entroncamento rodoviário do centro do estado.",
  custoP:"Cidade universitária, com muitos imóveis para aluguel e comércio completo.",
  saudeObj:{p:["A guarnição tem o <b>Hospital de Guarnição de Santa Maria</b>, que atende os beneficiários do FuSEx, além de rede conveniada ampla. Casos de maior complexidade podem ir para o Hospital Militar de Área de Porto Alegre."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar de Santa Maria</b> e a Universidade Federal de Santa Maria (UFSM), uma das maiores universidades públicas do interior do país, além de faculdades particulares.",
  cultP:["Cidade universitária, com vida noturna movimentada e muitos militares. A Quarta Colônia, de imigração italiana, fica perto."],
  chegadaX:["Peça vaga no Colégio Militar de Santa Maria seguindo o calendário de matrícula de dependentes."]});

S({id:"santiago", cidade:"Santiago", uf:"RS", estado:"Rio Grande do Sul", coord:"29°11′S 54°52′W · UTC−3",
  tags:["1ª Bda C Mec","19º GAC","9º B Log","H Gu Santiago","Cavalaria"], destaque:"Sede de Brigada",
  resumo:"A Terra dos Poetas, no centro-oeste gaúcho. Sede da 1ª Brigada de Cavalaria Mecanizada e de um Hospital de Guarnição.",
  lede:"Cidade pequena e tranquila, com forte presença militar e estrutura de saúde própria do Exército.",
  fatos:[["População","50,3 mil","estimativa IBGE 2025"],FUSO,["Até Santa Maria","~150 km","BR-287"],["Saúde militar","H Gu","Hospital de Guarnição"],["OM","Bda C Mec","e outras cinco OM"],["Grande Comando","CMS","1ª Bda C Mec"]],
  om:[["Cmdo 1ª Bda C Mec e Esqd Cmdo","Comando da Brigada"],["19º GAC","Grupo de Artilharia de Campanha"],["9º B Log","Batalhão Logístico"],["11ª Cia Com Mec e 1º Pel PE","Comunicações e Polícia do Exército"],["H Gu Santiago","Hospital de Guarnição"]],
  acessoP:"Santiago fica na BR-287, a cerca de 150 km de Santa Maria, que é a referência para voos e compras maiores.",
  saudeObj:HG("Santiago"),
  edu:TXT.semCM+" A cidade tem campus da URI e do IFFar.",
  cultP:["Conhecida como Terra dos Poetas, com vida cultural ligada à literatura gaúcha."]});

S({id:"sao-gabriel", cidade:"São Gabriel", uf:"RS", estado:"Rio Grande do Sul", coord:"30°20′S 54°19′W · UTC−3",
  tags:["9º RCB","6º BE Cmb","13ª Cia Com Mec"], destaque:"Interior",
  resumo:"A Terra dos Marechais, na Campanha gaúcha. Sede do 9º RCB, do 6º BE Cmb e da 13ª Cia Com Mec.",
  lede:"Cidade de longa tradição militar, berço de vários marechais, no caminho entre Santa Maria e a fronteira oeste.",
  fatos:[["População","60,1 mil","estimativa IBGE 2025"],FUSO,["Até Santa Maria","~140 km","por rodovia"],["História","Marechais","terra de vários marechais"],["OM","9º RCB","e outras duas OM"],["Grande Comando","CMS","3ª RM"]],
  om:[["9º RCB","Regimento de Cavalaria Blindado"],["6º BE Cmb","Batalhão de Engenharia de Combate"],["13ª Cia Com Mec","Comunicações"]],
  acessoP:"A cidade fica na BR-290, a cerca de 320 km de Porto Alegre. Para voos, as referências são Santa Maria e Porto Alegre.",
  ref:HGUSM,
  edu:TXT.semCM+" A cidade tem campus da Unipampa.",
  cultP:["Conhecida como Terra dos Marechais, tem casario histórico e tradição campeira."]});

S({id:"rosario-do-sul", cidade:"Rosário do Sul", uf:"RS", estado:"Rio Grande do Sul", coord:"30°15′S 54°55′W · rio Santa Maria · UTC−3",
  tags:["4º RCC","Carros de combate"], destaque:"Interior",
  resumo:"A Princesa do Ibicuí, com praias de rio na Campanha. Sede do 4º Regimento de Carros de Combate.",
  lede:"Cidade pequena entre Santa Maria e Santana do Livramento, conhecida pelas praias de areia do rio Santa Maria.",
  fatos:[["População","37,7 mil","estimativa IBGE 2025"],FUSO,["Até Santa Maria","~160 km","por rodovia"],["Lazer","Praias de rio","no verão"],["OM","4º RCC","carros de combate"],["Grande Comando","CMS","3ª RM"]],
  om:[["4º RCC","Regimento de Carros de Combate"]],
  acessoP:"A cidade fica na BR-290 e na BR-158. Para voos, as referências são Santa Maria e Santana do Livramento.",
  ref:HGUSM,
  edu:TXT.semCM+" A cidade tem escolas públicas e particulares e polos de ensino a distância.",
  cultP:["No verão, as praias de rio da cidade atraem gente de toda a região."], cultNote:TXT.rios});

S({id:"cachoeira-do-sul", cidade:"Cachoeira do Sul", uf:"RS", estado:"Rio Grande do Sul", coord:"30°02′S 52°53′W · rio Jacuí · UTC−3",
  tags:["13º GAC","3º BE Cmb","Rio Jacuí"], destaque:"Interior",
  resumo:"Cidade histórica à beira do rio Jacuí, polo do arroz no centro do estado. Sede do 13º GAC e do 3º BE Cmb.",
  lede:"Uma das cidades mais antigas do Rio Grande do Sul, entre Santa Maria e Porto Alegre.",
  fatos:[["População","82,2 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~200 km","BR-290"],["Rio","Jacuí","porto fluvial"],["OM","13º GAC","e 3º BE Cmb"],["Grande Comando","CMS","3ª RM"]],
  om:[["13º GAC","Grupo de Artilharia de Campanha"],["3º BE Cmb","Batalhão de Engenharia de Combate"]],
  acessoP:"A cidade fica a cerca de 200 km de Porto Alegre e 120 km de Santa Maria, por rodovias asfaltadas.",
  ref:HGUSM+", ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem campus da UFSM e faculdades particulares.",
  cultP:["Cidade histórica com casario antigo e tradição na produção de arroz."], cultNote:TXT.rios});

/* ---------- CMS-4: Missões e Planalto ---------- */
const MISS = "<b>Patrimônio:</b> as ruínas de São Miguel das Missões, Patrimônio Mundial da Unesco, ficam na região.";
S({id:"sao-luiz-gonzaga", cidade:"São Luiz Gonzaga", uf:"RS", estado:"Rio Grande do Sul", coord:"28°24′S 54°58′W · Missões · UTC−3",
  tags:["4º RCB","Missões"], destaque:"Interior",
  resumo:"Cidade da região das Missões, antiga redução jesuítica. Sede do 4º Regimento de Cavalaria Blindado.",
  lede:"Cidade pequena e tranquila no noroeste gaúcho, ligada à história dos Sete Povos das Missões.",
  fatos:[["População","35,9 mil","estimativa IBGE 2025"],FUSO,["Até Santo Ângelo","~60 km","por rodovia"],["Região","Missões","Sete Povos"],["OM","4º RCB","cavalaria blindada"],["Grande Comando","CMS","3ª RM"]],
  om:[["4º RCB","Regimento de Cavalaria Blindado"]],
  acessoP:"O acesso é por rodovia. Para voos, a referência regional é Santo Ângelo.",
  ref:"Santiago, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem escolas públicas e particulares e campus de universidades regionais.",
  cultP:["Terra de música missioneira e tradição gaúcha."], cultNote:MISS});

S({id:"santo-angelo", cidade:"Santo Ângelo", uf:"RS", estado:"Rio Grande do Sul", coord:"28°18′S 54°16′W · Missões · UTC−3",
  tags:["1º B Com","10ª CSM","Missões"], destaque:"Polo regional",
  resumo:"Capital das Missões, com catedral inspirada na igreja de São Miguel. Sede do 1º Batalhão de Comunicações e da 10ª Circunscrição de Serviço Militar.",
  lede:"Polo regional do noroeste gaúcho, com aeroporto e acesso fácil às ruínas de São Miguel das Missões.",
  fatos:[["População","79,1 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~450 km","por rodovia"],["Região","Missões","Patrimônio Mundial"],["OM","1º B Com","e 10ª CSM"],["Grande Comando","CMS","3ª RM"]],
  om:[["1º B Com","Batalhão de Comunicações"],["10ª CSM","Circunscrição de Serviço Militar"]],
  acessoP:"Santo Ângelo tem aeroporto regional e fica a cerca de 450 km de Porto Alegre.",
  ref:"Santiago, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem a URI e campus de outras instituições regionais.",
  places:[["Centro","Catedral Angelopolitana","Inspirada na fachada da igreja de São Miguel Arcanjo."],["~60 km","São Miguel das Missões","Ruínas jesuíticas e espetáculo de som e luz."]]});

S({id:"santa-rosa", cidade:"Santa Rosa", uf:"RS", estado:"Rio Grande do Sul", coord:"27°52′S 54°29′W · Noroeste gaúcho · UTC−3",
  tags:["19º RC Mec","Cavalaria","Fenasoja"], destaque:"Interior",
  resumo:"Berço nacional da soja, no noroeste gaúcho, perto da Argentina. Sede do 19º Regimento de Cavalaria Mecanizado.",
  lede:"Cidade de colonização europeia e economia agrícola, conhecida pela Fenasoja.",
  fatos:[["População","79,5 mil","estimativa IBGE 2025"],FUSO,["Até Santo Ângelo","~60 km","por rodovia"],["Festa","Fenasoja","feira da soja"],["OM","19º RC Mec","cavalaria mecanizada"],["Grande Comando","CMS","3ª RM"]],
  om:[["19º RC Mec","Regimento de Cavalaria Mecanizado"]],
  acessoP:"O acesso é por rodovia. A cidade tem aeroporto regional; Santo Ângelo é outra opção para voos.",
  ref:"Santiago, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem campus do IFFar e da UNIJUÍ, entre outras instituições.",
  cultP:["Cidade conhecida como berço nacional da soja, sede da Fenasoja."]});

S({id:"ijui", cidade:"Ijuí", uf:"RS", estado:"Rio Grande do Sul", coord:"28°23′S 53°55′W · Planalto · UTC−3",
  tags:["27º GAC","Capital das Etnias"], destaque:"Interior",
  resumo:"A Capital das Etnias, no planalto gaúcho. Sede do 27º Grupo de Artilharia de Campanha.",
  lede:"Cidade universitária de colonização variada, com a Unijuí e boa oferta de serviços.",
  fatos:[["População","87,8 mil","estimativa IBGE 2025"],FUSO,["Até Cruz Alta","~50 km","por rodovia"],["Festa","Etnias","Festa Nacional das Culturas Diversificadas"],["OM","27º GAC","artilharia de campanha"],["Grande Comando","CMS","3ª RM"]],
  om:[["27º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"O acesso é por rodovia. Para voos, as referências regionais são Santo Ângelo e Passo Fundo.",
  ref:"Santa Maria, que tem Hospital de Guarnição, ou Porto Alegre",
  edu:TXT.semCM+" A cidade tem a Unijuí e campus do IFFar.",
  cultP:["Conhecida como Capital das Etnias, reúne descendentes de vários povos imigrantes."]});

S({id:"cruz-alta", cidade:"Cruz Alta", uf:"RS", estado:"Rio Grande do Sul", coord:"28°38′S 53°36′W · Planalto · UTC−3",
  tags:["AD/3","29º GAC AP","Artilharia"], destaque:"Interior",
  resumo:"Terra de Erico Verissimo, no planalto gaúcho. Sede da Artilharia Divisionária da 3ª DE e do 29º GAC Autopropulsado.",
  lede:"Cidade de porte médio, de economia agrícola, com forte presença da artilharia do Exército.",
  fatos:[["População","60,5 mil","estimativa IBGE 2025"],FUSO,["Até Santa Maria","~130 km","por rodovia"],["Cultura","Erico Verissimo","terra natal do escritor"],["OM","AD/3","e 29º GAC AP"],["Grande Comando","CMS","3ª DE"]],
  om:[["AD/3 e Bia Cmdo","Artilharia Divisionária da 3ª DE"],["29º GAC AP","Grupo de Artilharia de Campanha Autopropulsado"]],
  acessoP:"O acesso é por rodovia, a cerca de 130 km de Santa Maria e 340 km de Porto Alegre.",
  ref:HGUSM,
  edu:TXT.semCM+" A cidade tem a Universidade de Cruz Alta (Unicruz) e campus do IFFar.",
  places:[["Centro","Museu Erico Verissimo","Casa onde nasceu o autor de O Tempo e o Vento."]]});

/* ---------- CMS-5: Grande Porto Alegre ---------- */
const ENCH = "<b>Enchentes:</b> a cheia de 2024 atingiu bairros de Porto Alegre e da Região Metropolitana. Ao escolher onde morar, pergunte se o imóvel foi afetado.";
S({id:"porto-alegre", cidade:"Porto Alegre", uf:"RS", estado:"Rio Grande do Sul", coord:"30°02′S 51°13′W · lago Guaíba · UTC−3",
  tags:["CMS","3ª RM","Colégio Militar","Hospital Militar","3º RCG"], destaque:"Sede do CMS",
  resumo:"Capital gaúcha e sede do Comando Militar do Sul. Tem Colégio Militar, Hospital Militar de Área e estrutura de metrópole.",
  lede:"Metrópole à beira do Guaíba, centro administrativo do Exército no Sul, com vida cultural intensa e acesso a praias e serra.",
  fatos:[["População","1,39 mi","estimativa IBGE 2025"],FUSO,["Aluguel","R$ 45/m²","FipeZAP, fev/2026"],["Clima","8–31 °C","inverno frio e úmido"],["Cesta básica","R$ 839","DIEESE, ago/2026"],["Grande Comando","CMS","3ª RM"]],
  omP:["Porto Alegre é sede do <b>Comando Militar do Sul</b> e da <b>3ª Região Militar</b>."],
  om:[["CMS e Cia Cmdo","Comando Militar de Área"],["3ª RM","Região Militar"],["Comando de Artilharia do Exército","Grande Comando de artilharia"],["4º Gpt E","Grupamento de Engenharia"],["3º RCG","Regimento de Cavalaria de Guardas"],["8º Esqd C Mec","Esquadrão de Cavalaria Mecanizado"],["8º B Log e 3º Gpt Log","Logística"],["3º BPE","Polícia do Exército"],["Hospital Militar de Área de Porto Alegre","Referência de saúde do Exército no Sul"],["Colégio Militar de Porto Alegre","Sistema Colégio Militar do Brasil"],["Outras","Policlínica Militar, 1ª Cia Intlg, 1ª Cia Gd, entre outras"]],
  acessoP:"O Aeroporto Salgado Filho tem voos para todo o país e para o exterior. Por terra, a BR-116 e a BR-290 ligam a capital ao resto do estado.",
  custoObj:{p:[TXT.fipe("Porto Alegre","44,67","+9,93%"),TXT.cesta("Porto Alegre","839,34")], note:ENCH, src:[SRC.fipe,SRC.dieese]},
  saudeObj:{p:["A guarnição tem o <b>Hospital Militar de Área de Porto Alegre</b> e uma Policlínica Militar, além de ampla rede conveniada ao FuSEx."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar de Porto Alegre</b>. No ensino superior há a UFRGS, a PUCRS, a UFCSPA e muitas outras instituições.",
  places:[["Centro","Orla do Guaíba","Calçadão com o pôr do sol mais famoso da cidade."],["Cidade","Parque da Redenção","Brique da Redenção aos domingos."],["~120 km","Serra Gaúcha","Gramado, Canela e Vale dos Vinhedos."],["~120 km","Litoral norte","Praias gaúchas, movimentadas no verão."]],
  chegadaX:["Peça vaga no Colégio Militar de Porto Alegre seguindo o calendário de matrícula de dependentes."]});

const METRO = (o)=>S(Object.assign({ref:HMAPA, custoObj:{p:["Cidade da Região Metropolitana de Porto Alegre, com acesso fácil ao comércio e aos serviços da capital."], note:ENCH}}, o));
METRO({id:"sapucaia-do-sul", cidade:"Sapucaia do Sul", uf:"RS", estado:"Rio Grande do Sul", coord:"29°50′S 51°09′W · Região Metropolitana · UTC−3",
  tags:["18º BI Mtz","Região Metropolitana"], destaque:"Região Metropolitana",
  resumo:"Cidade da Região Metropolitana de Porto Alegre, na BR-116. Sede do 18º Batalhão de Infantaria Motorizado.",
  lede:"Cidade a cerca de 25 km da capital, com acesso pela BR-116 e pelo trem metropolitano.",
  fatos:[["População","137 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~25 km","BR-116 e Trensurb"],["Região","Metropolitana","de Porto Alegre"],["OM","18º BI Mtz","infantaria motorizada"],["Grande Comando","CMS","3ª RM"]],
  om:[["18º BI Mtz","Batalhão de Infantaria Motorizado"]],
  acessoP:"A cidade fica na BR-116 e é atendida pelo Trensurb, o trem metropolitano que vai até o centro de Porto Alegre.",
  edu:TXT.semCM+" O Colégio Militar de Porto Alegre fica a cerca de 25 km. A região tem várias universidades.",
  places:[["Cidade","Zoológico de Sapucaia","O Parque Zoológico do estado fica na cidade."]]});

METRO({id:"sao-leopoldo", cidade:"São Leopoldo", uf:"RS", estado:"Rio Grande do Sul", coord:"29°45′S 51°08′W · Vale do Sinos · UTC−3",
  tags:["19º BI Mtz","16º GAC AP","Unisinos"], destaque:"Região Metropolitana",
  resumo:"Berço da colonização alemã no Rio Grande do Sul, no Vale do Sinos. Sede do 19º BI Mtz e do 16º GAC Autopropulsado.",
  lede:"Cidade universitária da Região Metropolitana, sede da Unisinos, a cerca de 35 km de Porto Alegre.",
  fatos:[["População","226 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~35 km","BR-116 e Trensurb"],["História","1824","início da imigração alemã"],["OM","19º BI Mtz","e 16º GAC AP"],["Grande Comando","CMS","3ª RM"]],
  om:[["19º BI Mtz","Batalhão de Infantaria Motorizado"],["16º GAC AP","Grupo de Artilharia de Campanha Autopropulsado"]],
  acessoP:"A cidade fica na BR-116 e é atendida pelo Trensurb até o centro de Porto Alegre.",
  edu:TXT.semCM+" A cidade tem a Unisinos, e o Colégio Militar de Porto Alegre fica a cerca de 35 km.",
  cultP:["Considerada o berço da colonização alemã no estado, com festas e gastronomia de tradição germânica."]});

METRO({id:"nova-santa-rita", cidade:"Nova Santa Rita", uf:"RS", estado:"Rio Grande do Sul", coord:"29°51′S 51°17′W · Região Metropolitana · UTC−3",
  tags:["3º B Sup","Logística"], destaque:"Região Metropolitana",
  resumo:"Pequena cidade da Região Metropolitana de Porto Alegre. Sede do 3º Batalhão de Suprimento.",
  lede:"Município tranquilo perto da capital, onde a maioria dos militares mora em Porto Alegre ou em cidades vizinhas.",
  fatos:[["População","30,2 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~30 km","por rodovia"],["Região","Metropolitana","de Porto Alegre"],["OM","3º B Sup","Batalhão de Suprimento"],["Grande Comando","CMS","3ª RM"]],
  om:[["3º B Sup","Batalhão de Suprimento"]],
  acessoP:"A cidade fica a cerca de 30 km de Porto Alegre, por rodovia.",
  edu:TXT.semCM+" O Colégio Militar de Porto Alegre e as universidades da capital ficam a cerca de 30 km.",
  cultP:["Cidade pequena, com áreas rurais e acesso rápido às opções de lazer da capital."]});

S({id:"santa-cruz-do-sul", cidade:"Santa Cruz do Sul", uf:"RS", estado:"Rio Grande do Sul", coord:"29°43′S 52°26′W · Vale do Rio Pardo · UTC−3",
  tags:["7º BI Bld","Oktoberfest","Unisc"], destaque:"Interior",
  resumo:"Cidade de colonização alemã no Vale do Rio Pardo, polo do tabaco. Sede do 7º Batalhão de Infantaria Blindado.",
  lede:"Cidade organizada e arborizada, conhecida pela Oktoberfest e pela universidade regional, a cerca de 150 km de Porto Alegre.",
  fatos:[["População","138 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~150 km","BR-471 e RSC-287"],["Festa","Oktoberfest","em outubro"],["OM","7º BI Bld","infantaria blindada"],["Grande Comando","CMS","3ª RM"]],
  om:[["7º BI Bld","Batalhão de Infantaria Blindado"]],
  acessoP:"A cidade fica a cerca de 150 km de Porto Alegre, por rodovias asfaltadas.",
  ref:HMAPA+", ou Santa Maria",
  edu:TXT.semCM+" A cidade tem a Universidade de Santa Cruz do Sul (Unisc).",
  cultP:["A Oktoberfest de Santa Cruz é uma das maiores festas de tradição alemã do país."]});

/* ---------- CMS-6: Sul e Serra ---------- */
S({id:"pelotas", cidade:"Pelotas", uf:"RS", estado:"Rio Grande do Sul", coord:"31°46′S 52°20′W · lagoa dos Patos · UTC−3",
  tags:["8ª Bda Inf Mtz","9º BI Mtz","Doces"], destaque:"Sede de Brigada",
  resumo:"Cidade dos doces e dos casarões, no sul do estado. Sede da 8ª Brigada de Infantaria Motorizada.",
  lede:"Terceira maior cidade gaúcha, com centro histórico, universidades e um dos aluguéis mais baixos do índice FipeZAP.",
  fatos:[["População","336 mil","estimativa IBGE 2025"],FUSO,["Aluguel","R$ 22/m²","FipeZAP, fev/2026"],["Até Porto Alegre","~260 km","BR-116"],["Festa","Fenadoce","doces de Pelotas"],["Grande Comando","CMS","8ª Bda Inf Mtz"]],
  om:[["Cmdo 8ª Bda Inf Mtz e Cia Cmdo","Comando da Brigada"],["9º BI Mtz","Batalhão de Infantaria Motorizado"],["8º Pel PE","Polícia do Exército"]],
  acessoP:"Pelotas fica a cerca de 260 km de Porto Alegre pela BR-116 e tem aeroporto regional.",
  custoObj:{p:[TXT.fipe("Pelotas","22,43","+16,45%")+" É o menor valor entre as cidades do índice."], src:[SRC.fipe]},
  ref:HMAPA,
  edu:TXT.semCM+" A cidade tem a Universidade Federal de Pelotas (UFPel), a UCPel e o IFSul.",
  places:[["Centro","Casarões históricos","Prédios do século XIX ligados à época das charqueadas."],["Junho","Fenadoce","Feira dos doces tradicionais de Pelotas."],["~10 km","Praia do Laranjal","Praia na Lagoa dos Patos."]]});

S({id:"rio-grande", cidade:"Rio Grande", uf:"RS", estado:"Rio Grande do Sul", coord:"32°02′S 52°05′W · barra da Lagoa dos Patos · UTC−3",
  tags:["6º GAC","Porto","Praia do Cassino"], destaque:"Interior",
  resumo:"Cidade mais antiga do Rio Grande do Sul e principal porto do estado. Sede do 6º Grupo de Artilharia de Campanha.",
  lede:"Cidade portuária no extremo sul, com a Praia do Cassino, uma das mais extensas do mundo.",
  fatos:[["População","199 mil","estimativa IBGE 2025"],FUSO,["Até Pelotas","~60 km","BR-392"],["Praia","Cassino","faixa de areia contínua"],["OM","6º GAC","artilharia de campanha"],["Grande Comando","CMS","3ª RM"]],
  om:[["6º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"A cidade fica a cerca de 60 km de Pelotas e 320 km de Porto Alegre. Para voos, a referência é Pelotas ou Porto Alegre.",
  custoP:"A economia do porto e do polo naval movimenta a cidade.",
  ref:HMAPA,
  edu:TXT.semCM+" A cidade tem a Universidade Federal do Rio Grande (FURG) e o IFRS.",
  climaObj:LITORAL,
  places:[["~20 km","Praia do Cassino","Faixa de areia extensa, movimentada no verão."],["Centro","Centro histórico","Prédios do período colonial e do ciclo do porto."]]});

S({id:"bento-goncalves", cidade:"Bento Gonçalves", uf:"RS", estado:"Rio Grande do Sul", coord:"29°10′S 51°31′W · Serra Gaúcha · UTC−3",
  tags:["6º B Com","Vale dos Vinhedos"], destaque:"Interior",
  resumo:"Capital do vinho, na Serra Gaúcha, colonizada por italianos. Sede do 6º Batalhão de Comunicações.",
  lede:"Cidade de serra, com vinícolas do Vale dos Vinhedos, indústria moveleira e inverno frio.",
  fatos:[["População","128 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~120 km","por rodovia"],["Destaque","Vinho","Vale dos Vinhedos"],["OM","6º B Com","comunicações"],["Grande Comando","CMS","3ª RM"]],
  om:[["6º B Com","Batalhão de Comunicações"]],
  acessoP:"A cidade fica a cerca de 120 km de Porto Alegre. Para voos, as referências são Caxias do Sul e Porto Alegre.",
  custoP:"Cidade com renda alta e turismo forte, o que eleva o custo de moradia em relação ao interior gaúcho.",
  ref:HMAPA,
  edu:TXT.semCM+" A cidade tem campus do IFRS e da UCS.",
  climaObj:SERRA,
  places:[["Município","Vale dos Vinhedos","Vinícolas, restaurantes e enoturismo."],["Cidade","Maria Fumaça","Passeio de trem entre Bento, Garibaldi e Carlos Barbosa."]]});

S({id:"caxias-do-sul", cidade:"Caxias do Sul", uf:"RS", estado:"Rio Grande do Sul", coord:"29°10′S 51°11′W · Serra Gaúcha · UTC−3",
  tags:["3º GAAAe","Festa da Uva","Serra"], destaque:"Polo regional",
  resumo:"Segunda maior cidade gaúcha, polo industrial da Serra. Sede do 3º Grupo de Artilharia Antiaérea.",
  lede:"Cidade de colonização italiana, com indústria forte, inverno frio e a Festa da Uva.",
  fatos:[["População","480 mil","estimativa IBGE 2025"],FUSO,["Até Porto Alegre","~130 km","BR-116"],["Festa","Festa da Uva","a cada dois anos"],["OM","3º GAAAe","artilharia antiaérea"],["Grande Comando","CMS","OM da 1ª Bda AAAe"]],
  om:[["3º GAAAe","Grupo de Artilharia Antiaérea, enquadrado pela 1ª Bda AAAe, de Guarujá (SP)"]],
  omSrc:[SRC.CMSE],
  acessoP:"A cidade tem aeroporto com voos regionais e fica a cerca de 130 km de Porto Alegre pela BR-116.",
  custoP:"Polo industrial com comércio e serviços completos.",
  ref:HMAPA,
  edu:TXT.semCM+" A cidade tem a Universidade de Caxias do Sul (UCS) e o IFRS.",
  climaObj:SERRA,
  places:[["Fevereiro e março","Festa da Uva","Festa tradicional da imigração italiana."],["~50 km","Gramado e Canela","Destinos turísticos da Serra."]]});

/* ---------- CMS-7: Curitiba e Campos Gerais ---------- */
S({id:"curitiba", cidade:"Curitiba", uf:"PR", estado:"Paraná", coord:"25°26′S 49°16′W · alt. 930 m · UTC−3",
  tags:["5ª RM","5ª DE","Colégio Militar","Hospital Geral","20º BI Bld"], destaque:"Grande guarnição",
  resumo:"Capital do Paraná, sede da 5ª Região Militar e da 5ª Divisão de Exército. Tem Colégio Militar, Hospital Geral e transporte público organizado.",
  lede:"Capital de clima frio, com parques, boa qualidade de vida e uma das maiores guarnições do Sul.",
  fatos:[["População","~1,77 mi","Censo 2022"],FUSO,["Aluguel","R$ 47/m²","FipeZAP, fev/2026"],["Clima","Frio","inverno com geadas"],["Cesta básica","R$ 799","DIEESE, ago/2026"],["Grande Comando","CMS","5ª RM / 5ª DE"]],
  om:[["5ª RM","Região Militar"],["5ª DE e Cia Cmdo","Divisão de Exército"],["AD/5","Artilharia Divisionária"],["20º BI Bld","Infantaria blindada"],["5º GAC AP","Artilharia autopropulsada"],["5º B Log e 5º B Sup","Logística"],["Hospital Geral de Curitiba","Referência de saúde do Exército no Paraná"],["Colégio Militar de Curitiba","Sistema Colégio Militar do Brasil"],["Outras","5ª Cia PE, 5ª Cia Com Bld, Parque Regional de Manutenção, entre outras"]],
  acessoP:"O aeroporto Afonso Pena, em São José dos Pinhais, tem voos para todo o país. A BR-116 e a BR-277 ligam a cidade a São Paulo, ao litoral e ao interior.",
  custoObj:{p:[TXT.fipe("Curitiba","46,82","+9,83%"),TXT.cesta("Curitiba","798,87")], src:[SRC.fipe,SRC.dieese]},
  saudeObj:{p:["A guarnição tem o <b>Hospital Geral de Curitiba</b>, que atende os beneficiários do FuSEx, além de ampla rede conveniada."], src:[W]},
  edu:"A cidade tem o <b>Colégio Militar de Curitiba</b>. No ensino superior há a UFPR, a UTFPR, a PUCPR e muitas outras instituições.",
  climaObj:{p:["Subtropical de altitude: inverno frio, com geadas, e verão ameno. O tempo muda rápido ao longo do dia, e chove o ano todo."]},
  places:[["Cidade","Parques","Jardim Botânico, Barigui e Tanguá, entre outros."],["~100 km","Litoral paranaense","Morretes, Antonina e Ilha do Mel, com a descida pela Serra do Mar."]],
  chegadaX:["Peça vaga no Colégio Militar de Curitiba seguindo o calendário de matrícula de dependentes.","Prepare roupas de frio: o inverno é rigoroso para quem vem do Norte e do Nordeste."]});

S({id:"ponta-grossa", cidade:"Ponta Grossa", uf:"PR", estado:"Paraná", coord:"25°05′S 50°09′W · Campos Gerais · UTC−3",
  tags:["5ª Bda C Bld","3º RCC","13º BI Bld","P Med Gu","Cavalaria"], destaque:"Sede de Brigada",
  resumo:"Princesa dos Campos, a cerca de 110 km de Curitiba. Sede da 5ª Brigada de Cavalaria Blindada e de um Posto Médico de Guarnição.",
  lede:"Cidade de porte médio nos Campos Gerais, com universidade estadual, indústria e o Parque Estadual de Vila Velha.",
  fatos:[POP("~358 mil"),FUSO,["Até Curitiba","~110 km","BR-376"],["Saúde militar","P Med Gu","Posto Médico de Guarnição"],["Lazer","Vila Velha","arenitos e furnas"],["Grande Comando","CMS","5ª Bda C Bld"]],
  om:[["Cmdo 5ª Bda C Bld e Esqd Cmdo","Comando da Brigada"],["3º RCC","Regimento de Carros de Combate"],["13º BI Bld","Infantaria blindada"],["25º Pel PE","Polícia do Exército"],["P Med Gu Ponta Grossa","Posto Médico de Guarnição"]],
  omSrc:[W,["5ª Bda C Bld (P Med Gu)","https://5bdacbld.eb.mil.br/images/conteudo/pmgu/ocs-psa/contatos/05_RELACAO_DE_MEDICOS_UG_FuSEx_P_Med_Gu_PG_19-07_2024.pdf"]],
  acessoP:"A cidade fica a cerca de 110 km de Curitiba, pela BR-376, e tem aeroporto regional.",
  saudeObj:{p:["A guarnição tem o <b>Posto Médico de Guarnição de Ponta Grossa</b>, aberto de segunda a sexta, das 7h às 19h, com clínica geral, odontologia, laboratório e especialidades com agendamento. Casos de maior complexidade vão para o Hospital Geral de Curitiba ou para a rede conveniada."], src:[["5ª Bda C Bld","https://5bdacbld.eb.mil.br/images/conteudo/pmgu/ocs-psa/contatos/05_RELACAO_DE_MEDICOS_UG_FuSEx_P_Med_Gu_PG_19-07_2024.pdf"]]},
  edu:TXT.semCM+" A cidade tem a Universidade Estadual de Ponta Grossa (UEPG) e a UTFPR.",
  climaObj:SERRA,
  places:[["~20 km","Parque Estadual de Vila Velha","Formações de arenito, furnas e Lagoa Dourada."],["Região","Buraco do Padre","Cachoeira dentro de uma furna."]]});

const CG = (o)=>S(Object.assign({ref:HGEC, climaObj:SERRA}, o));
CG({id:"lapa", cidade:"Lapa", uf:"PR", estado:"Paraná", coord:"25°46′S 49°43′W · UTC−3",
  tags:["15º GAC AP","Cerco da Lapa","Centro histórico"], destaque:"Interior",
  resumo:"Cidade histórica do Paraná, palco do Cerco da Lapa. Sede do 15º Grupo de Artilharia de Campanha Autopropulsado.",
  lede:"Cidade pequena com centro histórico tombado, a cerca de 70 km de Curitiba.",
  fatos:[POP("~48 mil"),FUSO,["Até Curitiba","~70 km","BR-476"],["História","1894","Cerco da Lapa"],["OM","15º GAC AP","artilharia autopropulsada"],["Grande Comando","CMS","5ª RM"]],
  om:[["15º GAC AP","Grupo de Artilharia de Campanha Autopropulsado"]],
  acessoP:"A cidade fica a cerca de 70 km de Curitiba, que é a referência para voos e serviços.",
  edu:TXT.semCM+" O Colégio Militar de Curitiba fica a cerca de 70 km.",
  places:[["Centro","Centro histórico","Casario tombado e memória do Cerco da Lapa, na Revolução Federalista."]]});

CG({id:"rio-negro", cidade:"Rio Negro", uf:"PR", estado:"Paraná", coord:"26°06′S 49°48′W · divisa com SC · UTC−3",
  tags:["5º RCC","Carros de combate","Mafra"], destaque:"Interior",
  resumo:"Cidade na divisa com Santa Catarina, gêmea de Mafra. Sede do 5º Regimento de Carros de Combate.",
  lede:"Cidade de colonização europeia, separada de Mafra (SC) pelo rio Negro, a cerca de 110 km de Curitiba.",
  fatos:[POP("~31 mil"),FUSO,["Até Curitiba","~110 km","BR-116"],["Divisa","Mafra (SC)","cidades vizinhas"],["OM","5º RCC","carros de combate"],["Grande Comando","CMS","5ª RM"]],
  om:[["5º RCC","Regimento de Carros de Combate"]],
  acessoP:"A cidade fica na BR-116, a cerca de 110 km de Curitiba.",
  edu:TXT.semCM+" Rio Negro e Mafra somam escolas e faculdades regionais.",
  cultP:["Cidade de tradição alemã e polonesa, com festas típicas."]});

CG({id:"castro", cidade:"Castro", uf:"PR", estado:"Paraná", coord:"24°47′S 50°00′W · Campos Gerais · UTC−3",
  tags:["5º Esqd C Mec","Cavalaria","Castrolanda"], destaque:"Interior",
  resumo:"Uma das cidades mais antigas do Paraná, capital do leite, nos Campos Gerais. Sede do 5º Esquadrão de Cavalaria Mecanizado.",
  lede:"Cidade histórica a cerca de 45 km de Ponta Grossa, com a colônia holandesa de Castrolanda.",
  fatos:[POP("~73 mil"),FUSO,["Até Ponta Grossa","~45 km","por rodovia"],["Destaque","Leite","maior bacia leiteira do país"],["OM","5º Esqd C Mec","cavalaria mecanizada"],["Grande Comando","CMS","5ª RM"]],
  om:[["5º Esqd C Mec","Esquadrão de Cavalaria Mecanizado"]],
  acessoP:"A cidade fica a cerca de 45 km de Ponta Grossa e 160 km de Curitiba.",
  ref:"Ponta Grossa, que tem Posto Médico de Guarnição, ou Curitiba",
  edu:TXT.semCM+" Para ensino superior, a referência é Ponta Grossa.",
  places:[["~10 km","Castrolanda","Colônia holandesa, com moinho e museu."]]});

/* ---------- CMS-8: Oeste e norte do PR ---------- */
const OESTE = {p:["Subtropical, com verão quente e úmido e inverno com frio moderado e geadas ocasionais."]};
S({id:"cascavel", cidade:"Cascavel", uf:"PR", estado:"Paraná", coord:"24°57′S 53°27′W · Oeste paranaense · UTC−3",
  tags:["15ª Bda Inf Mec","33º BI Mec","15º B Log"], destaque:"Sede de Brigada",
  resumo:"Capital do oeste paranaense, polo do agronegócio. Sede da 15ª Brigada de Infantaria Mecanizada.",
  lede:"Cidade planejada, de ruas largas, com aeroporto e boa oferta de serviços, a cerca de 140 km de Foz do Iguaçu.",
  fatos:[POP("~348 mil"),FUSO,["Até Foz do Iguaçu","~140 km","BR-277"],["Clima","Subtropical","verão quente"],["OM","15ª Bda Inf Mec","e outras três OM"],["Grande Comando","CMS","15ª Bda Inf Mec"]],
  om:[["Cmdo 15ª Bda Inf Mec e Cia Cmdo","Comando da Brigada"],["33º BI Mec","Infantaria mecanizada"],["15º B Log","Batalhão Logístico"],["15ª Cia Com Mec","Comunicações"]],
  acessoP:"Cascavel tem aeroporto com voos para São Paulo e Curitiba e fica na BR-277, a cerca de 500 km de Curitiba.",
  custoP:"Polo regional com comércio e serviços completos.",
  ref:HGEC,
  edu:TXT.semCM+" A cidade tem a Unioeste, campus da UTFPR e faculdades particulares.",
  climaObj:OESTE,
  cultP:["Cidade jovem, de migrantes gaúchos e catarinenses, com forte economia agrícola."]});

S({id:"foz-do-iguacu", cidade:"Foz do Iguaçu", uf:"PR", estado:"Paraná", coord:"25°32′S 54°35′W · tríplice fronteira · UTC−3",
  tags:["34º BI Mec","Cataratas","Tríplice fronteira"], destaque:"Tríplice fronteira",
  resumo:"Cidade das Cataratas e da Itaipu, na tríplice fronteira com Argentina e Paraguai. Sede do 34º BI Mecanizado.",
  lede:"Destino turístico internacional, com aeroporto movimentado e as cidades de Ciudad del Este e Puerto Iguazú do outro lado das pontes.",
  fatos:[POP("~285 mil"),FUSO,["Fronteira","2 países","Argentina e Paraguai"],["Até Cascavel","~140 km","BR-277"],["OM","34º BI Mec","infantaria mecanizada"],["Grande Comando","CMS","5ª RM"]],
  om:[["34º BI Mec","Batalhão de Infantaria Mecanizado"]],
  acessoP:"O aeroporto tem voos para várias capitais. A Ponte da Amizade liga a cidade a Ciudad del Este (Paraguai), e a Ponte Tancredo Neves, a Puerto Iguazú (Argentina).",
  custoP:"Cidade turística, com comércio forte e compras em Ciudad del Este.",
  ref:HGEC,
  edu:TXT.semCM+" A cidade tem a Unila, a Unioeste e o IFPR.",
  climaObj:{p:["Quente e úmido no verão, com máximas acima de 35 °C, e inverno ameno com dias frios."]},
  places:[["Cidade","Cataratas do Iguaçu","Patrimônio Mundial, com vista dos lados brasileiro e argentino."],["Cidade","Itaipu","Visitas à usina binacional."]],
  cultNote:"<b>Fronteira:</b> veja com a OM as regras para militares atravessarem para o Paraguai e a Argentina."});

S({id:"sao-miguel-do-oeste", cidade:"São Miguel do Oeste", uf:"SC", estado:"Santa Catarina", coord:"26°44′S 53°31′W · extremo oeste de SC · UTC−3",
  tags:["14º RC Mec","Cavalaria","Extremo Oeste"], destaque:"Interior",
  resumo:"Polo do extremo oeste catarinense, a cerca de 130 km de Chapecó e perto da fronteira com a Argentina. Sede do 14º Regimento de Cavalaria Mecanizado.",
  lede:"Cidade média e organizada do extremo oeste de Santa Catarina, de colonização gaúcha, com economia agroindustrial e inverno frio de verdade.",
  fatos:[["População","~44 mil","Censo IBGE 2022"],FUSO,["Até Chapecó","~130 km","BR-282 / BR-480"],["Fronteira","Argentina","extremo oeste de SC"],["OM","14º RC Mec","cavalaria mecanizada"],["Grande Comando","CMS","5ª RM"]],
  om:[["14º RC Mec","Regimento de Cavalaria Mecanizado"]],
  acessoP:"O acesso é por rodovia. Chapecó, a cerca de 130 km pelas BR-282 e BR-480 (sem pedágio), é a referência para voos regulares. A cidade tem aeroporto regional, reformado em 2026 — confira se há linha comercial operando antes de comprar passagem.",
  custoP:"Polo comercial e de serviços do extremo oeste, com supermercados, lojas e clínicas que atendem as cidades vizinhas. Para compras maiores e shopping, a referência é Chapecó.",
  ref:"Chapecó",
  edu:TXT.semCM+" Há escolas públicas e particulares, e a cidade tem campus da Unoesc e do IFSC. Para mais opções de ensino superior, a referência é Chapecó.",
  climaObj:{p:["Subtropical úmido, a cerca de 700 m de altitude. O verão é quente e o inverno é frio, com geadas frequentes e mínimas abaixo de zero em algumas noites."]},
  cultP:["Cidade de colonização gaúcha, de origem italiana e alemã: chimarrão, CTGs, churrasco e festas de comunidade fazem parte da rotina."],
  places:[["Região","Rio Peperi-Guaçu","Rio que marca a fronteira com a Argentina no extremo oeste."],["~130 km","Chapecó","Maior cidade do oeste catarinense, com shopping, restaurantes e aeroporto."]],
  cultNote:"<b>Fronteira:</b> veja com a OM as regras para militares atravessarem para a Argentina."});

S({id:"guaira", cidade:"Guaíra", uf:"PR", estado:"Paraná", coord:"24°05′S 54°15′W · rio Paraná · UTC−3",
  tags:["15ª Cia Inf Mtz","Paraguai","Lago de Itaipu"], destaque:"Fronteira",
  resumo:"Cidade na fronteira com o Paraguai, à beira do lago de Itaipu, em frente a Salto del Guairá. Sede da 15ª Companhia de Infantaria Motorizada.",
  lede:"Cidade de fronteira no extremo oeste do Paraná, onde ficavam as Sete Quedas, hoje cobertas pelo lago de Itaipu.",
  fatos:[POP("~32 mil"),FUSO,["Fronteira","Paraguai","Salto del Guairá"],["Até Cascavel","~230 km","por rodovia"],["OM","15ª Cia Inf Mtz","infantaria motorizada"],["Grande Comando","CMS","5ª RM"]],
  om:[["15ª Cia Inf Mtz","Companhia de Infantaria Motorizada"]],
  acessoP:"O acesso é por rodovia. A ponte Ayrton Senna liga a cidade a Mundo Novo (MS), e Salto del Guairá, no Paraguai, fica ao lado.",
  custoP:"O comércio de Salto del Guairá, no Paraguai, atrai compras de importados.",
  ref:"Cascavel ou Curitiba",
  edu:TXT.semCM+" A cidade tem escolas públicas e particulares e campus de instituições regionais.",
  climaObj:OESTE,
  cultNote:"<b>Fronteira:</b> a região tem rotas de contrabando. Siga as orientações da OM e veja as regras para militares atravessarem para o Paraguai."});

S({id:"apucarana", cidade:"Apucarana", uf:"PR", estado:"Paraná", coord:"23°33′S 51°27′W · Norte do Paraná · UTC−3",
  tags:["30º BI Mec","Norte do Paraná"], destaque:"Interior",
  resumo:"Cidade do norte do Paraná, entre Londrina e Maringá. Sede do 30º Batalhão de Infantaria Mecanizado.",
  lede:"Cidade de porte médio, com indústria de bonés e confecções, a cerca de 60 km de Londrina.",
  fatos:[POP("~130 mil"),FUSO,["Até Londrina","~60 km","BR-369"],["Destaque","Bonés","polo de confecção"],["OM","30º BI Mec","infantaria mecanizada"],["Grande Comando","CMS","5ª RM"]],
  om:[["30º BI Mec","Batalhão de Infantaria Mecanizado"]],
  acessoP:"A cidade fica entre Londrina e Maringá, que têm aeroportos com voos para capitais.",
  custoP:"Cidade média com comércio completo, perto de dois polos regionais.",
  ref:"Londrina ou Curitiba",
  edu:TXT.semCM+" A cidade tem campus da UTFPR e da Unespar, e Londrina e Maringá têm universidades estaduais.",
  climaObj:OESTE,
  cultP:["Cidade no alto de um espigão, com clima mais ameno que o do restante do norte do Paraná."]});

/* ---------- CMS-9: Sudoeste do PR e planalto de SC ---------- */
CG({id:"guarapuava", cidade:"Guarapuava", uf:"PR", estado:"Paraná", coord:"25°23′S 51°27′W · alt. 1.100 m · UTC−3",
  tags:["26º GAC","Frio","Centro-Sul do PR"], destaque:"Interior",
  resumo:"Uma das cidades mais frias do Paraná, a mais de 1.000 m de altitude. Sede do 26º Grupo de Artilharia de Campanha.",
  lede:"Polo do centro-sul paranaense, com universidade estadual e inverno rigoroso.",
  fatos:[POP("~182 mil"),FUSO,["Até Curitiba","~250 km","BR-277"],["Altitude","~1.100 m","inverno rigoroso"],["OM","26º GAC","artilharia de campanha"],["Grande Comando","CMS","5ª RM"]],
  om:[["26º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"A cidade fica na BR-277, a cerca de 250 km de Curitiba, e tem aeroporto regional.",
  custoP:"Polo regional com comércio e serviços completos.",
  edu:TXT.semCM+" A cidade tem a Unicentro e campus do IFPR.",
  cultP:["Cidade de tradição tropeira e colonização europeia, com parques e lagoas urbanas e cachoeiras na região."],
  chegadaX:["Prepare roupas de frio: o inverno é rigoroso."]});

CG({id:"francisco-beltrao", cidade:"Francisco Beltrão", uf:"PR", estado:"Paraná", coord:"26°05′S 53°03′W · Sudoeste do PR · UTC−3",
  tags:["16º Esqd C Mec","Cavalaria","Sudoeste"], destaque:"Interior",
  resumo:"Polo do sudoeste paranaense, perto da Argentina. Sede do 16º Esquadrão de Cavalaria Mecanizado.",
  lede:"Cidade de colonização gaúcha e catarinense, com boa qualidade de vida e economia agroindustrial.",
  fatos:[POP("~97 mil"),FUSO,["Até Cascavel","~190 km","por rodovia"],["Região","Sudoeste","perto da Argentina"],["OM","16º Esqd C Mec","cavalaria mecanizada"],["Grande Comando","CMS","5ª RM"]],
  om:[["16º Esqd C Mec","Esquadrão de Cavalaria Mecanizado"]],
  acessoP:"O acesso é por rodovia. A cidade tem aeroporto regional; Cascavel e Chapecó (SC) são outras opções para voos.",
  ref:"Cascavel ou Curitiba",
  edu:TXT.semCM+" A cidade tem campus da Unioeste, da UTFPR e do IFPR.",
  climaObj:FRIO,
  cultP:["Cidade de tradição gaúcha, com feiras agropecuárias e festas regionais."]});

CG({id:"palmas-pr", cidade:"Palmas", uf:"PR", estado:"Paraná", coord:"26°29′S 51°59′W · alt. 1.100 m · UTC−3",
  tags:["15ª Cia E Cmb Mec","Frio","Campos de Palmas"], destaque:"Interior",
  resumo:"Uma das cidades mais frias do Paraná, nos Campos de Palmas, perto de Santa Catarina. Sede da 15ª Companhia de Engenharia de Combate Mecanizada.",
  lede:"Cidade de altitude, com campos naturais, parques eólicos e inverno com geada quase diária.",
  fatos:[POP("~48 mil"),FUSO,["Até Curitiba","~380 km","por rodovia"],["Altitude","~1.100 m","geadas frequentes"],["OM","15ª Cia E Cmb Mec","engenharia de combate"],["Grande Comando","CMS","5ª RM"]],
  om:[["15ª Cia E Cmb Mec","Companhia de Engenharia de Combate Mecanizada"]],
  acessoP:"O acesso é por rodovia. Para voos, as referências regionais são Chapecó (SC) e Guarapuava.",
  edu:TXT.semCM+" A cidade tem campus do IFPR e de instituições regionais.",
  cultP:["Paisagem de campos de altitude, com cachoeiras e parques eólicos."],
  chegadaX:["Prepare roupas de frio: o inverno é rigoroso."]});

const SC = {estado:"Santa Catarina", uf:"SC"};
CG(Object.assign({}, SC, {id:"porto-uniao", cidade:"Porto União", coord:"26°14′S 51°04′W · divisa com o PR · UTC−3",
  tags:["5º BE Cmb Bld","União da Vitória"], destaque:"Interior",
  resumo:"Cidade catarinense gêmea de União da Vitória (PR), separadas pela linha férrea. Sede do 5º Batalhão de Engenharia de Combate Blindado.",
  lede:"Na divisa entre Santa Catarina e Paraná, às margens do rio Iguaçu, ligada à história da Guerra do Contestado.",
  fatos:[POP("~35 mil"),FUSO,["Vizinha","União da Vitória","no Paraná"],["Até Curitiba","~240 km","por rodovia"],["OM","5º BE Cmb Bld","engenharia de combate"],["Grande Comando","CMS","5ª RM"]],
  om:[["5º BE Cmb Bld","Batalhão de Engenharia de Combate Blindado"]],
  acessoP:"O acesso é por rodovia, a cerca de 240 km de Curitiba.",
  edu:TXT.semCM+" Porto União e União da Vitória somam escolas, faculdades e campus da Unespar.",
  cultP:["Região do Contestado, com memória da guerra do início do século XX."], cultNote:TXT.rios}));

CG(Object.assign({}, SC, {id:"lages", cidade:"Lages", coord:"27°49′S 50°19′W · Serra Catarinense · UTC−3",
  tags:["1º B Fv","Serra Catarinense","Festa do Pinhão"], destaque:"Polo regional",
  resumo:"Princesa da Serra, no planalto catarinense, com inverno muito frio. Sede do 1º Batalhão Ferroviário.",
  lede:"Polo da Serra Catarinense, de tradição tropeira, perto das cidades mais frias do Brasil.",
  fatos:[POP("~165 mil"),FUSO,["Até Florianópolis","~220 km","BR-282"],["Festa","Festa do Pinhão","no inverno"],["OM","1º B Fv","Batalhão Ferroviário"],["Grande Comando","CMS","5ª RM"]],
  om:[["1º B Fv","Batalhão Ferroviário"],["10º BE Cnst","Citado em fonte secundária, a confirmar"]],
  omSrc:[W, SRC.CML],
  acessoP:"A cidade fica na BR-282, a cerca de 220 km de Florianópolis, e na BR-116. Tem aeroporto regional.",
  custoP:"Polo regional com comércio e serviços completos.",
  ref:HGUFLN,
  edu:TXT.semCM+" A cidade tem a Uniplac, campus da UDESC e do IFSC.",
  places:[["Junho","Festa do Pinhão","Uma das maiores festas de inverno do país."],["~80 km","São Joaquim e Urubici","Cidades mais frias do Brasil, com chance de neve."]],
  chegadaX:["Prepare roupas de frio: o inverno é rigoroso."]}));

/* ---------- CMS-10: Litoral catarinense ---------- */
S(Object.assign({}, SC, {id:"florianopolis", cidade:"Florianópolis", coord:"27°35′S 48°33′W · ilha de Santa Catarina · UTC−3",
  tags:["14ª Bda Inf Mtz","63º BI","H Gu Florianópolis"], destaque:"Sede de Brigada",
  resumo:"Capital catarinense, numa ilha de praias. Sede da 14ª Brigada de Infantaria Motorizada e de um Hospital de Guarnição.",
  lede:"Uma das capitais com melhor qualidade de vida do país, com mais de 40 praias, mas aluguel caro e trânsito pesado nas pontes.",
  fatos:[POP("~537 mil"),FUSO,["Aluguel","R$ 60/m²","FipeZAP, fev/2026"],["Clima","Ameno","verão quente, inverno fresco"],["Cesta básica","R$ 851","DIEESE, ago/2026"],["Grande Comando","CMS","14ª Bda Inf Mtz"]],
  om:[["Cmdo 14ª Bda Inf Mtz e Cia Cmdo","Comando da Brigada"],["63º BI","Batalhão de Infantaria"],["14º Pel PE","Polícia do Exército"],["H Gu Florianópolis","Hospital de Guarnição"]],
  acessoP:"O Aeroporto Internacional Hercílio Luz tem voos para várias capitais. A BR-101 liga a região ao resto do país, e duas pontes ligam a ilha ao continente.",
  custoObj:{p:[TXT.fipe("Florianópolis","60,49","+7,92%")+" É um dos aluguéis mais caros do país.",TXT.cesta("Florianópolis","850,90")], note:"<b>Na prática:</b> muitos militares moram em São José, Palhoça ou Biguaçu, onde o aluguel é mais baixo. Na temporada de verão, aluguel e trânsito pioram.", src:[SRC.fipe,SRC.dieese]},
  saudeObj:{p:["A guarnição tem o <b>Hospital de Guarnição de Florianópolis</b>, que atende os beneficiários do FuSEx, além de rede conveniada ampla."], src:[W]},
  edu:TXT.semCM+" A cidade tem a UFSC, a UDESC, o IFSC e várias faculdades particulares.",
  climaObj:LITORAL,
  places:[["Ilha","Praias","Mais de 40 praias, de Jurerê à Lagoinha do Leste."],["Ilha","Lagoa da Conceição","Bairro boêmio com esportes náuticos."],["Centro","Ponte Hercílio Luz","Cartão-postal da cidade."]]}));

const SCN = (o)=>S(Object.assign({}, SC, {ref:HGUFLN, climaObj:LITORAL}, o));
SCN({id:"blumenau", cidade:"Blumenau", coord:"26°55′S 49°03′W · Vale do Itajaí · UTC−3",
  tags:["23º BI","Oktoberfest","Vale do Itajaí"], destaque:"Polo regional",
  resumo:"Cidade de colonização alemã no Vale do Itajaí, famosa pela Oktoberfest. Sede do 23º Batalhão de Infantaria.",
  lede:"Polo industrial e tecnológico, com arquitetura enxaimel e histórico de enchentes do rio Itajaí-Açu.",
  fatos:[POP("~361 mil"),FUSO,["Até Florianópolis","~150 km","BR-101 e BR-470"],["Festa","Oktoberfest","em outubro"],["OM","23º BI","infantaria"],["Grande Comando","CMS","5ª RM"]],
  om:[["23º BI","Batalhão de Infantaria"]],
  acessoP:"A cidade fica a cerca de 150 km de Florianópolis. O aeroporto de Navegantes, a cerca de 60 km, tem voos para várias capitais.",
  custoObj:{p:["Cidade com renda alta e mercado imobiliário aquecido."], note:"<b>Enchentes:</b> o rio Itajaí-Açu tem histórico de cheias. Pergunte se o imóvel já foi atingido antes de alugar."},
  edu:TXT.semCM+" A cidade tem a FURB, campus da UFSC e do IFC.",
  places:[["Outubro","Oktoberfest","Uma das maiores festas alemãs fora da Alemanha."],["Cidade","Vila Germânica","Parque com arquitetura enxaimel."]]});

SCN({id:"joinville", cidade:"Joinville", coord:"26°18′S 48°50′W · Norte catarinense · UTC−3",
  tags:["62º BI","Festival de Dança","Indústria"], destaque:"Polo regional",
  resumo:"Maior cidade de Santa Catarina, polo industrial do norte do estado. Sede do 62º Batalhão de Infantaria.",
  lede:"Cidade das flores e da dança, com indústria forte, aeroporto e acesso fácil a Curitiba e ao litoral.",
  fatos:[POP("~616 mil"),FUSO,["Aluguel","R$ 36/m²","FipeZAP, fev/2026"],["Até Curitiba","~130 km","BR-101 e BR-376"],["Festa","Festival de Dança","em julho"],["Grande Comando","CMS","5ª RM"]],
  om:[["62º BI","Batalhão de Infantaria"]],
  acessoP:"Joinville tem aeroporto com voos para São Paulo e outras capitais e fica a cerca de 130 km de Curitiba.",
  custoObj:{p:[TXT.fipe("Joinville","36,15","+7,75%")], src:[SRC.fipe]},
  ref:"Curitiba ou Florianópolis",
  edu:TXT.semCM+" A cidade tem campus da UDESC, da UFSC e da Univille.",
  places:[["Julho","Festival de Dança","Considerado o maior festival de dança do mundo em número de participantes."],["~60 km","São Francisco do Sul","Praias e centro histórico."]]});

SCN({id:"criciuma", cidade:"Criciúma", coord:"28°40′S 49°22′W · Sul catarinense · UTC−3",
  tags:["28º GAC","Sul de SC"], destaque:"Polo regional",
  resumo:"Polo do sul catarinense, de tradição carbonífera e cerâmica. Sede do 28º Grupo de Artilharia de Campanha.",
  lede:"Cidade de porte médio, perto de praias e da Serra do Rio do Rastro, a cerca de 200 km de Florianópolis.",
  fatos:[POP("~214 mil"),FUSO,["Até Florianópolis","~200 km","BR-101"],["Região","Sul de SC","praias e serra"],["OM","28º GAC","artilharia de campanha"],["Grande Comando","CMS","5ª RM"]],
  om:[["28º GAC","Grupo de Artilharia de Campanha"]],
  acessoP:"A cidade fica na BR-101, a cerca de 200 km de Florianópolis, e tem aeroporto regional em Forquilhinha.",
  custoP:"Polo regional com comércio e serviços completos.",
  edu:TXT.semCM+" A cidade tem a UNESC, campus da UFSC e do IFSC.",
  places:[["~70 km","Serra do Rio do Rastro","Estrada de serra famosa pelas curvas e mirantes."],["~30 km","Praias do sul catarinense","Rincão e outras praias da região."]]});
})();
