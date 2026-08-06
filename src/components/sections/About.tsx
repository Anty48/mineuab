"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

const CARDS = [
  { key: "what", icon: "🛠️" },
  { key: "why", icon: "💚" },
  { key: "how", icon: "🌍" },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-20 py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="section-title text-white">{t("about.title")}</h2>
          <p className="mt-4 text-neutral-400">{t("about.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.key}
              className="card transition-transform duration-200 hover:-translate-y-1 hover:border-brand/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-2xl">
                {c.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">
                {t(`about.${c.key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {t(`about.${c.key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
