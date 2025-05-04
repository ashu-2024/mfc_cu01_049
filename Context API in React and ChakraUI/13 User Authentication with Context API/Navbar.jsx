// Navbar.jsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Navbar() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);

  return (
    <nav>
      <h1>Authentication Demo</h1>
      <button onClick={toggleAuth}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
}

export default Navbar;
