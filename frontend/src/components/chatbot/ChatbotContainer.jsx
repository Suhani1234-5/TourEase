import { useEffect, useRef, useState } from "react";
import { X, RotateCcw, Send, Mic } from "lucide-react";
import "./chatbot.css"; 

export default function ChatbotContainer({ onClose, lang }) {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m your TourEase assistant. How can I help you plan your trip?"
    }
  ]);

  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  /* ==========================================================
     🎙️ DYNAMIC SPEECH RECOGNITION LANGUAGE LOGIC
     ========================================================== */
  function handleVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Brave!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // 1. Check if a lang prop exists, or fallback to the browser's document language tag
    const activeLanguage = lang || document.documentElement.lang || "en";

    // 2. Map the active website toggle to the correct regional speech language code
    if (activeLanguage.toLowerCase().includes("hi")) {
      recognition.lang = "hi-IN"; // Sets voice input to Devanagari Hindi Script
    } else {
      recognition.lang = "en-IN"; // Sets voice input to Latin Script (Indian English accent)
    }

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); // Updates your chat text box dynamically with the voice text
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error: ", error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }
  /* ========================================================== */

  // Send message to backend
  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;

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

  // Restart conversation
  function restartConversation() {
    setMessages([
      {
        sender: "bot",
        text: "Hi 👋 I’m your TourEase assistant. How can I help you plan your trip?"
      }
    ]);
    setInput("");
  }

  // Send message on Enter keypress
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

        {/* Microphone Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`mic-btn flex items-center justify-center p-2 rounded-full transition-all ${
            isListening ? "bg-red-500 animate-pulse text-white" : "hover:bg-gray-100 text-gray-600"
          }`}
          title="Speak into microphone"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder={isListening ? "Listening..." : "Ask about your trip..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="chat-input"
          disabled={isListening}
        />

        <button
          onClick={sendMessage}
          className="send-btn"
          disabled={isListening}
        >
          <Send className="w-4 h-4" />
        </button>

        <button
          className="restart-btn flex items-center justify-center gap-2"
          onClick={restartConversation}
          disabled={isListening}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}