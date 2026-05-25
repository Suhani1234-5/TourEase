import { useEffect, useRef, useState } from "react";
import { X, RotateCcw, Send } from "lucide-react";
import "./chatbot.css"; 

export default function ChatbotContainer({ onClose }) {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m your TourEase assistant. How can I help you plan your trip?"
    }
  ]);

  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  // send message to backend
  async function sendMessage() {

    if (!input.trim()) return;

    const userMessage = input;

    // add user message
    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setInput("");

    try {

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await res.json();
      if (!res.ok) {
  throw new Error(data.error);
}

      // add bot response
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: data.response
        }
      ]);

    } catch (error) {

      console.log(error);

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Something went wrong. Please try again."
        }
      ]);
    }
  }

  // restart conversation
  function restartConversation() {

    setMessages([
      {
        sender: "bot",
        text: "Hi 👋 I’m your TourEase assistant. How can I help you plan your trip?"
      }
    ]);

    setInput("");
  }

  // send on enter
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="chatbot-container">

      {/* HEADER */}
      <div className="chatbot-header">
        <span>TourEase Assistant</span>

        <button
          onClick={onClose}
          className="hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* CHAT BODY */}
      <div className="chatbot-body">

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      {/* FOOTER */}
      <div className="chatbot-footer">

        <input
          type="text"
          placeholder="Ask about your trip..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="chat-input"
        />

        <button
          onClick={sendMessage}
          className="send-btn"
        >
          <Send className="w-4 h-4" />
        </button>

        <button
          className="restart-btn flex items-center justify-center gap-2"
          onClick={restartConversation}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}