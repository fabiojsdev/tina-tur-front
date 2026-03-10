import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-5 justify-center">
      <div className="h-px w-12 bg-[#d4a853]" />
      <div className="w-2 h-2 bg-[#d4a853] rotate-45" />
      <div className="h-px w-12 bg-[#d4a853]" />
    </div>
  );
}

const TEAM = [
  {
    name: "Cristina Souza",
    role: "Fundadora & Diretora",
    bio: "Apaixonada por viagens desde os 18 anos, Cristina percorreu mais de 40 países antes de fundar a Tina Tur em 2010.",
    avatar: "CS",
    color: "#d4a853",
  },
  {
    name: "Rafael Moreira",
    role: "Especialista em Ecoturismo",
    bio: "Guia certificado com 12 anos de experiência em Chapada dos Veadeiros, Pantanal e Amazônia.",
    avatar: "RM",
    color: "#1a2744",
  },
  {
    name: "Juliana Lima",
    role: "Coordenadora de Pacotes",
    bio: "Especialista em destinos de praia e turismo de luxo. Apaixonada por Fernando de Noronha e Maldivas.",
    avatar: "JL",
    color: "#2d5016",
  },
  {
    name: "André Torres",
    role: "Consultor Internacional",
    bio: "Ex-guia de turismo pela América do Sul, especialista em roteiros culturais e aventura no exterior.",
    avatar: "AT",
    color: "#8b1a1a",
  },
];

const VALUES = [
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: "Paixão pela Viagem",
    desc: "Cada destino é tratado com o mesmo entusiasmo que sentimos quando planejamos nossas próprias aventuras.",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Segurança & Confiança",
    desc: "Empresa registrada no CADASTUR, seguros de viagem e parcerias com as melhores operadoras do mercado.",
  },
  {
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    title: "Responsabilidade Social",
    desc: "Promovemos o turismo sustentável, apoiando comunidades locais e preservando os destinos que tanto amamos.",
  },
];

export default function About() {
  const storyReveal = useReveal();
  const valuesReveal = useReveal();
  const teamReveal = useReveal();
  const timelineReveal = useReveal();

  return (
    <div>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-24 px-5 flex items-end overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          minHeight: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1a2e]/70 to-[#0e1a2e]/95" />
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <p className="text-[#d4a853] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Nossa História
          </p>
          <h1
            className="text-white text-4xl sm:text-6xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sobre a{" "}
            <em className="text-[#d4a853] not-italic">Tina Tur</em>
          </h1>
          <p className="text-white/60 mt-4 max-w-lg leading-relaxed">
            Uma agência construída sobre a crença de que viajar transforma vidas.
          </p>
        </div>
      </section>

      {/* ─── STORY ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-[#f9f6f0]">
        <div
          ref={storyReveal.ref}
          className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            storyReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Quem Somos
            </p>
            <h2
              className="text-[#1a2744] text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nascemos do amor
              <br />
              por <em className="text-[#d4a853] not-italic">descobrir</em> o mundo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Tina Tur nasceu em 2010 de um sonho simples: oferecer às pessoas a mesma
              emoção que sentimos na primeira vez que viajamos. Fundada por Cristina Souza,
              a agência começou com foco no turismo nacional — especialmente nas joias
              escondidas do Brasil.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ao longo dos anos, crescemos, expandimos nossos destinos para a América
              Latina e criamos laços verdadeiros com cada cliente. Mais de 5.000 viajantes
              já confiaram em nós para transformar seus sonhos em realidade.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Hoje somos uma equipe apaixonada de especialistas, cada um com profundo
              conhecimento dos destinos que recomendamos — porque viajamos para os
              mesmos lugares que indicamos a você.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-[#d4a853] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1a2744]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-[#1a2744] text-sm font-semibold">CADASTUR Ativo</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-[#d4a853] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1a2744]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[#1a2744] text-sm font-semibold">Seguro de Viagem</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80"
                alt="Viajantes felizes"
                className="w-full h-80 lg:h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1a2744] text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
              <p
                className="text-4xl font-bold text-[#d4a853]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                14+
              </p>
              <p className="text-xs text-white/70 mt-1 leading-tight">
                anos transformando viagens em memórias
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-white">
        <div
          ref={timelineReveal.ref}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            timelineReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Nossa Trajetória
            </p>
            <h2
              className="text-[#1a2744] text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Marcos que nos formaram
            </h2>
            <GoldDivider />
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            {[
              { year: "2010", title: "O Começo", desc: "Cristina abre a Tina Tur com foco em destinos de praia do litoral brasileiro." },
              { year: "2013", title: "Expansão Nacional", desc: "Passamos a oferecer roteiros por todo o Brasil, incluindo Chapada dos Veadeiros e Pantanal." },
              { year: "2016", title: "Internacional", desc: "Primeiros pacotes para América do Sul — Peru, Argentina e Chile." },
              { year: "2019", title: "5.000 viajantes", desc: "Comemoramos 5.000 clientes atendidos e lançamos o programa de fidelidade." },
              { year: "2024", title: "Presente & Futuro", desc: "Equipe de 12 especialistas, mais de 120 destinos e uma nova plataforma digital." },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-6 mb-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div
                    className={`bg-[#f9f6f0] rounded-xl p-5 hover:shadow-md transition-shadow ${
                      i % 2 === 1 ? "md:ml-8" : "md:mr-8"
                    }`}
                  >
                    <p className="text-[#d4a853] font-bold text-sm mb-1">{item.year}</p>
                    <h3
                      className="text-[#1a2744] font-bold mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-10 h-10 bg-[#1a2744] rounded-full items-center justify-center flex-shrink-0 mt-5 z-10">
                  <div className="w-3 h-3 bg-[#d4a853] rounded-full" />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-[#1a2744]">
        <div
          ref={valuesReveal.ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            valuesReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              O que nos guia
            </p>
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nossos Valores
            </h2>
            <GoldDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white/10 group-hover:bg-[#d4a853] rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-[#d4a853] group-hover:text-[#1a2744] transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={v.icon} />
                  </svg>
                </div>
                <h3
                  className="text-white font-bold text-lg mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-[#f9f6f0]">
        <div
          ref={teamReveal.ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            teamReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Quem faz acontecer
            </p>
            <h2
              className="text-[#1a2744] text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nossa Equipe
            </h2>
            <GoldDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4"
                  style={{ backgroundColor: member.color }}
                >
                  {member.avatar}
                </div>
                <h3
                  className="text-[#1a2744] font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {member.name}
                </h3>
                <p className="text-[#d4a853] text-xs font-semibold tracking-wide uppercase mb-3">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-5 bg-white text-center">
        <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
          Vamos viajar juntos?
        </p>
        <h2
          className="text-[#1a2744] text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pronto para começar sua aventura?
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
          Explore nossos pacotes ou fale diretamente com nossa equipe pelo WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pacotes"
            className="bg-[#1a2744] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d4a853] hover:text-[#1a2744] transition-colors duration-300 text-sm"
          >
            Ver Pacotes
          </Link>
          <Link
            to="/contato"
            className="border-2 border-[#1a2744] text-[#1a2744] font-bold px-8 py-4 rounded-full hover:bg-[#1a2744] hover:text-white transition-colors duration-300 text-sm"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  );
}