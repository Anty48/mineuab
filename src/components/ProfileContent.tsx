"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/translations";
import { minecraftName } from "@/lib/minecraftNames";
import { timeAgo, useProfile, type Profile } from "@/lib/useProfiles";
import CareerTag from "./CareerTag";
import { ArrowIcon } from "./icons";
import PactStars from "./PactStars";
import PageHeader from "./PageHeader";
import PlayerHead from "./PlayerHead";
import type { SkinPose } from "./SkinViewer";

// three.js pesa: només es baixa a les pàgines de perfil, i al navegador.
const SkinViewer = dynamic(() => import("./SkinViewer"), { ssr: false });

const POSES: SkinPose[] = ["walk", "run", "wave", "fly", "crouch"];

const BADGE_STYLES: Record<string, string> = {
  admin: "bg-terra-500 text-white",
  mod: "bg-brand-700 text-white",
  helper: "bg-brand-200 text-ink",
  donor: "bg-[#f2c94c] text-ink",
};

const TRIVIA = [
  "jumps",
  "chestsOpened",
  "itemsCrafted",
  "villagerTrades",
  "animalsBred",
  "fishCaught",
  "timesSlept",
  "cakeSlices",
  "recordsPlayed",
  "toolsBroken",
  "playerKills",
  "raidsWon",
];

function numberFormat(locale: Locale, maximumFractionDigits = 0) {
  return new Intl.NumberFormat(locale === "ca" ? "ca-ES" : "es-ES", { maximumFractionDigits });
}

/** Un número de 7 xifres que comença per 1, com els NIU de la UAB. Sempre el mateix per a cada nom. */
function niu(name: string) {
  let hash = 0;
  for (const c of name.toLowerCase()) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  return String(1_000_000 + (hash % 1_000_000));
}

