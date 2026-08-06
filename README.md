# mineuab

The website for **mineuab**, the Minecraft community server made by and for students of the [UAB (Universitat Autònoma de Barcelona)](https://www.uab.cat/).

> ⚠️ mineuab is **not yet an official UAB project** — but we're working on it!

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling (dark mode, brand color `#0A8A3F`)
- Custom lightweight **i18n** — default **Catalan (CA)**, full **Spanish (ES)** translation, with a `CAT / ESP` toggle in the navbar
- Pixel titles via the `Press Start 2P` Google font

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    page.tsx                    # Home (hero, about, history, disclaimer, events, socials)
    recipes/                    # "Receptes Custom" — JEI-style recipe browser
    admin/recipe-builder/       # Hidden visual recipe builder (see below)
    api/recipes/route.ts        # GET/POST recipes.json
  components/
    sections/                   # Hero, About, History, Disclaimer, Events, Socials
    recipes/                    # RecipeGrid, RecipeModal, CraftingGrid (JEI UI)
    Navbar, Footer, LanguageToggle
  i18n/
    translations.ts             # All CA + ES strings
    LanguageProvider.tsx        # Locale state + t() helper
  data/
    recipes.json                # The custom recipes shown by the JEI component
    types.ts
```

## Custom recipes (JEI)

`/recipes` renders a grid of custom items in the style of the Minecraft **JEI (Just Enough Items)** mod. Clicking an item opens a modal with an interactive 3×3 crafting grid, the ingredient list, how to obtain each ingredient, and a description. Everything is bilingual.

The data comes from [`src/data/recipes.json`](src/data/recipes.json).

## Recipe Builder (admin)

A hidden, visual tool for admins who don't want to edit JSON by hand:

**`/admin/recipe-builder`**

- Fill in the 3×3 crafting grid and the item fields (name, description and "how to obtain" in **both** Catalan and Spanish).
- **Save & Generate**:
  - In local dev (or any environment with a writable filesystem), it `POST`s to `/api/recipes` which writes straight into `src/data/recipes.json`.
  - If the write fails (e.g. on a read-only serverless host like Vercel), use the **Copy JSON** button and paste the object into the array in `src/data/recipes.json`.

> A database-backed version (Firebase) is planned so admins can save recipes in production without redeploying.

## Assets

Brand assets live in `public/assets/` (`long_*`, `square_*`, `logo_idea.png`). Favicon: `public/favicon.ico`.
