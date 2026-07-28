# Procédure de rollback

## Déclencheurs

- écran blanc ;
- corruption ou perte de cache ;
- synchronisation destructive ;
- fuite de secret ;
- service worker bloquant ;
- liens principaux inutilisables ;
- régression critique d’accessibilité.

## Méthode

1. identifier le dernier commit stable ;
2. stopper ou neutraliser le déploiement problématique ;
3. créer un revert traçable plutôt qu’un push forcé ;
4. redéployer ;
5. vérifier le site et le service worker ;
6. publier une correction de version si nécessaire ;
7. documenter la cause.

## Données locales

Un rollback de code ne doit pas supposer que la base IndexedDB a également reculé. Les migrations doivent être tolérantes ou fournir une compatibilité vers l’arrière pour la dernière version. En cas de schéma incompatible, afficher une procédure claire et préserver autant que possible les préférences.

## Service worker

Une version problématique peut rester installée. Prévoir un correctif qui prend le contrôle proprement, nettoie uniquement les caches concernés et recharge après consentement si nécessaire.

## Après incident

Créer un RETEX court : déclencheur, impact, détection, restauration, cause racine et action préventive.
