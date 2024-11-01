import axios from "axios";

import {
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,

  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,

  LOGOUT_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,


  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,


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


export const LoginUsers = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }
    const { data } = await axios.post(`${import.meta.env.VITE_APP_API
      }/api/v1/login`, { email, password }, config);
    console.log('Login Response:', data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    })
  }
}

export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST
    })
    const { data } = await axios.get(`${import.meta.env.VITE_APP_API
      }/api/v1/userprofile`, { withCredentials: true })
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message
    })
  }

}

export const Logout = () => async (dispatch) => {
  try {
    await axios.get(`${import.meta.env.VITE_APP_API
      }/api/v1/logout`, { withCredentials: true });
    dispatch({
      type: LOGOUT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    })
  }
}

export const updateProfile = (userData) => async (dispatch) => {
  try {
      dispatch({ type: UPDATE_PROFILE_REQUEST })
      const config = {
          headers: {
              "Content-Type": "multipart/form-data",
          },
          withCredentials: true
      }
      const { data } = await axios.put(`${import.meta.env.VITE_APP_API}/api/v1/updateprofile`, userData, config)
      dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: data.success,
      })
  } catch (error) {
      dispatch({
          type: UPDATE_PROFILE_FAIL,
          payload: error.response.data.message,
      });
  }
}


export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

