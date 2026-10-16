"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/translations";
import { PROFILES_URL } from "./links";

// Les receptes custom del servidor (Craftorithm), de la mateixa API que els perfils (plugin MineUABPerfil):
// receptes.json i la icona de cada ítem, dibuixada amb el texture pack del servidor.

/** Un tros de text amb l'estil de Minecraft (color "#FF5555", negreta...). */
export interface TextPart {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
}

export interface ItemText {
  name: TextPart[];
  /** Cada línia del lore (la descripció de l'ítem), com al joc. */
  lore: TextPart[][];
}

export interface RecipeItem {
  /** Id de Minecraft ("minecraft:apple"). Els ítems custom també en tenen, el de l'ítem base. */
  id: string;
  /** Ítem del servidor (de Craftorithm), no el de Minecraft normal. */
  custom: boolean;
  /** Un ítem que el servidor no sap llegir (d'un altre plugin, esborrat...). */
  unknown?: boolean;
  /** Adreça absoluta de la icona. */
  icon?: string;
  /** Brilla com si estigués encantat. */
  glint: boolean;
  text: Record<Locale, ItemText>;
}

/** Una casella: les claus dels ítems que hi van bé (normalment un), o null si és buida. */
export type Slot = string[] | null;

interface RecipeBase {
  /** El nom del fitxer de la recepta a Craftorithm. */
  id: string;
  result: { item: string; count: number };
}

export type Station = "crafting" | "furnace" | "blast_furnace" | "smoker" | "campfire" | "brewing" | "smithing" | "stonecutting" | "anvil";

export type Recipe = RecipeBase &
  (
    | { type: "shaped"; grid: Slot[][] }
    | { type: "shapeless"; ingredients: Slot[] }
    | {
        type: "smelting";
        station: "furnace" | "blast_furnace" | "smoker" | "campfire";
        input: Slot;
        experience: number;
        seconds: number;
      }
    | { type: "stonecutting"; input: Slot }
    | { type: "smithing"; template: Slot; base: Slot; addition: Slot }
    | { type: "brewing"; input: Slot; ingredient: Slot }
    | { type: "anvil"; base: Slot; addition: Slot; levels: number }
  );

export interface RecipeBook {
  updated: string;
  recipes: Recipe[];
  items: Record<string, RecipeItem>;
}

/** On es fa la recepta. */
export function stationOf(recipe: Recipe): Station {
  switch (recipe.type) {
    case "shaped":
    case "shapeless":
      return "crafting";
    case "smelting":
      return recipe.station;
    default:
      return recipe.type;
  }
}

const KNOWN_TYPES = new Set(["shaped", "shapeless", "smelting", "stonecutting", "smithing", "brewing", "anvil"]);

// Les receptes canvien poc: es tornen a demanar cada 5 minuts.
const REFRESH_MS = 5 * 60_000;

/** Totes les receptes: "loading" la primera vegada, null si el servidor no respon. */
export function useRecipes() {
  const [book, setBook] = useState<RecipeBook | null | "loading">("loading");

  useEffect(() => {
    let active = true;
    const update = async () => {
      let next: RecipeBook | null = null;
      try {
        const res = await fetch(new URL("receptes.json", PROFILES_URL));
        const data = res.ok ? ((await res.json()) as RecipeBook) : null;
        if (data && Array.isArray(data.recipes) && data.items && typeof data.items === "object") {
          const items: Record<string, RecipeItem> = {};
          for (const [key, item] of Object.entries(data.items)) {
            items[key] = { ...item, icon: item.icon ? new URL(item.icon, PROFILES_URL).toString() : undefined };
          }
          next = {
            updated: String(data.updated ?? ""),
            // Si un dia el plugin en porta d'un tipus nou, la web el salta en lloc de trencar-se.
            recipes: data.recipes.filter((r) => KNOWN_TYPES.has(r.type) && r.result && items[r.result.item]),
            items,
          };
        }
      } catch {
        next = null;
      }
      if (active) setBook((prev) => next ?? (prev === "loading" ? null : prev));
    };
    update();
    const timer = window.setInterval(update, REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return book;
}

/** El nom de l'ítem sense estil, per a títols, cerques i lectors de pantalla. */
export function plainName(item: RecipeItem | undefined, locale: Locale) {
  return item ? item.text[locale].name.map((p) => p.text).join("") : "";
}
