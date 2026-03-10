import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrolled } from "../hooks/useReveal";

const NAV_LINKS = [
  { label: "Início", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Pacotes", path: "/pacotes" },
  { label: "Destinos", path: "/destinos" },
  { label: "Contato", path: "/contato" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const scrolled = useScrolled(60);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1a2744] shadow-xl py-3"
          : "bg-[#1a2744]/90 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 bg-[#d4a853] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-5 h-5 text-[#1a2744]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <span
              className="text-white text-xl font-bold tracking-widest"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              TINA TUR
            </span>
            <p className="text-[#d4a853] text-[9px] tracking-[0.3em] uppercase -mt-1 hidden sm:block">
              Agência de Viagens
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-all duration-200 relative group ${
                isActive(link.path)
                  ? "text-[#d4a853]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4a853] transition-all duration-300 ${
                  isActive(link.path)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
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
            <span
              className={`block h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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