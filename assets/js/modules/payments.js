import { supabase } from '/config/supabase.js';

/* =========================
   PAIEMENT
========================= */
export async function createPayment(order_id, caissier_id, amount, methode) {

    const { error } = await supabase.from("payments").insert([
        {
            order_id,
            caissier_id,
            amount,
            methode,
            statut: "valide"
        }
    ]);

    return error ? error.message : "SUCCESS";
}