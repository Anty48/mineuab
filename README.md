# mineuab

La web de **mineuab**, el servidor de Minecraft nascut a la [UAB (Universitat Autònoma de Barcelona)](https://www.uab.cat/) i obert a tothom, siguis o no de la universitat.

**Adreça del servidor:** `www.mineuab.org` · **Discord:** https://discord.gg/CfXau5xy3U

> ⚠️ mineuab **encara no és un projecte oficial de la UAB**, però hi estem treballant!

## Tecnologia

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS**, amb el disseny descrit a [Disseny](#disseny).
- **i18n** propi i lleuger: **català (CA)** per defecte i traducció completa al **castellà (ES)**, amb el selector `CAT / ESP` a la barra de navegació. El català és la font de veritat: TypeScript dona error si falta una clau en castellà.
- **Estat del servidor en directe** (en línia, jugadors, versió) amb l'API pública i gratuïta de [mcsrvstat.us](https://mcsrvstat.us), consultada des del navegador. Si l'API no respon, els indicadors d'estat simplement no es mostren.
- **ESLint** amb les regles de Next.js (`next/core-web-vitals` + TypeScript).

## Com començar

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
```

Per a producció:

```bash
npm run build
npm start
```

## Pàgines

- `/`: portada amb l'adreça i l'estat del servidor, una cinta amb el que hi trobaràs, com entrar-hi (amb el carnet de jugador), qui som, un tast de la galeria i les xarxes.
- `/mapa`: el mapa en directe del servidor (BlueMap), incrustat a la pàgina.
- `/ranquing`: el quadre d'honor de crèdits en directe (plugin Credits del servidor), com es guanyen i les ordres útils.
- `/receptes`: les receptes pròpies del servidor (Craftorithm), en directe des del plugin MineUABPerfil: cada una amb la seva interfície de Minecraft (taula de treball, forn, altar de pocions...), les icones del texture pack i el nom i la descripció dels ítems com al joc. Quan l'staff n'afegeix una al servidor, surt sola.
- `/galeria`: galeria de construccions, amb un visor a pantalla completa (fletxes per moure't, Esc per tancar).
- `/normes`: normes del servidor, amb un índex al costat. **Provisionals** fins que tinguem les definitives.
- `/faq`: preguntes freqüents.
- `/historia`: la nostra història, com una línia del temps.
- `/create`: la beta tancada de **MineUAB Create**, el servidor amb el mod Create: com funciona, com entrar-hi amb el modpack (sense mostrar l'adreça del servidor) i la llista de mods per grups. Només hi posem el que ja està confirmat.

L'avís de "projecte no oficial" surt com a franja a dalt de totes les pàgines.

## Disseny

Volem una identitat pròpia, que no s'assembli a la de cap altre servidor:

- **Verd corporatiu `#088F40`** (`brand-500` a Tailwind), el mateix del logo. És el color de la marca i no s'ha de canviar.
- **Fons clar de "paviment"** (`paper`), amb una quadrícula suau que recorda les rajoles de la plaça cívica (`bg-paving`).
- **Blocs**: vores dures de 2 px, cantonades rectes i ombres desplaçades (`shadow-block`), com els blocs de Minecraft. Els botons "s'enfonsen" quan els prems.
- **Terracota** (`terra`) només per als avisos, com les juntes de maó del paviment.
- **Tipografies**: Bricolage Grotesque per als títols, Inter per al text i Silkscreen (lletra de píxels, com el logo) per a les etiquetes petites.
- **Vores de blocs alterns** entre seccions (`edge-top`), com la vora d'herba d'un bloc.

Els colors, les ombres i les tipografies són a [`tailwind.config.ts`](tailwind.config.ts), i els botons i les peces comunes a [`src/app/globals.css`](src/app/globals.css).

## Estructura del projecte

```
src/
  app/
    page.tsx                    # Inici
    mapa/  ranquing/  receptes/  galeria/  normes/  faq/  historia/  create/
    not-found.tsx
  assets/gallery/               # Fotos de la galeria (s'importen, així tenen un difuminat mentre carreguen)
  components/
    sections/                   # Seccions de l'inici: Hero, Marquee, HowToJoin, About, GalleryPreview, Socials
    MapContent, RankingContent, RecipesContent, GalleryContent, RulesContent, FaqContent, HistoryContent, CreateContent, NotFoundContent
    WhitelistRequest.tsx        # Pas "Demana accés": prepara el correu per entrar a la whitelist
    AnnouncementBar.tsx         # Franja d'avís de dalt de tot
    PageHeader.tsx              # Capçalera de les pàgines interiors
    SectionHeading.tsx          # Número, títol i subtítol de cada secció de l'inici
    DiscordCta.tsx              # Bloc "Uneix-te al Discord" al final de les pàgines interiors
    ServerCard.tsx              # Carnet de jugador: adreça, botó de copiar i estat en directe
    ServerStatusPill.tsx        # Indicador "N jugadors en línia" de la barra
    Navbar, Footer, LanguageToggle, icons
  i18n/
    translations.ts             # Tots els textos en CA i ES
    LanguageProvider.tsx        # Estat de l'idioma i funció t()
  lib/
    links.ts                    # Adreça del servidor, mapa, whitelist (WHITELIST_ENABLED), enllaços de Discord/Instagram/Twitch i de navegació
    gallery.ts                  # Quines fotos surten a la galeria i en quin ordre
    useServerStatus.ts
    useRanking.ts               # Rànquing de crèdits, llegit des del navegador (RANKING_URL a links.ts)
    useRecipes.ts               # Receptes del servidor (receptes.json de l'API dels perfils, PROFILES_URL a links.ts)
    useCopyToClipboard.ts
    createModpack.json          # Mods i versions del modpack de MineUAB Create (generat, no l'editeu a mà)
```

## Editar el contingut

Tots els textos, en català i en castellà, són a [`src/i18n/translations.ts`](src/i18n/translations.ts): les normes a `rules.sections`, les preguntes freqüents a `faq.items`, els peus de foto de la galeria a `gallery.items` i les paraules de la cinta verda a `marquee`.

Per afegir una construcció a la galeria, exporta la captura en JPEG a `src/assets/gallery/`, importa-la a [`src/lib/gallery.ts`](src/lib/gallery.ts) i afegeix-ne el peu de foto a `gallery.items` en tots dos idiomes. Les quatre primeres fotos de la llista també surten a l'inici.

L'adreça del servidor, la invitació de Discord i els enllaços de les xarxes són a [`src/lib/links.ts`](src/lib/links.ts).

La llista de mods de `/create` surt de `mods-lock.json` del projecte del modpack. Quan canvieu els mods o publiqueu un modpack nou, regenereu-la (escriu `src/lib/createModpack.json`):

```bash
python ../MineUAB-Create/scripts/fes_llista_web.py
```

Els textos de la pàgina i la descripció de cada grup de mods són a `create` dins de `translations.ts`. Si a `mods.py` hi afegiu un grup nou, afegiu-ne també el text en tots dos idiomes (si no, surt al final amb el nom del grup).

## Imatges

`public/assets/` només conté els fitxers que fa servir la web: els logos (horitzontal i quadrat, en verd i en blanc) i `og.jpg` (la imatge de 1200×630 per a les previsualitzacions d'enllaços).

El logo en color (`_col`) s'ha de mostrar sempre sobre fons blanc: la U i la B són l'espai blanc entre els blocs verds i, sobre un altre color, es perden. Per això a la web va dins d'un bloc blanc amb vora fosca.

Les captures del servidor són a `src/assets/gallery/`. Totes les variants del logo i els SVG originals es guarden a [`assets/`](assets/), a l'arrel del repositori. Favicon: `public/favicon.ico`.

## Nota sobre el domini

Minecraft troba el servidor gràcies a un registre SRV (`_minecraft._tcp.www.mineuab.org` → `mc.mineuab.org:25567`). Quan la web es publiqui a `www.mineuab.org`, apunteu el registre `A`/`CNAME` d'aquest nom al servidor web i **mantingueu el registre SRV**: els navegadors fan servir l'`A`/`CNAME` i Minecraft l'SRV, així tots dos funcionen amb la mateixa adreça.

## Commits

Escriviu els missatges de commit en català, en imperatiu i curts. Per exemple: `Afegeix la foto de la biblioteca a la galeria`.
