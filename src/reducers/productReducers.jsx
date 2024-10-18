import {
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    CLEAR_ERRORS,
  } from "../constants/productConstants";
  
  export const createProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case CREATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PRODUCT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          product: action.payload.product,
        };
      case CREATE_PRODUCT_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case CREATE_PRODUCT_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        console.log('ALL_PRODUCT_REQUEST dispatched');
        return {
          ...state,
          loading: true,
        };
      case ALL_PRODUCT_SUCCESS:
        console.log('ALL_PRODUCT_SUCCESS dispatched', action.payload);
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      case ALL_PRODUCT_FAIL:
        console.log('ALL_PRODUCT_FAIL dispatched', action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        console.log('CLEAR_ERRORS dispatched');
        return {
          ...state,
          error: null,
        };
      default:
        console.log('Unknown action type:', action.type);
        return state;
    }
  };
  
  
  export const singleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case SINGLE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SINGLE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload,
          success: true,
        };
      case SINGLE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const updateProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          updateSuccess: true,
          product: action.payload.product,
        };
      case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          errorUpdate: action.payload,
        };
      case UPDATE_PRODUCT_RESET: 
      return {
        ...state,
        updateSuccess: false,
      };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const deleteProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
        };
      case DELETE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          errorDelete: action.payload,
        };
      case DELETE_PRODUCT_RESET:
        return {};
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  