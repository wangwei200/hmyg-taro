/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 首页相关api
 */
import Taro from "@tarojs/taro";

import { SWIPER_URL, NAV_URL, FLOOR_URL } from "./httpContants";

/**
 * 获取轮播图数据
 */
export const swiperData = async () => {
  return await Taro.request({
    url: SWIPER_URL,
  });
};

/**
 * 获取首页nav 导航栏数据
 */
export const navData = async () => {
  return await Taro.request({
    url: NAV_URL,
  });
};

/**
 * 获取楼城区数据
 */
export const floorData = async () => {
  return await Taro.request({
    url: FLOOR_URL,
  });
};
