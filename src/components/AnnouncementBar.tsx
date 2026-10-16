"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** Franja de dalt de tot, a totes les pàgines: encara no som un projecte oficial de la UAB. */
export default function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div role="note" className="bg-terra-600 text-white">
      <div className="container-page flex items-center justify-center gap-3 py-2 text-center text-sm">
        <span className="shrink-0 bg-white px-1.5 py-0.5 font-pixel text-[11px] uppercase leading-none text-terra-600">
          {t("disclaimer.tag")}
        </span>
        <p className="text-pretty">
          <span className="md:hidden">{t("disclaimer.short")}</span>
          <span className="hidden md:inline">{t("disclaimer.body")}</span>
        </p>
      </div>
    </div>
  );
}
