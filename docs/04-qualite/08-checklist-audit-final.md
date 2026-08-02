# Checklist d’audit final

## Cohérence produit

- [ ] les projets publics apparaissent automatiquement ;
- [ ] les données GitHub restent factuelles ;
- [ ] la progression est facultative et clairement manuelle ;
- [ ] la version suit la priorité documentée ;
- [ ] la personnalisation ne devient pas un outil de gestion GitHub ;
- [ ] aucune fonction future non cadrée n’est présente.

## Architecture

- [ ] consultation publique séparée de l’administration ;
- [ ] GitHub App limitée à `La-Grange` ;
- [ ] Functions sous la même origine canonique ;
- [ ] aucun secret côté client ;
- [ ] aucun commit direct sur `main` ;
- [ ] aucune fusion automatique ;
- [ ] conflit Git géré ;
- [ ] liste blanche des chemins.

## Dashboard 6B

- [ ] rail gauche fixe ;
- [ ] marque, navigation et synchronisation dans le rail ;
- [ ] version et état admin au bas du rail ;
- [ ] contenu principal défilant ;
- [ ] un seul bandeau de statistiques WebP ;
- [ ] quatre statistiques HTML réelles ;
- [ ] aucune carte statistique indépendante ;
- [ ] aucune section « L’établi » ou « Prêts à partir » ;
- [ ] aucun en-tête de section ;
- [ ] aucun lien « Voir tout l’inventaire » ;
- [ ] aucun rail droit ;
- [ ] aucun fond local derrière la grille ;
- [ ] cartes directement sur le fond général.

## Carte projet

- [ ] couverture 640 × 400 ou fallback ;
- [ ] style parmi neuf valeurs ;
- [ ] trio de couleurs cohérent ;
- [ ] version ;
- [ ] dernière activité ;
- [ ] progression facultative ;
- [ ] cinq actions alignées ;
- [ ] application absente gérée ;
- [ ] README absent géré ;
- [ ] bouton admin masqué hors session ;
- [ ] infobulles au survol et au focus.

## Modale et publication

- [ ] focus initial ;
- [ ] piège Tab ;
- [ ] fermeture Échap ;
- [ ] restauration du focus ;
- [ ] aperçu exact ;
- [ ] progression 0–100 ;
- [ ] réinitialisation des couleurs du style ;
- [ ] validation de la couverture ;
- [ ] statut de création de PR ;
- [ ] URL de PR affichée ;
- [ ] aucune annonce « publié » avant déploiement ;
- [ ] erreur et conflit récupérables ;
- [ ] hors ligne explicite.

## Sécurité

- [ ] authentification réelle ;
- [ ] utilisateur autorisé ;
- [ ] cookie sécurisé ;
- [ ] CSRF ;
- [ ] contrôle d’origine ;
- [ ] limites de taille ;
- [ ] octets magiques des images ;
- [ ] métadonnées retirées ;
- [ ] schéma strict ;
- [ ] URLs et chemins imposés côté serveur ;
- [ ] logs sans secret ;
- [ ] dépendances auditées.

## Accessibilité

- [ ] landmarks ;
- [ ] un seul `h1` accessible ;
- [ ] clavier complet ;
- [ ] focus visible ;
- [ ] contraste ;
- [ ] cibles 44 px ;
- [ ] infobulles non indispensables ;
- [ ] dates complètes accessibles ;
- [ ] alt des couvertures ;
- [ ] décor hors arbre ;
- [ ] zoom 200 % ;
- [ ] VoiceOver ou équivalent ;
- [ ] mouvement réduit.

## Performance et PWA

- [ ] poids des WebP ;
- [ ] poids des SVG ;
- [ ] requêtes initiales ;
- [ ] lazy loading ;
- [ ] ratio réservé ;
- [ ] LCP ;
- [ ] CLS ;
- [ ] cache froid et chaud ;
- [ ] hors ligne ;
- [ ] images bloquées ;
- [ ] mise à jour après fusion ;
- [ ] même configuration sur deux appareils après déploiement.

## Documentation et release

- [ ] tous les documents correspondent à l’implémentation ;
- [ ] registre d’assets clôturé ;
- [ ] ADR-010 respecté ;
- [ ] captures tablette paysage et bureau ;
- [ ] aucun P1/P2 ;
- [ ] Phase 7 lancée seulement après clôture de la Phase 6.
