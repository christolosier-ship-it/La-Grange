# Definition of Done

Une fonction ou un lot est terminé lorsque toutes les conditions applicables sont satisfaites.

## Produit

- comportement conforme aux règles métier ;
- données factuelles distinguées des données éditoriales ;
- avancement explicitement manuel ;
- version conforme à la priorité documentée ;
- aucune métrique inventée ;
- aucune fonctionnalité future glissée dans le lot.

## Code

- TypeScript strict ;
- architecture et frontières respectées ;
- erreurs gérées ;
- dépendances justifiées ;
- aucun secret ;
- aucun jeton GitHub dans le navigateur ;
- aucune écriture directe sur `main` ;
- logique d’administration isolée de la consultation publique.

## Interface 6B

- rail gauche fixe ;
- contenu principal seul défilant ;
- bandeau de statistiques WebP unique ;
- statistiques en HTML ;
- une grille continue ;
- aucun en-tête de section ;
- aucun lien redondant « Voir tout » ;
- aucun rail droit ;
- aucun panneau ou voile derrière les cartes ;
- cinq actions alignées ;
- infobulles au survol et au focus ;
- modale accessible ;
- bouton de personnalisation absent hors admin.

## Carte projet

- couverture ou fallback ;
- bannière de style ;
- version ;
- description ;
- dernière activité ;
- progression facultative ;
- GitHub ;
- application si disponible ;
- README si disponible ;
- détail ;
- personnalisation pour l’administrateur.

Tous les textes et données restent en HTML. Le skin ne porte aucun statut ni bouton rasterisé.

## Personnalisation

- schéma validé ;
- aperçu fidèle ;
- progression bornée ;
- couleurs contrôlées ;
- couverture recadrée et réencodée ;
- session administrateur vérifiée ;
- liste blanche des fichiers ;
- branche et PR créées ;
- aucune fusion automatique ;
- état de publication compréhensible ;
- conflits Git gérés.

## Accessibilité

- navigation clavier ;
- focus visible ;
- infobulles accessibles ;
- cible de 44 px minimum ;
- contraste mesuré sur le rendu final ;
- zoom 200 % ;
- lecteur d’écran ;
- modale avec fond inerte et restauration du focus ;
- aucune information essentielle au survol seulement ;
- fonctionnement avec images bloquées.

## Performance et PWA

- budgets mesurés ;
- couvertures lazy loaded ;
- ratios réservés ;
- LCP et CLS contrôlés ;
- consultation cache-first ;
- mode hors ligne ;
- mise à jour du service worker ;
- code d’administration hors chemin critique autant que possible.

## Documentation

- documents produit, UX, technique et qualité à jour ;
- ADR si décision structurante ;
- registre des assets exact ;
- changelog ;
- preuves et captures référencées ;
- Phase 7 non lancée avant clôture explicite de toute la Phase 6.

## Revue

- diff relu ;
- CI verte ;
- contrôles manuels exécutés ;
- aucun P1 ou P2 ouvert ;
- branche à jour ;
- `main` contrôlé après fusion.
