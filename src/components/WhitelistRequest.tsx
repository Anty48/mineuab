"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WHITELIST_EMAIL } from "@/lib/links";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { CheckIcon, CopyIcon } from "./icons";

/** Els noms de Minecraft: de 3 a 16 lletres, números o _. */
const NAME_PATTERN = /^[A-Za-z0-9_]{3,16}$/;

/**
 * Pas "Demana accés": el jugador escriu el seu nom i s'obre el correu ja escrit cap a l'staff,
 * que l'afegeix a la whitelist a mà.
 */
export default function WhitelistRequest() {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);
  const valid = NAME_PATTERN.test(name);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setShowError(true);
      return;
    }
    const subject = encodeURIComponent(t("whitelist.mailSubject", { name }));
    const body = encodeURIComponent(t("whitelist.mailBody", { name }));
    window.location.href = `mailto:${WHITELIST_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 max-w-md">
      <label
        htmlFor="whitelist-name"
        className="font-pixel text-[10px] uppercase text-ink-500"
      >
        {t("whitelist.nameLabel")}
      </label>
      <div className="mt-1 flex flex-col gap-3 sm:flex-row">
        <input
          id="whitelist-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value.trim());
            setShowError(false);
          }}
          maxLength={16}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={showError}
          aria-describedby="whitelist-hint"
          className="min-w-0 flex-1 border-2 border-ink bg-paper-50 px-3 py-2 font-mono font-semibold text-ink outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 aria-[invalid=true]:border-terra-500"
        />
        <button type="submit" className="btn-primary">
          {t("whitelist.send")}
        </button>
      </div>
      <p
        id="whitelist-hint"
        className={`mt-2 text-sm ${showError ? "font-semibold text-terra-600" : "text-ink-500"}`}
      >
        {t("whitelist.nameHint")} {t("whitelist.fromUab")}
      </p>

      <p className="mt-4 text-sm text-ink-600">{t("whitelist.orWrite")}</p>
      <button
        type="button"
        onClick={() => copy(WHITELIST_EMAIL)}
        className="mt-1 flex items-center gap-3 border-2 border-ink bg-paper-50 px-3 py-2 font-mono text-sm font-semibold shadow-block-sm transition-colors hover:bg-white"
      >
        {WHITELIST_EMAIL}
        {copied ? (
          <CheckIcon size={16} className="text-brand-600" />
        ) : (
          <CopyIcon size={16} className="text-ink-500" />
        )}
        <span aria-live="polite" className="sr-only">
          {copied ? t("whitelist.copied") : t("whitelist.copyEmail")}
        </span>
      </button>
    </form>
  );
}
