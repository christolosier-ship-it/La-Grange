# Déploiement Netlify

## Rôle

Netlify devient la cible canonique de La Grange lorsque la personnalisation 6B est activée. Il sert le build statique et les Functions sous une même origine.

## Composants

- build Vite ;
- fichiers PWA ;
- Netlify Functions ;
- variables serveur ;
- redirections OAuth ;
- en-têtes de sécurité ;
- déploiements de prévisualisation des PR.

## Variables serveur

Exemples de secrets attendus :

- identifiant GitHub App ;
- clé privée GitHub App ;
- identifiant d’installation ;
- secret OAuth ;
- secret de session ;
- liste des comptes administrateurs ;
- dépôt propriétaire et nom imposés.

Ils ne portent jamais le préfixe public de Vite et ne sont jamais copiés dans le build.

## Flux

1. push ou merge sur `main` ;
2. installation ;
3. typecheck, lint et tests ;
4. build ;
5. déploiement des fichiers et Functions ;
6. smoke tests ;
7. activation ;
8. notification de mise à jour PWA.

## OAuth

- callback HTTPS exact ;
- état OAuth signé et à durée courte ;
- redirection limitée à l’origine ;
- session en cookie sécurisé ;
- déconnexion invalidant la session ;
- bouton de personnalisation affiché uniquement après lecture de session réussie.

## Functions minimales

- `GET /api/admin/session` ;
- `POST /api/admin/login` ou démarrage OAuth ;
- `POST /api/admin/logout` ;
- `POST /api/projects/:repositoryName/customization-pr`.

Les noms exacts peuvent évoluer pendant l’implémentation, sans modifier leurs responsabilités.

## Publication d’une couverture

Le traitement d’image se déroule côté serveur ou dans un traitement isolé validé. Le fichier final est ajouté à la branche de personnalisation avec le patch JSON dans le même commit lorsque possible.

## Prévisualisations

Une PR de personnalisation peut obtenir une URL de preview Netlify. Cette preview est utile pour valider la carte avant fusion. Elle ne remplace pas la revue GitHub.

## Sécurité

- CSP ;
- HSTS ;
- `X-Content-Type-Options` ;
- politique de frame ;
- cookies sécurisés ;
- CORS limité à l’origine ;
- limitation de débit ;
- taille des corps ;
- logs sans secret.

## Rollback

Le rollback consiste à redéployer un commit antérieur de `main`. Les PR non fusionnées n’affectent pas la production. Le dernier cache PWA valide reste utilisable pendant la propagation.
