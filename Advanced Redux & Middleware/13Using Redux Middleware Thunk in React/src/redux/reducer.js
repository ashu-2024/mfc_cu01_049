import { GET_COFFEE_REQUEST, GET_COFFEE_SUCCESS, GET_COFFEE_FAILURE } from './actions';

const initialState = {
  loading: false,
  coffee: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COFFEE_REQUEST:
      return { ...state, loading: true };
    case GET_COFFEE_SUCCESS:
      return { ...state, loading: false, coffee: action.payload };
    case GET_COFFEE_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
