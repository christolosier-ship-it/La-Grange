# Prompt Phase 6 - Identité visuelle et polissage

## Préambule

Tu travailles sur `christolosier-ship-it/La-Grange` après la fusion complète des Phases 1 à 5.

La Phase 6 est exclusivement visuelle. Elle ne doit ajouter aucune fonction métier, aucune donnée GitHub, aucun backend et aucune métrique fictive.

Avant toute modification, lis :

- `README.md` ;
- `ARCHITECTURE.md` ;
- `AGENTS.md` ;
- `docs/INDEX.md` ;
- les ADR applicables ;
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
- `docs/05-realisation/08-phase-6-polissage-visuel.md` ;
- `docs/05-realisation/10-suivi-production-assets-phase-6.md` ;
- `docs/07-decisions/ADR-009-github-source-verite-production-assets.md` ;
- `docs/08-generation-ia/13-protocole-production-assets-phase-6.md`.

En cas de conflit, applique `docs/INDEX.md`. Pour les assets, le registre `10-suivi-production-assets-phase-6.md` prime sur les identifiants, noms, formats, dimensions, transparences, usages, fallbacks, budgets, provenances, droits, dépendances, lots et statuts.

## Cible

Transformer l’interface fonctionnelle en atelier stylisé :

- bois sombre ;
- métal patiné ;
- papier calme ;
- lumière ambrée ;
- cartes comme caisses ou cadres ;
- structure riche mais organisée ;
- identités de projets plus colorées que le shell.

Le rendu est stylisé, illustré et tactile, ni photoréaliste ni cartoon.

Référence :

`docs/assets/phase-6/reference-dashboard-grange.webp`

Elle fixe l’ambiance et la composition générale, pas une maquette pixel-perfect.

## Principe

> L’utilisateur entre dans un atelier, mais il utilise toujours une interface.

Le décor ne réduit jamais la lisibilité, ne masque aucun état, ne modifie aucune donnée et ne rend aucune action ambiguë.

## Source de vérité

GitHub et la documentation sont les sources de vérité.

Le registre fixe chaque asset. Aucune production n’est autorisée à partir d’une convention implicite, d’un prototype hérité ou d’une dimension approximative.

## Ordre obligatoire

1. lire le prochain élément autorisé dans le registre ;
2. s’il s’agit d’une source M/S, vérifier sa source amont, obtenir A et versionner le fichier canonique avant R ;
3. s’il s’agit d’un asset, vérifier la source ou le dérivé requis par sa ligne, puis produire uniquement ce fichier ;
4. exporter exactement au nom, format, dimensions, alpha et budget prévus ;
5. contrôler puis versionner l’asset à la racine de `public/assets/phase-6/` avant P ;
6. obtenir la validation humaine avant V, avec I encore décoché ;
7. mettre à jour le registre et passer au suivant ;
8. produire les planches de validation ;
9. raccorder les assets au code et cocher I dans les lots 6A à 6E.

Ne lance jamais plusieurs assets simultanément sans validation intermédiaire.

## Production des assets

Pour chaque asset :

- reprendre son identifiant ;
- utiliser son nom final exact ;
- respecter son format ;
- respecter ses dimensions ou son `viewBox` ;
- respecter la transparence attendue ;
- conserver les textes fonctionnels hors image ;
- documenter le poids ;
- tester le fallback ;
- conserver la provenance ;
- vérifier le rendu sur fond sombre et clair.

Interdictions :

- sortie brute intégrée directement ;
- texte fonctionnel rasterisé ;
- version, progression, branche, release ou conflit fictif ;
- filigrane ;
- asset distant ;
- nom décidé après génération ;
- dimensions modifiées sans révision du registre ;
- ZIP, Base64, fragments ou workflow de reconstruction ;
- nouveau sous-dossier dans `public/assets/phase-6/` ou ajout dans un sous-dossier hérité.

## Dossier runtime

Tous les nouveaux assets canoniques contrôlés sont versionnés à la racine de :

`public/assets/phase-6/`

