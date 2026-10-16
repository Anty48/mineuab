"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { timeAgo } from "@/lib/useProfiles";
import {
  plainName,
  stationOf,
  useRecipes,
  type Recipe,
  type RecipeBook,
  type RecipeItem,
  type Slot,
  type Station,
  type TextPart,
} from "@/lib/useRecipes";
import DiscordCta from "./DiscordCta";
import PageHeader from "./PageHeader";

/** L'ordre de les estacions a la pàgina i als filtres. */
const STATIONS: Station[] = [
  "crafting",
  "furnace",
  "blast_furnace",
  "smoker",
  "campfire",
  "brewing",
  "smithing",
  "stonecutting",
  "anvil",
];

/** Ítem que surt d'una altra recepta → id d'aquella recepta, per poder-hi saltar. */
type Sources = Map<string, string>;

export default function RecipesContent() {
  const { t, locale } = useLanguage();
  const book = useRecipes();
  const [filter, setFilter] = useState<Station | "all">("all");

  const recipes = useMemo(() => {
    if (!book || book === "loading") return [];
    return [...book.recipes].sort(
      (a, b) =>
        STATIONS.indexOf(stationOf(a)) - STATIONS.indexOf(stationOf(b)) ||
        plainName(book.items[a.result.item], locale).localeCompare(plainName(book.items[b.result.item], locale), locale),
    );
  }, [book, locale]);

  const stations = useMemo(
    () => STATIONS.filter((s) => recipes.some((r) => stationOf(r) === s)),
    [recipes],
  );

  const sources = useMemo(() => {
    const map: Sources = new Map();
    for (const r of recipes) if (!map.has(r.result.item)) map.set(r.result.item, r.id);
    return map;
  }, [recipes]);

  const shown = filter === "all" ? recipes : recipes.filter((r) => stationOf(r) === filter);

  return (
    <>
      <PageHeader
        crumb={t("nav.recipes")}
        title={t("recipes.title")}
        subtitle={t("recipes.subtitle")}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">{t("recipes.listTitle")}</h2>
            {book && book !== "loading" && (
              <p className="flex items-center gap-2 font-pixel text-[11px] uppercase text-ink-600">
                <span aria-hidden className="h-2 w-2 animate-blink bg-brand-500" />
                {t("recipes.live")}
                {book.updated && (
                  <span className="normal-case text-ink-500">
                    · {t("recipes.updated", { time: timeAgo(book.updated, locale) })}
                  </span>
                )}
              </p>
            )}
          </div>
          <p className="mt-6 max-w-3xl text-pretty text-lg text-ink-600">{t("recipes.intro")}</p>

          {book === "loading" && <RecipesSkeleton />}
          {book === null && (
            <p className="mt-8 max-w-2xl border-l-4 border-terra-500 bg-terra-100 px-4 py-3 text-ink-700">
              {t("recipes.unavailable")}
            </p>
          )}
          {book && book !== "loading" && recipes.length === 0 && (
            <p className="mt-8 text-lg text-ink-600">{t("recipes.empty")}</p>
          )}

          {book && book !== "loading" && recipes.length > 0 && (
            <>
              {stations.length > 1 && (
                <div role="group" aria-label={t("recipes.filterLabel")} className="mt-8 flex flex-wrap gap-2">
                  <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
                    {t("recipes.filterAll")} <span className="text-ink-500">{recipes.length}</span>
                  </FilterChip>
                  {stations.map((s) => (
                    <FilterChip key={s} active={filter === s} onClick={() => setFilter(s)}>
                      {t(`recipes.stations.${s}`)}{" "}
                      <span className="text-ink-500">{recipes.filter((r) => stationOf(r) === s).length}</span>
                    </FilterChip>
                  ))}
                </div>
              )}

              <ul className="mt-10 grid gap-8 lg:grid-cols-2">
                {shown.map((r) => (
                  <li key={r.id}>
                    <RecipeCard recipe={r} book={book} sources={sources} />
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-sm text-ink-500">{t("recipes.hint")}</p>
            </>
          )}
        </div>
      </section>

      <DiscordCta title={t("recipes.ctaTitle")} body={t("recipes.ctaBody")} />
    </>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="border-2 border-ink bg-paper-50 px-3 py-1.5 text-sm font-bold transition-colors hover:bg-white aria-[pressed=true]:bg-ink aria-[pressed=true]:text-paper-50 [&[aria-pressed=true]_span]:text-paper-300"
    >
      {children}
    </button>
  );
}

function RecipeCard({ recipe, book, sources }: { recipe: Recipe; book: RecipeBook; sources: Sources }) {
  const { t, locale } = useLanguage();
  const result = book.items[recipe.result.item];
  const text = result.text[locale];

  return (
    <article
      id={`recepta-${recipe.id}`}
      className="block-card flex h-full flex-col target:outline target:outline-4 target:outline-offset-4 target:outline-brand-500"
    >
      <header className="flex items-center gap-4 border-b-2 border-ink px-5 py-4">
        <ItemIcon item={result} size={48} />
        <div className="min-w-0">
          <p className="font-pixel text-[11px] uppercase text-brand-600">{t(`recipes.stations.${stationOf(recipe)}`)}</p>
          <h3 className="text-balance font-display text-2xl font-bold leading-tight">{plainName(result, locale)}</h3>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <RecipeGui recipe={recipe} book={book} sources={sources} />
        {text.lore.length > 0 && (
          <McTooltipBox text={text} className="mt-auto" />
        )}
      </div>
    </article>
  );
}

// ---- La interfície de cada estació, com al joc ----

function RecipeGui({ recipe, book, sources }: { recipe: Recipe; book: RecipeBook; sources: Sources }) {
  const { t } = useLanguage();
  const slot = (s: Slot, align: Align = "center") => (
    <ItemSlot slot={s} book={book} sources={sources} self={recipe.id} align={align} />
  );
  const result = (
    <ItemSlot
      slot={[recipe.result.item]}
      book={book}
      sources={sources}
      self={recipe.id}
      count={recipe.result.count}
      big
      align="end"
    />
  );

  let inputs: ReactNode;
  let note: string | undefined;
  switch (recipe.type) {
    case "shaped":
    case "shapeless": {
      // Les receptes sense forma s'omplen en ordre, com al llibre de receptes del joc.
      const cells: Slot[] =
        recipe.type === "shaped"
          ? Array.from({ length: 9 }, (_, i) => recipe.grid[Math.floor(i / 3)]?.[i % 3] ?? null)
          : Array.from({ length: 9 }, (_, i) => recipe.ingredients[i] ?? null);
      inputs = (
        <div className="grid grid-cols-3">
          {cells.map((c, i) => (
            <div key={i}>{slot(c, i % 3 === 0 ? "start" : "center")}</div>
          ))}
        </div>
      );
      if (recipe.type === "shapeless") note = t("recipes.shapeless");
      break;
    }
    case "smelting":
      inputs = (
        <div className="flex flex-col items-center gap-1">
          {slot(recipe.input, "start")}
          <FlameIcon />
          <EmptySlot />
        </div>
      );
      note = t("recipes.smelting", {
        xp: formatNumber(recipe.experience),
        seconds: formatNumber(recipe.seconds),
      });
      break;
    case "brewing":
      inputs = (
        <div className="flex flex-col items-center gap-1">
          {slot(recipe.ingredient, "start")}
          <ArrowIcon down />
          {slot(recipe.input, "start")}
        </div>
      );
      note = t("recipes.brewing");
      break;
    case "stonecutting":
      inputs = slot(recipe.input, "start");
      break;
    case "smithing":
      inputs = (
        <div className="flex">
          {slot(recipe.template, "start")}
          {slot(recipe.base)}
          {slot(recipe.addition)}
        </div>
      );
      break;
    case "anvil":
      inputs = (
        <div className="flex items-center gap-2">
          {slot(recipe.base, "start")}
          <span aria-hidden className="font-pixel text-lg text-[#373737]">+</span>
          {slot(recipe.addition)}
        </div>
      );
      note = t("recipes.levels", { levels: recipe.levels });
      break;
  }

  return (
    <div className="border-2 border-ink bg-[#C6C6C6] p-4">
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {inputs}
        <ArrowIcon />
        {result}
      </div>
      {note && <p className="mt-3 text-center font-pixel text-[11px] uppercase text-[#373737]">{note}</p>}
    </div>
  );
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(".", ",");
}

// ---- Caselles i ítems ----

type Align = "start" | "center" | "end";

const SLOT_CLASSES =
  "relative grid place-items-center border-2 border-b-white border-l-[#373737] border-r-white border-t-[#373737] bg-[#8B8B8B]";

function EmptySlot() {
  return <span aria-hidden className={`${SLOT_CLASSES} h-11 w-11 sm:h-14 sm:w-14`} />;
}

/** Les alternatives d'una casella (un paquet d'ítems) van passant, com al llibre de receptes. */
function useCycle(length: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % length), 1200);
    return () => window.clearInterval(timer);
  }, [length]);
  return length ? index % length : 0;
}

