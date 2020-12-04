/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 订单相关api
 */
import Taro from "@tarojs/taro";

import {
  ORDER_CREATED_URL,
  ORDER_UNIFIEDORDER_URL,
  ORDER_LIST_URL,
} from "./httpContants";

/**
 * 创建订单的api
 * @param {*} order_price 订单价格
 * @param {*} consignee_addr 订单地址
 * @param {*} order_detail 订单详情
 * @param {*} goods 商品列表（ID，amount和ggods_price）的列表
 */
export const createOrder = async (
  order_price,
  consignee_addr,
  order_detail,
  goods
) => {
  return await Taro.request({
    url: ORDER_CREATED_URL,
    method: "POST",
    data: {
      order_price,
      consignee_addr,
      order_detail,
      goods,
    },
  });
};

/**
 * 生成支付订单
 * @param {*} order_number 订单编号
 */
export const createBeforePaymentOrder = async (order_number) => {
  return await Taro.request({
    method: "POST",
    url: ORDER_UNIFIEDORDER_URL,
    data: {
      order_number,
    },
  });
};

/**
 * 订单查询
 * @param {*} type 类型 1  全部订单     2 代付款订单    3 已付款订单
 */
export const orderListData = async (type) => {
  return await Taro.request({
    url: ORDER_LIST_URL,
    data: {
      type,
    },
  });
};
