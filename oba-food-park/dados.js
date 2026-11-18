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
  logo: null,                         // ex.: "img/oba-logo.png" (fundo transparente)

  /* Fotos do parque para a galeria. Some sozinha se estiver vazia. */
  galeria: [
    // { src: "img/parque-noite.jpg", pt: "O parque lotado na inauguração", es: "El parque lleno en la inauguración" },
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
      logo: null,   // ex.: "img/logo-xxx.png"
      foto: null,   // ex.: "img/foto-xxx.jpg"
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
      logo: null,   // ex.: "img/logo-xxx.png"
      foto: null,   // ex.: "img/foto-xxx.jpg"
      pt: { tipo: "Massas", desc: "Massas feitas na hora, do jeito que a fome pede. Para quem quer jantar de verdade." },
      es: { tipo: "Pastas", desc: "Pastas hechas en el momento, como pide el hambre. Para quien quiere cenar de verdad." }
    },
    {
      id: "sr-batata",
      nome: "Sr. Batata",
      emoji: "🥔",
      cor: "#C2410C",
      cats: ["batata"],
      ig: null,
      logo: null,   // ex.: "img/logo-xxx.png"
      foto: null,   // ex.: "img/foto-xxx.jpg"
      pt: { tipo: "Batatas", desc: "Batatas recheadas e a tradicional batata com cheddar e bacon. Para dividir… ou não." },
      es: { tipo: "Papas", desc: "Papas rellenas y la clásica papa con cheddar y bacon. Para compartir… o no." }
    },
    {
      id: "fronteira-acai",
      nome: "Fronteira Açaí",
      emoji: "🍇",
      cor: "#7C3AED",
      cats: ["acai", "doce"],
      ig: "fronteira.acai",
      logo: null,   // ex.: "img/logo-xxx.png"
      foto: null,   // ex.: "img/foto-xxx.jpg"
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
      logo: null,   // ex.: "img/logo-xxx.png"
      foto: null,   // ex.: "img/foto-xxx.jpg"
      pt: { tipo: "Gelato, pipoca & cookies", desc: "A segunda loja da Pipocs: gelato, pipoca gourmet e cookies recheados. Loja nº 2 do parque." },
      es: { tipo: "Helado, pochoclo y cookies", desc: "El segundo local de Pipocs: gelato, pochoclo gourmet y cookies rellenos. Local nº 2 del parque." }
    }
  ],

  parceiros: [
    { nome: "Elevepan", ig: "artesanais_elevepan", pt: "pães dos hambúrgueres", es: "panes de las hamburguesas" }
  ]
};
