# Roadmap de réalisation

## Ordre obligatoire

0. documentation et décisions ;
1. socle PWA ;
2. intégration GitHub et cache ;
3. dashboard ;
4. catalogue et fiche projet ;
5. activité et paramètres ;
6. identité visuelle et polissage ;
7. validation et release.

## Règle de passage

Une phase ne démarre que si :

- ses prérequis sont fusionnés ;
- ses documents sont à jour ;
- ses critères de sortie sont vérifiables ;
- aucune dette bloquante de la phase précédente n’est cachée.

## Lots recommandés

Chaque phase peut être découpée en plusieurs PR courtes. Éviter une PR unique mêlant architecture, interface, service worker et assets.

## Découpage Phase 6

La Phase 6 suit obligatoirement cet ordre :

1. **6.0 Cadrage documentaire** : direction, bible, assets, budgets, responsive, mouvement et protocole Lovable ;
2. **6.1 Prototype isolé** : shell, cartes et panneaux sur bureau et mobile ;
3. **6A Fondations visuelles** : tokens, marque, shell, navigation et focus ;
4. **6B Composants principaux** : cartes, statistiques, panneaux et fallbacks ;
5. **6C Vues de découverte** : dashboard et catalogue ;
6. **6D Vues de détail** : fiches, activité et paramètres ;
7. **6E Finitions** : mouvement, assets finaux, optimisation et audit global ;
8. **6F Corrections** : lot facultatif réservé aux P1 et P2 de revue.

Les lots de production ne démarrent pas avant validation humaine du prototype 6.1.

## Jalons

- **M0** : documentation validée ;
- **M1** : shell installable ;
- **M2** : données réelles synchronisées ;
- **M3** : dashboard utilisable ;
- **M4** : navigation complète ;
- **M5** : MVP fonctionnel ;
- **M6.0** : cadrage artistique validé ;
- **M6.1** : prototype visuel validé ;
- **M6** : identité visuelle aboutie ;
- **M7** : version 1.0.0 publiée.

## Go ou No-Go Phase 6

No-Go vers l’implémentation si :

- la référence visuelle n’est pas conservée dans le dépôt ;
- la bible visuelle n’est pas validée ;
- le prototype mobile n’existe pas ;
- les budgets d’assets ne sont pas définis ;
- le rôle de Lovable et de GitHub est ambigu ;
- une proposition exige un framework ou un backend ;
- les fallbacks ne sont pas prévus ;
- l’accessibilité est traitée comme une finition.

No-Go vers la Phase 7 si :

- une vue majeure n’est pas alignée ;
- un P1 ou P2 reste ouvert ;
- la performance a régressé sans approbation ;
- le mode hors ligne ou le mouvement réduit est incomplet ;
- des données fictives ont été ajoutées pour embellir.

## Gestion des idées

Les extensions non MVP sont consignées séparément. La roadmap de réalisation n’est pas une liste infinie de souhaits.