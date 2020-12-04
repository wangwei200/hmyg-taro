import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { AtButton } from "taro-ui";

import Taro from "@tarojs/taro";

import borderIcon from "../../../assets/cart_border@2x.png";

import {
  cart_checked_cart,
  cart_pay_success,
} from "../../../store/action/cart";

import GoodsItem from "../../../components/GoodsItem";

import Settle from "../../../components/Settle";

import { createOrder, createBeforePaymentOrder } from "../../../api/order";

import "./index.scss";

export default function Order() {
  const [address, setAddress] = useState(Taro.getStorageSync("address"));

  const dispatch = useDispatch();

  const carts = useSelector(({ cartReducer }) => cartReducer.checkCarts);
  console.log(carts);
  // 只需要调用一次
  useEffect(() => {
    // 发送action 获取选中的购物车数据
    dispatch(cart_checked_cart());
  }, []);

  /**
   * 渲染地址
   */
  function renderChooseAddress() {
    return (
      <>
        <view className="first_line" onClick={chooseAddress}>
          <view className="left">收货人：{address.userName}</view>
          <view className="right">
            <view className="tel">电话：{address.telNumber}</view>
            <view className="at-icon at-icon-chevron-right"></view>
          </view>
        </view>
        <view className="second_line">收货地址：{formartAddress()}</view>
      </>
    );
  }
  /**
   * 格式化收货地址
   */
  function formartAddress() {
    const { provinceName, cityName, countyName, detailInfo } = address;

    return provinceName + cityName + countyName + detailInfo;
  }
  /**
   * 渲染登录选择按钮
   */
  function renderChooseAddressBtn() {
    return (
      <AtButton
        type="secondary"
        className="choose_address"
        onClick={chooseAddress}
      >
        获取地址+
      </AtButton>
    );
  }

  /**
   * 获取地址
   */
  async function chooseAddress() {
    const result = await Taro.chooseAddress().catch((e) => e);
    if (result.errMsg === "chooseAddress:fail cancel")
      return Taro.showToast({
        title: "取消地址选择",
        icon: "none",
      });
    setAddress({
      ...result,
    });
    Taro.setStorageSync("address", result);
  }
  /**
   * 渲染每个item条目
   */
  function renderOrderItem() {
    if (!carts || carts.length <= 0) return "";
    return carts.map((cart) => {
      return (
        <GoodsItem
          key={cart.goodsId}
          thumb={cart.goodsUrl}
          title={cart.goodsName}
          desc={`￥${cart.goodsPrice}`}
          descColor="#c00000"
        >
          <view slot="calc">{`x${cart.goodsCount}`}</view>
        </GoodsItem>
      );
    });
  }
  /**
   * 计算价格
   */
  function calcPrice() {
    if (!carts || carts.length <= 0) return "0.00";
    let totalPrice = 0;
    carts.forEach((cart) => {
      totalPrice += cart.goodsPrice * cart.goodsCount;
    });
    return totalPrice.toFixed(2);
  }
  /**
   * 提交订单
   */
  const submitHandler = async () => {
    // 判断地址有没有填写
    if (!address)
      return Taro.showToast({
        title: "请选择地址",
        icon: "none",
      });
    // 判断价格是否大于0
    if (Number.parseInt(calcPrice()) <= 0)
      return Taro.showToast({ title: "金额不正确", icon: "none" });

    // 开始进行请求
    // 1. 创建订单
    // 1.1 定义订单请求参数
    const consignee_addr = formartAddress();
    const order_detail = JSON.stringify(carts);
    const goods = carts.map((x) => ({
      goods_id: x.goodsId,
      goods_number: x.goodsCount,
      goods_price: x.goodsPrice,
    }));
    const cOrderResult = await createOrder(
      "0.01",
      consignee_addr,
      order_detail,
      goods
    );
    if (!cOrderResult) return;

    // 2. 生成预支付订单
    const cBeforePay = await createBeforePaymentOrder(
      cOrderResult.order_number
    );
    if (!cBeforePay) return;
    // 3. 调用支付的api
    const payResult = await Taro.requestPayment({
      ...cBeforePay.pay,
    }).catch((e) => e);
    if (payResult.errMsg === "requestPayment:fail cancel")
      return Taro.showToast({ title: "取消支付", icon: "none" });
    if (payResult.errMsg === "requestPayment:ok") {
      Taro.showToast({ title: "支付成功", icon: "success" });
      // 删除购物车选中的商品，返回到购物车页面
      dispatch(cart_pay_success());
      Taro.switchTab({
        url: "/pages/tabbar/cart/index",
      });
    }
  };

  return (
    <view className="order">
      <view className="order_header">
        {address ? renderChooseAddress() : renderChooseAddressBtn()}
        <view className="border">
          <image src={borderIcon} />
        </view>
      </view>
      <view className="order_list">{renderOrderItem()}</view>
      <Settle
        price={calcPrice()}
        position="bottom"
        onSubmit={submitHandler}
        count={carts ? carts.length : 0}
      />
    </view>
  );
}
