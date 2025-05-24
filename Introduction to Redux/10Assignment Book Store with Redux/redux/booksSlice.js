// src/redux/booksSlice.js
const initialBooks = [];

export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const EDIT_BOOK = "EDIT_BOOK";
export const TOGGLE_READ = "TOGGLE_READ";

export const addBook = (book) => ({ type: ADD_BOOK, payload: book });
export const deleteBook = (id) => ({ type: DELETE_BOOK, payload: id });
export const editBook = (book) => ({ type: EDIT_BOOK, payload: book });
export const toggleRead = (id) => ({ type: TOGGLE_READ, payload: id });

export const booksReducer = (state = initialBooks, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    case EDIT_BOOK:
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    case TOGGLE_READ:
      return state.map((book) =>
        book.id === action.payload ? { ...book, read: !book.read } : book
      );
    default:
      return state;
  }
};
