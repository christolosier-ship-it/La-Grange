# Prompt d’audit final

Audite La Grange avant release en utilisant `docs/04-qualite/08-checklist-audit-final.md`.

## Méthode

- analyser tout le code, pas seulement le README ;
- comparer l’architecture réelle aux ADR ;
- exécuter les commandes qualité ;
- inspecter le build ;
- tester API simulée, cache et hors ligne ;
- vérifier mobile, tablette et bureau ;
- rechercher les secrets ;
- vérifier liens et protocoles ;
- contrôler le service worker et les migrations ;
- confronter chaque critère MVP au comportement observable.

## Rapport

Produire :

- synthèse Go / No-Go ;
- anomalies classées ;
- preuves de tests ;
- écarts documentaires ;
- performances ;
- accessibilité ;
- sécurité ;
- PWA ;
- corrections obligatoires avant release ;
- risques résiduels acceptables.

Ne jamais conclure « tout est bon » sans preuve. Une limite d’outil ou un test non réalisable doit être déclaré.
