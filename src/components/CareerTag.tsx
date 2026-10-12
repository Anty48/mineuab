import type { Career } from "@/lib/useProfiles";

/** Si sobre aquest color es llegeix millor el text fosc que el blanc. */
function isLight(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return true;
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.3;
}

/**
 * La carrera del jugador amb el color del seu tag de Minecraft.
 * "solid" pinta tota l'etiqueta (capçalera del perfil); "swatch" només un quadret (llistes).
 */
export default function CareerTag({
  career,
  variant = "swatch",
  className = "",
}: {
  career: Career;
  variant?: "solid" | "swatch";
  className?: string;
}) {
  const color = career.color ?? "#0A8A3F";

  if (variant === "solid") {
    return (
      <span
        style={{ backgroundColor: color }}
        className={`inline-flex items-center border-2 border-ink px-3 py-1 font-pixel text-xs uppercase shadow-block-sm ${
          isLight(color) ? "text-ink" : "text-white"
        } ${className}`}
      >
        {career.name}
      </span>
    );
  }

  return (
    <span className={`inline-flex min-w-0 items-center gap-1.5 text-sm font-semibold text-ink-700 ${className}`}>
      <span aria-hidden style={{ backgroundColor: color }} className="h-2.5 w-2.5 shrink-0 border border-ink/40" />
      <span className="truncate">{career.name}</span>
    </span>
  );
}
