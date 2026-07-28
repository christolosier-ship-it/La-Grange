# Matrice de traçabilité

| Besoin | Règle / conception | Vue | Tests principaux |
|---|---|---|---|
| Nouveau repo automatique | comparaison par identifiant | Dashboard, activité | unitaires comparator, intégration sync, E2E nouvelle arrivée |
| Consultation immédiate | cache-first | toutes | intégration cache, E2E hors ligne |
| Aucun doublon après renommage | identité numérique stable | catalogue | unitaires comparator, intégration renommage |
| Ouvrir l’application | URL HTTPS validée | carte, fiche | unitaires URL, E2E fiche |
| Données réelles | statistiques dérivées | dashboard | unitaires sélecteurs, audit produit |
| Recherche rapide | index local normalisé | catalogue | unitaires recherche, E2E catalogue |
| Résilience API | instantané atomique | shell, dashboard | intégration 403/500/réponse partielle |
| PWA hors ligne | SW + IndexedDB | toutes | checklist PWA, E2E hors ligne |
| Accessibilité | composants et navigation | toutes | checklist, clavier, VoiceOver |
| Identité visuelle | overrides + fallback | cartes, fiche | unitaires enrichissement, tests image absente |
| Lecture seule | aucune mutation | toutes | revue architecture et sécurité |
| Responsive | layouts adaptatifs | toutes | E2E viewport et contrôle appareil |

## Usage

Toute nouvelle exigence doit ajouter ou mettre à jour une ligne. Une exigence sans vue, règle ou test n’est pas prête à être développée. Une ligne devenue obsolète doit être corrigée dans la même PR que le changement de comportement.
