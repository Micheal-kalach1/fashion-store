import { supabase } from '/config/supabase.js';

// =========================
// CHARGER COMMANDES À PAYER
// =========================
export async function getPendingOrders() {

    const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("statut", "en_attente");

    return data;
}

// =========================
// ENCAISSER UNE COMMANDE
// =========================
export async function validatePayment(order_id, caissier_id, methode) {

    // 1. récupérer commande
    const { data: order } = await supabase
        .from("orders")
        .select("*")
        .eq("id", order_id)
        .single();

    if (!order) return "Commande introuvable";

    // 2. créer paiement
    const { error: payError } = await supabase
        .from("payments")
        .insert([
            {
                order_id,
                caissier_id,
                amount: order.total,
                methode,
                statut: "valide"
            }
        ]);

    if (payError) return payError.message;

    // 3. mettre à jour commande
    await supabase
        .from("orders")
        .update({ statut: "paye" })
        .eq("id", order_id);

    return "PAIEMENT VALIDÉ";
}