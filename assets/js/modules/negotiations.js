import { supabase } from "../../../config/supabase.js";

// =========================
// ENVOYER MESSAGE
// =========================
export async function sendMessage(order_id, sender_id, message) {

    const { error } = await supabase.from("negotiations").insert([
        {
            order_id,
            client_id: sender_id,
            vendeur_id: sender_id,
            price_offer: message,
            statut: "en_cours"
        }
    ]);

    return error ? error.message : "MESSAGE ENVOYÉ";
}

// =========================
// LISTER MESSAGES
// =========================
export async function getMessages(order_id) {

    const { data } = await supabase
        .from("negotiations")
        .select("*")
        .eq("order_id", order_id);

    return data;
}