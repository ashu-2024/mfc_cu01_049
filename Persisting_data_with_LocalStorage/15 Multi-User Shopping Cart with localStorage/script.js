// Selecting Elements
const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("loginBtn");
const cartSection = document.getElementById("cartSection");
const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const itemQuantityInput = document.getElementById("itemQuantity");
const addItemBtn = document.getElementById("addItemBtn");
const cartList = document.getElementById("cartList");
const totalPriceElement = document.getElementById("totalPrice");

let currentUser = null;
let userCart = {};

// Load user data when logged in
loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username === "") {
        alert("Please enter a username.");
        return;
    }

    currentUser = username;
    loadCart();
    cartSection.style.display = "block";
});

// Load Cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem("shoppingCart");
    userCart = storedCart ? JSON.parse(storedCart) : {};

    if (!userCart[currentUser]) {
        userCart[currentUser] = [];
    }

    renderCart();
}

// Add Item to Cart
addItemBtn.addEventListener("click", () => {
    if (!currentUser) {
        alert("Please log in first.");
        return;
    }

    const itemName = itemNameInput.value.trim();
    const itemPrice = parseFloat(itemPriceInput.value);
    const itemQuantity = parseInt(itemQuantityInput.value);

    if (itemName === "" || isNaN(itemPrice) || isNaN(itemQuantity) || itemPrice <= 0 || itemQuantity <= 0) {
        alert("Please enter valid item details.");
        return;
    }

    // Check if item exists, update quantity
    const existingItem = userCart[currentUser].find(item => item.itemName === itemName);
    if (existingItem) {
        existingItem.quantity += itemQuantity;
    } else {
        userCart[currentUser].push({
            itemName,
            price: itemPrice,
            quantity: itemQuantity
        });
    }

    saveCart();
    renderCart();

    // Clear inputs
    itemNameInput.value = "";
    itemPriceInput.value = "";
    itemQuantityInput.value = "";
});

// Save Cart to localStorage
function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(userCart));
}

// Render Cart Items
function renderCart() {
    cartList.innerHTML = "";
    let totalCost = 0;

    userCart[currentUser].forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.itemName} - ₹${item.price} x ${item.quantity} = ₹${itemTotal.toFixed(2)}</span>
            <button class="delete-btn" data-index="${index}">X</button>
        `;
        cartList.appendChild(li);
    });

    totalPriceElement.textContent = totalCost.toFixed(2);
}

// Remove Item from Cart
cartList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");
        userCart[currentUser].splice(index, 1);
        saveCart();
        renderCart();
    }
});
