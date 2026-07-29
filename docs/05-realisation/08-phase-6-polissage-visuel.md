# Phase 6 - Identité visuelle et polissage

## Statut

Cadrage documentaire en cours. Aucune modification visuelle de production ne doit commencer avant validation de la bible, du prototype isolé et des budgets.

## Objectif

Atteindre l’identité du prototype validé sans dégrader le MVP fonctionnel livré par les Phases 1 à 5.

La Phase 6 doit faire percevoir La Grange comme un atelier stylisé, cohérent et vivant, tout en conservant :

- les mêmes données réelles ;
- les mêmes routes ;
- les mêmes fonctions ;
- les mêmes comportements hors ligne ;
- les mêmes garanties d’accessibilité ;
- une performance compatible avec une PWA mobile et tablette.

## Référence

La référence d’ambiance est conservée dans :

`docs/assets/phase-6/reference-dashboard-grange.webp`

Elle fixe une intention de scène, de matière et de composition. Elle ne constitue pas une maquette pixel-perfect et ne justifie aucune métrique fictive.

## Sources de vérité

Avant toute intervention, lire dans cet ordre :

1. ADR acceptés ;
2. règles métier ;
3. spécifications des vues et composants ;
4. bible visuelle de Phase 6 ;
5. inventaire des assets ;
6. présent document ;
7. prototype Lovable validé ;
8. README.

Documents obligatoires :

- `docs/02-ux-ui/01-direction-artistique.md` ;
- `docs/02-ux-ui/03-specification-vues.md` ;
- `docs/02-ux-ui/04-specification-composants.md` ;
- `docs/02-ux-ui/05-design-system.md` ;
- `docs/02-ux-ui/06-responsive-design.md` ;
- `docs/02-ux-ui/07-animations.md` ;
- `docs/02-ux-ui/09-accessibilite.md` ;
- `docs/02-ux-ui/10-bible-visuelle-phase-6.md` ;
- `docs/02-ux-ui/11-inventaire-assets-phase-6.md` ;
- `docs/03-technique/11-performance.md` ;
- `docs/04-qualite/14-checklist-phase-6.md` ;
- `docs/08-generation-ia/13-protocole-lovable-phase-6.md`.

## Périmètre

### Inclus

- identité de marque et enseigne ;
- palette et tokens de matière ;
- fond et structure du shell ;
- navigation ;
- poutre de statistiques ;
- cartes projets et leurs variantes ;
- panneaux secondaires ;
- catalogue ;
- fiches projets ;
- activité ;
- paramètres ;
- iconographie locale ;
- couvertures et logos prioritaires ;
- états vides et fallbacks ;
- animations autorisées ;
- responsive artistique ;
- optimisation des assets ;
- contrôle visuel et accessibilité.

### Exclus

- nouvelle donnée GitHub ;
- progression de projet ;
- métrique décorative ;
- fonction de gestion ou de pilotage ;
- backend ;
- authentification ;
- token GitHub ;
- modification de dépôt distant ;
- bibliothèque UI ou framework ;
- refonte du modèle de données ;
- nouveau système de routage ;
- son, vidéo ou animation permanente ;
- reproduction pixel-perfect de l’image de référence.

Toute modification fonctionnelle découverte pendant la Phase 6 est isolée dans une PR distincte et justifiée. Elle ne doit pas être cachée dans une PR visuelle.

## Principes non négociables

- le contenu prime sur le décor ;
- aucune donnée fictive ;
- aucun texte fonctionnel dans une image ;
- aucun asset distant requis au runtime ;
- fallback CSS ou SVG pour chaque élément critique ;
- focus visible au-dessus des textures ;
- contraste WCAG 2.2 AA autant que possible ;
- mouvement réduit complet ;
- aucune fonction perdue selon la taille ;
- interaction possible dès l’affichage du cache ;
- aucun scroll horizontal global ;
- aucune rafale de requêtes GitHub ;
- aucun secret ;
- aucune dépendance visuelle lourde sans ADR et mesure.

## Stratégie de réalisation

