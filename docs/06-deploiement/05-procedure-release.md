# Procédure de release

## Préparation

- geler le périmètre ;
- résoudre les anomalies bloquantes ;
- exécuter l’audit final ;
- vérifier les migrations ;
- mettre à jour version, changelog et README ;
- valider le build de production.

## Pull request de release

La PR contient uniquement les ajustements de version et corrections nécessaires. Elle liste : tests, appareils, audit PWA, sécurité, performance et résultat du déploiement de prévisualisation éventuel.

## Publication

1. fusionner sur `main` ;
2. attendre la CI et Pages ;
3. vérifier l’URL publique ;
4. créer le tag ;
5. créer une release GitHub avec résumé et points d’attention ;
6. tester l’installation ou la mise à jour sur appareil réel.

## Vérification de fumée

- dashboard ;
- synchronisation ;
- recherche ;
- fiche ;
- liens externes ;
- hors ligne ;
- réouverture standalone.

## Clôture

Consigner toute anomalie post-release. Une correction urgente utilise une branche `fix/`, un patch de version et la même discipline de validation.