function ItemSlot({
  slot,
  book,
  sources,
  self,
  count = 1,
  big = false,
  align,
}: {
  slot: Slot;
  book: RecipeBook;
  sources: Sources;
  /** La recepta on és la casella: un ítem no enllaça a la seva pròpia recepta. */
  self: string;
  count?: number;
  big?: boolean;
  align: Align;
}) {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const index = useCycle(slot?.length ?? 0);
  const size = big ? "h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]" : "h-11 w-11 sm:h-14 sm:w-14";

  const key = slot?.[index];
  const item = key ? book.items[key] : undefined;
  if (!key || !item) return <span aria-hidden className={`${SLOT_CLASSES} ${size}`} />;

  const source = sources.get(key);
  const linked = source && source !== self ? source : undefined;
  const name = plainName(item, locale);
  const label = linked ? `${name}. ${t("recipes.madeWith")}` : name;

  const content = (
    <>
      <ItemIcon item={item} size={big ? 48 : 32} className={big ? "sm:h-16 sm:w-16" : "sm:h-12 sm:w-12"} />
      {count > 1 && (
        <span
          aria-hidden
          className="absolute bottom-0 right-0.5 font-pixel text-sm text-white [text-shadow:2px_2px_0_#3f3f3f]"
        >
          {count}
        </span>
      )}
      {linked && <span aria-hidden className="absolute left-0.5 top-0.5 h-1.5 w-1.5 bg-brand-500 ring-1 ring-white" />}
      {open && <McTooltip text={item.text[locale]} align={align} />}
    </>
  );

  const events = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  };
  const classes = `${SLOT_CLASSES} ${size} hover:bg-[#A0A0A0] focus-visible:z-10`;

  return linked ? (
    <a href={`#recepta-${linked}`} aria-label={label} className={classes} {...events}>
      {content}
    </a>
  ) : (
    <button
      type="button"
      aria-label={label}
      className={`${classes} cursor-default`}
      onClick={() => setOpen((o) => !o)}
      {...events}
    >
      {content}
    </button>
  );
}

