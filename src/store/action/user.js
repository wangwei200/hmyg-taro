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
