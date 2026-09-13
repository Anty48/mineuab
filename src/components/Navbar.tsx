"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
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

  // Close the mobile menu on Escape, or when the viewport grows to desktop.
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t("nav.skip")}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/90 shadow backdrop-blur-sm">
        <nav className="container-page flex h-16 items-center gap-8">
          <Link href="/" className="flex shrink-0 items-center">
            {/* Source is 3000×650; keep that ratio so nothing shifts on load. */}
            <Image
              src="/assets/long_w.png"
              alt="mineuab"
              width={129}
              height={28}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={ariaCurrent(l.href)}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-white aria-[current=page]:text-brand-300"
              >
                {t(l.key)}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => copy(SERVER_ADDRESS)}
              title={t("server.copy")}
              className="hidden text-right leading-tight xl:block"
            >
              <span
                aria-live="polite"
                className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400"
              >
                {copied ? t("server.copied") : t("server.ipLabel")}
              </span>
              <span className="block text-sm font-semibold text-white">
                {SERVER_ADDRESS}
              </span>
            </button>

            <ServerStatusPill className="hidden md:inline-flex" />
            <LanguageToggle />

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={t("nav.menu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="btn-ghost !px-3 !py-2 lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                {open ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="border-t border-zinc-800 lg:hidden">
            <div className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={ariaCurrent(l.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-medium text-zinc-200 hover:bg-zinc-900 aria-[current=page]:text-brand-300"
                >
                  {t(l.key)}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => copy(SERVER_ADDRESS)}
                className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-left"
              >
                <span>
                  <span className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                    {t("server.ipLabel")}
                  </span>
                  <span className="block font-mono text-brand-300">
                    {SERVER_ADDRESS}
                  </span>
                </span>
                <span
                  aria-live="polite"
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-300"
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
                className="btn-primary mt-2"
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
