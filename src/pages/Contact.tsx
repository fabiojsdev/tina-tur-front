import { useState } from "react";

const WHATSAPP = "5511999999999";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }
    // Build WhatsApp message from form
    const waText = encodeURIComponent(
      `Olá! Sou ${form.name}.\n\nE-mail: ${form.email}\nTelefone: ${form.phone || "Não informado"}\nDestino de interesse: ${form.destination || "Não especificado"}\n\nMensagem: ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${waText}`, "_blank");
    setSubmitted(true);
  };

  const CONTACT_INFO = [
    {
      icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      label: "Endereço",
      value: "Av. Paulista, 1000\nSão Paulo – SP, 01310-100",
      color: "#d4a853",
    },
    {
      icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
      label: "WhatsApp & Telefone",
      value: "(11) 99999-9999",
      color: "#25D366",
    },
    {
      icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
      label: "E-mail",
      value: "contato@tinatur.com.br",
      color: "#1a2744",
    },
    {
      icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
      label: "Horário de Atendimento",
      value: "Seg–Sex: 9h às 18h\nSáb: 9h às 13h",
      color: "#d4a853",
    },
  ];

  const DESTINATIONS_OPTIONS = [
    "Fernando de Noronha",
    "Jericoacoara",
    "Lençóis Maranhenses",
    "Chapada dos Veadeiros",
    "Bonito & Pantanal",
    "Gramado & Canela",
    "Amazônia",
    "Praia do Sono",
    "Machu Picchu & Cusco",
    "Buenos Aires",
    "Outro destino",
  ];

  return (
    <div>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 px-5 flex items-end overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "55vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1a2e]/70 to-[#0e1a2e]/95" />
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <p className="text-[#d4a853] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Estamos aqui para você
          </p>
          <h1
            className="text-white text-4xl sm:text-6xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Fale com a{" "}
            <em className="text-[#d4a853] not-italic">Tina Tur</em>
          </h1>
          <p className="text-white/60 mt-4 max-w-lg leading-relaxed">
            Nossa equipe está pronta para planejar a viagem perfeita para você.
            Resposta em até 2 horas úteis pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* ─── WHATSAPP HIGHLIGHT ────────────────────────────────────────────── */}
      <section className="bg-[#25D366] py-6 px-5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <div>
              <p className="text-white font-bold text-sm">Resposta rápida pelo WhatsApp</p>
              <p className="text-white/70 text-xs">Atendimento em tempo real durante o horário comercial</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=Olá!%20Gostaria%20de%20informações%20sobre%20viagens.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1a8a45] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#1a2744] hover:text-white transition-colors duration-300 whitespace-nowrap"
          >
            Chamar no WhatsApp →
          </a>
        </div>
      </section>

      {/* ─── CONTACT SECTION ───────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-[#f9f6f0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-8">
              <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Informações
              </p>
              <h2
                className="text-[#1a2744] text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Como nos encontrar
              </h2>
            </div>

            {CONTACT_INFO.map((info, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: info.color + "20" }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: info.color }}
                  >
                    <path d={info.icon} />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-xs font-bold tracking-wide uppercase mb-1"
                    style={{ color: info.color }}
                  >
                    {info.label}
                  </p>
                  <p className="text-[#1a2744] text-sm font-medium whitespace-pre-line leading-relaxed">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="bg-[#1a2744] rounded-2xl p-5 text-white text-center">
              <p className="text-[#d4a853] text-xs font-bold tracking-widest uppercase mb-2">
                Nossa Localização
              </p>
              <p className="text-sm text-white/60">
                Av. Paulista, 1000 – Bela Vista
                <br />
                São Paulo – SP
              </p>
              <a
                href="https://maps.google.com/?q=Av.+Paulista,+1000,+São+Paulo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs text-[#d4a853] hover:text-white transition-colors underline"
              >
                Ver no Google Maps →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-10 h-10 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="text-[#1a2744] text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Mensagem Enviada!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Você foi redirecionado para o WhatsApp. Nossa equipe responderá em breve!
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", destination: "", message: "" }); }}
                    className="text-[#d4a853] text-sm font-semibold hover:text-[#1a2744] transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                      Formulário de Contato
                    </p>
                    <h2
                      className="text-[#1a2744] text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Planeje sua próxima viagem
                    </h2>
                    <p className="text-gray-400 text-xs mt-1">
                      * Ao enviar, você será direcionado ao WhatsApp com sua mensagem pronta.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Seu nome"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a2744] placeholder-gray-300 focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a2744] placeholder-gray-300 focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                          WhatsApp / Telefone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a2744] placeholder-gray-300 focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                          Destino de Interesse
                        </label>
                        <select
                          name="destination"
                          value={form.destination}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a2744] focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all bg-white"
                        >
                          <option value="">Selecione um destino</option>
                          {DESTINATIONS_OPTIONS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                        Mensagem *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Conte-nos sobre seus planos: datas, número de pessoas, orçamento estimado..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a2744] placeholder-gray-300 focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full bg-[#1a2744] text-white font-bold py-4 rounded-xl hover:bg-[#d4a853] hover:text-[#1a2744] transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Enviar via WhatsApp
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#d4a853] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Dúvidas Frequentes
            </p>
            <h2
              className="text-[#1a2744] text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Perguntas Frequentes
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Como funciona o processo de compra de um pacote?",
                a: "Simples! Escolha o pacote que deseja, clique em 'Tenho Interesse' e nosso consultor irá entrar em contato pelo WhatsApp para personalizar os detalhes e confirmar sua reserva.",
              },
              {
                q: "Os pacotes incluem passagem aérea?",
                a: "Depende do pacote. Muitos pacotes são terrestres (somente hospedagem e transfer). Nos pacotes onde a passagem não está inclusa, podemos cotar separadamente para você.",
              },
              {
                q: "É possível parcelar o valor da viagem?",
                a: "Sim! Aceitamos parcelamento em até 12x no cartão de crédito. Consulte as condições pelo WhatsApp.",
              },
              {
                q: "Qual a política de cancelamento?",
                a: "Nossa política de cancelamento varia por pacote e operadora. De forma geral, cancelamentos com mais de 30 dias de antecedência têm reembolso total ou crédito para futuras viagens.",
              },
            ].map((faq, i) => (
              <FAQ key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "border-[#d4a853]" : "border-gray-100"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span
          className={`text-sm font-semibold transition-colors ${
            open ? "text-[#d4a853]" : "text-[#1a2744] group-hover:text-[#d4a853]"
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 ml-3 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180 text-[#d4a853]" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}