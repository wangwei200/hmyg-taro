import Taro from "@tarojs/taro";

import { LOGIN_URL } from "./httpContants";

/**
 * 登录接口 参数对象属性说明：
 * @param {*} code 用户凭证
 * @param {*} encryptedData 用户信息密文
 * @param {*} iv 加密算法初试向量
 * @param {*} rawData 原生数据字符串
 * @param {*} signature 使用sha1得到的字符串
 */
export const login = async (loginData) => {
  return await Taro.request({
    url: LOGIN_URL,
    method: "POST",
    data: {
      ...loginData,
    },
  });
};
