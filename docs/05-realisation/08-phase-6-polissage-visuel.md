# Phase 6 - Identité visuelle et polissage

## Statut

Cadrage documentaire révisé le 2026-07-30. La production graphique suit désormais une méthode séquentielle, fichier par fichier.

Aucune intégration visuelle ne commence à partir d’un prototype hérité. Seuls les fichiers conformes au registre peuvent être utilisés.

## Objectif

Atteindre l’identité de l’atelier stylisé sans dégrader le MVP fonctionnel livré par les Phases 1 à 5.

La Phase 6 conserve :

- les mêmes données réelles ;
- les mêmes routes ;
- les mêmes fonctions ;
- les mêmes comportements hors ligne ;
- les mêmes garanties d’accessibilité ;
- une performance compatible avec une PWA mobile et tablette.

## Référence

La référence d’ambiance est :

`docs/assets/phase-6/reference-dashboard-grange.webp`

Elle fixe une intention de scène, de matière et de composition. Elle n’est pas une maquette pixel-perfect et ne justifie aucune métrique fictive.

## Sources de vérité

Avant toute intervention, lire :

1. les ADR acceptés ;
2. les règles métier ;
3. les spécifications des vues et composants ;
4. la bible visuelle ;
5. l’inventaire technique ;
6. le présent document ;
7. le registre `10-suivi-production-assets-phase-6.md` ;
8. le protocole de production des assets ;
9. le README.

Le registre prime pour les identifiants, noms, formats, dimensions, transparences, usages, fallbacks, budgets, provenances, droits, dépendances, affectations aux lots et statuts.

## Périmètre

### Inclus

- identité de marque et enseigne ;
- palette et tokens de matière ;
- fond et structure du shell ;
- navigation ;
- poutre de statistiques ;
- cartes projets et variantes ;
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
- contrôles visuels et accessibilité.

### Exclus

- nouvelle donnée GitHub ;
- progression de projet ;
- métrique décorative ;
- fonction de gestion ;
- backend ;
- authentification ;
- token GitHub ;
- écriture distante ;
- framework UI ;
- refonte du modèle de données ;
- nouveau routage ;
- son, vidéo ou animation permanente ;
- reproduction pixel-perfect de la référence.

Toute modification fonctionnelle découverte pendant la Phase 6 est isolée dans une PR distincte.

## Principes non négociables

- le contenu prime sur le décor ;
- aucune donnée fictive ;
- aucun texte fonctionnel dans une image ;
- aucun asset distant requis ;
- fallback CSS ou SVG pour chaque élément critique ;
- focus visible au-dessus des textures ;
- contraste WCAG 2.2 AA autant que possible ;
- mouvement réduit complet ;
- aucune fonction perdue selon la taille ;
- interaction possible dès l’affichage du cache ;
- aucun scroll horizontal global ;
- aucun secret ;
- aucune dépendance visuelle lourde sans ADR et mesure.

## Nouvelle stratégie de réalisation

La Phase 6 est découpée en trois temps :

1. cadrage et registre ;
2. production et validation manuelles des masters, assets et planches ;
3. intégration progressive par lots fonctionnels.

Une PR unique mêlant tous les assets et toutes les vues est interdite.

## Étape 6.0 - Cadrage documentaire

Livrables :

- direction artistique ;
- bible visuelle ;
- inventaire et budgets ;
- responsive ;
- grammaire de mouvement ;
- registre complet ;
- protocole de production ;
- checklist qualité ;
- plan de PR.

Critère de sortie : documents cohérents, références disponibles, masters canoniques identifiés et prochain élément autorisé explicitement indiqué.

## Étape 6.1 - Production manuelle des assets

La production suit le registre :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Règles :

- une ligne correspond à un seul fichier ;
- un seul fichier est produit à la fois ;
- le master ou la source canonique doit être versionné avant le dérivé ;
- une source S dérivée ne reçoit R qu’après sa source amont M ou S ;
- nom, format, dimensions, alpha, usage et fallback sont définis avant production ;
- provenance et droits sont renseignés avant P ;
- export contrôlé et versionné à la racine de `public/assets/phase-6/` avant P ;
- validation humaine obligatoire ;
- aucun passage au suivant avant validation ;
- aucun fichier intégré depuis une sortie brute ;
- aucun nouveau sous-dossier runtime ;
- aucun ZIP, Base64 ou workflow de reconstruction.

Le premier ordre est : versionner M01, produire A01, versionner M02, produire B01, versionner M03, produire C01, versionner M04, versionner S01a puis produire F01a et F01b, versionner S01c puis produire F01c, versionner M05, produire C16.

Les statuts P et V clôturent la production d’un fichier. Le statut I reste décoché jusqu’à la PR d’intégration concernée.

## Étape 6.2 - Planches de validation

Les assets validés sont assemblés dans les planches G01 à G14b définies dans le registre.

Les planches :

