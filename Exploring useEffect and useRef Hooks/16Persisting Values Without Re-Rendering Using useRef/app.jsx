import React, { useEffect, useRef } from "react";

function ClickTracker() {
  const clickCount = useRef(0);

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  const handleClick = () => {
    clickCount.current += 1;
    console.log(`Button clicked ${clickCount.current} times`);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default ClickTracker;
