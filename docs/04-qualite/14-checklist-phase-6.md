# Checklist qualité de la Phase 6

## Usage

Cette checklist couvre l’historique 6A et l’étape active 6B. Les étapes UI/UX suivantes ne sont pas encore définies. Aucun agent ne doit les inventer.

## Gouvernance

- [ ] document de phase lu ;
- [ ] contrat 6B lu ;
- [ ] ADR-009 et ADR-010 lus ;
- [ ] registre exact ;
- [ ] périmètre limité ;
- [ ] aucun changement futur implicite ;
- [ ] PR courte et réversible.

## Assets

- [ ] source approuvée et versionnée ;
- [ ] nom exact ;
- [ ] format exact ;
- [ ] dimensions exactes ;
- [ ] alpha exact ;
- [ ] poids mesuré ;
- [ ] provenance et droits ;
- [ ] fallback ;
- [ ] fichier canonique à plat ;
- [ ] aucun prototype hérité utilisé ;
- [ ] aucun texte fonctionnel rasterisé ;
- [ ] aucun asset distant ;
- [ ] aucun ZIP ou Base64 ;
- [ ] P/V/I exacts.

## Phase 6B : shell et dashboard

- [ ] rail gauche fixe ;
- [ ] navigation complète ;
- [ ] synchronisation dans le rail ;
- [ ] version en bas ;
- [ ] état admin en bas ;
- [ ] contenu principal seul défilant ;
- [ ] bandeau WebP unique ;
- [ ] statistiques HTML ;
- [ ] grille continue ;
- [ ] aucun en-tête de section ;
- [ ] aucun lien redondant ;
- [ ] aucun rail droit ;
- [ ] aucun panneau derrière les cartes ;
- [ ] fond Phase 6A inchangé sous la grille.

## Phase 6B : cartes

- [ ] skin WebP partagé ;
- [ ] couverture ou fallback ;
- [ ] style et bannière ;
- [ ] palette ;
- [ ] version ;
- [ ] date relative et date complète ;
- [ ] progression manuelle facultative ;
- [ ] cinq actions sur une ligne ;
- [ ] GitHub ;
- [ ] application ;
- [ ] README ;
- [ ] détail ;
- [ ] personnalisation admin ;
- [ ] infobulles au survol et au focus ;
- [ ] état archivé lisible ;
- [ ] nom long ;
- [ ] description longue ;
- [ ] image en erreur.

## Modale

- [ ] invisible hors admin ;
- [ ] titre et description accessibles ;
- [ ] focus piégé ;
- [ ] fermeture Échap ;
- [ ] restauration du focus ;
- [ ] aperçu ;
- [ ] choix du style ;
- [ ] couleurs ;
- [ ] progression ;
- [ ] version ;
- [ ] couverture et recadrage ;
- [ ] annulation sans effet ;
- [ ] publication avec état ;
- [ ] erreur annoncée ;
- [ ] conflit annoncé ;
- [ ] lien vers la PR.

## GitHub et serveur

- [ ] GitHub App limitée au dépôt ;
- [ ] permissions minimales ;
- [ ] secret serveur seulement ;
- [ ] session sécurisée ;
- [ ] compte autorisé ;
- [ ] CSRF et origine ;
- [ ] schéma strict ;
- [ ] chemins autorisés ;
- [ ] base SHA contrôlée ;
- [ ] branche créée ;
- [ ] commit créé ;
- [ ] PR créée ;
- [ ] aucune fusion automatique ;
- [ ] aucun commit direct sur `main`.

## Couverture

- [ ] PNG/JPEG/WebP accepté ;
- [ ] autre format refusé ;
- [ ] signature réelle contrôlée ;
- [ ] taille maximale ;
- [ ] recadrage 8:5 ;
- [ ] 640 × 400 ;
- [ ] métadonnées retirées ;
- [ ] WebP final ;
- [ ] 35 à 80 Ko visés ;
- [ ] nom canonique ;
- [ ] ancienne référence remplacée proprement.

## Accessibilité

- [ ] clavier ;
- [ ] focus ;
- [ ] cibles 44 px ;
- [ ] contraste ;
- [ ] infobulles non exclusives ;
- [ ] alt ;
- [ ] lecteurs d’écran ;
- [ ] zoom 200 % ;
- [ ] mouvement réduit ;
- [ ] images bloquées ;
- [ ] messages d’état.

## Formats 6B

- [ ] tablette paysage 1024 px ;
- [ ] tablette paysage 1366 px ;
- [ ] bureau 1440 px ;
- [ ] grand bureau 1920 px ;
- [ ] écran bas ;
- [ ] zoom 200 %.

La robustesse étroite peut être testée, mais 6B ne définit pas une expérience smartphone dédiée.

## Performance

- [ ] CSS et JS avant/après ;
- [ ] poids des assets ;
- [ ] requêtes initiales ;
- [ ] lazy loading ;
- [ ] ratios réservés ;
- [ ] LCP ;
- [ ] CLS ;
- [ ] cache froid/chaud ;
- [ ] grille complète ;
- [ ] modale chargée à la demande ;
- [ ] upload mesuré.

## CI et revue

- [ ] `npm ci` ;
- [ ] typecheck ;
- [ ] lint ;
- [ ] tests ;
- [ ] smoke tests ;
- [ ] build ;
- [ ] diff relu ;
- [ ] revue demandée ;
- [ ] fils interrogés ;
- [ ] P1/P2 corrigés ;
- [ ] CI verte sur le SHA exact ;
- [ ] `main` contrôlé.

## No-Go

No-Go si secret, écriture hors liste blanche, progression déduite, conteneur de section réintroduit, rail droit réintroduit, bouton admin public, PR fusionnée automatiquement, fallback cassé, régression hors ligne, budget non approuvé ou P1/P2 ouvert.
