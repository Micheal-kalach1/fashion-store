import { supabase } from "../../../config/supabase.js";

// =========================
// LISTE PRODUITS ADMIN
// =========================
export async function getAllProducts() {

    const { data } = await supabase
        .from("products")
        .select("*");

    return data;
}

// =========================
// SUPPRESSION PRODUIT
// =========================
export async function deleteProduct(id) {

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    return error ? error.message : "SUPPRIMÉ";
}