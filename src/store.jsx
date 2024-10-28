import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";



import {
  authReducer,
 
} from './reducers/userReducers';

import {
  createProductReducer,
  productsReducer,
  singleProductReducer,
  updateProductReducer,
  deleteProductReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  authUser: authReducer,



  products: productsReducer,
  createProduct: createProductReducer,
  singleProduct: singleProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
});

let initialState = {
  cart: {
    // cartItems: localStorage.getItem("cartItems")
    //   ? JSON.parse(localStorage.getItem("cartItems"))
    //   : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
