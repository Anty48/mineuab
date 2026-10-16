"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { MAP_URL } from "@/lib/links";
import PageHeader from "@/components/PageHeader";
import { ArrowIcon } from "@/components/icons";

/** El BlueMap del servidor incrustat a la pàgina, amb un enllaç per obrir-lo sol. */
export default function MapContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader crumb={t("nav.map")} title={t("map.title")} subtitle={t("map.subtitle")} />

      <section className="py-12 md:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-pretty text-ink-600">{t("map.hint")}</p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0 self-start sm:self-auto"
            >
              {t("map.open")}
              <ArrowIcon size={18} />
            </a>
          </div>

          {/* Fons fosc mentre carrega, com el cel del BlueMap. Al mòbil deixem marge
              per sota perquè es pugui fer scroll de la pàgina sense arrossegar el mapa. */}
          <div className="mt-6 border-2 border-ink bg-ink">
            <iframe
              src={MAP_URL}
              title={t("map.frameTitle")}
              allow="fullscreen"
              className="block h-[70vh] min-h-[24rem] w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
