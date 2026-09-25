# Étude de cas — Kereis · CU#2 Perte de Revenus

> **Source de rédaction** : dépôt `prog/kereis/PR_CU2` (docs `00` à `06`, README, code) au 24/09/2026.
> **Format** : calqué sur l'étude de cas Olaqin déjà présente dans `src/i18n.jsx` (clé `case`) —
> mêmes sections, même registre. Prêt à découper en `ctxP1`, `steps[]`, `results[]`, etc.

---

## 0. Carte d'identité

| Champ | Valeur |
|---|---|
| **Client** | Kereis — courtier grossiste en assurance emprunteur et prévoyance (Saint-Herblain / Nantes) |
| **Employeur** | Silamir Group |
| **Année** | 2026 — mission en cours |
| **Durée** | ≈ 5 mois (cadrage mai-juillet, build 03/08 → 26/10) |
| **Rôle** | Consultant — architecture et build du module |
| **Équipe** | Fly-in squad : 1 Business Analyst + 1 Builder à temps plein, chef de projet et tech lead à temps partiel |
| **Jalon** | GO live visé **19/10/2026** |
| **Nature** | Module back-end Java, LLM en production, aucune interface utilisateur |

**Accroche (équivalent `lead`)**

> Automatiser le calcul d'une indemnisation d'assurance que douze mille dossiers par an font
> encore à la main, sur des bulletins de paie photographiés. Un module Java qui lit les pièces,
> fait raisonner un LLM, puis **refait lui-même chaque calcul en `BigDecimal`** — parce qu'un
> modèle de langage n'a pas le droit de produire un euro qui partira en règlement.

---

## I · Contexte — le calcul que personne n'outille

La garantie **Perte de Revenus** est adossée aux prêts immobiliers. En cas d'arrêt de travail, elle
ne rembourse pas l'échéance : elle comble **l'écart réel** entre ce que l'assuré gagnait et ce
qu'il perçoit pendant son arrêt.

```
Revenu de remplacement = IJSS + prévoyance + salaire maintenu
Perte de revenu        = Salaire de référence − Revenu de remplacement
Montant réglé          = min(Perte de revenu ; échéance du prêt × quotité)
```

Deux circuits cohabitent. Le circuit CNP est outillé et prédictif — un calcul figé pour un à cinq
ans. Le circuit **hors-CNP**, lui, n'a **aucun outil amont** : le gestionnaire lit les
justificatifs, calcule de tête ou sur un tableur, et **recommence chaque mois, pour chaque dossier,
pendant toute la durée de l'arrêt**. L'AS400 ne fait que l'arithmétique finale du règlement.

Ce que les ateliers ont remonté :

- **La recevabilité se juge « à l'œil »** — aucun outil ne dit si une pièce suffit à calculer.
- **Les règles n'existent nulle part en un seul endroit** : 15+ conventions collectives,
  fonctionnaires à plein puis demi-traitement, multi-employeurs, CDD, intérim, frontaliers —
  éparpillées sur trois procédures. *Un premier POC de calculette avait déjà échoué chez le client,
  faute de règles écrites : la formalisation était le prérequis n°1.*
- **La donnée est écrasée depuis 2006** : faute de zone dédiée dans l'AS400, le montant Perte de
  Revenus écrase le montant d'échéance. Vingt ans d'auditabilité perdue.
- Les **indus sont fréquents** — une requalification rétroactive de fonctionnaire, et il faut
  recalculer des mois déjà réglés, à la main, une à trois heures par dossier.

⚠️ *Toutes les volumétries du dossier sont déclarées **non consolidées** par le client : bases
hétérogènes entre documents (sinistres / prêts / dossiers). À citer avec prudence, ou pas du tout.*

---

## I·b · Architecture — une frontière, deux modules

### Le principe cardinal

> **Le module calcule et alimente ; l'AS400 calcule la perte et règle.**
> Le calcul de la perte n'est **jamais dupliqué** dans le module.

C'est le premier des huit principes de la constitution technique du projet, et il est non
négociable. Il fixe ce que le module n'a pas le droit de faire — dans un contexte où la tentation
de tout réimplémenter est permanente.

### La scission recevabilité / calcul

La décision structurante du projet : **séparer juger la pièce de interpréter la pièce**. Deux
responsabilités, deux modules, deux contrats.

