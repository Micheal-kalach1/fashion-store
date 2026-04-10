-- Données minimales de démonstration

insert into products (id, nom, prix, stock, categorie)
values
  ('11111111-1111-1111-1111-111111111111', 'Blazer Femme', 35000, 8, 'women'),
  ('22222222-2222-2222-2222-222222222222', 'Chemise Homme', 22000, 15, 'men'),
  ('33333333-3333-3333-3333-333333333333', 'Sneakers Unisex', 45000, 5, 'unisex')
on conflict (id) do nothing;
