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

1. **6.0 Cadrage documentaire** : direction, bible, inventaire, budgets, responsive, mouvement, registre et protocole de production ;
2. **6.1 Production manuelle** : un seul asset à la fois, selon le registre ;
3. **6.2 Validation** : planches desktop, tablette, mobile et fallbacks ;
4. **6A Fondations visuelles** : tokens, marque, shell, navigation et focus ;
5. **6B Composants principaux** : cartes, statistiques, panneaux et fallbacks ;
6. **6C Vues de découverte** : dashboard et catalogue ;
7. **6D Vues de détail** : fiches, activité et paramètres ;
8. **6E Finitions** : mouvement, assets finaux, optimisation et audit global ;
9. **Corrections** : lot facultatif réservé aux P1 et P2.

Les lots d’intégration ne démarrent pas avant validation humaine des assets et planches concernés.

## Jalons

- **M0** : documentation validée ;
- **M1** : shell installable ;
- **M2** : données réelles synchronisées ;
- **M3** : dashboard utilisable ;
- **M4** : navigation complète ;
- **M5** : MVP fonctionnel ;
- **M6.0** : cadrage artistique et registre validés ;
- **M6.1** : premiers assets conformes validés ;
- **M6.2** : planches responsive validées ;
- **M6** : identité visuelle aboutie ;
- **M7** : version 1.0.0 publiée.

## Go ou No-Go Phase 6

No-Go vers la production si :

- la référence visuelle n’est pas conservée ;
- la bible visuelle n’est pas validée ;
- le registre ne précise pas le nom et les dimensions du prochain asset ;
- le protocole de production n’est pas à jour ;
- les budgets ne sont pas définis ;
- la racine runtime pour les nouveaux assets et l’exception héritée gelée ne sont pas des règles communes ;
- une proposition exige un framework ou un backend ;
- les fallbacks ne sont pas prévus ;
- l’accessibilité est traitée comme une finition.

No-Go vers l’intégration si :

- l’asset n’est pas inscrit au registre ;
- sa source M/S requise ou sa source amont n’est pas versionnée R ;
- son nom, son format ou ses dimensions diffèrent ;
- il n’est pas contrôlé et versionné P à la racine du dossier runtime ;
- sa validation humaine manque ;
- son fallback n’est pas testé ;
- il provient d’un prototype hérité non remplacé ;
- plusieurs assets ont été produits sans validation intermédiaire.

No-Go vers la Phase 7 si :

- une vue majeure n’est pas alignée ;
- un P1 ou P2 reste ouvert ;
- la performance a régressé sans approbation ;
- le mode hors ligne ou le mouvement réduit est incomplet ;
- des données fictives ont été ajoutées.

## Gestion des idées

Les extensions non MVP sont consignées séparément. La roadmap n’est pas une liste infinie de souhaits.