Ils peuvent y conserver P/V avec I décoché jusqu’au raccord du lot concerné. Aucune famille ou projet ne reçoit de nouveau sous-dossier. Les sous-dossiers historiques restent une exception gelée sans statut.

## Prototypes hérités

Les fichiers des premières tentatives ne sont pas canoniques lorsqu’ils ne respectent pas le registre.

- ne pas les utiliser comme preuve ;
- ne pas les renommer artificiellement ;
- ne pas les supprimer automatiquement ;
- les remplacer un par un ;
- les supprimer manuellement après contrôle des références.

## Contraintes de production

- TypeScript strict ;
- HTML sémantique ;
- CSS natif ;
- aucun framework ;
- aucun backend ;
- aucun token ;
- aucune écriture GitHub depuis l’application ;
- aucun appel GitHub supplémentaire pour embellir ;
- aucun HTML distant ;
- aucun asset distant ;
- aucune donnée fictive ;
- aucune animation permanente ;
- aucun son ;
- aucune particule continue ;
- aucun scroll horizontal global ;
- aucune fonction perdue selon la taille ;
- fallback intact sans asset ;
- cache-first et hors ligne préservés.

## Accessibilité

- WCAG 2.2 AA autant que possible ;
- focus visible de 2 px minimum ;
- contraste mesuré après texture et lumière ;
- zones tactiles de 44 px ;
- zoom 200 % ;
- clavier complet ;
- VoiceOver iOS ou équivalent ;
- images décoratives avec alt vide ;
- couvertures informatives avec alt concis ;
- modales avec fond inerte et restauration du focus ;
- textes et icônes pour les états ;
- mouvement réduit complet.

## Mouvement

Autorisé : micro-interactions courtes, transitions de panneau, entrée narrative rare, lueur courte et relèvement léger.

Interdit : parallaxe permanente, particules, clignotement, oscillation continue, grande surface animée, déplacement de contenu et mouvement nécessaire à la compréhension.

## Responsive

Contrôle obligatoire : 320, 390, 768, 1024, 1440 et 1920 px ; zoom 200 % ; portrait et paysage ; densité compacte ; mouvement réduit.

Le mobile devient un établi compact. La tablette paysage est la cible de confort. Le bureau présente la scène complète. Le décor est réduit avant le contenu.

## Lots d’intégration

- 6A : fondations visuelles ;
- 6B : cartes, statistiques et panneaux ;
- 6C : dashboard et catalogue ;
- 6D : fiches, activité et paramètres ;
- 6E : mouvement, optimisation et suppression des prototypes remplacés ;
- lot correctif : P1 et P2 uniquement.

## Tests et mesures

Pour chaque PR :

- `npm ci` ;
- `npm run typecheck` ;
- `npm run lint` ;
- `npm test` ;
- smoke tests ;
- `npm run build` ;
- poids CSS et assets ;
- signatures et dimensions des fichiers ;
- requêtes initiales ;
- LCP et CLS ;
- cache froid et chaud ;
- hors ligne ;
- images bloquées ;
- fallbacks ;
- responsive ;
- clavier ;
- contraste ;
- mouvement réduit.

Ne désactive aucune règle ni aucun test.

## Discipline de revue

1. relire le diff ;
2. contrôler le périmètre ;
3. vérifier le registre ;
4. vérifier l’absence de secret et de donnée fictive ;
5. mesurer les budgets ;
6. exécuter la CI ;
7. demander une revue Codex ;
8. interroger réellement les fils ;
9. corriger chaque P1 et P2 avec test ;
10. relancer la CI ;
11. résoudre les fils ;
12. interroger une seconde fois ;
13. fusionner avec verrouillage sur le SHA exact ;
14. contrôler `main`.

## Rapport de fin de lot

Fournir : périmètre, composants, assets, noms, dimensions, poids, tests, corrections de revue, PR, SHA fusionné, version visible, cache PWA et limites restantes.

## Fin de Phase 6

La Phase 6 est terminée lorsque toutes les vues sont cohérentes, les fallbacks fonctionnent, les budgets sont validés, le registre est clôturé et aucun P1 ou P2 n’est ouvert.
