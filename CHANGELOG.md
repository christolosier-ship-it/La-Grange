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
- tests unitaires et d’intégration couvrant pagination, mapping, enrichissement, nouveaux dépôts, renommage, mode hors ligne, erreurs réseau et flux de synchronisation unique ;
- smoke test dynamique exécutant le véritable client de production contre les dépôts publics réels avant fusion et déploiement ;
- dashboard de phase 3 avec quatre statistiques réelles, L’établi, Prêts à partir, activité synthétique, répartition et nouvelle arrivée ;
- cartes projets accessibles avec variantes, couverture chargée paresseusement et fallback déterministe ;
- états complets du dashboard pour cache, synchronisation, hors ligne, avertissement, erreur et inventaire vide ;
- tests de composants et sélecteurs couvrant les données, les images absentes, les sections vides et le déclenchement de synchronisation ;
- catalogue de phase 4 avec recherche locale insensible aux accents et à la casse, filtres combinables, tris stables, favoris et modes grille/liste ;
- contexte utile du catalogue conservé dans le hash et préférences légères enregistrées localement ;
- fiches projets responsive avec illustration, actions sûres, métadonnées, topics et retour contextualisé ;
- détails GitHub chargés uniquement à la demande pour le dépôt ouvert : trois commits, dernière release et existence du README ;
- cache IndexedDB séparé de 45 minutes pour les détails projets et alias locaux des dépôts renommés ;
- tests unitaires, d’intégration et smoke test réel couvrant le catalogue, les fiches et les détails ciblés ;
- journal d’activité local de phase 5A, regroupé par semaine et par jour à partir des changements réellement détectés ;
- lecture IndexedDB des événements isolée par utilisateur, validée profondément et résistante aux entrées locales corrompues ;
- états accessibles du journal pour chargement, vide, hors ligne, erreur de cache et données partiellement invalides.

### Corrigé

- ajout du `package-lock.json` requis pour rendre `npm ci` et le cache GitHub Actions reproductibles ;
- remise en état des workflows CI et GitHub Pages sous Node.js 22 ;
- isolation du cache du service worker afin de ne jamais supprimer les caches d’autres applications du domaine ;
- suppression du chemin GitHub Pages codé en dur dans le service worker ;
- ajout des icônes PNG 192, 512, maskable et Apple Touch ;
- correction de la configuration TypeScript et ESLint ;
- normalisation des routes, navigation active des fiches projet et retour accessible depuis la page introuvable ;
- sécurisation de l’avis de mise à jour PWA et couverture de tests associée ;
- suppression de tous les en-têtes conditionnels côté navigateur afin de garantir une requête CORS simple sur Safari/iOS ;
- amélioration des messages de diagnostic réseau, HTTP et de format de données du client GitHub ;
- renouvellement automatique du service worker et du cache applicatif avec affichage de la version exécutée ;
- conservation du récepteur natif `Window` lors de l’appel à `fetch`, requise par Safari/iOS ;
- navigation principale restructurée pour un rail latéral sur tablette et bureau et une barre basse sur mobile ;
- acquittement persistant du marqueur « Nouvelle arrivée » lors de l’ouverture d’une fiche ;
- conservation du snapshot mémoire pendant les rafraîchissements manuels et en cas d’échec IndexedDB ;
- respect du délai de reprise GitHub après une limite API, avec heure affichée et bouton temporairement désactivé ;
- signalement des liens externes nécessitant une connexion en mode hors ligne ;
- centralisation des libellés d’état utilisés par les cartes et le panneau d’activité ;
- conservation d’une ancienne URL de fiche après renommage du dépôt, avec redirection locale vers le nom courant ;
- maintien des détails locaux et de la fiche de base lors d’une erreur GitHub ou IndexedDB ;
- prévention des rendus réentrants lors de l’ouverture d’une fiche projet ;
- affichage du message utilisateur localisé lors d’un échec initial du catalogue ;
- conservation du focus clavier pendant le chargement et les délais de reprise des détails GitHub ;
- reconnaissance des limites secondaires GitHub signalées par `403` et `Retry-After`.

## Versionnement prévu

- `0.x` : construction et prototypes ;
- `1.0.0` : MVP stable publié ;
- correctif : correction compatible ;
- mineur : fonction compatible ;
- majeur : rupture de données, d’API interne ou d’expérience.
