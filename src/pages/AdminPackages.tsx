import { useState, useEffect } from "react";
import {
  getAllPacotes,
  createPacote,
  updatePacote,
  deletePacote,
  type PacoteAPI,
} from "../services/api";

// ─── Configuração ────────────────────────────────────────────────────────────
// Página acessível em: /admin  |  Senha: tina2024
// Os pacotes são salvos no PostgreSQL via API Spring Boot.
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_PIN = "tina2024";
const SESSION_KEY = "tina_tur_admin_session";

const CATEGORIES = [
  { value: "PRAIA", label: "Praia" },
  { value: "NATUREZA", label: "Natureza" },
  { value: "AVENTURA", label: "Aventura" },
  { value: "CULTURAL", label: "Cultural" },
  { value: "INTERNACIONAL", label: "Internacional" },
];

const EMPTY_FORM: PacoteAPI = {
  titulo: "",
  destino: "",
  preco: "",
  duracao: "",
  descricao: "",
  categoria: "PRAIA",
  imagemUrl: "",
  destaque: false,
};

// ─── PIN Gate ────────────────────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setPin("");
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f0] flex items-center justify-center px-5">
      <div
        className={`bg-white rounded-3xl shadow-xl p-10 w-full max-w-sm text-center transition-all duration-300 ${
          shaking ? "animate-bounce" : ""
        }`}
      >
        <div className="w-16 h-16 bg-[#1a2744] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h1
          className="text-[#1a2744] text-2xl font-bold mb-1"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Área Restrita
        </h1>
        <p className="text-gray-400 text-sm mb-7">
          Digite a senha para acessar o painel de gestão de pacotes.
        </p>

        <div className="relative mb-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="••••••••"
            className={`w-full border-2 rounded-xl px-4 py-3 text-center text-lg tracking-widest focus:outline-none transition-all ${
              error
                ? "border-red-400 focus:border-red-400 bg-red-50"
                : "border-gray-200 focus:border-[#d4a853]"
            }`}
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-4">Senha incorreta. Tente novamente.</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-[#1a2744] text-white font-bold py-3.5 rounded-xl hover:bg-[#d4a853] hover:text-[#1a2744] transition-colors duration-300"
        >
          Entrar
        </button>

        <p className="text-gray-300 text-xs mt-5">
          Tina Tur © Admin Panel
        </p>
      </div>
    </div>
  );
}

