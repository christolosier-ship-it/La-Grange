# Phase 5 — Activité et paramètres

La phase est livrée en deux PR successives : Phase 5A pour le journal local, Phase 5B pour les profils, préférences et actions de maintenance.

## Phase 5A — Activité

- journal local des ajouts, renommages, disparitions, archivages et changements d’URL d’application détectés ;
- aucun événement lors du premier import complet ;
- lecture isolée par utilisateur ;
- validation profonde de chaque entrée ;
- tri du plus récent au plus ancien ;
- regroupement par semaine puis par jour dans le fuseau local ;
- formulations prudentes et centralisées ;
- rétention de 500 événements par utilisateur ;
- route canonique pour le projet courant ;
- nom connu sans lien mort pour un dépôt disparu ;
- états chargement, vide, hors ligne, cache indisponible et données partiellement invalides ;
- aucune requête GitHub déclenchée par la consultation.

## Phase 5B — Paramètres

- profil GitHub public validé, `christolosier-ship-it` par défaut ;
- snapshots et événements isolés par utilisateur ;
- confirmation avant changement de profil ;
- restauration de l’ancien profil lorsqu’aucune donnée du nouveau profil n’est utilisable ;
- préférences versionnées et migration des favoris et du mode catalogue de Phase 4 ;
- masquage local des forks et archives sans suppression du cache ;
- fréquence bornée à 5, 15, 30 ou 60 minutes ;
- densité confortable ou compacte ;
- réduction des animations combinée au réglage système ;
- liste des favoris, retrait individuel et suppression globale confirmée ;
- informations réelles du cache actif ;
- reset confirmé du profil actif uniquement ;
- version de l’application ;
- diagnostic local copiable limité aux états, compteurs et préférences.

## Décisions précisées

Les préférences d’affichage sont globales à ce navigateur dans le MVP. Changer de profil modifie uniquement la session et les données distantes affichées. Les favoris sont donc conservés globalement ; une référence absente du profil courant est présentée sans lien mort et peut être retirée.

Masquer un fork ou une archive agit sur les listes du dashboard et du catalogue. La fiche reste accessible par URL directe et explique la préférence appliquée.

Le reset supprime le snapshot, les événements et les détails réellement rattachés au profil actif. Il préserve les préférences et tous les autres profils. Aucune synchronisation automatique n’est déclenchée après confirmation.

Aucun champ d’authentification GitHub n’est présent. L’application reste fondée sur l’API publique et en lecture seule.

## Critères de sortie

- préférences persistantes et migrées ;
- valeurs invalides réparées individuellement ;
- changement de profil isolé et annulable avant confirmation ;
- reset ciblé, confirmé et sans résurrection de données en mémoire ;
- activité cohérente avec les changements connus ;
- aucun événement inventé ;
- paramètres utilisables au clavier et sur mobile ;
- modales avec focus piégé, Échap et restitution du focus ;
- diagnostic sans donnée sensible ;
- tests de migration, profil, cache, affichage et diagnostics ;
- aucune régression des Phases 1 à 4 ;
- aucun fil P1 ou P2 ouvert avant chaque fusion.
