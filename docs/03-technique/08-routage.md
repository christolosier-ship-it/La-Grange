# Routage

## Choix

Routeur par fragment URL (`location.hash`) pour une compatibilité directe avec GitHub Pages sans règle de réécriture serveur.

## Contrat

```ts
interface RouteDefinition {
  pattern: RegExp;
  render(params: Record<string, string>): Promise<ViewResult> | ViewResult;
  title(params: Record<string, string>): string;
}
```

## Comportements

- décoder et valider les paramètres ;
- afficher une vue introuvable plutôt que lancer une exception ;
- mettre à jour le titre du document ;
- gérer focus et annonce de changement de vue ;
- conserver l’état de catalogue dans le store ;
- supporter précédent/suivant du navigateur.

## Route projet

Le nom du dépôt est lisible mais la résolution finale se fait contre le store. En cas de renommage, une table d’alias locale peut rediriger vers le nouveau nom si l’identifiant est connu.

## Liens

Les liens internes utilisent le routeur. Les liens externes utilisent `noopener` et `noreferrer` lorsque nécessaire. Aucun routeur ne doit intercepter une URL GitHub ou d’application.
