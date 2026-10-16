"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
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
      />

      <section className="py-16 md:py-24">
        <div className="container-page max-w-5xl">
          {/* Línia del temps: en pantalles amples, els capítols van alternant a banda i banda. */}
          <ol className="relative">
            <span
              aria-hidden
              className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-ink/15 md:left-1/2"
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
                    className={`absolute left-4 top-7 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-brand-500 md:left-1/2 ${
                      last ? "bg-brand-500" : "bg-paper-50"
                    }`}
                  />
                  <div className={`col-start-2 ${right ? "md:col-start-2" : "md:col-start-1"}`}>
                    <div
                      className={`rounded-2xl border border-ink/10 p-6 ${
                        last ? "bg-ink text-paper" : "bg-paper-50"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          last ? "text-brand-300" : "text-brand-600"
                        }`}
                      >
                        {t("history.chapter", { n: i + 1 })}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold">{c.title}</h2>
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

      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <div className="grid items-center gap-14 rounded-3xl bg-brand-950 px-6 py-14 text-paper sm:px-10 md:py-16 lg:grid-cols-2 lg:px-14">
            <div>
              <h2 className="section-title text-paper">{t("history.ctaTitle")}</h2>
              <p className="section-subtitle text-paper/75">{t("history.ctaBody")}</p>
            </div>
            <ServerCard className="mx-auto lg:mr-0" />
          </div>
        </div>
      </section>
    </>
  );
}
