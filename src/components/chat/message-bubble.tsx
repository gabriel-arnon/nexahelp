import { AlertCircle, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";
import { SourceList } from "./source-list";

interface MessageBubbleProps {
  message: ChatMessage;
  onOpenSource: (id: string) => void;
  onRetry?: () => void;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessageBubble({ message, onOpenSource, onRetry }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isError = Boolean(message.error);

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
        aria-hidden
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={cn("flex max-w-[85%] flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : isError
                ? "border border-destructive/40 bg-destructive/5 text-foreground rounded-tl-sm"
                : "border border-border bg-card text-card-foreground rounded-tl-sm",
          )}
        >
          {isError && (
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-destructive">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden />
              Ocorreu um erro ao gerar a resposta
            </div>
          )}
          <div className="whitespace-pre-line">{message.content}</div>
          {!isUser && message.fontes && message.fontes.length > 0 && (
            <SourceList ids={message.fontes} onOpen={onOpenSource} />
          )}
          {isError && onRetry && (
            <div className="mt-3">
              <Button size="sm" variant="outline" onClick={onRetry}>
                Tentar novamente
              </Button>
            </div>
          )}
        </div>
        <span className="px-1 text-[11px] text-muted-foreground">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
