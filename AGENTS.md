# Instructions pour les agents de développement

## Mission

Construire La Grange conformément à la documentation. L’application doit rester un hub personnel en lecture seule, simple, fiable et visuellement chaleureux.

## Lecture obligatoire avant modification

1. `README.md` ;
2. `ARCHITECTURE.md` ;
3. `docs/INDEX.md` ;
4. le document de phase concerné dans `docs/05-realisation/` ;
5. les ADR applicables dans `docs/07-decisions/`.

## Interdictions

- ne pas ajouter de backend au MVP ;
- ne pas introduire React, Vue, Angular ou un autre framework sans ADR validé ;
- ne jamais placer un token GitHub dans le code, les variables Vite publiques ou le dépôt ;
- ne pas créer de fonctions de modification GitHub ;
- ne pas afficher de données fictives comme une progression inventée ;
- ne pas transformer La Grange en outil de gestion de tâches ;
- ne pas contourner les limites API par des rafales de requêtes ;
- ne pas injecter du HTML distant non assaini.

## Règles de code

- TypeScript strict ;
- modules courts et à responsabilité unique ;
- logique métier indépendante du DOM ;
- fonctions pures pour mapping, tri, filtre et calcul d’état ;
- textes UI centralisés lorsque réutilisés ;
- CSS basé sur les tokens du design system ;
- composants accessibles au clavier ;
- pas de dépendance sans justification documentée.

## Qualité obligatoire

Avant toute PR :

- typecheck ;
- tests unitaires ;
- tests d’intégration concernés ;
- build de production ;
- vérification mobile, tablette et bureau ;
- test hors ligne si le cache ou le service worker change ;
- mise à jour du changelog et de la documentation.

## Définition de terminé

Une tâche n’est terminée que si son comportement nominal, ses erreurs, son état vide, son responsive et son accessibilité sont couverts. Un résultat seulement esthétique ou seulement fonctionnel n’est pas acceptable.
