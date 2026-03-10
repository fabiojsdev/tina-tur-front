import { useState, useEffect } from "react";
import { getAllPacotes, type PacoteAPI } from "../services/api";

const WHATSAPP = "5511999999999";

type Category = "todos" | "praia" | "natureza" | "aventura" | "cultural" | "internacional";

// Adapta o PacoteAPI do backend para o formato que os componentes usam
type Package = PacoteAPI & {
  title: string;
  destination: string;
  price: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
};

function adaptPackage(p: PacoteAPI): Package {
  return {
    ...p,
    title: p.titulo,
    destination: p.destino,
    price: p.preco,
    category: (p.categoria ?? "PRAIA").toLowerCase(),
    imageUrl: p.imagemUrl ?? "",
    featured: p.destaque,
  };
}

const CATEGORY_LABELS: Record<Category, string> = {
  todos: "Todos",
  praia: "Praia",
  natureza: "Natureza",
  aventura: "Aventura",
  cultural: "Cultural",
  internacional: "Internacional",
};

function PackageCard({ pkg }: { pkg: Package }) {
  const [imgError, setImgError] = useState(false);
  const waText = encodeURIComponent(
    `Olá! Tenho interesse no pacote *${pkg.title}* (${pkg.destination}) por ${pkg.price}. Pode me dar mais informações?`
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 group flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {!imgError ? (
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a2744] to-[#2d4a7a] flex items-center justify-center">
            <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#d4a853] text-[#1a2744] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
            {CATEGORY_LABELS[pkg.category as Category] ?? pkg.category}
          </span>
          {pkg.featured && (
            <span className="bg-[#1a2744] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              ★ Destaque
            </span>
          )}
        </div>

        {/* Location */}
        <p className="absolute bottom-3 left-3 text-white/80 text-xs flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {pkg.destination}
        </p>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-[#1a2744] text-xl font-bold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {pkg.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {String(pkg.description) || ""}
        </p>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
          </svg>
          {String(pkg.duration) || ""}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">A partir de</p>
            <p
              className="text-2xl font-bold text-[#1a2744]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {pkg.price}
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1a2744] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#25D366] transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero Este
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TravelPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllPacotes()
      .then((data) => setPackages(data.map(adaptPackage)))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = packages.filter((pkg) => {
    const matchesCategory =
      activeCategory === "todos" || pkg.category === activeCategory;
    const matchesSearch =
      searchTerm.trim() === "" ||
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  return (
    <div>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 px-5 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "55vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1a2e]/75 to-[#0e1a2e]/95" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[#d4a853] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Explore o Brasil e o Mundo
          </p>
          <h1
            className="text-white text-4xl sm:text-6xl font-bold leading-tight mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Pacotes de{" "}
            <em className="text-[#d4a853] not-italic">Viagem</em>
          </h1>
          <p className="text-white/60 max-w-lg leading-relaxed mb-8">
            Encontre o pacote perfeito para você. Todas as nossas viagens incluem
            assistência completa e o melhor custo-benefício do mercado.
          </p>

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 max-w-lg">
            <svg
              className="w-5 h-5 text-white/50 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar destino ou pacote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-white/40 outline-none flex-1 text-sm"
            />
          </div>
        </div>
      </section>

      {/* ─── FILTERS ───────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 px-5 py-5 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#1a2744] text-white"
                    : "bg-[#f9f6f0] text-gray-600 hover:bg-[#1a2744]/10 hover:text-[#1a2744]"
                }`}
              >
                {CATEGORY_LABELS[cat]}
                {cat === "todos" && (
                  <span className="ml-1.5 text-xs opacity-60">({packages.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES GRID ─────────────────────────────────────────────────── */}
      <section className="py-14 px-5 bg-[#f9f6f0]">
        <div className="max-w-7xl mx-auto">
          {/* Loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                    <div className="h-10 bg-gray-200 rounded-xl mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p
                className="text-[#1a2744] text-xl font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Nenhum pacote encontrado
              </p>
              <p className="text-gray-500 text-sm">
                Tente outro filtro ou entre em contato para um roteiro personalizado.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-6">
                {filtered.length} pacote{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── CTA WHATSAPP ──────────────────────────────────────────────────── */}
      <section className="bg-[#1a2744] py-16 px-5 text-center">
        <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
          Não encontrou o que procura?
        </p>
        <h2
          className="text-white text-3xl font-bold mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Montamos o roteiro ideal para você
        </h2>
        <p className="text-white/50 mb-7 text-sm max-w-md mx-auto">
          Fale com nossa equipe agora pelo WhatsApp e receba uma proposta personalizada
          conforme o seu orçamento e preferências.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=Olá!%20Não%20encontrei%20o%20pacote%20ideal.%20Pode%20me%20ajudar%20a%20montar%20um%20roteiro%20personalizado?`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-full hover:bg-[#1ebe59] transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Solicitar Roteiro Personalizado
        </a>
      </section>
    </div>
  );
}