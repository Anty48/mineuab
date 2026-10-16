"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/translations";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "ca", label: "CAT" },
  { code: "es", label: "ESP" },
];

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("nav.langLabel")}
      className="inline-flex items-center border-2 border-ink bg-paper-50 font-pixel text-[11px]"
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            aria-pressed={active}
            className={`px-2.5 py-1.5 transition-colors ${
              active ? "bg-ink text-paper" : "text-ink-600 hover:bg-paper-200 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
