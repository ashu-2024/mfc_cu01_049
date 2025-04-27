import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increase = () => {
    setCount(count + step);
  };

  const decrease = () => {
    setCount(count - step >= 0 ? count - step : 0);
  };

  const handleStepChange = (e) => {
    setStep(Number(e.target.value));
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <div>
        <label>
          Step:
          <input
            type="number"
            value={step}
            onChange={handleStepChange}
            min="1"
          />
        </label>
      </div>
    </div>
  );
}

export default Counter;
