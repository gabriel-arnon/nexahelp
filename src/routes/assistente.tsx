import { createFileRoute } from "@tanstack/react-router";
import { ChatWindow } from "@/components/chat/chat-window";

export const Route = createFileRoute("/assistente")({
  head: () => ({
    meta: [
      { title: "Assistente Corporativo — NexaHelp AI" },
      {
        name: "description",
        content:
          "Converse com o assistente corporativo NexaHelp AI e obtenha respostas sobre procedimentos internos, políticas e serviços com fontes rastreáveis.",
      },
      { property: "og:title", content: "Assistente Corporativo — NexaHelp AI" },
      {
        property: "og:description",
        content: "Chat com IA para dúvidas sobre procedimentos e políticas corporativas.",
      },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  return <ChatWindow />;
}
