# ADR-004 - Lecture publique GitHub sans authentification

- **Statut** : accepté pour le chemin de consultation
- **Date initiale** : 2026-07-28
- **Révision** : 2026-08-02

## Décision

La liste globale des dépôts publics et les données de consultation continuent d’utiliser l’API REST GitHub publique sans jeton dans le navigateur.

## Raisons

- données déjà publiques ;
- cache-first ;
- absence de secret client ;
- fonctionnement statique et hors ligne ;
- simplicité du parcours public.

## Administration

La GitHub App décrite dans ADR-010 ne remplace pas ce chemin. Elle est utilisée uniquement côté serveur pour proposer des modifications au dépôt `La-Grange`.

Les deux flux sont séparés :

- navigateur : lecture publique ;
- Function sécurisée : écriture limitée à la personnalisation.

## Contraintes

- aucun jeton dans Vite ;
- aucun appel authentifié par carte ;
- versions mises en cache ou générées de manière mutualisée ;
- limites GitHub explicites ;
- dernier cache valide conservé.
