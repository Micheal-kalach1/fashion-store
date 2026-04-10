# Fashion Store

Application web minimaliste et professionnelle pour une boutique de mode.

## Fonctionnalités

- API HTTP légère (Node.js natif) pour consulter les produits
- Frontend statique simple pour afficher le catalogue
- Structure modulaire (config, routes, services, data)
- Tests unitaires via `node:test`

## Démarrage

```bash
npm run dev
```

Puis ouvrir : `http://localhost:3000`

## Scripts

- `npm run dev` : démarre le serveur en mode développement
- `npm start` : démarre le serveur
- `npm test` : lance les tests

## Endpoints API

- `GET /api/health` : état du service
- `GET /api/products` : liste des produits
- `GET /api/products/:id` : détail d'un produit
