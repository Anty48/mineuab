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
    <section className="relative isolate overflow-hidden">
      {/* La plaça cívica de fons, amb un vel del color del paper que és més fort al centre, on va
          el text, i es fon per sota amb la secció següent. La foto es veu igual pels dos costats.
          En pantalles de més de 1920 px no s'estira més (es veuria pixelada): els costats es fonen. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 mx-auto max-w-[1920px] min-[1921px]:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <Image
          src={PHOTOS.placaCivica}
          alt=""
          fill
          priority
          quality={90}
          placeholder="blur"
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_60%_at_50%_45%,rgb(244_241_234/0.92)_0%,rgb(244_241_234/0.72)_55%,rgb(244_241_234/0.35)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-paper via-paper/70 to-transparent"
      />

      <div className="container-page pb-28 pt-16 md:pb-36 md:pt-24 lg:pb-40 lg:pt-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow justify-center">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 text-balance font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.titleLead")}{" "}
            <span className="whitespace-nowrap text-brand-500">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lg text-ink-700 md:text-xl">
            {t("hero.subtitle")}
          </p>

          {/* L'adreça del servidor, amb el botó de copiar enganxat. */}
          <div className="mt-8 flex w-full max-w-lg flex-col border-2 border-ink bg-paper-50 text-left shadow-block sm:flex-row">
            <div className="min-w-0 flex-1 px-4 py-3">
              <span className="field-label block">{t("server.ipLabel")}</span>
              <span className="block select-all truncate font-mono text-xl font-bold">
                {SERVER_ADDRESS}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copy(SERVER_ADDRESS)}
              className="flex shrink-0 items-center justify-center gap-2 border-t-2 border-ink bg-brand-600 px-5 py-3 font-bold text-white transition-colors hover:bg-brand-700 active:bg-brand-800 sm:border-l-2 sm:border-t-0"
            >
              {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
              <span aria-live="polite">{copied ? t("server.copied") : t("server.copy")}</span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
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
                  <span className="font-normal text-ink-500">
                    · {t("server.version")} {status.version}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
