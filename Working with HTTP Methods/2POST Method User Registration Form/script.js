document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageDiv = document.getElementById("message");
  
    // Clear message
    messageDiv.textContent = "";
    messageDiv.className = "";
  
    // Validation
    if (!name || !email || !password) {
      messageDiv.textContent = "Please fill in all fields.";
      messageDiv.classList.add("error");
      return;
    }
  
    // Payload
    const data = {
      name,
      email,
      password,
    };
  
    try {
      const response = await fetch("https://mockapi.io/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Registration failed");
      }
  
      const result = await response.json();
      messageDiv.textContent = "User registered successfully!";
      messageDiv.classList.add("success");
  
      // Optionally reset the form
      document.getElementById("registerForm").reset();
    } catch (error) {
      messageDiv.textContent = "Error: " + error.message;
      messageDiv.classList.add("error");
    }
  });
  