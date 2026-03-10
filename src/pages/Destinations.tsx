import { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

const WHATSAPP = "5511999999999";

type Region = "todos" | "nordeste" | "sudeste" | "sul" | "centroeste" | "norte" | "internacional";

interface Destination {
  id: string;
  name: string;
  state: string;
  region: Region;
  description: string;
  highlights: string[];
  bestTime: string;
  image: string;
  tag: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Fernando de Noronha",
    state: "Pernambuco",
    region: "nordeste",
    description: "Arquipélago vulcânico com praias paradisíacas e rica biodiversidade marinha. Um dos destinos mais exclusivos e bem preservados do mundo.",
    highlights: ["Mergulho", "Snorkeling", "Golfinhos", "Praias Selvagens"],
    bestTime: "Set – Mar",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=700&q=80",
    tag: "Mais Vendido",
  },
  {
    id: "2",
    name: "Jericoacoara",
    state: "Ceará",
    region: "nordeste",
    description: "Village de areia branquinha com lagoas esmeralda, dunas rosadas ao pôr do sol e ventos perfeitos para kite e windsurf.",
    highlights: ["Kitesurf", "Lagoas", "Pôr do Sol", "Dunas"],
    bestTime: "Jul – Jan",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80",
    tag: "Romântico",
  },
  {
    id: "3",
    name: "Lençóis Maranhenses",
    state: "Maranhão",
    region: "nordeste",
    description: "Dunas brancas e lagoas de água doce azul-turquesa formam uma paisagem surrealista única no mundo, especialmente de fevereiro a setembro.",
    highlights: ["Lagoas", "Dunas", "Travessia", "Fotografia"],
    bestTime: "Fev – Set",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&q=80",
    tag: "Imperdível",
  },
  {
    id: "4",
    name: "Praia do Sono",
    state: "Rio de Janeiro",
    region: "sudeste",
    description: "Praia acessível apenas de barco ou trilha, com mar cristalino, natureza preservada e ambiente intimista. Um dos últimos paraísos escondidos do RJ.",
    highlights: ["Praia", "Trilha", "Snorkeling", "Natureza"],
    bestTime: "Nov – Mar",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
    tag: "Escondido",
  },
  {
    id: "5",
    name: "Ilha Grande",
    state: "Rio de Janeiro",
    region: "sudeste",
    description: "Ilha sem carros com mais de 100 praias, trilhas na Mata Atlântica, e o charme de uma vila histórica que foi prisão federal.",
    highlights: ["Praias", "Trilhas", "Mergulho", "História"],
    bestTime: "Nov – Abr",
    image: "https://images.unsplash.com/photo-1416169607149-2dfa72e1b5c5?w=700&q=80",
    tag: "Aventura",
  },
  {
    id: "6",
    name: "Gramado & Canela",
    state: "Rio Grande do Sul",
    region: "sul",
    description: "A cidade mais europeia do Brasil: arquitetura de tijolos, chocolate artesanal, fondue, natureza serrana e o famoso Festival de Cinema.",
    highlights: ["Gastronomia", "Arquitetura", "Natureza", "Cultura"],
    bestTime: "Jul – Ago",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80",
    tag: "Família",
  },
  {
    id: "7",
    name: "Chapada dos Veadeiros",
    state: "Goiás",
    region: "centroeste",
    description: "Patrimônio Mundial da UNESCO: cachoeiras imponentes, cerrado preservado, cristais de quartzo e uma energia mística que atrai visitantes do mundo todo.",
    highlights: ["Cachoeiras", "Trilhas", "Cristais", "Espiritual"],
    bestTime: "Abr – Out",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
    tag: "UNESCO",
  },
  {
    id: "8",
    name: "Bonito & Pantanal",
    state: "Mato Grosso do Sul",
    region: "centroeste",
    description: "Flutuação em rios de água cristalina e safáris fotográficos no maior pantanal do mundo, com onças-pintadas, araras e jacarés.",
    highlights: ["Flutuação", "Safári", "Fauna", "Ecologia"],
    bestTime: "Abr – Nov",
    image: "https://images.unsplash.com/photo-1500468756762-a401b6f17b46?w=700&q=80",
    tag: "Ecoturismo",
  },
  {
    id: "9",
    name: "Amazônia",
    state: "Amazonas",
    region: "norte",
    description: "A maior floresta tropical do planeta. Encontro das águas, piratas, boto-cor-de-rosa, aldeia indígena e lodge suspenso sobre o rio Negro.",
    highlights: ["Floresta", "Rios", "Fauna", "Cultura Indígena"],
    bestTime: "Jun – Nov",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
    tag: "Único",
  },
  {
    id: "10",
    name: "Machu Picchu & Cusco",
    state: "Peru",
    region: "internacional",
    description: "A cidade perdida dos Incas nas alturas dos Andes é uma das 7 Maravilhas do Mundo. Um destino que transforma quem o visita.",
    highlights: ["Ruínas Incas", "Caminho Inca", "Cusco", "Andes"],
    bestTime: "Abr – Out",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=700&q=80",
    tag: "7 Maravilhas",
  },
  {
    id: "11",
    name: "Buenos Aires",
    state: "Argentina",
    region: "internacional",
    description: "A Paris da América do Sul: tango nas ruas, bife ancho, bairros boêmios, arquitetura européia e vida noturna agitada.",
    highlights: ["Tango", "Gastronomia", "Cultura", "Arquitetura"],
    bestTime: "Mar – Mai · Set – Nov",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=700&q=80",
    tag: "Cultural",
  },
  {
    id: "12",
    name: "Salar de Uyuni",
    state: "Bolívia",
    region: "internacional",
    description: "O maior espelho natural do mundo: durante a cheia, reflete o céu de forma tão perfeita que parece que você está andando sobre as nuvens.",
    highlights: ["Salar", "Fotografia", "Astroturismo", "Lagoas Coloridas"],
    bestTime: "Nov – Mar",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700&q=80",
    tag: "Fotogênico",
  },
];

