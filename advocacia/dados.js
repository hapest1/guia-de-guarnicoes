/* =========================================================
   EDITE AQUI — todos os dados do escritório ficam neste arquivo.
   Os valores abaixo são PROVISÓRIOS (marcados com "A definir")
   até recebermos as informações reais do escritório.
   ========================================================= */
window.ESCRITORIO = {
  nome: "Nome do Escritório",
  complemento: "Advocacia",              // linha pequena abaixo do nome
  oab: "OAB/UF 000.000",                 // registro do(a) advogado(a) ou da sociedade
  cidade: "Cidade · UF",

  // Frase principal da capa (use \n para quebrar a linha)
  chamada: "Orientação jurídica\nclara, próxima e discreta.",
  resumo: "Atendimento pessoal, do primeiro contato à conclusão do caso, com linguagem direta e acompanhamento de cada etapa.",

  sobre: [
    "A definir — um parágrafo sobre a história do escritório, a formação de quem atende e a forma de trabalhar.",
    "A definir — um segundo parágrafo sobre o perfil dos clientes e a região atendida."
  ],

  // Áreas de atuação (confirme, remova ou acrescente)
  areas: [
    { nome: "Direito Civil", texto: "Contratos, responsabilidade civil, cobranças e questões imobiliárias." },
    { nome: "Família e Sucessões", texto: "Divórcio, guarda, alimentos, inventários e planejamento sucessório." },
    { nome: "Direito do Trabalho", texto: "Orientação e atuação em relações de trabalho, para empregados e empresas." },
    { nome: "Direito Previdenciário", texto: "Aposentadorias, benefícios, revisões e planejamento previdenciário." },
    { nome: "Direito do Consumidor", texto: "Relações de consumo, serviços bancários, planos de saúde e cobranças indevidas." },
    { nome: "Direito Empresarial", texto: "Consultoria para empresas, contratos e estruturação societária." }
  ],

  // Contato — deixe "" para esconder o item
  whatsapp: "",                          // só números com DDI e DDD, ex.: "5555999990000"
  telefone: "A definir",
  email: "",
  instagram: "",                         // só o usuário, sem @
  endereco: ["A definir — rua e número", "Bairro · Cidade/UF · CEP"],
  horario: ["Segunda a sexta", "A definir"],
  mapa: ""                               // link do Google Maps do escritório
};
