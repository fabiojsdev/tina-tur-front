import { Link } from "react-router-dom";
import logo from "../assets/tinatur_logo.png";

const WHATSAPP = "5511999999999";

export default function Footer() {
  return (
    <footer className="bg-[#0e1a2e] text-white">
      {/* CTA Banner */}
      <div className="bg-[#d4a853] py-10 px-5 text-center">
        <p
          className="text-[#1a2744] text-2xl md:text-3xl font-bold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Pronto para a sua próxima aventura?
        </p>
        <p className="text-[#1a2744]/80 mb-5 text-sm">
          Fale agora com nossos especialistas e monte o pacote ideal para você.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=Olá! Gostaria de saber mais sobre os pacotes de viagem.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1a2744] text-white font-bold px-7 py-3 rounded-full hover:bg-[#0e1a2e] transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>
          Falar no WhatsApp
        </a>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="mb-4">
            <img src={logo} alt="Tina Tur" className="w-40 h-auto object-contain" />
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Transformando sonhos em destinos desde 2010. Especialistas em viagens nacionais e internacionais com atendimento personalizado.
          </p>

          <div className="flex gap-3">
            {["instagram", "facebook", "youtube"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a853] hover:text-[#1a2744] text-white/60 transition-colors duration-300"
              >
                <span className="sr-only">{s}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {s === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />}
                  {s === "facebook" && <path d="M24 12.073c0-6.627-5.373-12..." />}
                  {s === "youtube" && <path d="M23.498 6.186a3.016 3.016..." />}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="text-[#d4a853] text-sm font-bold tracking-widest uppercase mb-5">
            Navegação
          </h4>
          <ul className="space-y-3">
            {[
              { label: "Início", path: "/" },
              { label: "Sobre Nós", path: "/sobre" },
              { label: "Pacotes de Viagem", path: "/pacotes" },
              { label: "Contato", path: "/contato" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-white/50 text-sm hover:text-[#d4a853]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pacotes */}
        <div>
          <h4 className="text-[#d4a853] text-sm font-bold tracking-widest uppercase mb-5">
            Pacotes Populares
          </h4>
          <ul className="space-y-3">
            {[
              "Fernando de Noronha",
              "Lençóis Maranhenses",
              "Chapada dos Veadeiros",
              "Bonito & Pantanal",
              "Jericoacoara",
              "Machu Picchu",
            ].map((d) => (
              <li key={d}>
                <Link to="/pacotes" className="text-white/50 text-sm hover:text-[#d4a853]">
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-[#d4a853] text-sm font-bold tracking-widest uppercase mb-5">
            Contato
          </h4>
          <p className="text-white/50 text-sm">(11) 99999-9999</p>
          <p className="text-white/50 text-sm">contato@tinatur.com.br</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5 px-5 text-center text-white/30 text-xs">
        © {new Date().getFullYear()} Tina Tur. Todos os direitos reservados.
      </div>
    </footer>
  );
}