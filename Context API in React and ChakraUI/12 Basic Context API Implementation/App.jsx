// App.jsx
import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext"; // Import the ThemeProvider and ThemeContext
import MainContent from "./MainContent";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme === "light" ? "#fff" : "#333", height: "100vh", color: theme === "light" ? "#000" : "#fff" }}>
      <h1>Theme Toggle Example</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <MainContent />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
