"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, SERVER_ADDRESS } from "@/lib/links";
import { DiscordIcon } from "@/components/icons";
import ServerCard from "@/components/ServerCard";

interface Step {
  title: string;
  body: string;
  /** Lines shown as copyable-looking code; `{address}` becomes the server address. */
  code?: readonly string[];
  /** Label for a Discord button at the bottom of the step. */
  cta?: string;
}

export default function HowToJoin() {
  const { t, raw } = useLanguage();
  const steps = raw<Step[]>("howToJoin.steps") ?? [];

  return (
    <section id="com-entrar" className="py-24 md:py-32">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="section-title">{t("howToJoin.title")}</h2>
            <p className="section-subtitle">{t("howToJoin.subtitle")}</p>
          </div>
          <ServerCard className="mx-auto lg:mr-0" />
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={i} className="card flex flex-col p-6">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-500/50 bg-brand-500/15 font-bold text-brand-300"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>

              {step.code && (
                <div className="mt-4 space-y-2">
                  {step.code.map((line) => (
                    <code
                      key={line}
                      className="block break-all rounded-lg border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-brand-300"
                    >
                      {line.replace("{address}", SERVER_ADDRESS)}
                    </code>
                  ))}
                </div>
              )}

              {step.cta && (
                <div className="mt-auto pt-5">
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <DiscordIcon size={18} />
                    {step.cta}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-zinc-400">{t("howToJoin.passwordTip")}</p>
      </div>
    </section>
  );
}
