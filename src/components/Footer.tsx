"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SERVER_ADDRESS, SITE_LINKS, SOCIAL_LINKS } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { CheckIcon, CopyIcon } from "./icons";

const headingClass = "mb-4 font-pixel text-[11px] uppercase text-brand-300";
const linkClass = "text-sm text-paper/75 transition-colors hover:text-white hover:underline";

export default function Footer() {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();
  const year = new Date().getFullYear();

  return (
    <footer className="edge-top bg-ink text-paper [--edge:#131a16]">
      <div className="container-page grid gap-10 pb-12 pt-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <h2 className="sr-only">{t("footer.about")}</h2>
          <Link href="/" className="inline-block">
            {/* El mateix logo que a la barra, en blanc. L'original fa 3000×650. */}
            <Image
              src="/assets/long_w.png"
              alt="mineuab"
              width={148}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm text-paper/75">{t("footer.tagline")}</p>
          <p className="mt-2 max-w-xs text-sm text-paper/75">{t("footer.disclaimerShort")}</p>
        </div>

        <nav aria-label={t("footer.pages")}>
          <h2 className={headingClass}>{t("footer.pages")}</h2>
          <ul className="space-y-2">
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{t("footer.social")}</h2>
          <ul className="space-y-2">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>{t("footer.server")}</h2>
          <button
            type="button"
            onClick={() => copy(SERVER_ADDRESS)}
            className="group flex items-center gap-3 border-2 border-brand-500 px-3 py-2 font-mono font-semibold text-brand-200 transition-colors hover:bg-brand-500 hover:text-white"
          >
            {SERVER_ADDRESS}
            {copied ? (
              <CheckIcon size={16} />
            ) : (
              <CopyIcon size={16} className="opacity-70 group-hover:opacity-100" />
            )}
            <span aria-live="polite" className="sr-only">
              {copied ? t("server.copied") : t("server.copy")}
            </span>
          </button>
          <p className="mt-3 text-sm text-paper/75">{t("server.openToAll")}</p>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-paper/60 sm:flex-row sm:justify-between">
          <p>
            © {year} mineuab · {t("footer.mojang")}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacitat" className="underline-offset-2 hover:text-white hover:underline">
              {t("footer.privacy")}
            </Link>
            <Link href="/avis-legal" className="underline-offset-2 hover:text-white hover:underline">
              {t("footer.legalNotice")}
            </Link>
            <span>{t("footer.madeWith")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
