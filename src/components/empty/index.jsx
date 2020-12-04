/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 空白页面组件
 */
import React from "react";
import { Image, Text } from "@tarojs/components";

import emptyIcon from "../../assets/images/cart_empty@2x.png";

import "./index.scss";

export default function () {
  return (
    <view class="empty">
      <Image src={emptyIcon} class="empty-img"></Image>
      <Text class="tip-text">空空如也~</Text>
    </view>
  );
}
