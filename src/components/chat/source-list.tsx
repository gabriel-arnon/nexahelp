import { FileText } from "lucide-react";
import { getDocumentById } from "@/lib/knowledge-base";

interface SourceListProps {
  ids: string[];
  onOpen: (id: string) => void;
}

export function SourceList({ ids, onOpen }: SourceListProps) {
  if (!ids || ids.length === 0) return null;
  const docs = ids
    .map((id) => ({ id, doc: getDocumentById(id) }))
    .filter((x) => x.doc);

  if (docs.length === 0) return null;

  return (
    <div className="mt-3 border-t border-border/60 pt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Fontes consultadas
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {docs.map(({ id, doc }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => onOpen(id)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden />
              {doc!.titulo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
