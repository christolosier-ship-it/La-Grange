# Règles métier

## Identité

- l’identifiant GitHub numérique reste la clé stable ;
- le nom du dépôt reste le slug technique ;
- un renommage ne crée pas de doublon ;
- la personnalisation cible un dépôt existant de l’inventaire.

## Activité

- actif : activité dans les 30 derniers jours ;
- maintenance : de 31 à 180 jours ;
- en sommeil : au-delà de 180 jours ;
- archivé : drapeau GitHub prioritaire.

Le temps affiché sur la carte vient de `pushedAt`, sinon `updatedAt`.

## Avancement

- valeur manuelle de 0 à 100 ;
- valeur absente : aucune barre ;
- jamais calculé depuis GitHub ;
- 100 % ne signifie ni archivé ni terminé ;
- libellé accessible indiquant qu’il s’agit d’une estimation manuelle.

## Version

Ordre de priorité :

1. `manualVersion` non vide ;
2. dernière release stable GitHub ;
3. dernière préversion si aucune stable n’existe ;
4. aucun badge.

Les drafts sont ignorés et le tag est affiché sans ajout artificiel de `v`.

## Styles

Valeurs autorisées :

- `lifestyle` ;
- `games` ;
- `productivity` ;
- `health` ;
- `education` ;
- `nature` ;
- `creation` ;
- `technical` ;
- `uncategorized`.

Chaque style fournit une bannière, une icône et trois couleurs par défaut. Les couleurs personnalisées restent facultatives.

## Publication

- toute modification crée une PR dans `La-Grange` ;
- aucun commit direct sur `main` ;
- aucun auto-merge ;
- une PR obsolète ou en conflit doit être corrigée ou remplacée ;
- la personnalisation devient officielle seulement après fusion et déploiement.
