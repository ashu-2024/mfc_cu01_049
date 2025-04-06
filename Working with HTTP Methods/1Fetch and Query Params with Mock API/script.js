document.getElementById("searchBtn").addEventListener("click", fetchProducts);

async function fetchProducts() {
  const category = document.getElementById("category").value;
  const min = document.getElementById("minPrice").value;
  const max = document.getElementById("maxPrice").value;
  const productList = document.getElementById("productList");
  const message = document.getElementById("message");

  // Clear previous state
  productList.innerHTML = '';
  message.textContent = 'Loading...';

  // Construct URL
  const url = `https://mockapi.io/products?category=${category}&min_price=${min}&max_price=${max}&sort=asc`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");

    const products = await res.json();

    if (products.length === 0) {
      message.textContent = "No products found!";
      return;
    }

    message.textContent = '';

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="{product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      `;

      productList.appendChild(card);
    });
  } catch (error) {
    message.textContent = "Error fetching products!";
    console.error(error);
  }
}
