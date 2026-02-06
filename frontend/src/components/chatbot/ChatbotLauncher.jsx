import { useState } from "react";
import ChatbotContainer from "./ChatbotContainer";
import "./chatbot.css";

export default function ChatbotLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="chatbot-launcher"
        onClick={() => setIsOpen(true)}
        title="Trip Assistant"
      >
        💬
      </div>

      {isOpen && <ChatbotContainer onClose={() => setIsOpen(false)} />}
    </>
  );
}
