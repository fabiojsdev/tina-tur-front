import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrolled } from "../hooks/useReveal";
import logo from "../assets/tinatur_logo.png"

// ✅ Destinos removido
const NAV_LINKS = [
  { label: "Início",   path: "/" },
  { label: "Sobre",    path: "/sobre" },
  { label: "Pacotes",  path: "/pacotes" },
  { label: "Contato",  path: "/contato" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const scrolled = useScrolled(60);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#1a2744] shadow-xl py-3" : "bg-[#1a2744]/90 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}

<img src={logo} alt="Logo" className="w-15 h-auto object-contain" />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-all duration-200 relative group ${
                isActive(link.path) ? "text-[#d4a853]" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4a853] transition-all duration-300 ${
                isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-[#d4a853] text-[#1a2744] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-300 tracking-wide"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#111e35] border-t border-white/10 px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`py-3 px-4 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 ${
                isActive(link.path)
                  ? "text-[#d4a853] bg-white/5"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-3 bg-[#d4a853] text-[#1a2744] text-sm font-bold px-5 py-3 rounded-full hover:bg-white transition-colors text-center"
          >
            Fale pelo WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}