"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Copies text and keeps `copied` true for a moment, for button feedback. */
export function useCopyToClipboard(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return; // clipboard blocked (insecure origin, permissions)
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfterMs);
    },
    [resetAfterMs],
  );

  return { copied, copy };
}
