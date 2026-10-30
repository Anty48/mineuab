"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";
import { localePath } from "./paths";
import { DEFAULT_LOCALE, Locale, translations } from "./translations";

type Dict = Record<string, unknown>;

interface LanguageContextValue {
  locale: Locale;
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

/** Desa l'idioma que ha triat el visitant amb el selector de la barra. */
export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* no es desa, però l'enllaç el porta igualment a l'altre idioma */
  }
}

function resolvePath(obj: Dict, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Dict)) {
      return (acc as Dict)[key];
    }
    return undefined;
  }, obj);
}

/** L'idioma el diu l'adreça: /create és en català i /es/create en castellà. */
export function LanguageProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const pathname = usePathname();

  // Qui ha triat el castellà i arriba a una adreça en català (l'arrel, un enllaç compartit) hi torna.
  // Només qui ho ha triat al selector: els cercadors i els visitants nous es queden a l'adreça que han obert.
  useEffect(() => {
    if (locale !== DEFAULT_LOCALE) return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "es") {
        const { search, hash } = window.location;
        window.location.replace(localePath(`${pathname}${search}${hash}`, "es"));
      }
    } catch {
      /* emmagatzematge bloquejat (mode privat, galetes restringides) */
    }
  }, [locale, pathname]);

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

  const value = useMemo(() => ({ locale, t, raw }), [locale, t, raw]);

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
