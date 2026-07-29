# Journal de génération

Ce fichier trace les interventions importantes réalisées avec une IA afin de conserver le contexte des décisions et validations.

## Modèle d’entrée

```text
Date :
Phase :
Branche / PR :
Objectif :
Documents lus :
Fichiers modifiés :
Décisions prises :
Tests exécutés :
Résultats :
Limites ou tests non exécutés :
Dette créée :
Prochaine étape :
```

## Règles

Une entrée par PR importante, faits vérifiables uniquement, aucun secret, mention des écarts, ajout avant fusion et complément après revue.

## Entrée initiale

Date : 2026-07-28

Phase : 0 — Documentation

Objectif : définir la documentation d’architecture, produit, UX, technique, qualité, réalisation et déploiement avant le développement.

Décisions : MVP public, lecture seule, sans backend, TypeScript/Vite, sans framework UI, cache IndexedDB, routeur hash et overrides centralisés.

## Phase 3 — Dashboard

Date : 2026-07-29

Branche / PR : `feature/phase-3-dashboard` / PR #8

Objectif : construire le dashboard principal responsive à partir des données réelles de la phase 2, conformément au prototype validé et à `docs/05-realisation/05-phase-3-dashboard.md`.

Documents lus : README, architecture, règles agents, index documentaire, fondations, besoins, parcours, règles métier, spécifications des vues, composants, design system, responsive, animations, accessibilité, architecture technique, modèle de données, stratégies qualité, roadmap, phase 3 et décisions d’architecture.

Fichiers modifiés : feature dashboard, sélecteurs, cartes projets, utilitaires de date, événements applicatifs, styles responsive, shell, tests, README, changelog, contrôle visuel, version et cache PWA.

Décisions prises : quatre statistiques factuelles uniquement ; activité formulée comme détectée ; cartes centrales sans doublon ; rail d’activité synthétique ; fallback déterministe avec initiales et caisse SVG ; aucune dépendance UI ou graphique ; assets et textures finales reportés à la phase 6 ; navigation basse mobile et rail gauche dès la tablette.

Tests exécutés : installation reproductible, TypeScript strict, ESLint, tests Vitest unitaires et d’intégration, smoke test du client de production contre les dépôts publics réels, build Vite production.

Résultats : tous les contrôles sont verts sur le head de code `c1875ada42c580b0fad3313b293aff6081361d3a` ; les états nominal, cache, synchronisation, hors ligne, erreur, inventaire vide, couverture absente, projet nouveau et projet archivé sont couverts.

Limites ou tests non exécutés : aucune capture navigateur automatisée n’a été produite ; le contrôle visuel par format et par état est consigné dans `docs/04-qualite/10-controle-visuel-phase-3.md`. Les couvertures éditoriales finales ne font pas partie de cette phase.

Dette créée : aucune dette fonctionnelle volontaire ; la finition graphique détaillée reste planifiée en phase 6.

Prochaine étape : phase 4, catalogue complet et fiches projets, sans modifier les sélecteurs ni les composants stables du dashboard hors besoin démontré.

## Correctif post-Phase 3 — P1 et P2

Date : 2026-07-29

Branche / PR : `fix/phase-3-p1-p2` / PR #9

Objectif : résoudre les cinq fils P1/P2 laissés ouverts après la fusion de la PR #8 avant tout démarrage de la phase 4.

Fichiers modifiés : synchronisation, routeur, bootstrap, contrôles du dashboard, cartes projets, textes UI centralisés, styles, tests, changelog, version et cache PWA.

Décisions prises : la consultation d’une fiche acquitte et persiste `isNew` ; le snapshot mémoire le plus récent prime sur un cache plus ancien ; une limite GitHub désactive les relances forcées jusqu’à `retryAt` ; les actions externes restent visibles hors ligne mais annoncent la connexion requise ; les libellés d’activité possèdent une source unique.

Tests exécutés : tests ciblés des cinq fils, TypeScript strict, ESLint, suite Vitest complète, smoke test GitHub réel et build Vite production.

Résultats : première passe complète verte avant finalisation documentaire ; validation finale requise sur le head exact avant fusion.

Limites ou tests non exécutés : le comportement d’ouverture hors ligne d’une URL externe dépend du navigateur ; La Grange fournit désormais l’information nécessaire avant l’action.

Dette créée : aucune dette volontaire.

Prochaine étape : résoudre les fils de la PR #8, fusionner la PR #9 après CI finale verte, puis seulement engager la phase 4.

## Phase 4 — Catalogue et fiche projet

Date : 2026-07-29

Branche / PR : `feature/phase-4-catalogue-fiche` / PR #10

Objectif : réaliser le catalogue complet et les fiches projets selon `docs/05-realisation/06-phase-4-fiche-projet.md`, sans élargir le périmètre vers le journal de Phase 5.

Documents lus : ensemble des fondations, besoins, user stories, parcours, règles métier, critères d’acceptation, spécifications de vues et composants, design system, responsive, animations, états, accessibilité, architecture système, modèle de données, intégration GitHub, synchronisation, IndexedDB, routage, erreurs, sécurité, performance, overrides, stratégies et cas de tests, Definition of Done, audit final, roadmap, prompt de Phase 4 et ADR de l’API publique.

Fichiers modifiés : modèle et sélecteurs du catalogue, contrôles accessibles, cartes projets, préférences locales, routeur, store, bootstrap, alias de renommage, client et service de détails ciblés, cache IndexedDB, fiche projet modulaire, styles responsive, tests, smoke test réel, README, changelog, documentation technique, contrôle visuel, version et cache PWA.

Décisions prises : recherche locale sans requête GitHub ; état utile dans le hash ; favoris et mode d’affichage uniquement dans `localStorage` ; trois endpoints de détail au maximum après action explicite ; aucun HTML README distant injecté ; cache détails de 45 minutes ; fiche de base toujours indépendante des détails ; ancienne URL résolue par identifiant stable ; requêtes navigateur simples compatibles Safari ; modules de rendu séparés après audit de maintenabilité.

Tests exécutés : tests purs de recherche, filtres, tri, URL et alias ; tests de composants catalogue et fiche ; tests du client, du mapper et du service de détails ; tests du store et du routeur ; TypeScript strict ; ESLint ; suite Vitest ; smoke test réel de l’inventaire et de la fiche `La-Grange` ; build Vite production.

Résultats : tous les contrôles sont verts sur le head fonctionnel `48c3e8a0778c0a9e01dd11819284ce5aa25ae912`. L’audit final a en plus verrouillé le cooldown des détails GitHub, la validation profonde de `projectDetails`, les préférences corrompues et l’activation d’une fiche directe lorsque le snapshot arrive après le démarrage.

Limites ou tests non exécutés : aucune capture navigateur automatisée n’est produite par le pipeline actuel. Le contrôle responsive et des états est consigné dans `docs/04-qualite/11-controle-visuel-phase-4.md`.

Dette créée : aucune dette fonctionnelle volontaire. Les images éditoriales et textures finales restent planifiées en Phase 6 ; un futur navigateur E2E automatisé améliorerait encore la preuve visuelle.

Prochaine étape : faire passer ce dernier commit documentaire par la CI, vérifier l’absence de P1/P2, fusionner la PR #10, puis contrôler `main` avant Phase 5.
