// src/redux/matchesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonmock.hackerrank.com/api/football_matches?page=2';

// Async thunk for fetching matches
export const fetchMatches = createAsyncThunk('matches/fetchMatches', async () => {
  const response = await axios.get(API_URL);
  return response.data.data; // data array inside response.data
});

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    isLoading: false,
    isError: false,
    footballMatches: [],
    favorites: [],
    searchTerm: '',
    filter: {
      team: '',
      venue: '',
      outcome: '',
      date: '',
    },
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.footballMatches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { toggleFavorite, setSearchTerm, setFilter } = matchesSlice.actions;
export default matchesSlice.reducer;
