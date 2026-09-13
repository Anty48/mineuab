"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, SERVER_ADDRESS } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { CheckIcon, CopyIcon, DiscordIcon } from "@/components/icons";

export default function Hero() {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden md:min-h-[90vh]">
      {/* The plaça cívica built on the server. The file is already blurred (see README). */}
      <Image
        src="/assets/plaza-civica-blur.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%]"
      />
      {/* Darker towards the bottom so the text reads and the page fades into black. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/65 to-black/30"
      />

      <div className="container-page flex flex-col items-center pb-20 pt-24 text-center">
        <h1 className="text-shadow-lg max-w-4xl text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
          {t("hero.title")}
        </h1>
        <p className="text-shadow-lg mt-3 max-w-3xl text-balance text-lg text-zinc-100 md:mt-5 md:text-2xl">
          {t("hero.subtitle")}
        </p>

        <div className="mt-7 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={() => copy(SERVER_ADDRESS)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-brand-600"
          >
            {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            <span aria-live="polite">
              {copied
                ? t("server.copied")
                : t("hero.copyIp", { address: SERVER_ADDRESS })}
            </span>
          </button>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-shadow-lg inline-flex items-center gap-2 px-4 py-2.5 font-medium text-brand-300 transition-opacity hover:opacity-75"
          >
            <DiscordIcon size={18} />
            {t("hero.ctaDiscord")}
          </a>
        </div>
      </div>
    </section>
  );
}
