"use client";

import Link from "@/i18n/LocaleLink";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useServerStatus } from "@/lib/useServerStatus";

/** Indicador "N jugadors en línia" en directe. No mostra res fins que arriba l'estat. */
export default function ServerStatusPill({
  className = "inline-flex",
}: {
  className?: string;
}) {
  const { t } = useLanguage();
  const status = useServerStatus();
  if (!status) return null;

  const label = !status.online
    ? t("server.offline")
    : status.players === 0
      ? t("server.online")
      : t(status.players === 1 ? "server.playersOne" : "server.playersMany", {
          count: status.players,
        });

  return (
    <Link
      href="/#com-entrar"
      className={`items-center gap-2 whitespace-nowrap border-2 border-ink px-3 py-1.5 text-sm font-bold transition-colors ${
        status.online
          ? "bg-brand-600 text-white hover:bg-brand-700"
          : "bg-paper-200 text-ink-700 hover:bg-paper-300"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-2 w-2 ${status.online ? "animate-blink bg-white" : "bg-ink-500"}`}
      />
      {label}
    </Link>
  );
}
