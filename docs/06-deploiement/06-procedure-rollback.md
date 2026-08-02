# Procédure de rollback

## Déclencheurs

- écran blanc ;
- perte de cache ;
- service worker bloquant ;
- secret exposé ;
- Function trop permissive ;
- écriture hors liste blanche ;
- session compromise ;
- personnalisation destructive ;
- régression critique d’accessibilité.

## Mesures immédiates

En cas de risque d’écriture :

1. désactiver ou retirer les Functions ;
2. révoquer ou suspendre la GitHub App ;
3. masquer le bouton admin ;
4. préserver la consultation publique ;
5. analyser les PR et commits créés.

## Rollback applicatif

1. identifier le dernier commit stable ;
2. créer un revert traçable ;
3. redéployer ;
4. vérifier service worker et cache ;
5. vérifier l’origine canonique ;
6. publier un patch si nécessaire.

## Configuration

Une personnalisation fusionnée se corrige par revert ou nouvelle PR. Ne jamais réécrire l’historique de `main`.

## Données locales

Un rollback ne suppose pas un retour arrière d’IndexedDB. Les migrations restent tolérantes et les données sont préservées autant que possible.

## Après incident

RETEX : déclencheur, impact, permissions, détection, restauration, cause racine et prévention.
