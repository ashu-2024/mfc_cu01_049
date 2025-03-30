// Function to fetch and display products
async function fetchProducts() {
    const productList = document.getElementById('product-list');
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p><strong>Price:</strong> $${product.price}</p>
                <button onclick="viewDetails('${product.title}', '${product.price}')">View Details</button>
            `;

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        errorMessage.textContent = 'Failed to fetch products. Please try again later.';
    }
}

// Function to display product details (Alert for now)
function viewDetails(title, price) {
    alert(`Product: ${title}\nPrice: ₹${price}`);
}

// Call function on page load
fetchProducts();