const REGION_LABELS: Record<Region, string> = {
  todos: "Todos",
  nordeste: "Nordeste",
  sudeste: "Sudeste",
  sul: "Sul",
  centroeste: "Centro-Oeste",
  norte: "Norte",
  internacional: "Internacional",
};

const REGION_ICONS: Record<Region, string> = {
  todos: "🌎",
  nordeste: "🏖️",
  sudeste: "🌆",
  sul: "🏔️",
  centroeste: "🌿",
  norte: "🌳",
  internacional: "✈️",
};

function DestinationCard({ dest }: { dest: Destination }) {
  const waText = encodeURIComponent(
    `Olá! Tenho interesse em visitar *${dest.name}* (${dest.state}). Pode me informar sobre pacotes disponíveis?`
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 bg-[#d4a853] text-[#1a2744] text-xs font-bold px-3 py-1.5 rounded-full">
          {dest.tag}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-1.5">
            {dest.highlights.map((h) => (
              <span key={h} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3
              className="text-[#1a2744] text-xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {dest.name}
            </h3>
            <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {dest.state}
            </p>
          </div>
          <div className="text-right text-xs text-gray-400">
            <p className="text-[#d4a853] font-semibold">Melhor época</p>
            <p>{dest.bestTime}</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
          {dest.description}
        </p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 border-2 border-[#1a2744] text-[#1a2744] text-sm font-bold py-3 rounded-xl hover:bg-[#1a2744] hover:text-white transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Consultar Pacotes
        </a>
      </div>
    </div>
  );
}

export default function Destinations() {
  const [activeRegion, setActiveRegion] = useState<Region>("todos");
  const gridReveal = useReveal();

  const filtered = DESTINATIONS.filter(
    (d) => activeRegion === "todos" || d.region === activeRegion
  );

  const regions = Object.keys(REGION_LABELS) as Region[];

  return (
    <div>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 px-5 flex items-end overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "55vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1a2e]/70 to-[#0e1a2e]/95" />
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <p className="text-[#d4a853] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Brasil e América do Sul
          </p>
          <h1
            className="text-white text-4xl sm:text-6xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nossos{" "}
            <em className="text-[#d4a853] not-italic">Destinos</em>
          </h1>
          <p className="text-white/60 mt-4 max-w-lg leading-relaxed">
            Mais de 120 destinos no Brasil e América do Sul. Praia, natureza,
            aventura, cultura — temos o roteiro certo para cada sonho.
          </p>
        </div>
      </section>

      {/* ─── REGION FILTER ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 px-5 py-5 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeRegion === region
                    ? "bg-[#1a2744] text-white"
                    : "bg-[#f9f6f0] text-gray-600 hover:bg-[#1a2744]/10 hover:text-[#1a2744]"
                }`}
              >
                <span>{REGION_ICONS[region]}</span>
                {REGION_LABELS[region]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DESTINATIONS GRID ─────────────────────────────────────────────── */}
      <section className="py-14 px-5 bg-[#f9f6f0]">
        <div
          ref={gridReveal.ref}
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            gridReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gray-400 text-sm mb-6">
            {filtered.length} destino{filtered.length !== 1 ? "s" : ""} disponível{filtered.length !== 1 ? "is" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} dest={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSPIRATION BANNER ────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-5 text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#0e1a2e]/80" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[#d4a853] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Destino dos Sonhos
          </p>
          <h2
            className="text-white text-3xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Não encontrou seu destino ideal?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Nossa equipe conhece destinos em todo o Brasil e América do Sul.
            Fale conosco e vamos criar o roteiro perfeito só para você.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-[#d4a853] text-[#1a2744] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 text-sm tracking-wide"
          >
            Solicitar Destino Personalizado
          </Link>
        </div>
      </section>
    </div>
  );
}