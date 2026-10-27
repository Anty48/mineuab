"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, MODRINTH_APP_URL } from "@/lib/links";
// La genera MineUAB-Create/scripts/fes_llista_web.py a partir de mods-lock.json.
import modpack from "@/lib/createModpack.json";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import DiscordCta from "@/components/DiscordCta";
import { DiscordIcon, PixelCogIcon, PlusIcon } from "@/components/icons";

interface Point {
  title: string;
  body: string;
}

interface Step {
  title: string;
  body: string;
  /** Ordres que es mostren sota el pas. */
  code?: readonly string[];
  /** Botó al final del pas: "discord" o "modrinth" (la descàrrega de Modrinth App). */
  cta?: { label: string; target: string };
}

interface Group {
  /** El grup de mods.py sense accents ni espais, com el posa fes_llista_web.py. */
  id: string;
  title: string;
  body: string;
}

const modrinthUrl = (slug: string) => `https://modrinth.com/mod/${slug}`;

export default function CreateContent() {
  const { t, raw } = useLanguage();
  const points = raw<Point[]>("create.points") ?? [];
  const steps = raw<Step[]>("create.steps") ?? [];
  const texts = raw<Group[]>("create.groups") ?? [];
  // Un grup nou de mods.py que encara no té text a translations.ts surt al final, amb el seu id.
  const known = new Set(texts.map((g) => g.id));
  const groups = [
    ...texts,
    ...[...new Set(modpack.mods.map((m) => m.group))]
      .filter((id) => !known.has(id))
      .map((id) => ({ id, title: id, body: "" })),
  ];

  return (
    <>
      <PageHeader
        crumb={t("nav.createShort")}
        title={t("create.title")}
        subtitle={t("create.subtitle")}
      />

      <section className="pb-20 pt-6 md:pb-28 md:pt-10">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_minmax(0,27rem)]">
          <div>
            <SectionHeading title={t("create.howTitle")} subtitle={t("create.howSubtitle")} />
            {/* Al costat de la fitxa, entre 1024 i 1279 px, dues columnes queden massa estretes. */}
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {points.map((p) => (
                <li key={p.title} className="border-2 border-ink bg-paper-50 p-6">
                  <h3 className="flex items-center gap-3 font-display text-xl font-bold">
                    <span aria-hidden className="h-3 w-3 shrink-0 bg-brand-500" />
                    {p.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ModpackCard className="mx-auto lg:sticky lg:top-28" />
          </div>
        </div>
      </section>

      <section
        id="com-entrar"
        className="edge-top bg-brand-950 py-20 text-paper [--edge:#022112] md:py-28"
      >
        <div className="container-page">
          <SectionHeading
            title={t("create.joinTitle")}
            subtitle={t("create.joinSubtitle")}
            tone="dark"
          />

          <ol className="mt-14 max-w-3xl">
            {steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-12 last:pb-0">
                {/* Línia puntejada fins al pas següent. */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[1.75rem] top-14 w-0.5 -translate-x-1/2 opacity-50 [background-image:linear-gradient(#f4f1ea_50%,transparent_0)] [background-size:2px_10px]"
                  />
                )}
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center border-2 border-paper/80 bg-brand-500 font-pixel text-xl text-white"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-paper/75">{step.body}</p>

                  {step.code && (
                    <div className="mt-4 max-w-md space-y-2">
                      {step.code.map((line) => (
                        <code key={line} className="code-line border-paper/30">
                          {line}
                        </code>
                      ))}
                    </div>
                  )}

                  {step.cta && (
                    <a
                      href={step.cta.target === "discord" ? DISCORD_URL : MODRINTH_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary mt-5"
                    >
                      {step.cta.target === "discord" && <DiscordIcon size={18} />}
                      {step.cta.label}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-xl border-l-4 border-brand-300 bg-paper/10 px-4 py-3 text-sm leading-relaxed text-paper/85">
            {t("create.optionalTip")}
          </p>
        </div>
      </section>

      <section id="mods" className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            title={t("create.modsTitle")}
            subtitle={t("create.modsSubtitle", { count: modpack.mods.length })}
          />

          {/* En columnes perquè cada grup té una alçada diferent. */}
          <div className="mt-12 gap-6 md:columns-2">
            {groups.map((g) => {
              const mods = modpack.mods.filter((m) => m.group === g.id);
              if (mods.length === 0) return null;
              return (
                <section key={g.id} className="mb-6 break-inside-avoid border-2 border-ink bg-paper-50">
                  <header className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-5 py-4">
                    <h3 className="font-display text-2xl font-extrabold">{g.title}</h3>
                    <span className="font-pixel text-xs text-brand-600">{mods.length}</span>
                  </header>
                  <div className="p-5">
                    {g.body && <p className="mb-4 leading-relaxed text-ink-600">{g.body}</p>}
                    <ul className="flex flex-wrap gap-2">
                      {mods.map((m) => (
                        <li key={m.slug}>
                          <a
                            href={modrinthUrl(m.slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border-2 border-ink bg-white px-2.5 py-1 text-sm font-semibold transition-colors hover:bg-brand-500 hover:text-white"
                          >
                            {m.name}
                            {(m.optional || m.serverOnly) && (
                              <span className="font-pixel text-[9px] uppercase opacity-70">
                                {t(m.optional ? "create.optional" : "create.serverOnly")}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>

          <details className="group mt-2 border-y-2 border-ink">
            <summary className="flex cursor-pointer list-none items-center gap-4 py-5 transition-colors hover:text-brand-600 [&::-webkit-details-marker]:hidden">
              <span className="flex-1 font-display text-lg font-bold">
                {t("create.libraries", { count: modpack.libraries.length })}
              </span>
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors group-open:bg-brand-500 group-open:text-white"
              >
                <PlusIcon size={18} className="transition-transform group-open:rotate-45" />
              </span>
            </summary>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 pb-6 text-sm">
              {modpack.libraries.map((l) => (
                <li key={l.slug}>
                  <a
                    href={modrinthUrl(l.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-600 underline decoration-ink/30 underline-offset-2 hover:text-brand-600"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <DiscordCta title={t("create.ctaTitle")} body={t("create.ctaBody")} />
    </>
  );
}

/** La fitxa del modpack, com el carnet de jugador de l'inici però sense adreça: el servidor ja ve dins. */
function ModpackCard({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const rows = [
    { label: t("create.minecraft"), value: modpack.minecraft },
    { label: t("create.loader"), value: modpack.neoforge },
    { label: t("create.modCount"), value: String(modpack.mods.length) },
    { label: t("create.version"), value: modpack.version ?? "—" },
  ];

  return (
    <div className={`w-full max-w-md border-2 border-ink bg-paper-50 text-ink shadow-block ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-brand-500 px-5 py-4 text-white">
        <div>
          <p className="font-pixel text-[11px] uppercase text-brand-100">{t("create.cardTag")}</p>
          <h3 className="mt-1 font-display text-2xl font-extrabold">{t("create.title")}</h3>
        </div>
        <PixelCogIcon size={44} />
      </div>

      <div className="px-5 pt-5">
        <p className="field-label">{t("create.status")}</p>
        <p className="mt-1 flex items-center gap-2.5 font-display text-2xl font-extrabold">
          <span aria-hidden className="h-2.5 w-2.5 shrink-0 animate-blink bg-brand-500" />
          {t("create.statusValue")}
        </p>

        <dl className="mt-4 grid grid-cols-2 border-t-2 border-dashed border-ink/25">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`flex flex-col-reverse border-b-2 border-dashed border-ink/25 py-3 ${
                i % 2 ? "border-l-2 pl-3" : "pr-3"
              }`}
            >
              <dt className="field-label">{r.label}</dt>
              <dd className="truncate font-mono text-sm font-bold">{r.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-ink-600">{t("create.cardNote")}</p>
      </div>

      <div className="p-5">
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full py-3 text-base"
        >
          <DiscordIcon size={20} />
          {t("create.cardCta")}
        </a>
      </div>
    </div>
  );
}
