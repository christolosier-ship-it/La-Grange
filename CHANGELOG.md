# Changelog

Toutes les évolutions notables de La Grange sont consignées ici selon une structure inspirée de Keep a Changelog.

## [Non publié]

### Ajouté

- documentation complète de conception produit, UX, architecture, qualité, réalisation et déploiement ;
- décisions d’architecture du MVP ;
- règles de contribution et d’intervention des agents IA ;
- socle Vite et TypeScript strict avec scripts reproductibles et intégration continue ;
- shell responsive mobile, tablette et bureau fondé sur les tokens du design system ;
- routeur hash accessible, store minimal et placeholders des cinq vues ;
- manifest, icônes PWA provisoires et service worker natif pour le shell hors ligne ;
- tests unitaires et d’intégration du routage et du store ;
- couche de données de phase 2 : client GitHub public paginé avec ETag et limites, modèle et mapping des projets, overrides validés, détection des changements, synchronisation cache-first et cache IndexedDB transactionnel ;
- tests unitaires et d’intégration couvrant pagination, mapping, enrichissement, nouveaux dépôts, renommage, mode hors ligne, erreurs réseau et flux de synchronisation unique.

### Corrigé

- ajout du `package-lock.json` requis pour rendre `npm ci` et le cache GitHub Actions reproductibles ;
- remise en état des workflows CI et GitHub Pages sous Node.js 22 ;
- isolation du cache du service worker afin de ne jamais supprimer les caches d’autres applications du domaine ;
- suppression du chemin GitHub Pages codé en dur dans le service worker ;
- ajout des icônes PNG 192, 512, maskable et Apple Touch ;
- correction de la configuration TypeScript et ESLint ;
- normalisation des routes, navigation active des fiches projet et retour accessible depuis la page introuvable ;
- sécurisation de l’avis de mise à jour PWA et couverture de tests associée ;
- suppression de l’en-tête `X-GitHub-Api-Version` côté navigateur afin d’éviter la prévalidation CORS problématique sur Safari/iOS ;
- amélioration des messages de diagnostic réseau et HTTP du client GitHub.

## Versionnement prévu

- `0.x` : construction et prototypes ;
- `1.0.0` : MVP stable publié ;
- correctif : correction compatible ;
- mineur : fonction compatible ;
- majeur : rupture de données, d’API interne ou d’expérience.
