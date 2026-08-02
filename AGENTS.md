# Instructions pour les agents de développement

## Mission

Construire La Grange conformément à la documentation. L’application reste un hub personnel de consultation, enrichi d’une administration étroitement limitée à la personnalisation éditoriale de ses propres projets.

## Lecture obligatoire

1. `README.md` ;
2. `ARCHITECTURE.md` ;
3. `docs/INDEX.md` ;
4. le document de phase concerné ;
5. les ADR applicables.

Pour l’étape 6B, lire en plus :

- `docs/02-ux-ui/12-contrat-dashboard-phase-6b.md` ;
- `docs/03-technique/13-personnalisation-github.md` ;
- `docs/05-realisation/11-phase-6b-dashboard-personnalisation.md` ;
- `docs/05-realisation/10-suivi-production-assets-phase-6.md` ;
- `docs/07-decisions/ADR-010-personnalisation-versionnee-via-github.md`.

## Interdictions

- ne jamais placer un token GitHub dans le code, le bundle, une variable Vite publique ou le dépôt ;
- ne pas permettre d’écriture sur un dépôt autre que `La-Grange` ;
- ne pas écrire directement sur `main` depuis l’application ;
- ne pas fusionner automatiquement une PR de personnalisation ;
- ne pas modifier issues, releases, labels, branches de projets ou réglages de dépôt ;
- ne pas inventer de donnée technique ;
- ne pas calculer un avancement depuis les commits, issues ou branches ;
- ne pas transformer La Grange en outil de pilotage ;
- ne pas ajouter de framework UI sans ADR ;
- ne pas rasteriser de texte fonctionnel ;
- ne pas ajouter de fond ou conteneur derrière la grille de cartes ;
- ne pas réintroduire les sections « L’établi », « Prêts à partir » ou le lien « Voir tout l’inventaire » ;
- ne pas produire plusieurs assets sans validation intermédiaire ;
- ne pas intégrer les SVG de la PR historique C01 à C10 comme direction finale ;
- ne pas recréer des étapes futures de Phase 6 sans instruction du propriétaire.

## Règles 6B

- rail gauche fixe sur tablette paysage et bureau ;
- zone principale seule défilante ;
- statistiques HTML superposées à un bandeau WebP unique ;
- cartes directement posées sur le fond général de La Grange ;
- une seule grille continue, sans en-tête de section ;
- cadre matériel en WebP, structure et contenu en HTML/CSS, icônes en SVG ;
- cinq actions alignées : GitHub, application, README, détail, personnalisation ;
- infobulles au survol et au focus ;
- bouton de personnalisation invisible hors session administrateur ;
- avancement manuel facultatif ;
- version manuelle prioritaire, sinon dernière release GitHub ;
- personnalisation enregistrée par PR automatique ;
- tablette paysage et bureau sont les formats d’acceptation.

## Qualité

Avant PR :

- typecheck, lint, tests, build ;
- tests de sécurité du chemin administrateur ;
- contrôle de permissions de la GitHub App ;
- validation des fichiers image ;
- test de conflit de base Git ;
- test sans image, hors ligne, mouvement réduit et zoom 200 % ;
- contrôle 1024, 1366, 1440 et 1920 px ;
- audit du diff et de la documentation ;
- aucun P1 ou P2 ouvert avant fusion.
