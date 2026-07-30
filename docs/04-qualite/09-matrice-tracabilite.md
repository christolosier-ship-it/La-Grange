# Matrice de traçabilité

| Besoin | Règle / conception | Vue | Tests principaux |
|---|---|---|---|
| Nouveau dépôt automatique | comparaison par identifiant | Dashboard, activité | unitaires comparator, intégration sync, E2E nouvelle arrivée |
| Consultation immédiate | cache-first | toutes | intégration cache, E2E hors ligne |
| Aucun doublon après renommage | identité numérique stable | catalogue | unitaires comparator, intégration renommage |
| Ouvrir l’application | URL HTTPS validée | carte, fiche | unitaires URL, E2E fiche |
| Données réelles | statistiques dérivées | dashboard | unitaires sélecteurs, audit produit |
| Recherche rapide | index local normalisé | catalogue | unitaires recherche, E2E catalogue |
| Résilience API | instantané atomique | shell, dashboard | intégration 403, 500 et réponse partielle |
| PWA hors ligne | service worker et IndexedDB | toutes | checklist PWA, E2E hors ligne |
| Accessibilité | composants et navigation | toutes | checklist, clavier, VoiceOver |
| Identité visuelle | overrides et fallback | cartes, fiche | unitaires enrichissement, tests image absente |
| Lecture seule | aucune mutation | toutes | revue architecture et sécurité |
| Responsive | layouts adaptatifs | toutes | E2E viewport et contrôle appareil |
| Atelier stylisé reconnaissable | direction artistique et bible Phase 6 | toutes | captures comparatives, checklist Phase 6, validation humaine |
| Cohérence des matières | design system sémantique et registre d’assets | shell, cartes, panneaux | planche de composants, contraste final, revue visuelle |
| Fonctionnement sans assets | fallbacks CSS et SVG obligatoires | shell, cartes, fiches | images bloquées, chemins cassés, tests de fallback |
| Carte projet tactile et lisible | spécification `ProjectCard` Phase 6 | dashboard, catalogue | états normal, focus, pressé, archivé, noms longs |
| Aucune donnée dessinée | textes HTML et données issues du modèle | toutes | inspection des assets, audit produit et bundle |
| Performance visuelle | budgets d’assets et chargement priorisé | toutes | poids, requêtes, LCP, CLS, cache froid et chaud |
| Images adaptées | miniatures dédiées et lazy loading | cartes, fiches | contrôle réseau, dimensions réservées, images sous la ligne de flottaison |
| Mouvement optionnel | grammaire d’animation et préférence effective | toutes | `prefers-reduced-motion`, réglage local, audit manuel |
| Nouvelle caisse factuelle | animation liée au marqueur réel et à son acquittement | dashboard | intégration nouvelle arrivée, mouvement réduit, absence de rejeu |
| Décor inerte | ornements hors arbre d’accessibilité et sans événement | toutes | clavier, VoiceOver, inspection DOM |
| Mobile conçu spécifiquement | établi compact et navigation basse | toutes | 320 px, 390 px, zoom 200 %, tactile |
| Tablette comme cible de confort | composition paysage avec rail compact | dashboard, catalogue, fiche | 1024 px, iPad réel, orientation |
| Production contrôlée | ADR-009, registre canonique et protocole asset par asset | production et intégration | contrôle du nom, format, dimensions, alpha, poids et validation humaine |
| Source de vérité unique | GitHub canonique et registre `10-suivi-production-assets-phase-6.md` | processus de réalisation | historique PR, SHA verrouillé, contrôle de `main` |
| Dossier runtime plat | aucun sous-dossier sous `public/assets/phase-6/` | assets | inspection du diff, test de chemins, audit du manifest |
| Assets traçables | identifiant, provenance, licence, dimensions, poids et statuts P/V/I | toutes | audit du registre, suppression des fichiers remplacés après contrôle |
| Cohérence sans texture | couches de matière avec couleur de fallback | toutes | blocage d’images, contraste, hors ligne |
| Densité compacte | réduction des espacements sans perte tactile | toutes | préférence persistée, 44 px, captures comparatives |
| Phase 6 réversible | PR courtes et lots indépendants | dépôt | comparaison des commits, rollback, absence de migration métier |

## Usage

Toute nouvelle exigence doit ajouter ou mettre à jour une ligne. Une exigence sans vue, règle ou test n’est pas prête à être développée. Une ligne devenue obsolète doit être corrigée dans la même PR que le changement de comportement.

Pour la Phase 6, chaque PR cite les lignes de cette matrice qu’elle couvre et joint les preuves correspondantes : tests, captures, mesures ou audit.
