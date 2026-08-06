"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

interface Milestone {
  date: string;
  title: string;
  body: string;
}

export default function History() {
  const { t, raw } = useLanguage();
  const milestones = raw<Milestone[]>("history.milestones") ?? [];

  return (
    <section id="history" className="scroll-mt-20 py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="section-title text-white">{t("history.title")}</h2>
          <p className="mt-4 text-neutral-400">{t("history.subtitle")}</p>
        </div>

        <ol className="relative mt-12 border-l border-white/10 pl-8">
          {milestones.map((m, i) => (
            <li key={i} className="mb-10 last:mb-0">
              <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-neutral-950 bg-brand" />
              <span className="font-pixel text-[10px] uppercase tracking-wide text-brand-300">
                {m.date}
              </span>
              <h3 className="mt-2 text-lg font-bold text-white">{m.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">
                {m.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
