# Phase 6 - Production des assets - Lot 01

## Statut

**Tentative historique non canonique. Procédure obsolète.**

Ce lot a été produit le 2026-07-29 avant la révision de méthode du 2026-07-30. Il a permis de valider la direction générale, mais ses exports, dimensions, formats, noms, chemins et étapes ne constituent plus une source de vérité.

Le seul registre actif est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Le protocole actif est :

`docs/08-generation-ia/13-protocole-production-assets-phase-6.md`

Aucune procédure décrite historiquement dans ce fichier ne doit être exécutée. Les sections suivantes documentent uniquement les écarts et les décisions de remplacement.

## Décision

Les éléments de ce lot sont traités comme des prototypes hérités :

- ils ne valident aucune case A, R, P, V ou I du registre ;
- ils ne doivent pas être renommés pour sembler conformes ;
- ils ne doivent pas être utilisés comme preuve de dimensions, poids, droits ou budget ;
- ils restent disponibles uniquement jusqu’à leur remplacement ;
- ils seront supprimés manuellement après remplacement et contrôle des références ;
- aucune suppression automatique n’est autorisée ;
- aucun nouveau fichier n’est ajouté dans leurs sous-dossiers.

## Écarts connus

- masters approuvés mais non versionnés sous des noms canoniques ;
- dimensions finales non systématiquement fixées avant production ;
- conventions de nommage incomplètes ;
- plusieurs exports regroupés sous un même identifiant ;
- provenance, droits et budgets individuels non renseignés ;
- variantes de formats trop nombreuses ;
- arborescence avec sous-dossiers ;
- production de plusieurs assets avant validation intermédiaire ;
- tentative de transfert binaire trop complexe ;
- confusion entre master, export produit, validation, présence dans le dépôt et consommation par l’application.

## Directions artistiques conservées

Les cinq directions M01 à M05 restent approuvées par le propriétaire :

- enseigne La Grange ;
- fond d’atelier ;
- cadre de carte vide ;
- carte Gargotte complète ;
- panneau de bienvenue.

Leur case A est validée, mais leur case R reste ouverte tant que les masters ne sont pas versionnés sous les noms canoniques du registre.

Une approbation artistique ne valide aucun export runtime.

## Méthode active de remplacement

Chaque remplacement suit désormais exclusivement le registre et le protocole actifs :

1. lorsqu’une source M ou S est citée, approbation A puis versionnement R de son fichier canonique ;
2. lorsqu’une source S est dérivée, vérification préalable de sa source amont R ;
3. sélection d’une seule ligne exacte du registre ;
4. vérification de toute source M/S citée avec R, de tout asset canonique Phase 6 cité par identifiant avec P/V et de tout fallback hors registre décrit exactement par sa ligne par présence et test sans faux statut ;
5. provenance et droits renseignés ;
6. nom, format, dimensions, alpha, usage, fallback et budget définis avant production ;
7. production d’un seul fichier ;
8. versionnement à la racine de `public/assets/phase-6/`, contrôle technique et statut P ;
9. validation humaine et statut V, avec I encore décoché ;
10. attente des prérequis d’entrée du lot 6A à 6E concerné ;
11. raccord manuel au code et intégration des contrôles CSS dans la PR du lot, puis production des planches d’acceptation et statut I seulement si le fichier est consommé ;
12. suppression manuelle du prototype remplacé après contrôle des références.

## Ordre de remplacement initial

1. versionner M01, puis produire A01 ;
2. versionner M02, puis produire B01 ;
3. versionner M03, puis produire C01 ;
4. versionner M04 ;
5. produire et valider C18 ;
6. versionner S01a à partir de M04, puis produire séparément F01a et F01b ;
7. versionner S01c à partir de M04, puis produire F01c ;
8. versionner M05 ;
9. produire et valider C15, puis produire C16.

Les noms, dimensions, transparences, usages, fallbacks, budgets et provenances à utiliser sont exclusivement ceux du registre actif.
