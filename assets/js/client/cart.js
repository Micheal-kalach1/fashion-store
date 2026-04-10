import { supabase } from '/config/supabase.js';

// =========================
// PANIER LOCAL STORAGE
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   AJOUTER AU PANIER
========================= */
export function addToCart(product) {

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            nom: product.nom,
            prix: product.prix,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   AFFICHER PANIER
========================= */
export function getCart() {
    return cart;
}

/* =========================
   SUPPRIMER PRODUIT
========================= */
export function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   TOTAL PANIER
========================= */
export function getTotal() {

    return cart.reduce((sum, item) => {
        return sum + item.prix * item.quantity;
    }, 0);
}

/* =========================
   VALIDER COMMANDE
========================= */
export async function checkout(userId) {

    if (cart.length === 0) return "PANIER VIDE";

    const total = getTotal();

    // 1. créer commande
    const { data, error } = await supabase
        .from("orders")
        .insert([
            {
                client_id: userId,
                total,
                statut: "en_attente"
            }
        ])
        .select()
        .single();

    if (error) return error.message;

    const orderId = data.id;

    // 2. ajouter items
    for (let item of cart) {
        await supabase.from("order_items").insert([
            {
                order_id: orderId,
                product_id: item.id,
                quantity: item.quantity,
                price: item.prix
            }
        ]);
    }

    // 3. vider panier
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    return "COMMANDE ENVOYÉE";
}