import React, { useState } from "react";
import MiddleComponent from "./MiddleComponent";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div>
      <h1>Props Drilling Example</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <MiddleComponent userName={userName} />
    </div>
  );
}

export default App;
