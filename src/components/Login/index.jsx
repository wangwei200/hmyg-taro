import React from "react";

import Taro from "@tarojs/taro";

import { useDispatch } from "react-redux";

import "./index.scss";

import { user_save } from "../../store/action/user";

import userIcon from "../../assets/component_img/user.png";

import { login } from "../../api/user";

export default function Login() {
  const dispatch = useDispatch();
  const getUserInfo = async (res) => {
    // 获取到了用户信息，发送给redux进行处理
    const userInfo = res.detail.userInfo;
    // 进行用户登录，登录成功之后，保存数据到redux中
    // 封装登录参数
    // 1. 获取登录code
    const code = await Taro.login().catch((e) => e);
    // 1.1 判断获取code是否成功
    if (code.errMsg !== "login:ok")
      return Taro.showTabBar({ title: "登录失败，请稍后再试", icon: "none" });
    const loginData = {
      code: code.code,
      encryptedData: res.detail.encryptedData,
      iv: res.detail.iv,
      rawData: res.detail.rawData,
      signature: res.detail.signature,
    };
    // 2. 登录

    const result = await login(loginData);
    if (!result) return;
    // 3. 登录成功 获取token
    const token = result.token;
    dispatch(user_save({ ...userInfo, token }));
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
