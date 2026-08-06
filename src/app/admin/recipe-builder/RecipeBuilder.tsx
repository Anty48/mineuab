"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Recipe } from "@/data/types";

const EMPTY_GRID = Array.from({ length: 9 }, () => "");

type SaveState = "idle" | "saving" | "saved" | "error";

export default function RecipeBuilder() {
  const { t, locale } = useLanguage();

  const [id, setId] = useState("");
  const [icon, setIcon] = useState("⭐");
  const [grid, setGrid] = useState<string[]>(EMPTY_GRID);
  const [nameCa, setNameCa] = useState("");
  const [nameEs, setNameEs] = useState("");
  const [descCa, setDescCa] = useState("");
  const [descEs, setDescEs] = useState("");
  const [obtainCa, setObtainCa] = useState("");
  const [obtainEs, setObtainEs] = useState("");

  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const recipe: Recipe = useMemo(
    () => ({
      id: id.trim().toLowerCase().replace(/\s+/g, "_"),
      icon: icon || "⭐",
      name: { ca: nameCa, es: nameEs },
      description: { ca: descCa, es: descEs },
      howToObtain: { ca: obtainCa, es: obtainEs },
      grid,
    }),
    [id, icon, nameCa, nameEs, descCa, descEs, obtainCa, obtainEs, grid],
  );

  const jsonString = useMemo(() => JSON.stringify(recipe, null, 2), [recipe]);

  const isValid =
    recipe.id !== "" && nameCa.trim() !== "" && nameEs.trim() !== "";

  function updateCell(index: number, value: string) {
    setGrid((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function resetForm() {
    setId("");
    setIcon("⭐");
    setGrid(EMPTY_GRID);
    setNameCa("");
    setNameEs("");
    setDescCa("");
    setDescEs("");
    setObtainCa("");
    setObtainEs("");
    setSaveState("idle");
    setSaveMessage("");
  }

  async function handleSave() {
    if (!isValid) {
      setSaveState("error");
      setSaveMessage(t("admin.requiredError"));
      return;
    }
    setSaveState("saving");
    setSaveMessage("");
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      if (res.ok) {
        setSaveState("saved");
        setSaveMessage(t("admin.saved"));
      } else {
        setSaveState("error");
        setSaveMessage(t("admin.saveError"));
      }
    } catch {
      setSaveState("error");
      setSaveMessage(t("admin.saveError"));
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
  const labelClass = "mb-1 block text-xs font-semibold text-neutral-300";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* LEFT: form */}
      <div className="space-y-8">
        {/* Crafting grid */}
        <div className="card">
          <h2 className="font-pixel text-xs text-brand-300">
            {t("admin.grid")}
          </h2>
          <p className="mt-2 text-xs text-neutral-400">{t("admin.gridHint")}</p>

          <div className="mt-5 flex items-center gap-5">
            <div className="mc-panel inline-block rounded-md p-2">
              <div className="grid grid-cols-3 gap-1">
                {grid.map((cell, i) => (
                  <input
                    key={i}
                    value={cell}
                    onChange={(e) => updateCell(i, e.target.value)}
                    aria-label={`slot ${i + 1}`}
                    className="mc-slot h-16 w-16 rounded-[2px] bg-[#8b8b8b] p-1 text-center text-[10px] font-bold text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="—"
                  />
                ))}
              </div>
            </div>

            <div className="text-2xl text-neutral-500">➜</div>

            <div className="mc-panel inline-block rounded-md p-2">
              <div className="mc-slot flex h-20 w-20 items-center justify-center rounded-[2px] text-4xl">
                {icon || "⭐"}
              </div>
            </div>
          </div>
        </div>

        {/* Result item fields */}
        <div className="card space-y-4">
          <h2 className="font-pixel text-xs text-brand-300">
            {t("admin.resultLabel")}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t("admin.fields.id")}</label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                className={fieldClass}
                placeholder="espasa_uab"
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.fields.icon")}</label>
              <input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className={fieldClass}
                placeholder="⚔️"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t("admin.fields.nameCa")}</label>
              <input
                value={nameCa}
                onChange={(e) => setNameCa(e.target.value)}
                className={fieldClass}
                placeholder="Espasa UAB"
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.fields.nameEs")}</label>
              <input
                value={nameEs}
                onChange={(e) => setNameEs(e.target.value)}
                className={fieldClass}
                placeholder="Espada UAB"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t("admin.fields.descCa")}</label>
              <textarea
                value={descCa}
                onChange={(e) => setDescCa(e.target.value)}
                rows={3}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.fields.descEs")}</label>
              <textarea
                value={descEs}
                onChange={(e) => setDescEs(e.target.value)}
                rows={3}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t("admin.fields.obtainCa")}</label>
              <textarea
                value={obtainCa}
                onChange={(e) => setObtainCa(e.target.value)}
                rows={3}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.fields.obtainEs")}</label>
              <textarea
                value={obtainEs}
                onChange={(e) => setObtainEs(e.target.value)}
                rows={3}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === "saving"}
              className="btn-primary disabled:opacity-60"
            >
              {saveState === "saving" ? "…" : t("admin.save")}
            </button>
            <button type="button" onClick={resetForm} className="btn-ghost">
              {t("admin.reset")}
            </button>
          </div>

          {saveMessage && (
            <p
              className={`text-sm ${
                saveState === "saved"
                  ? "text-brand-300"
                  : "text-amber-300"
              }`}
            >
              {saveMessage}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT: preview + JSON */}
      <div className="space-y-8">
        {/* Live preview card (as it'll appear in the JEI grid) */}
        <div className="card">
          <h2 className="font-pixel text-xs text-brand-300">
            {t("admin.previewTitle")}
          </h2>
          <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="mc-slot flex h-20 w-20 items-center justify-center rounded-[2px] text-4xl">
              {icon || "⭐"}
            </div>
            <span className="text-sm font-semibold text-white">
              {recipe.name[locale] || "—"}
            </span>
          </div>
        </div>

        {/* JSON output */}
        <div className="card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-pixel text-xs text-brand-300">
              {t("admin.jsonTitle")}
            </h2>
            <button type="button" onClick={handleCopy} className="btn-ghost !py-2">
              {copied ? t("admin.copied") : t("admin.copy")}
            </button>
          </div>
          <pre className="mt-4 max-h-80 overflow-auto rounded-lg border border-white/10 bg-neutral-950 p-4 text-xs leading-relaxed text-neutral-200">
            {jsonString}
          </pre>
        </div>

        {/* Manual instructions */}
        <div className="card">
          <h2 className="font-pixel text-xs text-brand-300">
            {t("admin.instructionsTitle")}
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            {t("admin.instructions")}
          </p>
          <code className="mt-3 block rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-xs text-brand-200">
            src/data/recipes.json
          </code>
        </div>
      </div>
    </div>
  );
}
