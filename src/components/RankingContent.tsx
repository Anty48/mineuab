"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PHOTOS } from "@/lib/gallery";
import { useRanking, type Ranking, type RankingEntry } from "@/lib/useRanking";
import PageHeader from "@/components/PageHeader";
import DiscordCta from "@/components/DiscordCta";

interface EarnWay {
  icon: string;
  title: string;
  body: string;
  /** Ordre que es mostra sota la descripció. */
  command?: string;
}

interface CommandHelp {
  command: string;
  body: string;
}

const MEDALS = ["🥇", "🥈", "🥉"];

/** "fa 2 minuts", "ara" … a partir de l'hora en què el servidor va calcular el rànquing. */
function timeAgo(iso: string, locale: string) {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";
  // Si el rellotge de l'ordinador va endarrerit, no volem "d'aquí a 3 segons".
  const seconds = Math.min(0, (time - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (seconds > -60) return rtf.format(0, "second");
  if (seconds > -3600) return rtf.format(Math.round(seconds / 60), "minute");
  return rtf.format(Math.round(seconds / 3600), "hour");
}

export default function RankingContent() {
  const { t, raw } = useLanguage();
  const ranking = useRanking();
  const earn = raw<EarnWay[]>("ranking.earn.items") ?? [];
  const commands = raw<CommandHelp[]>("ranking.commands.items") ?? [];

  return (
    <>
      <PageHeader
        crumb={t("nav.ranking")}
        title={t("ranking.title")}
        subtitle={t("ranking.subtitle")}
        image={PHOTOS.placaCivica}
        caption={t("gallery.items.civicSquare")}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">{t("ranking.boardTitle")}</h2>
            <LiveTag ranking={ranking} />
          </div>

          {ranking === "loading" && <BoardSkeleton />}
          {ranking === null && (
            <p className="mt-8 max-w-2xl border-l-4 border-terra-500 bg-terra-100 px-4 py-3 text-ink-700">
              {t("ranking.unavailable")}
            </p>
          )}
          {ranking && ranking !== "loading" && <Board ranking={ranking} />}
        </div>
      </section>

      <section className="border-y-2 border-ink bg-paper-50 py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="section-title">{t("ranking.earn.title")}</h2>
            <p className="section-subtitle">{t("ranking.earn.subtitle")}</p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {earn.map((way) => (
              <li key={way.title} className="block-card flex flex-col p-6">
                <span aria-hidden className="text-3xl">
                  {way.icon}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold">{way.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{way.body}</p>
                {way.command && <code className="code-line mt-auto w-fit pt-2">{way.command}</code>}
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-display text-3xl font-extrabold">{t("ranking.commands.title")}</h2>
          <dl className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {commands.map((c) => (
              <div key={c.command}>
                <dt>
                  <code className="code-line w-fit">{c.command}</code>
                </dt>
                <dd className="mt-1.5 text-ink-600">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <DiscordCta title={t("ranking.ctaTitle")} body={t("ranking.ctaBody")} />
    </>
  );
}

function LiveTag({ ranking }: { ranking: Ranking | null | "loading" }) {
  const { t, locale } = useLanguage();
  if (!ranking || ranking === "loading") return null;

  return (
    <p className="flex items-center gap-2 font-pixel text-[11px] uppercase text-ink-600">
      <span aria-hidden className="h-2 w-2 animate-blink bg-brand-500" />
      {t("ranking.live")}
      {ranking.updated && (
        <span className="normal-case text-ink-500">
          · {t("ranking.updated", { time: timeAgo(ranking.updated, locale) })}
        </span>
      )}
    </p>
  );
}

function Board({ ranking }: { ranking: Ranking }) {
  const { t, locale } = useLanguage();
  // Els crèdits són sempre sencers (economy.decimals: false al plugin).
  const number = new Intl.NumberFormat(locale === "ca" ? "ca-ES" : "es-ES", { maximumFractionDigits: 0 });
  const amount = (n: number) => t("ranking.amount", { amount: number.format(n) });

  if (ranking.top.length === 0) {
    return <p className="mt-8 text-lg text-ink-600">{t("ranking.empty")}</p>;
  }

  const podium = ranking.top.slice(0, 3);
  const rest = ranking.top.slice(3);

  return (
    <>
      {/* Al mòbil, en ordre; a l'escriptori, com un podi: 2n, 1r, 3r. */}
      <ol className="mt-10 grid items-end gap-6 sm:grid-cols-3">
        {podium.map((entry, i) => (
          <PodiumCard key={entry.name} entry={entry} medal={MEDALS[i]} amount={amount(entry.credits)} />
        ))}
      </ol>

      {rest.length > 0 && (
        <ol className="mt-10 border-t-2 border-ink" start={4}>
          {rest.map((entry) => (
            <li
              key={entry.name}
              className="flex items-center gap-4 border-b-2 border-ink/15 py-4 sm:gap-6"
            >
              <span className="w-10 shrink-0 font-pixel text-sm text-ink-500">
                {String(entry.rank).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 truncate font-display text-lg font-bold">{entry.name}</span>
              <span className="shrink-0 font-mono font-bold text-brand-600">{amount(entry.credits)}</span>
            </li>
          ))}
        </ol>
      )}

      <dl className="mt-10 grid max-w-xl grid-cols-2 border-2 border-ink bg-paper-50 shadow-block-sm">
        <div className="flex flex-col-reverse border-r-2 border-ink p-4">
          <dt className="font-pixel text-[10px] uppercase text-ink-500">{t("ranking.total")}</dt>
          <dd className="font-mono text-xl font-bold">{amount(ranking.totalCredits)}</dd>
        </div>
        <div className="flex flex-col-reverse p-4">
          <dt className="font-pixel text-[10px] uppercase text-ink-500">{t("ranking.players")}</dt>
          <dd className="font-mono text-xl font-bold">{number.format(ranking.rankedPlayers)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-ink-500">{t("ranking.inGame")}</p>
    </>
  );
}

function PodiumCard({ entry, medal, amount }: { entry: RankingEntry; medal: string; amount: string }) {
  const first = entry.rank === 1;
  const order = first ? "sm:order-2" : entry.rank === 2 ? "sm:order-1" : "sm:order-3";

  return (
    <li className={`border-2 border-ink bg-paper-50 ${first ? "shadow-block-lg" : "shadow-block"} ${order}`}>
      <div
        className={`flex items-center justify-between border-b-2 border-ink px-5 py-3 ${
          first ? "bg-brand-500 text-white" : "bg-paper-200"
        }`}
      >
        <span className="font-pixel text-sm">#{entry.rank}</span>
        <span aria-hidden className="text-2xl">
          {medal}
        </span>
      </div>
      <div className={`px-5 ${first ? "py-10" : "py-6"}`}>
        <p className={`break-all font-display font-extrabold ${first ? "text-3xl" : "text-2xl"}`}>
          {entry.name}
        </p>
        <p className="mt-2 font-mono text-lg font-bold text-brand-600">{amount}</p>
      </div>
    </li>
  );
}

function BoardSkeleton() {
  const { t } = useLanguage();

  return (
    <div className="mt-10" aria-busy="true">
      <p className="sr-only">{t("ranking.loading")}</p>
      <div aria-hidden className="grid items-end gap-6 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`animate-pulse border-2 border-ink/20 bg-paper-200 ${i === 1 ? "h-48" : "h-36"}`}
          />
        ))}
      </div>
    </div>
  );
}
