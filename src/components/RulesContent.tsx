"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";

interface RuleSection {
  title: string;
  rules: readonly string[];
}

export default function RulesContent() {
  const { t, raw } = useLanguage();
  const sections = raw<RuleSection[]>("rules.sections") ?? [];

  // La numeració continua entre seccions, així "la norma 5" sempre és la mateixa.
  const firstNumber: number[] = [];
  sections.forEach((s, i) => {
    firstNumber.push(i === 0 ? 1 : firstNumber[i - 1] + sections[i - 1].rules.length);
  });

  return (
    <>
      <PageHeader
        crumb={t("nav.rules")}
        title={t("rules.title")}
        subtitle={t("rules.subtitle")}
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-16">
          {/* Índex enganxat al costat mentre llegeixes. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={t("rules.index")}>
              <p className="eyebrow">{t("rules.index")}</p>
              <ol className="mt-4 border-2 border-ink bg-paper-50">
                {sections.map((section, i) => (
                  <li key={section.title} className="border-b-2 border-ink">
                    <a
                      href={`#normes-${i + 1}`}
                      className="flex items-center gap-3 px-4 py-3 font-semibold transition-colors hover:bg-brand-500 hover:text-white"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#sancions"
                    className="flex items-center gap-3 px-4 py-3 font-semibold transition-colors hover:bg-brand-500 hover:text-white"
                  >
                    {t("rules.sanctionsTitle")}
                  </a>
                </li>
              </ol>
            </nav>
            <p className="mt-6 border-l-4 border-terra-500 bg-terra-100 px-4 py-3 text-sm leading-relaxed text-ink-700">
              {t("rules.draftNote")}
            </p>
          </aside>

          <div className="space-y-14">
            {sections.map((section, i) => (
              <section key={section.title} id={`normes-${i + 1}`}>
                <h2 className="border-b-2 border-ink pb-3 font-display text-3xl font-extrabold">
                  {section.title}
                </h2>
                <ol start={firstNumber[i]}>
                  {section.rules.map((rule, j) => (
                    <li
                      key={j}
                      className="grid grid-cols-[3.25rem_1fr] gap-4 border-b-2 border-dashed border-ink/20 py-5"
                    >
                      <span aria-hidden className="pt-1 font-pixel text-xl text-brand-600">
                        {String(firstNumber[i] + j).padStart(2, "0")}
                      </span>
                      <p className="text-lg leading-relaxed text-ink-700">{rule}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            <section
              id="sancions"
              className="border-2 border-ink bg-ink p-6 text-paper md:p-8"
            >
              <h2 className="font-pixel text-sm uppercase text-brand-300">
                {t("rules.sanctionsTitle")}
              </h2>
              <p className="mt-3 text-lg leading-relaxed">{t("rules.sanctions")}</p>
            </section>
          </div>
        </div>
      </section>

      <DiscordCta title={t("rules.ctaTitle")} body={t("rules.ctaBody")} />
    </>
  );
}
