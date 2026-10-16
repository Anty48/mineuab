"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, SERVER_ADDRESS, WHITELIST_ENABLED } from "@/lib/links";
import { DiscordIcon } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import ServerCard from "@/components/ServerCard";
import WhitelistRequest from "@/components/WhitelistRequest";

interface Step {
  title: string;
  body: string;
  /** Línies que es mostren com a ordres; `{address}` es substitueix per l'adreça del servidor. */
  code?: readonly string[];
  /** Text d'un botó de Discord al final del pas. */
  cta?: string;
  /** El pas de demanar accés, amb el formulari de la whitelist. */
  whitelist?: boolean;
}

export default function HowToJoin() {
  const { t, raw } = useLanguage();
  const baseSteps = raw<Step[]>("howToJoin.steps") ?? [];
  const steps: Step[] = WHITELIST_ENABLED
    ? [{ ...raw<Step>("howToJoin.whitelistStep"), whitelist: true }, ...baseSteps]
    : baseSteps;

  return (
    <section id="com-entrar" className="pb-20 pt-4 md:pb-28 md:pt-8">
      <div className="container-page">
        <SectionHeading
          title={t("howToJoin.title")}
          subtitle={t("howToJoin.subtitle")}
        />

        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-14">
          <div>
            <ol>
              {steps.map((step, i) => (
                <li key={i} className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-12 last:pb-0">
                  {/* Línia fins al pas següent. */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute bottom-2 left-[1.375rem] top-14 w-px -translate-x-1/2 bg-ink/15"
                    />
                  )}
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-ink-600">{step.body}</p>

                    {step.code && (
                      <div className="mt-4 max-w-md space-y-2">
                        {step.code.map((line) => (
                          <code key={line} className="code-line">
                            {line.replace("{address}", SERVER_ADDRESS)}
                          </code>
                        ))}
                      </div>
                    )}

                    {step.whitelist && <WhitelistRequest />}

                    {step.cta && (
                      <a
                        href={DISCORD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-5"
                      >
                        <DiscordIcon size={18} />
                        {step.cta}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-12 max-w-lg rounded-xl bg-terra-100 px-4 py-3 text-sm text-ink-700">
              {t("howToJoin.passwordTip")}
            </p>
          </div>

          <div>
            <ServerCard className="mx-auto lg:sticky lg:top-28" />
          </div>
        </div>
      </div>
    </section>
  );
}
