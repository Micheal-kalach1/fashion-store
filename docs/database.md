# Base de données (Supabase / PostgreSQL)

## Tables principales

- `users` : profils applicatifs
- `products` : catalogue
- `orders` : commandes clients
- `order_items` : lignes de commande
- `payments` : encaissements
- `receipts` : reçus générés
- `negotiations` : échanges de négociation client-vendeur

## Bonnes pratiques

- Utiliser des UUID pour les identifiants applicatifs.
- Activer RLS sur les tables exposées au client.
- Restreindre `insert/update/delete` selon le rôle métier.
- Ajouter des index sur les colonnes de filtre fréquentes (`client_id`, `order_id`, `statut`).
