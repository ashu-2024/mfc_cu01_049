import { VStack, Button } from '@chakra-ui/react';
import React from 'react';

const Sidebar = ({ setSort }) => {
  return (
    <VStack spacing={4} align="stretch" p={4} w="200px">
      <Button onClick={() => setSort('asc')}>Price Low to High</Button>
      <Button onClick={() => setSort('desc')}>Price High to Low</Button>
    </VStack>
  );
};

export default Sidebar;