- ne sont pas servies par l’application ;
- utilisent uniquement des assets validés ;
- contrôlent desktop, tablette et mobile ;
- montrent les fallbacks ;
- n’introduisent aucune donnée de production fictive ;
- servent de preuve avant l’intégration d’un lot.

Une PR d’intégration ne démarre que lorsque les fichiers, fallbacks et planches nécessaires à son périmètre sont validés.

## Dossier runtime

Tous les nouveaux assets canoniques P/V sont versionnés à la racine de :

`public/assets/phase-6/`

Ils peuvent y rester avec I décoché jusqu’au raccord du lot 6A à 6E. Aucun nouveau sous-dossier par famille ou projet n’est autorisé.

Les sous-dossiers et prototypes hérités déjà présents dans `main` restent une exception gelée et non canonique. Ils sont remplacés un par un puis supprimés manuellement après contrôle des références. Leur `README.md` et leur `manifest.json` historiques n’attribuent aucun statut.

## PR 6A - Fondations visuelles

Périmètre :

- tokens ;
- typographie autorisée ;
- iconographie P0 ;
- shell ;
- fond ;
- enseigne ;
- navigation ;
- focus ;
- fallbacks ;
- chargement des assets partagés.

Critères : shell utilisable sans image, navigation complète, responsive, contrastes, poids et cache PWA contrôlés.

## PR 6B - Cartes, statistiques et panneaux

Périmètre :

- cartes standard, mise en avant, compacte et liste ;
- fallback C18 ;
- badges ;
- statistiques ;
- panneaux ;
- états chargement, vide, erreur et hors ligne ;
- premières couvertures validées.

Critères : aucune donnée ajoutée, noms longs, archives, favoris, densité compacte, focus, tactile et lazy loading.

## PR 6C - Dashboard et catalogue

Périmètre :

- composition complète du dashboard ;
- catalogue ;
- filtres et recherche ;
- activité synthétique ;
- répartition ;
- nouvelle arrivée ;
- responsive artistique.

Critères : aucun faux compteur, aucune progression, recherche et filtres inchangés, cache et hors ligne préservés.

## PR 6D - Fiches, activité et paramètres

Périmètre :

- fiche projet ;
- hero ;
- métadonnées ;
- détails à la demande ;
- chronologie ;
- paramètres ;
- cache et diagnostics ;
- modales.

Critères : aucun appel GitHub supplémentaire, texte long lisible, modales accessibles, diagnostics copiables et hors ligne complet.

## PR 6E - Mouvement et optimisation

Périmètre :

- micro-interactions ;
- nouvelle arrivée ;
- lueur de synchronisation ;
- textures finales ;
- couvertures supplémentaires ;
- optimisation ;
- suppression manuelle des prototypes remplacés ;
- revue globale.

Critères : mouvement réduit, aucune animation permanente, budgets, LCP, CLS, fonctionnement sans images et cache PWA renouvelé.

## PR corrective

Une PR corrective séparée est recommandée si les revues laissent des P1 ou P2. Elle n’ajoute aucune nouvelle direction artistique.

## Ordre de production des familles

1. versionnement et dérivés prioritaires M01/A01, M02/B01, M03/C01, M04/S01a/F01a-F01b, M04/S01c/F01c et M05/C16 ;
2. variantes de marque et fonds ;
3. matières et lumière P0 ;
4. iconographie P0 ;
5. cadres et panneaux P0 ;
6. F02a à F08c, fichier par fichier ;
7. planches G01 à G03 ;
8. P1 ;
9. P2 et P3 seulement après validation globale.

## Contrôles obligatoires par PR

### Fonctionnel

Routes, recherche, filtres, favoris, synchronisation, détails, activité, paramètres, cache et hors ligne.

### Visuel

320, 390, 768, 1024, 1440 et 1920 px ; densité compacte ; zoom 200 % ; noms longs ; images absentes ; lumière faible et forte.

### Assets

- source canonique disponible ;
- provenance et droits renseignés ;
- fichier présent dans le registre ;
- nom exact ;
- dimensions décodées exactes ;
- format réel ;
- alpha contrôlé ;
- poids publié ;
- fallback testé ;
- nouveaux fichiers canoniques à la racine du dossier runtime et exception héritée inchangée ;
- aucun prototype utilisé comme preuve.

### Accessibilité

Clavier, VoiceOver ou équivalent, focus, contrastes, mouvement réduit, images décoratives, texte alternatif et modales.

### Qualité

`npm ci`, TypeScript strict, ESLint, Vitest, smoke test, build Vite, audit du diff, revue Codex, lecture réelle des fils, correction et résolution des P1/P2.

## Critères de sortie

- identité immédiatement reconnaissable ;
- fidélité à l’esprit de la référence ;
- lisibilité au moins égale à la Phase 5 ;
- aucune donnée fictive ;
- toutes les vues cohérentes ;
- responsive complet ;
- fallbacks complets ;
- mouvement réduit ;
- budgets tenus ou approuvés ;
- aucun secret ni asset distant ;
- aucune régression ;
- registre et documentation à jour ;
- aucun P1 ou P2 ouvert.
