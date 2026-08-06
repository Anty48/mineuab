import type { Locale } from "@/i18n/translations";

export interface Recipe {
  id: string;
  /** Emoji / short text icon shown in the grid and modal. */
  icon: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  howToObtain: Record<Locale, string>;
  /** 9 cells, row-major (index 0-8). Empty string = empty slot. */
  grid: string[];
}
