import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../features/movies/moviesSlice';
import MovieCard from './MovieCard';

function MovieList() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { movies, loading, error } = useSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = useState('avengers');

  useEffect(() => {
    dispatch(fetchMovies(searchTerm));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      dispatch(fetchMovies(searchTerm));
    }
  };

  return (
    <Box>
      <Input
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button mb={6} onClick={handleSearch} colorScheme="blue">
        Search
      </Button>

      {loading ? (
        <Spinner size="xl" />
      ) : movies.length === 0 ? (
        <Text>No movies found.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default MovieList;
