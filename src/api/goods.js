/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 商品相关api
 */
import Taro from "@tarojs/taro";

import { GOODS_DETAIL_URL, GOODS_LIST_URL } from "./httpContants";

/**
 * 商品详情
 * @param {*} id 商品id
 */
export const goodsDetail = async (id) => {
  return await Taro.request({
    url: GOODS_DETAIL_URL,
    data: {
      goods_id: id,
    },
  });
};

/**
 * 商品列表
 * @param {*} query 查询关键字
 * @param {*} pagenum  页码
 * @param {*} pagesize  页面数量
 */
export const goodsListData = async (query, pagenum, pagesize) => {
  return await Taro.request({
    url: GOODS_LIST_URL,
    data: {
      query,
      pagenum,
      pagesize,
    },
  });
};
