"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "@/i18n/LocaleLink";
import { localePath } from "@/i18n/paths";
import AnnouncementBar from "./AnnouncementBar";
import LanguageToggle from "./LanguageToggle";
import ServerStatusPill from "./ServerStatusPill";
import { CheckIcon, ChevronIcon, CopyIcon, DiscordIcon } from "./icons";
import { DISCORD_URL, NAV_LINKS, type NavGroup, SERVER_ADDRESS } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";

const desktopLinkClass =
  "whitespace-nowrap font-display text-[15px] font-semibold text-ink decoration-brand-500 decoration-[3px] underline-offset-[7px] hover:underline aria-[current=page]:text-brand-600 aria-[current=page]:underline";

/** Un grup d'enllaços de la barra d'escriptori. S'obre clicant, que també funciona amb el teclat i a les tauletes. */
function NavDropdown({ group, currentPath }: { group: NavGroup; currentPath: (href: string) => "page" | undefined }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Es tanca amb Escape o clicant a fora.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const active = group.children.some((l) => currentPath(l.href));

  return (
    <div
      ref={root}
      className="relative"
      // També es tanca quan el teclat en surt amb el tabulador.
      onBlur={(e) => {
        if (e.relatedTarget && !root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 whitespace-nowrap font-display text-[15px] font-semibold decoration-brand-500 decoration-[3px] underline-offset-[7px] hover:underline ${
          active ? "text-brand-600 underline" : "text-ink"
        }`}
      >
        {t(group.key)}
        <ChevronIcon size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute left-0 top-full mt-4 min-w-56 border-2 border-ink bg-paper-50 py-1.5 shadow-block">
          {group.children.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={currentPath(l.href)}
                onClick={() => setOpen(false)}
                className="block whitespace-nowrap px-4 py-2.5 font-display text-[15px] font-semibold text-ink transition-colors hover:bg-brand-600 hover:text-white aria-[current=page]:text-brand-600 aria-[current=page]:hover:text-white"
              >
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const { t, locale } = useLanguage();
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

  const ariaCurrent = (href: string) => (localePath(href, locale) === pathname ? "page" : undefined);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border-2 focus:border-ink focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        {t("nav.skip")}
      </a>

      <AnnouncementBar />

      {/* Enganxada a dalt: la franja d'avís marxa en fer scroll, la barra es queda. */}
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
        <nav className="container-page flex h-16 items-center gap-6">
          {/* La U i la B del logo són l'espai blanc entre els blocs verds: logo-long.png ja porta
              el marc verd que les tanca, així es llegeix sobre qualsevol fons. */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            {/* L'original fa 1634×400; mantenim la proporció perquè res no es mogui en carregar. */}
            <Image
              src="/assets/logo-long.png"
              alt="mineuab"
              width={131}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Enllaços d'escriptori */}
          <div className="hidden items-center gap-3 lg:flex">
            {NAV_LINKS.map((l) =>
              "children" in l ? (
                <NavDropdown key={l.key} group={l} currentPath={ariaCurrent} />
              ) : (
                <Link key={l.href} href={l.href} aria-current={ariaCurrent(l.href)} className={desktopLinkClass}>
                  {t(l.key)}
                </Link>
              ),
            )}
          </div>

          {/* A l'escriptori, l'adreça del servidor no hi cap (és a l'inici, al peu i al menú mòbil). */}
          <div className="ml-auto flex items-center gap-2.5">
            {/* Entre 1024 i 1279 px tampoc no hi cap l'indicador: hi torna a ser a partir de 1280. */}
            <ServerStatusPill className="hidden md:inline-flex lg:hidden xl:inline-flex" />
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
              {NAV_LINKS.map((l) =>
                "children" in l ? (
                  <div key={l.key} className="border-b border-ink/15 py-3">
                    <p className="font-pixel text-[10px] uppercase text-ink-500">{t(l.key)}</p>
                    <div className="mt-1 flex flex-col">
                      {l.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          aria-current={ariaCurrent(c.href)}
                          onClick={() => setOpen(false)}
                          className="py-2 pl-3 font-display text-lg font-semibold text-ink aria-[current=page]:text-brand-600"
                        >
                          {t(c.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={ariaCurrent(l.href)}
                    onClick={() => setOpen(false)}
                    className="border-b border-ink/15 py-3 font-display text-lg font-semibold text-ink aria-[current=page]:text-brand-600"
                  >
                    {t(l.key)}
                  </Link>
                ),
              )}

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
