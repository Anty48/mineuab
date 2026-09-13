"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL } from "@/lib/links";
import { DiscordIcon } from "./icons";

/** Closing section for inner pages: a short line and the Discord button. */
export default function DiscordCta({ title, body }: { title: string; body: string }) {
  const { t } = useLanguage();

  return (
    <section className="border-t border-zinc-900 py-20 md:py-28">
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="section-title max-w-2xl text-balance">{title}</h2>
        <p className="section-subtitle max-w-xl text-balance">{body}</p>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 !px-6 !py-3 text-base"
        >
          <DiscordIcon size={20} />
          {t("hero.ctaDiscord")}
        </a>
      </div>
    </section>
  );
}
