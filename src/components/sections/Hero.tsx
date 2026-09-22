"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, SERVER_ADDRESS } from "@/lib/links";
import { PHOTOS } from "@/lib/gallery";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { useServerStatus } from "@/lib/useServerStatus";
import { CheckIcon, CopyIcon, DiscordIcon } from "@/components/icons";

export default function Hero() {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();
  const status = useServerStatus();

  let statusLabel = "";
  if (status) {
    statusLabel = !status.online
      ? t("server.offline")
      : status.players === 0
        ? t("server.online")
        : t(status.players === 1 ? "server.playersOne" : "server.playersMany", {
            count: status.players,
          });
  }

  return (
    <section className="bg-paving overflow-hidden">
      <div className="container-page grid items-center gap-16 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-24">
        <div>
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.titleLead")}{" "}
            <span className="mt-2 inline-block -rotate-1 whitespace-nowrap border-2 border-ink bg-brand-500 px-3 pb-1 text-white shadow-block-sm">
              {t("hero.titleAccent")}
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-pretty text-lg text-ink-600 md:text-xl">
            {t("hero.subtitle")}
          </p>

          {/* L'adreça del servidor, amb el botó de copiar enganxat. */}
          <div className="mt-8 flex max-w-lg flex-col border-2 border-ink bg-paper-50 shadow-block sm:flex-row">
            <div className="min-w-0 flex-1 px-4 py-3">
              <span className="block font-pixel text-[10px] uppercase text-ink-500">
                {t("server.ipLabel")}
              </span>
              <span className="block select-all truncate font-mono text-xl font-bold">
                {SERVER_ADDRESS}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copy(SERVER_ADDRESS)}
              className="flex shrink-0 items-center justify-center gap-2 border-t-2 border-ink bg-brand-500 px-5 py-3 font-bold text-white transition-colors hover:bg-brand-600 active:bg-brand-700 sm:border-l-2 sm:border-t-0"
            >
              {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
              <span aria-live="polite">{copied ? t("server.copied") : t("server.copy")}</span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <DiscordIcon size={18} />
              {t("hero.ctaDiscord")}
            </a>
            {status && (
              <p className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 ${status.online ? "animate-blink bg-brand-500" : "bg-terra-500"}`}
                />
                {statusLabel}
                {status.version && (
                  <span className="text-ink-500">
                    · {t("server.version")} {status.version}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Collage de captures del servidor, com fotos enganxades en un suro. */}
        <div className="relative mx-auto mb-6 w-full max-w-xl sm:mb-12 lg:max-w-none">
          <figure className="rotate-[1.5deg] border-2 border-ink bg-paper-50 p-2 shadow-block-lg">
            <Image
              src={PHOTOS.placaCivica}
              alt={t("gallery.items.civicSquare")}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="px-1 pt-2 font-pixel text-[11px] uppercase text-ink-600">
              {t("gallery.items.civicSquare")}
            </figcaption>
          </figure>

          <figure
            aria-hidden
            className="absolute -bottom-14 -right-4 hidden w-[38%] rotate-3 border-2 border-ink bg-paper-50 p-1.5 shadow-block sm:block"
          >
            <Image
              src={PHOTOS.trinxera}
              alt=""
              placeholder="blur"
              sizes="240px"
              className="aspect-square w-full object-cover"
            />
          </figure>

          <span className="absolute -left-2 -top-5 -rotate-6 border-2 border-ink bg-brand-500 px-3 py-2 font-pixel text-xs uppercase text-white shadow-block-sm sm:-left-4">
            {t("hero.sticker")}
          </span>
        </div>
      </div>
    </section>
  );
}
