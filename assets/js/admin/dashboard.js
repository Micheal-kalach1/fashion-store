import { supabase } from '/config/supabase.js';

// =========================
// CHARGER STATISTIQUES
// =========================
export async function loadDashboard() {

    // TOTAL USERS
    const { data: users } = await supabase.from("users").select("*");

    // TOTAL PRODUCTS
    const { data: products } = await supabase.from("products").select("*");

    // TOTAL ORDERS
    const { data: orders } = await supabase.from("orders").select("*");

    // TOTAL PAYMENTS
    const { data: payments } = await supabase.from("payments").select("*");

    return {
        users: users.length,
        products: products.length,
        orders: orders.length,
        revenue: payments.reduce((sum, p) => sum + p.amount, 0)
    };
}