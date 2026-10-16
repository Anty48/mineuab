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
    recipes: "Receptes",
    gallery: "Galeria",
    rules: "Normes",
    stars: "Pacte de les estrelles",
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
  },
  disclaimer: {
    tag: "Avís",
    body: "mineuab encara no és un projecte oficial de la UAB (Universitat Autònoma de Barcelona), però hi estem treballant perquè ho sigui.",
    short: "Encara no som un projecte oficial de la UAB, però hi estem treballant.",
  },
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
          title: "La beca",
          body: "Cobres un sou per cada estona de joc actiu. Si estàs AFK, no compta.",
        },
        {
          title: "Passar llista",
          body: "Una recompensa cada dia. Si hi tornes l'endemà, la ratxa puja i cobres més.",
          command: "/diari",
        },
        {
          title: "Assignatures aprovades",
          body: "Cada assoliment (advancement) que aconsegueixes et dona crèdits. Els difícils, molts més.",
        },
        {
          title: "Caça",
          body: "Matar monstres dona crèdits. Els que surten d'spawners no compten.",
        },
        {
          title: "Vendre a la botiga",
          body: "Ven el que et sobri. Els preus pugen i baixen segons l'oferta i la demanda.",
          command: "/vendre",
        },
        {
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
  recipes: {
    title: "Receptes",
    subtitle: "Els plats i els objectes que només trobaràs a mineuab, i com es fan.",
    listTitle: "Receptes del servidor",
    live: "En directe",
    updated: "actualitzat {time}",
    intro:
      "Es fan com qualsevol altra recepta del joc: posa els ingredients a la taula de treball, al forn o a l'altar de pocions. Quan l'staff n'afegeix una de nova, surt aquí tota sola.",
    filterLabel: "Filtra per estació",
    filterAll: "Totes",
    stations: {
      crafting: "Taula de treball",
      furnace: "Forn",
      blast_furnace: "Alt forn",
      smoker: "Fumador",
      campfire: "Foguera",
      brewing: "Altar de pocions",
      smithing: "Taula de ferreria",
      stonecutting: "Tallapedres",
      anvil: "Enclusa",
    },
    shapeless: "En qualsevol ordre",
    smelting: "{xp} XP · {seconds} s",
    brewing: "L'ingredient de dalt transforma el de baix",
    levels: "{levels} nivells",
    madeWith: "Es fa amb una altra recepta: prem per anar-hi.",
    hint: "Passa el ratolí per sobre d'un ítem (o toca'l) per veure'n el nom i la descripció. Els ítems amb un punt verd surten d'una altra recepta.",
    loading: "Carregant les receptes…",
    unavailable:
      "Ara mateix les receptes no responen. Potser el servidor s'està reiniciant: torna-ho a provar d'aquí a una estona.",
    empty: "Encara no hi ha cap recepta pròpia del servidor.",
    ctaTitle: "Tens idees per a receptes noves?",
    ctaBody: "Proposa-les al Discord: les millors acaben dins del joc.",
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
    pact: "Pacte de les estrelles",
    pactStars: "{n} de 5 estrelles",
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
  // Fetes a partir de les normes de servidors semblants (d'universitats, de supervivència amb
  // economia i grans com Wynncraft o CubeCraft) i adaptades a mineuab. Les xifres (30 blocs,
  // 3 mesos) són decisions de l'staff: si canvien, canvieu-les també en castellà.
  rules: {
    title: "Normes del servidor",
    subtitle: "Unes quantes normes perquè tothom s'hi senti a gust.",
    index: "Índex",
    sanctionsTitle: "Sancions",
    note: "Les normes poden canviar a mesura que el servidor creixi. Si canvien, ho avisarem al Discord. Última actualització: octubre de 2026.",
    sections: [
      {
        title: "Respecte i convivència",
        rules: [
          "Tracta tothom amb respecte, al joc i al Discord. No hi ha lloc per als insults, l'assetjament, les amenaces ni cap mena de discriminació, sigui per origen, gènere, orientació, religió, discapacitat o qualsevol altre motiu.",
          "Aquí s'hi parla en català, en castellà o en la llengua que calgui. No facis de menys ningú per la llengua en què escriu.",
          "Res de spam ni flood al xat, ni missatges tot en majúscules, ni publicitat d'altres servidors o enllaços que no vinguin a tomb.",
          "Mantén el contingut apropiat: noms, skins, cartells, llibres, noms d'ítems i construccions sense res ofensiu, sexual ni violent. L'staff et pot demanar que ho canviïs o ho pot retirar.",
          "No comparteixis dades personals d'altres jugadors (nom real, xarxes, NIU, adreça, fotos…) sense el seu permís. Amb les teves, també ves amb compte.",
          "No et facis passar per l'staff ni per cap altre jugador.",
        ],
      },
      {
        title: "Joc net",
        rules: [
          "No es permeten hacks ni mods que donin avantatge: X-ray, fly, kill aura, auto-clickers, radars de jugadors o de mobs, mapes de coves, buscadors de llavors… Sí que pots fer servir els que només canvien l'aspecte o milloren el rendiment, com shaders, paquets de textures, Sodium, OptiFine o un minimapa sense coves ni entitats. En cas de dubte, pregunta abans.",
          "No aprofitis errors del joc ni del servidor (duplicar ítems, entrar en zones protegides, trucs amb l'economia…) ni els expliquis a ningú. Si en trobes un, reporta'l a l'staff: si no l'has fet servir, no tindràs cap problema.",
          "Els crèdits s'han de guanyar jugant: res de macros, bots ni trucs per cobrar la beca o altres recompenses mentre estàs AFK.",
          "Les granges automàtiques estan permeses mentre no carreguin massa el servidor. Res de màquines per fer lag; si una granja en provoca, l'staff et pot demanar que la redueixis o la pot desactivar.",
        ],
      },
      {
        title: "Construccions i bases",
        rules: [
          "El que no és teu no es toca: no destrueixis, modifiquis ni robis construccions, cofres, granges, animals ni mascotes d'altres jugadors, encara que no estiguin protegits. L'única excepció és el pacte de les estrelles: dins de les bases, i només entre qui l'ha signat.",
          "Protegeix la teva base amb un claim (/tutorial t'ensenya com). L'staff no sempre podrà recuperar el que es perdi en una zona sense protegir.",
          "Deixa espai: no construeixis a menys de 30 blocs de la base d'una altra persona sense el seu permís, ni facis claims per encerclar-la o tallar-li el pas.",
          "L'spawn i les construccions del campus són de tothom: no les modifiquis ni hi facis bases o granges.",
          "El món de recursos (/recursos) és per minar i explorar. Es torna a generar l'1 de cada mes i no s'hi poden fer homes ni claims, així que no hi deixis res que vulguis conservar.",
          "Si una base porta més de 3 mesos sense que el seu propietari entri al servidor, l'staff la pot netejar per fer lloc. Si marxes una temporada, avisa'ns pel Discord.",
        ],
      },
      // El que el pacte permet ho controla el plugin MineUABEstrelles; aquí només hi ha el que el plugin no pot impedir.
      {
        title: "PvP i el pacte de les estrelles",
        rules: [
          "Lluitar, quedar-se el botí i atacar bases només es pot fer entre jugadors que han signat el pacte de les estrelles (/estrelles), i només fins on arribin les estrelles de tots dos. Entre qui l'ha signat, s'hi val; a qui no l'ha signat, no se li pot fer res.",
          "No busquis maneres de saltar-te'l: res de trampes, lava, mobs ni caigudes per matar algú que no té pacte amb tu o fer-li perdre les coses.",
          "Res de comptes secundaris ni de baralles pactades amb amics per fer-vos botí de crèdits.",
        ],
        link: { label: "Com funciona", title: "El pacte de les estrelles", href: "/estrelles" },
      },
      {
        title: "Economia i intercanvis",
        rules: [
          "Compleix els tractes. Estafar està prohibit: no lliurar el que has promès, enganyar amb el preu o aprofitar-te que algú no sap com funciona alguna cosa. Per anar segur, fes servir /intercanvi.",
          "Els crèdits, els ítems i els comptes no es compren ni es venen amb diners reals ni a canvi de coses d'altres jocs. Si passa, se sancionen totes dues parts.",
          "Un compte per persona. Res de fer servir comptes secundaris per cobrar més recompenses (la beca, passar llista, La Grossa…) ni per moure crèdits.",
          "No organitzis apostes ni sortejos propis amb crèdits sense el permís de l'staff. Per provar sort, ja hi ha La Grossa.",
        ],
      },
      {
        title: "El teu compte",
        rules: [
          "El compte és personal: no el comparteixis ni entris amb el d'una altra persona. Ets responsable de tot el que es faci des del teu.",
          "Fes servir una contrasenya que no utilitzis enlloc més i no la diguis a ningú. L'staff no te la demanarà mai.",
        ],
      },
      {
        title: "Staff i reports",
        rules: [
          "Segueix les indicacions de l'staff. Si no hi estàs d'acord, parla-ho amb calma pel Discord, no al xat del joc.",
          "Si veus algú saltant-se les normes, no responguis pel teu compte: fes servir /report <jugador> <què ha passat> i, si pots, envia captures o un vídeo a l'staff pel Discord. Els reports falsos o de broma també se sancionen.",
          "Aquestes normes valen al servidor i al Discord. L'staff també pot actuar en situacions que no hi surtin escrites si perjudiquen la comunitat.",
        ],
      },
    ],
    sanctions: "Les sancions depenen de la gravetat i de si és el primer cop. Normalment van per aquest ordre:",
    sanctionSteps: [
      "Un avís.",
      "Un silenci al xat o una expulsió temporal.",
      "Una expulsió més llarga.",
      "L'expulsió permanent.",
    ],
    sanctionsSevere:
      "En els casos greus (hacks, duplicar ítems, vendre per diners reals, assetjament o difondre dades personals) l'staff pot passar directament a l'expulsió. A més, es retira tot el que s'hagi aconseguit amb trampes.",
    appeal:
      "Si creus que una sanció és injusta, escriu a l'staff pel Discord i explica-ho amb calma. Fer servir un altre compte per esquivar una sanció comporta l'expulsió permanent de tots dos.",
    ctaTitle: "Tens dubtes o vols informar d'alguna cosa?",
    ctaBody: "Parla amb l'staff al Discord. T'ajudarem tan aviat com puguem.",
  },
  // El pacte de les estrelles (plugin MineUABEstrelles). Les xifres (5 h, 24 h, 72 h, 20 s, 15 min, 10 %…) surten
  // del config.yml del plugin: si canvien allà, canvieu-les aquí i en castellà.
  stars: {
    title: "El pacte de les estrelles",
    subtitle:
      "A mineuab no et poden atacar, robar ni entrar a la base si no ho has acceptat abans. Si t'agrada el risc, signa el pacte i tria fins on vols arribar.",
    intro: [
      "Cada jugador té de 0 a 5 estrelles. Tothom comença amb 0, i amb 0 ningú no et pot fer mal, ni obrir-te els cofres, ni tocar-te la base.",
      "Cada estrella que signes et deixa fer una cosa més (lluitar, quedar-te el botí, entrar a les bases…), però també vol dir que te la poden fer a tu.",
    ],
    commandHint: "Per veure les teves estrelles o signar-ne una:",
    ruleLabel: "La regla",
    rule: "Una cosa només es pot fer si tots dos teniu prou estrelles.",
    ruleBody:
      "Les teves estrelles són el màxim que pots fer i, alhora, el màxim que et poden fer. Si pots robar als de ★3, els de ★3 també et poden robar a tu. Quan ataques una base, l'altra persona és el propietari.",
    exampleLabel: "Per exemple",
    example:
      "Es troben un ★5 i un ★2. Poden lluitar i quedar-se el botí, perquè el ★2 hi arriba. Però a la base del ★2, el ★5 no hi pot entrar: per això calen ★3 tots dos.",
    levelsLabel: "Els nivells",
    levelsTitle: "De civil a senyor de la guerra",
    levelsSubtitle: "Cada nivell porta tot el dels anteriors i hi afegeix alguna cosa.",
    level: "Nivell {n}",
    levels: [
      {
        name: "Civil",
        body: "Ningú no et pot fer res, i tu no pots fer res a ningú. Les teves coses i la teva base estan sempre protegides. És on comença tothom.",
      },
      {
        name: "Combatent",
        body: "Pots lluitar amb qui tingui ★1 o més, fora de les bases. Si caus, et quedes l'inventari: no hi ha tomba ni botí.",
      },
      {
        name: "Bandoler",
        body: "Comença el botí. Qui t'abat pot obrir la teva tomba i quedar-se el que portaves, i s'emporta el 10 % de la cartera (200 crèdits com a molt). El que tens al banc no es toca mai.",
      },
      {
        name: "Lladre",
        body: "Pots entrar a les bases dels de ★3 o més: obrir-ne els cofres i altres contenidors, fer servir portes, palanques, marcs i suports d'armadura, i lluitar-hi a dins.",
      },
      {
        name: "Saquejador",
        body: "Pots trencar i posar blocs a les bases dels de ★4 o més, i fer mal als seus animals i vehicles.",
      },
      {
        name: "Senyor de la guerra",
        body: "Guerra oberta: foc, lava i TNT a les bases dels de ★5 o més.",
      },
    ],
    changeLabel: "Pujar i baixar",
    changeTitle: "Com es canvia d'estrelles",
    climb: {
      label: "Pujar",
      title: "Una estrella cada vegada",
      body: "Obre el menú amb /estrelles o fes /estrelles pujar per veure el pacte de l'estrella següent. Abans de signar-lo, te'l llegeixes i l'has de confirmar.",
      facts: [
        "Cal haver jugat 5 hores al servidor.",
        "Entre pujada i pujada, 24 hores. La primera estrella no espera.",
        "Es puja d'una en una: de ★0 a ★5 hi ha com a mínim quatre dies.",
        "Quan algú signa, el servidor ho anuncia a tothom.",
      ],
      code: ["/estrelles", "/estrelles pujar"],
    },
    retreat: {
      label: "Baixar",
      title: "Una retirada de 72 hores",
      body: "Amb /estrelles baixar i el nombre d'estrelles que vols tenir, comences una retirada. Durant 72 hores continues amb les estrelles d'ara: així ningú no pot pujar, atacar i desaparèixer abans que li puguin respondre.",
      facts: [
        "La pots anul·lar quan vulguis.",
        "No la pots començar enmig d'un combat.",
        "Mentre dura, no pots pujar.",
      ],
      code: ["/estrelles baixar <estrelles>", "/estrelles baixar anul·la"],
    },
    combatLabel: "El combat",
    combatTitle: "Com es lluita",
    combatSubtitle:
      "Només hi ha PvP entre jugadors que tenen ★1 o més tots dos: cops, fletxes, pocions, llops, TNT… Si un dels dos no té el pacte, els cops no fan mal i la barra d'acció explica per què.",
    combat: [
      {
        title: "Marca de combat",
        body: "Després de cada cop quedes 20 segons en combat (30 si has atacat una base). Mentrestant no et pots teletransportar (/home, /spawn, /tpa, /recursos…) ni fugir per un portal. El compte enrere surt a la barra d'acció.",
      },
      {
        title: "Desconnectar-se no salva",
        body: "Si surts del servidor amb la marca de combat, caus allà mateix, i compta com si t'hagués abatut l'últim rival, botí inclòs.",
      },
      {
        title: "En reaparèixer",
        body: "Tens 10 segons en què ningú no et pot fer mal. Si ataques abans, els perds.",
      },
      {
        title: "Morts de rebot",
        body: "Si mors per una caiguda, per la lava o pel que sigui fins a 10 segons després d'un cop, t'ha abatut qui et va pegar.",
      },
      {
        title: "Lava i foc",
        body: "No pots buidar lava ni encendre foc a menys de 4 blocs d'algú que no tingui pacte amb tu.",
      },
      {
        title: "Botí de crèdits",
        body: "La mateixa parella només en dona un cop per hora, i si tots dos jugueu des de la mateixa xarxa (la mateixa IP), no n'hi ha. A la resi us podeu barallar igual, però sense botí de crèdits.",
      },
    ],
    combatNote:
      "Als minijocs, com el Bingo, el pacte no hi compta: cada joc té les seves regles. I on el servidor no deixa lluitar, el pacte tampoc no hi canvia res.",
    basesLabel: "Les bases",
    basesTitle: "Atacar una base",
    basesSubtitle:
      "Les bases són els claims de sempre, i el que s'hi pot fer depèn de les estrelles del propietari. Els membres d'una base hi poden fer de tot, com fins ara.",
    bases: [
      "Una base només es pot atacar si el propietari està connectat o si fa menys de 15 minuts que ha sortit. Ningú no perd la base mentre dorm, i ningú no se salva d'un atac desconnectant-se.",
      "Quan algú t'ataca la base, reps un avís amb qui és, quantes estrelles té i on és. Qui ataca queda marcat 30 segons.",
      "Les zones de l'staff no es poden atacar mai, tinguis les estrelles que tinguis.",
      "Fora de les bases, el pacte no dona permís per tocar res: una construcció sense claim continua sent del seu propietari.",
    ],
    commandsLabel: "Ordres",
    commandsTitle: "Totes les ordres",
    commands: [
      { cmd: "/estrelles", what: "El menú: les teves estrelles, els sis nivells i la retirada." },
      { cmd: "/estrelles pujar", what: "Ensenya el pacte de l'estrella següent per signar-lo." },
      {
        cmd: "/estrelles baixar <estrelles>",
        what: "Comença la retirada. Amb anul·la en lloc del número, l'atura.",
      },
      {
        cmd: "/estrelles info [jugador]",
        what: "Quantes estrelles té algú (o tu, si no poses cap nom) i si està en retirada o en combat.",
      },
      { cmd: "/estrelles llista", what: "Qui té el pacte ara mateix." },
    ],
    commandsNote: "També pots escriure /pacte en lloc de /estrelles.",
    rulesTitle: "Les normes continuen valent",
    rulesBody:
      "Dins del pacte, el que el joc et deixa fer s'hi val. El que no s'hi val és saltar-se'l: comptes secundaris per fer-se botí, trampes per matar qui no té pacte amb tu o errors del joc per entrar on no pots.",
    rulesLink: "Llegir les normes",
    ctaTitle: "Tens dubtes sobre el pacte?",
    ctaBody:
      "Pregunta-ho al Discord. I si veus que alguna cosa no funciona com explica aquesta pàgina, avisa l'staff.",
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
      // El premi és premi.ordres de plugins/MineUABDiscord/config.yml al servidor.
      {
        q: "Com vinculo el meu compte de Discord?",
        a: "Escriu aquesta ordre al joc: et donarà un codi de 4 xifres. Envia'l per missatge privat al bot de MineUAB a Discord i ja estarà. A partir d'aquí, la carrera va a la par entre el joc i Discord, i si a Discord tens el rol de la UAB surts com a UAB (o com a Convidat si ets d'una altra universitat). La primera vegada et regalem 50 crèdits.",
        code: ["/discord link"],
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
        q: "Em poden matar o robar?",
        a: "Només si tu vols. Lluitar, quedar-se el botí i atacar bases només es pot fer entre jugadors que han signat el pacte de les estrelles, i mai més enllà del que permeten les estrelles de tots dos. Si no el signes, ningú no et pot fer res.",
        code: ["/estrelles"],
        link: { href: "/estrelles", label: "Com funciona el pacte" },
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
    youtube: "Vídeos del servidor: construccions, esdeveniments i tutorials.",
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
    madeWith: "Fet per la comunitat mineuab.",
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
    recipes: "Recetas",
    gallery: "Galería",
    rules: "Normas",
    stars: "Pacto de las estrellas",
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
  },
  disclaimer: {
    tag: "Aviso",
    body: "mineuab todavía no es un proyecto oficial de la UAB (Universitat Autònoma de Barcelona), pero estamos trabajando para que lo sea.",
    short: "Todavía no somos un proyecto oficial de la UAB, pero estamos en ello.",
  },
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
          title: "La beca",
          body: "Cobras un sueldo por cada rato de juego activo. Si estás AFK, no cuenta.",
        },
        {
          title: "Pasar lista",
          body: "Una recompensa cada día. Si vuelves al día siguiente, la racha sube y cobras más.",
          command: "/diari",
        },
        {
          title: "Asignaturas aprobadas",
          body: "Cada logro (advancement) que consigues te da créditos. Los difíciles, muchos más.",
        },
        {
          title: "Caza",
          body: "Matar monstruos da créditos. Los que salen de spawners no cuentan.",
        },
        {
          title: "Vender en la tienda",
          body: "Vende lo que te sobre. Los precios suben y bajan según la oferta y la demanda.",
          command: "/vendre",
        },
        {
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
  recipes: {
    title: "Recetas",
    subtitle: "Los platos y objetos que solo encontrarás en mineuab, y cómo se hacen.",
    listTitle: "Recetas del servidor",
    live: "En directo",
    updated: "actualizado {time}",
    intro:
      "Se hacen como cualquier otra receta del juego: pon los ingredientes en la mesa de trabajo, en el horno o en el soporte para pociones. Cuando el staff añade una nueva, aparece aquí sola.",
    filterLabel: "Filtra por estación",
    filterAll: "Todas",
    stations: {
      crafting: "Mesa de trabajo",
      furnace: "Horno",
      blast_furnace: "Alto horno",
      smoker: "Ahumador",
      campfire: "Fogata",
      brewing: "Soporte para pociones",
      smithing: "Mesa de herrería",
      stonecutting: "Cortapiedras",
      anvil: "Yunque",
    },
    shapeless: "En cualquier orden",
    smelting: "{xp} XP · {seconds} s",
    brewing: "El ingrediente de arriba transforma el de abajo",
    levels: "{levels} niveles",
    madeWith: "Se hace con otra receta: pulsa para ir.",
    hint: "Pasa el ratón por encima de un ítem (o tócalo) para ver su nombre y su descripción. Los ítems con un punto verde salen de otra receta.",
    loading: "Cargando las recetas…",
    unavailable:
      "Ahora mismo las recetas no responden. Quizá el servidor se está reiniciando: vuelve a probar dentro de un rato.",
    empty: "Todavía no hay ninguna receta propia del servidor.",
    ctaTitle: "¿Tienes ideas para recetas nuevas?",
    ctaBody: "Propónlas en Discord: las mejores acaban dentro del juego.",
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
    pact: "Pacto de las estrellas",
    pactStars: "{n} de 5 estrellas",
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
    note: "Las normas pueden cambiar a medida que el servidor crezca. Si cambian, lo avisaremos en Discord. Última actualización: octubre de 2026.",
    sections: [
      {
        title: "Respeto y convivencia",
        rules: [
          "Trata a todo el mundo con respeto, en el juego y en Discord. No hay lugar para insultos, acoso, amenazas ni ningún tipo de discriminación, sea por origen, género, orientación, religión, discapacidad o cualquier otro motivo.",
          "Aquí se habla en catalán, en castellano o en la lengua que haga falta. No menosprecies a nadie por la lengua en la que escribe.",
          "Nada de spam ni flood en el chat, ni mensajes todo en mayúsculas, ni publicidad de otros servidores o enlaces que no vengan a cuento.",
          "Mantén el contenido apropiado: nombres, skins, carteles, libros, nombres de ítems y construcciones sin nada ofensivo, sexual ni violento. El staff te puede pedir que lo cambies o lo puede retirar.",
          "No compartas datos personales de otros jugadores (nombre real, redes, NIU, dirección, fotos…) sin su permiso. Con los tuyos, ten cuidado también.",
          "No te hagas pasar por el staff ni por ningún otro jugador.",
        ],
      },
      {
        title: "Juego limpio",
        rules: [
          "No se permiten hacks ni mods que den ventaja: X-ray, fly, kill aura, auto-clickers, radares de jugadores o de mobs, mapas de cuevas, buscadores de semillas… Sí puedes usar los que solo cambian el aspecto o mejoran el rendimiento, como shaders, paquetes de texturas, Sodium, OptiFine o un minimapa sin cuevas ni entidades. En caso de duda, pregunta antes.",
          "No aproveches errores del juego ni del servidor (duplicar ítems, entrar en zonas protegidas, trucos con la economía…) ni se los expliques a nadie. Si encuentras uno, repórtalo al staff: si no lo has usado, no tendrás ningún problema.",
          "Los créditos se ganan jugando: nada de macros, bots ni trucos para cobrar la beca u otras recompensas mientras estás AFK.",
          "Las granjas automáticas están permitidas mientras no sobrecarguen el servidor. Nada de máquinas para provocar lag; si una granja lo provoca, el staff te puede pedir que la reduzcas o la puede desactivar.",
        ],
      },
      {
        title: "Construcciones y bases",
        rules: [
          "Lo que no es tuyo no se toca: no destruyas, modifiques ni robes construcciones, cofres, granjas, animales ni mascotas de otros jugadores, aunque no estén protegidos. La única excepción es el pacto de las estrellas: dentro de las bases, y solo entre quienes lo han firmado.",
          "Protege tu base con un claim (/tutorial te enseña cómo). El staff no siempre podrá recuperar lo que se pierda en una zona sin proteger.",
          "Deja espacio: no construyas a menos de 30 bloques de la base de otra persona sin su permiso, ni hagas claims para rodearla o cortarle el paso.",
          "El spawn y las construcciones del campus son de todos: no las modifiques ni hagas en ellas bases o granjas.",
          "El mundo de recursos (/recursos) es para minar y explorar. Se vuelve a generar el día 1 de cada mes y no se pueden hacer homes ni claims, así que no dejes nada que quieras conservar.",
          "Si una base lleva más de 3 meses sin que su propietario entre al servidor, el staff la puede limpiar para hacer sitio. Si te vas una temporada, avísanos por Discord.",
        ],
      },
      {
        title: "PvP y el pacto de las estrellas",
        rules: [
          "Luchar, quedarse el botín y atacar bases solo se puede hacer entre jugadores que han firmado el pacto de las estrellas (/estrelles), y solo hasta donde lleguen las estrellas de los dos. Entre quienes lo han firmado, vale; a quien no lo ha firmado, no se le puede hacer nada.",
          "No busques maneras de saltártelo: nada de trampas, lava, mobs ni caídas para matar a alguien que no tiene pacto contigo o hacerle perder sus cosas.",
          "Nada de cuentas secundarias ni de peleas pactadas con amigos para haceros botín de créditos.",
        ],
        link: { label: "Cómo funciona", title: "El pacto de las estrellas", href: "/estrelles" },
      },
      {
        title: "Economía e intercambios",
        rules: [
          "Cumple los tratos. Estafar está prohibido: no entregar lo que has prometido, engañar con el precio o aprovecharte de que alguien no sabe cómo funciona algo. Para ir seguro, usa /intercanvi.",
          "Los créditos, los ítems y las cuentas no se compran ni se venden con dinero real ni a cambio de cosas de otros juegos. Si pasa, se sanciona a las dos partes.",
          "Una cuenta por persona. Nada de usar cuentas secundarias para cobrar más recompensas (la beca, pasar lista, La Grossa…) ni para mover créditos.",
          "No organices apuestas ni sorteos propios con créditos sin el permiso del staff. Para probar suerte, ya está La Grossa.",
        ],
      },
      {
        title: "Tu cuenta",
        rules: [
          "La cuenta es personal: no la compartas ni entres con la de otra persona. Eres responsable de todo lo que se haga desde la tuya.",
          "Usa una contraseña que no utilices en ningún otro sitio y no se la digas a nadie. El staff nunca te la pedirá.",
        ],
      },
      {
        title: "Staff y reportes",
        rules: [
          "Sigue las indicaciones del staff. Si no estás de acuerdo, háblalo con calma por Discord, no en el chat del juego.",
          "Si ves a alguien saltándose las normas, no respondas por tu cuenta: usa /report <jugador> <qué ha pasado> y, si puedes, envía capturas o un vídeo al staff por Discord. Los reportes falsos o de broma también se sancionan.",
          "Estas normas valen en el servidor y en Discord. El staff también puede actuar en situaciones que no aparezcan escritas si perjudican a la comunidad.",
        ],
      },
    ],
    sanctions: "Las sanciones dependen de la gravedad y de si es la primera vez. Normalmente van en este orden:",
    sanctionSteps: [
      "Un aviso.",
      "Un silencio en el chat o una expulsión temporal.",
      "Una expulsión más larga.",
      "La expulsión permanente.",
    ],
    sanctionsSevere:
      "En los casos graves (hacks, duplicar ítems, vender por dinero real, acoso o difundir datos personales) el staff puede pasar directamente a la expulsión. Además, se retira todo lo que se haya conseguido con trampas.",
    appeal:
      "Si crees que una sanción es injusta, escribe al staff por Discord y explícalo con calma. Usar otra cuenta para esquivar una sanción supone la expulsión permanente de ambas.",
    ctaTitle: "¿Tienes dudas o quieres informar de algo?",
    ctaBody: "Habla con el staff en Discord. Te ayudaremos lo antes posible.",
  },
  stars: {
    title: "El pacto de las estrellas",
    subtitle:
      "En mineuab no te pueden atacar, robar ni entrar en tu base si no lo has aceptado antes. Si te va el riesgo, firma el pacto y elige hasta dónde quieres llegar.",
    intro: [
      "Cada jugador tiene de 0 a 5 estrellas. Todo el mundo empieza con 0, y con 0 nadie te puede hacer daño, ni abrir tus cofres, ni tocar tu base.",
      "Cada estrella que firmas te deja hacer algo más (luchar, quedarte el botín, entrar en las bases…), pero también significa que te lo pueden hacer a ti.",
    ],
    commandHint: "Para ver tus estrellas o firmar una:",
    ruleLabel: "La regla",
    rule: "Algo solo se puede hacer si los dos tenéis suficientes estrellas.",
    ruleBody:
      "Tus estrellas son lo máximo que puedes hacer y, a la vez, lo máximo que te pueden hacer. Si puedes robar a los de ★3, los de ★3 también te pueden robar a ti. Cuando atacas una base, la otra persona es el propietario.",
    exampleLabel: "Por ejemplo",
    example:
      "Se encuentran un ★5 y un ★2. Pueden luchar y quedarse el botín, porque el ★2 llega. Pero en la base del ★2 el ★5 no puede entrar: para eso hacen falta ★3 los dos.",
    levelsLabel: "Los niveles",
    levelsTitle: "De Civil a Senyor de la guerra",
    levelsSubtitle:
      "Cada nivel incluye todo lo de los anteriores y añade algo más. Los nombres son los que verás en el juego.",
    level: "Nivel {n}",
    levels: [
      {
        name: "Civil",
        body: "Nadie te puede hacer nada, y tú no puedes hacer nada a nadie. Tus cosas y tu base están siempre protegidas. Es donde empieza todo el mundo.",
      },
      {
        name: "Combatent",
        body: "Puedes luchar con quien tenga ★1 o más, fuera de las bases. Si caes, conservas el inventario: no hay tumba ni botín.",
      },
      {
        name: "Bandoler",
        body: "Empieza el botín. Quien te abate puede abrir tu tumba y quedarse lo que llevabas, y se lleva el 10 % de la cartera (200 créditos como mucho). Lo que tienes en el banco no se toca nunca.",
      },
      {
        name: "Lladre",
        body: "Puedes entrar en las bases de los de ★3 o más: abrir sus cofres y otros contenedores, usar puertas, palancas, marcos y soportes para armadura, y luchar dentro.",
      },
      {
        name: "Saquejador",
        body: "Puedes romper y poner bloques en las bases de los de ★4 o más, y hacer daño a sus animales y vehículos.",
      },
      {
        name: "Senyor de la guerra",
        body: "Guerra abierta: fuego, lava y TNT en las bases de los de ★5 o más.",
      },
    ],
    changeLabel: "Subir y bajar",
    changeTitle: "Cómo se cambia de estrellas",
    climb: {
      label: "Subir",
      title: "Una estrella cada vez",
      body: "Abre el menú con /estrelles o usa /estrelles pujar para ver el pacto de la siguiente estrella. Antes de firmarlo, lo lees y tienes que confirmarlo.",
      facts: [
        "Tienes que haber jugado 5 horas en el servidor.",
        "Entre subida y subida, 24 horas. La primera estrella no espera.",
        "Se sube de una en una: de ★0 a ★5 hay como mínimo cuatro días.",
        "Cuando alguien firma, el servidor lo anuncia a todo el mundo.",
      ],
      code: ["/estrelles", "/estrelles pujar"],
    },
    retreat: {
      label: "Bajar",
      title: "Una retirada de 72 horas",
      body: "Con /estrelles baixar y el número de estrellas que quieres tener, empiezas una retirada. Durante 72 horas sigues con las estrellas de ahora: así nadie puede subir, atacar y desaparecer antes de que le puedan responder.",
      facts: [
        "La puedes anular cuando quieras.",
        "No la puedes empezar en medio de un combate.",
        "Mientras dura, no puedes subir.",
      ],
      code: ["/estrelles baixar <estrellas>", "/estrelles baixar anul·la"],
    },
    combatLabel: "El combate",
    combatTitle: "Cómo se lucha",
    combatSubtitle:
      "Solo hay PvP entre jugadores que tienen ★1 o más los dos: golpes, flechas, pociones, lobos, TNT… Si uno de los dos no tiene el pacto, los golpes no hacen daño y la barra de acción explica por qué.",
    combat: [
      {
        title: "Marca de combate",
        body: "Después de cada golpe te quedas 20 segundos en combate (30 si has atacado una base). Mientras tanto no te puedes teletransportar (/home, /spawn, /tpa, /recursos…) ni huir por un portal. La cuenta atrás sale en la barra de acción.",
      },
      {
        title: "Desconectarse no salva",
        body: "Si sales del servidor con la marca de combate, caes ahí mismo, y cuenta como si te hubiera abatido tu último rival, botín incluido.",
      },
      {
        title: "Al reaparecer",
        body: "Tienes 10 segundos en los que nadie te puede hacer daño. Si atacas antes, los pierdes.",
      },
      {
        title: "Muertes de rebote",
        body: "Si mueres por una caída, por la lava o por lo que sea hasta 10 segundos después de un golpe, te ha abatido quien te golpeó.",
      },
      {
        title: "Lava y fuego",
        body: "No puedes vaciar lava ni encender fuego a menos de 4 bloques de alguien que no tenga pacto contigo.",
      },
      {
        title: "Botín de créditos",
        body: "La misma pareja solo da botín una vez por hora, y si los dos jugáis desde la misma red (la misma IP), no hay. En la resi os podéis pelear igual, pero sin botín de créditos.",
      },
    ],
    combatNote:
      "En los minijuegos, como el Bingo, el pacto no cuenta: cada juego tiene sus reglas. Y donde el servidor no deja luchar, el pacto tampoco cambia nada.",
    basesLabel: "Las bases",
    basesTitle: "Atacar una base",
    basesSubtitle:
      "Las bases son los claims de siempre, y lo que se puede hacer dentro depende de las estrellas del propietario. Los miembros de una base pueden hacer de todo, como hasta ahora.",
    bases: [
      "Una base solo se puede atacar si el propietario está conectado o si hace menos de 15 minutos que ha salido. Nadie pierde su base mientras duerme, y nadie se salva de un ataque desconectándose.",
      "Cuando alguien ataca tu base, recibes un aviso con quién es, cuántas estrellas tiene y dónde está. Quien ataca queda marcado 30 segundos.",
      "Las zonas del staff no se pueden atacar nunca, tengas las estrellas que tengas.",
      "Fuera de las bases, el pacto no da permiso para tocar nada: una construcción sin claim sigue siendo de su propietario.",
    ],
    commandsLabel: "Comandos",
    commandsTitle: "Todos los comandos",
    commands: [
      { cmd: "/estrelles", what: "El menú: tus estrellas, los seis niveles y la retirada." },
      { cmd: "/estrelles pujar", what: "Te enseña el pacto de la siguiente estrella para firmarlo." },
      {
        cmd: "/estrelles baixar <estrellas>",
        what: "Empieza la retirada. Con anul·la en lugar del número, la detiene.",
      },
      {
        cmd: "/estrelles info [jugador]",
        what: "Cuántas estrellas tiene alguien (o tú, si no pones ningún nombre) y si está en retirada o en combate.",
      },
      { cmd: "/estrelles llista", what: "Quién tiene el pacto ahora mismo." },
    ],
    commandsNote: "También puedes escribir /estrellas o /pacte en lugar de /estrelles.",
    rulesTitle: "Las normas siguen valiendo",
    rulesBody:
      "Dentro del pacto, lo que el juego te deja hacer vale. Lo que no vale es saltárselo: cuentas secundarias para hacerse botín, trampas para matar a quien no tiene pacto contigo o errores del juego para entrar donde no puedes.",
    rulesLink: "Leer las normas",
    ctaTitle: "¿Tienes dudas sobre el pacto?",
    ctaBody:
      "Pregúntalo en Discord. Y si ves que algo no funciona como explica esta página, avisa al staff.",
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
        q: "¿Cómo vinculo mi cuenta de Discord?",
        a: "Escribe este comando en el juego: te dará un código de 4 cifras. Envíalo por mensaje privado al bot de MineUAB en Discord y listo. A partir de ahí, la carrera va a la par entre el juego y Discord, y si en Discord tienes el rol de la UAB sales como UAB (o con la etiqueta «Convidat», invitado, si eres de otra universidad). La primera vez te regalamos 50 créditos.",
        code: ["/discord link"],
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
        q: "¿Me pueden matar o robar?",
        a: "Solo si tú quieres. Luchar, quedarse el botín y atacar bases solo se puede hacer entre jugadores que han firmado el pacto de las estrellas, y nunca más allá de lo que permiten las estrellas de los dos. Si no lo firmas, nadie te puede hacer nada.",
        code: ["/estrelles"],
        link: { href: "/estrelles", label: "Cómo funciona el pacto" },
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
    youtube: "Vídeos del servidor: construcciones, eventos y tutoriales.",
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
    madeWith: "Hecho por la comunidad mineuab.",
  },
  common: {
    backHome: "Volver al inicio",
    notFound: "Página no encontrada",
    notFoundBody:
      "Parece que este bloque no existe… o quizá lo ha hecho explotar un creeper.",
  },
};

export const translations: Record<Locale, Translations> = { ca, es };
