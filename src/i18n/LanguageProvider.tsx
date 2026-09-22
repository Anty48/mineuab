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
   * Tradueix per camí amb punts, p. ex. t("nav.about"). Si no existeix, retorna la clau.
   * Els marcadors `{nom}` s'omplen amb `vars`: t("x", { count: 3 }).
   */
  t: (path: string, vars?: Record<string, string | number>) => string;
  /** Retorna un node del diccionari tal com és (pot no ser text), p. ex. una llista. */
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

  // Recupera l'idioma desat a localStorage (si no n'hi ha cap, es queda en català).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && LOCALES.includes(stored)) {
        setLocaleState(stored);
      }
    } catch {
      /* emmagatzematge bloquejat (mode privat, galetes restringides) */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* no es desa, però canvia igualment durant aquesta visita */
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
