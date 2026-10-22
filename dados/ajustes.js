/* Revisão de out/2026: saúde militar confirmada por guarnição e amostras de aluguel.
   Carregado depois de todos os arquivos de dados. */
(function(){
const G = window.GUARNICOES, byId = id => G.find(g=>g.id===id);
const sec = (g,id) => g && g.secoes.find(s=>s.id===id);

/* ---------- Saúde ---------- */
const CRED = "<b>Ao chegar:</b> atualize o cadastro no FuSEx e peça a lista atualizada de médicos, clínicas e hospitais credenciados.";
const GEN = "O atendimento inicial é feito na seção de saúde da própria OM. Consultas especializadas, exames e internações são feitos na rede civil conveniada ao FuSEx, com guia emitida pela Unidade Gestora do FuSEx que atende a guarnição.";
const S3RM = ["Processo seletivo 3ª RM (lista de OM de saúde)","https://www.militarestemporarios.com.br/exercito/3rm/mfdv.html"];
/* Estruturas confirmadas em fonte pública */
const CONF = {
  "sao-gabriel":   ["Posto Médico da Guarnição de São Gabriel", [S3RM,["Waze","https://www.waze.com/live-map/directions/br/rs/posto-medico-de-guarnicao-de-sao-gabriel-(pmgusg)?to=place.ChIJFWexSklPAZURX8LaWt-NCKU"]], "Fica na Rua Barão de São Gabriel."],
  "sao-borja":     ["Posto Médico da Guarnição de São Borja", [S3RM,["2º RC Mec","https://2rcmec.eb.mil.br/index.php/contatos-2"]]],
  "santana-do-livramento": ["Posto Médico da Guarnição de Santana do Livramento", [S3RM]],
  "cruz-alta":     ["Posto Médico da Guarnição de Cruz Alta", [S3RM]],
  "santo-angelo":  ["Posto Médico da Guarnição de Santo Ângelo", [S3RM]],
  "pelotas":       ["Posto Médico da Guarnição de Pelotas", [S3RM]],
  "cascavel":      ["Posto Médico de Guarnição de Cascavel", [["Alerta Paraná","https://www.alertaparana.com.br/noticia/14032/posto-medico-de-guarnicao-de-cascavel-completa-30-anos"]], "Em funcionamento há mais de 30 anos."],
  "cuiaba":        ["Posto Médico da Guarnição de Cuiabá", [["Waze","https://www.waze.com/live-map/directions/br/mt/posto-medico-da-guarnicao-de-cuiaba?to=place.ChIJmwuR35qxnZMR7nT85rH9Mlw"]], "Fica na Avenida Miguel Sutil."],
  "dourados":      ["Posto Médico da 4ª Bda C Mec", [["4ª Bda C Mec","https://4bdacmec.eb.mil.br/index.php/pt/posto-medico"]]],
  "teresina":      ["Posto Médico de Guarnição de Teresina", [["Guia Fácil","https://guiafacil.com/site/posto-medico-de-guarnicao-de-teresina/teresina/pi/83184484"]], "Fica na Rua Professor José Amável, no Cabral."],
  "aracaju":       ["Posto Médico de Guarnição de Aracaju", [["28º BC","https://28bc.eb.mil.br/index.php/posto-medico"]], "Funciona junto ao 28º BC."],
  "maceio":        ["Posto Médico de Guarnição de Maceió", [["59º BI Mtz","https://59bimtz.eb.mil.br/index.php/posto-medico-do-guarnicao"]], "Funciona junto ao 59º BI Mtz."],
  "vila-velha":    ["Posto Médico do 38º BI", [["38º BI","https://www.38bi.eb.mil.br/posto-medico"]]],
  "campinas":      ["Posto Médico da Guarnição de Campinas", [["SciELO (estudo de caso do posto)","https://www.scielo.br/j/gp/a/jwthtZTTM54jHJPkxZHRBTr/?format=html&lang=pt&ilang=pt_BR"]]],
  "goiania":       ["Posto Médico da Guarnição de Goiânia", [["Cofen","https://www.cofen.gov.br/comissao-nacional-de-enfermagem-militar-visita-posto-medico-da-guarnicao-de-goiania/"]]],
  "belo-horizonte":["Posto Médico de Guarnição de Belo Horizonte", [["4ª RM","https://4rm.eb.mil.br/index.php/servicos-de-saude?id=108"]]],
  "pouso-alegre":  ["Posto Médico do 14º GAC", [["14º GAC","https://14gac.eb.mil.br/index.php/posto-medico"]]],
  "tres-coracoes": ["Posto Médico da EsSA", [["EsSA","https://esa.eb.mil.br/index.php/pt/posto-medico/conheca-o-posto-medico"]]]
};
G.forEach(g=>{
  const s = sec(g,"saude"); if(!s || s.html) return;
  const c = CONF[g.id];
  if(c){
    const [nome, src, extra] = c;
    const ref = (s.p||[]).find(t=>/encaminhad/.test(t)) || "";
    s.p = [`A guarnição tem o <b>${nome}</b>, que atende os beneficiários do FuSEx e encaminha para a rede civil conveniada.${extra?" "+extra:""}`, ref.replace(/^Casos especializados costumam/,"Casos de maior complexidade costumam")].filter(Boolean);
    s.note = CRED; s.src = src;
  } else if(s.note === TXT.pendSaude){
    s.p = [GEN, ...(s.p||[])];
    s.note = CRED;
  }
});
/* Santa Maria: o hospital é o Hospital Geral de Santa Maria */
(function(){
  const g = byId("santa-maria"); if(!g) return;
  const s = sec(g,"saude");
  s.p = ["A guarnição tem o <b>Hospital Geral de Santa Maria</b>, que atende os beneficiários do FuSEx, além de rede conveniada ampla. Casos de maior complexidade podem ir para o Hospital Militar de Área de Porto Alegre."];
  s.src = [S3RM,["HGeSM","https://hgesm.eb.mil.br/images/pdf/Processo_de_Ressarcimento_de_Despesas_Medicas_do_FUSEx.pdf"]];
  const t = sec(g,"om").tab.r.find(r=>/H Gu Santa Maria/.test(r[0])); if(t){ t[0]="Hospital Geral de Santa Maria"; t[1]="Hospital do Exército"; }
  g.fatos.forEach(f=>{ if(f.r==="Saúde militar"){ f.v="HGe"; f.s="Hospital Geral"; }});
  g.tags = g.tags.map(t=>t==="H Gu Santa Maria"?"HGe Santa Maria":t);
  g.resumo = g.resumo.replace("e Hospital de Guarnição","e Hospital Geral");
})();
/* Fichas antigas em HTML (CMA): troca o aviso de dado pendente pelo texto geral */
G.forEach(g=>{
  const s = sec(g,"saude");
  if(s && s.html && /Dado pendente/.test(s.html)){
    s.html = `<p>${GEN}</p>` + s.html.replace(/<div class="note"><b>Dado pendente:<\/b>[^<]*<\/div>/, `<div class="note">${CRED}</div>`);
  }
});
/* Aluguel sem amostra: orientação prática no lugar de "dado pendente" */
const SEMAMOSTRA = "<b>Sem amostra confiável:</b> há poucos anúncios on-line de aluguel na cidade. Procure imobiliárias locais e pergunte à OM sobre PNR e sobre indicações de quem já serve na guarnição.";
G.forEach(g=>{
  const s = sec(g,"custo"); if(!s) return;
  if(s.note === TXT.pendAluguel) s.note = SEMAMOSTRA;
  if(s.html && /Dado pendente/.test(s.html)) s.html = s.html.replace(/<div class="note"><b>Dado pendente:<\/b>[^<]*<\/div>/, `<div class="note">${SEMAMOSTRA}</div>`);
});

/* ---------- Aluguel: amostras de anúncios (primeira página dos portais, out/2026) ---------- */
const TROVIT = (slug)=>["Trovit", "https://imoveis.trovit.com.br/"+slug];
const AL = {
  "bage":            [1100,16,"650 a 1.500",["Mitula","https://imoveis.mitula.com.br/imoveis/aluguel-apartamentos-santana-livramento"]],
  "santa-maria":     [1200,17,"750 a 2.250",TROVIT("aluguel-apartamento-santa-maria-mesorregiao-centro-ocidental-rio-grandense")],
  "caxias-do-sul":   [2300,13,"1.750 a 3.350",["Wimoveis","https://www.wimoveis.com.br/apartamentos-aluguel-caxias-do-sul-rs.html"]],
  "rio-grande":      [1700,11,"850 a 4.900",["Imovelweb","https://www.imovelweb.com.br/imoveis-aluguel-rio-grande-rs.html"]],
  "sao-leopoldo":    [1150,18,"690 a 1.370",TROVIT("aluguel-sao-leopoldo/8")],
  "santa-cruz-do-sul":[1800,15,"1.200 a 3.000",TROVIT("aluguel-sede-santa-cruz-sul")],
  "cascavel":        [1300,17,"1.100 a 1.600",TROVIT("aluguel-apartamento-cascavel-mesorregião-oeste-paranaense-2-quartos")],
  "ponta-grossa":    [1500,15,"700 a 2.000",TROVIT("aluguel-estado-paran%C3%A1-ponta-grossa-jardim-carvalho")],
  "foz-do-iguacu":   [1850,9,"1.750 a 3.000",TROVIT("aluguel-casa-foz-iguacu")],
  "guarapuava":      [1050,12,"700 a 1.400",TROVIT("aluguel-guarapuava")],
  "blumenau":        [1500,13,"1.200 a 2.100",TROVIT("aluguel-residencial-blumenau")],
  "lages":           [1300,13,"650 a 1.500",TROVIT("aluguel-lages")],
  "porto-velho":     [2500,16,"1.600 a 3.000",TROVIT("aluguel-casa-para-porto-velho-rond%C3%B4nia")],
  "juiz-de-fora":    [700,9,"600 a 958",TROVIT("aluguel-juiz")],
  "uberlandia":      [2025,8,"1.500 a 4.200",TROVIT("aluguel-apartamento-uberlandia/95")],
  "campina-grande":  [1200,15,"800 a 2.000",TROVIT("aluguel-casa-campina-grande")]
};
const brl = v => v.toLocaleString("pt-BR");
Object.entries(AL).forEach(([id,[med,n,faixa,src]])=>{
  const g = byId(id); if(!g) return;
  const s = sec(g,"custo"); if(!s) return;
  if(s.html){ delete s.html; s.p = id==="porto-velho" ? [TXT.cesta("Porto Velho","664,79")] : []; s.src=[SRC.dieese]; }
  const frase = `Numa amostra de anúncios de imóveis de 2 quartos para alugar, levantada em outubro de 2026, a mediana foi de <b class="num">R$ ${brl(med)}</b> por mês (${n} anúncios, de R$ ${faixa}), sem condomínio.`;
  const resto = (s.p||[]).filter(t=>!/Numa amostra/.test(t));
  s.p = [frase, ...resto];
  s.note = "<b>Valor de referência:</b> a amostra cobre só a primeira página de um portal de anúncios. Confirme com imobiliárias e com militares da guarnição.";
  s.src = [...(s.src||[]), src];
  if(!g.fatos.some(f=>/Aluguel/.test(f.r))){
    const troca = ["Clima","Região","Lazer","Rio","Festa","História","Destaque","Altitude","Economia","Ensino","Vizinha"];
    let i = g.fatos.findIndex(f=>troca.includes(f.r)); if(i<0) i = 2;
    g.fatos[i] = {r:"Aluguel 2 quartos", v:`~R$ ${brl(med)}`, s:"mediana de anúncios, out/2026"};
  }
});
})();
