-- Exemples de politiques RLS (à adapter selon votre auth)

alter table if exists users enable row level security;
alter table if exists orders enable row level security;
alter table if exists products enable row level security;

-- Lecture produits ouverte aux utilisateurs authentifiés
create policy if not exists products_select_auth
on products
for select
to authenticated
using (true);

-- Un client peut voir uniquement ses commandes
create policy if not exists orders_select_own
on orders
for select
to authenticated
using (client_id = auth.uid());
