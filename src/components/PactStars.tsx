import { PixelStarIcon } from "./icons";

// Els colors de cada nivell, els mateixos que surten dins del joc (nivells.*.color al config.yml del plugin).
export const LEVEL_COLORS = ["#9aa39d", "#5ec583", "#f2c94c", "#e3a384", "#e07a3f", "#e04848"];

/** Cinc estrelles, les primeres `count` plenes amb el color del nivell. Per posar sobre fons fosc. */
export default function PactStars({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <span aria-hidden className="flex gap-1" style={{ color: LEVEL_COLORS[count] }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <PixelStarIcon key={i} size={size} className={i < count ? "" : "text-paper/20"} />
      ))}
    </span>
  );
}
