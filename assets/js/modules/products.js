import { supabase } from '/config/supabase.js';

/* =========================
   LISTE PRODUITS
========================= */
export async function getProducts() {

    const { data } = await supabase
        .from("products")
        .select("*");

    return data;
}

/* =========================
   AJOUT PRODUIT
========================= */
export async function addProduct(product) {

    const { error } = await supabase
        .from("products")
        .insert([product]);

    return error ? error.message : "SUCCESS";
}