/** El curs acadèmic d'ara: de setembre a agost ("2026-27"). */
function course(now = new Date()) {
  const start = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, "0")}`;
}

export default function ProfileContent({ name }: { name: string }) {
  const { t } = useLanguage();
  const profile = useProfile(name);

  if (profile === "loading") return <ProfileSkeleton name={name} />;

  if (typeof profile === "string") {
    const key = profile === "not-found" ? "notFound" : profile === "private" ? "private" : "unavailable";
    return (
      <>
        <PageHeader
          crumb={t("nav.players")}
          title={key === "unavailable" ? name : t(`profile.${key}Title`, { name })}
          subtitle={t(`profile.${key}Body`, { name })}
        />
        <section className="py-16">
          <div className="container-page">
            <Link href="/jugadors" className="btn-primary">
              {t("profile.backToList")}
            </Link>
          </div>
        </section>
      </>
    );
  }

  return <ProfileView profile={profile} />;
}

function ProfileView({ profile }: { profile: Profile }) {
  const { t, locale } = useLanguage();
  const fmt = numberFormat(locale);
  const counters = profile.stats.counters;
  const km = Object.values(profile.stats.distances).reduce((a, b) => a + b, 0);

  return (
    <>
      <header className="bg-gradient-to-b from-paper-200/80 to-paper">
        <div className="container-page py-10 md:py-14">
          <p className="eyebrow">
            <Link href="/" className="hover:underline">
              mineuab
            </Link>
            <span aria-hidden>/</span>
            <Link href="/jugadors" className="hover:underline">
              {t("nav.players")}
            </Link>
            <span aria-hidden>/</span>
            <span className="normal-case">{profile.name}</span>
          </p>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <SkinStage profile={profile} />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                {profile.career && <CareerTag career={profile.career} variant="solid" />}
                {profile.badges.map((b) => (
                  <span
                    key={b.id}
                    className={`border-2 border-ink px-3 py-1 font-pixel text-xs uppercase ${
                      BADGE_STYLES[b.id] ?? "bg-paper-50 text-ink"
                    }`}
                  >
                    {b.name}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 break-all font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
                {profile.name}
              </h1>
              <Presence profile={profile} />
              <PlayerCard profile={profile} />
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <h2 className="section-title">{t("profile.statsTitle")}</h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            <StatTile label={t("profile.stats.hours")} value={numberFormat(locale, 1).format(profile.stats.hours)} />
            <StatTile
             
              label={t("profile.stats.credits")}
              value={profile.credits ? numberFormat(locale, 2).format(profile.credits.total) : "—"}
              note={profile.credits?.rank ? t("profile.rank", { rank: profile.credits.rank }) : undefined}
              href={profile.credits?.rank ? "/ranquing" : undefined}
            />
            <StatTile label={t("profile.stats.blocksMined")} value={fmt.format(counters.blocksMined ?? 0)} />
            <StatTile label={t("profile.stats.km")} value={numberFormat(locale, 1).format(km)} />
            <StatTile label={t("profile.stats.mobKills")} value={fmt.format(counters.mobKills ?? 0)} />
            <StatTile label={t("profile.stats.diamonds")} value={fmt.format(counters.diamonds ?? 0)} />
            <StatTile label={t("profile.stats.deaths")} value={fmt.format(counters.deaths ?? 0)} />
            {profile.advancements && <AdvancementsTile done={profile.advancements.done} total={profile.advancements.total} />}
          </ul>
        </div>
      </section>

      <Highlights profile={profile} />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <Travel distances={profile.stats.distances} total={km} />
          <Trivia counters={counters} />
        </div>
      </section>

      <section className="border-t-2 border-ink bg-brand-500 py-10 text-white">
        <div className="container-page flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-pretty">{t("profile.itsYou")}</p>
          <p className="shrink-0 font-pixel text-[10px] uppercase text-brand-100">
            {t("profile.updated", { time: timeAgo(profile.updated, locale) })}
          </p>
        </div>
      </section>
    </>
  );
}

function Presence({ profile }: { profile: Profile }) {
  const { t, locale } = useLanguage();
  return (
    <p className="mt-5 flex items-center gap-2 font-pixel text-[11px] uppercase text-ink-600">
      <span
        aria-hidden
        className={`h-2.5 w-2.5 shrink-0 ${profile.online ? "animate-blink bg-brand-500" : "bg-ink/30"}`}
      />
      {profile.online
        ? t("profile.onlineNow")
        : profile.lastSeen
          ? t("profile.seenAgo", { time: timeAgo(profile.lastSeen, locale) })
          : t("profile.offline")}
    </p>
  );
}

/** La skin en 3D sobre un cel i un bloc de gespa, amb botons per canviar-ne la postura. */
function SkinStage({ profile }: { profile: Profile }) {
  const { t } = useLanguage();
  const [pose, setPose] = useState<SkinPose>("walk");
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  const skin = profile.skin;
  const poses = POSES.filter((p) => p !== "fly" || skin?.cape);

  return (
    <figure className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink [background:linear-gradient(#78b4ee,#cfe6f8_70%)]">
        {/* Núvols de píxels. */}
        <span aria-hidden className="absolute left-[8%] top-[10%] h-5 w-24 bg-white/85 shadow-[24px_-12px_0_-2px_rgba(255,255,255,0.85)]" />
        <span aria-hidden className="absolute right-[10%] top-[24%] h-4 w-16 bg-white/70 shadow-[-18px_-10px_0_-2px_rgba(255,255,255,0.7)]" />
        {/* Terra: gespa i terra, com un bloc. */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[16%] border-t-[10px] border-[#5d9e34] bg-[#866043] [background-image:linear-gradient(90deg,rgba(0,0,0,0.12)_50%,transparent_0),linear-gradient(rgba(0,0,0,0.08)_50%,transparent_0)] [background-size:24px_24px,24px_24px]"
        />
        <div className="absolute inset-0">
          {skin && !failed ? (
            <SkinViewer
              skin={skin.url}
              slim={skin.slim}
              cape={skin.cape}
              pose={pose}
              label={t("profile.skinLabel", { name: profile.name })}
              onError={onError}
            />
          ) : (
            <div className="grid h-full place-items-center pb-[16%]">
              <div className="flex flex-col items-center gap-4 text-center">
                <PlayerHead size={96} className="border-2 border-ink" />
                <p className="max-w-[16rem] font-pixel text-[11px] uppercase text-ink-700">{t("profile.noSkin")}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {skin && !failed && (
        <figcaption className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <div role="group" aria-label={t("profile.poses.label")} className="flex flex-wrap border-2 border-ink bg-paper-50">
            {poses.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={pose === p}
                onClick={() => setPose(p)}
                className="border-r-2 border-ink px-3 py-1.5 text-sm font-bold last:border-r-0 hover:bg-brand-50 aria-pressed:bg-brand-500 aria-pressed:text-white"
              >
                {t(`profile.poses.${p}`)}
              </button>
            ))}
          </div>
          <span className="font-pixel text-[10px] uppercase text-ink-500">{t("profile.dragHint")}</span>
        </figcaption>
      )}
    </figure>
  );
}

/** Les dades del jugador en forma de carnet de la UAB. */
function PlayerCard({ profile }: { profile: Profile }) {
  const { t, locale } = useLanguage();
  const date = (iso?: string) =>
    iso
      ? new Intl.DateTimeFormat(locale === "ca" ? "ca-ES" : "es-ES", { dateStyle: "long" }).format(new Date(iso))
      : "—";

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: t("profile.niu"), value: <span className="font-mono">{niu(profile.name)}</span> },
    {
      label: t("profile.career"),
      value: profile.career ? <CareerTag career={profile.career} /> : t("profile.noCareer"),
    },
    { label: t("profile.since"), value: date(profile.firstSeen) },
    {
      label: t("profile.lastSeen"),
      value: profile.online ? t("profile.now") : profile.lastSeen ? date(profile.lastSeen) : "—",
    },
  ];

  return (
    <div className="mt-8 border-2 border-ink bg-paper-50">
      <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-brand-500 px-5 py-3 text-white">
        <p className="font-pixel text-[11px] uppercase">{t("profile.cardTag")}</p>
        <p className="font-pixel text-[11px] uppercase text-brand-100">{t("profile.course", { course: course() })}</p>
      </div>
      <div className="flex items-start gap-5 p-5">
        <PlayerHead src={profile.head} size={72} className="border-2 border-ink" />
        <dl className="grid min-w-0 flex-1 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.label} className="flex min-w-0 flex-col-reverse">
              <dt className="font-pixel text-[10px] uppercase text-ink-500">{r.label}</dt>
              <dd className="truncate text-sm font-bold">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      {profile.stars !== undefined && <PactStrip stars={profile.stars} />}
    </div>
  );
}

/** La franja de baix del carnet: les estrelles del pacte i el nom del nivell, amb l'enllaç a /estrelles. */
function PactStrip({ stars }: { stars: number }) {
  const { t, raw } = useLanguage();
  const level = raw<{ name: string }[]>("stars.levels")?.[stars];

  return (
    <Link
      href="/estrelles"
      className="group flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t-2 border-ink bg-ink px-5 py-3 text-paper"
    >
      <span className="flex items-center gap-3">
        <PactStars count={stars} size={16} />
        <span className="sr-only">{t("profile.pactStars", { n: stars })}:</span>
        <span className="font-display text-lg font-extrabold leading-none">{level?.name}</span>
      </span>
      <span className="flex items-center gap-2 font-pixel text-[10px] uppercase text-paper/60 transition-colors group-hover:text-paper">
        {t("profile.pact")}
        <ArrowIcon size={14} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function StatTile({
  label,
  value,
  note,
  href,
}: {
  label: string;
  value: string;
  note?: string;
  href?: string;
}) {
  return (
    <li className="block-card flex flex-col p-4 sm:p-5">
      <p className="break-all font-display text-2xl font-extrabold tabular-nums tracking-tight sm:text-4xl">{value}</p>
      <p className="mt-1 font-pixel text-[10px] uppercase text-ink-500">{label}</p>
      {note &&
        (href ? (
          <Link href={href} className="mt-3 w-fit font-bold text-brand-600 underline-offset-4 hover:underline">
            {note}
          </Link>
        ) : (
          <p className="mt-3 font-bold text-brand-600">{note}</p>
        ))}
    </li>
  );
}

/** Assoliments fets, amb una barra de blocs com la d'experiència del joc. */
function AdvancementsTile({ done, total }: { done: number; total: number }) {
  const { t } = useLanguage();
  const blocks = 20;
  const filled = total > 0 ? Math.round((done / total) * blocks) : 0;

  return (
    <li className="block-card flex flex-col p-4 sm:p-5">
      <p className="font-display text-2xl font-extrabold tabular-nums tracking-tight sm:text-4xl">
        {done}
        <span className="text-xl text-ink-500">/{total}</span>
      </p>
      <p className="mt-1 font-pixel text-[10px] uppercase text-ink-500">{t("profile.stats.advancements")}</p>
      <div
        role="meter"
        aria-label={t("profile.stats.advancements")}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        className="mt-4 flex gap-[2px] border-2 border-ink bg-ink p-[2px]"
      >
        {Array.from({ length: blocks }, (_, i) => (
          <span key={i} className={`h-2.5 flex-1 ${i < filled ? "bg-[#80ff20]" : "bg-ink-700"}`} />
        ))}
      </div>
    </li>
  );
}

function Highlights({ profile }: { profile: Profile }) {
  const { t, locale } = useLanguage();
  const fmt = numberFormat(locale);
  const items = (["block", "mob", "nemesis", "crafted"] as const).flatMap((key) => {
    const h = profile.stats.highlights[key];
    return h ? [{ key, ...h }] : [];
  });
  if (items.length === 0) return null;

  return (
    <section className="border-y-2 border-ink bg-paper-50 py-16 md:py-20">
      <div className="container-page">
        <h2 className="section-title">{t("profile.highlightsTitle")}</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((h) => (
            <li key={h.key} className="flex flex-col border-2 border-ink bg-paper p-5">
              <p className="font-pixel text-[10px] uppercase text-brand-600">
                {t(`profile.highlights.${h.key}.title`)}
              </p>
              <p className="mt-3 text-balance font-display text-2xl font-extrabold leading-tight">
                {minecraftName(h.id, locale)}
              </p>
              <p className="mt-auto pt-3 text-ink-600">
                {t(`profile.highlights.${h.key}.detail`, { count: fmt.format(h.count) })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Quilòmetres per manera de moure's: barres horitzontals d'un sol color, de més a menys. */
function Travel({ distances, total }: { distances: Record<string, number>; total: number }) {
  const { t, locale } = useLanguage();
  const fmt = numberFormat(locale, 1);
  const rows = Object.entries(distances)
    .filter(([, km]) => km >= 0.1)
    .sort((a, b) => b[1] - a[1]);
  const max = rows[0]?.[1] ?? 0;

  return (
    <div>
      <h2 className="section-title">{t("profile.travelTitle")}</h2>
      <p className="section-subtitle">{t("profile.travelSubtitle", { km: fmt.format(total) })}</p>
      {rows.length === 0 ? (
        <p className="mt-8 text-ink-600">{t("profile.travelNone")}</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {rows.map(([mode, km]) => {
            const share = total > 0 ? Math.round((km / total) * 100) : 0;
            const label = t(`profile.travel.${mode}`);
            return (
              <li
                key={mode}
                title={t("profile.travelShare", { mode: label, share })}
                className="group grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-center gap-4"
              >
                <span className="text-sm font-semibold text-ink-700">{label}</span>
                <span className="flex items-center gap-3">
                  <span
                    className="h-5 min-w-[3px] bg-brand-500 transition-colors group-hover:bg-brand-600"
                    style={{ width: `${max > 0 ? (km / max) * 100 : 0}%` }}
                  />
                  <span className="shrink-0 font-mono text-sm font-bold tabular-nums">
                    {fmt.format(km)} km
                    <span className="ml-2 font-normal text-ink-500">{share} %</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Trivia({ counters }: { counters: Record<string, number> }) {
  const { t, locale } = useLanguage();
  const fmt = numberFormat(locale);
  const items = TRIVIA.filter((key) => (counters[key] ?? 0) > 0);

  return (
    <div>
      <h2 className="section-title">{t("profile.triviaTitle")}</h2>
      <p className="section-subtitle">{t("profile.triviaSubtitle")}</p>
      {items.length === 0 ? (
        <p className="mt-8 text-ink-600">{t("profile.triviaNone")}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 border-t-2 border-ink sm:grid-cols-2 sm:gap-x-8">
          {items.map((key) => (
            <li key={key} className="flex items-baseline gap-3 border-b-2 border-ink/15 py-3">
              <span className="font-mono text-lg font-bold tabular-nums">{fmt.format(counters[key])}</span>
              <span className="text-ink-600">{t(`profile.trivia.${key}`)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProfileSkeleton({ name }: { name: string }) {
  const { t } = useLanguage();
  return (
    <header className="bg-gradient-to-b from-paper-200/80 to-paper" aria-busy="true">
      <p className="sr-only">{t("profile.loading")}</p>
      <div aria-hidden className="container-page grid gap-10 py-10 md:py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="mx-auto aspect-[4/5] w-full max-w-md animate-pulse border-2 border-ink/20 bg-paper-200 lg:max-w-none" />
        <div className="pt-12">
          <p className="break-all font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink/25 md:text-7xl">
            {name}
          </p>
          <div className="mt-8 h-56 animate-pulse border-2 border-ink/20 bg-paper-200" />
        </div>
      </div>
    </header>
  );
}
