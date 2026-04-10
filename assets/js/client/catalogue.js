import { supabase } from "../../../config/supabase.js";
import { addToCart } from "./cart.js";

const container = document.getElementById("products");

async function loadProducts() {

    const { data } = await supabase
        .from("products")
        .select("*");

    container.innerHTML = data.map(p => `
        <div class="card">
            <h3>${p.nom}</h3>
            <p>${p.prix} FCFA</p>

            <button onclick='addProductToCart(${JSON.stringify(p)})'>
                Ajouter au panier
            </button>
        </div>
    `).join("");
}

// wrapper global
window.addProductToCart = (product) => {
    addToCart(product);
    alert("Ajouté au panier !");
};

loadProducts();