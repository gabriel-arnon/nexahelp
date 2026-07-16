import { getDocumentById } from "@/lib/knowledge-base";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SourceDialogProps {
  documentId: string | null;
  onOpenChange: (open: boolean) => void;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function SourceDialog({ documentId, onOpenChange }: SourceDialogProps) {
  const open = Boolean(documentId);
  const doc = documentId ? getDocumentById(documentId) : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {doc ? (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{doc.categoria}</Badge>
                <Badge className="border-success/40 bg-success/10 text-success" variant="outline">
                  {doc.status}
                </Badge>
              </div>
              <DialogTitle className="mt-2 text-xl">{doc.titulo}</DialogTitle>
              <DialogDescription>{doc.descricao}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[50vh] pr-4">
              <div className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                {doc.conteudo}
              </div>
            </ScrollArea>
            <p className="text-xs text-muted-foreground">
              Última atualização: {formatDate(doc.atualizadoEm)}
            </p>
          </>
        ) : (
          <DialogHeader>
            <DialogTitle>Documento não encontrado</DialogTitle>
            <DialogDescription>
              O documento solicitado não está disponível na base de conhecimento.
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}
