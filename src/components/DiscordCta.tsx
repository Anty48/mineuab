"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL } from "@/lib/links";
import { DiscordIcon, GrassBlockIcon } from "./icons";

/** Bloc final de les pàgines interiors: una frase curta i el botó de Discord. */
export default function DiscordCta({ title, body }: { title: string; body: string }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="relative flex flex-col gap-8 border-2 border-ink bg-brand-500 p-8 text-white shadow-block-lg md:flex-row md:items-center md:justify-between md:p-12">
          <GrassBlockIcon
            size={40}
            className="absolute -top-5 left-8 border-2 border-ink bg-paper-50 p-1.5 text-brand-500"
          />
          <div>
            <h2 className="text-balance font-display text-3xl font-extrabold md:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-pretty text-lg font-medium">{body}</p>
          </div>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0 self-start px-6 py-3 text-base md:self-auto"
          >
            <DiscordIcon size={20} />
            {t("hero.ctaDiscord")}
          </a>
        </div>
      </div>
    </section>
  );
}
