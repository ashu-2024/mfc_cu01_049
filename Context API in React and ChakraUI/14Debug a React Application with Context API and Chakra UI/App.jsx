import { ChakraProvider, Box, Flex, Grid, Button, useBreakpointValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // For responsive grid layout
  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',  // 1 column on small screens
    md: 'repeat(3, 1fr)',    // 3 columns on medium and larger screens
  });

  return (
    <ChakraProvider>
      {/* Navbar */}
      <Flex
        as="nav"
        p="4"
        bg={theme === 'light' ? 'gray.100' : 'gray.700'}
        justifyContent="space-between"
      >
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      {/* Main Content: Grid of Cards */}
      <Grid templateColumns={gridTemplateColumns} gap="4" p="4">
        {['Card 1', 'Card 2', 'Card 3'].map((card, index) => (
          <Box
            key={index}
            p="4"
            shadow="md"
            bg={theme === 'light' ? 'gray.200' : 'gray.600'}  // Theme-aware background color
          >
            {card}
          </Box>
        ))}
      </Grid>

      {/* Footer */}
      <Box as="footer" p="4" bg={theme === 'light' ? 'gray.300' : 'gray.800'}>
        Footer Content
      </Box>
    </ChakraProvider>
  );
}

export default App;
