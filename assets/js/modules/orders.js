import { supabase } from "../../../config/supabase.js";

/* =========================
   CREER COMMANDE
========================= */
export async function createOrder(client_id, total) {

    const { error } = await supabase.from("orders").insert([
        {
            client_id,
            total,
            statut: "en_attente"
        }
    ]);

    return error ? error.message : "SUCCESS";
}
import { reduceStock } from "./stock.js";

for (let item of cart) {
    await supabase.from("order_items").insert([
        {
            order_id: orderId,
            product_id: item.id,
            quantity: item.quantity,
            price: item.prix
        }
    ]);

    // 🔥 diminution stock
    await reduceStock(item.id, item.quantity);
}