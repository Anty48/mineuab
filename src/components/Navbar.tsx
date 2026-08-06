"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import { DISCORD_URL } from "@/lib/links";

const NAV_LINKS = [
  { href: "/#about", key: "nav.about" },
  { href: "/#history", key: "nav.history" },
  { href: "/recipes", key: "nav.recipes" },
  { href: "/#events", key: "nav.events" },
  { href: "/#socials", key: "nav.socials" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-white/10 bg-neutral-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="mineuab home">
          <Image
            src="/assets/long_w.png"
            alt="mineuab"
            width={150}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
            >
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex"
          >
            {t("nav.join")}
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="btn-ghost !px-3 !py-2 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
        <div className="border-t border-white/10 bg-neutral-950/95 lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-200 hover:bg-white/5"
              >
                {t(l.key)}
              </Link>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              {t("nav.join")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
