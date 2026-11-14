/* ==========================================================================
   CONFIGURAÇÃO DO SITE — edite só este arquivo para mudar textos, fotos,
   WhatsApp e endereço. Campo vazio ("") ou lista vazia ([]) = o site esconde.
   ========================================================================== */
window.CONFIG = {
  nome: "Chácara Paraíso",
  frase: "Chácara para eventos, festas e fins de semana em Itabira - MG, em meio à mata nativa.",
  status: "",   // etiqueta no topo do site (ex.: "Datas abertas para 2027"); vazio = não aparece

  // WhatsApp: só números, com 55 + DDD. Ex.: "5531999999999"
  whatsapp: "5531997014005",
  mensagemPadrao: "Olá! Vi o site da Chácara Paraíso e gostaria de consultar disponibilidade e valores.",

  instagram: "",   // ex.: "https://instagram.com/seuperfil"

  local: {
    endereco: "MG-120, 764",
    cidade: "Itabira - MG",
    destino: "Chácara Paraíso, MG120, 764 - Itabira, MG", // usado no Maps e no Waze
    referencia: "Entrada direto pela MG-120, com portão coberto e estacionamento logo na chegada.",
    mapsUrl: "https://share.google/8WbPDBAEWuDQnthDa"
  },

  // Topo do site: vídeo no celular, foto no computador
  hero: {
    imagem: "fotos/piscina.jpg",
    videoCelular: "",   // ex.: "fotos/drone.mp4" para usar vídeo no topo do celular
    posterCelular: "fotos/drone.jpg"
  },

  numeros: [
    { valor: "300", unidade: "m²", rotulo: "Salão de eventos" },
    { valor: "180", unidade: "m²", rotulo: "Espaço gourmet" },
    { valor: "7",   unidade: "",   rotulo: "Suítes independentes" },
    { valor: "100", unidade: "",   rotulo: "Vagas de estacionamento" }
  ],

  /* Ambientes. Para colocar fotos: fotos: ["fotos/salao-1.jpg", "fotos/salao-2.jpg"]
     Sem foto, o card aparece com o selo "Fotos em breve". */
  ambientes: [
    { id: "salao", nome: "Salão de eventos", medida: "≈ 300 m²",
      texto: "Amplo e coberto, com estrutura em madeira, piso claro e banheiros próprios. Pronto para casamentos, aniversários, formaturas e confraternizações.",
      fotos: ["fotos/salao-1.jpg"] },
    { id: "gourmet", nome: "Espaço gourmet", medida: "≈ 180 m²",
      texto: "Churrasqueira, fogão a lenha, forno de pizza, bar e uma mesa rústica enorme, de frente para o jardim e a piscina.",
      fotos: ["fotos/gourmet-1.jpg", "fotos/gourmet-2.jpg", "fotos/gourmet-3.jpg", "fotos/gourmet-4.jpg",
              "fotos/gourmet-5.jpg", "fotos/gourmet-6.jpg", "fotos/gourmet-7.jpg", "fotos/gourmet-8.jpg"] },
    { id: "suites", nome: "Suítes", medida: "7 independentes",
      texto: "Privacidade para cada família ou grupo ficar o fim de semana inteiro, sem pegar estrada de madrugada.",
      fotos: [] },
    { id: "piscina", nome: "Piscina", medida: "Área de lazer",
      texto: "Deck de pedra, palmeiras e sol o dia inteiro, cercada pela natureza do sítio.",
      fotos: ["fotos/piscina.jpg"] },
    { id: "campo", nome: "Campo de futebol", medida: "Com quiosque",
      texto: "A pelada dos amigos com quiosque, banheiro e fogão a lenha ao lado para o pós-jogo.",
      fotos: ["fotos/drone.jpg"] },
    { id: "fogueira", nome: "Espaço de fogueira", medida: "Para as noites",
      texto: "Roda de conversa, violão e o fogo aceso na beira da mata.",
      fotos: ["fotos/fogueira.jpg"] },
    { id: "sauna", nome: "Sauna", medida: "Relaxamento",
      texto: "Para desacelerar no fim do dia, pertinho da piscina.",
      fotos: [] },
    { id: "banheiros", nome: "Banheiros do evento", medida: "Masc. e fem.",
      texto: "Recém-acabados, com bancadas em granito: 2 vasos e 3 mictórios no masculino, 4 vasos no feminino.",
      fotos: ["fotos/banh_masc.jpg", "fotos/banh_fem.jpg"] },
    { id: "estacionamento", nome: "Estacionamento", medida: "≈ 100 vagas",
      texto: "Privativo, dentro da propriedade, com piso drenante logo na entrada.",
      fotos: ["fotos/entrada.jpg"] },
    { id: "mata", nome: "Mata nativa", medida: "Natureza preservada",
      texto: "Sombra, silêncio, ar puro e vista para as montanhas de Minas.",
      fotos: ["fotos/vista.jpg"] }
  ],

  eventos: [
    { icone: "anel",    nome: "Casamentos",       texto: "Cerimônia, festa e hospedagem para a família no mesmo lugar." },
    { icone: "bolo",    nome: "Aniversários",     texto: "Do infantil aos 15 anos, com espaço para todas as idades." },
    { icone: "empresa", nome: "Empresas",         texto: "Confraternizações, fim de ano e integração de equipes." },
    { icone: "familia", nome: "Família",          texto: "O almoço de domingo com todo mundo, sem pressa de ir embora." },
    { icone: "amigos",  nome: "Fim de semana",    texto: "Piscina de dia, fogueira à noite e suíte para dormir." },
    { icone: "estrela", nome: "Eventos especiais", texto: "Formaturas, retiros, ensaios. Conte sua ideia." }
  ],

  // Galeria: fotos e vídeos (na ordem em que aparecem)
  galeria: [
    { src: "fotos/piscina.jpg",   legenda: "Piscina e construções do sítio" },
    { src: "fotos/tour-sitio.mp4", legenda: "Tour pelo sítio ao entardecer", poster: "fotos/tour-capa.jpg", video: true },
    { src: "fotos/gourmet-2.jpg", legenda: "Espaço gourmet com vista para o jardim e a piscina" },
    { src: "fotos/salao-1.jpg",   legenda: "Salão de eventos" },
    { src: "fotos/gourmet-1.jpg", legenda: "Espaço gourmet: churrasqueira, fogão a lenha e forno de pizza" },
    { src: "fotos/vista.jpg",     legenda: "Vista das montanhas a partir do gramado" },
    { src: "fotos/gourmet-7.jpg", legenda: "Espaço gourmet ao entardecer" },
    { src: "fotos/fogueira.jpg",  legenda: "Noite em volta da fogueira" },
    { src: "fotos/gourmet-4.jpg", legenda: "Mesa rústica, bar e o salão ao fundo" },
    { src: "fotos/drone.mp4",     legenda: "Vista aérea da entrada e do estacionamento", poster: "fotos/drone-capa.jpg", video: true },
    { src: "fotos/drone.jpg",     legenda: "Campo de futebol visto de cima" },
    { src: "fotos/entrada.jpg",   legenda: "Entrada e estacionamento" },
    { src: "fotos/banh_masc.jpg", legenda: "Banheiro masculino da área de eventos" },
    { src: "fotos/banh_fem.jpg",  legenda: "Banheiro feminino da área de eventos" }
  ],

  perguntas: [
    { p: "Quando a chácara abre para locação?",
      r: "Estamos na fase final da obra. Chame no WhatsApp para saber a previsão e consultar datas." },
    { p: "Quanto custa alugar?",
      r: "O valor depende do tipo de evento, do número de pessoas, da data e se haverá hospedagem. Mande os detalhes pelo formulário abaixo e respondemos com o orçamento." },
    { p: "Dá para dormir no local?",
      r: "Sim. São 7 suítes independentes, ideais para quem quer aproveitar o fim de semana inteiro." },
    { p: "Posso visitar antes de fechar?",
      r: "Fale com a gente pelo WhatsApp para combinar uma visita." },
    { p: "Onde fica?",
      r: "Na MG-120, nº 764, em Itabira - MG, com entrada direto pela rodovia e estacionamento para cerca de 100 carros." }
  ]
};
