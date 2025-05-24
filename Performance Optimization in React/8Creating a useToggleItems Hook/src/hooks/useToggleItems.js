// src/hooks/useToggleItems.js
import { useState } from "react";

export const useToggleItems = (initialValue, initialPosition = 0) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Validate initialPosition to avoid out of bounds
    if (initialPosition < 0 || initialPosition >= initialValue.length) {
      return 0;
    }
    return initialPosition;
  });

  const toggleState = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % initialValue.length);
  };

  return [initialValue[currentIndex], toggleState];
};
