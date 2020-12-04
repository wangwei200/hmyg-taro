/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 商品详情页
 */
import React, { useState, useEffect } from "react";

import Taro, { useRouter } from "@tarojs/taro";

import { useSelector, useDispatch } from "react-redux";

import HMSwiper from "../../../components/Swiper";

import HMGoodsNav from "../../../components/HMGoodsNav";

import { cart_add } from "../../../store/action/cart";

import { goodsDetail } from "../../../api/goods";

import "./goods_detail.scss";

function GoodsDetail() {
  // 利用hooks配合redux
  const dispatch = useDispatch();
  // 只要更新了数据就会触发，得到最新的数据
  const carts = useSelector(({ cartReducer }) => cartReducer.carts);
  const [detailInfo, setDetailInfo] = useState({
    pics: [],
  });
  const { params } = useRouter();
  useEffect(() => {
    // 请求服务器
    async function requestDetail(id) {
      const result = await goodsDetail(id);
      if (!result) return;
      setDetailInfo({ ...result });
    }
    requestDetail(params.goods_id);
  }, []);

  // 渲染属性表格
  function renderAttr() {
    if (!detailInfo.attrs || detailInfo.attrs.length <= 0) return "";
    return detailInfo.attrs.map((attr) => {
      return (
        <view key={attr.attr_id} className="attr_item">
          <view className="name">{attr.attr_name}</view>
          <view className="value">{attr.attr_value}</view>
        </view>
      );
    });
  }

  const options = [
    {
      icon: "shopping-bag",
      text: "店铺",
    },
    {
      icon: "shopping-cart",
      text: "购物车",
      info: carts.length + "",
    },
  ];

  const buttonGroup = [
    {
      text: "加入购物车",
      backgroundColor: "#ff0000",
      color: "#fff",
    },
    {
      text: "立即购买",
      backgroundColor: "#ffa200",
      color: "#fff",
    },
  ];
  // 左侧图标的点击事件
  const iconClickHandler = (index) => {
    if (index === 1) {
      // 购物车
      Taro.switchTab({
        url: "/pages/tabbar/cart/index",
      });
    }
  };
  const buttonClickHandler = (index) => {
    if (index === 0) {
      // 加入购物车
      dispatch(cart_add(detailInfo));
    } else if (index === 1) {
      // 立即购买
    }
  };
  return (
    <view className="goods_detail">
      <view className="content">
        <HMSwiper
          items={detailInfo.pics}
          img="pics_big"
          id="goods_id"
          height="750rpx"
        />
        <view className="goods_info">
          <view className="left">
            <view className="price">￥{detailInfo.goods_price}</view>
            <view className="name">{detailInfo.goods_name}</view>
            <view className="kuaidi">快递：免运费</view>
          </view>
          <view className="right">
            <view className="at-icon at-icon-star"></view>
            <text className="chouc">收藏</text>
          </view>
        </view>
        <view className="attr">
          <view className="title">配置：</view>
          {renderAttr()}
        </view>
        <rich-text nodes={detailInfo.goods_introduce}></rich-text>
      </view>

      <HMGoodsNav
        options={options}
        buttonGroup={buttonGroup}
        onClick={iconClickHandler}
        onButtonClick={buttonClickHandler}
      />
    </view>
  );
}
export default GoodsDetail;
