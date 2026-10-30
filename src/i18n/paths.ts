import { DEFAULT_LOCALE, type Locale } from "./translations";

// El català va a l'arrel de la web (/create) i el castellà sota /es (/es/create), amb els mateixos noms.
const ES_PREFIX = "/es";

/** Porta una adreça interna de la web a l'idioma demanat: ("/create", "es") -> "/es/create". */
export function localePath(href: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE || !href.startsWith("/") || href.startsWith("//")) return href;
  // L'arrel no porta barra al final: "/" -> "/es", "/#com-entrar" -> "/es#com-entrar".
  return /^\/($|[?#])/.test(href) ? `${ES_PREFIX}${href.slice(1)}` : `${ES_PREFIX}${href}`;
}

/** Treu l'idioma de l'adreça del navegador: "/es/create" -> "/create", "/es" -> "/". */
export function pathWithoutLocale(pathname: string) {
  if (pathname === ES_PREFIX) return "/";
  return pathname.startsWith(`${ES_PREFIX}/`) ? pathname.slice(ES_PREFIX.length) : pathname;
}
