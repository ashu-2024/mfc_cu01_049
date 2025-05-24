import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist(state, action) {
      const exists = state.list.find((movie) => movie.id === action.payload.id);
      if (!exists) {
        state.list.push(action.payload);
      }
    },
    removeFromWatchlist(state, action) {
      state.list = state.list.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
