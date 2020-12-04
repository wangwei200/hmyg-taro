/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 用户登录action
 */
import { USER_SAVE, USER_GET } from "../constants/user";

/**
 * 发送存储用户信息的action
 * @param {*} user
 */
export const user_save = (user) => {
  return {
    type: USER_SAVE,
    preload: {
      user,
    },
  };
};

/**
 * 发送获取本地存储用户的action
 */
export const user_get = () => {
  return {
    type: USER_GET,
    preload: {},
  };
};
