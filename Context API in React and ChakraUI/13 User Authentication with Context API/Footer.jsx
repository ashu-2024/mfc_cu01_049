// Footer.jsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Footer() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <footer>
      <p>{isLoggedIn ? 'Welcome, User' : 'Please log in'}</p>
    </footer>
  );
}

export default Footer;
