"use client";

import Link from "@/i18n/LocaleLink";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SERVER_ADDRESS, WHITELIST_ENABLED } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { useServerStatus } from "@/lib/useServerStatus";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";
import { ArrowIcon, CheckIcon, CopyIcon, PlusIcon } from "@/components/icons";

interface FaqItem {
  q: string;
  a: string;
  /** Ordres que es mostren sota la resposta. */
  code?: readonly string[];
  /** Dada en directe que es mostra sota la resposta. */
  extra?: "address" | "version";
  /** Enllaç a una altra part de la web. */
  link?: { href: string; label: string };
}

export default function FaqContent() {
  const { t, raw } = useLanguage();
  const baseItems = raw<FaqItem[]>("faq.items") ?? [];
  // Amb whitelist, la pregunta de la whitelist va just després de "Cal ser de la UAB per jugar?".
  const items = WHITELIST_ENABLED
    ? [baseItems[0], raw<FaqItem>("faq.whitelistItem"), ...baseItems.slice(1)]
    : baseItems;

  return (
    <>
      <PageHeader
        crumb={t("nav.faq")}
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-4xl border-t-2 border-ink">
            {items.map((item, i) => (
              <details key={item.q} className="group border-b-2 border-ink">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-6 transition-colors hover:text-brand-600 sm:gap-6 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden className="w-8 shrink-0 font-pixel text-sm text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-balance font-display text-xl font-bold md:text-2xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors group-open:bg-brand-500 group-open:text-white"
                  >
                    <PlusIcon size={18} className="transition-transform group-open:rotate-45" />
                  </span>
                </summary>
                <div className="pb-8 pl-12 pr-2 sm:pl-14 md:pr-16">
                  <p className="text-lg leading-relaxed text-ink-700">{item.a}</p>

                  {item.code && (
                    <div className="mt-4 max-w-md space-y-2">
                      {item.code.map((line) => (
                        <code key={line} className="code-line">
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
                      className="group/link mt-5 flex w-fit items-center gap-2 font-bold text-brand-600 hover:underline"
                    >
                      {item.link.label}
                      <ArrowIcon size={18} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
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
      className="mt-4 flex items-center gap-3 border-2 border-ink bg-paper-50 px-3 py-2 font-mono font-semibold transition-colors hover:bg-white"
    >
      {SERVER_ADDRESS}
      {copied ? (
        <CheckIcon size={16} className="text-brand-600" />
      ) : (
        <CopyIcon size={16} className="text-ink-500" />
      )}
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
    <p className="mt-4 w-fit border-2 border-ink bg-paper-50 px-3 py-2 text-sm text-ink-700">
      {t("server.version")}:{" "}
      <span className="font-mono font-bold text-brand-600">{status?.version ?? "…"}</span>
    </p>
  );
}
