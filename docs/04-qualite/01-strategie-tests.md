# Stratégie de tests

## Pyramide

1. unitaires pour mapping, règles, schémas et transformations ;
2. intégration pour cache, rendu, modale et services ;
3. tests des Functions avec GitHub simulé ;
4. E2E sur les parcours publics et administrateur ;
5. contrôles manuels tablette paysage, bureau, PWA et accessibilité.

## Séparation

Deux suites critiques sont distinguées :

- **consultation publique** : ne dépend d’aucun secret et reste testable hors ligne ;
- **administration** : utilise des doubles GitHub App, sessions et stockage de branche.

Aucun test de PR n’utilise la clé privée de production.

## Priorités

- ne pas perdre le cache ;
- ne pas créer de doublon ;
- ne pas inventer de progression ;
- ne pas exposer de secret ;
- ne pas autoriser un non-admin ;
- ne pas écrire hors liste blanche ;
- ne pas committer directement sur `main` ;
- ne pas fusionner automatiquement ;
- préserver le formulaire après conflit ;
- garantir les fallbacks.

## Phase 6B

Les tests couvrent :

- rail fixe et scroll principal ;
- bandeau WebP avec HTML ;
- absence de conteneurs et rail droit ;
- carte et cinq actions ;
- infobulles ;
- progression facultative ;
- version ;
- neuf styles ;
- modale ;
- upload ;
- création de PR ;
- multi-appareil après déploiement.

## CI

Chaque PR exécute :

- installation reproductible ;
- typecheck ;
- lint ;
- tests ;
- tests Functions ;
- build ;
- smoke tests ciblés ;
- inspection des assets et secrets.

Les mesures lourdes, appareils réels et audits complets restent requis avant fusion du lot et en Phase 7.
