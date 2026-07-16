import type { CategoriaCorporativa } from "./knowledge-base";

export interface KnowledgeDocument {
  id: string;
  titulo: string;
  categoria: CategoriaCorporativa;
  descricao: string;
  conteudo: string;
  palavrasChave: string[];
  atualizadoEm: string; // ISO date
  status: "Ativo";
}
