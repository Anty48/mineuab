"use client";

import Link from "@/i18n/LocaleLink";
import { useLanguage } from "@/i18n/LanguageProvider";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";
import { ArrowIcon } from "@/components/icons";
import PactStars from "@/components/PactStars";

interface Level {
  name: string;
  body: string;
}

interface Step {
  label: string;
  title: string;
  body: string;
  facts: readonly string[];
  code: readonly string[];
}

interface Fact {
  title: string;
  body: string;
}

interface Command {
  cmd: string;
  what: string;
}

export default function StarsContent() {
  const { t, raw } = useLanguage();
  const intro = raw<string[]>("stars.intro") ?? [];
  const levels = raw<Level[]>("stars.levels") ?? [];
  const steps = [raw<Step>("stars.climb"), raw<Step>("stars.retreat")].filter(Boolean);
  const combat = raw<Fact[]>("stars.combat") ?? [];
  const bases = raw<string[]>("stars.bases") ?? [];
  const commands = raw<Command[]>("stars.commands") ?? [];

  return (
    <>
      <PageHeader crumb={t("nav.stars")} title={t("stars.title")} subtitle={t("stars.subtitle")} />

      {/* La regla, que és tot el sistema. */}
      <section className="py-16 md:py-24">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {intro.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-ink-700 first:mt-0 md:text-xl">
                {p}
              </p>
            ))}
            <p className="field-label mt-8">{t("stars.commandHint")}</p>
            <code className="code-line mt-2 w-fit">/estrelles</code>
          </div>

          <div className="border-2 border-ink bg-ink p-6 text-paper shadow-block md:p-8">
            <p className="font-pixel text-sm uppercase text-brand-300">{t("stars.ruleLabel")}</p>
            <p className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight md:text-4xl">
              {t("stars.rule")}
            </p>
            <p className="mt-4 leading-relaxed text-paper/80">{t("stars.ruleBody")}</p>
            <div className="mt-6 border-t-2 border-paper/15 pt-5">
              <p className="font-pixel text-[11px] uppercase text-brand-300">{t("stars.exampleLabel")}</p>
              <p className="mt-2 leading-relaxed text-paper/80">{t("stars.example")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="nivells" className="pb-16 md:pb-24">
        <div className="container-page">
          <p className="eyebrow">{t("stars.levelsLabel")}</p>
          <h2 className="section-title mt-3">{t("stars.levelsTitle")}</h2>
          <p className="section-subtitle">{t("stars.levelsSubtitle")}</p>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((level, i) => (
              <li key={level.name} className="flex flex-col border-2 border-ink bg-paper-50">
                <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3">
                  <PactStars count={i} />
                  <span className="font-pixel text-[10px] uppercase text-paper/60">
                    {t("stars.level", { n: i })}
                  </span>
                </div>
                <div className="flex-1 border-t-2 border-ink p-5">
                  <h3 className="font-display text-2xl font-extrabold">{level.name}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{level.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pujar" className="pb-20 md:pb-28">
        <div className="container-page">
          <p className="eyebrow">{t("stars.changeLabel")}</p>
          <h2 className="section-title mt-3">{t("stars.changeTitle")}</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {steps.map((step) => (
              <div key={step.label} className="flex flex-col border-2 border-ink bg-paper-50 p-6 md:p-8">
                <p className="font-pixel text-[11px] uppercase text-brand-600">{step.label}</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">{step.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink-700">{step.body}</p>
                <ul className="mt-5 space-y-2">
                  {step.facts.map((fact) => (
                    <li key={fact} className="flex gap-3 text-ink-700">
                      <span aria-hidden className="mt-2 h-2 w-2 shrink-0 bg-brand-500" />
                      {fact}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto space-y-2 pt-6">
                  {step.code.map((line) => (
                    <code key={line} className="code-line">
                      {line}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="combat" className="edge-top edge-bottom bg-ink py-20 text-paper [--edge:#131a16] md:py-28">
        <div className="container-page">
          <p className="eyebrow text-brand-300">{t("stars.combatLabel")}</p>
          <h2 className="section-title mt-3 text-paper">{t("stars.combatTitle")}</h2>
          <p className="section-subtitle max-w-2xl text-paper/75">{t("stars.combatSubtitle")}</p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {combat.map((fact) => (
              <li key={fact.title} className="border-2 border-paper/20 p-5">
                <h3 className="font-display text-xl font-bold">{fact.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/75">{fact.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl leading-relaxed text-paper/60">{t("stars.combatNote")}</p>
        </div>
      </section>

      <section id="bases" className="py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">{t("stars.basesLabel")}</p>
            <h2 className="section-title mt-3">{t("stars.basesTitle")}</h2>
            <p className="section-subtitle">{t("stars.basesSubtitle")}</p>
          </div>
          <ol className="border-t-2 border-ink">
            {bases.map((line, i) => (
              <li
                key={line}
                className="grid grid-cols-[3.25rem_1fr] gap-4 border-b-2 border-dashed border-ink/20 py-5"
              >
                <span aria-hidden className="pt-1 font-pixel text-xl text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-relaxed text-ink-700">{line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="ordres" className="pb-16 md:pb-24">
        <div className="container-page">
          <p className="eyebrow">{t("stars.commandsLabel")}</p>
          <h2 className="section-title mt-3">{t("stars.commandsTitle")}</h2>

          <dl className="mt-8 divide-y-2 divide-ink border-2 border-ink bg-paper-50">
            {commands.map((c) => (
              <div
                key={c.cmd}
                className="grid gap-2 p-4 sm:grid-cols-[minmax(0,19rem)_1fr] sm:items-center sm:gap-6 md:px-6"
              >
                <dt>
                  <code className="code-line w-fit">{c.cmd}</code>
                </dt>
                <dd className="text-ink-700">{c.what}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-ink-600">{t("stars.commandsNote")}</p>

          <div className="mt-14 flex flex-col gap-6 border-l-4 border-terra-500 bg-terra-100 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-extrabold">{t("stars.rulesTitle")}</h2>
              <p className="mt-2 leading-relaxed text-ink-700">{t("stars.rulesBody")}</p>
            </div>
            <Link href="/normes" className="btn-secondary group shrink-0 self-start md:self-auto">
              {t("stars.rulesLink")}
              <ArrowIcon size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <DiscordCta title={t("stars.ctaTitle")} body={t("stars.ctaBody")} />
    </>
  );
}
