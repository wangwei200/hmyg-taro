import React from "react";
import { Image, Text } from "@tarojs/components";

import "./index.scss";

export default function () {
  return (
    <view class="empty">
      <Image src="/assets/images/cart_empty@2x.png" class="empty-img"></Image>
      <Text class="tip-text">空空如也~</Text>
    </view>
  );
}
