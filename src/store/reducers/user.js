/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 用户reducer
 */
import Taro from "@tarojs/taro";

import { USER_SAVE, USER_GET } from "../constants/user";

const INITIAL_STATE = {
  user: Taro.getStorageSync("user_info"),
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_SAVE:
      // 保存用户信息在redux里面，同时保存在本地
      const { user } = action.preload;
      Taro.setStorageSync("user_info", user);
      return {
        ...state,
        user: {
          ...user,
        },
      };
    case USER_GET:
      // 第一次进来的时候，发送action，获取用户信息，保存在redux里面
      const userInfo = Taro.getStorageSync("user_info");
      return {
        ...state,
        user: {
          ...userInfo,
        },
      };
    default:
      return state;
  }
}
