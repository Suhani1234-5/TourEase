import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ─── Language Configuration ────────────────────────────────────────────────────
// Single source of truth — edit this array to add/remove languages.

export const LANGUAGE_STORAGE_KEY = "tourease_language";

export const LANGUAGES = [
  { code: "en",    name: "English",              nativeName: "English",        label: "EN" },
  { code: "hi",    name: "Hindi",                nativeName: "हिन्दी",           label: "HI" },
  { code: "kn",    name: "Kannada",              nativeName: "ಕನ್ನಡ",            label: "KN" },
  { code: "ta",    name: "Tamil",                nativeName: "தமிழ்",            label: "TA" },
  { code: "te",    name: "Telugu",               nativeName: "తెలుగు",           label: "TE" },
  { code: "ml",    name: "Malayalam",            nativeName: "മലയാളം",          label: "ML" },
  { code: "mr",    name: "Marathi",              nativeName: "मराठी",            label: "MR" },
  { code: "bn",    name: "Bengali",              nativeName: "বাংলা",            label: "BN" },
  { code: "gu",    name: "Gujarati",             nativeName: "ગુજરાતી",         label: "GU" },
  { code: "pa",    name: "Punjabi",              nativeName: "ਪੰਜਾਬੀ",          label: "PA" },
  { code: "ur",    name: "Urdu",                 nativeName: "اردو",             label: "UR" },
  { code: "fr",    name: "French",               nativeName: "Français",         label: "FR" },
  { code: "de",    name: "German",               nativeName: "Deutsch",          label: "DE" },
  { code: "es",    name: "Spanish",              nativeName: "Español",          label: "ES" },
  { code: "pt",    name: "Portuguese",           nativeName: "Português",        label: "PT" },
  { code: "it",    name: "Italian",              nativeName: "Italiano",         label: "IT" },
  { code: "ja",    name: "Japanese",             nativeName: "日本語",            label: "JA" },
  { code: "ko",    name: "Korean",               nativeName: "한국어",            label: "KO" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "中文 (简体)",       label: "ZH" },
  { code: "ar",    name: "Arabic",               nativeName: "العربية",          label: "AR" },
  { code: "ru",    name: "Russian",              nativeName: "Русский",          label: "RU" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch {
    // localStorage unavailable
  }
  return "en";
}

function persistLanguage(code) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    // ignore
  }
}

function setGoogTransCookie(code) {
  const hostname = globalThis.location?.hostname ?? "";
  if (code === "en") {
    document.cookie = "googtrans=; path=/; max-age=0";
    document.cookie = `googtrans=; path=/; max-age=0; domain=${hostname}`;
    document.cookie = `googtrans=; path=/; max-age=0; domain=.${hostname}`;
  } else {
    const value = `/en/${code}`;
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}`;
    if (hostname.includes(".")) {
      document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}; domain=.${hostname}`;
    }
  }
}

function applyViaSelect(code, attempt = 0, maxAttempts = 40) {
  const select = document.querySelector(".goog-te-combo");
  if (select && select.options.length > 0) {
    const available = Array.from(select.options).map((o) => o.value);
    const targetValue = code === "en" ? (available.includes("en") ? "en" : "") : code;
    if (select.value === targetValue) return;
    select.value = targetValue;
    select.dispatchEvent(new Event("change"));
    return;
  }
  if (attempt < maxAttempts) {
    setTimeout(() => applyViaSelect(code, attempt + 1, maxAttempts), 250);
  }
}

function applyLanguage(code) {
  setGoogTransCookie(code);
  if (typeof globalThis.doGTranslate === "function") {
    try {
      globalThis.doGTranslate(code === "en" ? "en|en" : `en|${code}`);
      return;
    } catch (err) {
      console.warn("[LanguageContext] doGTranslate failed, falling back:", err);
    }
  }
  applyViaSelect(code);
}

// ─── Context ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext(null);

/**
 * Wrap your app with this provider so all LanguageSelector instances
 * share a single language state (no more out-of-sync dropdowns).
 */
export function LanguageProvider({ children }) {
  const [activeLanguage, setActiveLanguageState] = useState(getStoredLanguage);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the first render — index.html already set the cookie and Google
    // Translate restores the language automatically on load.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    persistLanguage(activeLanguage);
    applyLanguage(activeLanguage);
  }, [activeLanguage]);

  const setActiveLanguage = useCallback(
    (code) => {
      if (code === activeLanguage) return;
      setActiveLanguageState(code);
    },
    [activeLanguage],
  );

  return (
    <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Consume the shared language state inside any component. */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
