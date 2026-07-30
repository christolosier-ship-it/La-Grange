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

Cette exception est définie par l’ADR-009 révisé et ne remet pas en cause la cible plate pour tous les nouveaux fichiers.

## Préparation d’un master ou d’une source

Avant de cocher R :

1. lire la ligne M ou S ;
2. vérifier que toute source amont citée est elle-même R, notamment M04 avant S01a et S01c ;
3. utiliser le nom final exact ;
4. respecter format, dimensions, alpha et budget ;
5. renseigner auteur, outil ou méthode, droits et licence éventuelle ;
6. placer le fichier à plat dans `docs/assets/phase-6/` ;
7. obtenir l’approbation humaine A ;
8. vérifier la présence versionnée puis cocher R.

Une valeur `à confirmer avant R` est bloquante.

## Préparation d’un asset

Avant de produire :

1. lire sa ligne dans le registre ;
2. vérifier son identifiant ;
3. si elle cite une source M ou S, confirmer son statut R ;
4. si elle cite par identifiant un asset canonique Phase 6 de dépendance ou de fallback, confirmer ses statuts P et V ;
5. si elle cite un fallback HTML, CSS, système ou runtime hors registre, exiger que la ligne décrive son implémentation exacte — et son chemin versionné s’il s’agit d’un fichier — puis vérifier sa présence et son fonctionnement sans exiger P/V ;
6. si elle indique une création interne, vérifier que méthode, provenance et droits sont renseignés sans exiger R ;
7. copier le nom final exact ;
8. relever format, dimensions, alpha, usage, fallback et budget ;
9. vérifier que l’élément précédent est validé ;
10. vérifier que le champ « Prochain élément autorisé » désigne cette production.

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

Les planches G sont des **preuves d’acceptation produites dans la PR d’intégration** qui rend leur contenu observable. Elles ne sont pas des prérequis de démarrage du lot.

Elles sont placées à plat dans `docs/assets/phase-6/`, ne sont jamais servies par l’application et vérifient les formats, les fallbacks, les contenus longs, le zoom, la densité, le mouvement réduit et la lumière.

Une PR de lot ne peut pas être fusionnée tant que ses planches listées dans la matrice ne sont pas produites et validées V.

## Autorisation des lots 6A à 6E

La matrice exacte du registre distingue pour chaque lot :

- les sources R requises **avant le démarrage** ;
- les assets P et V requis **avant le démarrage** ;
- les contrôles CSS qui doivent être `Spécifié` **avant le démarrage** puis `Intégré` **dans la PR** ;
- les planches à produire et valider **après les changements de la PR et avant fusion**.

Un lot ne démarre pas tant qu’une source, un asset ou la spécification d’un contrôle CSS d’entrée manque. Un contrôle CSS non intégré ou une planche absente n’empêche pas le démarrage, mais empêche la fusion.

Les ornements P3 E05 à E12 sont facultatifs, ne figurent dans aucune porte d’entrée et peuvent rester non produits à la fin de 6E.

## Intégration manuelle par lot

Dans la PR autorisée :

1. vérifier que les fichiers sont déjà présents à la racine de `public/assets/phase-6/` ;
2. ne créer aucun nouveau sous-dossier ;
3. raccorder les fichiers et leurs fallbacks ;
4. intégrer les contrôles CSS du lot et cocher `Intégré` ;
5. contrôler les images bloquées ;
6. mesurer les performances ;
7. tester responsive, hors ligne et accessibilité ;
8. cocher I uniquement pour les fichiers réellement consommés ;
9. produire et valider les planches d’acceptation à partir de l’application modifiée ;
10. lancer la CI et la revue Codex.

## Contrôles CSS sans fichier

B06, C05 et C29 sont des tâches CSS, pas des assets. Ils ne reçoivent ni P ni V. Leur état est suivi dans la table dédiée du registre : `Spécifié` autorise le démarrage du lot et `Intégré` est obligatoire avant sa fusion.

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
- démarrer un lot avant ses prérequis d’entrée ;
- fusionner un lot avant ses planches d’acceptation ;
- supprimer un prototype avant remplacement.

## Fin d’un fichier

Un asset est produit et validé lorsque :

- toute source M ou S explicitement citée par sa ligne est R ;
- tout asset canonique Phase 6 explicitement cité par identifiant comme dépendance ou fallback possède P et V ;
- tout fallback HTML, CSS, système ou runtime hors registre possède une implémentation exacte décrite par la ligne — et un chemin versionné s’il s’agit d’un fichier —, présente et testée sans statut P/V ;
- une création interne sans source canonique possède une méthode, une provenance et des droits renseignés sans statut R artificiel ;
- sa provenance et ses droits sont renseignés ;
- son budget est respecté ou approuvé ;
- P et V sont cochés ;
- son fichier exact est présent à la racine du dossier ;
- son nom, format, dimensions et alpha correspondent ;
- son fallback est défini et contrôlé.

I reste décoché jusqu’à la PR d’intégration concernée.

## Ordre de production

L’ordre autorisé est celui de la section finale du registre. Un asset canonique Phase 6 cité par identifiant comme dépendance ou fallback reçoit toujours P et V avant son dépendant, même si son étiquette de priorité est plus basse. Pour Gargotte, C18 est donc validé avant F01a ; la chaîne de sources reste obligatoirement M04 avec R, puis S01a avec R avant F01a et F01b, et S01c avec R avant F01c. C15 est validé avant C16. Les fallbacks runtime hors registre, dont les chemins exacts d’A09 et A10, sont déclarés par leur ligne puis contrôlés sans P/V. Le champ « Prochain élément autorisé » est mis à jour après chaque validation.
