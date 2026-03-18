/* eslint-disable react-hooks/refs */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { getDestaques, type PacoteAPI } from "../services/api";

const WHATSAPP = "5511999999999";

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2744] leading-tight"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {children}
    </h2>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-5 justify-center">
      <div className="h-px w-12 bg-[#d4a853]" />
      <div className="w-2 h-2 bg-[#d4a853] rotate-45" />
      <div className="h-px w-12 bg-[#d4a853]" />
    </div>
  );
}

function StatCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useReveal();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = end / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Card de destaque — agora usa dados da API ────────────────────────────────
function FeaturedPackageCard({ pkg }: { pkg: PacoteAPI }) {
  const [imgError, setImgError] = useState(false);

  const titulo      = (pkg.titulo      as string) ?? "";
  const destino     = (pkg.destino     as string) ?? "";
  const preco       = (pkg.preco       as string) ?? "";
  const duracao     = (pkg.duracao     as string) ?? "";
  const descricao   = (pkg.descricao   as string) ?? "";
  const imagemUrl   = (pkg.imagemUrl   as string) ?? "";
  const categoria   = (pkg.categoria   as string) ?? "";

  const waText = encodeURIComponent(
    `Olá! Tenho interesse no pacote *${titulo}* (${destino}). Pode me dar mais informações?`
  );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden h-56">
        {!imgError && imagemUrl ? (
          <img
            src={imagemUrl}
            alt={titulo}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {categoria && (
          <span className="absolute top-4 left-4 bg-[#d4a853] text-[#1a2744] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
            {categoria.charAt(0) + categoria.slice(1).toLowerCase()}
          </span>
        )}

        {destino && (
          <p className="absolute bottom-4 left-4 right-4 text-white/80 text-xs flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {destino}
          </p>
        )}
      </div>

      <div className="p-5">
        <h3
          className="text-xl font-bold text-[#1a2744] mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {titulo}
        </h3>

        {descricao && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {descricao}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">A partir de</p>
            <p className="text-2xl font-bold text-[#1a2744]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {preco}
            </p>
          </div>
          {duracao && (
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              {duracao}
            </div>
          )}
        </div>

        <a
          href={`https://wa.me/${WHATSAPP}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#1a2744] text-white text-sm font-bold py-3 rounded-xl hover:bg-[#d4a853] hover:text-[#1a2744] transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Tenho Interesse
        </a>
      </div>
    </div>
  );
}

// ─── Skeleton de loading ──────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-10 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const statsReveal       = useReveal();
  const packagesReveal    = useReveal();
  const whyReveal         = useReveal();
  const testimonialReveal = useReveal();

  // ✅ Busca destaques da API (não mais arquivo estático)
  const [featuredPackages, setFeaturedPackages] = useState<PacoteAPI[]>([]);
  const [loadingFeatured, setLoadingFeatured]   = useState(true);

  useEffect(() => {
    getDestaques()
      .then((data) => setFeaturedPackages(data.slice(0, 4)))
      .catch(() => setFeaturedPackages([]))
      .finally(() => setLoadingFeatured(false));
  }, []);

  const WHY_US = [
    {
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      title: "Experiência & Credibilidade",
      desc: "Mais de 14 anos no mercado e cadastro ativo no CADASTUR, garantindo sua segurança em cada viagem.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      title: "Atendimento Personalizado",
      desc: "Cada viagem é única. Criamos roteiros sob medida de acordo com o seu perfil, orçamento e sonhos.",
    },
    {
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      title: "Melhor Custo-Benefício",
      desc: "Parcerias com as melhores operadoras e hotéis do Brasil garantem preços imbatíveis sem abrir mão da qualidade.",
    },
    {
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
      title: "Suporte 24/7",
      desc: "Antes, durante e após a viagem, nossa equipe está disponível para resolver qualquer imprevisto com agilidade.",
    },
  ];

  const TESTIMONIALS = [
    {
      name: "Mariana Santos", city: "São Paulo, SP",
      text: "A Tina Tur transformou nossa lua de mel em Fernando de Noronha numa experiência inesquecível. Cada detalhe foi cuidado com perfeição!",
      rating: 5, avatar: "MS",
    },
    {
      name: "Carlos Mendes", city: "Belo Horizonte, MG",
      text: "Já fiz 3 viagens com a Tina Tur e todas superaram as expectativas. O atendimento pelo WhatsApp é muito ágil e eficiente.",
      rating: 5, avatar: "CM",
    },
    {
      name: "Fernanda Costa", city: "Curitiba, PR",
      text: "A Chapada dos Veadeiros foi um sonho! O roteiro que montaram para a família foi impecável, com atividades para adultos e crianças.",
      rating: 5, avatar: "FC",
    },
  ];

  return (
    <div>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1a2e]/80 via-[#1a2744]/60 to-[#0e1a2e]/90" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, #d4a853 80px, #d4a853 81px)" }} />

        <div className="relative z-10 text-center px-5 max-w-5xl mx-auto">
          <p className="text-[#d4a853] text-xs font-bold tracking-[0.5em] uppercase mb-6 animate-pulse">
            ✦ Agência de Viagens ✦
          </p>
          <h1
            className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Transformando
            <br />
            <em className="text-[#d4a853] not-italic">Sonhos</em> em
            <br />
            Destinos
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Há mais de 14 anos criando experiências únicas pelo Brasil e pelo mundo.
            Cada viagem, uma história que vai durar para sempre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pacotes"
              className="bg-[#d4a853] text-[#1a2744] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 text-sm tracking-wide"
            >
              Ver Pacotes de Viagem
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=Olá!%20Gostaria%20de%20montar%20um%20roteiro%20personalizado.`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:border-[#d4a853] hover:text-[#d4a853] transition-colors duration-300 text-sm tracking-wide"
            >
              Roteiro Personalizado
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <p className="text-xs tracking-[0.3em] uppercase">Explore</p>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#1a2744] py-16 px-5">
        <div
          ref={statsReveal.ref}
          className={`max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${
            statsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: 14,   suffix: "+", label: "Anos de Experiência" },
            { value: 5000, suffix: "+", label: "Viajantes Felizes" },
            { value: 120,  suffix: "+", label: "Destinos Atendidos" },
            { value: 98,   suffix: "%", label: "Clientes Satisfeitos" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-[#d4a853] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                <StatCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/50 text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PACKAGES — agora vêm da API ──────────────────────────── */}
      <section className="py-20 px-5 bg-[#f9f6f0]">
        <div
          ref={packagesReveal.ref}
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            packagesReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <SectionLabel>Destaques</SectionLabel>
            <SectionTitle>
              Pacotes em <em className="text-[#d4a853] not-italic">Evidência</em>
            </SectionTitle>
            <GoldDivider />
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Selecionamos os destinos mais procurados e comentados pelos nossos viajantes.
              Conforto, segurança e experiências únicas garantidas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {loadingFeatured
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
              : featuredPackages.length > 0
                ? featuredPackages.map((pkg) => (
                    <FeaturedPackageCard key={pkg.id as number} pkg={pkg} />
                  ))
                : (
                  <div className="col-span-4 text-center py-12 text-gray-400 text-sm">
                    Nenhum pacote em destaque cadastrado ainda.
                  </div>
                )
            }
          </div>

          <div className="text-center">
            <Link
              to="/pacotes"
              className="inline-flex items-center gap-2 border-2 border-[#1a2744] text-[#1a2744] font-bold px-8 py-3.5 rounded-full hover:bg-[#1a2744] hover:text-white transition-all duration-300 text-sm tracking-wide"
            >
              Ver Todos os Pacotes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-white">
        <div
          ref={whyReveal.ref}
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            whyReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <SectionLabel>Por que nos escolher</SectionLabel>
            <SectionTitle>
              Viaje com <em className="text-[#d4a853] not-italic">Confiança</em>
            </SectionTitle>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_US.map((item, i) => (
              <div key={i}
                className="group text-center p-6 rounded-2xl border border-gray-100 hover:border-[#d4a853] hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 bg-[#f9f6f0] group-hover:bg-[#1a2744] rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-[#1a2744] font-bold mb-2 text-base"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE BANNER ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-5 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#1a2744]/85" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <SectionLabel>Nossa Promessa</SectionLabel>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Uma viagem começa quando você
            <em className="text-[#d4a853] not-italic"> sonha com ela</em>
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Nossa missão é transformar cada detalhe em memórias que durarão a vida inteira.
            Do primeiro contato à volta para casa, você viaja com a tranquilidade de ter
            os melhores especialistas ao seu lado.
          </p>
          <Link
            to="/sobre"
            className="inline-block bg-[#d4a853] text-[#1a2744] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 text-sm tracking-wide"
          >
            Conheça Nossa História
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-[#f9f6f0]">
        <div
          ref={testimonialReveal.ref}
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            testimonialReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <SectionLabel>Depoimentos</SectionLabel>
            <SectionTitle>
              O que nossos <em className="text-[#d4a853] not-italic">viajantes</em> dizem
            </SectionTitle>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-[#d4a853] text-5xl leading-none mb-3 font-serif">"</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a2744] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[#1a2744] font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}