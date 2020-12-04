/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 搜索相关api
 */
import Taro from "@tarojs/taro";

import { SEARCH_URL } from "./httpContants";

/**
 * 搜索接口
 * @param {*} query 搜索关键字
 */
export const searchData = (query) => {
  return Taro.request({
    url: SEARCH_URL,
    data: {
      query,
    },
  });
};
