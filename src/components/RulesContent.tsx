"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";

interface RuleSection {
  icon: string;
  title: string;
  rules: readonly string[];
}

export default function RulesContent() {
  const { t, raw } = useLanguage();
  const sections = raw<RuleSection[]>("rules.sections") ?? [];

  // Numbering runs across sections, so "rule 5" always means the same rule.
  const firstNumber: number[] = [];
  sections.forEach((s, i) => {
    firstNumber.push(i === 0 ? 1 : firstNumber[i - 1] + sections[i - 1].rules.length);
  });

  return (
    <>
      <PageHeader
        title={t("rules.title")}
        subtitle={t("rules.subtitle")}
        image="/assets/andana-ferros-soft.jpg"
        narrow
      />

      <section className="py-20 md:py-28">
        <div className="container-page max-w-3xl space-y-6">
          <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm leading-relaxed text-amber-100">
            {t("rules.draftNote")}
          </p>

          {sections.map((section, i) => (
            <div key={section.title} className="card">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
                <span aria-hidden>{section.icon}</span>
                {section.title}
              </h2>
              <ol start={firstNumber[i]} className="mt-6 space-y-4">
                {section.rules.map((rule, j) => (
                  <li key={j} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-300"
                    >
                      {firstNumber[i] + j}
                    </span>
                    <p className="pt-1 leading-relaxed text-zinc-300">{rule}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <p className="leading-relaxed text-zinc-400">{t("rules.sanctions")}</p>
        </div>
      </section>

      <DiscordCta title={t("rules.ctaTitle")} body={t("rules.ctaBody")} />
    </>
  );
}
