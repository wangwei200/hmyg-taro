import React from "react";

import "./index.scss";

import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";

/**
 * 组件属性
 * @param {*} avatarUrl 头像url
 * @param {*} nickName 别名
 */
export default function UserInfo(props) {
  const { avatarUrl, nickName } = props;
  console.log(avatarUrl, nickName);
  return (
    <view className="userinfo_container">
      <view class="top-box">
        <image src={avatarUrl} class="avatar"></image>
        <view class="nickname">{nickName}</view>
      </view>
      <view class="panel-list">
        <view class="panel">
          <view class="panel-body">
            <view class="panel-item">
              <text>8</text>
              <text>收藏的店铺</text>
            </view>
            <view class="panel-item">
              <text>14</text>
              <text>收藏的商品</text>
            </view>
            <view class="panel-item">
              <text>18</text>
              <text>关注的商品</text>
            </view>
            <view class="panel-item">
              <text>84</text>
              <text>足迹</text>
            </view>
          </view>
        </view>

        <view class="panel">
          <view class="panel-title">我的订单</view>
          <view class="panel-body">
            <view class="panel-item">
              <image src={icon1} class="icon"></image>
              <text>待付款</text>
            </view>
            <view class="panel-item">
              <image src={icon2} class="icon"></image>
              <text>待收货</text>
            </view>
            <view class="panel-item">
              <image src={icon3} class="icon"></image>
              <text>退款/退货</text>
            </view>
            <view class="panel-item">
              <image src={icon4} class="icon"></image>
              <text>全部订单</text>
            </view>
          </view>
        </view>

        <view class="panel">
          <view class="panel-list-item">
            <text>收货地址</text>
            <view className="at-icon at-icon-chevron-right"></view>
          </view>
          <view class="panel-list-item">
            <text>联系客服</text>
            <view className="at-icon at-icon-chevron-right"></view>
          </view>
          <view class="panel-list-item">
            <text>退出登录</text>
            <view className="at-icon at-icon-chevron-right"></view>
          </view>
        </view>
      </view>
    </view>
  );
}
