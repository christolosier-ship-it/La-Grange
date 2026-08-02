# Périmètre du MVP

## Consultation

- lecture paginée des dépôts publics ;
- synchronisation cache-first ;
- détection des nouveaux dépôts et renommages ;
- IndexedDB et mode hors ligne ;
- dashboard, catalogue, fiche, activité et paramètres ;
- recherche, filtres, favoris et préférences ;
- liens vers application, GitHub, README, issues et releases ;
- installation PWA.

## Présentation 6B

- rail gauche fixe ;
- bandeau de statistiques WebP ;
- grille de cartes sans conteneur de section ;
- couvertures 640 × 400 ;
- neuf styles génériques ;
- version automatique ou manuelle ;
- avancement manuel facultatif ;
- cinq actions alignées avec infobulles ;
- modale de personnalisation.

## Administration

- authentification via GitHub App ;
- service Netlify Functions ;
- écriture limitée à `public/data/project-overrides.json` et aux assets autorisés de `La-Grange` ;
- création automatique d’une branche, d’un commit et d’une pull request ;
- fusion manuelle ;
- état administrateur visible dans le rail.

## Cibles

- tablette paysage ;
- bureau ;
- zoom 200 % ;
- clavier, tactile et VoiceOver sur iPad.

## Conditions de sortie

- aucun secret dans le client ;
- aucune écriture directe sur `main` ;
- même personnalisation après déploiement sur plusieurs appareils ;
- consultation disponible même si l’administration est hors service ;
- cartes exploitables sans couverture ni version.
