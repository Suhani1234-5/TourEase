import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { LANGUAGES, useLanguage } from "../context/LanguageContext";

/**
 * LanguageSelector (inline only)
 *
 * Reads and writes language via the shared LanguageContext so every instance
 * on the page stays in perfect sync.
 *
 * Props:
 *   className – extra classes for the wrapper div
 */
export default function LanguageSelector({ className = "" }) {
  const { activeLanguage, setActiveLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const activeLang = LANGUAGES.find((l) => l.code === activeLanguage) ?? LANGUAGES[0];

  // ── Close on outside click / Escape ────────────────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ── Handler ────────────────────────────────────────────────────────────────
  const handleLanguageChange = useCallback(
    (code) => {
      setActiveLanguage(code);
      setIsOpen(false);
    },
    [setActiveLanguage],
  );

  return (
    <div ref={rootRef} className={`relative ${className}`} translate="no">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="notranslate inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 px-2 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm backdrop-blur-sm transition-all hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:shadow-md select-none whitespace-nowrap"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Change language"
        title={`Language: ${activeLang.name}`}
      >
        <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="notranslate">{activeLang.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full z-[9999] mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900"
          translate="no"
          role="menu"
        >
          <div className="max-h-72 overflow-y-auto p-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                translate="no"
                className={`notranslate flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeLanguage === lang.code
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-500/20 dark:text-teal-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
                role="menuitemradio"
                aria-checked={activeLanguage === lang.code}
              >
                <span className="font-medium">{lang.name}</span>
                <span className="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
