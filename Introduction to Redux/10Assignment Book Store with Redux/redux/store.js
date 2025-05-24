// src/redux/store.js
import { createStore, combineReducers } from "redux";
import { booksReducer } from "./booksSlice";
import { filtersReducer } from "./filtersSlice";

const rootReducer = combineReducers({
  books: booksReducer,
  filters: filtersReducer,
});

export const store = createStore(rootReducer);
