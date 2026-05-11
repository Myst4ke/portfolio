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
    nav: { home:"Accueil", skills:"Compétences", exp:"Expérience", case:"Étude de cas", contact:"Contact" },
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
      featuredTitleEm:"six SI réconciliés,",
      featuredTitleB:" un référentiel unique.",
      featuredLead:"Quinze mois pour bâtir la première plateforme data d'un acteur français de la santé. Greenfield sur Microsoft Fabric, architecture médaillon en trois lakehouses, conformité HDS / RGPD. Six SI Olaqin connectés en neuf mois, plus deux ingestions externes - sans interrompre les téléservices, sans imposer un changement d'outils côté métier.",
      featuredMeta:["Olaqin · Santé","2025-2026","15 mois"],
      featuredP1Drop:"L",
      featuredP1:"'enjeu n'était pas technique mais relationnel. Six SI Olaqin cloisonnés - l'ERP Sage, le CRM Dynamics (organisations B2B et traçabilité des lecteurs Carte Vitale), HubSpot pour le marketing et la vente, la plateforme téléservices Stellair, la plateforme de facturation (PFD) et les mises à jour terminaux Carte Vitale - plus un SharePoint de fichiers de configuration et de listes Excel administratives. La donnée existait, mais aucune lecture transverse n'était possible sans extractions manuelles, longues et fragiles. Le projet y a ajouté les référentiels gouvernementaux RPPS / FINESS, branchés pour réconcilier les professionnels de santé.",
      featuredP2:"Nous avons posé l'architecture en médaillon sur trois lakehouses Fabric\u00a0: Bronze pour l'ingestion brute (jour par jour, traçable), Silver pour la donnée réconciliée et historisée en CDC Type 2, Gold pour les usages métier exposés en Power BI DirectLake. PySpark partout pour les transformations, Terraform pour l'infrastructure, Azure Key Vault pour les secrets.",
      featuredP3:"Au bout de quinze mois\u00a0: 418 tables Bronze, plus de 25 millions de lignes ingérées, 43 pipelines orchestrés, trois domaines MDM en production (Clients/Contacts, Devices et Souscription) et une synchronisation bidirectionnelle vers Sage, Dynamics, HubSpot et Stellair. La dette d'extractions manuelles a fondu en silence.",
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
          desc:"Plugin Claude Code en cours de développement chez Silamir. Outils data engineering accessibles depuis l'IDE - agents, génération de code, automatisation de tâches répétitives.",
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
        { num:"02", name:"Plateforme",       chips:["Microsoft Fabric","Azure","Lakehouse","Power BI · DirectLake","Terraform","Azure Key Vault","Azure DevOps","Logic Apps"] },
        { num:"03", name:"IA & ML",          chips:["Scikit-Learn","PyTorch","NLP","Sentiment analysis","Agents Claude Code"] },
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
      kicker:"Trois maisons, un seul fil rouge\u00a0: la donnée bien servie, qu'on parle d'incidents IT, d'une plateforme greenfield ou d'un référentiel maître.",
      offstageEyebrow:"Code public",
      offstageTitle:"Projets & repos publics",
      items:[
        { num:"01", period:"Oct. 2025 - Présent", city:"Paris", company:"Silamir Group", role:"Consultant Data Engineer",
          summary:"Mission longue chez Olaqin (santé)\u00a0: industrialisation et extension de la plateforme data Microsoft Fabric. Conception MDM pour unifier les référentiels métier, intégration API vers les SI cibles.",
          bullets:[
            "Intégration de flux de données vers les SI cibles via des connexions API.",
            "Conception d'un MDM (Master Data Management) pour unifier et standardiser les données métier.",
            "Évaluateur des tests techniques pour le recrutement des stagiaires Silamir.",
            "Développement d'un plugin Claude Code pour outiller l'équipe data."
          ] },
        { num:"02", period:"Avr. 2025 - Oct. 2025", city:"Paris", company:"Silamir Group", role:"Stage - Data Engineer",
          summary:"Mise en place, amélioration et livraison d'une data plateforme complète sur Microsoft Fabric, connectée aux SI sources. Première brique de la plateforme actuelle d'Olaqin.",
          bullets:[
            "Construction de bout en bout d'une data plateforme Microsoft Fabric.",
            "Développement de pipelines d'ingestion en PySpark et T-SQL.",
            "Obtention de la certification Microsoft Azure DP-900."
          ] },
        { num:"03", period:"Mai 2023 - Juil. 2023", city:"Issy-les-Moulineaux", company:"La Poste Groupe", role:"Stage - Data Engineer",
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
        { y:"2026", t:"Plugin Claude Code data engineering (en cours)", v:"fabric-claude-plugin ↗", href:"https://github.com/Myst4ke/fabric-claude-plugin" },
      ],
    },
    case: {
      eyebrow:"Étude de cas · 2025 - 2026",
      titleA:"Plateforme ", titleAccent:"Microsoft Fabric", titleColon:"\u00a0:",
      titleB:"de six SI silotés",
      titleC:"à un ", titleEm:"référentiel", titleD:" unique.",
      lead:"Quinze mois pour bâtir la première plateforme data d'Olaqin (santé). Greenfield sur Microsoft Fabric, architecture médaillon en trois lakehouses, conformité HDS / RGPD. Six SI Olaqin branchés, plus deux ingestions externes ; deux domaines MDM en production ; synchronisation bidirectionnelle vers les SI métier.",
      meta:[ {l:"Client",v:"Olaqin · Santé (HDS / RGPD)"},{l:"Année",v:"2025 - 2026"},{l:"Durée",v:"15 mois"},{l:"Équipe",v:"≈ 6 ingénieurs"} ],
      role:{l:"Rôle",v:"Consultant Data Engineer"},

      ctxEyebrow:"I · CONTEXTE",
      ctxTitleA:"Six SI ", ctxTitleEm:"silotés", ctxTitleB:", plus deux externes.",
      ctxDrop:"O",
      ctxP1:"laqin opérait depuis des années avec une architecture historique. L'ERP Sage tenait la comptabilité et le commercial. Le CRM Dynamics suivait les organisations clientes B2B et assurait la traçabilité des lecteurs Carte Vitale. HubSpot couvrait le marketing et la vente. Stellair portait les téléservices. La plateforme de facturation (PFD) et les mises à jour terminaux Carte Vitale complétaient les six SI métier. Un SharePoint de fichiers de configuration et de listes Excel administratives s'y ajoutait. Chacun dans son coin. À ce paysage, le projet a ensuite branché les référentiels gouvernementaux RPPS / FINESS pour réconcilier les professionnels de santé : ils n'étaient pas connectés à Olaqin avant la plateforme.",
      ctxP2:"Avant la plateforme\u00a0: exports manuels, formats hétérogènes, contrats d'API parfois capricieux. Chaque demande métier exigeait un croisement à la main, sans garantie de cohérence d'une fois à l'autre. Et le moindre changement de schéma source cassait silencieusement les chaînes en aval.",
      ctxP3:"Le pari\u00a0: bâtir une plateforme data unique sur Microsoft Fabric, conforme HDS et RGPD, traçable au quotidien, branchée bidirectionnellement aux SI métier - sans interrompre les téléservices Carte Vitale ni imposer un changement d'outils aux utilisateurs finaux.",

      archEyebrow:"I·b · ARCHITECTURE",
      archTitle:"Avant / après.",
      archLead:"Cliquez sur les blocs pour révéler les responsabilités.",
      archBefore:"6 SI + 2 externes",
      archAfter:"Lakehouse Fabric",

      timelineEyebrow:"I·c · CHRONOLOGIE",
      timelineTitle:"Quinze mois, jalon par jalon.",

      apprEyebrow:"II · APPROCHE",
      apprTitleA:"Quatre mouvements,", apprTitleB:"un seul tempo.",
      apprLead:"Pas de bascule d'un coup. Chaque source a été intégrée progressivement, validée par les métiers avant d'être branchée aux usages aval. Six SI Olaqin et deux ingestions externes connectés en neuf mois.",
      steps:[
        { n:"01", t:"Bootstrap & médaillon",            d:"Inventaire des SI sources et choix de Microsoft Fabric. Olaqin disposait déjà de quelques services Azure, mais toute la stack data (Fabric, Power BI DirectLake, Azure Key Vault, Logic Apps) a été déployée pour ce projet. Trois lakehouses (Bronze / Silver / Gold), CDC Type 2 sur Silver dès le mois deux." },
        { n:"02", t:"Connexion progressive des sources",  d:"Premiers SI branchés en février-mars 2025 (PFD, CRM Dynamics, Sage), puis HubSpot, RPPS, TMAJ, FINESS, Stellair et SharePoint étalés sur six mois. Authentification mTLS, OAuth2 + APIM, GraphQL - selon la source. Secrets centralisés en Azure Key Vault." },
        { n:"03", t:"Industrialisation",                d:"Terraform pour l'infrastructure as code, workspaces Fabric isolés Dev / UAT / Prod, orchestration globale via Logic Apps. Gold ouvert en septembre 2025 avec les premiers BI Exploitation et Marketing." },
        { n:"04", t:"MDM bidirectionnel",               d:"Trois domaines en production\u00a0: Clients / Contacts (organisations + utilisateurs), Devices (terminaux Carte Vitale) et Souscription (modèle commun cross-SI). Push-back vers Sage, Dynamics, HubSpot et Stellair. Dédoublonnage custom, génération d'IDs Olaqin." },
      ],

      lineageEyebrow:"II·b · LINEAGE",
      lineageTitle:"Un domaine type, vu d'en haut.",
      lineageLead:"Survolez les nœuds pour voir leur rôle dans la chaîne.",

      resultsEyebrow:"III · RÉSULTATS",
      resultsTitleA:"Mesurés, pas ", resultsTitleEm:"annoncés", resultsTitleB:".",
      resultsLead:"Les chiffres ci-dessous sont l'état de la plateforme au dernier comptage en production - pas des projections.",
      results:[
        { num:8,    suffix:"",  l:"Sources connectées (6 SI + 2 externes)" },
        { num:418,  suffix:"",  l:"Tables Bronze en production" },
        { num:25.7, suffix:" M", decimals:1, l:"Lignes ingérées (Bronze)" },
        { num:43,   suffix:"",  l:"Pipelines orchestrés" },
      ],
      costsTitle:"Volume Bronze par schéma source (lignes)",
      costs:[
        { value:60, label:"Sage - ERP (15,6 M)" },
        { value:28, label:"Référentiels gov.fr - RPPS / FINESS (7,3 M)" },
        { value:9,  label:"PFD + CRM Dynamics (2,1 M)" },
        { value:3,  label:"Stellair, HubSpot, SharePoint, TMAJ (≈ 0,8 M)" },
      ],
      latencyTitle:"Activité du repo (commits par trimestre)",
      latency:[
        { value:476, label:"Q1 25" },
        { value:125, label:"Q2 25" },
        { value:216, label:"Q3 25" },
        { value:152, label:"Q4 25" },
        { value:222, label:"Q1 26" },
        { value:335, label:"Q2 26" },
      ],
      capacities:[
        { v:100, l:"3 domaines MDM en prod (Clients/Contacts, Devices, Souscription)" },
        { v:100, l:"4 SI sync bidirectionnels (Sage, Dynamics, HubSpot, Stellair)" },
        { v:100, l:"4 reports Power BI DirectLake en prod" },
      ],
      stackEyebrow:"IV · STACK",
      stackTitle:"Le matériel.",
      stackLead:"Microsoft Fabric pour la fondation, Terraform pour l'infrastructure, Azure Key Vault pour les secrets. Power BI DirectLake en aval. Tout est managé, sauf ce qui doit absolument ne pas l'être.",
      nextLabel:"Prochaine étude",
      nextValue:"Plus de cas à venir →",
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
    nav: { home:"Home", skills:"Skills", exp:"Experience", case:"Case study", contact:"Contact" },
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
      featuredTitleEm:"six systems reconciled,",
      featuredTitleB:" one source of truth.",
      featuredLead:"Fifteen months to build the first data platform for a French healthcare actor. Greenfield on Microsoft Fabric, medallion architecture across three lakehouses, HDS / GDPR compliance. Six Olaqin systems connected in nine months, plus two external ingestions - without interrupting teleservices, without forcing tool changes on the business side.",
      featuredMeta:["Olaqin · Healthcare","2025-2026","15 months"],
      featuredP1Drop:"T",
      featuredP1:"he challenge wasn't technical but relational. Six siloed Olaqin systems - the Sage ERP, the Dynamics CRM (B2B organisations and Vitale-card reader tracking), HubSpot for marketing and sales, the Stellair teleservices platform, the billing platform (PFD) and Vitale-card terminal updates - plus a SharePoint of configuration files and administrative Excel sheets. The data existed, but no cross-cutting view was possible without long, fragile manual extracts. The project then plugged in French government reference data (RPPS / FINESS) to reconcile healthcare professionals.",
      featuredP2:"We laid down a medallion architecture across three Fabric lakehouses: Bronze for raw ingestion (day by day, traceable), Silver for reconciled and CDC Type 2 historised data, Gold for business uses exposed via Power BI DirectLake. PySpark for transformations, Terraform for infrastructure, Azure Key Vault for secrets.",
      featuredP3:"Fifteen months in: 418 Bronze tables, over 25 million rows ingested, 43 orchestrated pipelines, three MDM domains in production (Clients/Contacts, Devices and Subscription) and a bidirectional sync back to Sage, Dynamics, HubSpot and Stellair. The manual-extract debt quietly melted away.",
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
          desc:"In-progress Claude Code plugin at Silamir. Data engineering tools accessible from the IDE - agents, code generation, automating repetitive tasks.",
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
        { num:"02", name:"Platform",          chips:["Microsoft Fabric","Azure","Lakehouse","Power BI · DirectLake","Terraform","Azure Key Vault","Azure DevOps","Logic Apps"] },
        { num:"03", name:"AI & ML",           chips:["Scikit-Learn","PyTorch","NLP","Sentiment analysis","Claude Code agents"] },
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
      kicker:"Three houses, one common thread: data well served - whether it's IT incidents, a greenfield platform, or a master reference.",
      offstageEyebrow:"Public code",
      offstageTitle:"Projects & public repos",
      items:[
        { num:"01", period:"Oct. 2025 - Present", city:"Paris", company:"Silamir Group", role:"Data Engineer Consultant",
          summary:"Long-term mission at Olaqin (healthcare): industrialising and extending the Microsoft Fabric data platform. MDM design to unify business reference data, API integration to target systems.",
          bullets:[
            "Integration of data flows to target IS via API connections.",
            "MDM (Master Data Management) design to unify and standardise business data.",
            "Technical-test reviewer for Silamir's intern recruitment.",
            "Building a Claude Code plugin to tool the data team."
          ] },
        { num:"02", period:"Apr. 2025 - Oct. 2025", city:"Paris", company:"Silamir Group", role:"Internship - Data Engineer",
          summary:"Setting up, improving and delivering a complete data platform on Microsoft Fabric, connected to source systems. First brick of the platform now in production at Olaqin.",
          bullets:[
            "End-to-end build of a Microsoft Fabric data platform.",
            "Ingestion pipelines in PySpark and T-SQL.",
            "Earned Microsoft Azure DP-900 certification."
          ] },
        { num:"03", period:"May 2023 - Jul. 2023", city:"Issy-les-Moulineaux", company:"La Poste Groupe", role:"Internship - Data Engineer",
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
        { y:"2026", t:"Claude Code plugin for data engineering (in progress)", v:"fabric-claude-plugin ↗", href:"https://github.com/Myst4ke/fabric-claude-plugin" },
      ],
    },
    case: {
      eyebrow:"Case study · 2025 - 2026",
      titleA:"", titleAccent:"Microsoft Fabric", titleColon:" platform:",
      titleB:"from six siloed systems",
      titleC:"to a ", titleEm:"single", titleD:" reference.",
      lead:"Fifteen months to build the first data platform at Olaqin (healthcare). Greenfield on Microsoft Fabric, medallion architecture across three lakehouses, HDS / GDPR compliance. Six Olaqin systems connected, plus two external ingestions; two MDM domains in production; bidirectional sync back to business systems.",
      meta:[ {l:"Client",v:"Olaqin · Healthcare (HDS / GDPR)"},{l:"Year",v:"2025 - 2026"},{l:"Duration",v:"15 months"},{l:"Team",v:"≈ 6 engineers"} ],
      role:{l:"Role",v:"Consultant Data Engineer"},

      ctxEyebrow:"I · CONTEXT",
      ctxTitleA:"Six ", ctxTitleEm:"siloed", ctxTitleB:" systems, plus two externals.",
      ctxDrop:"O",
      ctxP1:"laqin had run for years with a historical architecture. The Sage ERP held finance and commerce. The Dynamics CRM tracked B2B client organisations and Vitale-card reader traceability. HubSpot covered marketing and sales. Stellair carried the teleservices. The billing platform (PFD) and Vitale-card terminal updates rounded out the six business systems. A SharePoint of configuration files and administrative Excel sheets sat alongside. Each in its own corner. The project later plugged in the French government reference data (RPPS / FINESS) to reconcile healthcare professionals: they weren't connected to Olaqin before the platform.",
      ctxP2:"Before the platform: manual extracts, heterogeneous formats, sometimes capricious API contracts. Each business request demanded a hand-stitched cross-reference, with no consistency guarantee from one run to the next. And the smallest source schema change quietly broke downstream chains.",
      ctxP3:"The bet: build a single data platform on Microsoft Fabric, HDS- and GDPR-compliant, traceable day by day, plugged bidirectionally into business systems - without interrupting Vitale-card teleservices or forcing tool changes on end users.",

      archEyebrow:"I·b · ARCHITECTURE",
      archTitle:"Before / after.",
      archLead:"Click the blocks to reveal responsibilities.",
      archBefore:"6 systems + 2 externals",
      archAfter:"Fabric Lakehouse",

      timelineEyebrow:"I·c · TIMELINE",
      timelineTitle:"Fifteen months, milestone by milestone.",

      apprEyebrow:"II · APPROACH",
      apprTitleA:"Four moves,", apprTitleB:"one tempo.",
      apprLead:"No big-bang switch. Each source was integrated step by step, validated by the business before being plugged into downstream uses. Six Olaqin systems and two external ingestions connected in nine months.",
      steps:[
        { n:"01", t:"Bootstrap & medallion",         d:"Inventory of source systems and pick of Microsoft Fabric. Olaqin already had some Azure services, but the whole data stack (Fabric, Power BI DirectLake, Azure Key Vault, Logic Apps) was deployed for this project. Three lakehouses (Bronze / Silver / Gold), CDC Type 2 on Silver from month two." },
        { n:"02", t:"Progressive source hookup",     d:"First systems plugged in February-March 2025 (PFD, CRM Dynamics, Sage), then HubSpot, RPPS, TMAJ, FINESS, Stellair and SharePoint spread over six months. Authentication via mTLS, OAuth2 + APIM, GraphQL - depending on the source. Secrets centralised in Azure Key Vault." },
        { n:"03", t:"Industrialisation",             d:"Terraform for IaC, isolated Fabric workspaces Dev / UAT / Prod, global orchestration via Logic Apps. Gold opened in September 2025 with the first BI Exploitation and Marketing reports." },
        { n:"04", t:"Bidirectional MDM",             d:"Three domains in production: Clients / Contacts (organisations + users), Devices (Vitale-card terminals) and Subscription (cross-system common model). Push-back to Sage, Dynamics, HubSpot and Stellair. Custom dedup, Olaqin ID generation." },
      ],

      lineageEyebrow:"II·b · LINEAGE",
      lineageTitle:"One typical domain, from above.",
      lineageLead:"Hover the nodes to see their role in the chain.",

      resultsEyebrow:"III · RESULTS",
      resultsTitleA:"Measured, not ", resultsTitleEm:"announced", resultsTitleB:".",
      resultsLead:"The numbers below are the platform's state at the latest production count - not projections.",
      results:[
        { num:8,    suffix:"",  l:"Sources connected (6 systems + 2 externals)" },
        { num:418,  suffix:"",  l:"Bronze tables in production" },
        { num:25.7, suffix:" M", decimals:1, l:"Rows ingested (Bronze)" },
        { num:43,   suffix:"",  l:"Orchestrated pipelines" },
      ],
      costsTitle:"Bronze volume per source schema (rows)",
      costs:[
        { value:60, label:"Sage - ERP (15.6 M)" },
        { value:28, label:"Government refs - RPPS / FINESS (7.3 M)" },
        { value:9,  label:"PFD + Dynamics CRM (2.1 M)" },
        { value:3,  label:"Stellair, HubSpot, SharePoint, TMAJ (≈ 0.8 M)" },
      ],
      latencyTitle:"Repo activity (commits per quarter)",
      latency:[
        { value:476, label:"Q1 25" },
        { value:125, label:"Q2 25" },
        { value:216, label:"Q3 25" },
        { value:152, label:"Q4 25" },
        { value:222, label:"Q1 26" },
        { value:335, label:"Q2 26" },
      ],
      capacities:[
        { v:100, l:"3 MDM domains in prod (Clients/Contacts, Devices, Subscription)" },
        { v:100, l:"4 systems sync bidirectionally (Sage, Dynamics, HubSpot, Stellair)" },
        { v:100, l:"4 Power BI DirectLake reports in prod" },
      ],
      stackEyebrow:"IV · STACK",
      stackTitle:"The kit.",
      stackLead:"Microsoft Fabric for the foundation, Terraform for infrastructure, Azure Key Vault for secrets. Power BI DirectLake downstream. Everything managed, except what absolutely shouldn't be.",
      nextLabel:"Next study",
      nextValue:"More cases coming →",
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
