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
