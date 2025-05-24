// src/App.js
import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Input,
  Spinner,
  Text,
  Flex,
  Button,
  Checkbox,
  Stack,
  Heading,
  Select,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches, toggleFavorite, setSearchTerm, setFilter } from './redux/matchesSlice';

function App() {
  const dispatch = useDispatch();
  const { footballMatches, isLoading, isError, favorites, searchTerm, filter } = useSelector(
    (state) => state.matches
  );

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  // Filter and search logic
  const filteredMatches = footballMatches.filter((match) => {
    const matchesSearch =
      searchTerm === '' ||
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.date.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTeam =
      filter.team === '' ||
      match.team1.toLowerCase().includes(filter.team.toLowerCase()) ||
      match.team2.toLowerCase().includes(filter.team.toLowerCase());

    const matchesVenue = filter.venue === '' || match.venue.toLowerCase().includes(filter.venue.toLowerCase());

    const matchesOutcome =
      filter.outcome === '' || match.winner.toLowerCase() === filter.outcome.toLowerCase();

    const matchesDate = filter.date === '' || match.date === filter.date;

    return matchesSearch && matchesTeam && matchesVenue && matchesOutcome && matchesDate;
  });

  if (isLoading)
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );

  if (isError)
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text color="red.500">Error loading matches.</Text>
      </Flex>
    );

  return (
    <ChakraProvider>
      <Box maxW="960px" mx="auto" p={4}>
        <Heading mb={4}>Football Matches Tracker</Heading>

        <Stack spacing={3} mb={6}>
          <Input
            placeholder="Search by team, venue, date..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <Flex gap={3}>
            <Input
              placeholder="Filter by Team"
              value={filter.team}
              onChange={(e) => dispatch(setFilter({ team: e.target.value }))}
            />
            <Input
              placeholder="Filter by Venue"
              value={filter.venue}
              onChange={(e) => dispatch(setFilter({ venue: e.target.value }))}
            />
            <Select
              placeholder="Filter by Outcome"
              value={filter.outcome}
              onChange={(e) => dispatch(setFilter({ outcome: e.target.value }))}
            >
              <option value="Team1">Team1 Win</option>
              <option value="Team2">Team2 Win</option>
              <option value="Draw">Draw</option>
            </Select>
            <Input
              type="date"
              placeholder="Filter by Date"
              value={filter.date}
              onChange={(e) => dispatch(setFilter({ date: e.target.value }))}
            />
          </Flex>
        </Stack>

        <Box mb={4}>
          <Heading size="md" mb={2}>
            Matches ({filteredMatches.length})
          </Heading>

          {filteredMatches.length === 0 && <Text>No matches found.</Text>}

          {filteredMatches.map((match) => {
            const isFav = favorites.includes(match.id);

            return (
              <Flex
                key={match.id}
                justify="space-between"
                align="center"
                p={3}
                borderWidth={1}
                borderRadius="md"
                mb={2}
              >
                <Box>
                  <Text fontWeight="bold">{match.team1} vs {match.team2}</Text>
                  <Text fontSize="sm">
                    Venue: {match.venue} | Date: {match.date} | Winner: {match.winner}
                  </Text>
                  {/* Add any stats if available */}
                </Box>
                <Button
                  colorScheme={isFav ? 'red' : 'gray'}
                  size="sm"
                  onClick={() => dispatch(toggleFavorite(match.id))}
                >
                  {isFav ? 'Unfavorite' : 'Favorite'}
                </Button>
              </Flex>
            );
          })}
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            Favorite Matches ({favorites.length})
          </Heading>
          {favorites.length === 0 ? (
            <Text>No favorite matches yet.</Text>
          ) : (
            footballMatches
              .filter((match) => favorites.includes(match.id))
              .map((match) => (
                <Flex
                  key={match.id}
                  justify="space-between"
                  align="center"
                  p={3}
                  borderWidth={1}
                  borderRadius="md"
                  mb={2}
                  bg="red.50"
                >
                  <Box>
                    <Text fontWeight="bold">{match.team1} vs {match.team2}</Text>
                    <Text fontSize="sm">
                      Venue: {match.venue} | Date: {match.date} | Winner: {match.winner}
                    </Text>
                  </Box>
                </Flex>
              ))
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
