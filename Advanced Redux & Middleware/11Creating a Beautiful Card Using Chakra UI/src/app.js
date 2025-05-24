import React from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

function App() {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      bg={useColorModeValue('white', 'gray.700')}
      m="auto"
      mt={10}
      p={5}
      _hover={{ boxShadow: '2xl', transform: 'scale(1.05)', transition: 'all 0.3s ease' }}
      transition="all 0.3s ease"
    >
      <Stack spacing={4} align="center">
        <Heading fontSize="2xl" color={useColorModeValue('teal.600', 'teal.300')}>
          Beautiful Card
        </Heading>

        <Image
          borderRadius="md"
          boxSize="150px"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80"
          alt="Card Image"
          mx="auto"
        />

        <Text
          textAlign="center"
          color={useColorModeValue('gray.700', 'gray.300')}
          fontSize="md"
          px={3}
        >
          This card demonstrates how to use Chakra UI's styling utilities to create
          an elegant and responsive UI component with shadows, rounded corners,
          and hover effects.
        </Text>
      </Stack>
    </Box>
  );
}

export default App;
