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

  // The native <dialog> traps focus, closes on Escape and hands focus back to
  // the tile that opened it; state just says which image is showing.
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
        title={t("gallery.title")}
        subtitle={t("gallery.subtitle")}
        image="/assets/entrada-ferros-soft.jpg"
      />

      <section className="py-20 md:py-28">
        <div className="container-page">
          <ul className="grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, i) => (
              <li key={item.key} className={item.size ? TILE_SIZE[item.size] : undefined}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-3xl border border-zinc-800 text-left"
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
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                  />
                  <span className="text-shadow-lg absolute inset-x-0 bottom-0 p-5 text-lg font-semibold text-white">
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
          // Close on Escape ourselves too, instead of relying on each browser's dialog handling.
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(null);
          }
        }}
        aria-label={current ? caption(current.key) : undefined}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        {current && open !== null && (
          // Clicking the dark area around the photo closes the viewer.
          <div
            className="relative flex h-full flex-col items-center justify-center p-4 sm:p-12"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(null);
            }}
          >
            {/* First in the DOM so it gets focus when the dialog opens. */}
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={t("gallery.close")}
              className="btn-ghost absolute right-4 top-4 z-10 !p-3"
            >
              <CloseIcon />
            </button>

            <figure className="flex max-w-full flex-col items-center">
              <Image
                src={current.image}
                alt={caption(current.key)}
                placeholder="blur"
                sizes="100vw"
                className="max-h-[75vh] w-auto rounded-2xl object-contain"
              />
              <figcaption className="mt-4 text-center text-lg">
                {caption(current.key)}
                <span className="ml-3 text-sm text-zinc-400">
                  {open + 1} / {GALLERY.length}
                </span>
              </figcaption>
            </figure>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t("gallery.prev")}
                className="btn-ghost !p-3"
              >
                <ChevronIcon className="rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t("gallery.next")}
                className="btn-ghost !p-3"
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