/** La icona que dibuixa el servidor (8 píxels per cada píxel de Minecraft), sense difuminar. */
function ItemIcon({ item, size, className = "" }: { item: RecipeItem; size: number; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!item.icon || failed) {
    return (
      <span
        aria-hidden
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        className={`grid shrink-0 place-items-center font-pixel leading-none text-[#373737] ${className}`}
      >
        ?
      </span>
    );
  }

  return (
    <span aria-hidden className={`relative block shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* Icona de l'API del servidor: next/image no hi aporta res i la difuminaria. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.icon}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full [image-rendering:pixelated]"
      />
      {item.glint && (
        <span className="item-glint absolute inset-0" style={{ "--icon": `url("${item.icon}")` } as CSSProperties} />
      )}
    </span>
  );
}

// ---- Textos amb l'estil de Minecraft ----

/** L'ombra del text de Minecraft: el mateix color a una quarta part de brillantor. */
function shadowOf(color: string) {
  const n = parseInt(color.slice(1), 16);
  const r = ((n >> 16) & 0xff) >> 2;
  const g = ((n >> 8) & 0xff) >> 2;
  const b = (n & 0xff) >> 2;
  return `rgb(${r} ${g} ${b})`;
}

function McText({ parts }: { parts: TextPart[] }) {
  return (
    <>
      {parts.map((p, i) => {
        const color = p.color ?? "#FFFFFF";
        const decoration = [p.underlined && "underline", p.strikethrough && "line-through"].filter(Boolean).join(" ");
        return (
          <span
            key={i}
            style={{
              color,
              textShadow: `0.12em 0.12em 0 ${shadowOf(color)}`,
              fontWeight: p.bold ? 700 : undefined,
              fontStyle: p.italic ? "italic" : undefined,
              textDecoration: decoration || undefined,
            }}
          >
            {p.text}
          </span>
        );
      })}
    </>
  );
}

const TOOLTIP_CLASSES =
  "border-2 border-[#100010] bg-[#100010]/95 px-3 py-2 text-left text-sm leading-snug shadow-[inset_0_0_0_2px_#2c0b70]";

/** El nom i la descripció d'un ítem, com quan passes el ratolí per sobre a l'inventari. */
function McTooltip({ text, align }: { text: { name: TextPart[]; lore: TextPart[][] }; align: Align }) {
  const position =
    align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute bottom-full z-20 mb-2 block w-max max-w-[min(18rem,80vw)] ${position} ${TOOLTIP_CLASSES}`}
    >
      <McLines text={text} />
    </span>
  );
}

