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
- `docs/07-decisions/ADR-009-github-source-verite-prototypage-visuel.md` ;
- `docs/08-generation-ia/13-protocole-lovable-phase-6.md`.

En cas de conflit, applique l’ordre de priorité de `docs/INDEX.md`. Ne tranche jamais silencieusement.

## Cible

Transformer l’interface fonctionnelle actuelle en atelier stylisé :

- bois sombre ;
- métal patiné ;
- papier calme ;
- lumière ambrée ;
- cartes comme caisses ou cadres ;
- structure riche mais organisée ;
- identités de projets plus colorées que le shell.

Le rendu attendu est stylisé, illustré et tactile. Il n’est ni photoréaliste, ni cartoon.

La référence visuelle est :

`docs/assets/phase-6/reference-dashboard-grange.webp`

Elle fixe l’ambiance et la composition générale. Elle n’est pas une maquette pixel-perfect.

## Principe

> L’utilisateur entre dans un atelier, mais il utilise toujours une interface.

Le décor ne doit jamais réduire la lisibilité, masquer un état, modifier une donnée ou rendre une action ambiguë.

## Source de vérité

GitHub reste l’unique source de vérité. Lovable peut être utilisé uniquement conformément au protocole documenté.

Aucune modification directe de `main` n’est autorisée. Toute implémentation utilise une branche dédiée, une PR, la CI et une fusion verrouillée sur le SHA validé.

## Ordre de réalisation

Respecte le découpage obligatoire :

1. prototype Lovable isolé ;
2. validation humaine de la direction ;
3. PR 6A fondations visuelles ;
4. PR 6B cartes, statistiques et panneaux ;
5. PR 6C dashboard et catalogue ;
6. PR 6D fiches, activité et paramètres ;
7. PR 6E mouvement, assets finaux et optimisation ;
8. PR corrective si nécessaire.

Ne lance pas tous les lots simultanément.

## Prototype Lovable

Le premier prototype couvre uniquement :

- shell ;
- enseigne ;
- navigation ;
- poutre de statistiques ;
- une carte standard ;
- une carte compacte ;
- un fallback ;
- un panneau secondaire ;
- un focus ;
- 1440 px ;
- 390 px.

Deux variantes maximum. Le prototype ne contient aucune logique GitHub et n’est jamais fusionné directement.

## Contraintes de production

- TypeScript strict ;
- HTML sémantique ;
- CSS natif ;
- aucun framework ;
- aucun backend ;
- aucun token ;
- aucune écriture GitHub ;
- aucun appel GitHub supplémentaire pour embellir ;
- aucun HTML distant ;
- aucun asset distant requis ;
- aucune donnée fictive ;
- aucun texte fonctionnel dans une image ;
- aucune progression inventée ;
- aucune animation permanente ;
- aucun son ;
- aucune particule continue ;
- aucun scroll horizontal global ;
- aucune fonction perdue selon la taille ;
- fallback intact sans asset ;
- cache-first et hors ligne préservés.

## Assets

- AVIF ou WebP pour les grandes images ;
- SVG local pour icônes et cadres ;
- PNG uniquement si nécessaire ;
- dimensions explicites ;
- poids publié ;
- provenance documentée ;
- licence vérifiée ;
- aucune sortie IA brute intégrée ;
- aucune donnée métier dessinée ;
- lazy loading ;
- variantes de taille lorsque le gain est réel ;
- suppression des assets inutilisés.

Respecte les budgets de `docs/03-technique/11-performance.md` et `docs/02-ux-ui/11-inventaire-assets-phase-6.md`.

## Accessibilité

- WCAG 2.2 AA autant que possible ;
- focus visible de 2 px minimum ;
- contraste mesuré après texture et lumière ;
- zones tactiles de 44 px ;
- zoom 200 % ;
- clavier complet ;
- VoiceOver iOS ou contrôle équivalent ;
- images décoratives avec alt vide ;
- couvertures informatives avec alt concis ;
- modales avec fond inerte et restauration du focus ;
- textes et icônes pour les états ;
- mouvement réduit complet ;
- contrôle du mode contraste accru lorsque disponible.

## Mouvement

Autorisé :

- micro-interaction 100 à 180 ms ;
- transition de panneau 180 à 280 ms ;
- entrée narrative rare 300 à 450 ms ;
- lueur courte de synchronisation ;
- entrée d’une nouvelle caisse ;
- relèvement léger au survol ;
- enfoncement court au pressé.

Interdit :

- parallaxe permanente ;
- particules ;
- clignotement ;
- oscillation continue ;
- grande surface animée ;
- déplacement de contenu après interaction ;
- mouvement requis pour comprendre un état.

## Responsive

Contrôle obligatoire :

- 320 px ;
- 390 px ;
- 768 px ;
- 1024 px ;
- 1440 px ;
- 1920 px ;
- zoom 200 % ;
- portrait et paysage ;
- densité compacte ;
- mouvement réduit.

Le mobile devient un établi compact. La tablette paysage est la cible de confort. Le bureau présente la scène complète. Le décor est réduit avant le contenu.

## Tests et mesures

Pour chaque PR :

- `npm ci` ;
- `npm run typecheck` ;
- `npm run lint` ;
- `npm test` ;
- smoke tests existants ;
- `npm run build` ;
- poids CSS avant et après ;
- poids des assets ;
- requêtes initiales ;
- LCP ;
- CLS ;
- cache froid et chaud ;
- hors ligne ;
- images bloquées ;
- fallback ;
- responsive ;
- clavier ;
- contraste ;
- mouvement réduit.

Ne désactive aucune règle ni aucun test pour obtenir une CI verte.

## Discipline de revue

Pour chaque PR :

1. relire le diff complet ;
2. contrôler le périmètre ;
3. vérifier l’absence de secret et de donnée fictive ;
4. mesurer les budgets ;
5. exécuter la CI complète ;
6. sortir la PR du brouillon ;
7. demander une revue Codex ;
8. interroger réellement les review threads ;
9. corriger chaque P1 et P2 avec test ;
10. relancer toute la CI ;
11. résoudre formellement les fils ;
12. interroger une seconde fois les fils ;
13. fusionner avec verrouillage sur le SHA exact ;
14. contrôler directement `main`.

Ne déclare jamais une PR sans P1 ou P2 avant d’avoir interrogé les fils.

## Rapport de fin de lot

Fournir :

- périmètre livré ;
- composants modifiés ;
- assets ajoutés ;
- poids ;
- mesures ;
- formats contrôlés ;
- tests ;
- corrections de revue ;
- PR ;
- SHA fusionné ;
- version visible ;
- cache PWA ;
- limites restantes.

## Fin de Phase 6

La Phase 6 est terminée seulement lorsque toutes les vues sont cohérentes, tous les fallbacks fonctionnent, les budgets sont validés, aucun P1 ou P2 n’est ouvert et la checklist Phase 6 est clôturée.

Ne commence pas la Phase 7 avant ce point.