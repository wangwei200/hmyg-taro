import React, { useState, useEffect } from "react";

import Taro, { useRouter } from "@tarojs/taro";

import HMSwiper from "../../../components/swiper";

import { GOODS_DETAIL_URL } from "../../../utils/http";

import "./goods_detail.scss";

function GoodsDetail() {
  const [detailInfo, setDetailInfo] = useState({
    pics: [],
  });
  const { params } = useRouter();
  useEffect(() => {
    // 请求服务器
    async function requestDetail(id) {
      const result = await Taro.request({
        url: GOODS_DETAIL_URL,
        data: {
          goods_id: id,
        },
      });
      if (!result) return;
      setDetailInfo({ ...result });
    }
    requestDetail(params.goods_id);
  }, []);

  // 渲染属性表格
  function renderAttr() {
    if (!detailInfo.attrs || detailInfo.attrs.length <= 0) return "";
    return detailInfo.attrs.map((attr) => {
      console.log(attr);
      return (
        <view key={attr.attr_id} className="attr_item">
          <view className="name">{attr.attr_name}</view>
          <view className="value">{attr.attr_value}</view>
        </view>
      );
    });
  }
  return (
    <view className="goods_detail">
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
  );
}
export default GoodsDetail;
