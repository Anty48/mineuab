"use client";

import { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "./links";

export interface ServerStatus {
  online: boolean;
  players: number;
  version: string | null;
}

// Free public status API (it caches each server for a few minutes), called
// straight from the browser.
const STATUS_URL = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`;

// One request per page load, shared by every component that asks.
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

/** Live server status, or null while loading or if the status API is unreachable. */
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
