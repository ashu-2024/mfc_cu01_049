import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist } from '../../features/watchlist/watchlistSlice';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const watchlist = useSelector((state) => state.watchlist.list);

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleAddWatchlist = () => {
    dispatch(addToWatchlist(movie));
    toast({
      title: 'Added to Watchlist',
      description: `"${movie.title}" added.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" shadow="md">
      {movie.poster_path ? (
        <Image src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      ) : (
        <Box height="300px" bg="gray.200" />
      )}
      <VStack align="start" p={4} spacing={2}>
        <Heading size="md">{movie.title}</Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {movie.overview || 'No description available.'}
        </Text>
        <Button
          size="sm"
          colorScheme="teal"
          isDisabled={isInWatchlist}
          onClick={handleAddWatchlist}
        >
          {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </Button>
      </VStack>
    </Box>
  );
}

export default MovieCard;
