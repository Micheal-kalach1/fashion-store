const productList = document.querySelector('#product-list');

async function loadProducts() {
  productList.innerHTML = '<li>Chargement...</li>';

  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error(`Erreur API (${response.status})`);
    }

    const payload = await response.json();
    const products = payload.data || [];

    if (products.length === 0) {
      productList.innerHTML = '<li>Aucun produit disponible.</li>';
      return;
    }

    productList.innerHTML = products
      .map(
        (item) => `
        <li class="product-card">
          <h3>${item.name}</h3>
          <p>Catégorie: ${item.category}</p>
          <p>Prix: ${item.price} ${item.currency}</p>
          <p>${item.inStock ? 'En stock' : 'Rupture'}</p>
        </li>
      `
      )
      .join('');
  } catch (error) {
    productList.innerHTML = `<li>${error.message}</li>`;
  }
}

loadProducts();
