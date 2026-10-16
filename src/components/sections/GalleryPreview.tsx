"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GALLERY } from "@/lib/gallery";
import SectionHeading from "@/components/SectionHeading";
import { ArrowIcon } from "@/components/icons";

/** Tast de la galeria a l'inici: les primeres fotos i un enllaç a la galeria sencera. */
export default function GalleryPreview() {
  const { t } = useLanguage();
  const items = GALLERY.slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title={t("galleryPreview.title")}
            subtitle={t("gallery.subtitle")}
          />
          <Link href="/galeria" className="btn-secondary shrink-0 self-start md:self-auto">
            {t("galleryPreview.cta")}
            <ArrowIcon size={18} />
          </Link>
        </div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => {
            const caption = t(`gallery.items.${item.key}`);
            return (
              <li key={item.key}>
                <Link
                  href="/galeria"
                  className={`group block`}
                >
                  <Image
                    src={item.image}
                    alt={caption}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/5] w-full rounded-xl object-cover transition-opacity group-hover:opacity-90"
                  />
                  <span className="block pt-3 text-sm font-medium text-ink-700 group-hover:text-brand-600">{caption}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
