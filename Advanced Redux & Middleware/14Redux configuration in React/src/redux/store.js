import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";
import { quizReducer } from "./quizReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
