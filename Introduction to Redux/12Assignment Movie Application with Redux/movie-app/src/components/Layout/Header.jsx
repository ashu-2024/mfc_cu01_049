import React from 'react';
import { Box, Flex, Button, Heading, Spacer, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box bg="blue.600" px={4} py={3} color="white">
      <Flex alignItems="center" maxW="container.lg" mx="auto">
        <Heading size="md">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }} color="white">
            MovieApp
          </Link>
        </Heading>
        <Spacer />
        <Button as={RouterLink} to="/" variant="ghost" color="white" mr={4}>
          Home
        </Button>
        {isLoggedIn && (
          <Button as={RouterLink} to="/watchlist" variant="ghost" color="white" mr={4}>
            Watchlist
          </Button>
        )}
        {isLoggedIn ? (
          <Button onClick={handleLogout} colorScheme="red" size="sm">
            Logout
          </Button>
        ) : (
          <Button as={RouterLink} to="/login" colorScheme="green" size="sm">
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default Header;
