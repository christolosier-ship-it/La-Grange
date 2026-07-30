# Protocole de production des assets de la Phase 6

## Objectif

Produire les assets de La Grange sans dérive de périmètre, sans ambiguïté de nommage et sans intégration prématurée.

## Source de vérité

Le seul catalogue autorisé est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Aucun prompt, prototype, fichier existant ou convention implicite ne peut modifier le nom, le format, les dimensions, la transparence, l’usage, le fallback ou la provenance d’un asset sans mise à jour préalable de ce registre.

## Principe

> Un élément, un contrat, une production, une validation. L’intégration vient plus tard, par lot.

## Préparation

Avant de produire un élément :

1. lire sa ligne dans le registre ;
2. vérifier son identifiant ;
3. confirmer que son master ou sa source canonique est versionné ;
4. copier son nom final exact ;
5. relever son format, ses dimensions et sa transparence ;
6. lire son usage, son fallback, sa priorité et sa provenance ;
7. vérifier que l’élément précédent est validé ;
8. vérifier que le champ « Prochain élément autorisé » désigne bien cette ligne.

Un master dont la case R n’est pas cochée ne peut pas servir de source de production.

## Production

L’asset est produit à partir de la bible visuelle et de la source inscrite au registre.

Il ne doit contenir :

- aucune version fictive ;
- aucune progression ;
- aucun statut fonctionnel ;
- aucun bouton ;
- aucune branche, release ou métrique inventée ;
- aucun texte fonctionnel ;
- aucune signature, marque parasite ou filigrane ;
- aucune ressource distante.

Une ligne du registre correspond à un seul fichier. Les variantes de taille, logos, halos ou éléments complémentaires possèdent des lignes séparées.

## Export

L’export respecte exactement :

- le nom du registre ;
- le format ;
- les dimensions ou le `viewBox` ;
- le ratio ;
- la transparence ;
- le budget de poids ;
- l’usage prévu.

Les rasters indiquent leurs dimensions dans leur nom. Les SVG utilisent le nom stable du registre et un `viewBox` exact.

## Provenance et droits

Avant de cocher P, renseigner dans le registre :

- le master ou la source ;
- l’auteur, l’outil ou la méthode de production ;
- le statut des droits d’utilisation ;
- la licence et sa référence lorsqu’elle existe.

La valeur `à renseigner avant P` est bloquante.

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
- lisibilité à la taille CSS prévue ;
- concordance de la provenance et des droits.

Après ces contrôles, cocher P.

## Validation humaine

La validation porte sur :

- fidélité à la direction artistique ;
- qualité de matière ;
- lumière ;
- composition ;
- cohérence avec les assets déjà validés ;
- niveau de détail ;
- absence d’élément trompeur ;
- exploitation future dans l’application.

Après validation, cocher V et mettre à jour le prochain élément autorisé.

Un asset rejeté n’est ni renommé arbitrairement, ni intégré temporairement. Il est corrigé sous le même contrat documentaire.

## Stockage avant intégration

Un asset P et V est conservé comme livrable validé, mais il n’est pas encore raccordé au code. Son statut I reste décoché.

La production se poursuit fichier par fichier jusqu’à réunir :

- les assets nécessaires au lot d’intégration visé ;
- les fallbacks correspondants ;
- les planches documentaires exigées par la roadmap.

## Intégration manuelle par lot

L’intégration démarre uniquement lorsque le document de phase et la roadmap autorisent la PR 6A, 6B, 6C, 6D ou 6E.

Dans cette PR :

1. copier manuellement les fichiers validés dans `public/assets/phase-6/` ;
2. ne créer aucun sous-dossier ;
3. vérifier chaque nom par rapport au registre ;
4. raccorder les fichiers et leurs fallbacks ;
5. contrôler les images bloquées ;
6. mesurer les performances ;
7. exécuter les contrôles responsive, hors ligne et d’accessibilité ;
8. cocher I uniquement pour les fichiers réellement consommés ;
9. lancer la CI et la revue Codex.

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

- production de plusieurs fichiers sans validation intermédiaire ;
- regroupement de plusieurs exports sous un statut unique ;
- dossier runtime avec sous-dossiers ;
- archive ZIP dans le dépôt ;
- contenu Base64 ou fragment temporaire ;
- workflow de reconstruction binaire ;
- dimensions approximatives ;
- nom décidé après génération ;
- fichier intégré directement depuis une sortie brute ;
- texte fonctionnel rasterisé ;
- intégration avant les planches et critères prévus par la roadmap ;
- suppression d’un prototype avant remplacement.

## Fin de la production d’un fichier

Un fichier est produit et validé lorsque :

- sa source canonique est disponible ;
- sa provenance et ses droits sont renseignés ;
- P est coché ;
- V est coché ;
- son nom, son format, ses dimensions et son alpha correspondent au registre ;
- son fallback est défini et contrôlé ;
- son poids est documenté.

I reste décoché jusqu’à la PR d’intégration concernée.

## Ordre de production

L’ordre autorisé est celui de la section finale du registre. Le champ « Prochain élément autorisé » doit être respecté et mis à jour après chaque validation.