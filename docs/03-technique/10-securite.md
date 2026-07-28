# Sécurité

## Menaces principales

- token accidentellement publié ;
- injection via description ou nom GitHub ;
- URL externe malformée ;
- dépendance compromise ;
- service worker trop large ;
- contenu distant traité comme HTML ;
- tabnabbing.

## Mesures

- aucune authentification dans le MVP ;
- rendu des textes avec `textContent` ;
- validation stricte des URLs HTTPS ;
- liste autorisée de protocoles ;
- `rel="noopener noreferrer"` ;
- politique CSP compatible GitHub Pages ;
- dépendances limitées, verrouillées et auditées ;
- pas de `eval`, pas de script inline non maîtrisé ;
- service worker au scope minimal ;
- fichiers d’environnement ignorés.

## Données locales

Les données publiques GitHub et préférences restent sur l’appareil. Aucun analytics, cookie publicitaire ou transfert tiers.

## Revue de sécurité

Avant release : recherche de secrets, inspection du bundle, test d’URL hostile, test de description contenant du HTML, audit des dépendances et vérification CSP.
