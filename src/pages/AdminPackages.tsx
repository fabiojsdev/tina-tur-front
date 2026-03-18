import { useState, useEffect, useRef } from "react";
import {
  getAllPacotes,
  createPacote,
  updatePacote,
  deletePacote,
  type PacoteAPI,
} from "../services/api";

// ─── Configuração ─────────────────────────────────────────────────────────────
const ADMIN_PIN = "tina2024";
const SESSION_KEY = "tina_tur_admin_session";

// Para upload de imagem via ImgBB (gratuito):
// 1. Crie conta em https://imgbb.com
// 2. Gere uma API key em https://api.imgbb.com
// 3. Coloque no .env.local: VITE_IMGBB_KEY=sua_chave_aqui
const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY ?? "";

// ─── Categorias ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: "PRAIA", label: "🏖️ Praia" },
  { value: "NATUREZA", label: "🌿 Natureza" },
  { value: "AVENTURA", label: "🧗 Aventura" },
  { value: "CULTURAL", label: "🏛️ Cultural" },
  { value: "INTERNACIONAL", label: "✈️ Internacional" },
];

const CATEGORY_LABELS: Record<string, string> = {
  PRAIA: "Praia",
  NATUREZA: "Natureza",
  AVENTURA: "Aventura",
  CULTURAL: "Cultural",
  INTERNACIONAL: "Internacional",
};

// ─── Formulário vazio padrão ──────────────────────────────────────────────────
const EMPTY_FORM: PacoteAPI = {
  titulo: "",
  destino: "",
  preco: "R$ ",
  duracao: "",
  descricao: "",
  categoria: "PRAIA",
  imagemUrl: "",
  destaque: false,
};

// ─── Tipos de erro de validação ───────────────────────────────────────────────
interface FormErrors {
  titulo?: string;
  destino?: string;
  preco?: string;
  duracao?: string;
  descricao?: string;
  imagemUrl?: string;
}

// ─── Utilitários de validação ─────────────────────────────────────────────────
const validators = {
  titulo: (v: string) => {
    if (!v.trim()) return "O título é obrigatório";
    if (v.trim().length < 3) return "Mínimo de 3 caracteres";
    if (v.length > 150) return "Máximo de 150 caracteres";
    return "";
  },
  destino: (v: string) => {
    if (!v.trim()) return "O destino é obrigatório";
    if (v.trim().length < 3) return "Mínimo de 3 caracteres";
    if (v.length > 200) return "Máximo de 200 caracteres";
    return "";
  },
  preco: (v: string) => {
    if (!v || v === "R$ ") return "O preço é obrigatório";
    const regex = /^R\$\s*[\d.,]+$/;
    if (!regex.test(v.trim())) return 'Formato inválido. Use: R$ 1.450 ou R$ 1.450,00';
    return "";
  },
  duracao: (v: string) => {
    if (!v) return ""; // opcional
    const regex = /^\d+\s+dias?\s*\/\s*\d+\s+noites?$/i;
    if (!regex.test(v.trim())) return "Use o formato: 4 dias / 3 noites";
    return "";
  },
  descricao: (v: string) => {
    if (v && v.length > 2000) return "Máximo de 2000 caracteres";
    return "";
  },
  imagemUrl: (v: string) => {
    if (!v) return ""; // opcional se fizer upload
    if (v && !/^https?:\/\/.+/.test(v)) return "URL deve começar com http:// ou https://";
    return "";
  },
};

// ─── Máscara de preço ─────────────────────────────────────────────────────────
function mascaraPreco(valor: string): string {
  // Remove tudo que não é número, vírgula ou ponto
  const numeros = valor.replace(/[^\d.,]/g, "");
  // Mantém apenas dígitos, um ponto ou uma vírgula
  return "R$ " + numeros;
}

