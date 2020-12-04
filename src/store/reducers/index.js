/**
 * 合并 reducer
 */
import { combineReducers } from "redux";

import cartReducer from "./cart";

import userReducer from "./user";

export default combineReducers({
  cartReducer,
  userReducer,
});
