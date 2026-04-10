import { supabase } from "../../../config/supabase.js";

// =========================
// VENTES PAR MOIS
// =========================
export async function getMonthlySales() {

    const { data } = await supabase
        .from("orders")
        .select("created_at, total");

    const stats = {};

    data.forEach(o => {

        const month = new Date(o.created_at)
            .toISOString()
            .slice(0, 7);

        stats[month] = (stats[month] || 0) + o.total;
    });

    return stats;
}