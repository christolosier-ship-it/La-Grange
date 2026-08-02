# Déploiement GitHub Pages

## Statut après décision 6B

GitHub Pages peut rester une cible statique de consultation, de secours ou de transition. Il ne peut pas héberger seul le parcours d’administration 6B, qui exige une session serveur et des fonctions sécurisées.

## Consultation

Le workflow Pages peut continuer à :

1. installer les dépendances ;
2. exécuter les contrôles ;
3. construire l’application ;
4. publier le dossier généré.

Cette version conserve :

- lecture des dépôts publics ;
- cache IndexedDB ;
- PWA ;
- navigation ;
- dashboard ;
- liens externes.

## Administration

Sur GitHub Pages :

- aucun secret ;
- aucune GitHub App côté client ;
- aucune écriture ;
- bouton de personnalisation absent ou état explicitement indisponible ;
- aucune imitation locale d’une publication.

## Cible canonique

La cible canonique 6B avec administration est Netlify, documentée dans `07-deploiement-netlify.md`.

## Contrôles

- les deux déploiements utilisent le même code public ;
- la configuration d’environnement n’expose aucun secret ;
- la version Pages ne prétend pas avoir publié une personnalisation ;
- les chemins `base` restent corrects ;
- le service worker de chaque origine reste isolé.
