import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionTypes";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("https://reqres.in/api/login", {
      email,
      password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.message });
  }
};
