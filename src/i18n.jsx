// i18n system with FR + EN content for the entire site.
// Usage: const { t, lang, setLang } = useI18n();  t('home.hero.title')

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

// Professional periods used to compute dynamic experience.
// Convention: endExclusive is the first day NOT included.
// Update when a new contract/period starts.
export const EXPERIENCE_PERIODS = [
  { start: "2023-05-01", endExclusive: "2023-08-01" }, // Stage La Poste (Mai–Juil 2023)
  { start: "2025-04-01", endExclusive: null },          // Silamir (stage puis CDI), continu
];

export function computeExperienceMonths(periods = EXPERIENCE_PERIODS, now = new Date()) {
  let total = 0;
  for (const p of periods) {
    const start = new Date(p.start);
    const end = p.endExclusive ? new Date(p.endExclusive) : now;
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const dayBonus = end.getDate() >= start.getDate() ? 0 : -1; // partial-month adjustment
    total += Math.max(0, months + dayBonus);
  }
  return total;
}

export const I18N = {
  fr: {
    nav: { home:"Accueil", skills:"Compétences", exp:"Expérience", case:"Études de cas", contact:"Contact" },
    common: {
      available:"Consultant Data Engineer · Paris",
      readCase:"Lire l'étude →",
      viewCase:"Voir l'étude de cas →",
      read:"Lire →",
      visit:"Visiter →",
      downloadCV:"Télécharger CV (PDF)",
      themeLight:"Mode clair",
      themeDark:"Mode sombre",
      tagline:"Data Engineer · Paris",
      featured:"À la une",
      currentEdition:"I · ÉDITION COURANTE",
      otherWork:"II · AUTRES TRAVAUX",
    },
    home: {
      heroL1a:"Données ", heroAccent:"fiables", heroL1b:",",
      heroL2a:"ingénierie ", heroEm:"discrète.",
      lead:"Data engineer chez Silamir Group, en mission longue chez Olaqin (santé). Microsoft Fabric, PySpark, T-SQL - outils du quotidien sur une plateforme data en production. Conviction\u00a0: la donnée bien servie commence par une infrastructure que l'équipe comprend vraiment.",
      stats:[
        { numeric:0,  suffix:" mois", label:"Mois sur le terrain" },
        { numeric:5,  suffix:"",      label:"Projets livrés" },
        { numeric:10, suffix:"",      label:"Technologies en production" },
        { numeric:6,  suffix:" ans",  label:"Formation tech + DP-900" },
      ],
      featuredEyebrow:"À la une",
      featuredTitleA:"Plateforme Microsoft Fabric chez Olaqin\u00a0:",
      featuredTitleEm:"dix SI réconciliés,",
      featuredTitleB:" un référentiel unique.",
      featuredLead:"Vingt mois pour bâtir la première plateforme data d'un acteur français de la santé. Greenfield sur Microsoft Fabric, architecture médaillon en trois lakehouses, conformité HDS / RGPD. Dix SI Olaqin connectés, plus les référentiels publics de santé - sans interrompre les téléservices, sans imposer un changement d'outils côté métier.",
      featuredMeta:["Olaqin · Santé","2025-2026","20 mois"],
      featuredP1Drop:"L",
      featuredP1:"'enjeu n'était pas technique mais relationnel. Une dizaine de systèmes cloisonnés - ERP, CRM, marketing et ventes, téléservices, e-commerce, facturation, télémétrie des terminaux, référentiels bureautiques. La donnée existait, mais aucune lecture transverse n'était possible sans extractions manuelles, longues et fragiles. Le projet y a branché les référentiels publics de santé pour réconcilier les professionnels de santé.",
      featuredP2:"Nous avons posé l'architecture en médaillon sur trois lakehouses Fabric\u00a0: Bronze pour l'ingestion brute (jour par jour, traçable), Silver pour la donnée réconciliée et historisée en CDC Type 2 piloté par métadonnées, Gold pour les usages métier exposés en Power BI et en GraphQL. PySpark partout pour les transformations, déploiement Fabric natif (intégration Git, Deployment Pipelines Dev / UAT / Prod), Azure Key Vault pour les secrets.",
      featuredP3:"Au dernier comptage\u00a0: 795 tables en production (422 Bronze, 288 Silver, 85 Gold), plus de 140 millions de lignes historisées, 97 notebooks et 56 pipelines orchestrés, cinq référentiels MDM en production (entités, contacts, offres, souscriptions, devices) et une synchronisation bidirectionnelle vers Sage, Dynamics, HubSpot et Stellair. La dette d'extractions manuelles a fondu en silence.",
      projects:[
        { tag:"Data analytics", year:"2023", title:"Prédiction des délais d'incidents techniques",
          desc:"Stage à La Poste\u00a0: analyse des historiques d'incidents IT, modèle prédictif sur les délais de résolution, interface web pour les équipes support. Méthode Lean management." },
        { tag:"NLP", year:"2024", title:"Modération automatique de live YouTube",
          desc:"Système de modération en temps réel sur les chats YouTube Live. NLP pour la détection de toxicité, analyse en flux. Projet personnel.",
          href:"https://github.com/Myst4ke/youtube-live-automod" },
        { tag:"Pédagogie", year:"2025", title:"Data Engineering Academy",
          desc:"Site d'apprentissage de la data engineering pour les novices. Cours structurés et parcours progressif, construit en parallèle des missions client.",
          href:"https://myst4ke.github.io/data-engineering-academy/" },
        { tag:"Dev tooling", year:"2026", title:"Plugin Claude Code pour la data",
          desc:"Plugin Claude Code développé chez Silamir. Outils data engineering accessibles depuis l'IDE - agents, génération de code, automatisation de tâches répétitives. Utilisé en production par un agent TMA qui analyse les tickets Freshdesk et aide à leur résolution.",
          href:"https://github.com/Myst4ke/fabric-claude-plugin" },
      ],
      testimonialsEyebrow:"III · TÉMOIGNAGES",
      testimonialsTitle:"Ce qu'en disent les équipes.",
      testimonialsLead:"Trois extraits à venir, issus de lettres de recommandation et de retours d'encadrants.",
      testimonials:[
        { quote:"Témoignage en attente - sera ajouté à la prochaine mise à jour du site.", name:"TODO 1", role:"Manager / Lead - Silamir Group" },
        { quote:"Témoignage en attente - sera ajouté à la prochaine mise à jour du site.", name:"TODO 2", role:"Référent client - Olaqin" },
        { quote:"Témoignage en attente - sera ajouté à la prochaine mise à jour du site.", name:"TODO 3", role:"Encadrement académique" },
      ],
    },
    skills: {
      section:"Section II",
      title:"Compétences.",
      kicker:"Outils choisis avec soin et utilisés en production. Pas de barres de progression flatteuses - juste ce que je manipule au quotidien.",
      formationEyebrow:"III · FORMATION",
      formationTitle:"Formation",
      timeAllocEyebrow:"IV · RÉPARTITION DU TEMPS",
      timeAllocTitle1:"Où passe une ", timeAllocTitleEm:"semaine type", timeAllocTitle2:".",
      timeAllocLead:"Mesuré sur les six derniers mois en mission, agrégé par grande catégorie d'activité. Les chiffres se complètent au scroll.",
      capabilitiesEyebrow:"V · CAPACITÉS",
      methodEyebrow:"En filigrane",
      methodTitle:"Outils du jour, méthode du soir.",
      methodBody:"J'apprends les outils volontiers ; je tiens à la méthode. Tester avant de construire, documenter avant de livrer, instrumenter avant d'optimiser. Le reste - Fabric, PySpark, ce qui viendra après - n'est qu'une couche d'exécution.",
      cats:[
        { num:"01", name:"Data engineering", chips:["PySpark","T-SQL","Pandas","Delta Lake","CDC Type 2","MDM","Intégration API"] },
        { num:"02", name:"Plateforme",       chips:["Microsoft Fabric","Azure","Lakehouse","Power BI","Terraform","Azure Key Vault","Azure DevOps","Logic Apps"] },
        { num:"03", name:"IA & ML",          chips:["Scikit-Learn","PyTorch","NLP","Sentiment analysis","Agents Claude Code","Amazon Bedrock"] },
        { num:"04", name:"Soft skills",      chips:["Gestion de projet","Travail d'équipe","Pensée critique","Prise d'initiative","Mentorat (recrutement)","Lean management","HDS / RGPD"] },
      ],
      formation:[
        { period:"2023 - 2025", school:"Université Paris Cité", degree:"Master 2 - Intelligence Artificielle" },
        { period:"2019 - 2023", school:"Université Paris 8",    degree:"Licence - Informatique" },
        { period:"2025",        school:"Microsoft",             degree:"Certification Azure DP-900" },
      ],
      donut:[
        { value:65, label:"Code & implémentation" },
        { value:20, label:"Tests & qualité" },
        { value:10, label:"Veille & formation" },
        { value:5,  label:"Conception & MDM" },
      ],
      capabilities:[
        ["Plateforme Microsoft Fabric","Pipelines PySpark","Architecture médaillon (CDC Type 2)","Conception MDM bidirectionnelle"],
        ["Intégration API multi-SI (mTLS, OAuth2)","NLP & analyse de sentiments","Plugin Claude Code","Mentorat / recrutement"],
      ],
    },
    exp: {
      section:"Section III",
      title:"Expérience.",
      kicker:"Deux maisons, quatre missions, un seul fil rouge\u00a0: la donnée bien servie - qu'on parle d'incidents IT, d'une plateforme greenfield, d'un référentiel maître ou d'un calcul d'indemnisation.",
      offstageEyebrow:"Code public",
      offstageTitle:"Projets & repos publics",
      items:[
        { num:"01", period:"Août 2026 - Présent", city:"Nantes / Paris", company:"Silamir Group", client:"Kereis", role:"Consultant - Architecture & build",
          summary:"Mission chez Kereis (courtage en assurance) : conception et build de deux modules Java sur la gestion des sinistres - l'un juge la recevabilité des pièces d'un dossier, l'autre les interprète. Un LLM en production, sous contrainte : le modèle décompose, le code exécute.",
          bullets:[
            "Module de recevabilité : accepte ou rejette une pièce selon le contexte du dossier, avec un code motif normé.",
            "Module d'interprétation : consolidation du lot complet, chaque champ rattaché à sa pièce source.",
            "Architecture hexagonale Java 25 / Spring Boot, frontière vérifiée au build par ArchUnit.",
            "Amazon Bedrock en production, sortie validée en deux temps ; 316 tests au vert, sans réseau."
          ] },
        { num:"02", period:"Oct. 2025 - Oct. 2026", city:"Paris", company:"Silamir Group", client:"Olaqin", role:"Consultant Data Engineer",
          summary:"Mission longue chez Olaqin (santé)\u00a0: industrialisation et extension de la plateforme data Microsoft Fabric. Conception MDM pour unifier les référentiels métier, intégration API vers les SI cibles.",
          bullets:[
            "Intégration de flux de données vers les SI cibles via des connexions API.",
            "Conception d'un MDM (Master Data Management) pour unifier et standardiser les données métier.",
            "Évaluateur des tests techniques pour le recrutement des stagiaires Silamir.",
            "Responsable de la TMA (Freshdesk) : développement d'un plugin Claude Code pour l'équipe data, et d'un agent qui lit les tickets et s'appuie sur ce plugin pour les analyser et aider à leur résolution."
          ] },
        { num:"03", period:"Avr. 2025 - Oct. 2025", city:"Paris", company:"Silamir Group", client:"Olaqin", role:"Stage - Data Engineer",
          summary:"Mise en place, amélioration et livraison d'une data plateforme complète sur Microsoft Fabric, connectée aux SI sources. Première brique de la plateforme actuelle d'Olaqin.",
          bullets:[
            "Construction de bout en bout d'une data plateforme Microsoft Fabric.",
            "Développement de pipelines d'ingestion en PySpark et T-SQL.",
            "Obtention de la certification Microsoft Azure DP-900."
          ] },
        { num:"04", period:"Mai 2023 - Juil. 2023", city:"Issy-les-Moulineaux", company:"La Poste Groupe", role:"Stage - Data Engineer",
          summary:"Traitement et analyse des données d'incidents techniques en vue de prédire les délais de résolution. Construction d'une interface web de visualisation. Pratiques Lean management.",
          bullets:[
            "Modèle prédictif sur les délais de résolution d'incidents IT.",
            "Interface web de visualisation des résultats d'analyse.",
            "Support aux équipes via des pratiques de Lean management."
          ] },
      ],
      talks:[
        { y:"2025", t:"data-engineering-academy - cours en ligne pour novices", v:"myst4ke.github.io/data-engineering-academy ↗", href:"https://myst4ke.github.io/data-engineering-academy/" },
        { y:"2024", t:"Modération NLP temps réel pour YouTube Live", v:"youtube-live-automod ↗", href:"https://github.com/Myst4ke/youtube-live-automod" },
        { y:"2026", t:"Plugin Claude Code data engineering (en production)", v:"fabric-claude-plugin ↗", href:"https://github.com/Myst4ke/fabric-claude-plugin" },
      ],
    },
    cases: {
      olaqin: {
        tab:{ client:"Olaqin", topic:"Plateforme Microsoft Fabric" },
        eyebrow:"Étude de cas · 2025 - 2026",
        titleA:"Plateforme ", titleAccent:"Microsoft Fabric", titleColon:"\u00a0:",
        titleB:"de dix SI silotés",
        titleC:"à un ", titleEm:"référentiel", titleD:" unique.",
        lead:"Vingt mois pour bâtir la première plateforme data d'Olaqin (santé). Greenfield sur Microsoft Fabric, architecture médaillon en trois lakehouses, conformité HDS / RGPD. Douze sources branchées ; cinq référentiels MDM en production ; synchronisation bidirectionnelle vers les SI métier et APIs temps réel.",
        meta:[ {l:"Client",v:"Olaqin · Santé (HDS / RGPD)"},{l:"Année",v:"2025 - 2026"},{l:"Durée",v:"20 mois"},{l:"Équipe",v:"≈ 6 ingénieurs"} ],
        role:{l:"Rôle",v:"Consultant Data Engineer"},

        ctxEyebrow:"I · CONTEXTE",
        ctxTitleA:"Dix SI ", ctxTitleEm:"silotés", ctxTitleB:", plus les référentiels publics.",
        ctxDrop:"O",
        ctxP1:"laqin opérait depuis des années avec une architecture historique : un ERP pour la comptabilité et le commercial, un CRM pour les organisations clientes et le suivi des lecteurs Carte Vitale, une plateforme marketing et ventes, les téléservices, l'e-commerce, la facturation, la télémétrie des terminaux et quelques référentiels bureautiques. Une dizaine de systèmes, chacun dans son coin, sur des technologies hétérogènes. À cet ensemble, le projet a branché les référentiels publics de santé pour réconcilier les professionnels de santé : ils n'étaient pas connectés avant la plateforme.",
        ctxP2:"Avant la plateforme\u00a0: exports manuels, formats hétérogènes, contrats d'API parfois capricieux. Chaque demande métier exigeait un croisement à la main, sans garantie de cohérence d'une fois à l'autre. Et le moindre changement de schéma source cassait silencieusement les chaînes en aval.",
        ctxP3:"Le pari\u00a0: bâtir une plateforme data unique sur Microsoft Fabric, conforme HDS et RGPD, traçable au quotidien, branchée bidirectionnellement aux SI métier - sans interrompre les téléservices Carte Vitale ni imposer un changement d'outils aux utilisateurs finaux.",

        archEyebrow:"I·b · ARCHITECTURE",
        archTitle:"Avant / après.",
        archLead:"Cliquez sur les blocs pour révéler les responsabilités.",
        archBefore:"10 SI + référentiels",
        archAfter:"Lakehouse Fabric",

        timelineEyebrow:"I·c · CHRONOLOGIE",
        timelineTitle:"Vingt mois, jalon par jalon.",

        apprEyebrow:"II · APPROCHE",
        apprTitleA:"Quatre mouvements,", apprTitleB:"un seul tempo.",
        apprLead:"Pas de bascule d'un coup. Chaque source a été intégrée progressivement, validée par les métiers avant d'être branchée aux usages aval. Douze sources connectées, du SQL Server au MongoDB Atlas en passant par les dépôts SFTP.",
        steps:[
          { n:"01", t:"Bootstrap & médaillon",            d:"Inventaire des SI sources et choix de Microsoft Fabric. Olaqin disposait déjà de quelques services Azure, mais toute la stack data (Fabric, Power BI, Azure Key Vault, Logic Apps) a été déployée pour ce projet. Trois lakehouses (Bronze / Silver / Gold), CDC Type 2 générique piloté par métadonnées sur Silver dès le mois deux." },
          { n:"02", t:"Connexion progressive des sources",  d:"Premiers SI branchés en février-mars 2025 (PFD, CRM Dynamics, Sage), puis HubSpot, Saleor, RPPS, TMAJ, FINESS, Stellair et SharePoint. Connecteurs selon la source : SQL Server, MongoDB Atlas, API REST via APIM, dépôts SFTP, GraphQL ; authentification mTLS ou OAuth2, secrets centralisés en Azure Key Vault." },
          { n:"03", t:"Industrialisation",                d:"Workspaces Fabric isolés Dev / UAT / Prod, déploiement Fabric natif (intégration Git + Deployment Pipelines), autoscaling de capacité F16 ⇄ F32 piloté par pipeline. Orchestration globale par un launcher générique piloté par configuration - 9 pipelines, 34 notebooks, audit temps réel, mode replay. Gold ouvert en septembre 2025 avec les premiers BI Exploitation et Marketing." },
          { n:"04", t:"MDM bidirectionnel",               d:"Cinq référentiels maîtres en production\u00a0: entités, contacts, offres, souscriptions et devices. Push-back vers Sage, Dynamics, HubSpot et Stellair ; exposition GraphQL vers l'e-commerce et API partenaire derrière APIM. Dédoublonnage fuzzy (rapidfuzz + connected components), génération d'IDs Olaqin unifiés." },
        ],

        lineageEyebrow:"II·b · LINEAGE",
        lineageTitle:"Un domaine type, vu d'en haut.",
        lineageLead:"Survolez les nœuds pour voir leur rôle dans la chaîne.",

        resultsEyebrow:"III · RÉSULTATS",
        resultsTitleA:"Mesurés, pas ", resultsTitleEm:"annoncés", resultsTitleB:".",
        resultsLead:"Les chiffres ci-dessous sont l'état de la plateforme au dernier comptage en production - pas des projections.",
        results:[
          { num:12,  suffix:"+",   l:"Sources connectées (10 SI + référentiels publics)" },
          { num:795, suffix:"",    l:"Tables en production (422 Bronze · 288 Silver · 85 Gold)" },
          { num:140, suffix:" M+", l:"Lignes historisées en Silver (CDC Type 2)" },
          { num:97,  suffix:"",    l:"Notebooks en production, 56 pipelines orchestrés" },
        ],
        costsTitle:"795 tables, trois lakehouses",
        costs:[
          { value:53, label:"Bronze - ingestion brute (422 tables)" },
          { value:36, label:"Silver - CDC Type 2 + MDM (288 tables)" },
          { value:11, label:"Gold - BI & APIs (85 tables)" },
        ],
        latencyTitle:"Activité du repo (commits par trimestre)",
        latency:[
          { value:476, label:"Q1 25" },
          { value:125, label:"Q2 25" },
          { value:216, label:"Q3 25" },
          { value:152, label:"Q4 25" },
          { value:222, label:"Q1 26" },
          { value:660, label:"Q2 26" },
          { value:679, label:"Q3 26" },
        ],
        capacities:[
          { v:100, l:"5 référentiels MDM en prod (entités, contacts, offres, souscriptions, devices)" },
          { v:100, l:"7 cibles de diffusion (Sage, Dynamics, HubSpot, Stellair, e-commerce, partenaire, mail)" },
          { v:100, l:"12 rapports Power BI · 15 modèles sémantiques · 2 UDF temps réel" },
        ],
        stackEyebrow:"IV · STACK",
        stackTitle:"Le matériel.",
        stackLead:"Microsoft Fabric pour la fondation, déploiement natif par intégration Git et Deployment Pipelines, Azure Key Vault pour les secrets. Power BI en aval. Tout est managé, sauf ce qui doit absolument ne pas l'être.",
        stackTags:["Microsoft Fabric","Lakehouse","Delta Lake","PySpark","Spark SQL","Notebooks Fabric","Fabric Data Pipelines","UDF Fabric","Power BI","TMDL","Azure","Azure Key Vault","Azure DevOps","Logic Apps","Deployment Pipelines","GraphQL","mTLS","OAuth2 / APIM","MongoDB Atlas"],
        nextLabel:"Prochaine étude",
        nextValue:"Kereis · un LLM sous contrainte →",
      },

      kereis: {
        tab:{ client:"Kereis", topic:"Recevabilité & interprétation" },
        eyebrow:"Étude de cas · 2026",
        titleA:"Deux modules ", titleAccent:"sous contrainte", titleColon:" :",
        titleB:"l'un juge la pièce,",
        titleC:"l'autre ", titleEm:"l'interprète", titleD:".",
        lead:"Sur un dossier de sinistre, tout commence par des pièces justificatives : décider si elles suffisent, puis en tirer une lecture fiable. Deux modules Java, une frontière nette entre les deux, et un LLM à qui l'on retire le droit de conclure seul.",
        meta:[ {l:"Client",v:"Kereis · Courtage en assurance"},{l:"Année",v:"2026"},{l:"Durée",v:"En cours · depuis août"},{l:"Équipe",v:"2 builders & 1 BA"} ],
        role:{l:"Rôle",v:"Consultant - Architecture & build"},

        ctxEyebrow:"I · CONTEXTE",
        ctxTitleA:"Des pièces, ", ctxTitleEm:"jugées", ctxTitleB:" à l'œil.",
        ctxDrop:"U",
        ctxP1:"n dossier de sinistre - un arrêt de travail, par exemple - arrive sous forme de pièces justificatives, souvent photographiées, de qualité inégale. Deux questions se posent alors, et elles n'ont rien à voir l'une avec l'autre : est-ce que cette pièce est acceptable pour ce dossier, et qu'est-ce qu'elle dit réellement. La première relève du tri, la seconde de l'interprétation.",
        ctxP2:"Aucun outil amont ne répond à la première. La recevabilité se juge à l'œil, dossier par dossier, et rien ne signale au gestionnaire qu'il manque une pièce pour conclure. Les règles, elles, n'existent nulle part en un seul endroit : elles sont réparties entre plusieurs procédures et autant de cas particuliers.",
        ctxP3:"Le pari : outiller les deux questions séparément, sans jamais les mélanger. Un module qui juge une pièce, un module qui interprète un lot - et, pour le second, un LLM cadré assez serré pour qu'une erreur de sa part échoue bruyamment au lieu de passer inaperçue. Un premier POC avait déjà échoué chez le client faute de règles écrites : la formalisation était le prérequis numéro un.",

        archEyebrow:"I·b · LES DEUX MODULES",
        archTitle:"Une frontière, deux modules.",
        archLead:"Juger une pièce et interpréter un lot sont deux métiers. Cliquez sur les blocs pour révéler les responsabilités.",

        timelineEyebrow:"I·c · CHRONOLOGIE",
        timelineTitle:"Jalon par jalon.",

        apprEyebrow:"II · APPROCHE",
        apprTitleA:"Quatre mouvements,", apprTitleB:"une seule règle.",
        apprLead:"Le POC précédent avait échoué faute de règles écrites. Tout part de là : formaliser avant de coder, puis retirer au modèle le droit de conclure seul.",
        steps:[
          { n:"01", t:"Écrire les règles avant le code",        d:"Première livraison : une documentation sourcée fait par fait, où chaque affirmation cite son atelier et sa date, et où aucune contradiction n'est arbitrée en silence - une quarantaine de divergences listées, pas résolues. Un référentiel de tests métier à identifiants stables en est dérivé ; chaque identifiant apparaît dans le nom du test JUnit et dans le pied des commits, donc l'historique retrouve tout ce qui a touché une règle. Le rapport de tests, libellé en français, devient le document de recette du métier." },
          { n:"02", t:"Juger la pièce sans l'interpréter",      d:"16 règles déterministes sourcées, activables par configuration, plus une matrice de complétude sur le lot - générée depuis un contrat versionné chargé au démarrage, avec échec dur au moindre écart. Le module accepte, rejette avec un code motif normé, ou signale qu'il manque une pièce. Ce qu'il ne fait jamais : ouvrir les autres documents pour les recouper. Compter n'est pas interpréter." },
          { n:"03", t:"Interpréter le lot sans conclure seul",  d:"Le second module reçoit le lot complet en une passe et consolide chaque champ avec sa source. Le design a évolué en trois temps, actés et versionnés : le modèle interprète et conclut, puis le modèle conclut et le code rejoue pour comparer, enfin le modèle décompose et le code exécute. Le dernier pas supprime la comparaison - il n'y a plus rien à comparer. Corollaire : un banc d'essai de 17 scénarios qui rejoue le vrai prompt, le vrai lecteur de sortie et le vrai moteur d'exécution, avec des échecs typés." },
          { n:"04", t:"Poser l'hexagone contre des bouchons",   d:"Deux systèmes cibles n'ont aucun contrat d'interface publié, un troisième n'est pas encore activé côté client. Plutôt que d'attendre, chaque inconnue est logée dans un adaptateur bouchonné, une classe chacune, hypothèses consignées à un registre. Le domaine s'écrit et se teste aujourd'hui, sur une stack locale complète en Docker Compose." },
        ],

        lineageEyebrow:"II·b · MODULE D'INTERPRÉTATION",
        lineageTitle:"Quatre temps, un seul avec le modèle.",
        lineageLead:"Le lot complet entre d'un côté, une lecture vérifiable sort de l'autre.",
        pipeline:[
          { t:"Le lot complet", d:"Toutes les pièces recevables du dossier, en une seule passe. C'est ici, et seulement ici, qu'on a le droit de recouper les documents entre eux." },
          { t:"Consolidation",  d:"Chaque champ est rattaché à la pièce dont il sort. Les valeurs discordantes sont signalées, jamais arbitrées en silence." },
          { t:"Décomposition",  d:"Le modèle rend une suite d'étapes à opérations fermées, dont chaque terme pointe un emplacement précis dans une pièce précise." },
          { t:"Exécution",      d:"Le code rejoue ces étapes. Si une référence ne résout pas, rien n'est produit : le dossier part en traitement manuel, motif tracé." },
        ],

        resultsEyebrow:"III · RÉSULTATS",
        resultsTitleA:"Vérifiés, pas ", resultsTitleEm:"promis", resultsTitleB:".",
        resultsLead:"L'état du dépôt au dernier comptage. Les tests s'exécutent sans réseau, sur la machine de build - rien ici ne dépend d'un environnement client.",
        results:[
          { num:316, suffix:"",    l:"Tests au vert, sans réseau" },
          { num:82,  suffix:"",    l:"Tests métier à identifiants stables" },
          { num:16,  suffix:"",    l:"Règles de recevabilité sourcées" },
          { num:15,  suffix:" /17", l:"Scénarios conformes au banc d'essai" },
        ],
        costsTitle:"Banc d'essai du prompt (17 scénarios)",
        costs:[
          { value:88, label:"Scénarios conformes (15/17)" },
          { value:12, label:"Écarts typés restants (2/17)" },
        ],
        latencyTitle:"Le dépôt en chiffres",
        latency:[
          { value:316, label:"Tests" },
          { value:82,  label:"Métier" },
          { value:17,  label:"Scénarios" },
          { value:16,  label:"Règles" },
          { value:8,   label:"Principes" },
          { value:5,   label:"ArchUnit" },
        ],
        capacities:[
          { v:100, l:"Chaînes de bout en bout, du message entrant au message retour" },
          { v:100, l:"Appel Bedrock réel, sortie validée en deux temps (format, schéma)" },
          { v:100, l:"Frontière hexagonale tenue par ArchUnit à chaque build" },
        ],
        resultsNote:"Ce qui est bouchonné l'est honnêtement, et c'est la moitié de l'intérêt de l'architecture : écritures vers les systèmes cibles (aucun contrat publié), persistance (non arbitrée, tout est en mémoire), publication sortante (technologie non choisie). Chaque bouchon est déclaré, pas déguisé - signaler plutôt que combler, jamais de valeur par défaut silencieuse.",
        stackEyebrow:"IV · STACK",
        stackTitle:"Le matériel.",
        stackLead:"Java et Spring pour le socle, Bedrock pour le raisonnement, ArchUnit et Error Prone pour empêcher la dérive. Le formatage est imposé au build, pas recommandé ; le contrat de champs extraits est généré depuis un JSON versionné, avec un test qui échoue si le code et le contrat divergent.",
        stackTags:["Java 25","Spring Boot 4","Amazon Bedrock","Architecture hexagonale","ArchUnit","Error Prone + NullAway","Spotless","JUnit 5","WireMock","Docker Compose","Kubernetes (kind)","AWS PaaS · ECR","openapi-generator","Messagerie idempotente","GitHub Spec Kit","Conventional Commits"],
        nextLabel:"Prochaine étude",
        nextValue:"Olaqin · plateforme Microsoft Fabric →",
      },
    },
    contact: {
      section:"Section V",
      title:"Contact.",
      heroA:"Prenons", heroB:"contact", heroDot:".",
      lead:"Disponible pour échanger sur une mission, un projet data ou une question d'architecture.",
      formats:"Mission, conseil, échange technique",
      meta:[
        { l:"Email",        v:"florianposezdarsonval@gmail.com", href:"mailto:florianposezdarsonval@gmail.com" },
        { l:"LinkedIn",     v:"/in/florian-posez", href:"https://linkedin.com/in/florian-posez" },
        { l:"GitHub",       v:"@Myst4ke", href:"https://github.com/Myst4ke" },
        { l:"Localisation", v:"Paris, France" },
        { l:"Fuseau",       v:"CET · UTC+1" },
      ],
      responseLabel:"Réponse moyenne",
      responseValue:"≤ 48 h ouvrées",
      colophon:"Colophon",
      colophonItems:[
        { l:"Composé en", v:"Inter Tight & JetBrains Mono" },
        { l:"Édition",    v:"N° 01 - Printemps 2026" },
        { l:"Tirage",     v:"Web · 1 exemplaire vivant" },
      ],
      formEyebrow:"Formulaire de qualification",
      formTitle:"Quelques mots, et je reviens vers vous.",
      formLead:"Pré-rempli pour vous faire gagner cinq minutes. Le bouton ouvre votre client mail.",
      fName:"Votre nom", fNamePh:"Camille Dupont",
      fEmail:"Email", fEmailPh:"camille@exemple.com",
      fCompany:"Société", fCompanyPh:"Acme",
      fSubject:"Sujet",
      fSubjects:["Mission longue","Conseil ponctuel","Embauche","Échange technique","Autre"],
      fTimeline:"Échéance",
      fTimelines:["Cette semaine","< 1 mois","Q3 2026","Pas pressé"],
      fMessage:"Message",
      fMessagePh:"Le contexte, l'équipe en place, ce qui vous tient éveillé.",
      fSend:"Envoyer le message →",
      fSending:"Envoi en cours…",
      fSent:"Message envoyé ✓",
      fHint:"Envoi direct via Formspree. Réponse par email à suivre.",
      fErrMissing:"Nom, email et message sont requis.",
      fErrGeneric:"Envoi impossible. Réessayez plus tard.",
    },
    footer: {
      copyright:"© 2026 · Florian Posez",
    },
  },

  en: {
    nav: { home:"Home", skills:"Skills", exp:"Experience", case:"Case studies", contact:"Contact" },
    common: {
      available:"Data Engineer Consultant · Paris",
      readCase:"Read the study →",
      viewCase:"See the case study →",
      read:"Read →",
      visit:"Visit →",
      downloadCV:"Download CV (PDF)",
      themeLight:"Light mode",
      themeDark:"Dark mode",
      tagline:"Data Engineer · Paris",
      featured:"Featured",
      currentEdition:"I · CURRENT ISSUE",
      otherWork:"II · OTHER WORK",
    },
    home: {
      heroL1a:"", heroAccent:"Reliable", heroL1b:" data,",
      heroL2a:"quiet ", heroEm:"engineering.",
      lead:"Data engineer at Silamir Group, on a long mission with Olaqin (healthcare). Microsoft Fabric, PySpark, T-SQL - daily tools on a data platform running in production. Belief: data well served starts with infrastructure the team actually understands.",
      stats:[
        { numeric:0,  suffix:" mo",  label:"Months on the ground" },
        { numeric:5,  suffix:"",     label:"Projects shipped" },
        { numeric:10, suffix:"",     label:"Technologies in production" },
        { numeric:6,  suffix:" yrs", label:"Tech education + DP-900" },
      ],
      featuredEyebrow:"Featured",
      featuredTitleA:"Microsoft Fabric platform at Olaqin:",
      featuredTitleEm:"ten systems reconciled,",
      featuredTitleB:" one source of truth.",
      featuredLead:"Twenty months to build the first data platform for a French healthcare actor. Greenfield on Microsoft Fabric, medallion architecture across three lakehouses, HDS / GDPR compliance. Ten Olaqin systems connected, plus the public healthcare registries - without interrupting teleservices, without forcing tool changes on the business side.",
      featuredMeta:["Olaqin · Healthcare","2025-2026","20 months"],
      featuredP1Drop:"T",
      featuredP1:"he challenge wasn't technical but relational. A dozen or so siloed systems - ERP, CRM, marketing and sales, teleservices, e-commerce, billing, terminal telemetry, office-grade reference files. The data existed, but no cross-cutting view was possible without long, fragile manual extracts. The project then plugged in the French public healthcare registries to reconcile healthcare professionals.",
      featuredP2:"We laid down a medallion architecture across three Fabric lakehouses: Bronze for raw ingestion (day by day, traceable), Silver for reconciled data historised by a metadata-driven CDC Type 2, Gold for business uses exposed via Power BI and GraphQL. PySpark for transformations, Fabric-native deployment (Git integration, Deployment Pipelines Dev / UAT / Prod), Azure Key Vault for secrets.",
      featuredP3:"At the latest count: 795 tables in production (422 Bronze, 288 Silver, 85 Gold), over 140 million rows historised, 97 notebooks and 56 orchestrated pipelines, five MDM master referentials in production (entities, contacts, offers, subscriptions, devices) and a bidirectional sync back to Sage, Dynamics, HubSpot and Stellair. The manual-extract debt quietly melted away.",
      projects:[
        { tag:"Data analytics", year:"2023", title:"Predicting incident resolution times",
          desc:"La Poste internship: analysis of IT incident history, predictive model on resolution delays, web interface for support teams. Lean management method." },
        { tag:"NLP", year:"2024", title:"Automated YouTube Live moderation",
          desc:"Real-time moderation system for YouTube Live chats. NLP for toxicity detection, streaming analysis. Personal project.",
          href:"https://github.com/Myst4ke/youtube-live-automod" },
        { tag:"Education", year:"2025", title:"Data Engineering Academy",
          desc:"Learning site for data-engineering newcomers. Structured courses and progressive paths, built alongside client work.",
          href:"https://myst4ke.github.io/data-engineering-academy/" },
        { tag:"Dev tooling", year:"2026", title:"Claude Code plugin for data",
          desc:"Claude Code plugin built at Silamir. Data engineering tools accessible from the IDE - agents, code generation, automating repetitive tasks. Used in production by a maintenance agent that analyses Freshdesk tickets and helps resolve them.",
          href:"https://github.com/Myst4ke/fabric-claude-plugin" },
      ],
      testimonialsEyebrow:"III · TESTIMONIALS",
      testimonialsTitle:"What teams say.",
      testimonialsLead:"Three excerpts to come, taken from recommendation letters and feedback from supervisors.",
      testimonials:[
        { quote:"Testimonial pending - will be added in the next site update.", name:"TODO 1", role:"Manager / Lead - Silamir Group" },
        { quote:"Testimonial pending - will be added in the next site update.", name:"TODO 2", role:"Client lead - Olaqin" },
        { quote:"Testimonial pending - will be added in the next site update.", name:"TODO 3", role:"Academic supervisor" },
      ],
    },
    skills: {
      section:"Section II",
      title:"Skills.",
      kicker:"Tools chosen carefully and used in production. No flattering progress bars - just what I touch every day.",
      formationEyebrow:"III · EDUCATION",
      formationTitle:"Education",
      timeAllocEyebrow:"IV · TIME ALLOCATION",
      timeAllocTitle1:"Where a ", timeAllocTitleEm:"typical week", timeAllocTitle2:" goes.",
      timeAllocLead:"Measured over the last six months on mission, aggregated by activity. Numbers fill in as you scroll.",
      capabilitiesEyebrow:"V · CAPABILITIES",
      methodEyebrow:"In the watermark",
      methodTitle:"Today's tools, lasting method.",
      methodBody:"I learn tools willingly; I hold to method. Test before building, document before shipping, instrument before optimising. The rest - Fabric, PySpark, whatever comes next - is just an execution layer.",
      cats:[
        { num:"01", name:"Data engineering",  chips:["PySpark","T-SQL","Pandas","Delta Lake","CDC Type 2","MDM","API integration"] },
        { num:"02", name:"Platform",          chips:["Microsoft Fabric","Azure","Lakehouse","Power BI","Terraform","Azure Key Vault","Azure DevOps","Logic Apps"] },
        { num:"03", name:"AI & ML",           chips:["Scikit-Learn","PyTorch","NLP","Sentiment analysis","Claude Code agents","Amazon Bedrock"] },
        { num:"04", name:"Soft skills",       chips:["Project management","Teamwork","Critical thinking","Initiative","Mentoring (recruitment)","Lean management","HDS / GDPR"] },
      ],
      formation:[
        { period:"2023 - 2025", school:"Université Paris Cité", degree:"Master 2 - Artificial Intelligence" },
        { period:"2019 - 2023", school:"Université Paris 8",    degree:"Bachelor - Computer Science" },
        { period:"2025",        school:"Microsoft",             degree:"Azure DP-900 certification" },
      ],
      donut:[
        { value:65, label:"Code & implementation" },
        { value:20, label:"Testing & quality" },
        { value:10, label:"Reading & learning" },
        { value:5,  label:"Design & MDM" },
      ],
      capabilities:[
        ["Microsoft Fabric platform","PySpark pipelines","Medallion architecture (CDC Type 2)","Bidirectional MDM design"],
        ["Multi-system API integration (mTLS, OAuth2)","NLP & sentiment analysis","Claude Code plugin","Mentoring / recruitment"],
      ],
    },
    exp: {
      section:"Section III",
      title:"Experience.",
      kicker:"Two houses, four missions, one common thread: data well served - whether it's IT incidents, a greenfield platform, a master reference, or an insurance settlement.",
      offstageEyebrow:"Public code",
      offstageTitle:"Projects & public repos",
      items:[
        { num:"01", period:"Aug. 2026 - Present", city:"Nantes / Paris", company:"Silamir Group", client:"Kereis", role:"Consultant - Architecture & build",
          summary:"Mission at Kereis (insurance brokerage): design and build of two Java modules for claims handling - one judges whether a document is admissible for a file, the other interprets it. An LLM in production, under constraint: the model decomposes, the code executes.",
          bullets:[
            "Admissibility module: accepts or rejects a document against the file's context, with a normalised reason code.",
            "Interpretation module: consolidation of the whole batch, each field tied back to its source document.",
            "Hexagonal architecture in Java 25 / Spring Boot, boundary enforced at build time by ArchUnit.",
            "Amazon Bedrock in production, output validated twice; 316 green tests, with no network."
          ] },
        { num:"02", period:"Oct. 2025 - Oct. 2026", city:"Paris", company:"Silamir Group", client:"Olaqin", role:"Data Engineer Consultant",
          summary:"Long-term mission at Olaqin (healthcare): industrialising and extending the Microsoft Fabric data platform. MDM design to unify business reference data, API integration to target systems.",
          bullets:[
            "Integration of data flows to target IS via API connections.",
            "MDM (Master Data Management) design to unify and standardise business data.",
            "Technical-test reviewer for Silamir's intern recruitment.",
            "In charge of application maintenance (Freshdesk): built a Claude Code plugin for the data team, and an agent that reads tickets and leans on that plugin to analyse them and help resolve them."
          ] },
        { num:"03", period:"Apr. 2025 - Oct. 2025", city:"Paris", company:"Silamir Group", client:"Olaqin", role:"Internship - Data Engineer",
          summary:"Setting up, improving and delivering a complete data platform on Microsoft Fabric, connected to source systems. First brick of the platform now in production at Olaqin.",
          bullets:[
            "End-to-end build of a Microsoft Fabric data platform.",
            "Ingestion pipelines in PySpark and T-SQL.",
            "Earned Microsoft Azure DP-900 certification."
          ] },
        { num:"04", period:"May 2023 - Jul. 2023", city:"Issy-les-Moulineaux", company:"La Poste Groupe", role:"Internship - Data Engineer",
          summary:"Processing and analysis of technical-incident data to predict resolution times. Web visualisation interface. Lean management practices.",
          bullets:[
            "Predictive model on IT incident resolution times.",
            "Web interface to visualise analysis results.",
            "Team support through Lean management practices."
          ] },
      ],
      talks:[
        { y:"2025", t:"data-engineering-academy - online courses for newcomers", v:"myst4ke.github.io/data-engineering-academy ↗", href:"https://myst4ke.github.io/data-engineering-academy/" },
        { y:"2024", t:"Real-time NLP moderation for YouTube Live", v:"youtube-live-automod ↗", href:"https://github.com/Myst4ke/youtube-live-automod" },
        { y:"2026", t:"Claude Code plugin for data engineering (in production)", v:"fabric-claude-plugin ↗", href:"https://github.com/Myst4ke/fabric-claude-plugin" },
      ],
    },
    cases: {
      olaqin: {
        tab:{ client:"Olaqin", topic:"Microsoft Fabric platform" },
        eyebrow:"Case study · 2025 - 2026",
        titleA:"", titleAccent:"Microsoft Fabric", titleColon:" platform:",
        titleB:"from ten siloed systems",
        titleC:"to a ", titleEm:"single", titleD:" reference.",
        lead:"Twenty months to build the first data platform at Olaqin (healthcare). Greenfield on Microsoft Fabric, medallion architecture across three lakehouses, HDS / GDPR compliance. Twelve sources connected; five MDM master referentials in production; bidirectional sync back to business systems and real-time APIs.",
        meta:[ {l:"Client",v:"Olaqin · Healthcare (HDS / GDPR)"},{l:"Year",v:"2025 - 2026"},{l:"Duration",v:"20 months"},{l:"Team",v:"≈ 6 engineers"} ],
        role:{l:"Role",v:"Consultant Data Engineer"},

        ctxEyebrow:"I · CONTEXT",
        ctxTitleA:"Ten ", ctxTitleEm:"siloed", ctxTitleB:" systems, plus the public registries.",
        ctxDrop:"O",
        ctxP1:"laqin had run for years with a historical architecture: an ERP for finance and commerce, a CRM for client organisations and Vitale-card reader tracking, a marketing and sales platform, the teleservices, the e-commerce, billing, terminal telemetry and a few office-grade reference files. A dozen or so systems, each in its own corner, on heterogeneous technologies. To this set, the project plugged in the French public healthcare registries to reconcile healthcare professionals: they weren't connected before the platform.",
        ctxP2:"Before the platform: manual extracts, heterogeneous formats, sometimes capricious API contracts. Each business request demanded a hand-stitched cross-reference, with no consistency guarantee from one run to the next. And the smallest source schema change quietly broke downstream chains.",
        ctxP3:"The bet: build a single data platform on Microsoft Fabric, HDS- and GDPR-compliant, traceable day by day, plugged bidirectionally into business systems - without interrupting Vitale-card teleservices or forcing tool changes on end users.",

        archEyebrow:"I·b · ARCHITECTURE",
        archTitle:"Before / after.",
        archLead:"Click the blocks to reveal responsibilities.",
        archBefore:"10 systems + registries",
        archAfter:"Fabric Lakehouse",

        timelineEyebrow:"I·c · TIMELINE",
        timelineTitle:"Twenty months, milestone by milestone.",

        apprEyebrow:"II · APPROACH",
        apprTitleA:"Four moves,", apprTitleB:"one tempo.",
        apprLead:"No big-bang switch. Each source was integrated step by step, validated by the business before being plugged into downstream uses. Twelve sources connected, from SQL Server to MongoDB Atlas to SFTP drops.",
        steps:[
          { n:"01", t:"Bootstrap & medallion",         d:"Inventory of source systems and pick of Microsoft Fabric. Olaqin already had some Azure services, but the whole data stack (Fabric, Power BI, Azure Key Vault, Logic Apps) was deployed for this project. Three lakehouses (Bronze / Silver / Gold), generic metadata-driven CDC Type 2 on Silver from month two." },
          { n:"02", t:"Progressive source hookup",     d:"First systems plugged in February-March 2025 (PFD, CRM Dynamics, Sage), then HubSpot, Saleor, RPPS, TMAJ, FINESS, Stellair and SharePoint. Connectors per source: SQL Server, MongoDB Atlas, REST APIs via APIM, SFTP drops, GraphQL; mTLS or OAuth2 authentication, secrets centralised in Azure Key Vault." },
          { n:"03", t:"Industrialisation",             d:"Isolated Fabric workspaces Dev / UAT / Prod, Fabric-native deployment (Git integration + Deployment Pipelines), pipeline-driven capacity autoscaling F16 ⇄ F32. Global orchestration through a generic config-driven launcher - 9 pipelines, 34 notebooks, real-time audit, replay mode. Gold opened in September 2025 with the first BI Exploitation and Marketing reports." },
          { n:"04", t:"Bidirectional MDM",             d:"Five master referentials in production: entities, contacts, offers, subscriptions and devices. Push-back to Sage, Dynamics, HubSpot and Stellair; GraphQL exposure to the e-commerce and a partner API behind APIM. Fuzzy dedup (rapidfuzz + connected components), unified Olaqin ID generation." },
        ],

        lineageEyebrow:"II·b · LINEAGE",
        lineageTitle:"One typical domain, from above.",
        lineageLead:"Hover the nodes to see their role in the chain.",

        resultsEyebrow:"III · RESULTS",
        resultsTitleA:"Measured, not ", resultsTitleEm:"announced", resultsTitleB:".",
        resultsLead:"The numbers below are the platform's state at the latest production count - not projections.",
        results:[
          { num:12,  suffix:"+",   l:"Sources connected (10 systems + public registries)" },
          { num:795, suffix:"",    l:"Tables in production (422 Bronze · 288 Silver · 85 Gold)" },
          { num:140, suffix:" M+", l:"Rows historised in Silver (CDC Type 2)" },
          { num:97,  suffix:"",    l:"Notebooks in production, 56 orchestrated pipelines" },
        ],
        costsTitle:"795 tables, three lakehouses",
        costs:[
          { value:53, label:"Bronze - raw ingestion (422 tables)" },
          { value:36, label:"Silver - CDC Type 2 + MDM (288 tables)" },
          { value:11, label:"Gold - BI & APIs (85 tables)" },
        ],
        latencyTitle:"Repo activity (commits per quarter)",
        latency:[
          { value:476, label:"Q1 25" },
          { value:125, label:"Q2 25" },
          { value:216, label:"Q3 25" },
          { value:152, label:"Q4 25" },
          { value:222, label:"Q1 26" },
          { value:660, label:"Q2 26" },
          { value:679, label:"Q3 26" },
        ],
        capacities:[
          { v:100, l:"5 MDM master referentials in prod (entities, contacts, offers, subscriptions, devices)" },
          { v:100, l:"7 delivery targets (Sage, Dynamics, HubSpot, Stellair, e-commerce, partner, mail)" },
          { v:100, l:"12 Power BI reports · 15 semantic models · 2 real-time UDFs" },
        ],
        stackEyebrow:"IV · STACK",
        stackTitle:"The kit.",
        stackLead:"Microsoft Fabric for the foundation, native deployment through Git integration and Deployment Pipelines, Azure Key Vault for secrets. Power BI downstream. Everything managed, except what absolutely shouldn't be.",
        stackTags:["Microsoft Fabric","Lakehouse","Delta Lake","PySpark","Spark SQL","Fabric Notebooks","Fabric Data Pipelines","Fabric UDF","Power BI","TMDL","Azure","Azure Key Vault","Azure DevOps","Logic Apps","Deployment Pipelines","GraphQL","mTLS","OAuth2 / APIM","MongoDB Atlas"],
        nextLabel:"Next study",
        nextValue:"Kereis · an LLM under constraint →",
      },

      kereis: {
        tab:{ client:"Kereis", topic:"Admissibility & interpretation" },
        eyebrow:"Case study · 2026",
        titleA:"Two modules ", titleAccent:"under constraint", titleColon:":",
        titleB:"one judges the document,",
        titleC:"the other ", titleEm:"interprets", titleD:" it.",
        lead:"On a claim file, everything starts with supporting documents: deciding whether they are enough, then drawing a reliable reading out of them. Two Java modules, a clean boundary between them, and an LLM stripped of the right to conclude on its own.",
        meta:[ {l:"Client",v:"Kereis · Insurance brokerage"},{l:"Year",v:"2026"},{l:"Duration",v:"Ongoing · since August"},{l:"Team",v:"2 builders & 1 BA"} ],
        role:{l:"Role",v:"Consultant - Architecture & build"},

        ctxEyebrow:"I · CONTEXT",
        ctxTitleA:"Documents, ", ctxTitleEm:"judged", ctxTitleB:" by eye.",
        ctxDrop:"A",
        ctxP1:" claim file - a work absence, say - arrives as supporting documents, often photographed, of uneven quality. Two questions come up, and they have nothing to do with each other: is this document acceptable for this file, and what does it actually say. The first is sorting, the second is interpretation.",
        ctxP2:"No upstream tooling answers the first. Admissibility is judged by eye, file by file, and nothing tells the case handler that a document is missing before they can conclude. The rules, for their part, exist nowhere in a single place: they are spread across several procedures and as many edge cases.",
        ctxP3:"The bet: tool both questions separately, without ever mixing them. One module that judges a document, one module that interprets a batch - and, for the second, an LLM framed tightly enough that a mistake on its part fails loudly instead of slipping through. An earlier POC had already failed at the client for lack of written rules: formalising them was prerequisite number one.",

        archEyebrow:"I·b · THE TWO MODULES",
        archTitle:"One boundary, two modules.",
        archLead:"Judging a document and interpreting a batch are two different jobs. Click the blocks to reveal responsibilities.",

        timelineEyebrow:"I·c · TIMELINE",
        timelineTitle:"Milestone by milestone.",

        apprEyebrow:"II · APPROACH",
        apprTitleA:"Four moves,", apprTitleB:"one single rule.",
        apprLead:"The earlier POC failed for lack of written rules. Everything starts there: formalise before coding, then take away the model's right to conclude on its own.",
        steps:[
          { n:"01", t:"Write the rules before the code",        d:"First delivery: documentation sourced fact by fact, where every statement cites its workshop and date, and no contradiction is silently arbitrated - some forty divergences listed, not resolved. A reference set of business tests with stable IDs is derived from it; each ID appears in the JUnit test name and in the commit footer, so history can retrieve everything that touched a rule. The test report, worded in French, becomes the business acceptance document." },
          { n:"02", t:"Judge the document, don't read it",      d:"16 sourced deterministic rules, switchable by configuration, plus a completeness matrix over the batch - generated from a versioned contract loaded at startup, with hard failure on the slightest drift. The module accepts, rejects with a normalised reason code, or reports that a document is missing. What it never does: open the other documents to cross-check them. Counting is not interpreting." },
          { n:"03", t:"Interpret the batch, don't conclude",    d:"The second module receives the whole batch in a single pass and consolidates each field with its source. The design moved in three steps, recorded and versioned: the model interprets and concludes, then the model concludes and the code replays to compare, finally the model decomposes and the code executes. The last step removes the comparison - there is nothing left to compare. Corollary: a 17-scenario bench that replays the real prompt, the real output reader and the real execution engine, with typed failures." },
          { n:"04", t:"Lay the hexagon against stubs",          d:"Two target systems have no published interface contract, a third isn't enabled yet on the client side. Rather than wait, each unknown is housed in a stubbed adapter, one class each, assumptions logged in a register. The domain gets written and tested today, on a full local stack in Docker Compose." },
        ],

        lineageEyebrow:"II·b · INTERPRETATION MODULE",
        lineageTitle:"Four beats, one with the model.",
        lineageLead:"The full batch goes in one end, a checkable reading comes out the other.",
        pipeline:[
          { t:"The full batch", d:"Every admissible document of the file, in a single pass. This is where, and only where, documents may be cross-checked against each other." },
          { t:"Consolidation",  d:"Each field is tied back to the document it came from. Conflicting values are reported, never silently arbitrated." },
          { t:"Decomposition",  d:"The model returns a sequence of closed-operation steps, each term pointing at a precise location in a precise document." },
          { t:"Execution",      d:"The code replays those steps. If a reference doesn't resolve, nothing is produced: the file goes to manual handling, reason traced." },
        ],

        resultsEyebrow:"III · RESULTS",
        resultsTitleA:"Verified, not ", resultsTitleEm:"promised", resultsTitleB:".",
        resultsLead:"The state of the repository at the latest count. Tests run with no network, on the build machine - nothing here depends on a client environment.",
        results:[
          { num:316, suffix:"",    l:"Green tests, no network" },
          { num:82,  suffix:"",    l:"Business tests with stable IDs" },
          { num:16,  suffix:"",    l:"Sourced admissibility rules" },
          { num:15,  suffix:" /17", l:"Scenarios conforming on the bench" },
        ],
        costsTitle:"Prompt bench (17 scenarios)",
        costs:[
          { value:88, label:"Conforming scenarios (15/17)" },
          { value:12, label:"Typed gaps remaining (2/17)" },
        ],
        latencyTitle:"The repository in numbers",
        latency:[
          { value:316, label:"Tests" },
          { value:82,  label:"Business" },
          { value:17,  label:"Scenarios" },
          { value:16,  label:"Rules" },
          { value:8,   label:"Principles" },
          { value:5,   label:"ArchUnit" },
        ],
        capacities:[
          { v:100, l:"Chains end to end, from inbound message to reply message" },
          { v:100, l:"Real Bedrock call, output validated twice (format, schema)" },
          { v:100, l:"Hexagonal boundary held by ArchUnit on every build" },
        ],
        resultsNote:"What is stubbed is honestly stubbed, and that's half the point of the architecture: writes to target systems (no published contract), persistence (not yet arbitrated, everything in memory), outbound publishing (technology not chosen). Every stub is declared, not disguised - signal rather than paper over, never a silent default value.",
        stackEyebrow:"IV · STACK",
        stackTitle:"The kit.",
        stackLead:"Java and Spring for the base, Bedrock for the reasoning, ArchUnit and Error Prone to prevent drift. Formatting is enforced at build time, not recommended; the extracted-field contract is generated from a versioned JSON, with a test that fails if code and contract diverge.",
        stackTags:["Java 25","Spring Boot 4","Amazon Bedrock","Hexagonal architecture","ArchUnit","Error Prone + NullAway","Spotless","JUnit 5","WireMock","Docker Compose","Kubernetes (kind)","AWS PaaS · ECR","openapi-generator","Idempotent messaging","GitHub Spec Kit","Conventional Commits"],
        nextLabel:"Next study",
        nextValue:"Olaqin · Microsoft Fabric platform →",
      },
    },
    contact: {
      section:"Section V",
      title:"Contact.",
      heroA:"Get in", heroB:"touch", heroDot:".",
      lead:"Available to discuss a mission, a data project, or an architecture question.",
      formats:"Mission, advisory, technical exchange",
      meta:[
        { l:"Email",       v:"florianposezdarsonval@gmail.com", href:"mailto:florianposezdarsonval@gmail.com" },
        { l:"LinkedIn",    v:"/in/florian-posez", href:"https://linkedin.com/in/florian-posez" },
        { l:"GitHub",      v:"@Myst4ke", href:"https://github.com/Myst4ke" },
        { l:"Location",    v:"Paris, France" },
        { l:"Time zone",   v:"CET · UTC+1" },
      ],
      responseLabel:"Average reply",
      responseValue:"≤ 48 business hours",
      colophon:"Colophon",
      colophonItems:[
        { l:"Set in",   v:"Inter Tight & JetBrains Mono" },
        { l:"Issue",    v:"No. 01 - Spring 2026" },
        { l:"Print run", v:"Web · 1 living copy" },
      ],
      formEyebrow:"Qualification form",
      formTitle:"A few words and I'll get back to you.",
      formLead:"Pre-filled to save you five minutes. The button opens your mail client.",
      fName:"Your name", fNamePh:"Camille Dupont",
      fEmail:"Email", fEmailPh:"camille@example.com",
      fCompany:"Company", fCompanyPh:"Acme",
      fSubject:"Subject",
      fSubjects:["Long mission","Spot advisory","Hiring","Technical exchange","Other"],
      fTimeline:"Timeline",
      fTimelines:["This week","< 1 month","Q3 2026","No rush"],
      fMessage:"Message",
      fMessagePh:"Context, the team in place, what's keeping you awake.",
      fSend:"Send the message →",
      fSending:"Sending…",
      fSent:"Message sent ✓",
      fHint:"Sent directly via Formspree. Reply will follow by email.",
      fErrMissing:"Name, email and message are required.",
      fErrGeneric:"Could not send. Please try again later.",
    },
    footer: {
      copyright:"© 2026 · Florian Posez",
    },
  },
};

const I18nContext = createContext({ t:(k)=>k, lang:"fr", setLang:()=>{} });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('fp-lang');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch(e){}
    return (navigator.language||'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
  });
  useEffect(()=>{
    try { localStorage.setItem('fp-lang', lang); } catch(e){}
    document.documentElement.lang = lang;
  },[lang]);

  const t = useCallback((path) => {
    const parts = path.split('.');
    let v = I18N[lang];
    for (const p of parts) {
      if (v == null) return path;
      v = v[p];
    }
    return v == null ? path : v;
  },[lang]);

  return <I18nContext.Provider value={{t,lang,setLang}}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }

const ThemeContext = createContext({ theme:"light", setTheme:()=>{} });
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('fp-theme', theme); } catch(e){}
  },[theme]);
  return <ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>;
}
export function useTheme() { return useContext(ThemeContext); }
