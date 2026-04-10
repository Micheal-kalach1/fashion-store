import { supabase } from '/config/supabase.js';

// =========================
// GENERER REÇU
// =========================
export async function generateReceipt(payment_id) {

    const { data: payment } = await supabase
        .from("payments")
        .select("*")
        .eq("id", payment_id)
        .single();

    if (!payment) return "Paiement introuvable";

    const reference = "REC-" + Date.now();

    const { error } = await supabase
        .from("receipts")
        .insert([
            {
                payment_id,
                reference
            }
        ]);

    return error ? error.message : reference;
}