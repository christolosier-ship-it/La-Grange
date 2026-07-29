# Instructions pour les agents de développement

## Mission

Construire La Grange conformément à la documentation. L’application doit rester un hub personnel en lecture seule, simple, fiable et visuellement chaleureux.

## Lecture obligatoire avant modification

1. `README.md` ;
2. `ARCHITECTURE.md` ;
3. `docs/INDEX.md` ;
4. le document de phase concerné dans `docs/05-realisation/` ;
5. les ADR applicables dans `docs/07-decisions/`.

Pour toute intervention Phase 6, lire également la bible visuelle, l’inventaire des assets, le responsive, les animations, la performance et la checklist Phase 6 référencés dans `docs/INDEX.md`.

## Interdictions

- ne pas ajouter de backend au MVP ;
- ne pas introduire React, Vue, Angular ou un autre framework sans ADR validé ;
- ne jamais placer un token GitHub dans le code, les variables Vite publiques ou le dépôt ;
- ne pas créer de fonctions de modification GitHub ;
- ne pas afficher de données fictives comme une progression inventée ;
- ne pas transformer La Grange en outil de gestion de tâches ;
- ne pas contourner les limites API par des rafales de requêtes ;
- ne pas injecter du HTML distant non assaini ;
- ne pas intégrer un prototype Lovable directement dans `main` ;
- ne pas ajouter de texte fonctionnel dans un asset raster ;
- ne pas charger une police, une texture ou un asset distant au runtime ;
- ne pas utiliser une animation permanente pour créer de l’ambiance ;
- ne pas masquer une modification métier dans une PR visuelle.

## Règles de code

- TypeScript strict ;
- modules courts et à responsabilité unique ;
- logique métier indépendante du DOM ;
- fonctions pures pour mapping, tri, filtre et calcul d’état ;
- textes UI centralisés lorsque réutilisés ;
- CSS basé sur les tokens du design system ;
- composants accessibles au clavier ;
- pas de dépendance sans justification documentée.

## Règles visuelles Phase 6

- GitHub reste la source de vérité ;
- Lovable est un environnement de plan et de prototype isolé ;
- le décor ne modifie ni le rôle, ni les données, ni les états d’un composant ;
- le texte reste en HTML ;
- chaque asset critique possède un fallback CSS ou SVG ;
- le focus reste visible au-dessus des textures ;
- les budgets d’assets sont mesurés et publiés ;
- le mobile, la tablette et le bureau sont conçus comme des compositions distinctes ;
- le mouvement réduit conserve l’état final sans translation ni animation décorative ;
- les données de démonstration de Lovable ne sont jamais copiées en production ;
- une sortie IA brute est optimisée, inventoriée et validée avant intégration ;
- les objets décoratifs sont inertes et hors de l’arbre d’accessibilité.

## Qualité obligatoire

Avant toute PR :

- typecheck ;
- tests unitaires ;
- tests d’intégration concernés ;
- build de production ;
- vérification mobile, tablette et bureau ;
- test hors ligne si le cache ou le service worker change ;
- mise à jour du changelog et de la documentation.

Pour une PR Phase 6, ajouter :

- poids CSS avant et après ;
- poids des nouveaux assets ;
- contrôle des fallbacks ;
- contrôle des contrastes sur les textures finales ;
- contrôle 320, 390, 768, 1024, 1440 et 1920 px selon le lot ;
- zoom 200 % ;
- mouvement réduit ;
- lazy loading ;
- LCP et CLS ;
- revue Codex et interrogation réelle des review threads.

## Définition de terminé

Une tâche n’est terminée que si son comportement nominal, ses erreurs, son état vide, son responsive et son accessibilité sont couverts. Un résultat seulement esthétique ou seulement fonctionnel n’est pas acceptable.

Une tâche Phase 6 n’est pas terminée si elle fonctionne uniquement avec les assets présents, si elle dégrade le hors ligne, si elle invente une donnée, si elle dépasse les budgets sans justification ou si un P1 ou P2 reste ouvert.