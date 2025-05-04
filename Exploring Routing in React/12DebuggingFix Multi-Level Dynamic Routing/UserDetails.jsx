import { useParams, useNavigate } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hardcoded users list for demonstration purposes
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  // Find the user by ID
  const user = users.find((user) => user.id === parseInt(id));

  // If no user is found, display an error message
  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
        <button onClick={() => navigate("/users")}>Go back to Users list</button>
      </div>
    );
  }

  return (
    <div>
      <h1>User Details for {user.name}</h1>
      <p>Details for user ID: {user.id}</p>
    </div>
  );
}

export default UserDetails;