La Phase 6 est découpée en une étape de conception puis plusieurs PR de production. Une PR unique est interdite.

## Étape 6.0 - Cadrage documentaire

Livrables :

- direction artistique complétée ;
- bible visuelle ;
- inventaire et budgets d’assets ;
- responsive artistique ;
- grammaire de mouvement ;
- protocole Lovable ;
- checklist qualité ;
- plan de PR.

Critère de sortie : documents cohérents, référence disponible et aucun conflit silencieux.

## Étape 6.1 - Prototype Lovable isolé

Lovable travaille dans un projet ou une branche de prototype distincte. Il ne devient jamais la source de vérité du code.

Périmètre du premier prototype :

- shell ;
- enseigne ;
- navigation ;
- poutre de quatre statistiques réelles ou représentées par des placeholders explicitement non destinés à la production ;
- une carte standard ;
- une carte compacte ;
- un fallback sans image ;
- un panneau secondaire ;
- état focus ;
- format 1440 px ;
- format 390 px.

Le prototype ne doit pas couvrir toutes les vues ni intégrer de logique GitHub.

Livrables attendus :

- captures desktop et mobile ;
- structure de composants ;
- tokens proposés ;
- liste d’assets ;
- CSS ou diff exportable ;
- notes sur responsive et mouvement ;
- écarts connus par rapport à la documentation.

Critère de sortie : validation explicite de la direction, des matières, de la densité, de la carte projet et du mobile.

## PR 6A - Fondations visuelles

Périmètre :

- tokens ;
- typographie locale ;
- iconographie de base ;
- shell ;
- fond ;
- enseigne ;
- navigation ;
- focus ;
- fallbacks ;
- système de chargement des assets partagés.

Interdictions :

- aucune refonte complète des cartes ;
- aucune animation narrative ;
- aucun changement métier.

Critères :

- shell utilisable sans asset ;
- navigation complète ;
- mobile, tablette et bureau ;
- contraste mesuré ;
- poids publiés ;
- cache PWA contrôlé.

## PR 6B - Cartes, statistiques et panneaux

Périmètre :

- `ProjectCard` standard, mise en avant, compacte et liste ;
- fallback ;
- badges ;
- statistiques ;
- panneaux secondaires ;
- états chargement, vide, erreur et hors ligne ;
- premières couvertures prioritaires.

Critères :

- aucune donnée ajoutée ;
- cartes avec et sans asset cohérentes ;
- noms longs ;
- descriptions longues ;
- archives ;
- favoris ;
- densité compacte ;
- focus et tactile ;
- lazy loading.

## PR 6C - Dashboard et catalogue

Périmètre :

- composition complète du dashboard ;
- catalogue ;
- filtres et recherche ;
- activité synthétique ;
- répartition ;
- nouvelle arrivée ;
- responsive artistique des listes.

Critères :

- aucun faux compteur ;
- aucune progression ;
- aucune carte dupliquée sans règle ;
- recherche et filtres inchangés ;
- retour de catalogue préservé ;
- cache et hors ligne préservés.

## PR 6D - Fiches, activité et paramètres

Périmètre :

- fiche projet ;
- hero ;
- métadonnées ;
- détails à la demande ;
- chronologie d’activité ;
- contrôles de paramètres ;
- cache et diagnostics ;
- modales.

Critères :

- aucun appel GitHub supplémentaire hors des comportements existants ;
- texte long lisible ;
- modale accessible ;
- arrière-plan inerte ;
- diagnostics copiables ;
- fiche directe accessible même si le projet est masqué ;
- mode hors ligne complet.

## PR 6E - Mouvement, assets finaux et optimisation

Périmètre :

- micro-interactions ;
- arrivée d’une nouvelle caisse ;
- lueur de synchronisation ;
- textures finales ;
- couvertures supplémentaires ;
- optimisation ;
- suppression des assets inutilisés ;
- revue visuelle globale.

Critères :

- mouvement réduit ;
- aucune animation permanente ;
- aucune grande surface animée ;
- budgets respectés ou justifiés ;
- LCP et CLS contrôlés ;
- fonctionnement sans images ;
- cache PWA renouvelé proprement.

