"use client";

import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Recipe } from "@/data/types";
import CraftingGrid from "./CraftingGrid";

export default function RecipeModal({
  recipe,
  onClose,
}: {
  recipe: Recipe;
  onClose: () => void;
}) {
  const { t, locale } = useLanguage();

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Unique, non-empty ingredient list derived from the grid.
  const ingredients = Array.from(
    new Set(recipe.grid.filter((c) => c.trim() !== "")),
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={recipe.name[locale]}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="animate-pop-in relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-white/10 bg-neutral-900/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{recipe.icon}</span>
            <h2 className="font-pixel text-sm text-white sm:text-base">
              {recipe.name[locale]}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("recipes.modal.close")}
            className="btn-ghost !px-3 !py-2"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Crafting grid */}
          <div>
            <h3 className="mb-4 text-center font-pixel text-[10px] uppercase tracking-wide text-brand-300">
              {t("recipes.modal.recipeTitle")}
            </h3>
            <CraftingGrid
              grid={recipe.grid}
              resultIcon={recipe.icon}
              resultName={recipe.name[locale]}
            />
          </div>

          {/* Description */}
          <div className="card">
            <h4 className="text-sm font-bold text-brand-300">
              {t("recipes.modal.description")}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              {recipe.description[locale]}
            </p>
          </div>

          {/* Ingredients */}
          {ingredients.length > 0 && (
            <div className="card">
              <h4 className="text-sm font-bold text-brand-300">
                {t("recipes.modal.ingredients")}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* How to obtain */}
          <div className="card">
            <h4 className="text-sm font-bold text-brand-300">
              {t("recipes.modal.howToObtain")}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              {recipe.howToObtain[locale]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
