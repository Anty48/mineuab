// Lloc únic per a l'adreça del servidor i els enllaços de la comunitat.

/** El que escriuen els jugadors a Minecraft. També és el futur domini de la web. */
export const SERVER_ADDRESS = "www.mineuab.org";
export const SITE_URL = "https://www.mineuab.org";

export const DISCORD_URL = "https://discord.gg/CfXau5xy3U";
// Actualitzeu-los amb els comptes reals quan els tinguem.
export const INSTAGRAM_URL = "https://instagram.com/mineuab";
export const TWITCH_URL = "https://twitch.tv/mineuab";

export const SOCIAL_LINKS = [
  { name: "Discord", href: DISCORD_URL },
  { name: "Instagram", href: INSTAGRAM_URL },
  { name: "Twitch", href: TWITCH_URL },
] as const;

// Les claus dels enllaços apunten a translations.ts.

/** Navegació superior. */
export const NAV_LINKS = [
  { href: "/#com-entrar", key: "nav.howToJoin" },
  { href: "/galeria", key: "nav.gallery" },
  { href: "/normes", key: "nav.rules" },
  { href: "/faq", key: "nav.faq" },
  { href: "/historia", key: "nav.history" },
] as const;

/** Totes les pàgines i seccions de l'inici, llistades al peu de pàgina. */
export const SITE_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/#com-entrar", key: "nav.howToJoin" },
  { href: "/#sobre-nosaltres", key: "nav.about" },
  { href: "/galeria", key: "nav.gallery" },
  { href: "/normes", key: "nav.rules" },
  { href: "/faq", key: "faq.title" },
  { href: "/historia", key: "nav.history" },
  { href: "/#xarxes", key: "nav.socials" },
] as const;
