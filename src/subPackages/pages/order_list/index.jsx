/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 订单列表
 */
import React, { useState, useEffect } from "react";

import { AtTabs, AtTabsPane } from "taro-ui";

import "./index.scss";

import { orderListData } from "../../../api/order";

import OrderItem from "../../../components/OrderItem";

export default function OrderList() {
  const [current, changeCurrent] = useState(0);
  const [orderList, setOrderList] = useState([]);
  // 进来请求一次即可
  useEffect(() => {
    requestOrderList(1);
  }, []);

  /**
   * 请求订单
   * @param {*} index
   */
  const requestOrderList = async (index) => {
    setOrderList([]);
    const result = await orderListData(index);
    if (!result) return;
    setOrderList([...result.orders]);
  };

  const tabList = [{ title: "全部" }, { title: "待付款" }, { title: "已付款" }];
  const changeTabItem = (index) => {
    changeCurrent(index);
    requestOrderList(index + 1);
  };

  const renderOrderList = () => {
    if (!orderList || orderList.length <= 0) return "";
    return orderList.map((order) => {
      return (
        <OrderItem
          key={order.order_number}
          orderNum={order.order_number}
          goods={order.goods}
          totalCount={order.total_count}
          totalPrice={order.total_price}
        />
      );
    });
  };
  return (
    <AtTabs
      className="order_list"
      current={current}
      tabList={tabList}
      onClick={changeTabItem}
    >
      <AtTabsPane current={current} index={0}>
        <view>{renderOrderList()}</view>
      </AtTabsPane>
      <AtTabsPane current={current} index={1}>
        <view>{renderOrderList()}</view>
      </AtTabsPane>
      <AtTabsPane current={current} index={2}>
        <view>{renderOrderList()}</view>
      </AtTabsPane>
    </AtTabs>
  );
}
