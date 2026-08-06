"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

interface EventItem {
  status: "upcoming" | "past";
  date: string;
  title: string;
  body: string;
}

export default function Events() {
  const { t, raw } = useLanguage();
  const items = raw<EventItem[]>("events.items") ?? [];

  return (
    <section id="events" className="scroll-mt-20 py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="section-title text-white">{t("events.title")}</h2>
          <p className="mt-4 text-neutral-400">{t("events.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e, i) => {
            const upcoming = e.status === "upcoming";
            return (
              <article
                key={i}
                className={`card flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
                  upcoming ? "hover:border-brand/40" : "hover:border-white/20"
                }`}
              >
                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    upcoming
                      ? "bg-brand/15 text-brand-200"
                      : "bg-white/10 text-neutral-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      upcoming ? "bg-brand" : "bg-neutral-400"
                    }`}
                  />
                  {upcoming
                    ? t("events.statusUpcoming")
                    : t("events.statusPast")}
                </span>
                <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">
                  {e.date}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {e.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
