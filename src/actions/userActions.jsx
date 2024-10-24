import axios from "axios";

import {
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,

  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,

} from "../constants/userConstants";


export const Register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }
    const { data } = await axios.post(`${import.meta.env.VITE_APP_API
      }/api/v1/register`, userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.message
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const verifyUserEmail = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.get(`${import.meta.env.VITE_APP_API
      }/api/v1/verify/email/${token}/${id}`, config);

    dispatch({
      type: VERIFY_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

