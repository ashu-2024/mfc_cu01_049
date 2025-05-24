import React, { useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import CoffeeList from './components/CoffeeList';
import Sidebar from './components/Sidebar';

function App() {
  const [sort, setSort] = useState("");

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">Coffee List</Heading>
      <Flex>
        <Sidebar setSort={setSort} />
        <Box flex={1} p={4}>
          <CoffeeList sort={sort} />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
