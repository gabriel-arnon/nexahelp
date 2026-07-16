import { History, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ChatConversation } from "@/types/chat";

interface HistoryPanelProps {
  conversations: ChatConversation[];
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}

function titleFor(c: ChatConversation): string {
  const firstUser = c.messages.find((m) => m.role === "user");
  const text = firstUser?.content.trim() ?? "";
  if (!text) return "Conversa sem título";
  return text.length > 60 ? `${text.slice(0, 57)}...` : text;
}

function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryPanel({ conversations, onOpen, onDelete }: HistoryPanelProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <History className="h-4 w-4" aria-hidden />
          Histórico
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Conversas anteriores</SheetTitle>
          <SheetDescription>
            As conversas ficam armazenadas apenas neste navegador.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2 overflow-y-auto pr-1">
          {conversations.length === 0 ? (
            <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Nenhuma conversa anterior.
            </p>
          ) : (
            conversations
              .slice()
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((c) => (
                <div
                  key={c.id}
                  className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(c.id)}
                    className="flex-1 text-left"
                  >
                    <p className="line-clamp-2 text-sm font-medium text-foreground">
                      {titleFor(c)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDateTime(c.updatedAt)} · {c.messages.length}{" "}
                      {c.messages.length === 1 ? "mensagem" : "mensagens"}
                    </p>
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Excluir conversa"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir conversa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. A conversa será removida
                          apenas deste navegador.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(c.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
