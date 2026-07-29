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
- couche de données de phase 2 : client GitHub public paginé, modèle, overrides, détection des changements, synchronisation cache-first et cache IndexedDB transactionnel ;
- smoke test dynamique du véritable client de production contre les dépôts publics réels ;
- dashboard de phase 3 avec statistiques réelles, L’établi, Prêts à partir, activité synthétique, répartition et nouvelle arrivée ;
- catalogue de phase 4 avec recherche locale, filtres combinables, favoris et modes grille/liste ;
- fiches projets responsive et détails GitHub ciblés à la demande avec cache séparé ;
- journal d’activité local de phase 5A, regroupé par semaine et par jour à partir des changements réellement détectés ;
- lecture IndexedDB des événements isolée par utilisateur, validée profondément et résistante aux entrées corrompues ;
- préférences versionnées de phase 5B avec profil GitHub, visibilité, fraîcheur, densité, mouvement, favoris et mode catalogue ;
- migration automatique de l’ancien stockage Phase 4 sans perte des favoris ni du mode d’affichage ;
- coordinateur de sessions isolant synchronisation, détails et activité pour chaque profil ;
- écran Paramètres responsive avec confirmations accessibles, informations réelles du cache et version ;
- inspection et reset ciblés du snapshot, du journal et des détails du profil actif ;
- diagnostic local copiable limité aux états, compteurs et préférences effectives ;
- cadrage documentaire complet de la Phase 6 avec bible visuelle, inventaire et budgets d’assets, responsive artistique, grammaire de mouvement et checklist qualité ;
- référence visuelle Phase 6 conservée dans le dépôt en WebP documentaire ;
- protocole Lovable et ADR maintenant GitHub comme source de vérité du prototypage visuel ;
- découpage de la Phase 6 en prototype isolé puis PR 6A à 6E.

### Corrigé

- ajout du `package-lock.json` requis pour rendre `npm ci` et le cache GitHub Actions reproductibles ;
- remise en état des workflows CI et GitHub Pages sous Node.js 22 ;
- isolation du cache du service worker et suppression du chemin GitHub Pages codé en dur ;
- ajout des icônes PWA requises ;
- normalisation des routes et amélioration de l’accessibilité ;
- requêtes GitHub navigateur simplifiées et liaison correcte de `Window.fetch` sur Safari/iOS ;
- conservation du snapshot mémoire pendant les erreurs et rafraîchissements ;
- respect des limites GitHub principales et secondaires ;
- acquittement persistant des nouveaux projets ;
- redirection des anciennes URL après renommage ;
- prévention des rendus réentrants et conservation du focus clavier ;
- réparation individuelle des préférences invalides ;
- filtrage des forks et archives sans altérer le snapshot ni bloquer les fiches directes ;
- restauration de l’ancien profil lorsqu’un changement échoue sans cache utilisable ;
- reconstruction de la session après reset afin d’empêcher la réapparition d’un snapshot supprimé en mémoire ;
- comptage des seuls détails réellement supprimés pendant la maintenance.

## Versionnement prévu

- `0.x` : construction et prototypes ;
- `1.0.0` : MVP stable publié ;
- correctif : correction compatible ;
- mineur : fonction compatible ;
- majeur : rupture de données, d’API interne ou d’expérience.