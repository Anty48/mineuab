import type { Metadata } from "next";
import { INSTAGRAM_URL, SERVER_ADDRESS, SITE_URL, TWITCH_URL, YOUTUBE_URL } from "@/lib/links";
import { localePath } from "./paths";
import type { Locale } from "./translations";

const TITLE: Record<Locale, string> = {
  ca: "mineuab — Servidor de Minecraft d'estudiants de la UAB",
  es: "mineuab — Servidor de Minecraft de estudiantes de la UAB",
};

const DESCRIPTION: Record<Locale, string> = {
  ca: `Servidor de Minecraft Java fet per estudiants de la Universitat Autònoma de Barcelona, gratuït i obert a tothom. IP: ${SERVER_ADDRESS}`,
  es: `Servidor de Minecraft Java hecho por estudiantes de la Universidad Autónoma de Barcelona, gratuito y abierto a todos. IP: ${SERVER_ADDRESS}`,
};

interface PageText {
  title?: string;
  description?: string;
}

// El títol i la descripció que veuen els cercadors, de cada pàgina i en cada idioma. La portada fa servir
// els de la web sencera. També és la llista de pàgines de sitemap.ts.
const PAGES = {
  "/": { ca: {}, es: {} },
  "/create": {
    ca: {
      title: "MineUAB Create",
      description:
        "La beta tancada de MineUAB Create, el servidor de mineuab amb el mod Create: com funciona, com entrar-hi i tots els mods del modpack.",
    },
    es: {
      title: "MineUAB Create",
      description:
        "La beta cerrada de MineUAB Create, el servidor de mineuab con el mod Create: cómo funciona, cómo entrar y todos los mods del modpack.",
    },
  },
  "/mapa": {
    ca: {
      title: "Mapa del món",
      description:
        "El mapa en directe del servidor de Minecraft mineuab: construccions, camins i jugadors connectats.",
    },
    es: {
      title: "Mapa del mundo",
      description:
        "El mapa en directo del servidor de Minecraft mineuab: construcciones, caminos y jugadores conectados.",
    },
  },
  "/ranquing": {
    ca: {
      title: "Rànquing de crèdits",
      description: "Qui té més crèdits al servidor de Minecraft mineuab, en directe, i com se'n guanyen.",
    },
    es: {
      title: "Ranking de créditos",
      description: "Quién tiene más créditos en el servidor de Minecraft mineuab, en directo, y cómo se ganan.",
    },
  },
  "/jugadors": {
    ca: {
      title: "Jugadors",
      description:
        "Tots els jugadors del servidor de Minecraft mineuab: busca'n un i obre el seu carnet, amb la skin, la carrera i les estadístiques.",
    },
    es: {
      title: "Jugadores",
      description:
        "Todos los jugadores del servidor de Minecraft mineuab: busca uno y abre su carnet, con la skin, la carrera y las estadísticas.",
    },
  },
  "/receptes": {
    ca: {
      title: "Receptes",
      description:
        "Les receptes que només trobaràs al servidor de Minecraft mineuab, en directe des del servidor: què es fa, amb quins ingredients i on.",
    },
    es: {
      title: "Recetas",
      description:
        "Las recetas que solo encontrarás en el servidor de Minecraft mineuab, en directo desde el servidor: qué se hace, con qué ingredientes y dónde.",
    },
  },
  "/galeria": {
    ca: {
      title: "Galeria de construccions",
      description: "Els racons de l'Autònoma que la comunitat de mineuab ha construït al servidor de Minecraft.",
    },
    es: {
      title: "Galería de construcciones",
      description: "Los rincones de la Autónoma que la comunidad de mineuab ha construido en el servidor de Minecraft.",
    },
  },
  "/normes": {
    ca: {
      title: "Normes del servidor",
      description: "Les normes del servidor de Minecraft mineuab perquè tothom s'hi senti a gust.",
    },
    es: {
      title: "Normas del servidor",
      description: "Las normas del servidor de Minecraft mineuab para que todo el mundo esté a gusto.",
    },
  },
  "/estrelles": {
    ca: {
      title: "El pacte de les estrelles",
      description:
        "Com funciona el PvP a mineuab: lluitar, quedar-se el botí i atacar bases només entre qui ha signat el pacte de les estrelles, i segons les estrelles de tots dos.",
    },
    es: {
      title: "El pacto de las estrellas",
      description:
        "Cómo funciona el PvP en mineuab: luchar, quedarse el botín y atacar bases solo entre quienes han firmado el pacto de las estrellas, y según las estrellas de ambos.",
    },
  },
  "/faq": {
    ca: {
      title: "Preguntes freqüents",
      description: "Com entrar, quina versió cal, com registrar-se i altres dubtes sobre el servidor de Minecraft mineuab.",
    },
    es: {
      title: "Preguntas frecuentes",
      description: "Cómo entrar, qué versión hace falta, cómo registrarse y otras dudas sobre el servidor de Minecraft mineuab.",
    },
  },
  "/historia": {
    ca: {
      title: "La nostra història",
      description:
        "Com un servidor de Minecraft entre amics de l'Autònoma es va convertir en mineuab, una comunitat oberta a tothom.",
    },
    es: {
      title: "Nuestra historia",
      description:
        "Cómo un servidor de Minecraft entre amigos de la Autónoma se convirtió en mineuab, una comunidad abierta a todos.",
    },
  },
  "/privacitat": {
    ca: {
      title: "Privacitat",
      description: "Quines dades mostra la web de mineuab, d'on surten i què pots fer si no hi vols sortir.",
    },
    es: {
      title: "Privacidad",
      description: "Qué datos muestra la web de mineuab, de dónde salen y qué puedes hacer si no quieres aparecer.",
    },
  },
  "/avis-legal": {
    ca: {
      title: "Avís legal",
      description: "Qui hi ha darrere de mineuab, un projecte d'estudiants sense ànim de lucre, i què cal saber de la web.",
    },
    es: {
      title: "Aviso legal",
      description: "Quién hay detrás de mineuab, un proyecto de estudiantes sin ánimo de lucro, y qué hay que saber de la web.",
    },
  },
} satisfies Record<string, Record<Locale, PageText>>;

