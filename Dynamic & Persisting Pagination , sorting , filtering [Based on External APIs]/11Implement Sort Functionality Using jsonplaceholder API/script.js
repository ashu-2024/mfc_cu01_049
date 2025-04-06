const productContainer = document.getElementById("product-container");
const sortSelect = document.getElementById("sort");

async function fetchProducts(sortBy = "") {
  try {
    let url = "https://jsonplaceholder.typicode.com/users";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let products = await response.json();

    // Client-side sort since API doesn't support server-side query sort
    if (sortBy) {
      products.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    displayProducts(products);
  } catch (error) {
    productContainer.innerHTML = `<p style="color:red;">Failed to load data: ${error.message}</p>`;
  }
}

function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${product.name}</strong><br>
      Username: ${product.username}<br>
      Email: ${product.email}<br>
      Phone: ${product.phone}<br>
      Website: ${product.website}<br>
      Company: ${product.company.name}
    `;
    productContainer.appendChild(card);
  });
}

// Event listener for sort dropdown
sortSelect.addEventListener("change", () => {
  const sortBy = sortSelect.value;
  fetchProducts(sortBy);
});

// Initial load
fetchProducts();