// ─── Upload de imagem para ImgBB ──────────────────────────────────────────────
async function uploadImagem(arquivo: File): Promise<string> {
  if (!IMGBB_KEY) {
    throw new Error(
      "VITE_IMGBB_KEY não configurada. Adicione ao .env.local e configure no Vercel."
    );
  }
  const formData = new FormData();
  formData.append("image", arquivo);
  formData.append("key", IMGBB_KEY);

  const resposta = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!resposta.ok) throw new Error("Falha no upload da imagem. Tente novamente.");

  const dados = await resposta.json();
  if (!dados.success) throw new Error("Resposta inválida do servidor de imagens.");

  return dados.data.url as string;
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTE: PinGate — tela de autenticação
// ══════════════════════════════════════════════════════════════════════════════
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f0] flex items-center justify-center px-5">
      <div
        className={`bg-white rounded-3xl shadow-xl p-10 w-full max-w-sm text-center
          transition-transform ${shake ? "animate-bounce" : ""}`}
      >
        <div className="w-16 h-16 bg-[#1a2744] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-[#1a2744] text-2xl font-bold mb-1"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Área Restrita
        </h1>
        <p className="text-gray-400 text-sm mb-7">
          Digite a senha para acessar o painel de gestão.
        </p>
        <input
          type="password"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="••••••••"
          className={`w-full border-2 rounded-xl px-4 py-3 text-center text-lg tracking-widest
            focus:outline-none transition-all mb-2
            ${error ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#d4a853]"}`}
        />
        {error && <p className="text-red-500 text-xs mb-3">Senha incorreta. Tente novamente.</p>}
        <button onClick={handleSubmit}
          className="w-full bg-[#1a2744] text-white font-bold py-3.5 rounded-xl
            hover:bg-[#d4a853] hover:text-[#1a2744] transition-colors duration-300 mt-2">
          Entrar
        </button>
        <p className="text-gray-300 text-xs mt-5">Tina Tur © Admin Panel</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL: AdminPackages
// ══════════════════════════════════════════════════════════════════════════════
export default function AdminPackages() {
  const [authenticated, setAuthenticated] = useState(false);
  const [packages, setPackages] = useState<PacoteAPI[]>([]);
  const [form, setForm] = useState<PacoteAPI>({ ...EMPTY_FORM });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) fetchPackages();
  }, [authenticated]);

  const fetchPackages = () => {
    setLoading(true);
    setApiError(null);
    getAllPacotes()
      .then(setPackages)
      .catch(() => setApiError("Erro ao carregar pacotes. Verifique se a API está online."))
      .finally(() => setLoading(false));
  };

  if (!authenticated) return <PinGate onUnlock={() => setAuthenticated(true)} />;

  // ─── Handlers do formulário ─────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    let value: string | boolean = target.type === "checkbox"
      ? (target as HTMLInputElement).checked
      : target.value;

    // Aplica máscara de preço
    if (target.name === "preco" && typeof value === "string") {
      value = mascaraPreco(value);
    }

    setForm((prev) => ({ ...prev, [target.name]: value }));

    // Valida o campo em tempo real
    if (target.name in validators) {
      const err = validators[target.name as keyof typeof validators](value as string);
      setFormErrors((prev) => ({ ...prev, [target.name]: err }));
    }
  };

  // ─── Upload de imagem do computador ────────────────────────────────────────
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    // Valida tipo e tamanho
    if (!arquivo.type.startsWith("image/")) {
      alert("Por favor selecione uma imagem (JPG, PNG, WebP, etc.)");
      return;
    }
    if (arquivo.size > 5 * 1024 * 1024) {
      alert("Imagem muito grande. O limite é 5 MB.");
      return;
    }

    // Mostra preview local imediatamente
    const urlLocal = URL.createObjectURL(arquivo);
    setImagePreview(urlLocal);

    // Faz upload para ImgBB
    if (!IMGBB_KEY) {
      // Sem chave configurada: usa URL local como preview (não persiste)
      alert(
        "⚠️ VITE_IMGBB_KEY não configurada.\n\n" +
        "A imagem aparece como preview mas não será salva.\n" +
        "Configure a chave ImgBB no .env.local para ativar o upload."
      );
      setForm((prev) => ({ ...prev, imagemUrl: urlLocal }));
      return;
    }

    try {
      setUploadingImage(true);
      const urlFinal = await uploadImagem(arquivo);
      setForm((prev) => ({ ...prev, imagemUrl: urlFinal }));
      setImagePreview(urlFinal);
      setFormErrors((prev) => ({ ...prev, imagemUrl: "" }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro no upload";
      alert(`Erro ao fazer upload: ${msg}`);
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
      // Limpa o input para permitir re-seleção do mesmo arquivo
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ─── Validação completa antes de salvar ────────────────────────────────────
  const validarFormulario = (): boolean => {
    const erros: FormErrors = {};
    let valido = true;

    (["titulo", "destino", "preco", "duracao", "descricao", "imagemUrl"] as const).forEach((campo) => {
      const valor = (form[campo] as string) ?? "";
      const erro = validators[campo]?.(valor) ?? "";
      if (erro) {
        erros[campo] = erro;
        valido = false;
      }
    });

    setFormErrors(erros);
    return valido;
  };

  // ─── Salvar (criar ou editar) ───────────────────────────────────────────────
  const handleSave = async () => {
    if (!validarFormulario()) {
      // Rola até o primeiro erro
      document.querySelector(".border-red-400")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      if (editId !== null) {
        const updated = await updatePacote(editId, form);
        setPackages((prev) => prev.map((p) => (p.id === editId ? updated : p)));
      } else {
        const created = await createPacote(form);
        setPackages((prev) => [created, ...prev]);
      }
      resetForm();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      alert(`Erro ao salvar: ${msg}`);
    }
  };

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setFormErrors({});
    setEditId(null);
    setShowForm(false);
    setImagePreview(null);
  };

  const handleEdit = (pkg: PacoteAPI) => {
    setForm({ ...pkg });
    setFormErrors({});
    setEditId(pkg.id ?? null);
    setShowForm(true);
    setImagePreview(pkg.imagemUrl as string || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePacote(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (err: unknown) {
      alert(`Erro ao deletar: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
    }
  };

  // ─── Campo com erro helper ─────────────────────────────────────────────────
  const fieldClass = (campo: keyof FormErrors) =>
    `w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all
    ${formErrors[campo]
      ? "border-red-400 bg-red-50 focus:border-red-400"
      : "border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20"}`;

  const filtered = packages.filter((p) =>
    ((p.titulo as string) ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    ((p.destino as string) ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ─── Estatísticas corretas (usando campos do backend) ──────────────────────
  const totalDestaque = packages.filter((p) => p.destaque === true).length;
  const totalCategorias = new Set(packages.map((p) => p.categoria)).size;

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#f9f6f0] pt-24 pb-20">

      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="bg-[#1a2744] py-8 px-5 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[#d4a853] text-xs font-bold tracking-widest uppercase mb-1">
              Painel Administrativo
            </p>
            <h1 className="text-white text-2xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Gestão de Pacotes
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); else setForm({ ...EMPTY_FORM }); }}
              className="bg-[#d4a853] text-[#1a2744] font-bold px-5 py-2.5 rounded-xl text-sm
                hover:bg-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={showForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
              </svg>
              {showForm ? "Cancelar" : "Novo Pacote"}
            </button>
            <button
              onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthenticated(false); }}
              className="bg-white/10 text-white font-semibold px-5 py-2.5 rounded-xl text-sm
                hover:bg-white/20 transition-colors">
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5">

        {/* ─── Toast de sucesso ─────────────────────────────────────────────── */}
        {saved && (
          <div className="fixed top-24 right-5 z-50 bg-green-500 text-white px-5 py-3
            rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pacote salvo com sucesso!
          </div>
        )}

        {/* ─── Formulário ───────────────────────────────────────────────────── */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-[#1a2744] text-xl font-bold mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {editId ? "Editar Pacote" : "Adicionar Novo Pacote"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Título */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Título do Pacote *
                </label>
                <input type="text" name="titulo" value={form.titulo as string}
                  onChange={handleChange} placeholder="Ex: Fernando de Noronha"
                  maxLength={150} className={fieldClass("titulo")} />
                {formErrors.titulo && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formErrors.titulo}</p>
                )}
                <p className="text-gray-300 text-xs mt-1 text-right">
                  {((form.titulo as string) ?? "").length}/150
                </p>
              </div>

              {/* Destino */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Destino (cidade, estado ou país) *
                </label>
                <input type="text" name="destino" value={form.destino as string}
                  onChange={handleChange} placeholder="Ex: Pernambuco, Brasil"
                  maxLength={200} className={fieldClass("destino")} />
                {formErrors.destino && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formErrors.destino}</p>
                )}
              </div>

              {/* Preço — aceita apenas formato R$ */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Preço (a partir de) *
                </label>
                <input type="text" name="preco" value={form.preco as string}
                  onChange={handleChange} placeholder="R$ 1.450"
                  maxLength={50} className={fieldClass("preco")} />
                {formErrors.preco
                  ? <p className="text-red-500 text-xs mt-1">⚠ {formErrors.preco}</p>
                  : <p className="text-gray-400 text-xs mt-1">Ex: R$ 890 ou R$ 1.450,00</p>
                }
              </div>

              {/* Duração */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Duração <span className="text-gray-300 font-normal">(opcional)</span>
                </label>
                <input type="text" name="duracao" value={(form.duracao as string) ?? ""}
                  onChange={handleChange} placeholder="4 dias / 3 noites"
                  maxLength={100} className={fieldClass("duracao")} />
                {formErrors.duracao
                  ? <p className="text-red-500 text-xs mt-1">⚠ {formErrors.duracao}</p>
                  : <p className="text-gray-400 text-xs mt-1">Formato: 4 dias / 3 noites</p>
                }
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Categoria
                </label>
                <select name="categoria" value={form.categoria as string}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm
                    focus:outline-none focus:border-[#d4a853] focus:ring-2
                    focus:ring-[#d4a853]/20 transition-all bg-white">
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Destaque */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer mt-4">
                  <input type="checkbox" name="destaque"
                    checked={form.destaque as boolean} onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 accent-[#d4a853]" />
                  <div>
                    <span className="text-sm text-gray-700 font-medium">
                      Exibir como <strong>Destaque</strong> na Home
                    </span>
                    <p className="text-gray-400 text-xs">Aparece na seção de pacotes em destaque</p>
                  </div>
                </label>
              </div>

              {/* Descrição */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Descrição <span className="text-gray-300 font-normal">(opcional)</span>
                </label>
                <textarea name="descricao" value={(form.descricao as string) ?? ""}
                  onChange={handleChange} rows={3}
                  maxLength={2000}
                  placeholder="Descreva os destaques deste pacote de viagem..."
                  className={`resize-none ${fieldClass("descricao")}`} />
                {formErrors.descricao && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formErrors.descricao}</p>
                )}
                <p className="text-gray-300 text-xs mt-1 text-right">
                  {((form.descricao as string) ?? "").length}/2000
                </p>
              </div>

              {/* Upload de imagem */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Imagem do Pacote
                </label>

                {/* Área de upload */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-5
                  hover:border-[#d4a853] transition-colors group">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">

                    {/* Preview */}
                    <div className="w-32 h-24 rounded-xl overflow-hidden bg-gray-100
                      flex items-center justify-center flex-shrink-0 border border-gray-200">
                      {uploadingImage ? (
                        <div className="flex flex-col items-center gap-1">
                          <svg className="w-5 h-5 text-[#d4a853] animate-spin" fill="none"
                            viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span className="text-xs text-gray-400">Enviando...</span>
                        </div>
                      ) : imagePreview ? (
                        <img src={imagePreview} alt="Preview"
                          className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      )}
                    </div>

                    {/* Controles */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Escolha uma opção:
                      </p>

                      {/* Botão upload */}
                      <input ref={fileInputRef} type="file" accept="image/*"
                        onChange={handleFileSelect} className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="flex items-center gap-2 bg-[#1a2744] text-white text-sm
                          font-semibold px-4 py-2.5 rounded-lg hover:bg-[#d4a853]
                          hover:text-[#1a2744] transition-colors disabled:opacity-50
                          disabled:cursor-not-allowed mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {uploadingImage ? "Enviando..." : "📁 Upload do Computador"}
                      </button>

                      <p className="text-gray-400 text-xs mb-2">— ou cole uma URL —</p>

                      {/* URL manual */}
                      <input type="url" name="imagemUrl"
                        value={(form.imagemUrl as string) ?? ""}
                        onChange={(e) => {
                          handleChange(e);
                          setImagePreview(e.target.value || null);
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className={`${fieldClass("imagemUrl")} text-xs`} />
                      {formErrors.imagemUrl && (
                        <p className="text-red-500 text-xs mt-1">⚠ {formErrors.imagemUrl}</p>
                      )}

                      <p className="text-gray-300 text-xs mt-2">
                        JPG, PNG, WebP — máximo 5 MB. Para upload, configure VITE_IMGBB_KEY.
                      </p>
                    </div>
                  </div>

                  {/* Botão limpar imagem */}
                  {(imagePreview || form.imagemUrl) && (
                    <button type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setForm((prev) => ({ ...prev, imagemUrl: "" }));
                      }}
                      className="mt-3 text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remover imagem
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={uploadingImage}
                className="bg-[#1a2744] text-white font-bold px-7 py-3 rounded-xl
                  hover:bg-[#d4a853] hover:text-[#1a2744] transition-colors text-sm
                  flex items-center gap-2 disabled:opacity-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {editId ? "Salvar Alterações" : "Adicionar Pacote"}
              </button>
              <button onClick={resetForm}
                className="border-2 border-gray-200 text-gray-500 font-semibold px-7 py-3
                  rounded-xl hover:border-gray-400 transition-colors text-sm">
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ─── Estatísticas (bugs corrigidos: destaque e categoria) ─────────── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total de Pacotes", value: packages.length },
            { label: "Em Destaque", value: totalDestaque },
            { label: "Categorias", value: totalCategorias },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#1a2744]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {s.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Busca ────────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm mb-6">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar por título ou destino..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-300" />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")}
              className="text-gray-300 hover:text-gray-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ─── Lista de pacotes ─────────────────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Carregando pacotes...</div>
        ) : apiError ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-600 text-sm">
            {apiError}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            {searchTerm ? "Nenhum pacote encontrado para a busca." : "Nenhum pacote cadastrado."}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((pkg) => (
              <div key={pkg.id}
                className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-5
                  hover:shadow-md transition-shadow">

                {/* Imagem */}
                <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {pkg.imagemUrl ? (
                    <img src={pkg.imagemUrl as string} alt={pkg.titulo as string}
                      className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#1a2744]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info — usando campos corretos do backend */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[#1a2744] font-bold text-sm truncate">
                      {(pkg.titulo as string) || "Sem título"}
                    </h3>
                    {pkg.destaque && (
                      <span className="bg-[#d4a853]/20 text-[#a07820] text-xs font-bold px-2 py-0.5 rounded-full">
                        ★ Destaque
                      </span>
                    )}
                    {pkg.categoria && (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                        {CATEGORY_LABELS[pkg.categoria as string] ?? pkg.categoria as string}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {(pkg.destino as string) || "Sem destino"}
                  </p>
                  <p className="text-[#1a2744] font-bold text-sm mt-1">
                    {(pkg.preco as string) || "Sem preço"}
                  </p>
                  {pkg.duracao && (
                    <p className="text-gray-400 text-xs">
                      {pkg.duracao as string}
                    </p>
                  )}
                </div>

                {/* Ações */}
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(pkg)}
                    className="w-9 h-9 bg-[#1a2744]/10 text-[#1a2744] rounded-lg
                      flex items-center justify-center hover:bg-[#1a2744] hover:text-white
                      transition-colors" title="Editar">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {deleteConfirm === pkg.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => handleDelete(pkg.id!)}
                        className="w-9 h-9 bg-red-500 text-white rounded-lg flex items-center
                          justify-center hover:bg-red-600 transition-colors" title="Confirmar exclusão">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteConfirm(null)}
                        className="w-9 h-9 bg-gray-200 text-gray-600 rounded-lg flex items-center
                          justify-center hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(pkg.id!)}
                      className="w-9 h-9 bg-red-50 text-red-400 rounded-lg flex items-center
                        justify-center hover:bg-red-500 hover:text-white transition-colors"
                      title="Excluir">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Caixa de informações ─────────────────────────────────────────── */}
        <div className="mt-10 bg-[#1a2744]/5 rounded-2xl p-5 border border-[#1a2744]/10">
          <p className="text-[#1a2744] text-xs font-bold uppercase tracking-wide mb-3">
            ℹ️ Sobre o upload de imagens
          </p>
          <div className="text-gray-500 text-xs space-y-1.5 leading-relaxed">
            <p>• Para ativar o <strong>upload do computador</strong>, crie uma conta gratuita em{" "}
              <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer"
                className="text-[#1a2744] underline">imgbb.com</a> e gere uma API key.
            </p>
            <p>• Adicione no <strong>.env.local</strong>: <code className="bg-white px-1 rounded">VITE_IMGBB_KEY=sua_chave</code></p>
            <p>• Adicione também nas <strong>variáveis do Vercel</strong> com o mesmo nome e valor.</p>
            <p>• Sem a chave, o upload ainda mostra preview local mas a URL não é salva.</p>
            <p>• Alternativa: cole diretamente a URL de qualquer imagem (Unsplash, etc.)</p>
          </div>
        </div>
      </div>
    </div>
  );
}