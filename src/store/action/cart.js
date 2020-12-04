/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 购物车action
 */
import {
  CART_EDIT_STATUS,
  CART_ADD,
  CART_EDIT_COUNT,
  CART_EDIT_ALL_CHECKED,
  CART_DELETE_CART,
  CART_CHECKED_CART,
  CART_PAY_SUCCESS,
} from "../constants/cart";

export const cart_pay_success = () => {
  return {
    type: CART_PAY_SUCCESS,
    preload: {},
  };
};
/**
 * 发送action 获取选中的购物车数据
 */
export const cart_checked_cart = () => {
  return {
    type: CART_CHECKED_CART,
    preload: {},
  };
};
/**
 * 删除购物车数据
 * @param {*} goodsId 商品id
 */
export const cart_delete_cart = (goodsId) => {
  return {
    type: CART_DELETE_CART,
    preload: {
      goodsId,
    },
  };
};
/**
 * 修改整个选中状态
 * @param {*} status 状态值
 */
export const cart_edit_all_checked = (status) => {
  return {
    type: CART_EDIT_ALL_CHECKED,
    preload: {
      status,
    },
  };
};
/**
 * 获取购物车数量
 * @param {*} status 状态
 * @param {*} goodsId 商品id
 */
export const cart_edit_status = (status, goodsId) => {
  return {
    type: CART_EDIT_STATUS,
    preload: {
      status,
      goodsId,
    },
  };
};
/**
 * 编辑数量
 * @param {*} count 数量
 * @param {*} goodsId 商品id
 */
export const cart_edit_count = (count, goodsId) => {
  return {
    type: CART_EDIT_COUNT,
    preload: {
      count,
      goodsId,
    },
  };
};
/**
 * 添加购物车
 * @param {*} proInfo 商品对象
 */
export const cart_add = (proInfo) => {
  const cartInfo = {
    goodsId: proInfo.goods_id,
    goodsName: proInfo.goods_name,
    goodsNum: proInfo.goods_number,
    goodsUrl: proInfo.goods_small_logo,
    checked: true,
    goodsPrice: proInfo.goods_price,
    goodsCount: 1,
  };
  return {
    type: CART_ADD,
    preload: {
      cart: cartInfo,
    },
  };
};
