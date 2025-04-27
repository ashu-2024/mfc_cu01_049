// Function to fetch users from API and display them
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const users = await response.json();
        const userList = document.getElementById('user-list');

        // Loop through users and create list items
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user.name;
            listItem.addEventListener('click', () => {
                alert(`Email: ${user.email}`); // Show email in alert
            });

            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Call the function on page load
fetchUsers();
