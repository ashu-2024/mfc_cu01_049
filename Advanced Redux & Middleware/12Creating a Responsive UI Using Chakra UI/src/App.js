import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';

function App() {
  return (
    <Box p={4}>
      {/* Navigation Bar */}
      <Flex
        as="nav"
        justify="space-between"
        align="center"
        wrap="wrap"
        padding={4}
        bg="teal.500"
        color="white"
        mb={6}
      >
        <Heading size="md">MyApp</Heading>
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <Button variant="ghost" colorScheme="whiteAlpha">Home</Button>
          <Button variant="ghost" colorScheme="whiteAlpha">About</Button>
          <Button variant="ghost" colorScheme="whiteAlpha">Contact</Button>
        </Flex>
      </Flex>

      {/* Responsive Grid of Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {[1, 2, 3].map((card) => (
          <Box
            key={card}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p={4}
            _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }}
            transition="0.2s"
          >
            <Image
              src={`https://picsum.photos/300/200?random=${card}`}
              alt="Random"
              borderRadius="md"
              mb={3}
            />
            <Stack spacing={2}>
              <Heading size="md">Card Title {card}</Heading>
              <Text>
                This is a sample card with responsive behavior. Resize the
                screen to see layout change.
              </Text>
              <Button colorScheme="teal">Learn More</Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default App;
