/* Base do Guia de Guarnições: fontes comuns e montagem das fichas em formato compacto. */
window.GUARNICOES = window.GUARNICOES || [];
window.CMDNOME = {
  CMA:"Comando Militar da Amazônia", CMAO:"Comando Militar da Amazônia Oriental", CMNE:"Comando Militar do Nordeste",
  CMP:"Comando Militar do Planalto", CML:"Comando Militar do Leste", CMSE:"Comando Militar do Sudeste",
  CMO:"Comando Militar do Oeste", CMS:"Comando Militar do Sul"
};
window.SRC = {
  dieese:["DIEESE","https://www.dieese.org.br/analisecestabasica/2026/202608cestabasica.pdf"],
  fipe:["FipeZAP","https://www.datazap.com.br/wp-content/uploads/2026/03/fipezap-202602-residencial-locacao.pdf"],
  ibge:["IBGE","https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf"],
  CMA:["Wikipédia (CMA)","https://en.wikipedia.org/wiki/Amazon_Military_Command"],
  CMAO:["Wikipédia (CMAO, antigo CMN)","https://en.wikipedia.org/wiki/Northern_Military_Command_(Brazil)"],
  CMNE:["Wikipédia (CMNE)","https://en.wikipedia.org/wiki/Northeastern_Military_Command_(Brazil)"],
  CMP:["Wikipédia (CMP)","https://en.wikipedia.org/wiki/Planalto_Military_Command"],
  CML:["Wikipédia (CML)","https://en.wikipedia.org/wiki/Eastern_Military_Command_(Brazil)"],
  CMSE:["Wikipédia (CMSE)","https://en.wikipedia.org/wiki/Southeastern_Military_Command_(Brazil)"],
  CMO:["Wikipédia (CMO)","https://en.wikipedia.org/wiki/Western_Military_Command_(Brazil)"],
  CMS:["Wikipédia (CMS)","https://en.wikipedia.org/wiki/Southern_Military_Command_(Brazil)"]
};
/* Frases reutilizadas */
window.TXT = {
  cesta:(cid,v)=>`A cesta básica em ${cid} custou <b class="num">R$ ${v}</b> em agosto de 2026, segundo o DIEESE.`,
  fipe:(cid,v,vr)=>`O aluguel residencial em ${cid} custava em média <b class="num">R$ ${v} por m²</b> em fevereiro de 2026, pelo índice FipeZAP, com variação de ${vr} em 12 meses. Na mesma data, a média nacional era de R$ 51,89 por m².`,
  pendAluguel:`<b>Dado pendente:</b> não há índice público de aluguel para a cidade. Se você serve na guarnição, sua informação ajuda a completar a ficha.`,
  pendSaude:`<b>Dado pendente:</b> confirme ao chegar a estrutura de saúde da guarnição e a rede conveniada ao FuSEx.`,
  semCM:`Não há Colégio Militar do Sistema Colégio Militar do Brasil na cidade.`,
  pnr:`Procure a seção responsável pelos PNR para saber a situação da fila.`,
  fusex:`Atualize o cadastro no FuSEx e leve laudos e receitas dos dependentes.`,
  rios:`<b>Cuidado com os rios:</b> correnteza e profundidade mudam muito entre cheia e seca. Nade só em locais conhecidos.`
};
/* Monta a ficha. o.fatos = [[rótulo, valor, sub], ...]; seções em formato compacto (ver secHTML no index). */
window.addG = function(o){
  const T = window.TXT;
  const sec = (id,titulo,s)=> s ? Object.assign({id,titulo}, s) : null;
  const om = {p:o.omP, tab:{h:["OM","Observação"], r:o.om}, p2:o.omP2, src:o.omSrc || [SRC[o.comando]]};
  const chegada = {ul:[...(o.chegada||[]), T.pnr, T.fusex]};
  window.GUARNICOES.push({
    id:o.id, cidade:o.cidade, uf:o.uf, estado:o.estado, regiao:o.regiao, comando:o.comando,
    comandoNome:CMDNOME[o.comando], coord:o.coord, conferido:"out/2026",
    tags:o.tags, destaque:o.destaque, resumo:o.resumo, lede:o.lede,
    fatos:o.fatos.map(([r,v,s])=>({r,v,s})),
    secoes:[
      sec("om", o.pef ? "O pelotão" : "OM sediadas", om),
      sec("acesso","Como chegar",o.acesso),
      sec("custo", o.pef ? "Moradia e abastecimento" : "Custo de vida e moradia", o.custo),
      sec("saude","Saúde",o.saude),
      sec("educacao","Educação",o.educacao),
      sec("clima","Clima",o.clima),
      sec("cultura","Cultura e lazer",o.cultura),
      sec("chegada","Antes de ir",chegada)
    ].filter(Boolean)
  });
};
/* Modelo para Pelotões e destacamentos de fronteira */
window.addPEF = function(o){
  const T = window.TXT;
  addG(Object.assign({
    regiao:"Norte", comando:"CMA", pef:true, destaque:"Fronteira",
    custo:{p:[o.vida || `Os pelotões de fronteira costumam ter vila militar com PNR para as famílias, e o pelotão organiza parte do abastecimento, já que o comércio local é pequeno ou inexistente.`],
      note:`<b>Confirme com a OM:</b> disponibilidade de PNR, regras para levar família, internet, telefonia e como funciona o envio de mantimentos e encomendas.`},
    saude:{p:[`O atendimento é feito na estrutura de saúde do próprio pelotão. Casos que exigem mais recursos são evacuados, em geral de avião, para ${o.evac}.`],
      note:`<b>Antes de ir:</b> leve estoque de remédios de uso contínuo e confirme com a OM como funcionam as evacuações.`},
    educacao:{p:[o.escola || `As escolas da localidade são municipais ou estaduais, com oferta limitada, principalmente no ensino médio. Converse com a OM sobre a situação das famílias com filhos em idade escolar.`]}
  }, o));
};
