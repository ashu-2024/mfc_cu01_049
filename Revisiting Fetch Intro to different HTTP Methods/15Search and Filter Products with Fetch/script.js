const API_URL = "https://fakestoreapi.com/products";
const CATEGORY_URL = "https://fakestoreapi.com/products/categories";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const productContainer = document.getElementById("productContainer");
const productCount = document.getElementById("productCount");

let allProducts = [];

// Fetch products when the page loads
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allProducts = data;
        displayProducts(allProducts);
    } catch (error) {
        productContainer.innerHTML = "<p>Error fetching products. Please try again later.</p>";
    }
}

// Fetch categories and populate the dropdown
async function fetchCategories() {
    try {
        const response = await fetch(CATEGORY_URL);
        const categories = await response.json();
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// Display products dynamically
function displayProducts(products) {
    productContainer.innerHTML = "";
    productCount.textContent = `Showing ${products.length} products`;

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <p>${product.category}</p>
        `;

        productContainer.appendChild(productCard);
    });
}

// Handle search
searchInput.addEventListener("input", () => {
    filterProducts();
});

// Handle category filter
categoryFilter.addEventListener("change", () => {
    filterProducts();
});

// Handle sorting
sortPrice.addEventListener("change", () => {
    filterProducts();
});

// Filter products based on search, category, and sorting
function filterProducts() {
    let filteredProducts = allProducts;

    // Search filter
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchValue)
        );
    }

    // Category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Sort by price
    const sortOption = sortPrice.value;
    if (sortOption === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}

// Initialize the app
fetchProducts();
fetchCategories();