| | **Module de recevabilité** | **Module Perte de Revenus** |
|---|---|---|
| **Question posée** | Cette pièce est-elle acceptable pour ce dossier ? | Que valent les montants de cette période ? |
| **Granularité** | Un document à la fois | Le lot complet du dossier |
| **Contexte autorisé** | Le dossier (nom, prénom, dates d'arrêt) + le **nombre et le type** de pièces déjà rattachées | Tout le lot, toutes les pièces reliées entre elles |
| **Ce qu'il fait** | Accepte, rejette avec un **code motif normé**, ou signale qu'il manque une pièce | Produit les montants, ou déclare le lot insuffisant |
| **Ce qu'il ne fait pas** | **Aucune interprétation** de la donnée, aucun recoupement entre documents | **Ne rejette jamais** une pièce — il demande |
| **Déterminisme** | Règles déterministes | LLM + exécution déterministe du plan |

Un exemple qui montre la ligne exacte : la période de référence court sur douze mois, le module de
recevabilité traite un bulletin de salaire et constate que **dix autres seulement** sont rattachés
au dossier. Il peut dire « il en manque un » — en vérifiant la date d'entrée dans l'entreprise, qui
expliquerait légitimement l'absence. Ce qu'il ne fera pas : ouvrir les dix autres bulletins pour
vérifier qu'ils se recoupent. Compter n'est pas interpréter.

À l'inverse, le module PR **ne rejette rien**. S'il n'arrive pas à conclure, il ne produit pas un
à-peu-près : il demande une pièce complémentaire, ou renvoie le dossier en traitement manuel avec
le motif tracé. C'est le deuxième principe non négociable.

### Le module PR en trois vagues

```
Vague 1 — Contrôle de champs à 3 états          déterministe, piloté par une matrice versionnée
Vague 2 — Consolidation LLM du dossier complet  toutes les pièces en une passe, recoupements
Vague 3 — Exécution du plan par le domaine      les montants produits en BigDecimal
```

La vague 2 est celle qui a demandé le plus d'arbitrages. Le LLM reçoit **toutes les extractions du
dossier en une seule passe**, avec le mapping d'équivalences inter-documents et les drapeaux levés
par la vague 1. Il consolide chaque champ avec sa source, signale les valeurs discordantes plutôt
que d'en choisir une — et surtout, il **ne rend aucun montant**.

Ce qu'il rend, c'est le **plan de calcul** : une suite d'étapes à opérations fermées, dont chaque
opérande pointe un emplacement précis dans une pièce précise. Le domaine exécute ce plan en
`BigDecimal` et produit les montants. Un emplacement inventé ne résout rien : le plan est déclaré
irrejouable et le dossier part en manuel. **Le seul calcul qui fasse foi est celui du domaine, et
il est vérifiable ligne à ligne.**

### Hexagone et messages

Architecture hexagonale, **vérifiée par le build** : cinq règles ArchUnit font échouer la
compilation si le domaine importe Spring, Jakarta, Jackson ou le SDK AWS — ou si un port porte le
nom d'un fournisseur. Un port se nomme par la capacité métier : `ConsolidationDossierPort`, pas
`BedrockPort` ; `DossierPrestationPort`, pas `PocsiPort`.

Le module n'expose **aucune API REST entrante**. Les commandes arrivent par le broker du client
(`demanderSalaireReference`, `demanderMontantsPeriode`), les résultats repartent en messages
(`ecrireSalaireReference`, `ecrireMontantsPeriode`, `ecrireIndu`). Tout l'état du dossier voyage
dans le message : dans le cas nominal, le module ne relit aucun contexte. Accusés de réception
idempotents par identifiant de corrélation, et un balayage quotidien republie à l'identique toute
émission non accusée depuis la veille.

---

## II · Approche — quatre mouvements

> **`steps[]` — prêt à coller dans l'i18n**

**01 · Écrire les règles avant d'écrire le code.**
Le POC précédent avait échoué faute de règles formalisées. Première livraison : une documentation
sourcée fait par fait, où chaque affirmation cite son atelier et sa date — et où **aucune
contradiction n'est arbitrée en silence**. Une quarantaine de divergences entre documents sont
listées, pas résolues. Un référentiel de **82 tests métier à identifiants stables** (`R-ATT-01`,
`C-COH-03`, `L-BS-02`) en est dérivé : chaque identifiant apparaît dans le nom du test JUnit et
dans le pied des commits, donc `git log --grep 'R-ATT-01'` retrouve tout ce qui l'a touché. Le
rapport de tests, libellé en français, devient le document de recette présentable au métier.

**02 · Poser l'hexagone contre des bouchons.**
Deux systèmes cibles n'ont **aucun contrat d'interface publié** et un troisième n'est pas encore
activé côté client. Plutôt que d'attendre, chaque inconnue est logée dans un adaptateur bouchonné,
une classe chacune, hypothèses consignées à un registre. Le domaine — les règles du salaire de
référence, les boucles mensuelles, le contrôle d'indu — s'écrit et se teste **aujourd'hui**. Stack
locale complète en `docker compose` : le module et ses quatre bouchons.

**03 · Interdire au LLM de calculer.**
Le design a évolué en trois temps, actés et versionnés dans la constitution du projet : d'abord
« le LLM interprète et calcule », puis « le LLM calcule et le domaine rejoue pour comparer », enfin
**« le LLM décompose, le domaine exécute »**. Le dernier pas supprime la comparaison : il n'y a
plus rien à comparer puisqu'il n'y a plus de montant côté modèle. Corollaire : un banc d'essai de
**17 scénarios** qui rejoue le vrai prompt, le vrai lecteur de sortie et le vrai moteur de calcul,
avec un verdict à cinq niveaux et des échecs typés (`SORTIE_NON_JSON`, `SCHEMA_KO`, `IRREJOUABLE`,
`RESULTAT_FAUX`).

**04 · Scinder recevabilité et calcul.**
Le contrat de contrôle par document est spécifié — codes motifs normés, justification en texte
libre — et la frontière tranchée : juger une pièce isolément, avec le seul contexte du dossier et
le décompte des pièces rattachées, est un métier ; interpréter un lot complet en est un autre. Les
deux modules se parlent par messages, aucun n'appelle l'autre en synchrone.

---

## III · Résultats

> **`results[]` — quatre compteurs**

| Valeur | Libellé |
|---|---|
| **316** | Tests au vert (`mvn verify`, sans réseau) |
| **82** | Tests métier à identifiants stables dérivés des règles |
| **16** | Règles de recevabilité sourcées, activables par configuration |
| **15/17** | Scénarios conformes à la dernière campagne d'évaluation du prompt |

**Ce qui tourne réellement** (état au 17/09/2026) :

- Chaînes INIT et RUN de bout en bout, du message broker au message retour.
- Appel Bedrock réel : prompt assemblé, `InvokeModel` signé via le SDK AWS, sortie validée en deux
  temps (format, puis schéma), coût étiqueté par dossier.
- Contrôle de recevabilité : 16 règles par document + matrice de complétude sur le lot, générée
  depuis un contrat versionné chargé au démarrage — **échec dur au démarrage** en cas d'écart.
- Calcul refait par le domaine, référence par référence, dans la pièce réelle.
- Démarrage vérifié dans les deux profils ; frontière hexagonale tenue par ArchUnit ; contrat de
  champs verrouillé contre toute dérive.
- Un scénario de démonstration rejouable sur `docker compose` : INIT, RUN avec indu, accusé de
  réception, idempotence.

**Ce qui est honnêtement bouchonné** — et c'est la moitié de l'intérêt de l'architecture :
écritures vers les systèmes cibles (aucun contrat disponible), persistance (non arbitrée, tout est
en mémoire), publication broker sortante (technologie non choisie). Chaque bouchon est déclaré, pas
déguisé : **signaler plutôt que combler, jamais de valeur par défaut silencieuse**.

**Gains visés par le client** : ≈ 6,5 ETP sur le calcul réel hors-CNP, dans un programme global
chiffré autour de 9 ETP. *(Chiffres client — voir la note de confidentialité en fin de document
avant publication.)*

---

## IV · Stack

| | |
|---|---|
| Langage | **Java 25** |
| Framework | **Spring Boot 4.1.1** — Spring Framework 7, Jackson 3 |
| LLM | **Amazon Bedrock** — modèle Sonnet, région EU, rôle IAM, jamais de clé statique |
| Architecture | **Hexagonale**, vérifiée par **ArchUnit** à chaque build |
| Qualité | **Error Prone + NullAway** câblés au compilateur, **Spotless** imposé en phase `validate` |
| Contrats | **openapi-generator** — client généré depuis les specs versionnées |
| Bouchons | **WireMock** — mêmes fixtures en test JUnit et dans la stack locale |
| Local | **Docker Compose** (module + 4 bouchons), **kind** pour les sondes et le zero-downtime |
| Cible | **PaaS AWS** — Docker, Kubernetes, registre ECR, image de base en argument de build |
| Méthode | **GitHub Spec Kit** — constitution versionnée à 8 principes, Conventional Commits |

Deux détails qui disent l'esprit du dépôt : le formatage est **imposé au build**, pas recommandé ;
et le contrat de champs extraits est **généré** depuis un JSON versionné, avec un test qui échoue
si le code et le contrat divergent.

---

## V · Ce que j'en retiens

**Un LLM en production n'a pas besoin d'être cru sur parole.** La question n'était pas « le modèle
est-il assez bon ? » mais « que se passe-t-il quand il se trompe ? ». La réponse tient en une
règle : il n'a pas le droit de produire un nombre. Il produit un raisonnement dont chaque terme
pointe une source, et une machine déterministe le rejoue. Un raisonnement inventé ne résout pas ses
propres références — il échoue bruyamment au lieu de régler un mauvais montant.

**Une frontière bien placée vaut mieux qu'un module complet.** Séparer recevabilité et calcul n'a
rien enlevé au produit : ça a rendu chaque moitié testable seule, et ça a clarifié ce que chacune
n'a *pas* le droit de savoir.

**Documenter les contradictions sans les trancher est un livrable.** Sur ce projet, la règle de
conduite n°1 est de ne jamais arbitrer seul une divergence entre deux sources métier. La liste des
points ouverts est vivante, sourcée, et elle a plus de valeur qu'une décision prise vite.

---

## Annexe A — Équivalents anglais des chaînes principales

| Clé | FR | EN |
|---|---|---|
| `eyebrow` | Étude de cas · 2026 | Case study · 2026 |
| `titleA/B` | Un LLM qui n'a pas le droit de calculer. | An LLM that isn't allowed to do the math. |
| `lead` | Automatiser une indemnisation d'assurance calculée à la main, douze mille fois par an. Le modèle décompose, le domaine exécute en `BigDecimal` — aucun montant ne sort d'un modèle de langage. | Automating an insurance settlement still computed by hand, twelve thousand times a year. The model decomposes, the domain executes in `BigDecimal` — no amount ever leaves a language model. |
| `meta.Client` | Kereis · Assurance emprunteur | Kereis · Loan insurance |
| `meta.Rôle` | Consultant — architecture & build du module | Consultant — module architecture & build |
| `steps[0]` | Écrire les règles avant d'écrire le code | Write the rules before writing the code |
| `steps[1]` | Poser l'hexagone contre des bouchons | Lay the hexagon against stubs |
| `steps[2]` | Interdire au LLM de calculer | Forbid the LLM from computing |
| `steps[3]` | Scinder recevabilité et calcul | Split admissibility from computation |
| `results` | Tests au vert / Tests métier / Règles de recevabilité / Scénarios conformes | Green tests / Business tests / Admissibility rules / Conforming scenarios |

---

## Annexe B — Avant publication

Les documents sources du projet portent la mention **« Diffusion limitée / Confidentiel »**. Trois
précautions avant de publier :

1. **Les volumétries et les gains ETP/€ sont des chiffres client non consolidés.** Le dossier le
   dit explicitement. Soit les retirer, soit les passer en ordres de grandeur (« autour de six
   ETP »), soit demander l'accord du pilotage. Les chiffres techniques (316 tests, 15/17, 16
   règles) sont les vôtres — aucun problème.
2. **Les noms de systèmes internes du client** (outils de gestion sinistres, GED, outils
   partenaires) ont été volontairement neutralisés dans ce récap. L'étude de cas Olaqin nomme les
   siens — si vous voulez la même granularité ici, vérifiez que le cadre contractuel le permet.
3. **Aucune donnée réelle n'apparaît nulle part** dans le dépôt : toutes les fixtures sont
   synthétiques, et le corpus réel n'y entre qu'après validation d'anonymisation et avis DPO.
   C'est un point à dire — ça se raconte bien.
