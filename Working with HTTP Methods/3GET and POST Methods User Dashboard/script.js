const API_URL = "https://mockapi.io/users"; // Replace with your actual mockapi.io URL
const userList = document.getElementById("userList");
const message = document.getElementById("message");
const userForm = document.getElementById("userForm");

// Store users for duplicate check
let users = [];

// Fetch and display users
async function fetchUsers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch users");
    users = await res.json();
    renderUsers(users);
  } catch (error) {
    showMessage(error.message, "error");
  }
}

// Render user list
function renderUsers(users) {
  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (${user.email})`;
    userList.appendChild(li);
  });
}

// Show message
function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
  setTimeout(() => {
    message.textContent = "";
    message.className = "";
  }, 3000);
}

// Handle form submit
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  // Basic validation
  if (!name || !email) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  // Check for duplicates
  const isDuplicate = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (isDuplicate) {
    showMessage("Email already exists.", "error");
    return;
  }

  // Add user
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    if (!res.ok) throw new Error("Failed to add user");
    const newUser = await res.json();
    users.push(newUser);
    renderUsers(users);
    showMessage("User added successfully!", "success");

    userForm.reset();
  } catch (error) {
    showMessage("Error: " + error.message, "error");
  }
});

// Initial fetch
fetchUsers();
