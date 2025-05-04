// ThemeContext.js
import React, { createContext, useState } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

// Create a provider to manage theme state
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
