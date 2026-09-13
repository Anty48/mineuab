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
        title={t("history.title")}
        subtitle={t("history.subtitle")}
        image="/assets/plaza-civica-soft.jpg"
        narrow
      />

      <section className="py-20 md:py-28">
        <div className="container-page max-w-3xl">
          <ol className="space-y-12">
            {chapters.map((c, i) => {
              const last = i === chapters.length - 1;
              return (
                <li key={i} className="relative grid grid-cols-[2.25rem_1fr] gap-6">
                  {/* Line down to the next chapter's dot. */}
                  {!last && (
                    <span
                      aria-hidden
                      className="absolute -bottom-12 left-[17.5px] top-9 w-px bg-zinc-800"
                    />
                  )}
                  <span
                    aria-hidden
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${
                      last
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-zinc-700 bg-black text-zinc-300"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h2 className="text-2xl font-semibold text-white">{c.title}</h2>
                    <p className="mt-3 text-lg leading-relaxed text-zinc-400">{c.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-zinc-900 py-20 md:py-28">
        <div className="container-page flex flex-col items-center text-center">
          <h2 className="section-title max-w-2xl">{t("history.ctaTitle")}</h2>
          <p className="section-subtitle">{t("history.ctaBody")}</p>
          <ServerCard className="mt-10" />
        </div>
      </section>
    </>
  );
}