function McTooltipBox({ text, className = "" }: { text: { name: TextPart[]; lore: TextPart[][] }; className?: string }) {
  return (
    <div className={`${TOOLTIP_CLASSES} ${className}`}>
      <McLines text={text} />
    </div>
  );
}

function McLines({ text }: { text: { name: TextPart[]; lore: TextPart[][] } }) {
  return (
    <>
      <span className="block font-semibold">
        <McText parts={text.name} />
      </span>
      {text.lore.map((line, i) => (
        <span key={i} className="block min-h-[1.375em]">
          <McText parts={line} />
        </span>
      ))}
    </>
  );
}

// ---- Icones pixelades de la interfície ----

function ArrowIcon({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 22 16"
      className={`h-6 w-8 shrink-0 text-[#8B8B8B] sm:h-8 sm:w-11 ${down ? "rotate-90" : ""}`}
      shapeRendering="crispEdges"
    >
      <path fill="currentColor" d="M0 6h14V0h2v2h2v2h2v2h2v4h-2v2h-2v2h-2v2h-2v-6H0z" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg aria-hidden viewBox="0 0 14 14" className="h-7 w-7 text-[#FF8A00]" shapeRendering="crispEdges">
      <path
        fill="currentColor"
        d="M6 0h2v2h2v2h2v6h-2v2H4v-2H2V5h2V3h2zM6 6v4h2V6z"
      />
      <path fill="#FFD400" d="M6 6h2v4H6z" />
    </svg>
  );
}

function RecipesSkeleton() {
  const { t } = useLanguage();
  return (
    <div className="mt-10" aria-busy="true">
      <p className="sr-only">{t("recipes.loading")}</p>
      <div aria-hidden className="grid gap-8 lg:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-72 animate-pulse border-2 border-ink/20 bg-paper-200" />
        ))}
      </div>
    </div>
  );
}
