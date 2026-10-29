import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/links";

// Les pàgines fixes de la web (els perfils de /jugador/<nom> no hi són: surten de la llista de jugadors).
const PAGES = [
  "",
  "/create",
  "/mapa",
  "/ranquing",
  "/jugadors",
  "/receptes",
  "/galeria",
  "/normes",
  "/estrelles",
  "/faq",
  "/historia",
  "/privacitat",
  "/avis-legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({ url: `${SITE_URL}${path}` }));
}
