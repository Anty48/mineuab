"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import AnnouncementBar from "./AnnouncementBar";
import LanguageToggle from "./LanguageToggle";
import ServerStatusPill from "./ServerStatusPill";
import { CheckIcon, CopyIcon, DiscordIcon } from "./icons";
import { DISCORD_URL, NAV_LINKS, SERVER_ADDRESS } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  // Tanca el menú mòbil amb Escape, o quan la finestra passa a mida d'escriptori.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onViewportChange = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [open]);

  const ariaCurrent = (href: string) => (href === pathname ? "page" : undefined);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border-2 focus:border-ink focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        {t("nav.skip")}
      </a>

      <AnnouncementBar />

      {/* Enganxada a dalt: la franja d'avís marxa en fer scroll, la barra es queda. */}
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
        <nav className="container-page flex h-16 items-center gap-6">
          {/* El logo necessita el fons blanc (la U i la B són l'espai blanc entre els blocs verds),
              així que va dins d'un bloc amb vora. */}
          <Link
            href="/"
            className="flex shrink-0 items-center border-2 border-ink bg-white shadow-block-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            {/* L'original fa 3000×650; mantenim la proporció perquè res no es mogui en carregar. */}
            <Image
              src="/assets/long_col.png"
              alt="mineuab"
              width={148}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Enllaços d'escriptori */}
          <div className="hidden items-center gap-4 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={ariaCurrent(l.href)}
                className="whitespace-nowrap font-display text-[15px] font-semibold text-ink decoration-brand-500 decoration-[3px] underline-offset-[7px] hover:underline aria-[current=page]:text-brand-600 aria-[current=page]:underline"
              >
                {t(l.key)}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => copy(SERVER_ADDRESS)}
              title={t("server.copy")}
              className="hidden items-center gap-2 border-2 border-ink bg-paper-50 px-2.5 py-1.5 transition-colors hover:bg-white xl:inline-flex"
            >
              <span className="bg-ink px-1 py-0.5 font-pixel text-[10px] leading-none text-paper">
                IP
              </span>
              <span className="font-mono text-sm font-semibold">{SERVER_ADDRESS}</span>
              {copied ? (
                <CheckIcon size={16} className="text-brand-600" />
              ) : (
                <CopyIcon size={16} className="text-ink-500" />
              )}
              <span aria-live="polite" className="sr-only">
                {copied ? t("server.copied") : ""}
              </span>
            </button>

            <ServerStatusPill className="hidden md:inline-flex" />
            <LanguageToggle />

            {/* Botó del menú mòbil */}
            <button
              type="button"
              aria-label={t("nav.menu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="btn-icon lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Menú mòbil */}
        {open && (
          <div
            id="mobile-menu"
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t-2 border-ink bg-paper lg:hidden"
          >
            <div className="container-page flex flex-col py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={ariaCurrent(l.href)}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/15 py-3 font-display text-lg font-semibold text-ink aria-[current=page]:text-brand-600"
                >
                  {t(l.key)}
                </Link>
              ))}

              <ServerStatusPill className="mt-4 inline-flex w-fit md:hidden" />

              <button
                type="button"
                onClick={() => copy(SERVER_ADDRESS)}
                className="mt-4 flex items-center justify-between gap-4 border-2 border-ink bg-paper-50 px-4 py-3 text-left"
              >
                <span>
                  <span className="block font-pixel text-[10px] uppercase text-ink-500">
                    {t("server.ipLabel")}
                  </span>
                  <span className="block font-mono font-semibold text-brand-600">
                    {SERVER_ADDRESS}
                  </span>
                </span>
                <span
                  aria-live="polite"
                  className="flex items-center gap-1.5 text-xs font-bold text-ink-700"
                >
                  {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                  {copied ? t("server.copied") : t("server.copy")}
                </span>
              </button>

              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4"
              >
                <DiscordIcon size={18} />
                {t("hero.ctaDiscord")}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
