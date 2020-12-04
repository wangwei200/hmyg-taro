/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 合并reducer
 */
import { combineReducers } from "redux";

import cartReducer from "./cart";

import userReducer from "./user";

export default combineReducers({
  cartReducer,
  userReducer,
});
