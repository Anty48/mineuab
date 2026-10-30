"use client";

import { usePathname } from "next/navigation";
import { rememberLocale, useLanguage } from "@/i18n/LanguageProvider";
import { localePath, pathWithoutLocale } from "@/i18n/paths";
import type { Locale } from "@/i18n/translations";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "ca", label: "CAT" },
  { code: "es", label: "ESP" },
];

export default function LanguageToggle() {
  const { locale, t } = useLanguage();
  const path = pathWithoutLocale(usePathname());

  return (
    <div
      role="group"
      aria-label={t("nav.langLabel")}
      className="inline-flex items-center border-2 border-ink bg-paper-50 font-pixel text-[11px]"
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.code;
        return (
          // Enllaços de veritat i no botons: així els cercadors troben les dues versions de cada pàgina.
          // Cada idioma té el seu layout arrel, o sigui que canviar-lo sempre recarrega la pàgina.
          <a
            key={opt.code}
            href={localePath(path, opt.code)}
            hrefLang={opt.code}
            aria-current={active ? "true" : undefined}
            onClick={(e) => {
              rememberLocale(opt.code);
              // Es queda al mateix lloc de la pàgina.
              e.currentTarget.search = window.location.search;
              e.currentTarget.hash = window.location.hash;
            }}
            className={`px-2.5 py-1.5 transition-colors ${
              active ? "bg-ink text-paper" : "text-ink-600 hover:bg-paper-200 hover:text-ink"
            }`}
          >
            {opt.label}
          </a>
        );
      })}
    </div>
  );
}
