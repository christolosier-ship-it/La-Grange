# Protocole de production des assets de la Phase 6

## Objectif

Produire les assets de La Grange sans dérive de périmètre, ambiguïté de nommage ou intégration prématurée.

## Source de vérité

Le seul catalogue autorisé est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Aucun prompt, prototype, fichier existant ou convention implicite ne modifie le nom, le format, les dimensions, la transparence, l’usage, le fallback, le budget, la provenance ou les droits sans mise à jour préalable du registre.

## Principe

> Un élément, un contrat, une production, une validation. La consommation par l’application vient ensuite, par lot.

## Trois états distincts

1. **Source canonique** : master M ou source projet S, approuvé A et versionné R dans `docs/assets/phase-6/`.
2. **Asset produit** : fichier P puis V, versionné à la racine de `public/assets/phase-6/`, mais pas nécessairement consommé.
3. **Asset intégré** : fichier réellement raccordé au code, avec I coché dans une PR 6A à 6E.

La présence à la racine de `public/assets/phase-6/` ne vaut donc pas intégration fonctionnelle.

## Exception transitoire des prototypes hérités

Les sous-dossiers historiques `brand/`, `components/`, `panels/`, `projects/` et `shell/` restent temporairement présents jusqu’au remplacement individuel de leurs fichiers.

- aucun nouveau fichier n’y est ajouté ;
- aucun fichier canonique n’y est produit ;
- ils ne valident aucun statut ;
- leur suppression reste manuelle après remplacement et contrôle des références.

## Préparation d’un master ou d’une source

Avant de cocher R :

1. lire la ligne M ou S ;
2. utiliser le nom final exact ;
3. respecter format, dimensions, alpha et budget ;
4. renseigner auteur, outil ou méthode, droits et licence éventuelle ;
5. placer le fichier à plat dans `docs/assets/phase-6/` ;
6. obtenir l’approbation humaine A ;
7. vérifier la présence versionnée puis cocher R.

Une valeur `à confirmer avant R` est bloquante.

## Préparation d’un asset

Avant de produire :

1. lire sa ligne dans le registre ;
2. vérifier son identifiant ;
3. confirmer que la source M, S ou l’asset dérivé est versionné ;
4. copier le nom final exact ;
5. relever format, dimensions, alpha, usage, fallback et budget ;
6. vérifier que l’élément précédent est validé ;
7. vérifier que le champ « Prochain élément autorisé » désigne cette production.

## Production

Une ligne correspond à un seul fichier. Les variantes de taille, logos, halos et éléments complémentaires ont des lignes séparées.

Le fichier ne contient :

- aucune version fictive ;
- aucune progression ;
- aucun statut fonctionnel ;
- aucun bouton ;
- aucune branche, release ou métrique inventée ;
- aucun texte fonctionnel ;
- aucune signature, marque parasite ou filigrane ;
- aucune ressource distante.

## Export et budget

L’export respecte exactement :

- le nom ;
- le format ;
- les dimensions ou le `viewBox` ;
- le ratio ;
- la transparence ;
- l’usage ;
- le budget individuel.

Un dépassement n’est pas accepté silencieusement. Il est mesuré, justifié et approuvé avant P.

## Provenance et droits

Avant P, la colonne `Source / droits` précise :

- le master, la source ou l’asset dérivé ;
- l’auteur, l’outil ou la méthode ;
- le statut des droits d’utilisation ;
- la licence et sa référence lorsqu’elle existe.

La valeur `à renseigner avant P` est bloquante. Les icônes, y compris les marques externes, possèdent leur propre champ de provenance.

## Contrôle technique

Avant P :

- signature réelle ;
- dimensions décodées ;
- canal alpha ;
- absence de marge involontaire ;
- absence de texte fonctionnel ;
- SVG sans script ni ressource distante ;
- poids réel ;
- budget respecté ;
- rendu sur fond sombre et clair ;
- fallback avec fichier bloqué ;
- lisibilité à la taille CSS ;
- provenance et droits cohérents.

Après contrôle, placer le fichier à plat dans `public/assets/phase-6/`, le versionner sous son nom final puis cocher P.

## Validation humaine

La validation porte sur :

- fidélité à la direction artistique ;
- matière et lumière ;
- composition ;
- cohérence avec les fichiers déjà validés ;
- niveau de détail ;
- absence d’élément trompeur ;
- exploitation prévue dans l’application.

Après validation, cocher V et mettre à jour le prochain élément autorisé. I reste décoché.

## Planches documentaires

Les planches G utilisent uniquement des assets P et V. Elles sont placées à plat dans `docs/assets/phase-6/` et ne sont jamais servies par l’application.

Elles vérifient les formats, les fallbacks, les contenus longs, le zoom, la densité, le mouvement réduit et la lumière selon le registre.

## Autorisation des lots 6A à 6E

La matrice exacte du registre énumère pour chaque lot :

- les sources R requises ;
- les assets P et V requis ;
- les contrôles CSS ;
- les planches V requises.

Un lot ne démarre pas tant qu’une seule ligne requise manque.

## Intégration manuelle par lot

Dans la PR autorisée :

1. vérifier que les fichiers sont déjà présents à la racine de `public/assets/phase-6/` ;
2. ne créer aucun nouveau sous-dossier ;
3. raccorder les fichiers et leurs fallbacks ;
4. contrôler les images bloquées ;
5. mesurer les performances ;
6. tester responsive, hors ligne et accessibilité ;
7. cocher I uniquement pour les fichiers réellement consommés ;
8. lancer la CI et la revue Codex.

## Contrôles CSS sans fichier

B06, C05 et C29 sont des tâches CSS, pas des assets. Ils ne reçoivent ni P ni V. Leur état est suivi dans la table dédiée du registre et dans le lot d’intégration correspondant.

## Interdictions

- produire plusieurs fichiers sans validation intermédiaire ;
- regrouper plusieurs exports sous un statut unique ;
- créer un nouveau sous-dossier runtime ;
- ajouter un fichier dans un sous-dossier hérité ;
- intégrer un ZIP, du Base64 ou un fragment temporaire ;
- utiliser un workflow de reconstruction binaire ;
- utiliser des dimensions approximatives ;
- décider le nom après génération ;
- intégrer une sortie brute ;
- rasteriser du texte fonctionnel ;
- démarrer un lot avant sa matrice de prérequis ;
- supprimer un prototype avant remplacement.

## Fin d’un fichier

Un asset est produit et validé lorsque :

- sa source canonique est R ;
- sa provenance et ses droits sont renseignés ;
- son budget est respecté ou approuvé ;
- P et V sont cochés ;
- son fichier exact est présent à la racine du dossier ;
- son nom, format, dimensions et alpha correspondent ;
- son fallback est défini et contrôlé.

I reste décoché jusqu’à la PR d’intégration concernée.

## Ordre de production

L’ordre autorisé est celui de la section finale du registre. Le champ « Prochain élément autorisé » est mis à jour après chaque validation.