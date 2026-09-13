# mineuab

The website for **mineuab**, the Minecraft server born at the [UAB (Universitat Autònoma de Barcelona)](https://www.uab.cat/) and open to everyone, whether or not you study there.

**Server address:** `www.mineuab.org` · **Discord:** https://discord.gg/CfXau5xy3U

> ⚠️ mineuab is **not yet an official UAB project** — but we're working on it!

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** — black/zinc theme with the brand green `#0A8A3F` as accent, Inter font
- Custom lightweight **i18n** — default **Catalan (CA)**, full **Spanish (ES)** translation, with a `CAT / ESP` toggle in the navbar. Catalan is the source of truth: TypeScript fails if a key is missing in Spanish.
- **Live server status** (online, players, version) from the free public [mcsrvstat.us](https://mcsrvstat.us) API, fetched in the browser. If the API is unreachable the status UI simply stays hidden.
- **ESLint** with the Next.js rules (`next/core-web-vitals` + TypeScript).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
```

Build for production:

```bash
npm run build
npm start
```

## Pages

- `/` — banner with the server address, the "not official" notice, how to join (with live status), about us and socials.
- `/galeria` — gallery of builds, with a full-screen viewer (arrow keys to move, Esc to close).
- `/normes` — server rules. **Provisional** until the final rules are written.
- `/faq` — frequently asked questions.
- `/historia` — our story.

## Project structure

```
src/
  app/
    page.tsx                    # Home
    galeria/  normes/  faq/  historia/
    not-found.tsx
  assets/gallery/               # Gallery photos (imported, so they get blur placeholders)
  components/
    sections/                   # Home sections: Hero, Disclaimer, HowToJoin, About, Socials
    GalleryContent, RulesContent, FaqContent, HistoryContent
    PageHeader.tsx              # Banner at the top of inner pages
    DiscordCta.tsx              # "Join the Discord" block at the end of inner pages
    ServerCard.tsx              # Server address card with copy button and live status
    ServerStatusPill.tsx        # "N jugadors en línia" pill in the navbar
    Navbar, Footer, LanguageToggle, icons
  i18n/
    translations.ts             # All CA + ES text
    LanguageProvider.tsx        # Locale state + t() helper
  lib/
    links.ts                    # Server address, Discord/Instagram/Twitch URLs, nav links
    gallery.ts                  # Which photos the gallery shows, in what order
    useServerStatus.ts
    useCopyToClipboard.ts
```

## Editing content

All text, in Catalan and Spanish, lives in [`src/i18n/translations.ts`](src/i18n/translations.ts): the rules are under `rules.sections`, the FAQ under `faq.items` and the gallery captions under `gallery.items`.

To add a build to the gallery, export the screenshot as a JPEG into `src/assets/gallery/`, import it in [`src/lib/gallery.ts`](src/lib/gallery.ts) and add its caption under `gallery.items` in both languages.

The server address, the Discord invite and the social links are in [`src/lib/links.ts`](src/lib/links.ts).

## Assets

`public/assets/` only holds the files the site uses: the white wordmark and square logos, the page banners and `og.jpg` (the 1200×630 image for link previews). The banners are pre-blurred copies of the server screenshots in `Images/Spawn/` of the shared MineUAB folder, exported with `sharp`, so re-export them if you change a photo. Every logo variant and the SVG sources are kept in [`assets/`](assets/) at the repo root. Favicon: `public/favicon.ico`.

## Domain note

Minecraft finds the server through an SRV record (`_minecraft._tcp.www.mineuab.org` → `mc.mineuab.org:25567`). When the website goes live on `www.mineuab.org`, point that hostname's `A`/`CNAME` record at the web host and **keep the SRV record**: browsers use the `A`/`CNAME`, Minecraft clients use the SRV, so both keep working on the same address.
