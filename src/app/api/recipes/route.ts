import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Recipe } from "@/data/types";

// Absolute path to the data file the JEI component reads from.
const DATA_FILE = path.join(process.cwd(), "src", "data", "recipes.json");

async function readRecipes(): Promise<Recipe[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as Recipe[]) : [];
}

function isValidRecipe(r: unknown): r is Recipe {
  if (!r || typeof r !== "object") return false;
  const rec = r as Record<string, unknown>;
  return (
    typeof rec.id === "string" &&
    rec.id.trim() !== "" &&
    typeof rec.icon === "string" &&
    typeof rec.name === "object" &&
    typeof rec.description === "object" &&
    typeof rec.howToObtain === "object" &&
    Array.isArray(rec.grid)
  );
}

export async function GET() {
  try {
    const recipes = await readRecipes();
    return NextResponse.json(recipes);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidRecipe(body)) {
    return NextResponse.json(
      { error: "Recipe is missing required fields." },
      { status: 400 },
    );
  }

  const recipe = body as Recipe;
  // Normalise the grid to exactly 9 cells.
  recipe.grid = Array.from({ length: 9 }, (_, i) => recipe.grid[i] ?? "");

  try {
    const recipes = await readRecipes();
    const idx = recipes.findIndex((r) => r.id === recipe.id);
    if (idx >= 0) {
      recipes[idx] = recipe; // overwrite existing id
    } else {
      recipes.push(recipe);
    }
    await fs.writeFile(DATA_FILE, JSON.stringify(recipes, null, 2) + "\n", "utf-8");
    return NextResponse.json({ ok: true, count: recipes.length });
  } catch (err) {
    // On read-only/serverless filesystems (e.g. production) writes fail here.
    return NextResponse.json(
      {
        error: "write-failed",
        message: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
