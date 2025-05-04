// Main.jsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Main() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main>
      <h2>{isLoggedIn ? 'Welcome back, User!' : 'Please log in to continue.'}</h2>
    </main>
  );
}

export default Main;
