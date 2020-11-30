import { CART_COUNT, CART_ADD } from "../constants/cart";

/**
 * 获取购物车数量
 */
export const cart_count = () => {
  return {
    type: CART_COUNT,
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
  };
  return {
    type: CART_ADD,
    preload: {
      cart: cartInfo,
    },
  };
};
