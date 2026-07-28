# Cas de tests end-to-end

## Parcours 1 : premier lancement

1. ouvrir sans données ;
2. simuler plusieurs pages GitHub ;
3. vérifier le dashboard ;
4. vérifier les compteurs ;
5. ouvrir une carte ;
6. revenir au dashboard.

## Parcours 2 : nouvelle arrivée

1. charger un instantané existant ;
2. synchroniser avec un repo supplémentaire ;
3. vérifier le toast et le badge ;
4. ouvrir la fiche ;
5. vérifier l’acquittement du statut nouveau.

## Parcours 3 : hors ligne

1. réaliser une synchronisation ;
2. recharger sans réseau ;
3. vérifier le shell et les projets ;
4. ouvrir une fiche ;
5. vérifier le signalement des liens externes.

## Parcours 4 : erreur GitHub

1. cache valide ;
2. réponse 403 ou 500 ;
3. vérifier que les cartes restent présentes ;
4. vérifier le message et l’absence de boucle de retry.

## Parcours 5 : catalogue

Recherche, combinaison de filtres, tri, mode liste, ouverture puis retour.

## Parcours 6 : PWA

Installation ou simulation, démarrage standalone, mise à jour du service worker et reprise après nouvelle version.

## Matrices

Tester au minimum moteur Chromium, WebKit et une taille mobile, tablette paysage et bureau.
