# Environnement local

## Prérequis

- version LTS de Node.js supportée par la version retenue de Vite ;
- gestionnaire de paquets figé dans le dépôt ;
- Git ;
- navigateur Chromium et WebKit pour les tests ;
- serveur HTTPS ou localhost pour le service worker.

## Commandes cibles

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
npm run preview
```

Les noms définitifs doivent être conservés dans `package.json` et rappelés dans le README.

## Configuration

Le nom GitHub par défaut est une donnée publique et peut être défini dans un fichier de configuration versionné. Aucun token ne doit être demandé ni stocké. Les paramètres modifiables dans l’interface restent locaux.

## Données de développement

Prévoir des fixtures pour travailler sans consommer l’API :

- ensemble normal ;
- plusieurs pages ;
- repo sans description ;
- repo archivé ;
- repo renommé ;
- nouveau repo ;
- erreur de limite ;
- réponse partielle.

## Service worker

Éviter qu’un ancien service worker perturbe le développement. Fournir une commande ou procédure de nettoyage et n’activer le comportement production qu’en build ou mode dédié.

## Contrôle initial

Après installation : typecheck, tests, build et ouverture de toutes les routes. Toute étape non reproductible doit être corrigée avant développement fonctionnel.
