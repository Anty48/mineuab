import type { StaticImageData } from "next/image";
import placaCivica from "@/assets/gallery/placa-civica.jpg";
import andanaFerros from "@/assets/gallery/andana-ferros.jpg";
import entradaFerros from "@/assets/gallery/entrada-ferros.jpg";
import placaCivicaPluja from "@/assets/gallery/placa-civica-pluja.jpg";
import trinxera from "@/assets/gallery/trinxera.jpg";

export interface GalleryItem {
  /** Key under gallery.items in translations.ts (the caption). */
  key: string;
  image: StaticImageData;
  /** Bigger tile in the grid. */
  size?: "big" | "wide";
}

// To add a build: export the screenshot to src/assets/gallery, import it here
// and add its caption under gallery.items in both languages.
// The order and sizes below fill the grid with no gaps.
export const GALLERY: GalleryItem[] = [
  { key: "civicSquare", image: placaCivica, size: "big" },
  { key: "ferrosPlatform", image: andanaFerros },
  { key: "ferrosEntrance", image: entradaFerros },
  { key: "rain", image: placaCivicaPluja },
  { key: "trinxera", image: trinxera, size: "wide" },
];
