import { createStore } from "redux";
import todosReducer from "./todosSlice";

const store = createStore(todosReducer);

export default store;
