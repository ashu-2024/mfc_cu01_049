// MainContent.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function MainContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#f0f0f0" : "#444",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h2>This is the main content area.</h2>
      <p>The current theme is <strong>{theme}</strong>.</p>
    </div>
  );
}

export default MainContent;
