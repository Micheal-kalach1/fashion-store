import { supabase } from "../../../config/supabase.js";

export async function loadCashierStats() {

    const { data: payments } = await supabase
        .from("payments")
        .select("*");

    const total = payments.reduce((sum, p) => sum + p.amount, 0);

    const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .eq("statut", "paye");

    return {
        totalEncaisse: total,
        totalTransactions: payments.length,
        commandesPayees: orders.length
    };
}