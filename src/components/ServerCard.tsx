"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SERVER_ADDRESS } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { useServerStatus } from "@/lib/useServerStatus";
import { CheckIcon, CopyIcon } from "./icons";

/** The server address front and centre, with a copy button and live status. */
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
    <div
      className={`w-full max-w-lg overflow-hidden rounded-3xl border border-brand-500/50 bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 text-center shadow-2xl backdrop-blur-md ${className}`}
    >
      <div className="px-6 pb-6 pt-7 sm:px-8">
        <h3 className="text-xl font-semibold text-white">{t("server.cardTitle")}</h3>
        <p className="mt-1 min-h-[1.25rem] text-sm text-zinc-300">{statusLine}</p>
        <p className="mt-5 select-all break-all rounded-xl border border-brand-500 bg-black/70 px-4 py-4 font-mono text-2xl text-brand-300 sm:text-3xl">
          {SERVER_ADDRESS}
        </p>
      </div>

      <button
        type="button"
        onClick={() => copy(SERVER_ADDRESS)}
        className="flex w-full items-center justify-center gap-2 border-y border-brand-500 bg-brand-500 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-brand-600"
      >
        {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
        <span aria-live="polite">
          {copied ? t("server.copied") : t("server.copy")}
        </span>
      </button>

      <dl className="grid grid-cols-2 divide-x divide-zinc-700/60">
        <div className="flex flex-col-reverse px-4 py-4">
          <dt className="text-xs text-zinc-400">{t("server.version")}</dt>
          <dd className="text-lg font-semibold text-white">
            {status?.version ?? "—"}
          </dd>
        </div>
        <div className="flex flex-col-reverse px-4 py-4">
          <dt className="text-xs text-zinc-400">{t("server.access")}</dt>
          <dd className="text-lg font-semibold text-white">
            {t("server.openToAll")}
          </dd>
        </div>
      </dl>
    </div>
  );
}
