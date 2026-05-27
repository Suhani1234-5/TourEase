import React, { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const LANGUAGE_STORAGE_KEY = "tourease_language";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "hi", label: "HI", name: "Hindi" },
];

function getStoredLanguage() {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  // Default to English — only switch if user explicitly chose Hindi
  return saved === 'hi' ? 'hi' : 'en';
}

// Clear / set the googtrans cookie that Google Translate reads on load
function setGoogTransCookie(language) {
  const hostname = globalThis.location.hostname;
  if (language === "en") {
    // Delete the cookie on all possible paths/domains
    document.cookie = "googtrans=; path=/; max-age=0";
    document.cookie = `googtrans=; path=/; max-age=0; domain=${hostname}`;
    document.cookie = `googtrans=; path=/; max-age=0; domain=.${hostname}`;
  } else {
    const value = `/en/${language}`;
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}`;
    if (hostname.includes(".")) {
      document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}; domain=.${hostname}`;
    }
  }
}

// Wait for the Google Translate combo select to be populated, then switch it
function applyViaSelect(language, attempts = 0) {
  const select = document.querySelector(".goog-te-combo");

  if (select && select.options.length > 0) {
    const available = Array.from(select.options).map((o) => o.value);

    // Pick the right option value:
    // - For Hindi: "hi"
    // - For English: try "en" if it exists (because includedLanguages has "en"),
    //   otherwise fall back to "" which means "show original"
    let targetValue;
    if (language === "en") {
      targetValue = available.includes("en") ? "en" : "";
    } else {
      targetValue = language;
    }

    select.value = targetValue;
    select.dispatchEvent(new Event("change"));
    return;
  }

  if (attempts < 40) {
    setTimeout(() => applyViaSelect(language, attempts + 1), 250);
  }
}

function applyLanguage(language) {
  // Always sync the cookie too, so reloads respect the choice
  setGoogTransCookie(language);

  // Try doGTranslate (Google's own API) first
  if (typeof globalThis.doGTranslate === "function") {
    try {
      globalThis.doGTranslate(language === "en" ? "en|en" : `en|${language}`);
      return;
    } catch (error) {
      console.error("Translation error:", error);
    }
  }

  // Fallback: manipulate the hidden combo select directly
  applyViaSelect(language);
}

export default function LanguageSelector() {
  const [activeLanguage, setActiveLanguage] = useState('en');

  // On mount: always reset to English — clear any stale Hindi stored state/cookies
  useEffect(() => {
    // Reset storage and cookie to English on every page load
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
    setGoogTransCookie('en');

    const timer = setTimeout(() => {
      applyLanguage('en');
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = (language) => {
    if (activeLanguage === language) return;
    setActiveLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    applyLanguage(language);
  };

  return (
    <div className="lang-fab-wrapper">
      <Languages className="lang-fab-icon" aria-hidden="true" />
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => handleLanguageChange(language.code)}
          title={language.name}
          aria-pressed={activeLanguage === language.code}
          className={`lang-fab-btn ${activeLanguage === language.code ? "lang-fab-btn--active" : ""}`}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}

