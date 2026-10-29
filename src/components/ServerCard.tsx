"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SERVER_ADDRESS, WHITELIST_ENABLED } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { useServerStatus } from "@/lib/useServerStatus";
import { CheckIcon, CopyIcon } from "./icons";

/** L'adreça del servidor en forma de carnet de jugador, amb botó de copiar i estat en directe. */
export default function ServerCard({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const status = useServerStatus();
  const { copied, copy } = useCopyToClipboard();

  let statusLine = "";
  if (status && !status.online) {
    statusLine = t("server.statusOffline");
  } else if (status && status.players === 0) {
    statusLine = t("server.joinEmpty");
  } else if (status) {
    statusLine = t(status.players === 1 ? "server.joinOne" : "server.joinMany", {
      count: status.players,
    });
  }

  return (
    <div className={`w-full max-w-md border-2 border-ink bg-paper-50 text-ink shadow-block ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-brand-600 px-5 py-4 text-white">
        <div>
          <p className="font-pixel text-[11px] uppercase text-brand-100">{t("server.cardTag")}</p>
          <h3 className="mt-1 font-display text-2xl font-extrabold">{t("server.cardTitle")}</h3>
        </div>
        {/* L'original fa 1200×1000. */}
        <Image
          src="/assets/square_w.png"
          alt=""
          width={58}
          height={48}
          className="h-12 w-auto"
        />
      </div>

      <div className="px-5 pt-5">
        <p className="font-pixel text-[10px] uppercase text-ink-500">{t("server.ipLabel")}</p>
        <p className="mt-1 select-all break-all font-mono text-2xl font-bold text-ink sm:text-[1.7rem]">
          {SERVER_ADDRESS}
        </p>
        <p className="mt-2 min-h-[1.25rem] text-sm text-ink-600">{statusLine}</p>

        <dl className="mt-4 grid grid-cols-3 border-y-2 border-dashed border-ink/25">
          <div className="flex flex-col-reverse py-3 pr-2">
            <dt className="font-pixel text-[10px] uppercase text-ink-500">{t("server.status")}</dt>
            <dd className="flex items-center gap-1.5 text-sm font-bold">
              <span
                aria-hidden
                className={`h-2 w-2 shrink-0 ${
                  !status ? "bg-ink/20" : status.online ? "animate-blink bg-brand-500" : "bg-terra-500"
                }`}
              />
              {!status ? "—" : status.online ? t("server.online") : t("server.offline")}
            </dd>
          </div>
          <div className="flex flex-col-reverse border-x-2 border-dashed border-ink/25 px-3 py-3">
            <dt className="font-pixel text-[10px] uppercase text-ink-500">{t("server.version")}</dt>
            <dd className="truncate text-sm font-bold">{status?.version ?? "—"}</dd>
          </div>
          <div className="flex flex-col-reverse py-3 pl-3">
            <dt className="font-pixel text-[10px] uppercase text-ink-500">{t("server.access")}</dt>
            <dd className="text-sm font-bold">
              {t(WHITELIST_ENABLED ? "server.whitelist" : "server.openToAll")}
            </dd>
          </div>
        </dl>
      </div>

      <div className="p-5">
        <button
          type="button"
          onClick={() => copy(SERVER_ADDRESS)}
          className="btn-primary w-full py-3 text-base"
        >
          {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
          <span aria-live="polite">{copied ? t("server.copied") : t("server.copy")}</span>
        </button>
      </div>
    </div>
  );
}
