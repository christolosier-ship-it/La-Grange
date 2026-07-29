# ADR-009 - GitHub reste la source de vérité du prototypage visuel

- **Statut** : accepté pour la Phase 6
- **Date** : 2026-07-29

## Contexte

La Phase 6 prévoit d’utiliser Lovable pour accélérer l’exploration visuelle. Lovable peut produire rapidement des variantes, des composants et des assets, mais son projet n’est pas l’historique canonique de La Grange et ne porte pas les mêmes garanties de revue, de CI, de cache ou d’architecture.

Un flux non cadré pourrait créer deux versions divergentes de l’application, introduire un framework, réécrire des fonctions stables ou fusionner un prototype sans tests.

## Décision

GitHub reste l’unique source de vérité de La Grange.

Lovable est utilisé comme environnement de planification et de prototypage isolé. Ses sorties sont considérées comme des propositions. Elles sont auditées, adaptées et intégrées dans des branches GitHub dédiées avant toute PR.

Aucune modification directe de `main` depuis Lovable n’est autorisée.

## Règles

- le dépôt GitHub contient la documentation canonique ;
- le code de production vit uniquement dans le dépôt GitHub ;
- les décisions sont enregistrées dans les documents et ADR ;
- Lovable ne possède aucun token GitHub dans le code ;
- Lovable ne fournit aucun backend au MVP ;
- le prototype peut utiliser des fixtures isolées, jamais copiées comme données de production ;
- les composants existants sont conservés lorsque leur fonction est correcte ;
- toute sortie Lovable passe par une branche, une PR, la CI et une revue ;
- le SHA validé sur GitHub est la seule base de fusion ;
- les assets intégrés sont optimisés et inventoriés.

## Raisons

- préserver l’historique et la traçabilité ;
- empêcher la divergence entre prototype et application ;
- conserver Vite, TypeScript et l’architecture sans framework ;
- protéger les fonctions cache-first et hors ligne ;
- maintenir les tests et la revue des P1 et P2 ;
- permettre d’abandonner une proposition visuelle sans toucher à `main` ;
- garder un rollback simple.

## Conséquences positives

- Lovable peut explorer sans risque pour la production ;
- les prototypes restent rapides et jetables ;
- les meilleurs éléments peuvent être intégrés progressivement ;
- chaque lot visuel reste mesurable et réversible ;
- GitHub continue de porter les audits, les discussions et les preuves de validation.

## Conséquences négatives

- le code Lovable ne peut pas être fusionné aveuglément ;
- une étape d’adaptation et de revue est obligatoire ;
- certaines propositions trop liées à une architecture différente seront rejetées ;
- le prototype et la production peuvent temporairement différer.

## Alternatives rejetées

### Lovable devient la source de vérité

Rejeté car cela dupliquerait ou remplacerait l’architecture actuelle sans garantir la continuité des tests, du cache et de la PWA.

### Lovable modifie directement `main`

Rejeté car les changements visuels ne seraient ni isolés, ni auditables, ni réversibles proprement.

### Ne pas utiliser Lovable

Rejeté comme règle générale. L’outil reste utile pour explorer rapidement des compositions et comparer des variantes, à condition de respecter le présent ADR.

## Réversibilité

Le recours à Lovable peut être arrêté à tout moment. La documentation, le code et les assets déjà intégrés dans GitHub restent autonomes.