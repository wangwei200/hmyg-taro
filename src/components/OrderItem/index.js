/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 订单项组件
 */

import React from "react";

import GoodsItem from "../GoodsItem";

import "./index.scss";

/**
 * 属性说明
 * @param {*} orderNum 订单编号
 * @param {*} goods 订单列表
 * @param {*} totalCount 总数量
 * @param {*} totalPrice 总价格
 */
export default function OrderItem(props) {
  const { orderNum, goods, totalCount, totalPrice } = props;

  const renderGoods = () => {
    if (!goods || goods.length <= 0) return "";
    return goods.map((good) => {
      return (
        <GoodsItem
          key={good.goods_id}
          thumb={good.goods_small_logo}
          title={good.goods_name}
          desc={good.goods_price}
          descColor="#C00000"
          backgroundColor="#eee"
        >
          <view slot="calc">{`X ${good.goods_number}`}</view>
        </GoodsItem>
      );
    });
  };
  return (
    <view className="order_item">
      <view className="order_title">订单编号：{orderNum}</view>
      <view className="order_container">{renderGoods()}</view>
      <view className="order_footer">
        共{totalCount}件商品，订单金额
        <text className="order_price">￥{totalPrice}</text>
      </view>
    </view>
  );
}
