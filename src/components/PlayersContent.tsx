"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { timeAgo, usePlayers, type PlayerSummary } from "@/lib/useProfiles";
import CareerTag from "./CareerTag";
import DiscordCta from "./DiscordCta";
import PageHeader from "./PageHeader";
import PlayerHead from "./PlayerHead";

type Sort = "recent" | "hours" | "name";

const PAGE = 48;

/** Treu accents i majúscules per buscar ("fisica" troba "Física"). */
function fold(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase();
}

export default function PlayersContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const list = usePlayers();
  const [query, setQuery] = useState("");
  const [career, setCareer] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [shown, setShown] = useState(PAGE);
  const deferredQuery = useDeferredValue(query);

  const players = useMemo(() => (list && list !== "loading" ? list.players : []), [list]);
  const careers = useMemo(
    () =>
      [...new Map(players.flatMap((p) => (p.career ? [[p.career.name, p.career] as const] : []))).values()].sort(
        (a, b) => a.name.localeCompare(b.name),
      ),
    [players],
  );

  const filtered = useMemo(() => {
    const q = fold(deferredQuery.trim());
    const result = players.filter(
      (p) =>
        (!career || p.career?.name === career) &&
        (!q || fold(p.name).includes(q) || (p.career && fold(p.career.name).includes(q))),
    );
    if (sort === "hours") return [...result].sort((a, b) => b.hours - a.hours);
    if (sort === "name") return [...result].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
    // L'API ja els dona per l'última connexió, amb els connectats primer.
    return result;
  }, [players, deferredQuery, career, sort]);

  // Un nom exacte porta directament al perfil en prémer Retorn.
  const exact = players.find((p) => p.name.toLowerCase() === query.trim().toLowerCase());

  return (
    <>
      <PageHeader
        crumb={t("nav.players")}
        title={t("players.title")}
        subtitle={t("players.subtitle")}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (exact) router.push(`/jugador/${encodeURIComponent(exact.name)}`);
            }}
            className="grid gap-4 rounded-2xl border border-ink/10 bg-paper-50 p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-end"
          >
            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="field-label">{t("players.searchLabel")}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShown(PAGE);
                }}
                placeholder={t("players.searchPlaceholder")}
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 font-mono text-base placeholder:text-ink-500/70"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">{t("players.careerLabel")}</span>
              <select
                value={career}
                onChange={(e) => {
                  setCareer(e.target.value);
                  setShown(PAGE);
                }}
                className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-base"
              >
                <option value="">{t("players.allCareers")}</option>
                {careers.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">{t("players.sortLabel")}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-base"
              >
                <option value="recent">{t("players.sort.recent")}</option>
                <option value="hours">{t("players.sort.hours")}</option>
                <option value="name">{t("players.sort.name")}</option>
              </select>
            </label>
          </form>

          {list === "loading" && <ListSkeleton />}
          {list === null && (
            <p className="mt-8 max-w-2xl rounded-xl bg-terra-100 px-4 py-3 text-ink-700">
              {t("players.unavailable")}
            </p>
          )}
          {list && list !== "loading" && (
            <>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-4">
                <p className="font-display text-2xl font-bold" aria-live="polite">
                  {t("players.count", { count: filtered.length })}
                </p>
                <p className="flex items-center gap-2 text-sm font-medium text-ink-600">
                  <span aria-hidden className={`h-2 w-2 rounded-full ${list.online > 0 ? "animate-blink bg-brand-500" : "bg-ink/30"}`} />
                  {t("players.online", { count: list.online })}
                </p>
              </div>

              {filtered.length === 0 ? (
                <p className="mt-8 text-lg text-ink-600">{t("players.none")}</p>
              ) : (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.slice(0, shown).map((p) => (
                    <PlayerCard key={p.name} player={p} />
                  ))}
                </ul>
              )}

              {filtered.length > shown && (
                <div className="mt-10 flex justify-center">
                  <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn-secondary">
                    {t("players.showMore", { count: filtered.length - shown })}
                  </button>
                </div>
              )}
              <p className="mt-10 max-w-2xl text-sm text-ink-500">{t("players.privacy")}</p>
            </>
          )}
        </div>
      </section>

      <DiscordCta title={t("players.ctaTitle")} body={t("players.ctaBody")} />
    </>
  );
}

function PlayerCard({ player }: { player: PlayerSummary }) {
  const { t, locale } = useLanguage();
  const hours = new Intl.NumberFormat(locale === "ca" ? "ca-ES" : "es-ES", {
    maximumFractionDigits: player.hours < 10 ? 1 : 0,
  });

  return (
    <li>
      <Link
        href={`/jugador/${encodeURIComponent(player.name)}`}
        className="group flex h-full items-center gap-4 rounded-xl border border-ink/10 bg-paper-50 p-3 transition-colors hover:border-ink/20 hover:bg-white"
      >
        <PlayerHead src={player.head} size={52} className="rounded-md" />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-display text-lg font-bold group-hover:text-brand-600">{player.name}</span>
          {player.career ? (
            <CareerTag career={player.career} />
          ) : (
            <span className="text-sm text-ink-500">{t("players.noCareer")}</span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-ink-500">
            {player.online ? (
              <>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full animate-blink bg-brand-500" />
                <span className="font-semibold text-brand-600">{t("players.onlineNow")}</span>
              </>
            ) : (
              player.lastSeen && <span>{timeAgo(player.lastSeen, locale)}</span>
            )}
            <span aria-hidden>·</span>
            <span>{t("players.hours", { hours: hours.format(player.hours) })}</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

function ListSkeleton() {
  const { t } = useLanguage();
  return (
    <div className="mt-10" aria-busy="true">
      <p className="sr-only">{t("players.loading")}</p>
      <div aria-hidden className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-paper-200" />
        ))}
      </div>
    </div>
  );
}
