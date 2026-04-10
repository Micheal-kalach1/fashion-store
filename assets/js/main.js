import { supabase } from "../config/supabase.js";
import { redirectByRole } from "./redirect.js";

// =========================
// SESSION AUTO CHECK
// =========================
async function initApp() {

    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (profile) {
        redirectByRole(profile.role);
    }
}

initApp();