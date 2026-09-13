"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useServerStatus } from "@/lib/useServerStatus";

/** Live "N players online" pill. Renders nothing until the status loads. */
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
      className={`items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        status.online
          ? "bg-brand-500 text-white hover:bg-brand-600"
          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-2 w-2 rounded-full ${
          status.online ? "animate-pulse bg-white" : "bg-zinc-500"
        }`}
      />
      {label}
    </Link>
  );
}
