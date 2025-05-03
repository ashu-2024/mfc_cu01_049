import React, { useState, useEffect } from 'react';

function ToggleComponent() {
  useEffect(() => {
    console.log("Component Mounted");
    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  return <div>Component is visible</div>;
}

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        Toggle Component Visibility
      </button>

      {isVisible && <ToggleComponent />}
    </div>
  );
}

export default App;
