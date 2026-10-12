"use client";

import { useState } from "react";

/**
 * La cara del jugador (8×8 píxels de la seva skin), ampliada sense difuminar.
 * Si no en té (o no es pot carregar), un bloc amb un interrogant.
 */
export default function PlayerHead({
  src,
  size,
  className = "",
}: {
  src?: string;
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        aria-hidden
        style={{ width: size, height: size, fontSize: size * 0.45 }}
        className={`grid shrink-0 place-items-center bg-brand-700 font-pixel leading-none text-brand-200 ${className}`}
      >
        ?
      </span>
    );
  }

  return (
    // Imatge de 8×8 de l'API dels perfils: next/image no hi aporta res i la difuminaria.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`shrink-0 bg-brand-700 [image-rendering:pixelated] ${className}`}
    />
  );
}
