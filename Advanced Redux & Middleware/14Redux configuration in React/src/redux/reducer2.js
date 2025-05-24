import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_FAILURE,
  INCREMENT_SCORE,
  NEXT_QUESTION,
} from "./actionTypes";

const initState = {
  questions: [],
  current: 0,
  score: 0,
  error: null,
};

export const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_QUIZ_SUCCESS:
      return { ...state, questions: action.payload };
    case FETCH_QUIZ_FAILURE:
      return { ...state, error: action.payload };
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    case NEXT_QUESTION:
      return { ...state, current: state.current + 1 };
    default:
      return state;
  }
};
