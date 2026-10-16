"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL } from "@/lib/links";
import { DiscordIcon } from "./icons";

/** Bloc final de les pàgines interiors: una frase curta i el botó de Discord. */
export default function DiscordCta({ title, body }: { title: string; body: string }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-8 rounded-3xl bg-brand-500 p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-balance font-display text-3xl font-bold md:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-pretty text-lg font-medium">{body}</p>
          </div>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0 self-start border-transparent px-6 py-3 text-base md:self-auto"
          >
            <DiscordIcon size={20} />
            {t("hero.ctaDiscord")}
          </a>
        </div>
      </div>
    </section>
  );
}
