"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** Cinta verda amb paraules que corren, just sota la portada. */
export default function Marquee() {
  const { raw } = useLanguage();
  const items = raw<string[]>("marquee") ?? [];
  // Cada meitat de la cinta repeteix la llista dues vegades perquè no quedi buida
  // en pantalles amples; l'animació mou exactament una meitat i torna a començar.
  const half = [...items, ...items];

  return (
    <div className="overflow-hidden border-y-2 border-ink bg-brand-500 py-3 text-white">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {half.map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= items.length || undefined}
                className="flex items-center gap-8 pr-8 font-pixel text-sm uppercase"
              >
                {item}
                <span aria-hidden className="h-2.5 w-2.5 bg-white" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
