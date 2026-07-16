import { Loader2, MessageSquarePlus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { useChatSession } from "@/hooks/use-chat-session";
import { getChatMode } from "@/lib/chat-mode";
import { askAssistant } from "@/services/chat-service";
import type { ChatMessage } from "@/types/chat";
import { Composer } from "./composer";
import { HistoryPanel } from "./history-panel";
import { MessageBubble } from "./message-bubble";
import { ModeBadge, ModeNotice } from "./mode-badge";
import { SourceDialog } from "./source-dialog";
import { SuggestedQuestions } from "./suggested-questions";

export function ChatWindow() {
  const {
    current,
    archive,
    hydrated,
    appendMessage,
    updateMessage,
    startNewConversation,
    openConversation,
    deleteConversation,
    clearAllHistory,
    makeId,
  } = useChatSession();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sourceId, setSourceId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inFlightRef = useRef<string | null>(null);

  const messages = current.messages;
  const isApi = getChatMode() === "api";

  // Autoscroll on new messages / loading state
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Keep focus on textarea
  useEffect(() => {
    if (!loading) textareaRef.current?.focus();
  }, [loading, current.id]);

  const send = useCallback(
    async (rawQuestion: string) => {
      const question = rawQuestion.trim();
      if (!question) return;
      if (question.length > 1000) return;
      if (loading) return;
      if (inFlightRef.current === question) return; // dedupe
      inFlightRef.current = question;

      const userMsg: ChatMessage = {
        id: makeId(),
        role: "user",
        content: question,
        createdAt: Date.now(),
      };
      appendMessage(userMsg);
      setInput("");
      setLoading(true);

      const assistantId = makeId();
      try {
        const res = await askAssistant({
          pergunta: question,
          historico: [...messages, userMsg],
        });
        appendMessage({
          id: assistantId,
          role: "assistant",
          content: res.resposta,
          fontes: res.fontes,
          createdAt: Date.now(),
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Não foi possível gerar a resposta. Tente novamente.";
        appendMessage({
          id: assistantId,
          role: "assistant",
          content: message,
          createdAt: Date.now(),
          error: true,
        });
      } finally {
        setLoading(false);
        inFlightRef.current = null;
      }
    },
    [appendMessage, loading, makeId, messages],
  );

  const handleRetry = useCallback(() => {
    // Find last user message and last assistant error message; remove the error and resend.
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    if (lastAssistant && lastAssistant.error) {
      updateMessage(lastAssistant.id, (m) => ({ ...m, content: "..." }));
    }
    // Re-send by calling service directly (do not duplicate the user message)
    setLoading(true);
    inFlightRef.current = lastUser.content;
    askAssistant({ pergunta: lastUser.content, historico: messages })
      .then((res) => {
        if (lastAssistant) {
          updateMessage(lastAssistant.id, (m) => ({
            ...m,
            content: res.resposta,
            fontes: res.fontes,
            error: false,
            createdAt: Date.now(),
          }));
        } else {
          appendMessage({
            id: makeId(),
            role: "assistant",
            content: res.resposta,
            fontes: res.fontes,
            createdAt: Date.now(),
          });
        }
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Falha ao gerar a resposta.";
        if (lastAssistant) {
          updateMessage(lastAssistant.id, (m) => ({
            ...m,
            content: message,
            error: true,
            createdAt: Date.now(),
          }));
        }
      })
      .finally(() => {
        setLoading(false);
        inFlightRef.current = null;
      });
  }, [appendMessage, makeId, messages, updateMessage]);

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-4xl flex-col gap-4 px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Assistente Corporativo
              </h1>
              <ModeBadge />
            </div>
            <p className="text-sm text-muted-foreground">
              {isApi
                ? "Responde com base em procedimentos internos, políticas e serviços corporativos da empresa."
                : "Modo de demonstração com respostas demonstrativas sobre documentos corporativos simulados."}
            </p>
            <ModeNotice />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <HistoryPanel
              conversations={archive}
              onOpen={openConversation}
              onDelete={deleteConversation}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={startNewConversation}
              className="gap-1.5"
              disabled={loading}
            >
              <MessageSquarePlus className="h-4 w-4" aria-hidden />
              Nova conversa
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={loading}
                  className="gap-1.5 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  Limpar histórico
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Limpar histórico?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Todas as conversas armazenadas neste navegador (atual e anteriores) serão
                    removidas definitivamente. Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllHistory}>Limpar tudo</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-busy={loading}
        aria-label="Histórico da conversa"
        className="flex-1 overflow-y-auto rounded-xl border border-border bg-muted/30 p-4"
      >
        {!hydrated ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Carregando conversa...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col justify-center gap-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground">Como posso ajudar hoje?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Escolha uma pergunta sugerida ou digite sua dúvida abaixo.
              </p>
            </div>
            <SuggestedQuestions
              onPick={(q) => void send(q)}
              disabled={loading}
              className="mx-auto max-w-2xl"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onOpenSource={setSourceId}
                onRetry={m.error ? handleRetry : undefined}
              />
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {isApi
                  ? "Consultando base de conhecimento..."
                  : "Consultando base de conhecimento fictícia..."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <Composer
        ref={textareaRef}
        value={input}
        onChange={setInput}
        onSubmit={() => void send(input)}
        disabled={!hydrated}
        loading={loading}
      />

      <SourceDialog documentId={sourceId} onOpenChange={(open) => !open && setSourceId(null)} />
    </div>
  );
}
