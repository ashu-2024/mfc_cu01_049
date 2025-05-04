import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, HStack, Link, useMediaQuery } from '@chakra-ui/react'; // If you're using Chakra UI

const Navbar = () => {
  // Chakra UI hook for detecting screen size
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Box as="nav" p={4} bg="gray.800">
      <HStack spacing={8} justify="space-between" direction={isSmallScreen ? 'column' : 'row'} align="center">
        {/* Navbar links */}
        <NavLink to="/" exact activeClassName="active-link">
          <Link color="white" _hover={{ color: 'blue.500' }} fontSize="xl">Home</Link>
        </NavLink>
        <NavLink to="/about" activeClassName="active-link">
          <Link color="white" _hover={{ color: 'blue.500' }} fontSize="xl">About</Link>
        </NavLink>
        <NavLink to="/contact" activeClassName="active-link">
          <Link color="white" _hover={{ color: 'blue.500' }} fontSize="xl">Contact</Link>
        </NavLink>
        <NavLink to="/services" activeClassName="active-link">
          <Link color="white" _hover={{ color: 'blue.500' }} fontSize="xl">Services</Link>
        </NavLink>
      </HStack>
    </Box>
  );
};

export default Navbar;
