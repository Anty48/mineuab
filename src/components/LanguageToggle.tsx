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
      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1 text-xs font-bold"
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 transition-colors ${
              active
                ? "bg-brand text-white"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
