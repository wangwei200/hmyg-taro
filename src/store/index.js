import { createStore, applyMiddleware, compose } from "redux";

import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";

// 定义调试的devtools 工具
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// 中间件数组
const middlewares = [thunkMiddleware];

if (
  process.env.NODE_ENV === "development" &&
  process.env.NODE_ENV !== "quickapp"
) {
  // 添加调试日志的中间件
  middlewares.push(require("redux-logger").createLogger());
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 构建store
export default function configStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}
