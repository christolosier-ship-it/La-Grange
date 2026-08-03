# ADR-011 - GitHub Pages et authentification locale

- **Statut** : accepté
- **Date** : 2026-08-03
- **Remplace** : ADR-010 pour l’hébergement, l’authentification et la publication

## Contexte

La Grange est réellement déployée sur GitHub Pages. Le propriétaire ne possède pas de compte Netlify et ne souhaite pas dépendre d’un hébergeur tiers.

Les lectures anonymes de l’API GitHub sont limitées et peuvent être épuisées rapidement par l’inventaire, les releases et les détails. GitHub Pages ne peut cependant pas conserver un secret serveur ni exécuter un callback OAuth sécurisé.

## Décision

- GitHub Pages est la cible canonique unique ;
- la consultation anonyme reste le mode par défaut ;
- l’utilisateur peut fournir un jeton personnel finement contrôlé pour les lectures authentifiées ;
- aucun droit supplémentaire n’est demandé pour la lecture des dépôts publics ;
- le jeton est validé avec `GET /user` ;
- il est stocké dans `sessionStorage` par défaut ;
- `localStorage` n’est utilisé qu’après choix explicite ;
- l’en-tête `Authorization` n’est ajouté qu’aux requêtes visant exactement `https://api.github.com` ;
- le jeton est supprimé à la déconnexion et après réponse `401` ;
- aucune écriture GitHub n’est effectuée depuis la PWA ;
- la personnalisation partagée reste versionnée manuellement dans le dépôt.

## Alternatives rejetées

### Netlify Functions

Rejetées car elles imposent un compte et un hébergement non souhaités.

### OAuth Web classique

Rejeté car l’échange du code nécessite un secret client protégé par un backend.

### Device Flow dans le navigateur

Rejeté car les endpoints d’autorisation ne constituent pas un flux CORS exploitable directement par une PWA statique.

### Jeton d’écriture dans la PWA

Rejeté car il permettrait au code client de modifier le dépôt et augmenterait fortement l’impact d’une compromission.

## Conséquences positives

- aucun service tiers ;
- architecture conforme au déploiement réel ;
- quota GitHub authentifié disponible sur demande ;
- mode public préservé ;
- contrôle explicite du stockage ;
- suppression de tout backend dormant.

## Conséquences négatives

- le jeton de lecture est accessible au JavaScript du même contexte ;
- la connexion exige une création et une saisie manuelles ;
- la personnalisation automatique par PR disparaît ;
- chaque appareil doit être connecté séparément.

## Mesures de réduction du risque

- jeton finement contrôlé et sans droit supplémentaire ;
- expiration recommandée ;
- stockage de session par défaut ;
- aucune bibliothèque distante ;
- contrôle strict de l’origine ;
- aucune journalisation ;
- aucun stockage dans IndexedDB ;
- bouton de déconnexion immédiate.

## Réversibilité

Supprimer le jeton local replace instantanément La Grange en mode public. Le retrait complet de la fonction de connexion ne modifie ni les données ni les overrides.
