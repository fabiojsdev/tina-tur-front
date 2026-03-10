/**
 * api.ts — Centraliza todas as chamadas HTTP para o backend Spring Boot.
 *
 * A URL base é lida de uma variável de ambiente do Vite.
 * Em desenvolvimento (.env.local): VITE_API_URL=http://localhost:8080
 * Em produção (.env.production):  VITE_API_URL=https://sua-api.onrender.com
 */

// Lê a variável de ambiente do Vite.
// Se não estiver definida, usa localhost (desenvolvimento).
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

// ─── Tipo que espelha o PacoteDTO do backend ─────────────────────────────────
export interface PacoteAPI {
  [x: string]: unknown;
  id?: number;
  titulo: string;
  destino: string;
  preco: string;
  duracao?: string;
  descricao?: string;
  categoria?: string;
  imagemUrl?: string;
  destaque: boolean;
}

// ─── Helper interno ───────────────────────────────────────────────────────────
async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    // Tenta extrair uma mensagem de erro legível do backend
    let msg = `Erro ${res.status}`;
    try {
      const body = await res.json();
      msg = body.message ?? body.error ?? msg;
    } catch {}
    throw new Error(msg);
  }

  // DELETE retorna 204 (sem body), então não tenta fazer .json()
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ─── Funções exportadas ───────────────────────────────────────────────────────

/** Busca todos os pacotes */
export const getAllPacotes = (): Promise<PacoteAPI[]> =>
  request<PacoteAPI[]>("/api/pacotes");

/** Busca apenas os pacotes em destaque */
export const getDestaques = (): Promise<PacoteAPI[]> =>
  request<PacoteAPI[]>("/api/pacotes/destaques");

/** Busca pacotes por categoria ("PRAIA", "NATUREZA", etc.) */
export const getPacotesByCategoria = (categoria: string): Promise<PacoteAPI[]> =>
  request<PacoteAPI[]>(`/api/pacotes?categoria=${categoria}`);

/** Cria um novo pacote (admin) */
export const createPacote = (pacote: PacoteAPI): Promise<PacoteAPI> =>
  request<PacoteAPI>("/api/pacotes", {
    method: "POST",
    body: JSON.stringify(pacote),
  });

/** Atualiza um pacote existente (admin) */
export const updatePacote = (id: number, pacote: PacoteAPI): Promise<PacoteAPI> =>
  request<PacoteAPI>(`/api/pacotes/${id}`, {
    method: "PUT",
    body: JSON.stringify(pacote),
  });

/** Remove um pacote (admin) */
export const deletePacote = (id: number): Promise<void> =>
  request<void>(`/api/pacotes/${id}`, { method: "DELETE" });