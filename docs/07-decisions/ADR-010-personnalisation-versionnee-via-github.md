# ADR-010 - Personnalisation versionnée via GitHub

- **Statut** : accepté
- **Date** : 2026-08-02

## Contexte

Le propriétaire veut personnaliser depuis La Grange la couverture, le style, les couleurs, la progression et la version d’un projet. Le résultat doit être identique sur plusieurs appareils.

Une surcharge locale ne répond pas à ce besoin. Un token stocké dans le navigateur exposerait le dépôt. Un commit direct réduirait la traçabilité.

## Décision

La personnalisation suit cette architecture :

- déploiement canonique Netlify ;
- authentification GitHub ;
- GitHub App installée uniquement sur `christolosier-ship-it/La-Grange` ;
- secrets et jetons uniquement dans Netlify Functions ;
- bouton de personnalisation absent hors administrateur ;
- modification de `project-overrides.json` et de la couverture autorisée ;
- branche et commit automatiques ;
- pull request automatique ;
- fusion manuelle ;
- déploiement après fusion ;
- mise à jour PWA avant disponibilité multi-appareil.

## Permissions

- métadonnées : lecture ;
- contenus : lecture et écriture ;
- pull requests : lecture et écriture.

Aucune permission sur les issues, actions, secrets, administration ou autres dépôts.

## Fichiers autorisés

- `public/data/project-overrides.json` ;
- couvertures canoniques Phase 6 correspondant au projet.

Toute extension de cette liste exige une mise à jour documentaire et des tests.

## Données modifiables en 6B

- style ;
- couleur principale ;
- couleur secondaire ;
- couleur de progression ;
- progression manuelle ;
- version manuelle ;
- couverture.

Les données factuelles GitHub restent en lecture seule.

## Sécurité

- session par cookie sécurisé ;
- compte administrateur explicitement autorisé ;
- CSRF et contrôle d’origine ;
- schéma strict ;
- taille limitée ;
- image décodée et réencodée ;
- chemin et nom calculés côté serveur ;
- SHA de base contrôlé ;
- aucune fusion automatique ;
- aucun secret dans le bundle ou les diagnostics.

## Expérience

La modale affiche :

- aperçu ;
- validation ;
- création de branche ;
- création de PR ;
- lien vers la PR ;
- état en attente de fusion ;
- erreurs et conflits.

Elle ne prétend pas que le changement est publié avant son déploiement.

## Conséquences positives

- configuration commune ;
- historique et revue ;
- rollback ;
- secret protégé ;
- portée d’écriture minimale ;
- preview possible.

## Conséquences négatives

- ajout d’un petit backend ;
- authentification ;
- délai entre saisie et publication ;
- maintenance Netlify et GitHub App ;
- tests de sécurité supplémentaires.

## Alternatives rejetées

### Stockage local

Rejeté car non partagé entre appareils.

### Personal Access Token dans la PWA

Rejeté car exposé.

### Commit direct sur `main`

Rejeté car moins contrôlé et non réversible avant déploiement.

### PR créée manuellement hors application

Conservée comme secours, mais ne répond pas au parcours validé.

## Réversibilité

Désactiver les Functions et masquer le bouton rend immédiatement La Grange à nouveau entièrement consultative. Les overrides déjà fusionnés restent de simples fichiers statiques.
