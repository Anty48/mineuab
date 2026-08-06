"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL } from "@/lib/links";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Pixel grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(closest-side, black, transparent 90%)",
        }}
      />

      <div className="container-page relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-200">
            <span className="h-2 w-2 rounded-full bg-brand" />
            {t("hero.badge")}
          </span>

          <h1 className="mt-6 font-pixel text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-xl text-base text-neutral-300 sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t("hero.cta")}
            </a>
            <Link href="/recipes" className="btn-ghost">
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center animate-pop-in">
          <div className="absolute inset-0 -z-10 rounded-full bg-brand/20 blur-3xl" />
          <Image
            src="/assets/logo_idea.png"
            alt="mineuab logo"
            width={420}
            height={420}
            priority
            className="w-64 max-w-full rounded-2xl shadow-pixel sm:w-80 md:w-[26rem]"
          />
        </div>
      </div>
    </section>
  );
}
