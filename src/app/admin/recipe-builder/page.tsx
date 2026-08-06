"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";
import RecipeBuilder from "./RecipeBuilder";

export default function RecipeBuilderPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Lightweight admin top bar (not linked from the public site) */}
      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/long_w.png"
              alt="mineuab"
              width={140}
              height={36}
              className="h-7 w-auto"
            />
            <span className="rounded-md bg-brand/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-200">
              admin
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link href="/recipes" className="btn-ghost !py-2 text-sm">
              {t("nav.recipes")}
            </Link>
          </div>
        </div>
      </header>

      <main className="container-page py-12">
        <div className="max-w-2xl">
          <h1 className="section-title text-white">{t("admin.title")}</h1>
          <p className="mt-4 text-neutral-400">{t("admin.subtitle")}</p>
        </div>

        <div className="mt-10">
          <RecipeBuilder />
        </div>
      </main>
    </div>
  );
}
