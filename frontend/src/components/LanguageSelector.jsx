import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";

const LANGUAGE_STORAGE_KEY = "tourease_language";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "ja", label: "JA", name: "日本語" },
  { code: "ko", label: "KO", name: "한국어" },
  { code: "zh-CN", label: "ZH", name: "中文" },
  { code: "hi", label: "HI", name: "Hindi" },
];

function setGoogTransCookie(language) {
  const hostname = globalThis.location.hostname;

  if (language === "en") {
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

function applyViaSelect(language, attempts = 0) {
  const select = document.querySelector(".goog-te-combo");

  if (select && select.options.length > 0) {
    const available = Array.from(select.options).map(
      (option) => option.value
    );

    const targetValue =
      language === "en"
        ? available.includes("en")
          ? "en"
          : ""
        : language;

    select.value = targetValue;
    select.dispatchEvent(new Event("change"));

    return;
  }

  if (attempts < 40) {
    setTimeout(() => {
      applyViaSelect(language, attempts + 1);
    }, 250);
  }
}

function applyLanguage(language) {
  setGoogTransCookie(language);

  if (typeof globalThis.doGTranslate === "function") {
    try {
      globalThis.doGTranslate(
        language === "en" ? "en|en" : `en|${language}`
      );

      return;
    } catch (error) {
      console.error("Translation error:", error);
    }
  }

  applyViaSelect(language);
}

export default function LanguageSelector({
  variant = "floating",
  className = "",
}) {
  const [activeLanguage, setActiveLanguage] = useState(() => {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
  });

  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef(null);

  const isInline = variant === "inline";


  // Aplica idioma salvo ao carregar
  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";

    setActiveLanguage(savedLanguage);
    applyLanguage(savedLanguage);
  }, []);


  // Atualiza idioma sempre que mudar
  useEffect(() => {
    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      activeLanguage
    );

    applyLanguage(activeLanguage);
  }, [activeLanguage]);


  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleDocumentClick
    );

    document.addEventListener(
      "touchstart",
      handleDocumentClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {
      document.removeEventListener(
        "mousedown",
        handleDocumentClick
      );

      document.removeEventListener(
        "touchstart",
        handleDocumentClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  const handleLanguageChange = (language) => {
    if (activeLanguage === language) {
      return;
    }

    setActiveLanguage(language);

    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language
    );

    applyLanguage(language);

    setIsOpen(false);
  };


  if (isInline) {
    return (
      <div
        ref={rootRef}
        className={`relative ${className}`}
        translate="no"
      >
        <button
          type="button"
          onClick={() =>
            setIsOpen((current) => !current)
          }
          className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-sm font-semibold"
        >
          <Languages className="h-4 w-4" />

          <span>
            {activeLanguage.toUpperCase()}
          </span>

          <ChevronDown
            className={`h-4 w-4 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>


        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border bg-white shadow-xl">

            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() =>
                  handleLanguageChange(language.code)
                }
                className={`flex w-full justify-between px-3 py-2 text-sm ${
                  activeLanguage === language.code
                    ? "bg-teal-100"
                    : ""
                }`}
              >
                <span>
                  {language.name}
                </span>

                <span>
                  {language.label}
                </span>
              </button>
            ))}

          </div>
        )}

      </div>
    );
  }


  return (
    <div
      className="lang-fab-wrapper"
      translate="no"
    >

      <Languages />

      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() =>
            handleLanguageChange(language.code)
          }
          className={`lang-fab-btn ${
            activeLanguage === language.code
              ? "lang-fab-btn--active"
              : ""
          }`}
        >
          {language.label}
        </button>
      ))}

    </div>
  );
}