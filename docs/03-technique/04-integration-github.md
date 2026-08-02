# Intégration GitHub

## Deux chemins distincts

### Lecture publique

La liste globale des dépôts reste récupérée par l’API REST GitHub publique, sans jeton côté navigateur. Elle utilise le cache, la pagination et les limites déjà établies.

Données principales : identité du dépôt, description, URL, page d’accueil, archive, fork, langage, branche par défaut, topics, dates et issues ouvertes.

### Administration 6B

La personnalisation utilise une GitHub App côté serveur. Elle n’accorde aucun accès direct au navigateur et ne remplace pas le client public de consultation.

## Détails et versions

Les détails d’une fiche restent chargés à la demande. La version affichée sur une carte respecte :

1. version manuelle ;
2. dernière release stable ;
3. dernière préversion ;
4. absence de badge.

Les brouillons sont ignorés. La récupération automatique est mutualisée et mise en cache, jamais exécutée séparément à chaque rendu de carte.

## GitHub App

Installation limitée au dépôt `christolosier-ship-it/La-Grange`.

Permissions :

- `metadata: read` ;
- `contents: read/write` ;
- `pull_requests: read/write`.

Aucune permission issues, administration, actions, secrets ou organisation.

## Création d’une personnalisation

Le service sécurisé :

1. vérifie l’identité administrateur ;
2. contrôle que le dépôt cible est exactement `La-Grange` ;
3. relit le SHA de base ;
4. refuse une base obsolète ou repropose un rafraîchissement ;
5. modifie `public/data/project-overrides.json` ;
6. ajoute ou remplace la couverture autorisée ;
7. crée une branche et un commit ;
8. ouvre une PR en brouillon ou prête selon la politique retenue ;
9. ne fusionne jamais la PR.

## Erreurs

- session absente : `401` ;
- compte non autorisé : `403` ;
- configuration ou image invalide : `422` ;
- base Git dépassée : `409` ;
- limite GitHub : `429` avec reprise ;
- erreur GitHub ou réseau : `502` sans perte du formulaire ;
- PR déjà ouverte pour le même projet : proposer son URL plutôt que créer un doublon.

## Contraintes

- aucun secret dans le bundle ;
- aucune URL GitHub fournie librement par le client ;
- aucun HTML distant injecté ;
- aucune mutation d’un autre dépôt ;
- aucun commit direct sur `main` ;
- aucune fusion automatique ;
- aucune donnée factuelle remplacée par une saisie éditoriale.
