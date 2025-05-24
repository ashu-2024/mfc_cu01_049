import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

const CoffeeCard = ({ coffee }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={4}>
      <Image src={coffee.image} alt={coffee.title} boxSize="200px" objectFit="cover" mx="auto" />
      <Text fontWeight="bold" mt={2}>{coffee.title}</Text>
      <Text>Price: ₹{coffee.price}</Text>
      <Text>Type: {coffee.type}</Text>
    </Box>
  );
};

export default CoffeeCard;
