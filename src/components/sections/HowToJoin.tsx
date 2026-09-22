"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, SERVER_ADDRESS } from "@/lib/links";
import { DiscordIcon } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import ServerCard from "@/components/ServerCard";

interface Step {
  title: string;
  body: string;
  /** Línies que es mostren com a ordres; `{address}` es substitueix per l'adreça del servidor. */
  code?: readonly string[];
  /** Text d'un botó de Discord al final del pas. */
  cta?: string;
}

export default function HowToJoin() {
  const { t, raw } = useLanguage();
  const steps = raw<Step[]>("howToJoin.steps") ?? [];

  return (
    <section id="com-entrar" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          number="01"
          label={t("nav.howToJoin")}
          title={t("howToJoin.title")}
          subtitle={t("howToJoin.subtitle")}
        />

        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-14">
          <div>
            <ol>
              {steps.map((step, i) => (
                <li key={i} className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-12 last:pb-0">
                  {/* Línia puntejada fins al pas següent. */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[1.75rem] top-14 w-0.5 -translate-x-1/2 [background-image:linear-gradient(#131a16_50%,transparent_0)] [background-size:2px_10px]"
                    />
                  )}
                  <span
                    aria-hidden
                    className="flex h-14 w-14 items-center justify-center border-2 border-ink bg-brand-500 font-pixel text-xl text-white shadow-block-sm"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-2">
                    <h3 className="font-display text-2xl font-bold">{step.title}</h3>
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

            <p className="mt-12 max-w-lg border-l-4 border-terra-500 bg-terra-100 px-4 py-3 text-sm text-ink-700">
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
