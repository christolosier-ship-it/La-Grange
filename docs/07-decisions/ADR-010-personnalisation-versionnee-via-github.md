# ADR-010 - Personnalisation versionnée via GitHub

- **Statut** : remplacé par ADR-011
- **Date** : 2026-08-02
- **Remplacement** : 2026-08-03

## Contexte historique

Cet ADR proposait un déploiement Netlify, une authentification OAuth, une GitHub App et des Functions capables de créer automatiquement une pull request de personnalisation.

## Motif du remplacement

Le propriétaire n’utilise pas Netlify et ne souhaite aucun compte ni backend tiers. Le déploiement réel est GitHub Pages, qui sert uniquement des fichiers statiques. L’architecture décrite ici ne pouvait donc pas fonctionner dans l’environnement choisi.

Les éléments suivants sont abandonnés :

- déploiement Netlify ;
- OAuth avec callback serveur ;
- session `HttpOnly` ;
- GitHub App d’écriture ;
- création automatique de branche, commit et PR ;
- upload de couverture depuis la PWA.

## Décision conservée

La personnalisation reste versionnée dans :

- `public/data/project-overrides.json` ;
- `public/assets/phase-6/covers/`.

Les modifications continuent à bénéficier de l’historique Git, du rollback et du déploiement après fusion. Elles sont simplement réalisées manuellement dans le dépôt ou lors d’une intervention de développement.

## Nouvelle décision

ADR-011 définit :

- GitHub Pages comme cible canonique ;
- une connexion locale facultative par jeton de lecture ;
- aucune écriture GitHub depuis la PWA ;
- la suppression de toute dépendance Netlify.
