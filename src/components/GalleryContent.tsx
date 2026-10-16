"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GALLERY } from "@/lib/gallery";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";
import { ChevronIcon, CloseIcon } from "@/components/icons";

const TILE_SIZE = {
  big: "sm:col-span-2 sm:row-span-2",
  wide: "lg:col-span-2",
};

export default function GalleryContent() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // El <dialog> natiu reté el focus, es tanca amb Escape i torna el focus a la
  // casella que l'ha obert; l'estat només diu quina imatge es mostra.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
    document.documentElement.style.overflow = open === null ? "" : "hidden";
  }, [open]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const step = useCallback((delta: number) => {
    setOpen((i) => (i === null ? i : (i + delta + GALLERY.length) % GALLERY.length));
  }, []);

  const caption = (key: string) => t(`gallery.items.${key}`);
  const current = open === null ? null : GALLERY[open];

  return (
    <>
      <PageHeader
        crumb={t("nav.gallery")}
        title={t("gallery.title")}
        subtitle={t("gallery.subtitle")}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <ul className="grid auto-rows-[16rem] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, i) => (
              <li key={item.key} className={item.size ? TILE_SIZE[item.size] : undefined}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden border-2 border-ink bg-ink text-left transition-transform hover:-translate-y-1"
                >
                  <Image
                    src={item.image}
                    alt={caption(item.key)}
                    fill
                    placeholder="blur"
                    sizes={
                      item.size === "big"
                        ? "(min-width: 640px) 66vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Etiqueta com la d'un museu. */}
                  <span className="absolute bottom-3 left-3 flex items-center gap-2 border-2 border-ink bg-paper-50 px-2 py-1 font-pixel text-[11px] uppercase text-ink">
                    <span aria-hidden className="text-brand-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {caption(item.key)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DiscordCta title={t("gallery.ctaTitle")} body={t("gallery.ctaBody")} />

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
          // Tanquem amb Escape nosaltres mateixos, sense dependre de com ho gestioni cada navegador.
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(null);
          }
        }}
        aria-label={current ? caption(current.key) : undefined}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-paper backdrop:bg-ink/95"
      >
        {current && open !== null && (
          // Clicar la zona fosca del voltant de la foto tanca el visor.
          <div
            className="relative flex h-full flex-col items-center justify-center p-4 sm:p-12"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(null);
            }}
          >
            {/* Primer al DOM perquè rebi el focus quan s'obre el diàleg. */}
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={t("gallery.close")}
              className="btn-icon absolute right-4 top-4 z-10 p-2.5"
            >
              <CloseIcon />
            </button>

            <figure className="flex max-w-full flex-col items-center">
              <Image
                src={current.image}
                alt={caption(current.key)}
                placeholder="blur"
                sizes="100vw"
                className="max-h-[75vh] w-auto border-2 border-paper object-contain"
              />
              <figcaption className="mt-4 flex items-center gap-3 text-center text-lg font-semibold">
                {caption(current.key)}
                <span className="font-pixel text-xs text-brand-300">
                  {open + 1} / {GALLERY.length}
                </span>
              </figcaption>
            </figure>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t("gallery.prev")}
                className="btn-icon p-2.5"
              >
                <ChevronIcon className="rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t("gallery.next")}
                className="btn-icon p-2.5"
              >
                <ChevronIcon className="-rotate-90" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
