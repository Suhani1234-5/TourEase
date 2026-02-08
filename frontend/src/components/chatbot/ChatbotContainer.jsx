import { useEffect, useRef, useState } from "react";
import { conversationFlow } from "./conversationFlow";
import { getItinerary } from "./itineraryRules";
import { formatItinerary } from "./itineraryFormatter";

export default function ChatbotContainer({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m your TourEase assistant. Let’s plan your trip step by step."
    }
  ]);

  const chatEndRef = useRef(null);
  const currentStep = conversationFlow[stepIndex];

  // auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // CORE CONVERSATION ENGINE
  useEffect(() => {
    // Ask questions step-by-step
    if (stepIndex < conversationFlow.length) {
      const question = conversationFlow[stepIndex].question;

      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.text === question) return prev;

        return [...prev, { sender: "bot", text: question }];
      });
    }

    // Finished → show itinerary once
    if (stepIndex === conversationFlow.length) {
      setMessages(prev => {
        // prevent duplicate itinerary message
        if (prev.some(m => m.sender === "bot" && m.text.startsWith("✨"))) {
          return prev;
        }

        const itinerary = getItinerary(answers);
        const formatted = formatItinerary(itinerary);

        return [
          ...prev,
          { sender: "bot", text: formatted },
          {
            sender: "bot",
            text: "You can restart and try different preferences 👇"
          }
        ];
      });
    }
  }, [stepIndex, answers]);

  // user selects an option
  function handleOptionClick(option) {
    setAnswers(prev => ({
      ...prev,
      [currentStep.id]: option.value
    }));

    setMessages(prev => [
      ...prev,
      { sender: "user", text: option.label }
    ]);

    setStepIndex(prev => prev + 1);
  }

  // restart flow
  function restartConversation() {
    setStepIndex(0);
    setAnswers({});
    setMessages([
      {
        sender: "bot",
        text: "Hi 👋 I’m your TourEase assistant. Let’s plan your trip step by step."
      }
    ]);
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>TourEase Assistant</span>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="chatbot-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Active conversation options */}
      {stepIndex < conversationFlow.length && currentStep && (
        <div className="chatbot-footer">
          {currentStep.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleOptionClick(opt)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Restart after itinerary */}
      {stepIndex === conversationFlow.length && (
        <div className="chatbot-footer">
          <button className="restart-btn" onClick={restartConversation}>
            🔄 Restart Trip Planning
          </button>
        </div>
      )}
    </div>
  );
}