## Option PR 6F - Corrections de revue

Une PR corrective séparée est recommandée si les revues des lots précédents laissent des P1 ou P2. Elle ne doit pas mélanger de nouvelle direction artistique.

## Assets prioritaires

Ordre recommandé :

1. enseigne et marque ;
2. fond et structure du shell ;
3. cadres réutilisables ;
4. iconographie ;
5. carte fallback ;
6. couvertures des projets mis en avant ;
7. couvertures des applications lançables ;
8. ornements facultatifs.

## Règles d’assets

- dimensions documentées ;
- AVIF ou WebP pour les couvertures ;
- PNG uniquement si nécessaire ;
- SVG local pour cadres et icônes ;
- poids budgété ;
- noms stables ;
- provenance documentée ;
- aucun script dans les SVG ;
- fallback toujours fonctionnel ;
- aucune donnée métier dessinée dans une image ;
- aucun asset brut généré par IA intégré directement.

## Règles Lovable

- GitHub reste la source de vérité ;
- Lovable sert au prototype et à l’exploration ;
- aucune modification directe de `main` ;
- aucune réécriture fonctionnelle non demandée ;
- aucune dépendance ajoutée sans validation ;
- les sorties sont comparées à la documentation ;
- seuls les éléments approuvés sont reportés dans une branche GitHub ;
- tous les diffs sont audités avant intégration.

## Contrôles obligatoires par PR

### Fonctionnel

- routes ;
- recherche ;
- filtres ;
- favoris ;
- synchronisation ;
- détails ;
- activité ;
- paramètres ;
- cache ;
- hors ligne.

### Visuel

- 320 px ;
- 390 px ;
- 768 px ;
- 1024 px ;
- 1440 px ;
- 1920 px ;
- densité compacte ;
- zoom 200 % ;
- noms longs ;
- images absentes ;
- lumière ambiante faible et forte.

### Accessibilité

- clavier ;
- VoiceOver iOS ou contrôle équivalent ;
- focus ;
- contrastes ;
- mouvement réduit ;
- mode contraste accru lorsque disponible ;
- images décoratives ;
- texte alternatif ;
- modales.

### Performance

- poids CSS ;
- poids des assets ;
- requêtes initiales ;
- LCP ;
- CLS ;
- lazy loading ;
- cache chaud et froid ;
- iPad réel ou appareil comparable.

### Qualité

- `npm ci` ;
- TypeScript strict ;
- ESLint ;
- tests Vitest ;
- smoke tests existants ;
- build Vite ;
- revue du diff ;
- review threads interrogés ;
- P1 et P2 corrigés et résolus.

## Critères de sortie de la Phase 6

- reconnaissance immédiate de La Grange ;
- fidélité à l’esprit de la référence ;
- rendu stylisé, ni photoréaliste ni cartoon ;
- lisibilité supérieure ou égale à la version Phase 5 ;
- aucune donnée fictive ;
- aucun texte sur texture incontrôlée ;
- toutes les vues cohérentes ;
- mobile, tablette et bureau aboutis ;
- fallbacks complets ;
- mouvement réduit complet ;
- contrastes validés ;
- budgets tenus ou écarts approuvés ;
- aucun secret ni asset distant ;
- aucune régression fonctionnelle ;
- aucune animation obligatoire ;
- documentation et manifest d’assets à jour ;
- aucun P1 ou P2 ouvert ;
- `main` contrôlé après fusion du dernier lot.

## Go ou No-Go vers la Phase 7

No-Go si :

- la référence n’est pas reconnaissable dans l’esprit ;
- la lisibilité a baissé ;
- un composant dépend de son asset pour fonctionner ;
- le mode hors ligne est dégradé ;
- le focus ou le zoom est cassé ;
- les budgets présentent une régression non justifiée ;
- des données fictives ont été ajoutées ;
- une vue n’est pas traitée ;
- un P1 ou P2 reste ouvert.

La Phase 7 commence uniquement lorsque le dernier lot Phase 6 est fusionné et que la checklist visuelle est clôturée.