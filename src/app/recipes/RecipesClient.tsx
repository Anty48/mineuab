"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import type { Recipe } from "@/data/types";
import seedRecipes from "@/data/recipes.json";

export default function RecipesClient() {
  const { t } = useLanguage();
  // Start from the bundled data, then refresh from the API so recipes saved
  // via the admin builder show up without a rebuild (in dev / with a backend).
  const [recipes, setRecipes] = useState<Recipe[]>(seedRecipes as Recipe[]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/recipes")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setRecipes(data as Recipe[]);
      })
      .catch(() => {
        /* keep bundled data */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <span className="font-pixel text-[10px] uppercase tracking-wide text-brand-300">
          JEI · mineuab
        </span>
        <h1 className="section-title mt-3 text-white">{t("recipes.title")}</h1>
        <p className="mt-4 text-neutral-400">{t("recipes.subtitle")}</p>
      </div>

      <div className="mt-12">
        <RecipeGrid recipes={recipes} />
      </div>
    </section>
  );
}
