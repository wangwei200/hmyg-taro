/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 分类相关api
 */
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
