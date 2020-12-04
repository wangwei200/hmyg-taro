import React from "react";

import Taro from "@tarojs/taro";

import { useDispatch } from "react-redux";

import "./index.scss";

import { user_save } from "../../store/action/user";

import userIcon from "../../assets/component_img/user.png";

export default function Login() {
  const dispatch = useDispatch();
  const getUserInfo = (res) => {
    // 获取到了用户信息，发送给redux进行处理
    const userInfo = res.detail.userInfo;
    Taro.showToast({
      title: "加载中。。。",
      icon: "none",
    });
    dispatch(user_save(userInfo));
  };
  return (
    <view className="login_container">
      <view className="icon_container">
        <image className="user" src={userIcon} mode="aspectFit"></image>
      </view>
      <view className="btn_container">
        <button
          className="btn"
          open-type="getUserInfo"
          onGetUserInfo={getUserInfo}
        >
          一键登录
        </button>
      </view>
      <view className="desc_container">登陆后尽享更多权益</view>
    </view>
  );
}
