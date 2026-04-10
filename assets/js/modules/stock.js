import { supabase } from "../../../config/supabase.js";

// =========================
// DIMINUER STOCK
// =========================
export async function reduceStock(product_id, quantity) {

    const { data } = await supabase
        .from("products")
        .select("stock")
        .eq("id", product_id)
        .single();

    const newStock = data.stock - quantity;

    await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", product_id);
}