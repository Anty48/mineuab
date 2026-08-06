"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function Disclaimer() {
  const { t } = useLanguage();

  return (
    <section className="py-6">
      <div className="container-page">
        <div
          role="note"
          className="relative overflow-hidden rounded-2xl border border-amber-400/40 bg-amber-400/10 p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-2xl">
              ⚠️
            </div>
            <div>
              <span className="font-pixel text-[10px] uppercase tracking-wide text-amber-300">
                {t("disclaimer.tag")}
              </span>
              <h3 className="mt-1 text-lg font-bold text-amber-100">
                {t("disclaimer.title")}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-amber-50/90">
                {t("disclaimer.body")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
