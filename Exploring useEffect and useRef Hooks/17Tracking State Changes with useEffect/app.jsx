import React, { useState, useEffect } from "react";

function StateTracker() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(`State updated: ${value}`);
  }, [value]);

  const updateRandom = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    setValue(randomNumber);
  };

  return (
    <div>
      <h1>Current Value: {value}</h1>
      <button onClick={updateRandom}>Generate Random Number</button>
    </div>
  );
}

export default StateTracker;
