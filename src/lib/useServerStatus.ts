"use client";

import { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "./links";

export interface ServerStatus {
  online: boolean;
  players: number;
  version: string | null;
}

// API pública i gratuïta d'estat (guarda cada servidor en memòria uns minuts),
// cridada directament des del navegador.
const STATUS_URL = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`;

// Una sola petició per càrrega de pàgina, compartida per tots els components que la demanen.
let request: Promise<ServerStatus | null> | null = null;

function loadStatus() {
  request ??= fetch(STATUS_URL)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) =>
      data
        ? {
            online: data.online === true,
            players: data.players?.online ?? 0,
            version: data.protocol?.name ?? data.version ?? null,
          }
        : null,
    )
    .catch(() => null);
  return request;
}

/** Estat del servidor en directe, o null mentre carrega o si l'API no respon. */
export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus | null>(null);

  useEffect(() => {
    let active = true;
    loadStatus().then((s) => {
      if (active) setStatus(s);
    });
    return () => {
      active = false;
    };
  }, []);

  return status;
}
