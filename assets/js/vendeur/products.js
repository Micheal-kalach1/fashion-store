import { supabase } from '/config/supabase.js';

// =========================
// AJOUT PRODUIT VENDEUR
// =========================
export async function createProduct(product) {

    const { error } = await supabase
        .from("products")
        .insert([product]);

    return error ? error.message : "AJOUTÉ";
}