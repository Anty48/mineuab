import type { MetadataRoute } from "next";
import { localePath } from "@/i18n/paths";
import { PAGE_PATHS } from "@/i18n/seo";
import { SITE_URL } from "@/lib/links";

// Les pàgines fixes de la web, en tots dos idiomes (els perfils de /jugador/<nom> no hi són: surten de la llista
// de jugadors).
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.flatMap((path) => {
    const url = (locale: "ca" | "es") => `${SITE_URL}${localePath(path, locale)}`;
    const alternates = { languages: { ca: url("ca"), es: url("es"), "x-default": url("ca") } };
    return [
      { url: url("ca"), alternates },
      { url: url("es"), alternates },
    ];
  });
}
