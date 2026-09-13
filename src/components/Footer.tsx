"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SERVER_ADDRESS, SITE_LINKS, SOCIAL_LINKS } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { CheckIcon, CopyIcon } from "./icons";

const headingClass = "mb-4 text-sm font-semibold text-zinc-200";
const linkClass = "text-sm text-zinc-400 transition-colors hover:text-white";

export default function Footer() {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="sr-only">{t("footer.about")}</h2>
          <Link href="/" className="inline-block">
            {/* Same wordmark as the navbar. Source is 3000×650. */}
            <Image
              src="/assets/long_w.png"
              alt="mineuab"
              width={148}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-4 text-sm text-zinc-400">{t("footer.tagline")}</p>
          <p className="mt-2 text-sm text-zinc-400">{t("footer.disclaimerShort")}</p>
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
            className="group flex items-center gap-2 font-mono text-brand-300 hover:text-brand-200"
          >
            {SERVER_ADDRESS}
            {copied ? (
              <CheckIcon size={16} />
            ) : (
              <CopyIcon size={16} className="opacity-60 group-hover:opacity-100" />
            )}
            <span aria-live="polite" className="sr-only">
              {copied ? t("server.copied") : t("server.copy")}
            </span>
          </button>
          <p className="mt-2 text-sm text-zinc-400">{t("server.openToAll")}</p>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-zinc-400 sm:flex-row sm:justify-between">
          <p>
            © {year} mineuab · {t("footer.mojang")}
          </p>
          <p>{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
