import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Header from './components/Layout/Header';
import MovieList from './components/Movies/MovieList';
import Watchlist from './components/Watchlist/Watchlist';
import LoginForm from './components/Auth/LoginForm';

import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.lg" py={4}>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route
            path="/watchlist"
            element={isLoggedIn ? <Watchlist /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginForm />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
