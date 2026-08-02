# Sécurité

## Menaces principales

- secret GitHub exposé au navigateur ;
- compte non autorisé utilisant la modale ;
- modification d’un autre dépôt ou d’un autre chemin ;
- conflit écrasant une configuration récente ;
- image malveillante ou trop lourde ;
- requête intersite ;
- dépendance serveur compromise ;
- contenu GitHub traité comme HTML.

## Séparation des privilèges

La consultation publique reste anonyme. L’administration exige une session serveur. Le jeton d’installation de la GitHub App est créé et utilisé uniquement dans une Netlify Function.

Le navigateur ne reçoit jamais :

- clé privée GitHub App ;
- jeton d’installation ;
- Personal Access Token ;
- secret OAuth ;
- variable serveur.

## Autorisation

- liste explicite des comptes administrateurs ;
- GitHub App installée seulement sur `La-Grange` ;
- dépôt, propriétaire et branche de base imposés côté serveur ;
- chemins d’écriture autorisés par liste blanche ;
- aucun commit direct sur `main` ;
- aucune fusion automatique.

## Session

- cookie `HttpOnly`, `Secure`, `SameSite=Lax` ou plus strict ;
- durée limitée ;
- rotation après authentification ;
- validation d’origine et jeton CSRF pour les mutations ;
- déconnexion visible ;
- état admin affiché au bas du rail gauche.

## Validation des données

- schéma JSON strict ;
- propriétés inconnues rejetées ;
- progression entière de 0 à 100 ;
- version manuelle bornée et nettoyée ;
- couleurs validées puis contrôlées ;
- noms de dépôt issus du modèle, jamais d’une URL libre ;
- taille de requête limitée.

## Images

- formats entrants PNG, JPEG ou WebP ;
- contrôle des octets magiques ;
- dimensions maximales et taille maximale d’entrée ;
- décodage dans une bibliothèque sûre ;
- suppression des métadonnées ;
- recadrage 640 × 400 ;
- réencodage WebP ;
- budget cible 35 à 80 Ko ;
- nom final calculé côté serveur ;
- refus des SVG téléchargés, scripts, archives et polyglottes.

## Traçabilité

Chaque publication est matérialisée par une branche, un commit et une PR. Les logs serveur évitent les secrets et consignent uniquement identifiant administrateur, projet, résultat et identifiant de PR.

## Contrôles avant release

- recherche de secrets ;
- inspection du bundle ;
- test d’utilisateur non autorisé ;
- test CSRF ;
- test de modification hors liste blanche ;
- test de conflit Git ;
- test d’image hostile ;
- audit des dépendances ;
- vérification CSP ;
- contrôle des cookies et des redirections.
