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
  /**
   * Translate by dot-path, e.g. t("nav.about"). Returns the key if missing.
   * `{name}` placeholders are filled from `vars`: t("x", { count: 3 }).
   */
  t: (path: string, vars?: Record<string, string | number>) => string;
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
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && LOCALES.includes(stored)) {
        setLocaleState(stored);
      }
    } catch {
      /* storage blocked (private mode, strict cookie settings) */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* not persisted, but still switches for this visit */
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "ca" ? "es" : "ca");
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const value = resolvePath(translations[locale] as Dict, path);
      if (typeof value !== "string") return path;
      if (!vars) return value;
      return value.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in vars ? String(vars[name]) : match,
      );
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
