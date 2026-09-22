import type { StaticImageData } from "next/image";
import placaCivica from "@/assets/gallery/placa-civica.jpg";
import andanaFerros from "@/assets/gallery/andana-ferros.jpg";
import entradaFerros from "@/assets/gallery/entrada-ferros.jpg";
import placaCivicaPluja from "@/assets/gallery/placa-civica-pluja.jpg";
import trinxera from "@/assets/gallery/trinxera.jpg";

export interface GalleryItem {
  /** Clau dins de gallery.items a translations.ts (el peu de foto). */
  key: string;
  image: StaticImageData;
  /** Casella més gran a la graella. */
  size?: "big" | "wide";
}

// Per afegir una construcció: exporta la captura a src/assets/gallery, importa-la
// aquí i afegeix-ne el peu de foto a gallery.items en tots dos idiomes.
// L'ordre i les mides d'aquí sota omplen la graella sense forats.
export const GALLERY: GalleryItem[] = [
  { key: "civicSquare", image: placaCivica, size: "big" },
  { key: "ferrosPlatform", image: andanaFerros },
  { key: "ferrosEntrance", image: entradaFerros },
  { key: "rain", image: placaCivicaPluja },
  { key: "trinxera", image: trinxera, size: "wide" },
];

/** Foto per a cada capçalera de pàgina, a partir de la galeria. */
export const PHOTOS = {
  placaCivica,
  andanaFerros,
  entradaFerros,
  placaCivicaPluja,
  trinxera,
};
