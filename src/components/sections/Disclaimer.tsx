"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function Disclaimer() {
  const { t } = useLanguage();

  return (
    // Pulled up so it overlaps the bottom edge of the banner.
    <section className="container-page relative z-10 -mt-12">
      <div
        role="note"
        className="mx-auto flex max-w-4xl items-start gap-4 rounded-3xl border border-amber-500/40 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur sm:items-center sm:gap-5 sm:p-8"
      >
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-2xl"
        >
          ⚠️
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            {t("disclaimer.tag")}
          </p>
          <p className="mt-1 text-zinc-100 sm:text-lg">{t("disclaimer.body")}</p>
        </div>
      </div>
    </section>
  );
}
