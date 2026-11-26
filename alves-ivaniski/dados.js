/* =========================================================
   EDITE AQUI — todos os dados do escritório ficam neste arquivo.
   Deixe um campo vazio ("" ou []) para escondê-lo no site.
   ========================================================= */
window.ESCRITORIO = {
  nome: "Alves & Ivaniski",
  complemento: "Advogados Associados",   // linha pequena abaixo do nome
  cidade: "Santiago · RS",

  // Frase principal da capa (use \n para quebrar a linha)
  chamada: "Do planejamento\nà solução, com você\nem cada etapa.",
  resumo: "Direito Imobiliário e Direito Sucessório em Santiago, Rio Grande do Sul. Atendimento pessoal, com linguagem direta e acompanhamento de cada andamento.",

  citacao: "Imóvel e herança são patrimônio — e, quase sempre, história de família.",
  sobre: [
    "A Alves & Ivaniski Advogados Associados atua em Santiago, RS, com foco em duas áreas que caminham juntas: o Direito Imobiliário e o Direito Sucessório.",
    "Da regularização de um imóvel à organização de uma herança, o escritório acompanha o cliente do planejamento à solução, explicando cada passo com clareza."
  ],

  // Áreas de atuação — "temas" são os assuntos listados em cada área
  areas: [
    {
      nome: "Direito Imobiliário",
      texto: "Segurança jurídica para comprar, vender e regularizar imóveis.",
      temas: ["Regularização de imóveis sem escritura", "Escrituras e registros", "Contratos de compra e venda", "ITBI e IPTU"]
    },
    {
      nome: "Direito Sucessório",
      texto: "Organização do patrimônio e da herança, com o cuidado que o momento pede.",
      temas: ["Inventário e partilha", "Planejamento sucessório", "Regularização de imóveis herdados", "ITCMD"]
    }
  ],

  // Contato
  whatsapp: [                            // só números com DDI e DDD; o primeiro é o botão principal
    { rotulo: "Escritório", numero: "5555999227520" },
    { rotulo: "Roberta", numero: "5555999606730" }
  ],
  telefone: "",
  email: "",
  instagram: "alvesivaniski",            // só o usuário, sem @
  endereco: ["Av. Getúlio Vargas, 1592", "Santiago · Rio Grande do Sul"],
  horario: [],                           // ex.: ["Segunda a sexta", "8h30 às 12h · 13h30 às 18h"]
  mapa: "https://www.google.com/maps/search/?api=1&query=Av.+Get%C3%BAlio+Vargas+1592+Santiago+RS"
};