export type PagePath = keyof typeof PAGES;
export const PAGE_PATHS = Object.keys(PAGES) as PagePath[];

/** Adreça canònica de la pàgina i les seves versions en cada idioma (hreflang). */
function alternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localePath(path, locale),
    languages: { ca: localePath(path, "ca"), es: localePath(path, "es"), "x-default": localePath(path, "ca") },
  };
}

/** Les metadades comunes de totes les pàgines d'un idioma. */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL),
    title: {
      default: TITLE[locale],
      template: "%s · mineuab",
    },
    description: DESCRIPTION[locale],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      siteName: "mineuab",
      locale: locale === "ca" ? "ca_ES" : "es_ES",
      alternateLocale: [locale === "ca" ? "es_ES" : "ca_ES"],
      title: TITLE[locale],
      description: DESCRIPTION[locale],
      images: [
        {
          url: "/assets/og.jpg",
          width: 1200,
          height: 630,
          alt: locale === "ca" ? "La plaça cívica de mineuab" : "La plaza cívica de mineuab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE[locale],
      description: DESCRIPTION[locale],
      images: ["/assets/og.jpg"],
    },
  };
}

/** Qui és mineuab per als cercadors. El Discord no hi és perquè l'enllaç és una invitació, no un perfil. */
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "mineuab",
    alternateName: "MineUAB",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-square.png`,
    description: DESCRIPTION[locale],
    sameAs: [YOUTUBE_URL, INSTAGRAM_URL, TWITCH_URL],
  };
}

export function pageMetadata(locale: Locale, path: PagePath): Metadata {
  return { ...PAGES[path][locale], alternates: alternates(locale, path) };
}

export function playerMetadata(locale: Locale, name: string): Metadata {
  return {
    title: name,
    description:
      locale === "ca"
        ? `El carnet de jugador de ${name} a mineuab: skin, carrera, crèdits i estadístiques del servidor.`
        : `El carnet de jugador de ${name} en mineuab: skin, carrera, créditos y estadísticas del servidor.`,
    alternates: alternates(locale, `/jugador/${encodeURIComponent(name)}`),
  };
}
