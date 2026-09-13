"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SERVER_ADDRESS } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { useServerStatus } from "@/lib/useServerStatus";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";
import { CheckIcon, ChevronIcon, CopyIcon } from "@/components/icons";

interface FaqItem {
  q: string;
  a: string;
  /** Commands shown under the answer. */
  code?: readonly string[];
  /** Live widget shown under the answer. */
  extra?: "address" | "version";
  /** Link to another part of the site. */
  link?: { href: string; label: string };
}

export default function FaqContent() {
  const { t, raw } = useLanguage();
  const items = raw<FaqItem[]>("faq.items") ?? [];

  return (
    <>
      <PageHeader
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
        image="/assets/trinxera-soft.jpg"
        narrow
      />

      <section className="py-20 md:py-28">
        <div className="container-page max-w-3xl space-y-3">
          {items.map((item) => (
            <details key={item.q} className="card group !p-0 open:border-zinc-700">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronIcon className="shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6">
                <p className="leading-relaxed text-zinc-300">{item.a}</p>

                {item.code && (
                  <div className="mt-4 space-y-2">
                    {item.code.map((line) => (
                      <code
                        key={line}
                        className="block break-all rounded-lg border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-brand-300"
                      >
                        {line}
                      </code>
                    ))}
                  </div>
                )}

                {item.extra === "address" && <AddressChip />}
                {item.extra === "version" && <VersionChip />}

                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-4 flex w-fit items-center gap-2 font-semibold text-brand-300 hover:text-brand-200"
                  >
                    {item.link.label}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      <DiscordCta title={t("faq.ctaTitle")} body={t("faq.ctaBody")} />
    </>
  );
}

function AddressChip() {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(SERVER_ADDRESS)}
      className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-800 bg-black px-3 py-2 font-mono text-brand-300 transition-colors hover:border-brand-500/60"
    >
      {SERVER_ADDRESS}
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} className="opacity-60" />}
      <span aria-live="polite" className="sr-only">
        {copied ? t("server.copied") : t("server.copy")}
      </span>
    </button>
  );
}

function VersionChip() {
  const { t } = useLanguage();
  const status = useServerStatus();

  return (
    <p className="mt-4 w-fit rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-zinc-300">
      {t("server.version")}:{" "}
      <span className="font-mono text-brand-300">{status?.version ?? "…"}</span>
    </p>
  );
}