// ─── Main Admin ──────────────────────────────────────────────────────────────
export default function AdminPackages() {
  const [authenticated, setAuthenticated] = useState(false);
  const [packages, setPackages] = useState<PacoteAPI[]>([]);
  const [form, setForm] = useState<PacoteAPI>({ ...EMPTY_FORM });
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) fetchPackages();
  }, [authenticated]);

  const fetchPackages = () => {
    setLoading(true);
    getAllPacotes()
      .then(setPackages)
      .catch(() => setError("Erro ao carregar pacotes. Verifique se a API está online."))
      .finally(() => setLoading(false));
  };

  if (!authenticated) {
    return <PinGate onUnlock={() => setAuthenticated(true)} />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSave = async () => {
    if (!form.titulo || !form.destino || !form.preco) {
      alert("Preencha pelo menos: Título, Destino e Preço.");
      return;
    }
    try {
      if (editId !== null) {
        const updated = await updatePacote(editId, form);
        setPackages(packages.map((p) => (p.id === editId ? updated : p)));
      } else {
        const created = await createPacote(form);
        setPackages([created, ...packages]);
      }
      setForm({ ...EMPTY_FORM });
      setEditId(null);
      setShowForm(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      alert(`Erro ao salvar: ${msg}`);
    }
  };

  const handleEdit = (pkg: PacoteAPI) => {
    setForm({ ...pkg });
    setEditId(pkg.id ?? null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePacote(id);
      setPackages(packages.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      alert(`Erro ao deletar: ${msg}`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  };

  const filtered = packages.filter((p) =>
    (p.titulo ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.destino ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9f6f0] pt-24 pb-20">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="bg-[#1a2744] py-8 px-5 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[#d4a853] text-xs font-bold tracking-widest uppercase mb-1">
              Painel Administrativo
            </p>
            <h1
              className="text-white text-2xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Gestão de Pacotes
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ ...EMPTY_FORM }); }}
              className="bg-[#d4a853] text-[#1a2744] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
              </svg>
              {showForm ? "Cancelar" : "Novo Pacote"}
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/10 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        {/* ─── Saved toast ──────────────────────────────────────────────── */}
        {saved && (
          <div className="fixed top-24 right-5 z-50 bg-[#25D366] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pacote salvo com sucesso!
          </div>
        )}

        {/* ─── Add/Edit Form ──────────────────────────────────────────── */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2
              className="text-[#1a2744] text-xl font-bold mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {editId ? "Editar Pacote" : "Adicionar Novo Pacote"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Título do Pacote *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Fernando de Noronha"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Destino (estado/país) *
                </label>
                <input
                  type="text"
                  name="destino"
                  value={form.destino}
                  onChange={handleChange}
                  placeholder="Ex: Pernambuco, Brasil"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Preço (a partir de) *
                </label>
                <input
                  type="text"
                  name="preco"
                  value={form.preco}
                  onChange={handleChange}
                  placeholder="Ex: R$ 1.450"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Duração
                </label>
                <input
                  type="text"
                  name="duracao"
                  value={form.duracao ?? ""}
                  onChange={handleChange}
                  placeholder="Ex: 4 dias / 3 noites"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Categoria
                </label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  name="imagemUrl"
                  value={form.imagemUrl ?? ""}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={form.descricao ?? ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descreva os destaques deste pacote..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 transition-all resize-none"
                />
              </div>

              {/* Featured */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="destaque"
                    checked={form.destaque}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 accent-[#d4a853]"
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    Exibir como <strong>Pacote em Destaque</strong> na Home
                  </span>
                </label>
              </div>
            </div>

            {/* Image preview */}
            {form.imagemUrl && (
              <div className="mt-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Preview da Imagem
                </p>
                <img
                  src={form.imagemUrl}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-xl border border-gray-200"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="bg-[#1a2744] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#d4a853] hover:text-[#1a2744] transition-colors duration-300 text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {editId ? "Salvar Alterações" : "Adicionar Pacote"}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditId(null); setForm({ ...EMPTY_FORM }); }}
                className="border-2 border-gray-200 text-gray-500 font-semibold px-7 py-3 rounded-xl hover:border-gray-400 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ─── Stats bar ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total de Pacotes", value: packages.length },
            { label: "Em Destaque", value: packages.filter((p) => p.featured).length },
            { label: "Categorias", value: new Set(packages.map((p) => p.category)).size },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p
                className="text-2xl font-bold text-[#1a2744]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Search ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm mb-6">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar pacotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-300"
          />
        </div>

        {/* ─── Packages list ─────────────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Carregando pacotes...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-600 text-sm">{error}</div>
        ) : (
        <div className="space-y-3">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                {pkg.imagemUrl ? (
                  <img src={pkg.imagemUrl} alt={pkg.titulo} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#1a2744]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[#1a2744] font-bold text-sm truncate">
                    {pkg.titulo}
                  </h3>
                  {pkg.destaque && (
                    <span className="bg-[#d4a853]/20 text-[#a07820] text-xs font-bold px-2 py-0.5 rounded-full">
                      ★ Destaque
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full capitalize">
                    {(pkg.categoria ?? "").toLowerCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-0.5">{pkg.destino}</p>
                <p className="text-[#1a2744] font-bold text-sm mt-1">{pkg.preco}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="w-9 h-9 bg-[#1a2744]/10 text-[#1a2744] rounded-lg flex items-center justify-center hover:bg-[#1a2744] hover:text-white transition-colors"
                  title="Editar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {deleteConfirm === pkg.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(pkg.id!)}
                      className="w-9 h-9 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Confirmar exclusão"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="w-9 h-9 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(pkg.id!)}
                    className="w-9 h-9 bg-red-50 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                    title="Excluir"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {/* ─── Info box ──────────────────────────────────────────────── */}
        <div className="mt-10 bg-[#1a2744]/5 rounded-2xl p-5 border border-[#1a2744]/10">
          <p className="text-[#1a2744] text-xs font-bold uppercase tracking-wide mb-2">ℹ️ Como funciona</p>
          <ul className="text-gray-500 text-xs space-y-1 leading-relaxed">
            <li>• Os pacotes são salvos no <strong>banco de dados PostgreSQL</strong> via API Spring Boot.</li>
            <li>• Qualquer alteração feita aqui aparece imediatamente para todos os visitantes do site.</li>
            <li>• Acesse esta página sempre em: <strong>/admin</strong> com a senha configurada.</li>
            <li>• A API deve estar rodando no Render para que esta página funcione.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}