export type CategoriaCorporativa =
  | "Tecnologia da Informação"
  | "Recursos Humanos"
  | "Segurança da Informação"
  | "Facilities e serviços internos"
  | "Políticas corporativas";

export const CATEGORIAS: CategoriaCorporativa[] = [
  "Tecnologia da Informação",
  "Recursos Humanos",
  "Segurança da Informação",
  "Facilities e serviços internos",
  "Políticas corporativas",
];

export interface KnowledgeDocument {
  id: string;
  titulo: string;
  categoria: CategoriaCorporativa;
  descricao: string;
  conteudo: string;
  palavrasChave: string[];
  atualizadoEm: string; // ISO date (YYYY-MM-DD)
  status: "Ativo";
}
