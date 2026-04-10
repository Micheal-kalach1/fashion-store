import { supabase } from '/config/supabase.js';

/* =========================
   INSCRIPTION
========================= */
export async function registerUser(nom, email, password, role) {

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) return error.message;

    const userId = data.user.id;

    await supabase.from("users").insert([
        {
            id: userId,
            nom,
            email,
            role,
            statut: "en_attente"
        }
    ]);

    return "SUCCESS";
}

/* =========================
   LOGIN
========================= */
export async function loginUser(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) return error.message;

    const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

    return user;
}