"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

const CARDS = [
  { key: "what", icon: "🛠️" },
  { key: "why", icon: "💚" },
  { key: "open", icon: "🌍" },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-nosaltres" className="border-t border-zinc-900 py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="section-title">{t("about.title")}</h2>
          <p className="section-subtitle">{t("about.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <div key={c.key} className="card">
              <h3 className="flex items-center gap-3 text-xl font-semibold text-white">
                <span aria-hidden>{c.icon}</span>
                {t(`about.${c.key}.title`)}
              </h3>
              <p className="mt-3 leading-relaxed text-zinc-400">
                {t(`about.${c.key}.body`)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/historia"
          className="group mt-5 flex flex-col gap-8 overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-700/70 via-brand-900/70 to-black p-8 transition-colors hover:border-brand-400/60 md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <h3 className="text-3xl font-bold text-white group-hover:underline">
              {t("history.title")}
            </h3>
            <p className="mt-2 max-w-xl text-lg text-zinc-200">
              {t("history.subtitle")}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-200">
              {t("about.historyCta")}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
          {/* Source is 1200×1000. */}
          <Image
            src="/assets/square_w.png"
            alt=""
            width={144}
            height={120}
            className="h-24 w-auto opacity-90 md:h-28"
          />
        </Link>
      </div>
    </section>
  );
}
