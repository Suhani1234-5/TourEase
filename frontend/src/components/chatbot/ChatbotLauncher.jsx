import { useState } from "react";
import ChatbotContainer from "./ChatbotContainer";
import { MessageSquare } from "lucide-react";
import "./chatbot.css";

export default function ChatbotLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="chatbot-launcher flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        title="Trip Assistant"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </div>

      {isOpen && <ChatbotContainer onClose={() => setIsOpen(false)} />}
    </>
  );
}
