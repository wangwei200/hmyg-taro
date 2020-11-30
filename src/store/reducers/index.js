/**
 * 合并 reducer
 */
import { combineReducers } from "redux";

import cartReducer from "./cart";

export default combineReducers({
    cartReducer,
});
