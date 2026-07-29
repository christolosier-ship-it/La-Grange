# Definition of Done

Une fonction est terminée lorsque toutes les conditions applicables sont satisfaites.

## Produit

- comportement conforme aux règles métier ;
- critères d’acceptation couverts ;
- hors périmètre respecté ;
- données affichées compréhensibles et non fictives ;
- aucune donnée de démonstration ou de prototype dans le chemin de production.

## Code

- TypeScript strict sans contournement injustifié ;
- architecture respectée ;
- pas de duplication importante ;
- erreurs gérées ;
- dépendances justifiées ;
- aucun secret ;
- composants fonctionnels existants conservés lorsqu’ils remplissent déjà leur rôle ;
- aucun framework, backend ou service externe introduit par un prototype visuel.

## Interface

- états chargement, vide, erreur et hors ligne ;
- responsive mobile, tablette et bureau ;
- navigation clavier ;
- contraste ;
- mouvement réduit ;
- textes relus ;
- focus visible au-dessus des textures ;
- zoom à 200 % sans perte ;
- zones tactiles de 44 px minimum ;
- décor inerte et hors de l’arbre d’accessibilité ;
- fonction et hiérarchie conservées sans les assets.

## Phase 6 - Direction artistique

Un lot visuel est terminé lorsque :

- il respecte la direction artistique et la bible validées ;
- le rendu est stylisé, ni photoréaliste ni cartoon ;
- la métaphore de l’atelier ne rend aucune action ambiguë ;
- aucune métrique, progression, release, branche ou donnée fictive n’est ajoutée ;
- aucun texte fonctionnel n’est rasterisé ;
- les matières, cadres et accents utilisent les tokens documentés ;
- la cohérence avec les autres vues est contrôlée ;
- les formats prévus par le lot possèdent des captures comparatives ;
- les écarts à la référence sont explicités ;
- la variante Lovable source, lorsqu’elle existe, est tracée sans devenir la source de vérité.

## Assets

- fichiers inventoriés ;
- rôle et provenance documentés ;
- licence vérifiée lorsque nécessaire ;
- dimensions et poids publiés ;
- format optimisé ;
- ratio réservé ;
- lazy loading appliqué lorsque pertinent ;
- fallback CSS ou SVG testé ;
- aucun asset distant requis ;
- aucun script dans les SVG ;
- aucune sortie IA brute intégrée ;
- fichiers inutilisés supprimés ;
- référence documentaire non incluse dans le runtime.

## Performance

- budgets applicatifs et visuels mesurés ;
- poids CSS et JavaScript avant et après ;
- poids des assets ajouté par famille ;
- nombre de requêtes initiales contrôlé ;
- LCP et CLS mesurés sur le lot concerné ;
- interaction possible dès affichage du cache ;
- cache froid, cache chaud et réseau limité vérifiés lorsque pertinent ;
- images bloquées et assets manquants testés ;
- tout dépassement justifié et approuvé.

## Tests

- unitaires ;
- intégration ;
- E2E critique si parcours utilisateur ;
- build réussi ;
- régression hors ligne vérifiée si concernée ;
- fallbacks visuels ;
- noms et textes longs ;
- densité compacte ;
- mouvement réduit ;
- formats requis par la checklist Phase 6.

## Documentation

- documents métier ou techniques mis à jour ;
- changelog complété ;
- ADR créé si décision structurante ;
- commande et procédure reproductibles ;
- inventaire des assets à jour ;
- captures et mesures jointes ou référencées ;
- éléments repris et rejetés du prototype documentés.

## Revue

- diff relu ;
- commentaires résolus ;
- CI verte ;
- aucun avertissement bloquant ;
- branche à jour avec `main` avant fusion lorsque nécessaire ;
- review Codex demandée ;
- review threads interrogés réellement ;
- chaque P1 et P2 possède une correction et un test de non-régression ;
- seconde interrogation des fils effectuée ;
- fusion verrouillée sur le SHA exact validé ;
- `main` contrôlé après fusion.

## Condition finale Phase 6

Un résultat seulement esthétique ou seulement fonctionnel n’est pas acceptable. La Phase 6 n’est pas terminée si une vue majeure reste dans l’ancien langage, si le fonctionnement sans assets est cassé, si le mode hors ligne ou le mouvement réduit régresse, si un budget dépasse sans approbation ou si un P1 ou P2 reste ouvert.