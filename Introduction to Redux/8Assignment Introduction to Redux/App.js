import React, { useEffect, useState } from "react";
import store from "./store";

function App() {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().count);
    });
    return () => unsubscribe();
  }, []);

  const increment = () => {
    store.dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    store.dispatch({ type: "DECREMENT" });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter Application using Redux</h1>
      <p>Count: {JSON.stringify(count)}</p>
      <button onClick={increment} style={{ marginRight: "10px" }}>
        Increment
      </button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
