import Taro from "@tarojs/taro";
import {
  CART_ADD,
  CART_EDIT_STATUS,
  CART_EDIT_COUNT,
  CART_EDIT_ALL_CHECKED,
} from "../constants/cart";

/**
 * 原始状态
 * 数据结构为:
 * checked: 是否选中
 */
const INITIAL_STATE = {
  carts: [
    {
      checked: true,
      goodsId: 57444,
      goodsName:
        "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）",
      goodsNum: 100,
      goodsPrice: 1899,
      goodsCount: 1,
      goodsUrl:
        "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg",
    },
    {
      checked: true,
      goodsId: 57443,
      goodsName:
        "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）",
      goodsNum: 100,
      goodsPrice: 1899,
      goodsCount: 1,
      goodsUrl:
        "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg",
    },
    {
      checked: true,
      goodsId: 57442,
      goodsName:
        "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）",
      goodsNum: 100,
      goodsPrice: 1899,
      goodsCount: 1,
      goodsUrl:
        "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg",
    },
    {
      checked: true,
      goodsId: 57441,
      goodsName:
        "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）",
      goodsNum: 100,
      goodsPrice: 1899,
      goodsCount: 1,
      goodsUrl:
        "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg",
    },
    {
      checked: true,
      goodsId: 57440,
      goodsName:
        "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）",
      goodsNum: 100,
      goodsPrice: 1899,
      goodsCount: 1,
      goodsUrl:
        "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg",
    },
  ],
};

/**
 * 购物车的 reducer
 * @param {*} state 状态
 * @param {*} action 发送的action
 */
export default function cartReducer(state = INITIAL_STATE, action) {
  const { carts } = state;
  switch (action.type) {
    case CART_ADD:
      // 购物车添加
      const { cart } = action.preload;
      // 判断购物车里面是否有这个数据，如果有，数量叠加
      const index = carts.findIndex((x) => x.goodsId === cart.goodsId);
      index === -1
        ? carts.unshift(cart)
        : (carts[index].goodsCount += cart.goodsCount);
      return {
        ...state,
        carts: [...carts],
      };
    case CART_EDIT_STATUS:
      // 编辑状态
      const { status, goodsId } = action.preload;
      // 获取对应索引
      const i = carts.findIndex((x) => x.goodsId === goodsId);
      // 判断索引是否找到
      i !== -1 && (carts[i].checked = status);
      return {
        ...state,
        carts: [...carts],
      };
    case CART_EDIT_COUNT:
      // 编辑数量
      const { count, goodsId: id } = action.preload;
      // 获取对应索引
      const countIndex = carts.findIndex((x) => x.goodsId === id);
      countIndex !== -1 && (carts[countIndex].goodsCount = count);
      console.log(carts);
      return {
        ...state,
        carts: [...carts],
      };
    case CART_EDIT_ALL_CHECKED:
      // 修改整个的选中状态
      const { status: checked } = action.preload;
      carts.forEach((c) => {
        c.checked = checked;
      });
      return {
        ...state,
        carts: [...carts],
      };
    default:
      return state;
  }
}

