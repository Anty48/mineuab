"use client";

import Link from "@/i18n/LocaleLink";
import { useLanguage } from "@/i18n/LanguageProvider";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";
import { ArrowIcon, PixelStarIcon } from "@/components/icons";

interface RuleSection {
  title: string;
  rules: readonly string[];
  /** Pàgina que ho explica més a fons, al final de la secció. */
  link?: { label: string; title: string; href: string };
}

export default function RulesContent() {
  const { t, raw } = useLanguage();
  const sections = raw<RuleSection[]>("rules.sections") ?? [];
  const steps = raw<string[]>("rules.sanctionSteps") ?? [];

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
          <div className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={t("rules.index")}>
              <p className="eyebrow">{t("rules.index")}</p>
              <ol className="mt-4 border-2 border-ink bg-paper-50">
                {sections.map((section, i) => (
                  <li key={section.title} className="border-b-2 border-ink">
                    <a
                      href={`#normes-${i + 1}`}
                      className="flex items-center gap-3 px-4 py-3 font-semibold transition-colors hover:bg-brand-600 hover:text-white"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#sancions"
                    className="flex items-center gap-3 px-4 py-3 font-semibold transition-colors hover:bg-brand-600 hover:text-white"
                  >
                    {t("rules.sanctionsTitle")}
                  </a>
                </li>
              </ol>
            </nav>
            <p className="mt-6 border-l-4 border-terra-500 bg-terra-100 px-4 py-3 text-sm leading-relaxed text-ink-700">
              {t("rules.note")}
            </p>
          </div>

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
                {section.link && (
                  <Link
                    href={section.link.href}
                    className="group mt-6 flex items-center gap-4 border-2 border-ink bg-paper-50 p-4 shadow-block-sm transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-block sm:p-5"
                  >
                    <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink">
                      <PixelStarIcon size={26} className="text-[#f2c94c]" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-pixel text-[10px] uppercase text-brand-600">
                        {section.link.label}
                      </span>
                      <span className="mt-1 block font-display text-xl font-extrabold">
                        {section.link.title}
                      </span>
                    </span>
                    <ArrowIcon size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
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
              {/* L'escala de sancions, de la més lleu a la més greu. */}
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 border-2 border-paper/20 px-4 py-3">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-600 font-pixel text-sm text-white"
                    >
                      {i + 1}
                    </span>
                    <span className="font-semibold">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 leading-relaxed text-paper/85">{t("rules.sanctionsSevere")}</p>
              <p className="mt-4 border-t-2 border-paper/15 pt-4 leading-relaxed text-paper/75">
                {t("rules.appeal")}
              </p>
            </section>
          </div>
        </div>
      </section>

      <DiscordCta title={t("rules.ctaTitle")} body={t("rules.ctaBody")} />
    </>
  );
}
