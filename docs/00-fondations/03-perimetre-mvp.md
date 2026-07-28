# Périmètre du MVP

## Fonctions incluses

- lecture des dépôts publics du compte configuré ;
- pagination complète ;
- synchronisation au lancement, au retour au premier plan et sur demande ;
- détection des nouveaux dépôts par identifiant GitHub ;
- cache IndexedDB ;
- mode hors ligne ;
- dashboard synthétique ;
- catalogue avec recherche, filtres et tris ;
- fiche projet ;
- liens vers application, GitHub, README, issues et releases ;
- activité récente synthétique ;
- préférences locales ;
- enrichissement graphique centralisé ;
- installation PWA ;
- responsive mobile, tablette et bureau.

## Données détaillées

Les derniers commits ou la dernière release d’un projet peuvent être chargés à l’ouverture de sa fiche. Ils ne sont pas chargés pour tous les projets lors de la synchronisation générale.

## Conditions de sortie

Le MVP doit fonctionner sans token, conserver le dernier cache valide, gérer la limite API et afficher tous les projets même sans couverture personnalisée.
