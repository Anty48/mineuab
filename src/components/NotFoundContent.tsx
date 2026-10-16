"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CreeperIcon } from "./icons";

export default function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <section>
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <CreeperIcon size={96} className="rounded-xl" />
        <p className="mt-10 font-pixel text-7xl text-brand-600 md:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          {t("common.notFound")}
        </h1>
        <p className="mt-3 max-w-md text-pretty text-lg text-ink-600">
          {t("common.notFoundBody")}
        </p>
        <Link href="/" className="btn-primary mt-8">
          {t("common.backHome")}
        </Link>
      </div>
    </section>
  );
}
