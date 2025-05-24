// src/App.js
import React from "react";
import { useToggleItems } from "./hooks/useToggleItems";
import { Button, Box, Text } from "@chakra-ui/react";

function App() {
  const [state, toggleState] = useToggleItems(["A", "B", "C"], 1);

  return (
    <Box p={5} textAlign="center">
      <Text fontSize="2xl" mb={4}>Current Item: {state}</Text>
      <Button colorScheme="blue" onClick={toggleState}>
        Toggle Item
      </Button>
    </Box>
  );
}

export default App;
