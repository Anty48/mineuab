"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, INSTAGRAM_URL, TWITCH_URL } from "@/lib/links";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/10 bg-neutral-950/60">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Image
            src="/assets/square_col.png"
            alt="mineuab"
            width={64}
            height={64}
            className="h-14 w-14 rounded-lg"
          />
          <p className="mt-4 max-w-sm text-sm text-neutral-400">
            {t("footer.tagline")}
          </p>
          <p className="mt-2 max-w-sm text-xs text-neutral-500">
            {t("footer.disclaimerShort")}
          </p>
        </div>

        <div>
          <h3 className="font-pixel text-xs text-brand-300">
            {t("footer.sections")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            <li>
              <Link href="/#about" className="hover:text-white">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href="/#history" className="hover:text-white">
                {t("nav.history")}
              </Link>
            </li>
            <li>
              <Link href="/recipes" className="hover:text-white">
                {t("nav.recipes")}
              </Link>
            </li>
            <li>
              <Link href="/#events" className="hover:text-white">
                {t("nav.events")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-pixel text-xs text-brand-300">
            {t("footer.social")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href={TWITCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Twitch
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-neutral-500 sm:flex-row">
          <p>© {year} mineuab</p>
          <p>{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
