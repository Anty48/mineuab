export type Locale = "ca" | "es";

export const LOCALES: Locale[] = ["ca", "es"];
export const DEFAULT_LOCALE: Locale = "ca";

// Deeply-nested dictionary. Access with the `t()` helper from useLanguage().
export const translations = {
  ca: {
    nav: {
      about: "Sobre nosaltres",
      history: "La nostra història",
      recipes: "Receptes Custom",
      events: "Esdeveniments",
      socials: "Xarxes",
      join: "Uneix-te",
      langLabel: "Idioma",
    },
    hero: {
      badge: "Servidor de Minecraft de la comunitat UAB",
      title: "mineuab",
      subtitle:
        "La comunitat de Minecraft feta per i per a estudiants de la UAB. Construeix, explora i fes comunitat amb nosaltres.",
      cta: "Uneix-te al servidor",
      ctaSecondary: "Descobreix les receptes",
    },
    about: {
      title: "Sobre nosaltres",
      subtitle: "Qui som i què ens mou.",
      what: {
        title: "Què fem",
        body: "Gestionem un servidor de Minecraft pensat per a la comunitat universitària: món survival, projectes col·laboratius, minijocs i esdeveniments periòdics. Un espai per jugar, crear i desconnectar entre classe i classe.",
      },
      why: {
        title: "Per què ho fem",
        body: "Perquè creiem que els videojocs són una eina brutal per crear comunitat. Volem que qualsevol estudiant de la UAB trobi un lloc on fer amics, col·laborar i sentir-se part d'alguna cosa més gran.",
      },
      how: {
        title: "Com ho fem",
        body: "Amb un servidor estable, moderació activa i respectuosa, contingut personalitzat (com les nostres receptes custom!) i escoltant sempre la comunitat per decidir cap on anem.",
      },
    },
    history: {
      title: "La nostra història",
      subtitle: "D'una idea entre amics a una comunitat en creixement.",
      milestones: [
        {
          date: "Els inicis",
          title: "Una idea a la cafeteria",
          body: "Un grup d'estudiants de la UAB fans de Minecraft es pregunta: i si muntéssim un servidor per a tota la universitat?",
        },
        {
          date: "Primer món",
          title: "S'obre el servidor",
          body: "Neix el primer món survival de mineuab. Les primeres construccions i els primers membres comencen a donar-li vida.",
        },
        {
          date: "Creixement",
          title: "Contingut custom i esdeveniments",
          body: "Afegim receptes personalitzades, minijocs i comencem a organitzar esdeveniments regulars per a la comunitat.",
        },
        {
          date: "Avui",
          title: "Cap a l'oficialitat",
          body: "Treballem per convertir mineuab en un projecte reconegut dins la UAB, amb més membres, més contingut i molts plans de futur.",
        },
      ],
    },
    disclaimer: {
      tag: "Avís important",
      title: "Estat oficial",
      body: "Actualment mineuab encara no és un projecte oficial de la UAB (Universitat Autònoma de Barcelona), però tenim tota la intenció i estem treballant per fer-ho oficial en el futur.",
    },
    events: {
      title: "Esdeveniments",
      subtitle: "El que hem fet i el que està per venir.",
      upcoming: "Propers",
      past: "Passats",
      statusUpcoming: "Proper",
      statusPast: "Finalitzat",
      items: [
        {
          status: "upcoming",
          date: "Pròximament",
          title: "Gran obertura de temporada",
          body: "Estrenem món nou amb reptes de construcció i premis per als participants.",
        },
        {
          status: "upcoming",
          date: "Pròximament",
          title: "Nit de minijocs",
          body: "Una vetllada de spleef, parkour i build battles per a tota la comunitat.",
        },
        {
          status: "past",
          date: "Temporada anterior",
          title: "Concurs de construcció UAB",
          body: "Els membres van recrear edificis emblemàtics del campus de la UAB dins del joc.",
        },
      ],
    },
    socials: {
      title: "Segueix-nos",
      subtitle: "Uneix-te a la conversa i no et perdis res.",
      instagram: "Segueix el nostre dia a dia",
      discord: "El cor de la comunitat",
      twitch: "Directes i esdeveniments",
      cta: "Obrir",
    },
    recipes: {
      title: "Receptes Custom",
      subtitle:
        "Els objectes exclusius del servidor mineuab. Fes clic en qualsevol per veure com es crafteja.",
      clickHint: "Fes clic per veure la recepta",
      modal: {
        recipeTitle: "Recepta de crafting",
        description: "Descripció",
        howToObtain: "Com aconseguir els ingredients",
        ingredients: "Ingredients",
        close: "Tancar",
        emptyHint: "Les caselles buides han d'estar buides al crafting.",
      },
      empty: "Encara no hi ha receptes. Torna aviat!",
    },
    admin: {
      title: "Constructor de receptes",
      subtitle:
        "Crea receptes custom sense tocar el codi. Omple el formulari i genera el JSON.",
      grid: "Graella de crafting 3x3",
      gridHint:
        "Escriu el nom o l'ID de cada ingredient. Deixa buides les caselles que no s'utilitzen.",
      resultLabel: "Objecte resultant",
      fields: {
        id: "ID de l'objecte (sense espais, ex: espasa_uab)",
        icon: "Emoji o icona (ex: ⚔️)",
        nameCa: "Nom (Català)",
        nameEs: "Nom (Espanyol)",
        descCa: "Descripció (Català)",
        descEs: "Descripció (Espanyol)",
        obtainCa: "Com aconseguir (Català)",
        obtainEs: "Com aconseguir (Espanyol)",
      },
      save: "Desar i generar",
      saved: "Recepta desada correctament al fitxer de dades!",
      saveError:
        "No s'ha pogut escriure al fitxer (segurament estàs en producció). Copia el JSON manualment.",
      copy: "Copiar JSON",
      copied: "Copiat!",
      jsonTitle: "JSON generat",
      instructionsTitle: "Instruccions manuals",
      instructions:
        "Si el desat automàtic no funciona (per exemple en producció), copia el JSON de dalt i afegeix-lo dins de l'array del fitxer:",
      previewTitle: "Vista prèvia",
      reset: "Netejar formulari",
      requiredError: "Cal com a mínim un ID i el nom en tots dos idiomes.",
    },
    footer: {
      tagline: "La comunitat de Minecraft de la UAB.",
      madeWith: "Fet amb ☕ per la comunitat mineuab.",
      disclaimerShort:
        "Projecte no oficial de la UAB (de moment!).",
      sections: "Seccions",
      social: "Xarxes",
    },
    common: {
      backHome: "Tornar a l'inici",
      notFound: "Pàgina no trobada",
    },
  },

  es: {
    nav: {
      about: "Sobre nosotros",
      history: "Nuestra historia",
      recipes: "Recetas Custom",
      events: "Eventos",
      socials: "Redes",
      join: "Únete",
      langLabel: "Idioma",
    },
    hero: {
      badge: "Servidor de Minecraft de la comunidad UAB",
      title: "mineuab",
      subtitle:
        "La comunidad de Minecraft hecha por y para estudiantes de la UAB. Construye, explora y crea comunidad con nosotros.",
      cta: "Únete al servidor",
      ctaSecondary: "Descubre las recetas",
    },
    about: {
      title: "Sobre nosotros",
      subtitle: "Quiénes somos y qué nos mueve.",
      what: {
        title: "Qué hacemos",
        body: "Gestionamos un servidor de Minecraft pensado para la comunidad universitaria: mundo survival, proyectos colaborativos, minijuegos y eventos periódicos. Un espacio para jugar, crear y desconectar entre clase y clase.",
      },
      why: {
        title: "Por qué lo hacemos",
        body: "Porque creemos que los videojuegos son una herramienta brutal para crear comunidad. Queremos que cualquier estudiante de la UAB encuentre un lugar donde hacer amigos, colaborar y sentirse parte de algo más grande.",
      },
      how: {
        title: "Cómo lo hacemos",
        body: "Con un servidor estable, moderación activa y respetuosa, contenido personalizado (¡como nuestras recetas custom!) y escuchando siempre a la comunidad para decidir hacia dónde vamos.",
      },
    },
    history: {
      title: "Nuestra historia",
      subtitle: "De una idea entre amigos a una comunidad en crecimiento.",
      milestones: [
        {
          date: "Los inicios",
          title: "Una idea en la cafetería",
          body: "Un grupo de estudiantes de la UAB fans de Minecraft se pregunta: ¿y si montáramos un servidor para toda la universidad?",
        },
        {
          date: "Primer mundo",
          title: "Se abre el servidor",
          body: "Nace el primer mundo survival de mineuab. Las primeras construcciones y los primeros miembros empiezan a darle vida.",
        },
        {
          date: "Crecimiento",
          title: "Contenido custom y eventos",
          body: "Añadimos recetas personalizadas, minijuegos y empezamos a organizar eventos regulares para la comunidad.",
        },
        {
          date: "Hoy",
          title: "Hacia la oficialidad",
          body: "Trabajamos para convertir mineuab en un proyecto reconocido dentro de la UAB, con más miembros, más contenido y muchos planes de futuro.",
        },
      ],
    },
    disclaimer: {
      tag: "Aviso importante",
      title: "Estado oficial",
      body: "Actualmente mineuab todavía no es un proyecto oficial de la UAB (Universitat Autònoma de Barcelona), pero tenemos toda la intención y estamos trabajando para hacerlo oficial en el futuro.",
    },
    events: {
      title: "Eventos",
      subtitle: "Lo que hemos hecho y lo que está por venir.",
      upcoming: "Próximos",
      past: "Pasados",
      statusUpcoming: "Próximo",
      statusPast: "Finalizado",
      items: [
        {
          status: "upcoming",
          date: "Próximamente",
          title: "Gran apertura de temporada",
          body: "Estrenamos mundo nuevo con retos de construcción y premios para los participantes.",
        },
        {
          status: "upcoming",
          date: "Próximamente",
          title: "Noche de minijuegos",
          body: "Una velada de spleef, parkour y build battles para toda la comunidad.",
        },
        {
          status: "past",
          date: "Temporada anterior",
          title: "Concurso de construcción UAB",
          body: "Los miembros recrearon edificios emblemáticos del campus de la UAB dentro del juego.",
        },
      ],
    },
    socials: {
      title: "Síguenos",
      subtitle: "Únete a la conversación y no te pierdas nada.",
      instagram: "Sigue nuestro día a día",
      discord: "El corazón de la comunidad",
      twitch: "Directos y eventos",
      cta: "Abrir",
    },
    recipes: {
      title: "Recetas Custom",
      subtitle:
        "Los objetos exclusivos del servidor mineuab. Haz clic en cualquiera para ver cómo se craftea.",
      clickHint: "Haz clic para ver la receta",
      modal: {
        recipeTitle: "Receta de crafteo",
        description: "Descripción",
        howToObtain: "Cómo conseguir los ingredientes",
        ingredients: "Ingredientes",
        close: "Cerrar",
        emptyHint: "Las casillas vacías deben estar vacías en el crafteo.",
      },
      empty: "Todavía no hay recetas. ¡Vuelve pronto!",
    },
    admin: {
      title: "Constructor de recetas",
      subtitle:
        "Crea recetas custom sin tocar el código. Rellena el formulario y genera el JSON.",
      grid: "Rejilla de crafteo 3x3",
      gridHint:
        "Escribe el nombre o el ID de cada ingrediente. Deja vacías las casillas que no se usan.",
      resultLabel: "Objeto resultante",
      fields: {
        id: "ID del objeto (sin espacios, ej: espada_uab)",
        icon: "Emoji o icono (ej: ⚔️)",
        nameCa: "Nombre (Catalán)",
        nameEs: "Nombre (Español)",
        descCa: "Descripción (Catalán)",
        descEs: "Descripción (Español)",
        obtainCa: "Cómo conseguir (Catalán)",
        obtainEs: "Cómo conseguir (Español)",
      },
      save: "Guardar y generar",
      saved: "¡Receta guardada correctamente en el archivo de datos!",
      saveError:
        "No se ha podido escribir en el archivo (seguramente estás en producción). Copia el JSON manualmente.",
      copy: "Copiar JSON",
      copied: "¡Copiado!",
      jsonTitle: "JSON generado",
      instructionsTitle: "Instrucciones manuales",
      instructions:
        "Si el guardado automático no funciona (por ejemplo en producción), copia el JSON de arriba y añádelo dentro del array del archivo:",
      previewTitle: "Vista previa",
      reset: "Limpiar formulario",
      requiredError: "Se necesita como mínimo un ID y el nombre en ambos idiomas.",
    },
    footer: {
      tagline: "La comunidad de Minecraft de la UAB.",
      madeWith: "Hecho con ☕ por la comunidad mineuab.",
      disclaimerShort: "Proyecto no oficial de la UAB (¡de momento!).",
      sections: "Secciones",
      social: "Redes",
    },
    common: {
      backHome: "Volver al inicio",
      notFound: "Página no encontrada",
    },
  },
} as const;

export type Translations = (typeof translations)["ca"];
