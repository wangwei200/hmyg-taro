import Taro from "@tarojs/taro";

import { CATEGORIES_URL } from "./httpContants";

/**
 * 获取分类列表
 */
export const categoryData = async () => {
  return await Taro.request({
    url: CATEGORIES_URL,
  });
};
