"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <section className="container-page flex min-h-[75vh] flex-col items-center justify-center pb-16 pt-32 text-center">
      <p className="text-8xl font-bold tracking-tight text-brand-500 md:text-9xl">404</p>
      <h1 className="mt-6 text-3xl font-semibold text-white">
        {t("common.notFound")}
      </h1>
      <p className="mt-3 max-w-md text-lg text-zinc-400">
        {t("common.notFoundBody")}
      </p>
      <Link href="/" className="btn-primary mt-8">
        {t("common.backHome")}
      </Link>
    </section>
  );
}
