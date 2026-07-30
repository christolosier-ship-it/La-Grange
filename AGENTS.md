# Instructions pour les agents de développement

## Mission

Construire La Grange conformément à la documentation. L’application doit rester un hub personnel en lecture seule, simple, fiable et visuellement chaleureux.

## Lecture obligatoire avant modification

1. `README.md` ;
2. `ARCHITECTURE.md` ;
3. `docs/INDEX.md` ;
4. le document de phase concerné dans `docs/05-realisation/` ;
5. les ADR applicables dans `docs/07-decisions/`.

Pour toute intervention Phase 6, lire également :

- `docs/02-ux-ui/10-bible-visuelle-phase-6.md` ;
- `docs/02-ux-ui/11-inventaire-assets-phase-6.md` ;
- `docs/05-realisation/08-phase-6-polissage-visuel.md` ;
- `docs/05-realisation/10-suivi-production-assets-phase-6.md` ;
- `docs/08-generation-ia/13-protocole-production-assets-phase-6.md` ;
- la performance et la checklist Phase 6 référencées dans `docs/INDEX.md`.

Le registre `10-suivi-production-assets-phase-6.md` est l’unique source de vérité pour les noms, formats, dimensions et statuts des assets.

## Interdictions

- ne pas ajouter de backend au MVP ;
- ne pas introduire React, Vue, Angular ou un autre framework sans ADR validé ;
- ne jamais placer un token GitHub dans le code, les variables Vite publiques ou le dépôt ;
- ne pas créer de fonctions de modification GitHub ;
- ne pas afficher de données fictives comme une progression inventée ;
- ne pas transformer La Grange en outil de gestion de tâches ;
- ne pas contourner les limites API par des rafales de requêtes ;
- ne pas injecter du HTML distant non assaini ;
- ne pas ajouter de texte fonctionnel dans un asset raster ;
- ne pas charger une police, une texture ou un asset distant au runtime ;
- ne pas utiliser une animation permanente pour créer de l’ambiance ;
- ne pas masquer une modification métier dans une PR visuelle ;
- ne pas produire plusieurs assets sans validation intermédiaire ;
- ne pas inventer un nom, un format ou une dimension absent du registre ;
- ne pas créer de sous-dossier dans `public/assets/phase-6/` ;
- ne pas intégrer de ZIP, Base64, fragment ou workflow de reconstruction ;
- ne pas considérer un prototype hérité comme un asset validé.

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

- GitHub et la documentation restent la source de vérité ;
- un seul asset est produit, contrôlé puis validé à la fois ;
- le fichier final respecte exactement le nom, le format et les dimensions du registre ;
- les assets runtime sont intégrés manuellement dans le dossier plat `public/assets/phase-6/` ;
- le décor ne modifie ni le rôle, ni les données, ni les états d’un composant ;
- le texte reste en HTML ;
- chaque asset critique possède un fallback CSS ou SVG ;
- le focus reste visible au-dessus des textures ;
- les budgets d’assets sont mesurés et publiés ;
- le mobile, la tablette et le bureau sont conçus comme des compositions distinctes ;
- le mouvement réduit conserve l’état final sans animation décorative ;
- une sortie IA brute est nettoyée, renommée, dimensionnée, compressée et validée avant intégration ;
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
- contrôle des signatures, dimensions et transparences ;
- contrôle des fallbacks ;
- contrôle des contrastes sur les textures finales ;
- contrôle 320, 390, 768, 1024, 1440 et 1920 px selon le lot ;
- zoom 200 % ;
- mouvement réduit ;
- lazy loading ;
- LCP et CLS ;
- revue Codex et interrogation réelle des review threads.

## Définition de terminé

Une tâche n’est terminée que si son comportement nominal, ses erreurs, son état vide, son responsive et son accessibilité sont couverts.

Une tâche Phase 6 n’est pas terminée si elle dépend d’un prototype non canonique, si le registre n’est pas à jour, si le fichier n’a pas son nom ou ses dimensions finales, si elle dégrade le hors ligne, si elle invente une donnée, si elle dépasse les budgets sans justification ou si un P1 ou P2 reste ouvert.