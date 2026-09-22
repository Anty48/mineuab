"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GALLERY } from "@/lib/gallery";
import SectionHeading from "@/components/SectionHeading";
import { ArrowIcon } from "@/components/icons";

// Cada foto una mica torta, com si estiguessin escampades damunt la taula.
const TILT = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[1.5deg]"];

/** Tast de la galeria a l'inici: les primeres fotos i un enllaç a la galeria sencera. */
export default function GalleryPreview() {
  const { t } = useLanguage();
  const items = GALLERY.slice(0, 4);

  return (
    <section className="edge-top bg-paper py-20 [--edge:#f4f1ea] md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            number="03"
            label={t("nav.gallery")}
            title={t("galleryPreview.title")}
            subtitle={t("gallery.subtitle")}
          />
          <Link href="/galeria" className="btn-secondary shrink-0 self-start md:self-auto">
            {t("galleryPreview.cta")}
            <ArrowIcon size={18} />
          </Link>
        </div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item, i) => {
            const caption = t(`gallery.items.${item.key}`);
            return (
              <li key={item.key}>
                <Link
                  href="/galeria"
                  className={`group block border-2 border-ink bg-paper-50 p-2 shadow-block transition-transform hover:-translate-y-1 hover:rotate-0 ${TILT[i % TILT.length]}`}
                >
                  <Image
                    src={item.image}
                    alt={caption}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <span className="flex items-center justify-between gap-3 px-1 pt-2 font-pixel text-[11px] uppercase text-ink-600">
                    <span>{caption}</span>
                    <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
