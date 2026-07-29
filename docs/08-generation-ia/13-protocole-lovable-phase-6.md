# Protocole Lovable de la Phase 6

## Objectif

Utiliser Lovable comme studio de prototypage visuel sans lui transférer la source de vérité, le modèle de données ou la responsabilité de la fusion.

Lovable explore et matérialise une direction. GitHub conserve le code, la documentation, l’historique, la CI et les décisions.

## Principe

> Lovable propose. GitHub décide. La CI vérifie.

## Source de vérité

La source de vérité reste le dépôt :

`christolosier-ship-it/La-Grange`

Le projet Lovable ne doit jamais être considéré comme une version canonique de l’application.

## Modes d’utilisation

### Mode plan

À utiliser pour :

- analyser la documentation ;
- proposer une architecture visuelle ;
- dresser une liste d’assets ;
- suggérer des tokens ;
- décrire le responsive ;
- identifier les risques.

Aucune modification de production n’est autorisée dans ce mode.

### Prototype isolé

À utiliser pour :

- explorer le shell ;
- comparer des matières ;
- tester une carte projet ;
- tester un panneau ;
- tester une composition desktop et mobile ;
- produire des captures ;
- produire un diff ou des composants exportables.

Le prototype utilise des données explicitement fictives ou des fixtures uniquement dans son environnement isolé. Ces données ne doivent jamais être copiées dans le chemin de production.

### Assistance à l’implémentation

Lovable peut proposer du code ou des composants à condition que :

- le périmètre soit celui d’une PR Phase 6 ;
- le code soit relu contre l’architecture réelle ;
- aucun framework ou backend ne soit ajouté ;
- aucune logique métier ne soit réécrite sans demande ;
- les diffs soient importés dans une branche GitHub dédiée ;
- la CI et les tests GitHub restent obligatoires.

## Interdictions

- aucune modification directe de `main` ;
- aucune fusion automatique ;
- aucune connexion GitHub avec token dans le code ;
- aucun backend Lovable ;
- aucune base de données externe ;
- aucune authentification ;
- aucune fonction de modification GitHub ;
- aucun remplacement de Vite et TypeScript ;
- aucun ajout de React, Vue ou autre framework ;
- aucune réécriture des services de synchronisation ;
- aucune métrique fictive dans l’application finale ;
- aucun asset distant indispensable ;
- aucun texte fonctionnel intégré dans une image ;
- aucun copier-coller aveugle d’un prototype complet.

## Préparation du prototype

Lovable reçoit :

- `README.md` ;
- `ARCHITECTURE.md` ;
- `AGENTS.md` ;
- `docs/INDEX.md` ;
- la direction artistique ;
- la bible visuelle ;
- le design system ;
- le responsive ;
- les animations ;
- l’inventaire des assets ;
- le document Phase 6 ;
- la référence visuelle ;
- les captures de l’application actuelle ;
- le périmètre exact du prototype.

Lovable ne reçoit pas de secret, de token ou de données privées.

## Périmètre du premier prototype

Le premier prototype doit rester volontairement petit :

- enseigne ;
- shell ;
- navigation ;
- poutre de statistiques ;
- une section ;
- une carte standard ;
- une carte compacte ;
- un fallback sans image ;
- un panneau secondaire ;
- un état focus ;
- un format bureau 1440 px ;
- un format mobile 390 px.

Il ne doit pas intégrer :

- toutes les vues ;
- l’API GitHub ;
- IndexedDB ;
- la synchronisation réelle ;
- les détails de projet ;
- les paramètres complets ;
- les animations narratives finales ;
- tous les projets.

## Variantes

Deux variantes maximum sont autorisées lors de la première exploration.

Chaque variante doit conserver :

- la même structure ;
- les mêmes composants ;
- les mêmes données de démonstration ;
- les mêmes formats de capture.

Les variantes peuvent différer sur :

- intensité des textures ;
- style des cadres ;
- niveau de lumière ;
- typographie de marque ;
- traitement des cartes.

Une troisième variante nécessite une raison précise. L’exploration infinie est interdite.

## Livrables Lovable

Chaque prototype remet :

1. captures 1440 px et 390 px ;
2. lien ou identifiant du projet Lovable ;
3. description de la direction ;
4. tokens proposés ;
5. liste d’assets ;
6. structure des composants ;
7. CSS ou diff exportable ;
8. comportement responsive ;
9. comportement de focus ;
10. comportement sous mouvement réduit ;
11. dépendances utilisées ;
12. écarts à la documentation ;
13. limites connues.

## Grille d’évaluation

Noter chaque critère de 0 à 3 :

- 0 : non conforme ;
- 1 : faible ;
- 2 : satisfaisant ;
- 3 : excellent.

| Critère | Poids |
| --- | ---: |
| reconnaissance de La Grange | 3 |
| lisibilité | 3 |
| fidélité à la référence | 2 |
| cohérence des matières | 2 |
| hiérarchie des cartes | 3 |
| mobile 390 px | 3 |
| accessibilité perceptible | 3 |
| faisabilité CSS et assets | 3 |
| performance probable | 3 |
| simplicité d’intégration | 3 |
| originalité maîtrisée | 1 |

Une variante ne peut pas être retenue avec une note de 0 sur lisibilité, mobile, accessibilité, performance ou faisabilité.

## Validation humaine

Le propriétaire du projet valide explicitement :

- le niveau de stylisation ;
- l’intensité du bois ;
- le traitement des cartes ;
- la typographie de marque ;
- la densité ;
- la composition mobile ;
- la variante retenue.

Aucune implémentation globale ne commence avant cette validation.

## Handoff vers GitHub

Après validation :

1. figer la variante retenue ;
2. exporter captures, tokens et composants ;
3. inventorier les assets ;
4. comparer le prototype au code réel ;
5. identifier ce qui relève de CSS, SVG ou raster ;
6. découper selon les PR 6A à 6E ;
7. créer une branche GitHub par lot ;
8. reporter uniquement les changements approuvés ;
9. conserver les composants fonctionnels existants ;
10. ajouter ou adapter les tests ;
11. mesurer les budgets ;
12. lancer CI et revue.

## Audit des sorties Lovable

Avant toute intégration, vérifier :

- pas de framework ajouté ;
- pas de backend ;
- pas de dépendance inutile ;
- pas de token ;
- pas de donnée fictive conservée ;
- pas de texte rasterisé ;
- pas de HTML distant ;
- pas d’appel réseau supplémentaire ;
- pas de logique métier dans les composants ;
- pas de CSS global destructif ;
- pas de largeur fixe incompatible ;
- pas d’animation permanente ;
- pas de police distante ;
- pas d’asset sans provenance ;
- pas d’accessibilité supprimée.

## Traçabilité

Chaque PR issue d’un prototype mentionne :

- le prototype Lovable source ;
- la variante retenue ;
- les éléments repris ;
- les éléments rejetés ;
- les adaptations nécessaires ;
- les budgets mesurés ;
- les captures de contrôle.

## Fin du rôle Lovable

Lovable n’intervient plus une fois les composants intégrés et stabilisés, sauf pour une variation ciblée explicitement demandée. La Phase 7 utilise uniquement le dépôt GitHub et l’application déployée comme preuves.