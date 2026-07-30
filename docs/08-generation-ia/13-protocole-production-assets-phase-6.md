# Protocole de production des assets de la Phase 6

## Objectif

Produire les assets de La Grange sans dérive de périmètre, sans ambiguïté de nommage et sans intégration prématurée.

## Source de vérité

Le seul catalogue autorisé est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Aucun prompt, prototype, fichier existant ou convention implicite ne peut modifier le nom, le format ou les dimensions d’un asset sans mise à jour préalable de ce registre.

## Principe

> Un asset, un contrat, une validation, puis l’intégration.

## Préparation

Avant de produire un asset :

1. lire sa ligne dans le registre ;
2. vérifier son identifiant ;
3. copier son nom final exact ;
4. relever son format et ses dimensions ;
5. confirmer la présence ou non de transparence ;
6. lire son usage, son fallback et sa priorité ;
7. vérifier que l’asset précédent est validé.

## Production

L’asset est produit à partir de la bible visuelle et du master approuvé.

Il ne doit contenir :

- aucune version fictive ;
- aucune progression ;
- aucun statut fonctionnel ;
- aucun bouton ;
- aucune branche, release ou métrique inventée ;
- aucun texte fonctionnel ;
- aucune signature, marque parasite ou filigrane ;
- aucune ressource distante.

## Export

L’export respecte exactement :

- le nom du registre ;
- le format ;
- les dimensions ;
- le ratio ;
- la transparence ;
- le budget de poids.

Les rasters indiquent leurs dimensions dans leur nom. Les SVG utilisent le nom stable du registre et un `viewBox` exact.

## Contrôle technique

Avant validation humaine, contrôler :

- signature réelle du fichier ;
- dimensions décodées ;
- canal alpha lorsque requis ;
- absence de marge noire ou blanche involontaire ;
- absence de texte fonctionnel ;
- absence de script ou ressource distante dans un SVG ;
- poids réel ;
- rendu sur fond sombre et clair ;
- fallback avec l’asset bloqué ;
- lisibilité à la taille CSS prévue.

## Validation humaine

La validation porte sur :

- fidélité à la direction artistique ;
- qualité de matière ;
- lumière ;
- composition ;
- cohérence avec les assets déjà validés ;
- niveau de détail ;
- absence d’élément trompeur ;
- exploitation réelle dans l’application.

Un asset rejeté n’est ni renommé arbitrairement, ni intégré temporairement. Il est corrigé sous le même contrat documentaire.

## Intégration manuelle

Après validation :

1. copier le fichier dans `public/assets/phase-6/` ;
2. ne créer aucun sous-dossier ;
3. vérifier que le nom est strictement identique au registre ;
4. raccorder le fichier au code dans une branche dédiée ;
5. tester son fallback ;
6. mettre à jour les statuts P, V et I ;
7. mesurer les performances ;
8. lancer la CI et la revue.

## Prototypes hérités

Les fichiers issus des premières tentatives sont non canoniques lorsqu’ils ne respectent pas le registre.

Règles :

- ne pas les utiliser comme preuve de validation ;
- ne pas les renommer pour les faire correspondre artificiellement ;
- ne pas les supprimer automatiquement ;
- les conserver seulement jusqu’au remplacement ;
- les supprimer manuellement après intégration du fichier conforme ;
- contrôler qu’aucune référence de code ne subsiste avant suppression.

## Interdictions

- production de plusieurs assets sans validation intermédiaire ;
- dossier runtime avec sous-dossiers ;
- archive ZIP dans le dépôt ;
- contenu Base64 ou fragment temporaire ;
- workflow de reconstruction binaire ;
- dimensions approximatives ;
- nom décidé après génération ;
- fichier intégré directement depuis une sortie brute ;
- texte fonctionnel rasterisé ;
- suppression d’un prototype avant remplacement.

## Fin d’un asset

Un asset est terminé uniquement lorsque :

- P est coché ;
- V est coché ;
- I est coché si son lot d’intégration est commencé ;
- son nom et ses dimensions correspondent au registre ;
- son fallback fonctionne ;
- son poids est documenté ;
- aucune référence héritée ne crée de conflit.

## Ordre de production

L’ordre autorisé est celui de la section finale du registre. Le champ « Prochain asset autorisé » doit être respecté et mis à jour après chaque validation.