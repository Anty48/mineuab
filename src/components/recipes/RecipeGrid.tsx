"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Recipe } from "@/data/types";
import RecipeModal from "./RecipeModal";

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<Recipe | null>(null);

  if (recipes.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-neutral-400">
        {t("recipes.empty")}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {recipes.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActive(r)}
            className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-brand/50 hover:bg-brand/5"
          >
            <div className="mc-slot flex h-20 w-20 items-center justify-center rounded-[2px] text-4xl transition-transform group-hover:scale-105">
              {r.icon}
            </div>
            <span className="text-sm font-semibold text-white">
              {r.name[locale]}
            </span>
            <span className="text-[10px] text-neutral-500">
              {t("recipes.clickHint")}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <RecipeModal recipe={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}
