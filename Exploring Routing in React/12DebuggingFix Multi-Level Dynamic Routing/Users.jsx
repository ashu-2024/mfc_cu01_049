import { Link } from "react-router-dom";

function Users() {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return (
    <div>
      <h1>Users Page</h1>
      {users.map((user) => (
        <div key={user.id}>
          {/* Corrected the path here */}
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Users;
