export interface Package {
  id: string;
  title: string;
  destination: string;
  price: string;
  duration: string;
  description: string;
  category: "praia" | "natureza" | "aventura" | "cultural" | "internacional";
  imageUrl: string;
  featured: boolean;
}

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: "1",
    title: "Praia do Sono",
    destination: "Paraty, Rio de Janeiro",
    price: "R$ 890",
    duration: "3 dias / 2 noites",
    description:
      "Uma das praias mais paradisíacas do litoral fluminense, acessível apenas de barco ou trilha. Mar cristalino, Mata Atlântica preservada e pousadas charmosas à beira-mar.",
    category: "praia",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    title: "Fernando de Noronha",
    destination: "Pernambuco, Brasil",
    price: "R$ 3.200",
    duration: "5 dias / 4 noites",
    description:
      "Arquipélago vulcânico com as águas mais transparentes do Brasil. Mergulho, snorkeling e avistamento de golfinhos em um dos destinos mais exclusivos do mundo.",
    category: "praia",
    imageUrl:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    title: "Chapada dos Veadeiros",
    destination: "Alto Paraíso, Goiás",
    price: "R$ 1.450",
    duration: "4 dias / 3 noites",
    description:
      "Patrimônio Mundial da UNESCO com cachoeiras imponentes, trilhas no cerrado e energia mística. Um refúgio para quem busca conexão com a natureza do Brasil Central.",
    category: "natureza",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    featured: true,
  },
  {
    id: "4",
    title: "Bonito & Pantanal",
    destination: "Mato Grosso do Sul",
    price: "R$ 2.100",
    duration: "5 dias / 4 noites",
    description:
      "Flutuação em rios de água cristalina, mergulho com peixes coloridos e safáris fotográficos no maior pantanal do mundo. Ecoturismo de classe mundial.",
    category: "natureza",
    imageUrl:
      "https://images.unsplash.com/photo-1500468756762-a401b6f17b46?w=800&q=80",
    featured: false,
  },
  {
    id: "5",
    title: "Lençóis Maranhenses",
    destination: "Barreirinhas, Maranhão",
    price: "R$ 2.400",
    duration: "5 dias / 4 noites",
    description:
      "Dunas brancas intermináveis pontuadas por lagoas de água doce azul-turquesa. Um dos cenários mais surreais e exclusivos do planeta — único no mundo.",
    category: "aventura",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    featured: false,
  },
  {
    id: "6",
    title: "Gramado & Canela",
    destination: "Serra Gaúcha, Rio Grande do Sul",
    price: "R$ 1.800",
    duration: "4 dias / 3 noites",
    description:
      "Arquitetura de tijolos europeia, chocolates artesanais premiados, fondue, parques de diversão e natureza serrana. Perfeito para casais e famílias.",
    category: "cultural",
    imageUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    featured: false,
  },
  {
    id: "7",
    title: "Jericoacoara",
    destination: "Ceará, Brasil",
    price: "R$ 1.950",
    duration: "5 dias / 4 noites",
    description:
      "Village de areia com dunas rosadas ao pôr do sol, lagoas de kitesurf e noites estreladas. Considerada uma das praias mais bonitas do mundo pela Condé Nast.",
    category: "praia",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    featured: false,
  },
  {
    id: "8",
    title: "Machu Picchu & Cusco",
    destination: "Peru",
    price: "R$ 5.800",
    duration: "7 dias / 6 noites",
    description:
      "A cidade perdida dos Incas nas alturas dos Andes. Inclui visita a Cusco, Vale Sagrado, caminho inca e a inesquecível cidadela de Machu Picchu ao amanhecer.",
    category: "internacional",
    imageUrl:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
    featured: true,
  },
];