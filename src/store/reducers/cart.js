import { CART_COUNT, CART_ADD } from "../constants/cart";

/**
 * 原始状态
 * 数据结构为:
 * checked: 是否选中
 */
const INITIAL_STATE = {
  carts: [],
};

export default function cartReducer(state = INITIAL_STATE, action) {
  const { carts } = state;
  switch (action.type) {
    case CART_COUNT:
      // 获取购物车数量
      const checkedCart = carts.filter((cart) => {
        return cart.checked;
      });
      return {
        ...state,
        action: action.type,
        count: checkedCart.length,
      };
    case CART_ADD:
      const { preload } = action;
      carts.push(preload.cart);
      return {
        ...state,
        carts: [...carts],
      };
    default:
      return state;
  }
}
