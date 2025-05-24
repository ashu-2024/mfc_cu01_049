import axios from 'axios';

export const GET_COFFEE_REQUEST = "GET_COFFEE_REQUEST";
export const GET_COFFEE_SUCCESS = "GET_COFFEE_SUCCESS";
export const GET_COFFEE_FAILURE = "GET_COFFEE_FAILURE";

export const getCoffee = (sort = "") => async (dispatch) => {
  dispatch({ type: GET_COFFEE_REQUEST });
  try {
    let url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee`;
    if (sort) {
      url += `?sort=price&order=${sort}`;
    }
    const response = await axios.get(url);
    dispatch({ type: GET_COFFEE_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: GET_COFFEE_FAILURE, error: error.message });
  }
};
