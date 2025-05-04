// AuthContext.js
import React, { createContext, useState } from 'react';

// Create the authentication context
export const AuthContext = createContext();

// Create a provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = () => {
    setIsLoggedIn((prev) => !prev); // Toggle the login state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
