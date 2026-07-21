import { createFileRoute } from "@tanstack/react-router";
import { ChatWindow } from "@/components/chat/chat-window";
import { getChatMode } from "@/lib/chat-mode";

function getAssistantDescription(): string {
  if (getChatMode() === "api") {
    return "Converse com o assistente corporativo NexaHelp AI e obtenha respostas sobre procedimentos internos e políticas com fontes rastreáveis.";
  }
  return "Converse com o assistente corporativo NexaHelp AI em modo de demonstração, com respostas demonstrativas sobre uma base de conhecimento fictícia.";
}

export const Route = createFileRoute("/assistente")({
  head: () => {
    const description = getAssistantDescription();
    return {
      meta: [
        { title: "Assistente Corporativo — NexaHelp AI" },
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: "Assistente Corporativo — NexaHelp AI" },
        {
          property: "og:description",
          content: description,
        },
      ],
    };
  },
  component: AssistantPage,
});

function AssistantPage() {
  return <ChatWindow />;
}
