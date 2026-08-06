"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  Locale,
  LOCALES,
  translations,
} from "./translations";

type Dict = Record<string, unknown>;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** Translate by dot-path, e.g. t("nav.about"). Returns the key if missing. */
  t: (path: string) => string;
  /** Return a raw (possibly non-string) node from the dictionary, e.g. arrays. */
  raw: <T = unknown>(path: string) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "mineuab.locale";

function resolvePath(obj: Dict, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Dict)) {
      return (acc as Dict)[key];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage (Catalan stays the default if nothing stored).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && LOCALES.includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "ca" ? "es" : "ca");
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (path: string) => {
      const value = resolvePath(translations[locale] as Dict, path);
      return typeof value === "string" ? value : path;
    },
    [locale],
  );

  const raw = useCallback(
    <T,>(path: string) =>
      resolvePath(translations[locale] as Dict, path) as T,
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t, raw }),
    [locale, setLocale, toggle, t, raw],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
