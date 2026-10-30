"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { localePath } from "./paths";

/** Com el Link de Next, però les adreces internes es queden a l'idioma de la pàgina: href="/mapa" va a /es/mapa. */
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const { locale } = useLanguage();
  return <Link href={localePath(href, locale)} {...props} />;
}
