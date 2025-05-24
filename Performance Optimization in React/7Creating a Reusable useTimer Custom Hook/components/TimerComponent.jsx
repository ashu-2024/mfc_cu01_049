// src/components/TimerComponent.jsx
import React from "react";
import { useTimer } from "../hooks/useTimer";
import { Button, Box, Text } from "@chakra-ui/react";

const TimerComponent = () => {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <Box p={5} border="1px solid" borderRadius="md" maxW="sm" textAlign="center">
      <Text fontSize="2xl" mb={4}>Timer: {timer} seconds</Text>
      <Button colorScheme="green" mr={2} onClick={startTimer} isDisabled={isRunning}>
        Start
      </Button>
      <Button colorScheme="red" mr={2} onClick={stopTimer} isDisabled={!isRunning}>
        Stop
      </Button>
      <Button onClick={resetTimer}>
        Reset
      </Button>
    </Box>
  );
};

export default TimerComponent;
