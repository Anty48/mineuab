"use client";

import { useEffect, useState } from "react";
import { RANKING_URL } from "./links";

export interface RankingEntry {
  rank: number;
  name: string;
  credits: number;
}

export interface Ranking {
  /** Quan el va calcular el servidor (ISO 8601). */
  updated: string;
  totalCredits: number;
  rankedPlayers: number;
  top: RankingEntry[];
}

// El plugin recalcula el rànquing cada 30 s com a molt; no cal demanar-lo més sovint.
const REFRESH_MS = 60_000;

async function loadRanking(): Promise<Ranking | null> {
  try {
    const res = await fetch(RANKING_URL);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data?.top)) return null;
    return {
      updated: String(data.updated ?? ""),
      totalCredits: Number(data.totalCredits) || 0,
      rankedPlayers: Number(data.rankedPlayers) || 0,
      top: data.top.map((e: RankingEntry) => ({
        rank: Number(e.rank),
        name: String(e.name),
        credits: Number(e.credits) || 0,
      })),
    };
  } catch {
    return null;
  }
}

/**
 * Rànquing de crèdits en directe: "loading" la primera vegada, null si el servidor no respon
 * (apagat o reiniciant-se). Si després d'haver-lo carregat falla una actualització, es manté
 * l'últim que s'ha rebut.
 */
export function useRanking() {
  const [ranking, setRanking] = useState<Ranking | null | "loading">("loading");

  useEffect(() => {
    let active = true;
    const update = () =>
      loadRanking().then((r) => {
        if (active) setRanking((prev) => r ?? (prev === "loading" ? null : prev));
      });
    update();
    const timer = window.setInterval(update, REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return ranking;
}
