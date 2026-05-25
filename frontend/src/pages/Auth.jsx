import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthBackground from '../components/AuthBackground';
import ChatbotLauncher from '../components/chatbot/ChatbotLauncher';
import LanguageSelector from '../components/LanguageSelector';
import '../styles/auth.css';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signup';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    /* auth-page class sets h-dvh + overflow-hidden — zero scroll guaranteed */
    <div
      className="auth-page w-full bg-gradient-to-br from-slate-100 via-white to-cyan-50 dark:from-[#050816] dark:via-[#0a0f2e] dark:to-[#06091a]"
      style={{ position: 'relative' }}
    >
      {/* Three.js Background — absolutely positioned behind everything */}
      <AuthBackground />

      {/* Main content area — fills remaining height, centres the card */}
      <div className="auth-content-area" style={{ position: 'relative', zIndex: 10 }}>
        <AuthCard initialMode={mode} />
      </div>

      {/* Bottom Utilities — language + chatbot */}
      <div className="auth-bottom-utilities" style={{ zIndex: 20 }}>
        <LanguageSelector />
        <ChatbotLauncher />
      </div>
    </div>
  );
}
