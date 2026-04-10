import { supabase } from "../../../config/supabase.js";

export async function getUsers() {

    const { data } = await supabase
        .from("users")
        .select("*");

    return data;
}

export async function approveUser(userId) {

    const { error } = await supabase
        .from("users")
        .update({ statut: "approuve" })
        .eq("id", userId);

    return error ? error.message : "SUCCESS";
}