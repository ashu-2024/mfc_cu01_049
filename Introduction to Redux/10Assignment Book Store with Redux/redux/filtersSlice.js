// src/redux/filtersSlice.js
const initialFilters = {
  author: "",
  genre: "",
  readStatus: "all", // all, read, unread
};

export const SET_AUTHOR_FILTER = "SET_AUTHOR_FILTER";
export const SET_GENRE_FILTER = "SET_GENRE_FILTER";
export const SET_READ_FILTER = "SET_READ_FILTER";

export const setAuthorFilter = (author) => ({ type: SET_AUTHOR_FILTER, payload: author });
export const setGenreFilter = (genre) => ({ type: SET_GENRE_FILTER, payload: genre });
export const setReadFilter = (status) => ({ type: SET_READ_FILTER, payload: status });

export const filtersReducer = (state = initialFilters, action) => {
  switch (action.type) {
    case SET_AUTHOR_FILTER:
      return { ...state, author: action.payload };
    case SET_GENRE_FILTER:
      return { ...state, genre: action.payload };
    case SET_READ_FILTER:
      return { ...state, readStatus: action.payload };
    default:
      return state;
  }
};
