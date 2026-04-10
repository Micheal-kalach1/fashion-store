users (
    id uuid primary key,
    nom text,
    email text,
    role text,
    statut text
);

products (
    id uuid primary key,
    nom text,
    prix int,
    stock int,
    vendeur_id uuid
);

orders (
    id uuid primary key,
    client_id uuid,
    total int,
    statut text,
    created_at timestamp
);

order_items (
    id uuid primary key,
    order_id uuid,
    product_id uuid,
    quantity int,
    price int
);

payments (
    id uuid primary key,
    order_id uuid,
    caissier_id uuid,
    amount int,
    methode text
);

negotiations (
    id uuid primary key,
    order_id uuid,
    client_id uuid,
    vendeur_id uuid,
    price_offer text
);