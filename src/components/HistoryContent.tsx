"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PHOTOS } from "@/lib/gallery";
import PageHeader from "@/components/PageHeader";
import ServerCard from "@/components/ServerCard";

interface Chapter {
  title: string;
  body: string;
}

export default function HistoryContent() {
  const { t, raw } = useLanguage();
  const chapters = raw<Chapter[]>("history.chapters") ?? [];

  return (
    <>
      <PageHeader
        crumb={t("nav.history")}
        title={t("history.title")}
        subtitle={t("history.subtitle")}
        image={PHOTOS.placaCivicaPluja}
        caption={t("gallery.items.rain")}
      />

      <section className="py-16 md:py-24">
        <div className="container-page max-w-5xl">
          {/* Línia del temps: en pantalles amples, els capítols van alternant a banda i banda. */}
          <ol className="relative">
            <span
              aria-hidden
              className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 bg-ink md:left-1/2"
            />
            {chapters.map((c, i) => {
              const last = i === chapters.length - 1;
              const right = i % 2 === 1;
              return (
                <li
                  key={i}
                  className="relative grid grid-cols-[2rem_1fr] gap-6 pb-12 last:pb-0 md:grid-cols-2 md:gap-20 md:[&:not(:first-child)]:-mt-16"
                >
                  <span
                    aria-hidden
                    className={`absolute left-4 top-7 h-5 w-5 -translate-x-1/2 border-2 border-ink md:left-1/2 ${
                      last ? "bg-brand-500" : "bg-paper-50"
                    }`}
                  />
                  <div className={`col-start-2 ${right ? "md:col-start-2" : "md:col-start-1"}`}>
                    <div
                      className={`border-2 border-ink p-6 ${
                        last ? "bg-ink text-paper shadow-block-brand" : "bg-paper-50 shadow-block"
                      }`}
                    >
                      <p
                        className={`font-pixel text-[11px] uppercase ${
                          last ? "text-brand-300" : "text-brand-600"
                        }`}
                      >
                        {t("history.chapter", { n: i + 1 })}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-extrabold">{c.title}</h2>
                      <p className={`mt-2 leading-relaxed ${last ? "text-paper/80" : "text-ink-600"}`}>
                        {c.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="edge-top bg-brand-950 py-20 text-paper [--edge:#022112] md:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="section-title text-paper">{t("history.ctaTitle")}</h2>
            <p className="section-subtitle text-paper/75">{t("history.ctaBody")}</p>
          </div>
          <ServerCard className="mx-auto lg:mr-0" />
        </div>
      </section>
    </>
  );
}
