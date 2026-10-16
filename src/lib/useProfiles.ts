"use client";

import { useEffect, useState } from "react";
import { PROFILES_URL } from "./links";

/** La carrera, amb el color del seu tag a Minecraft ("#D72638"). */
export interface Career {
  name: string;
  color?: string;
}

/** Un jugador de la llista (jugadors.json). */
export interface PlayerSummary {
  name: string;
  career?: Career;
  online: boolean;
  /** Última connexió (ISO 8601). No hi és si està connectat o no se sap. */
  lastSeen?: string;
  hours: number;
  /** Adreça absoluta de la cara (8×8). */
  head?: string;
}

export interface PlayerList {
  updated: string;
  online: number;
  players: PlayerSummary[];
}

export interface Highlight {
  /** Id de Minecraft sense "minecraft:" ("stone", "zombie"). */
  id: string;
  count: number;
}

/** El perfil d'un jugador (jugador/<nom>.json). */
export interface Profile {
  name: string;
  online: boolean;
  lastSeen?: string;
  /** Primera vegada que va entrar al servidor. */
  firstSeen?: string;
  career?: Career;
  badges: { id: string; name: string }[];
  /** Crèdits (cartera + banc) i posició al rànquing, si hi surt. */
  credits?: { total: number; rank?: number };
  /** Estrelles del pacte (0-5). No hi és si el servidor no té el plugin de les estrelles. */
  stars?: number;
  /** Adreces absolutes de la skin i la capa. */
  skin?: { url: string; slim: boolean; cape?: string };
  head?: string;
  stats: {
    hours: number;
    counters: Record<string, number>;
    /** Quilòmetres per manera de moure's. */
    distances: Record<string, number>;
    highlights: Partial<Record<"block" | "mob" | "nemesis" | "crafted", Highlight>>;
  };
  advancements?: { done: number; total: number };
  updated: string;
}

const absolute = (path: string | undefined) => (path ? new URL(path, PROFILES_URL).toString() : undefined);

async function getJson(path: string): Promise<{ status: number; data: unknown } | null> {
  try {
    const res = await fetch(new URL(path, PROFILES_URL));
    return { status: res.status, data: await res.json().catch(() => null) };
  } catch {
    return null;
  }
}

function toSummary(p: PlayerSummary): PlayerSummary {
  return {
    name: String(p.name),
    career: p.career,
    online: Boolean(p.online),
    lastSeen: p.lastSeen,
    hours: Number(p.hours) || 0,
    head: absolute(p.head),
  };
}

// El plugin refà la llista cada 5 minuts i guarda cada perfil 1 minut.
const REFRESH_MS = 60_000;

/** Tots els jugadors: "loading" la primera vegada, null si el servidor no respon. */
export function usePlayers() {
  const [list, setList] = useState<PlayerList | null | "loading">("loading");

  useEffect(() => {
    let active = true;
    const update = () =>
      getJson("jugadors.json").then((r) => {
        if (!active) return;
        const data = r?.status === 200 ? (r.data as PlayerList | null) : null;
        const next =
          data && Array.isArray(data.players)
            ? {
                updated: String(data.updated ?? ""),
                online: Number(data.online) || 0,
                players: data.players.map(toSummary),
              }
            : null;
        setList((prev) => next ?? (prev === "loading" ? null : prev));
      });
    update();
    const timer = window.setInterval(update, REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return list;
}

export type ProfileState = Profile | "loading" | "not-found" | "private" | "unavailable";

/** El perfil d'un jugador. Si després d'haver-lo carregat falla una actualització, es manté l'últim. */
export function useProfile(name: string) {
  const [profile, setProfile] = useState<ProfileState>("loading");

  useEffect(() => {
    let active = true;
    setProfile("loading");
    const update = () =>
      getJson(`jugador/${encodeURIComponent(name)}.json`).then((r) => {
        if (!active) return;
        let next: ProfileState;
        if (!r || r.status >= 500) {
          next = "unavailable";
        } else if (r.status === 404) {
          next = (r.data as { error?: string } | null)?.error === "private" ? "private" : "not-found";
        } else {
          const p = r.data as Profile;
          next = {
            ...p,
            badges: Array.isArray(p.badges) ? p.badges : [],
            stars: Number.isInteger(p.stars) ? Math.min(Math.max(p.stars!, 0), 5) : undefined,
            skin: p.skin
              ? { url: absolute(p.skin.url)!, slim: Boolean(p.skin.slim), cape: absolute(p.skin.cape) }
              : undefined,
            head: absolute(p.head),
          };
        }
        setProfile((prev) => (next === "unavailable" && typeof prev === "object" ? prev : next));
      });
    update();
    const timer = window.setInterval(update, REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [name]);

  return profile;
}

/** "fa 2 hores", "ahir"… Si la data és del futur (rellotge endarrerit), diu "ara". */
export function timeAgo(iso: string, locale: string) {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";
  const seconds = Math.min(0, (time - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (seconds > -60) return rtf.format(0, "second");
  if (seconds > -3600) return rtf.format(Math.round(seconds / 60), "minute");
  if (seconds > -82800) return rtf.format(Math.round(seconds / 3600), "hour");
  if (seconds > -86400 * 30) return rtf.format(Math.round(seconds / 86400), "day");
  if (seconds > -86400 * 365) return rtf.format(Math.round(seconds / (86400 * 30)), "month");
  return rtf.format(Math.round(seconds / (86400 * 365)), "year");
}
