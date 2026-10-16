"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "@/components/SectionHeading";
import { ArrowIcon, GrassBlockIcon, PixelHeartIcon, PixelPeopleIcon } from "@/components/icons";

const POINTS = [
  { key: "what", Icon: GrassBlockIcon },
  { key: "why", Icon: PixelHeartIcon },
  { key: "open", Icon: PixelPeopleIcon },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-nosaltres" className="py-6 md:py-10">
      <div className="container-page">
        {/* En pantalles amples: títol i història a l'esquerra, els tres punts a la dreta.
            En mòbil van en ordre: títol, punts i història. */}
        <div className="grid gap-12 rounded-3xl bg-brand-950 px-6 py-14 text-paper sm:px-10 md:py-20 lg:grid-cols-[1fr_1.25fr] lg:gap-x-16 lg:gap-y-12 lg:px-14">
          <SectionHeading
            title={t("about.title")}
            subtitle={t("about.subtitle")}
            tone="dark"
            className="lg:col-start-1 lg:row-start-1"
          />

          <ul className="divide-y divide-paper/10 border-y border-paper/10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            {POINTS.map(({ key, Icon }) => (
              <li key={key} className="grid grid-cols-[3rem_1fr] gap-5 py-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                  <Icon size={24} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">{t(`about.${key}.title`)}</h3>
                  <p className="mt-2 leading-relaxed text-paper/75">{t(`about.${key}.body`)}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/historia"
            className="group flex flex-col gap-4 self-start rounded-2xl bg-paper p-7 text-ink transition-colors hover:bg-white lg:col-start-1 lg:row-start-2"
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="font-display text-3xl font-bold">{t("history.title")}</h3>
              {/* Amb el marc verd, com a la barra. L'original fa 472×400. */}
              <Image
                src="/assets/logo-square.png"
                alt=""
                width={66}
                height={56}
                className="h-14 w-auto shrink-0"
              />
            </div>
            <p className="text-lg text-ink-600">{t("history.subtitle")}</p>
            <span className="inline-flex items-center gap-2 font-bold text-brand-600">
              {t("about.historyCta")}
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
