import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";

const LANGUAGE_STORAGE_KEY = "tourease_language";

const languages = [
 { code:"en", label:"EN", name:"English"},
 { code:"pt", label:"PT", name:"Português"},
 { code:"es", label:"ES", name:"Español"},
 { code:"fr", label:"FR", name:"Français"},
 { code:"de", label:"DE", name:"Deutsch"},
 { code:"it", label:"IT", name:"Italiano"},
 { code:"ja", label:"JA", name:"日本語"},
 { code:"ko", label:"KO", name:"한국어"},
 { code:"zh-CN", label:"ZH", name:"中文"},
 { code:"hi", label:"HI", name:"Hindi"},
];

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

export default function LanguageSelector({ variant = "floating", className = "" }) {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const isInline = variant === "inline";

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage);
    applyLanguage(activeLanguage);
  }, [activeLanguage]);

  // Reset to English on every page load before Google Translate can restore Hindi
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, "en");
    setActiveLanguage("en");
    setGoogTransCookie("en");

    const timer = setTimeout(() => {
      applyLanguage("en");
    }, 1000);
    return () => clearTimeout(timer);
     
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchstart", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("touchstart", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLanguageChange = (language) => {
    if (activeLanguage === language) return;
    setActiveLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    applyLanguage(language);
    setIsOpen(false);
  };

  if (isInline) {
    return (
      <div ref={rootRef} className={`relative ${className}`} translate="no">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 px-2.5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm backdrop-blur-sm transition-all hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:shadow-md"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden 2xl:inline">{activeLanguage.toUpperCase()}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          <span className="sr-only">Change language</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900" translate="no">
            <div className="p-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageChange(language.code)}
                  translate="no"
                  className={`notranslate flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${activeLanguage === language.code ? "bg-teal-50 text-teal-700 dark:bg-teal-500/20 dark:text-teal-200" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"}`}
                  role="menuitemradio"
                  aria-checked={activeLanguage === language.code}
                >
                  <span>{language.name}</span>
                  <span className="text-xs tracking-[0.2em] text-gray-500 dark:text-gray-400">{language.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="lang-fab-wrapper" translate="no">
      <Languages className="lang-fab-icon" aria-hidden="true" />
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => handleLanguageChange(language.code)}
          translate="no"
          className={`notranslate lang-fab-btn ${activeLanguage === language.code ? "lang-fab-btn--active" : ""}`}
          title={language.name}
          aria-pressed={activeLanguage === language.code}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}

