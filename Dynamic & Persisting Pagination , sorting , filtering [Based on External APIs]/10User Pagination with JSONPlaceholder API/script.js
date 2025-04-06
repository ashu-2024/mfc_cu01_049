const userContainer = document.getElementById("user-container");
const pagination = document.getElementById("pagination");

const USERS_PER_PAGE = 6;
const TOTAL_USERS = 10; // JSONPlaceholder has 10 users total
const TOTAL_PAGES = Math.ceil(TOTAL_USERS / USERS_PER_PAGE);

// Function to fetch and display users for a given page
async function fetchUsers(page) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${USERS_PER_PAGE}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

// Function to display users in the DOM
function displayUsers(users) {
  userContainer.innerHTML = ""; // Clear old content

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <strong>${user.name}</strong><br>
      Username: ${user.username}<br>
      Email: ${user.email}<br>
      Phone: ${user.phone}<br>
      Company: ${user.company.name}
    `;
    userContainer.appendChild(card);
  });
}

// Function to create pagination buttons
function setupPagination() {
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "pagination-btn";
    btn.addEventListener("click", () => fetchUsers(i));
    pagination.appendChild(btn);
  }
}

// Initial load
fetchUsers(1);
setupPagination();