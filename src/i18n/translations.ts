export type Locale = "ca" | "es";

export const LOCALES: Locale[] = ["ca", "es"];
export const DEFAULT_LOCALE: Locale = "ca";

/** L'estructura del diccionari català amb cada literal de text ampliat a `string`. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

// Diccionari niat. S'hi accedeix amb l'ajudant `t()` de useLanguage();
// els marcadors `{nom}` s'omplen amb el segon argument de t().
// El català és la font de veritat: TypeScript avisa si falta una clau en castellà.
const ca = {
  nav: {
    home: "Inici",
    howToJoin: "Com entrar",
    about: "Sobre nosaltres",
    history: "La nostra història",
    historyShort: "Història",
    socials: "Xarxes",
    map: "Mapa",
    ranking: "Rànquing",
    players: "Jugadors",
    gallery: "Galeria",
    rules: "Normes",
    faq: "FAQ",
    langLabel: "Idioma",
    menu: "Menú",
    skip: "Salta al contingut",
  },
  server: {
    ipLabel: "Adreça IP",
    cardTitle: "Entra al servidor",
    copy: "Copiar adreça IP",
    copied: "Adreça copiada!",
    online: "En línia",
    offline: "Fora de línia",
    playersOne: "{count} jugador en línia",
    playersMany: "{count} jugadors en línia",
    joinOne: "Ara mateix hi ha {count} jugador connectat. Uneix-t'hi!",
    joinMany: "Ara mateix hi ha {count} jugadors connectats. Uneix-t'hi!",
    joinEmpty: "El servidor està en línia. Sigues el primer a entrar!",
    statusOffline:
      "Ara mateix el servidor està fora de línia. Torna-ho a provar d'aquí a una estona.",
    version: "Versió",
    access: "Accés",
    status: "Estat",
    openToAll: "Obert a tothom",
    whitelist: "Amb whitelist",
    cardTag: "Carnet de jugador",
  },
  hero: {
    eyebrow: "Servidor de Minecraft · Java Edition",
    titleLead: "El servidor de",
    titleAccent: "l'Autònoma",
    subtitle:
      "Un servidor fet per estudiants i obert a tothom, siguis o no de la UAB.",
    ctaDiscord: "Uneix-te al Discord",
    sticker: "Fet per estudiants",
  },
  disclaimer: {
    tag: "Avís",
    body: "mineuab encara no és un projecte oficial de la UAB (Universitat Autònoma de Barcelona), però hi estem treballant perquè ho sigui.",
    short: "Encara no som un projecte oficial de la UAB, però hi estem treballant.",
  },
  marquee: [
    "Survival",
    "Construccions",
    "Esdeveniments",
    "Minijocs",
    "Obert a tothom",
    "Fet per estudiants",
    "Nascut a l'Autònoma",
  ],
  howToJoin: {
    title: "Com entrar al servidor",
    subtitle:
      "Copia l'adreça, obre Minecraft i segueix aquests passos. En un parell de minuts ja hi ets.",
    steps: [
      {
        title: "Obre Minecraft",
        body: "Necessites Minecraft Java Edition. Des del menú principal, ves a Multijugador.",
      },
      {
        title: "Afegeix el servidor",
        body: "Clica «Afegeix un servidor» i posa aquesta adreça:",
        code: ["{address}"],
      },
      {
        title: "Registra't",
        body: "El primer cop que entris, crea el teu compte. Les altres vegades, només cal iniciar sessió.",
        code: ["/register <contrasenya> <contrasenya>", "/login <contrasenya>"],
      },
      {
        title: "Uneix-te al Discord",
        body: "Allà anunciem els esdeveniments i les novetats, i és on trobaràs la comunitat.",
        cta: "Obrir Discord",
      },
    ],
    // Només surt si WHITELIST_ENABLED és true (src/lib/links.ts), com a primer pas.
    whitelistStep: {
      title: "Demana accés",
      body: "El servidor té whitelist: només hi poden entrar els jugadors de la llista. Escriu el teu nom de Minecraft i envia'ns el correu des del teu correu de la UAB. T'afegirem tan aviat com puguem.",
    },
    passwordTip:
      "Consell: fes servir una contrasenya que no utilitzis a cap altre lloc.",
  },
  whitelist: {
    nameLabel: "El teu nom de Minecraft",
    nameHint: "Entre 3 i 16 caràcters: lletres, números i _.",
    send: "Prepara el correu",
    fromUab: "Envia'l des del teu correu de la UAB (@uab.cat o @autonoma.cat).",
    orWrite: "Si el botó no t'obre el correu, escriu a:",
    copyEmail: "Copiar l'adreça de correu",
    copied: "Correu copiat!",
    mailSubject: "Whitelist mineuab: {name}",
    mailBody:
      "Hola!\n\nVoldria entrar al servidor mineuab. El meu nom de Minecraft és: {name}\n\nGràcies!",
  },
  map: {
    title: "Mapa del món",
    subtitle:
      "Passeja pel servidor en directe: les construccions, els camins i on és cada jugador ara mateix.",
    open: "Obrir a pantalla completa",
    frameTitle: "Mapa en directe del servidor mineuab",
    hint: "Arrossega per moure't i fes servir la roda (o pessiga) per apropar-te. Si no es carrega, potser el servidor s'està reiniciant: torna-ho a provar d'aquí a una estona.",
  },
  // Els números (60 crèdits, etc.) són els de plugins/Credits/config.yml al servidor.
  ranking: {
    title: "Rànquing",
    subtitle:
      "Els crèdits són la moneda de mineuab. Aquí tens qui en té més, en directe des del servidor.",
    boardTitle: "Quadre d'honor",
    live: "En directe",
    updated: "actualitzat {time}",
    amount: "{amount} crèdits",
    total: "Crèdits al servidor",
    players: "Jugadors al rànquing",
    loading: "Carregant el rànquing…",
    unavailable:
      "Ara mateix el rànquing no respon. Potser el servidor s'està reiniciant: torna-ho a provar d'aquí a una estona.",
    empty: "Encara no hi ha ningú al rànquing. Entra al servidor i sigues el primer!",
    inGame: "Dins del joc el tens amb /ranking. Compten la cartera i els estalvis del banc.",
    earn: {
      title: "Com es guanyen crèdits",
      subtitle: "Tothom comença amb 60 crèdits, com un curs sencer. A partir d'aquí, tot suma.",
      items: [
        {
          icon: "🎓",
          title: "La beca",
          body: "Cobres un sou per cada estona de joc actiu. Si estàs AFK, no compta.",
        },
        {
          icon: "📋",
          title: "Passar llista",
          body: "Una recompensa cada dia. Si hi tornes l'endemà, la ratxa puja i cobres més.",
          command: "/diari",
        },
        {
          icon: "📜",
          title: "Assignatures aprovades",
          body: "Cada assoliment (advancement) que aconsegueixes et dona crèdits. Els difícils, molts més.",
        },
        {
          icon: "⚔️",
          title: "Caça",
          body: "Matar monstres dona crèdits. Els que surten d'spawners no compten.",
        },
        {
          icon: "🛒",
          title: "Vendre a la botiga",
          body: "Ven el que et sobri. Els preus pugen i baixen segons l'oferta i la demanda.",
          command: "/vendre",
        },
        {
          icon: "🎟️",
          title: "La Grossa",
          body: "Compra butlletes i prova sort al sorteig. El pot és per al guanyador.",
          command: "/loteria",
        },
      ],
    },
    commands: {
      title: "Ordres útils",
      items: [
        { command: "/credits", body: "El teu saldo. Amb /credits ajuda, totes les ordres." },
        { command: "/pay <jugador> <import>", body: "Envia crèdits a un altre jugador." },
        { command: "/botiga", body: "Compra i ven a la botiga del servidor." },
        { command: "/subhasta", body: "La casa de subhastes: ven a preu fix o amb pujes." },
        { command: "/intercanvi <jugador>", body: "Intercanvia ítems i crèdits amb seguretat." },
        { command: "/xec crear <import>", body: "Converteix crèdits en un xec que pots donar o guardar." },
        { command: "/banc", body: "Estalvia i cobra interessos mentre jugues." },
        { command: "/ranking", body: "El quadre d'honor, dins del joc." },
      ],
    },
    ctaTitle: "Vols pujar al rànquing?",
    ctaBody: "Entra al servidor i comença a guanyar crèdits. Al Discord trobaràs la resta de la comunitat.",
  },
  // Perfils dels jugadors (plugin MineUABPerfil al servidor).
  players: {
    title: "Jugadors",
    subtitle: "Tothom qui ha passat pel campus. Busca't i obre el teu carnet de jugador.",
    searchLabel: "Busca un jugador",
    searchPlaceholder: "Nom o carrera",
    careerLabel: "Carrera",
    allCareers: "Totes",
    sortLabel: "Ordena per",
    sort: { recent: "Última connexió", hours: "Més hores", name: "Nom (A-Z)" },
    count: "{count} jugadors",
    online: "{count} al campus ara",
    onlineNow: "Al campus",
    noCareer: "Sense carrera",
    hours: "{hours} h",
    showMore: "Mostra'n més ({count})",
    none: "No hi ha cap jugador que coincideixi amb la cerca.",
    loading: "Carregant els jugadors…",
    unavailable:
      "Ara mateix la llista no respon. Potser el servidor s'està reiniciant: torna-ho a provar d'aquí a una estona.",
    privacy:
      "Hi surt tothom qui ha jugat almenys 5 minuts. Si no hi vols sortir, escriu /perfil privat dins del joc.",
    ctaTitle: "Encara no hi ets?",
    ctaBody: "Entra al servidor i en pocs minuts tindràs el teu carnet. Al Discord hi trobaràs la resta de la comunitat.",
  },
  profile: {
    cardTag: "Carnet de jugador",
    course: "Curs {course}",
    niu: "NIU",
    career: "Carrera",
    noCareer: "Sense carrera",
    since: "Al servidor des del",
    lastSeen: "Última connexió",
    now: "Ara mateix",
    onlineNow: "Al campus ara mateix",
    seenAgo: "Vist {time}",
    offline: "Desconnectat",
    rank: "#{rank} al rànquing",
    skinLabel: "La skin de {name} en 3D",
    noSkin: "Encara no tenim la seva skin",
    dragHint: "Arrossega per girar-lo",
    poses: { label: "Postura", walk: "Camina", run: "Corre", wave: "Saluda", fly: "Vola", crouch: "Ajup-te" },
    statsTitle: "En xifres",
    stats: {
      hours: "Hores al campus",
      credits: "Crèdits",
      blocksMined: "Blocs minats",
      km: "Km recorreguts",
      mobKills: "Criatures derrotades",
      diamonds: "Diamants trobats",
      deaths: "Morts",
      advancements: "Assoliments",
    },
    highlightsTitle: "Destacats",
    highlights: {
      block: { title: "Bloc preferit", detail: "{count} blocs minats" },
      mob: { title: "Presa preferida", detail: "{count} derrotats" },
      nemesis: { title: "Nèmesi", detail: "L'ha derrotat {count} vegades" },
      crafted: { title: "Especialitat de la casa", detail: "{count} fabricats" },
    },
    travelTitle: "Com es mou",
    travelSubtitle: "{km} km en total, i així els ha fet.",
    travelShare: "{mode}: el {share} % del recorregut",
    travelNone: "Encara no s'ha mogut gaire.",
    travel: {
      walking: "A peu",
      swimming: "Nedant",
      elytra: "Amb èlitres",
      flying: "Volant",
      vehicles: "En barca o vagoneta",
      mounts: "Amb muntura",
      other: "D'altres maneres",
    },
    triviaTitle: "Curiositats",
    triviaSubtitle: "Les petites coses que fan un jugador.",
    triviaNone: "Encara no hi ha res a explicar.",
    trivia: {
      jumps: "salts",
      chestsOpened: "cofres oberts",
      itemsCrafted: "objectes fabricats",
      villagerTrades: "tractes amb vilatans",
      animalsBred: "animals criats",
      fishCaught: "peixos pescats",
      timesSlept: "nits al llit",
      cakeSlices: "trossos de pastís",
      recordsPlayed: "discos escoltats",
      toolsBroken: "eines trencades",
      playerKills: "jugadors derrotats",
      raidsWon: "atacs al poble rebutjats",
    },
    itsYou:
      "Ets tu? Dins del joc, /perfil et dona l'enllaç del teu carnet. Si no vols sortir a la web, /perfil privat.",
    updated: "Dades del servidor · {time}",
    loading: "Carregant el perfil…",
    notFoundTitle: "No trobem {name}",
    notFoundBody:
      "No hi ha cap jugador amb aquest nom, o encara no ha jugat prou. Revisa com s'escriu o busca'l a la llista.",
    privateTitle: "Perfil privat",
    privateBody: "{name} ha decidit no mostrar el seu perfil a la web.",
    unavailableBody:
      "Ara mateix el servidor no respon. Potser s'està reiniciant: torna-ho a provar d'aquí a una estona.",
    backToList: "Tots els jugadors",
  },
  about: {
    title: "Sobre nosaltres",
    subtitle: "Qui som i què ens mou.",
    what: {
      title: "Què fem",
      body: "Gestionem un servidor de Minecraft nascut a la comunitat universitària: món survival, construccions com la plaça cívica, minijocs i esdeveniments. Un espai per jugar, crear i desconnectar.",
    },
    why: {
      title: "Per què ho fem",
      body: "Perquè creiem que els videojocs són una eina brutal per crear comunitat. Volem que qualsevol persona trobi un lloc on fer amics, col·laborar i sentir-se part d'alguna cosa més gran.",
    },
    open: {
      title: "Obert a tothom",
      body: "No cal ser de la UAB per jugar. Vam néixer a l'Autònoma, però les portes estan obertes a tothom qui tingui ganes de construir i fer comunitat.",
    },
    historyCta: "Llegeix la nostra història",
  },
  history: {
    title: "La nostra història",
    subtitle: "D'un servidor entre amics a una comunitat oberta a tothom.",
    chapters: [
      {
        title: "Tot va començar entre amics",
        body: "Volíem un servidor per jugar uns quants amics i trobàvem a faltar que a l'Autònoma no hi hagués res oficial.",
      },
      {
        title: "Un servidor privat",
        body: "Així que vam decidir muntar-ne un pel nostre compte, de moment només per a nosaltres.",
      },
      {
        title: "Obrim les portes",
        body: "Aviat ens va semblar divertit obrir-lo a més gent de l'Autònoma, per conèixer-nos i jugar plegats.",
      },
      {
        title: "Una pausa",
        body: "No ens hi vam acabar d'engrescar i, durant un temps, el projecte va quedar de banda.",
      },
      {
        title: "La tornada",
        body: "L'any següent hi vam tornar amb ganes de donar-li més bombo: ens vam motivar i vam començar a fer propaganda.",
      },
      {
        title: "I aquí estem!",
        body: "Avui mineuab és un servidor obert a tothom, siguis o no de la UAB, i treballem perquè algun dia sigui un projecte oficial de la universitat.",
      },
    ],
    chapter: "Capítol {n}",
    ctaTitle: "Vols escriure el proper capítol amb nosaltres?",
    ctaBody: "Entra al servidor i uneix-te a la comunitat.",
  },
  galleryPreview: {
    title: "Construït bloc a bloc",
    cta: "Veure tota la galeria",
  },
  gallery: {
    title: "Galeria de construccions",
    subtitle: "Racons de l'Autònoma que hem aixecat bloc a bloc al servidor.",
    close: "Tancar",
    prev: "Imatge anterior",
    next: "Imatge següent",
    ctaTitle: "Has construït alguna cosa que vulguis ensenyar?",
    ctaBody: "Comparteix-la al Discord amb la resta de la comunitat.",
    items: {
      civicSquare: "La plaça cívica",
      ferrosPlatform: "L'andana de Ferros",
      ferrosEntrance: "L'entrada a Ferros",
      rain: "La plaça cívica, un dia de pluja",
      trinxera: "La Trinxera",
    },
  },
  // Normes provisionals, fins que tinguem les definitives.
  rules: {
    title: "Normes del servidor",
    subtitle: "Unes quantes normes perquè tothom s'hi senti a gust.",
    index: "Índex",
    sanctionsTitle: "Sancions",
    draftNote:
      "Aquestes són les normes bàsiques mentre acabem la versió definitiva. Si tens qualsevol dubte, pregunta a l'staff al Discord.",
    sections: [
      {
        icon: "🤝",
        title: "Respecte i convivència",
        rules: [
          "Tracta tothom amb respecte. No hi ha lloc per als insults, l'assetjament ni cap mena de discriminació.",
          "Res de spam, flood al xat ni publicitat d'altres servidors.",
          "Mantén el contingut apropiat: noms, skins, cartells i construccions sense res ofensiu ni explícit.",
        ],
      },
      {
        icon: "⚔️",
        title: "Joc net",
        rules: [
          "No es permeten hacks, clients modificats que donin avantatge (X-ray, fly, kill aura…) ni aprofitar errors del joc. Si en trobes un, avisa l'staff.",
          "No destrueixis, modifiquis ni robis construccions o cofres que no són teus.",
          "Evita granges o màquines que sobrecarreguin el servidor.",
        ],
      },
      {
        icon: "🔐",
        title: "El teu compte",
        rules: [
          "El compte és personal: no el comparteixis ni entris amb el d'una altra persona.",
          "Fes servir una contrasenya pròpia per al servidor i no la diguis a ningú. L'staff no te la demanarà mai.",
        ],
      },
      {
        icon: "🛡️",
        title: "Staff",
        rules: [
          "Segueix les indicacions de l'staff. Si no hi estàs d'acord, parla-ho amb calma pel Discord.",
          "Si veus algú saltant-se les normes, avisa l'staff en lloc de respondre pel teu compte.",
        ],
      },
    ],
    sanctions:
      "Saltar-se les normes pot comportar un avís, una expulsió temporal o una expulsió permanent, segons la gravetat.",
    ctaTitle: "Tens dubtes o vols informar d'alguna cosa?",
    ctaBody: "Parla amb l'staff al Discord. T'ajudarem tan aviat com puguem.",
  },
  faq: {
    title: "Preguntes freqüents",
    subtitle: "Tot el que necessites saber per començar a jugar.",
    items: [
      {
        q: "Cal ser de la UAB per jugar?",
        a: "No. mineuab va néixer a l'Autònoma, però el servidor és obert a tothom, siguis o no de la UAB.",
      },
      {
        q: "Com entro al servidor?",
        a: "Obre Minecraft Java Edition, ves a Multijugador i afegeix un servidor amb aquesta adreça:",
        extra: "address",
        link: { href: "/#com-entrar", label: "Veure tots els passos" },
      },
      {
        q: "Quina versió de Minecraft necessito?",
        a: "Minecraft Java Edition, a la mateixa versió que el servidor:",
        extra: "version",
      },
      {
        q: "Puc jugar des de Bedrock (mòbil, consola o Minecraft per a Windows)?",
        a: "De moment no: el servidor només accepta Minecraft Java Edition. Si això canvia, ho anunciarem al Discord.",
      },
      {
        q: "És gratuït?",
        a: "Sí. Entrar i jugar al servidor no costa res.",
      },
      {
        q: "Què són els crèdits?",
        a: "La moneda del servidor. Tothom comença amb 60, com un curs sencer, i en guanyes jugant: amb la beca, passant llista cada dia (/diari), amb els assoliments o venent a la botiga. Els pots gastar a la botiga i a les subhastes, o enviar-los a altres jugadors.",
        link: { href: "/ranquing", label: "Veure el rànquing" },
      },
      {
        q: "Com em registro?",
        a: "El primer cop que entris, crea el teu compte amb la primera ordre. Les altres vegades, inicia sessió amb la segona.",
        code: ["/register <contrasenya> <contrasenya>", "/login <contrasenya>"],
      },
      {
        q: "Acabo d'entrar. Per on començo?",
        a: "Escriu aquesta ordre i et guiarem pels primers passos: triar la carrera, protegir la teva base, passar llista per cobrar crèdits i anar a minar. Si els fas tots, t'emportes un premi en crèdits.",
        code: ["/tutorial"],
      },
      // "Una setmana" són els dies-entre-canvis de plugins/MineUABCarreres/config.yml al servidor.
      {
        q: "Com trio la meva carrera?",
        a: "Escriu aquesta ordre i tria-la al menú: el tag de la teva carrera sortirà al xat i al tab. Si t'equivoques, la pots tornar a canviar al cap d'una setmana.",
        code: ["/carrera"],
      },
      {
        q: "On és el meu perfil de jugador?",
        a: "Cada jugador té un carnet a la web, amb la skin en 3D, la carrera, els crèdits i les estadístiques. Dins del joc, la primera ordre et dona l'enllaç; també el pots buscar a Jugadors. Si no vols sortir a la web, fes servir la segona ordre (i /perfil public per tornar-hi).",
        code: ["/perfil", "/perfil privat"],
        link: { href: "/jugadors", label: "Veure els jugadors" },
      },
      {
        q: "On puc minar sense destrossar el món?",
        a: "Al món de recursos: escriu la primera ordre i hi apareixeràs en un lloc a l'atzar. Mina i explora tant com vulguis, perquè l'1 de cada mes es torna a generar de zero. Per això no hi deixis res: allà no es poden fer homes ni claims. Per tornar, la segona ordre.",
        code: ["/recursos", "/spawn"],
      },
      {
        q: "He oblidat la contrasenya. Què faig?",
        a: "Escriu a l'staff pel Discord i t'ajudaran a recuperar el compte.",
      },
      {
        q: "Puc fer servir mods, shaders o paquets de textures?",
        a: "Sí als que només canvien l'aspecte o milloren el rendiment, com shaders, paquets de textures o Sodium. No als que donen avantatge sobre la resta, com X-ray o hacks. En cas de dubte, pregunta a l'staff.",
        link: { href: "/normes", label: "Llegir les normes" },
      },
      {
        q: "On m'assabento dels esdeveniments?",
        a: "Els anunciem al Discord i a l'Instagram. El Discord és també on trobaràs la resta de la comunitat.",
        link: { href: "/#xarxes", label: "Veure les xarxes" },
      },
      {
        q: "És un projecte oficial de la UAB?",
        a: "Encara no. És un projecte fet per estudiants i estem treballant perquè algun dia sigui oficial.",
      },
      {
        q: "He vist algú fent trampes. Com ho denuncio?",
        a: "Dins del joc, escriu aquesta ordre amb el nom del jugador i què ha passat: l'staff ho rep a l'instant amb el lloc exacte. Si tens captures o un vídeo, envia'ls també pel Discord. No responguis pel teu compte.",
        code: ["/report <jugador> <què ha passat>"],
        link: { href: "/normes", label: "Llegir les normes" },
      },
    ],
    // Només surt si WHITELIST_ENABLED és true, com a segona pregunta.
    whitelistItem: {
      q: "Em diu que no soc a la whitelist. Què faig?",
      a: "Per entrar has de ser a la whitelist. Envia un correu des del teu correu de la UAB amb el teu nom de Minecraft i t'hi afegirem tan aviat com puguem.",
      link: { href: "/#com-entrar", label: "Demanar accés" },
    },
    ctaTitle: "No hi trobes la teva pregunta?",
    ctaBody: "Pregunta-ho al Discord i t'hi ajudarem.",
  },
  socials: {
    title: "Segueix-nos",
    subtitle:
      "Els esdeveniments i les novetats els anunciem a Discord i Instagram. No et perdis res!",
    discord: "El cor de la comunitat, on anunciem esdeveniments i novetats.",
    instagram: "Anuncis, fotos del servidor i el dia a dia de la comunitat.",
    twitch: "Directes i esdeveniments.",
    open: "Obrir",
  },
  footer: {
    about: "Sobre mineuab",
    tagline: "Servidor de Minecraft nascut a l'Autònoma i obert a tothom.",
    disclaimerShort: "Projecte no oficial de la UAB (de moment!).",
    pages: "Pàgines",
    social: "Xarxes",
    server: "Servidor",
    mojang: "No afiliat amb Mojang Studios ni Microsoft.",
    madeWith: "Fet amb ☕ per la comunitat mineuab.",
  },
  common: {
    backHome: "Tornar a l'inici",
    notFound: "Pàgina no trobada",
    notFoundBody:
      "Sembla que aquest bloc no existeix… o potser l'ha fet explotar un creeper.",
  },
} as const;

export type Translations = Widen<typeof ca>;

const es: Translations = {
  nav: {
    home: "Inicio",
    howToJoin: "Cómo entrar",
    about: "Sobre nosotros",
    history: "Nuestra historia",
    historyShort: "Historia",
    socials: "Redes",
    map: "Mapa",
    ranking: "Ranking",
    players: "Jugadores",
    gallery: "Galería",
    rules: "Normas",
    faq: "FAQ",
    langLabel: "Idioma",
    menu: "Menú",
    skip: "Saltar al contenido",
  },
  server: {
    ipLabel: "Dirección IP",
    cardTitle: "Entra al servidor",
    copy: "Copiar dirección IP",
    copied: "¡Dirección copiada!",
    online: "En línea",
    offline: "Fuera de línea",
    playersOne: "{count} jugador en línea",
    playersMany: "{count} jugadores en línea",
    joinOne: "Ahora mismo hay {count} jugador conectado. ¡Únete!",
    joinMany: "Ahora mismo hay {count} jugadores conectados. ¡Únete!",
    joinEmpty: "El servidor está en línea. ¡Sé el primero en entrar!",
    statusOffline:
      "Ahora mismo el servidor está fuera de línea. Vuelve a probar dentro de un rato.",
    version: "Versión",
    access: "Acceso",
    status: "Estado",
    openToAll: "Abierto a todos",
    whitelist: "Con whitelist",
    cardTag: "Carné de jugador",
  },
  hero: {
    eyebrow: "Servidor de Minecraft · Java Edition",
    titleLead: "El servidor de",
    titleAccent: "la Autónoma",
    subtitle:
      "Un servidor hecho por estudiantes y abierto a todo el mundo, seas o no de la UAB.",
    ctaDiscord: "Únete al Discord",
    sticker: "Hecho por estudiantes",
  },
  disclaimer: {
    tag: "Aviso",
    body: "mineuab todavía no es un proyecto oficial de la UAB (Universitat Autònoma de Barcelona), pero estamos trabajando para que lo sea.",
    short: "Todavía no somos un proyecto oficial de la UAB, pero estamos en ello.",
  },
  marquee: [
    "Survival",
    "Construcciones",
    "Eventos",
    "Minijuegos",
    "Abierto a todos",
    "Hecho por estudiantes",
    "Nacido en la Autónoma",
  ],
  howToJoin: {
    title: "Cómo entrar al servidor",
    subtitle:
      "Copia la dirección, abre Minecraft y sigue estos pasos. En un par de minutos ya estás dentro.",
    steps: [
      {
        title: "Abre Minecraft",
        body: "Necesitas Minecraft Java Edition. Desde el menú principal, ve a Multijugador.",
      },
      {
        title: "Añade el servidor",
        body: "Haz clic en «Añadir servidor» y pon esta dirección:",
        code: ["{address}"],
      },
      {
        title: "Regístrate",
        body: "La primera vez que entres, crea tu cuenta. Las siguientes, solo tienes que iniciar sesión.",
        code: ["/register <contraseña> <contraseña>", "/login <contraseña>"],
      },
      {
        title: "Únete al Discord",
        body: "Allí anunciamos los eventos y las novedades, y es donde encontrarás a la comunidad.",
        cta: "Abrir Discord",
      },
    ],
    whitelistStep: {
      title: "Pide acceso",
      body: "El servidor tiene whitelist: solo pueden entrar los jugadores de la lista. Escribe tu nombre de Minecraft y envíanos el correo desde tu correo de la UAB. Te añadiremos lo antes posible.",
    },
    passwordTip:
      "Consejo: usa una contraseña que no utilices en ningún otro sitio.",
  },
  whitelist: {
    nameLabel: "Tu nombre de Minecraft",
    nameHint: "Entre 3 y 16 caracteres: letras, números y _.",
    send: "Preparar el correo",
    fromUab: "Envíalo desde tu correo de la UAB (@uab.cat o @autonoma.cat).",
    orWrite: "Si el botón no te abre el correo, escribe a:",
    copyEmail: "Copiar la dirección de correo",
    copied: "¡Correo copiado!",
    mailSubject: "Whitelist mineuab: {name}",
    mailBody:
      "¡Hola!\n\nMe gustaría entrar al servidor mineuab. Mi nombre de Minecraft es: {name}\n\n¡Gracias!",
  },
  map: {
    title: "Mapa del mundo",
    subtitle:
      "Pasea por el servidor en directo: las construcciones, los caminos y dónde está cada jugador ahora mismo.",
    open: "Abrir a pantalla completa",
    frameTitle: "Mapa en directo del servidor mineuab",
    hint: "Arrastra para moverte y usa la rueda (o pellizca) para acercarte. Si no carga, puede que el servidor se esté reiniciando: vuelve a probarlo dentro de un rato.",
  },
  ranking: {
    title: "Ranking",
    subtitle:
      "Los créditos son la moneda de mineuab. Aquí tienes quién tiene más, en directo desde el servidor.",
    boardTitle: "Cuadro de honor",
    live: "En directo",
    updated: "actualizado {time}",
    amount: "{amount} créditos",
    total: "Créditos en el servidor",
    players: "Jugadores en el ranking",
    loading: "Cargando el ranking…",
    unavailable:
      "Ahora mismo el ranking no responde. Puede que el servidor se esté reiniciando: vuelve a probarlo dentro de un rato.",
    empty: "Todavía no hay nadie en el ranking. ¡Entra al servidor y sé el primero!",
    inGame: "Dentro del juego lo tienes con /ranking. Cuentan la cartera y los ahorros del banco.",
    earn: {
      title: "Cómo se ganan créditos",
      subtitle: "Todo el mundo empieza con 60 créditos, como un curso entero. A partir de ahí, todo suma.",
      items: [
        {
          icon: "🎓",
          title: "La beca",
          body: "Cobras un sueldo por cada rato de juego activo. Si estás AFK, no cuenta.",
        },
        {
          icon: "📋",
          title: "Pasar lista",
          body: "Una recompensa cada día. Si vuelves al día siguiente, la racha sube y cobras más.",
          command: "/diari",
        },
        {
          icon: "📜",
          title: "Asignaturas aprobadas",
          body: "Cada logro (advancement) que consigues te da créditos. Los difíciles, muchos más.",
        },
        {
          icon: "⚔️",
          title: "Caza",
          body: "Matar monstruos da créditos. Los que salen de spawners no cuentan.",
        },
        {
          icon: "🛒",
          title: "Vender en la tienda",
          body: "Vende lo que te sobre. Los precios suben y bajan según la oferta y la demanda.",
          command: "/vendre",
        },
        {
          icon: "🎟️",
          title: "La Grossa",
          body: "Compra boletos y prueba suerte en el sorteo. El bote es para el ganador.",
          command: "/loteria",
        },
      ],
    },
    commands: {
      title: "Comandos útiles",
      items: [
        { command: "/credits", body: "Tu saldo. Con /credits ajuda, todos los comandos." },
        { command: "/pay <jugador> <importe>", body: "Envía créditos a otro jugador." },
        { command: "/botiga", body: "Compra y vende en la tienda del servidor." },
        { command: "/subhasta", body: "La casa de subastas: vende a precio fijo o con pujas." },
        { command: "/intercanvi <jugador>", body: "Intercambia ítems y créditos con seguridad." },
        { command: "/xec crear <importe>", body: "Convierte créditos en un cheque que puedes dar o guardar." },
        { command: "/banc", body: "Ahorra y cobra intereses mientras juegas." },
        { command: "/ranking", body: "El cuadro de honor, dentro del juego." },
      ],
    },
    ctaTitle: "¿Quieres subir en el ranking?",
    ctaBody: "Entra al servidor y empieza a ganar créditos. En Discord encontrarás al resto de la comunidad.",
  },
  players: {
    title: "Jugadores",
    subtitle: "Todo el que ha pasado por el campus. Búscate y abre tu carnet de jugador.",
    searchLabel: "Busca un jugador",
    searchPlaceholder: "Nombre o carrera",
    careerLabel: "Carrera",
    allCareers: "Todas",
    sortLabel: "Ordenar por",
    sort: { recent: "Última conexión", hours: "Más horas", name: "Nombre (A-Z)" },
    count: "{count} jugadores",
    online: "{count} en el campus ahora",
    onlineNow: "En el campus",
    noCareer: "Sin carrera",
    hours: "{hours} h",
    showMore: "Mostrar más ({count})",
    none: "No hay ningún jugador que coincida con la búsqueda.",
    loading: "Cargando los jugadores…",
    unavailable:
      "Ahora mismo la lista no responde. Quizá el servidor se está reiniciando: vuelve a probar dentro de un rato.",
    privacy:
      "Sale todo el que ha jugado al menos 5 minutos. Si no quieres salir, escribe /perfil privat dentro del juego.",
    ctaTitle: "¿Aún no estás?",
    ctaBody: "Entra al servidor y en pocos minutos tendrás tu carnet. En Discord encontrarás al resto de la comunidad.",
  },
  profile: {
    cardTag: "Carnet de jugador",
    course: "Curso {course}",
    niu: "NIU",
    career: "Carrera",
    noCareer: "Sin carrera",
    since: "En el servidor desde el",
    lastSeen: "Última conexión",
    now: "Ahora mismo",
    onlineNow: "En el campus ahora mismo",
    seenAgo: "Visto {time}",
    offline: "Desconectado",
    rank: "#{rank} en el ranking",
    skinLabel: "La skin de {name} en 3D",
    noSkin: "Todavía no tenemos su skin",
    dragHint: "Arrastra para girarlo",
    poses: { label: "Postura", walk: "Camina", run: "Corre", wave: "Saluda", fly: "Vuela", crouch: "Agáchate" },
    statsTitle: "En cifras",
    stats: {
      hours: "Horas en el campus",
      credits: "Créditos",
      blocksMined: "Bloques minados",
      km: "Km recorridos",
      mobKills: "Criaturas derrotadas",
      diamonds: "Diamantes encontrados",
      deaths: "Muertes",
      advancements: "Logros",
    },
    highlightsTitle: "Destacados",
    highlights: {
      block: { title: "Bloque favorito", detail: "{count} bloques minados" },
      mob: { title: "Presa favorita", detail: "{count} derrotados" },
      nemesis: { title: "Némesis", detail: "Lo ha derrotado {count} veces" },
      crafted: { title: "Especialidad de la casa", detail: "{count} fabricados" },
    },
    travelTitle: "Cómo se mueve",
    travelSubtitle: "{km} km en total, y así los ha hecho.",
    travelShare: "{mode}: el {share} % del recorrido",
    travelNone: "Todavía no se ha movido mucho.",
    travel: {
      walking: "A pie",
      swimming: "Nadando",
      elytra: "Con élitros",
      flying: "Volando",
      vehicles: "En barca o vagoneta",
      mounts: "Con montura",
      other: "De otras maneras",
    },
    triviaTitle: "Curiosidades",
    triviaSubtitle: "Las pequeñas cosas que hacen a un jugador.",
    triviaNone: "Todavía no hay nada que contar.",
    trivia: {
      jumps: "saltos",
      chestsOpened: "cofres abiertos",
      itemsCrafted: "objetos fabricados",
      villagerTrades: "tratos con aldeanos",
      animalsBred: "animales criados",
      fishCaught: "peces pescados",
      timesSlept: "noches en la cama",
      cakeSlices: "trozos de pastel",
      recordsPlayed: "discos escuchados",
      toolsBroken: "herramientas rotas",
      playerKills: "jugadores derrotados",
      raidsWon: "asaltos a la aldea repelidos",
    },
    itsYou:
      "¿Eres tú? Dentro del juego, /perfil te da el enlace de tu carnet. Si no quieres salir en la web, /perfil privat.",
    updated: "Datos del servidor · {time}",
    loading: "Cargando el perfil…",
    notFoundTitle: "No encontramos a {name}",
    notFoundBody:
      "No hay ningún jugador con este nombre, o todavía no ha jugado lo suficiente. Revisa cómo se escribe o búscalo en la lista.",
    privateTitle: "Perfil privado",
    privateBody: "{name} ha decidido no mostrar su perfil en la web.",
    unavailableBody:
      "Ahora mismo el servidor no responde. Quizá se está reiniciando: vuelve a probar dentro de un rato.",
    backToList: "Todos los jugadores",
  },
  about: {
    title: "Sobre nosotros",
    subtitle: "Quiénes somos y qué nos mueve.",
    what: {
      title: "Qué hacemos",
      body: "Gestionamos un servidor de Minecraft nacido en la comunidad universitaria: mundo survival, construcciones como la plaza cívica, minijuegos y eventos. Un espacio para jugar, crear y desconectar.",
    },
    why: {
      title: "Por qué lo hacemos",
      body: "Porque creemos que los videojuegos son una herramienta brutal para crear comunidad. Queremos que cualquier persona encuentre un lugar donde hacer amigos, colaborar y sentirse parte de algo más grande.",
    },
    open: {
      title: "Abierto a todos",
      body: "No hace falta ser de la UAB para jugar. Nacimos en la Autónoma, pero las puertas están abiertas a cualquiera con ganas de construir y crear comunidad.",
    },
    historyCta: "Lee nuestra historia",
  },
  history: {
    title: "Nuestra historia",
    subtitle: "De un servidor entre amigos a una comunidad abierta a todos.",
    chapters: [
      {
        title: "Todo empezó entre amigos",
        body: "Queríamos un servidor para jugar unos cuantos amigos y echábamos de menos que en la Autónoma no hubiera nada oficial.",
      },
      {
        title: "Un servidor privado",
        body: "Así que decidimos montar uno por nuestra cuenta, de momento solo para nosotros.",
      },
      {
        title: "Abrimos las puertas",
        body: "Pronto nos pareció divertido abrirlo a más gente de la Autónoma, para conocernos y jugar juntos.",
      },
      {
        title: "Una pausa",
        body: "No acabamos de engancharnos y, durante un tiempo, el proyecto quedó aparcado.",
      },
      {
        title: "La vuelta",
        body: "Al año siguiente volvimos con ganas de darle más bombo: nos motivamos y empezamos a hacer difusión.",
      },
      {
        title: "¡Y aquí estamos!",
        body: "Hoy mineuab es un servidor abierto a todo el mundo, seas o no de la UAB, y trabajamos para que algún día sea un proyecto oficial de la universidad.",
      },
    ],
    chapter: "Capítulo {n}",
    ctaTitle: "¿Quieres escribir el próximo capítulo con nosotros?",
    ctaBody: "Entra al servidor y únete a la comunidad.",
  },
  galleryPreview: {
    title: "Construido bloque a bloque",
    cta: "Ver toda la galería",
  },
  gallery: {
    title: "Galería de construcciones",
    subtitle: "Rincones de la Autónoma que hemos levantado bloque a bloque en el servidor.",
    close: "Cerrar",
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    ctaTitle: "¿Has construido algo que quieras enseñar?",
    ctaBody: "Compártelo en Discord con el resto de la comunidad.",
    items: {
      civicSquare: "La plaza cívica",
      ferrosPlatform: "El andén de Ferros",
      ferrosEntrance: "La entrada a Ferros",
      rain: "La plaza cívica, un día de lluvia",
      trinxera: "La Trinxera",
    },
  },
  rules: {
    title: "Normas del servidor",
    subtitle: "Unas pocas normas para que todo el mundo esté a gusto.",
    index: "Índice",
    sanctionsTitle: "Sanciones",
    draftNote:
      "Estas son las normas básicas mientras terminamos la versión definitiva. Si tienes cualquier duda, pregunta al staff en Discord.",
    sections: [
      {
        icon: "🤝",
        title: "Respeto y convivencia",
        rules: [
          "Trata a todo el mundo con respeto. No hay lugar para insultos, acoso ni ningún tipo de discriminación.",
          "Nada de spam, flood en el chat ni publicidad de otros servidores.",
          "Mantén el contenido apropiado: nombres, skins, carteles y construcciones sin nada ofensivo ni explícito.",
        ],
      },
      {
        icon: "⚔️",
        title: "Juego limpio",
        rules: [
          "No se permiten hacks, clientes modificados que den ventaja (X-ray, fly, kill aura…) ni aprovechar errores del juego. Si encuentras uno, avisa al staff.",
          "No destruyas, modifiques ni robes construcciones o cofres que no son tuyos.",
          "Evita granjas o máquinas que sobrecarguen el servidor.",
        ],
      },
      {
        icon: "🔐",
        title: "Tu cuenta",
        rules: [
          "La cuenta es personal: no la compartas ni entres con la de otra persona.",
          "Usa una contraseña propia para el servidor y no se la digas a nadie. El staff nunca te la pedirá.",
        ],
      },
      {
        icon: "🛡️",
        title: "Staff",
        rules: [
          "Sigue las indicaciones del staff. Si no estás de acuerdo, háblalo con calma por Discord.",
          "Si ves a alguien saltándose las normas, avisa al staff en lugar de responder por tu cuenta.",
        ],
      },
    ],
    sanctions:
      "Saltarse las normas puede suponer un aviso, una expulsión temporal o una expulsión permanente, según la gravedad.",
    ctaTitle: "¿Tienes dudas o quieres informar de algo?",
    ctaBody: "Habla con el staff en Discord. Te ayudaremos lo antes posible.",
  },
  faq: {
    title: "Preguntas frecuentes",
    subtitle: "Todo lo que necesitas saber para empezar a jugar.",
    items: [
      {
        q: "¿Hace falta ser de la UAB para jugar?",
        a: "No. mineuab nació en la Autónoma, pero el servidor está abierto a todo el mundo, seas o no de la UAB.",
      },
      {
        q: "¿Cómo entro al servidor?",
        a: "Abre Minecraft Java Edition, ve a Multijugador y añade un servidor con esta dirección:",
        extra: "address",
        link: { href: "/#com-entrar", label: "Ver todos los pasos" },
      },
      {
        q: "¿Qué versión de Minecraft necesito?",
        a: "Minecraft Java Edition, en la misma versión que el servidor:",
        extra: "version",
      },
      {
        q: "¿Puedo jugar desde Bedrock (móvil, consola o Minecraft para Windows)?",
        a: "De momento no: el servidor solo acepta Minecraft Java Edition. Si esto cambia, lo anunciaremos en Discord.",
      },
      {
        q: "¿Es gratis?",
        a: "Sí. Entrar y jugar en el servidor no cuesta nada.",
      },
      {
        q: "¿Qué son los créditos?",
        a: "La moneda del servidor. Todo el mundo empieza con 60, como un curso entero, y ganas más jugando: con la beca, pasando lista cada día (/diari), con los logros o vendiendo en la tienda. Puedes gastarlos en la tienda y en las subastas, o enviarlos a otros jugadores.",
        link: { href: "/ranquing", label: "Ver el ranking" },
      },
      {
        q: "¿Cómo me registro?",
        a: "La primera vez que entres, crea tu cuenta con el primer comando. Las siguientes, inicia sesión con el segundo.",
        code: ["/register <contraseña> <contraseña>", "/login <contraseña>"],
      },
      {
        q: "Acabo de entrar. ¿Por dónde empiezo?",
        a: "Escribe este comando y te guiaremos por los primeros pasos: elegir la carrera, proteger tu base, pasar lista para cobrar créditos e ir a minar. Si los haces todos, te llevas un premio en créditos.",
        code: ["/tutorial"],
      },
      {
        q: "¿Cómo elijo mi carrera?",
        a: "Escribe este comando y elígela en el menú: la etiqueta de tu carrera saldrá en el chat y en el tab. Si te equivocas, puedes volver a cambiarla al cabo de una semana.",
        code: ["/carrera"],
      },
      {
        q: "¿Dónde está mi perfil de jugador?",
        a: "Cada jugador tiene un carnet en la web, con la skin en 3D, la carrera, los créditos y las estadísticas. Dentro del juego, el primer comando te da el enlace; también lo puedes buscar en Jugadores. Si no quieres salir en la web, usa el segundo comando (y /perfil public para volver).",
        code: ["/perfil", "/perfil privat"],
        link: { href: "/jugadors", label: "Ver los jugadores" },
      },
      {
        q: "¿Dónde puedo minar sin destrozar el mundo?",
        a: "En el mundo de recursos: escribe el primer comando y aparecerás en un lugar al azar. Mina y explora todo lo que quieras, porque el día 1 de cada mes se vuelve a generar desde cero. Por eso no dejes nada allí: no se pueden hacer homes ni claims. Para volver, el segundo comando.",
        code: ["/recursos", "/spawn"],
      },
      {
        q: "He olvidado la contraseña. ¿Qué hago?",
        a: "Escribe al staff por Discord y te ayudarán a recuperar la cuenta.",
      },
      {
        q: "¿Puedo usar mods, shaders o paquetes de texturas?",
        a: "Sí a los que solo cambian el aspecto o mejoran el rendimiento, como shaders, paquetes de texturas o Sodium. No a los que dan ventaja sobre el resto, como X-ray o hacks. Si tienes dudas, pregunta al staff.",
        link: { href: "/normes", label: "Leer las normas" },
      },
      {
        q: "¿Dónde me entero de los eventos?",
        a: "Los anunciamos en Discord y en Instagram. En Discord también encontrarás al resto de la comunidad.",
        link: { href: "/#xarxes", label: "Ver las redes" },
      },
      {
        q: "¿Es un proyecto oficial de la UAB?",
        a: "Todavía no. Es un proyecto hecho por estudiantes y estamos trabajando para que algún día sea oficial.",
      },
      {
        q: "He visto a alguien haciendo trampas. ¿Cómo lo denuncio?",
        a: "Dentro del juego, escribe este comando con el nombre del jugador y lo que ha pasado: el staff lo recibe al instante con el lugar exacto. Si tienes capturas o un vídeo, envíalos también por Discord. No respondas por tu cuenta.",
        code: ["/report <jugador> <lo que ha pasado>"],
        link: { href: "/normes", label: "Leer las normas" },
      },
    ],
    whitelistItem: {
      q: "Me dice que no estoy en la whitelist. ¿Qué hago?",
      a: "Para entrar tienes que estar en la whitelist. Envía un correo desde tu correo de la UAB con tu nombre de Minecraft y te añadiremos lo antes posible.",
      link: { href: "/#com-entrar", label: "Pedir acceso" },
    },
    ctaTitle: "¿No encuentras tu pregunta?",
    ctaBody: "Pregúntalo en Discord y te ayudaremos.",
  },
  socials: {
    title: "Síguenos",
    subtitle:
      "Los eventos y las novedades los anunciamos en Discord e Instagram. ¡No te pierdas nada!",
    discord: "El corazón de la comunidad, donde anunciamos eventos y novedades.",
    instagram: "Anuncios, fotos del servidor y el día a día de la comunidad.",
    twitch: "Directos y eventos.",
    open: "Abrir",
  },
  footer: {
    about: "Sobre mineuab",
    tagline: "Servidor de Minecraft nacido en la Autónoma y abierto a todos.",
    disclaimerShort: "Proyecto no oficial de la UAB (¡de momento!).",
    pages: "Páginas",
    social: "Redes",
    server: "Servidor",
    mojang: "No afiliado con Mojang Studios ni Microsoft.",
    madeWith: "Hecho con ☕ por la comunidad mineuab.",
  },
  common: {
    backHome: "Volver al inicio",
    notFound: "Página no encontrada",
    notFoundBody:
      "Parece que este bloque no existe… o quizá lo ha hecho explotar un creeper.",
  },
};

export const translations: Record<Locale, Translations> = { ca, es };
