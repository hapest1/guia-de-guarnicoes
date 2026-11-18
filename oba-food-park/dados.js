/* =========================================================
   OBA FOOD PARK — dados do site
   Edite aqui: lojas, horários e contatos. O resto do site
   se monta sozinho a partir deste arquivo.
   ========================================================= */
window.OBA = {
  whatsapp: "5555996776001",          // (55) 99677-6001
  instagram: "oba_food_park",
  endereco: "Av. Presidente Vargas, ao lado da Panvel — Uruguaiana/RS",
  mapaBusca: "Oba Food Park, Avenida Presidente Vargas, Uruguaiana - RS",
  fuso: "America/Sao_Paulo",

  /* IMAGENS — coloque os arquivos na pasta img/ e escreva o nome aqui.
     Enquanto estiver null, o site usa as ilustrações. */
  logo: "img/logo-oba.webp",          // foto de perfil (aparece redonda)
  fotoCapa: "img/hero.webp",          // foto grande do topo do site

  /* Fotos do parque para a galeria. Some sozinha se estiver vazia. */
  galeria: [
    { src: "img/parque-2.webp", pt: "Mesas cheias debaixo das luzes", es: "Mesas llenas bajo las luces" },
    { src: "img/parque-1.webp", pt: "A fachada no fim de tarde, na Presidente Vargas", es: "La fachada al atardecer, sobre la Presidente Vargas" },
    { src: "img/parque-6.webp", pt: "O letreiro aceso à noite", es: "El cartel encendido de noche" },
    { src: "img/parque-3.webp", pt: "Os contêineres com as marcas das lojas", es: "Los contenedores con las marcas de los locales" },
    { src: "img/parque-5.webp", pt: "O balcão do Sr. Batata, com painel de senha", es: "El mostrador de Sr. Batata, con pantalla de turnos" },
    { src: "img/parque-4.webp", pt: "Setembro: os primeiros contêineres chegando", es: "Septiembre: llegan los primeros contenedores" }
  ],

  /* 0 = domingo ... 6 = sábado. null = fechado.
     "fecha": 24 significa meia-noite (00h). */
  horarios: {
    0: { abre: 18, fecha: 24 },
    1: null,
    2: { abre: 18, fecha: 24 },
    3: { abre: 18, fecha: 24 },
    4: { abre: 18, fecha: 24 },
    5: { abre: 18, fecha: 24 },
    6: { abre: 18, fecha: 24 }
  },

  categorias: [
    { id: "todos",  pt: "Tudo",            es: "Todo" },
    { id: "pizza",  pt: "Pizza",           es: "Pizza" },
    { id: "massa",  pt: "Massas",          es: "Pastas" },
    { id: "batata", pt: "Batatas",         es: "Papas" },
    { id: "acai",   pt: "Açaí & sucos",    es: "Açaí y jugos" },
    { id: "doce",   pt: "Doces & gelato",  es: "Dulces y helado" }
  ],

  lojas: [
    {
      id: "oba-pizzas",
      nome: "Oba Pizzas",
      emoji: "🍕",
      cor: "#FF5A1F",
      cats: ["pizza"],
      ig: "obapizzas_foodtruck",
      logo: "img/logo-oba-pizzas.webp",
      foto: "img/foto-oba-pizzas.webp",
      pt: { tipo: "Pizzaria", desc: "A pizzaria do food truck que trouxe o primeiro food park para Uruguaiana. Pizza quentinha saindo direto do forno." },
      es: { tipo: "Pizzería", desc: "La pizzería del food truck que trajo el primer food park a Uruguaiana. Pizza recién salida del horno." }
    },
    {
      id: "al-dente",
      nome: "Al Dente",
      emoji: "🍝",
      cor: "#E8B100",
      cats: ["massa"],
      ig: "aldente_uruguaiana",
      logo: "img/logo-al-dente.webp",
      foto: "img/foto-al-dente.webp",
      pt: { tipo: "Massas prontas na hora", desc: "Massa servida na hora, no contêiner com o letreiro MASSA. Para quem quer jantar de verdade." },
      es: { tipo: "Pastas al momento", desc: "Pasta servida al momento, en el contenedor con el cartel MASSA. Para quien quiere cenar de verdad." }
    },
    {
      id: "sr-batata",
      nome: "Sr. Batata",
      emoji: "🥔",
      cor: "#C2410C",
      cats: ["batata"],
      ig: null,
      logo: "img/logo-sr-batata.webp",
      foto: "img/foto-sr-batata.webp",
      pt: { tipo: "A batata é a estrela", desc: "Batata frita, a tradicional com cheddar e bacon e tábuas para dividir com a mesa toda." },
      es: { tipo: "La papa es la estrella", desc: "Papas fritas, la clásica con cheddar y bacon y tablas para compartir con toda la mesa." }
    },
    {
      id: "fronteira-acai",
      nome: "Fronteira Açaí",
      emoji: "🍇",
      cor: "#7C3AED",
      cats: ["acai", "doce"],
      ig: "fronteira.acai",
      logo: "img/logo-fronteira-acai.webp",
      foto: "img/foto-fronteira-acai.webp",
      pt: { tipo: "Açaí, sucos & doces", desc: "Açaí montado do seu jeito, sucos e doces. “O melhor da Fronteira”, como eles mesmos dizem." },
      es: { tipo: "Açaí, jugos y dulces", desc: "Açaí armado a tu gusto, jugos y dulces. “Lo mejor de la Frontera”, como dicen ellos." }
    },
    {
      id: "pipocs",
      nome: "Pipocs",
      emoji: "🍿",
      cor: "#EC4899",
      cats: ["doce"],
      ig: "pipocspipoca",
      logo: "img/logo-pipocs.webp",
      foto: "img/foto-pipocs.webp",
      pt: { tipo: "Gelato, pipoca & cookies", desc: "A segunda loja da Pipocs: gelato, pipoca gourmet e cookies recheados. Loja nº 2 do parque." },
      es: { tipo: "Helado, pochoclo y cookies", desc: "El segundo local de Pipocs: gelato, pochoclo gourmet y cookies rellenos. Local nº 2 del parque." }
    }
  ],

  parceiros: [
    { nome: "Elevepan", ig: "artesanais_elevepan", logo: "img/logo-elevepan.webp", pt: "pães dos hambúrgueres", es: "panes de las hamburguesas" }
  ]
};
