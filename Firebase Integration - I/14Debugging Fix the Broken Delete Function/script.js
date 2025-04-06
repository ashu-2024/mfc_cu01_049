const deleteUser = (key) => {
    fetch(`https://your-project-id.firebaseio.com/users/${key}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    })
    .then(() => {
      console.log("User deleted successfully");
  
      // Remove the user's row from the table
      const userRow = document.getElementById(`user-${key}`);
      if (userRow) {
        userRow.remove();
      }
    })
    .catch(error => {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    });
  };