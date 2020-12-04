/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 我的页面
 */
import React, { Component } from "react";
import { connect } from "react-redux";

import Taro from "@tarojs/taro";

import Login from "../../../components/Login";

import UserInfo from "../../../components/UserInfo";

import "./index.scss";

@connect(({ userReducer }) => {
  console.log(userReducer);
  return userReducer;
})
class My extends Component {
  /**
   * 渲染我的页面
   */
  renderMy() {
    return "我的页面";
  }
  render() {
    const { user } = this.props;
    Taro.hideToast();
    return (
      <view>
        {this.props.user.nickName ? (
          <UserInfo avatarUrl={user.avatarUrl} nickName={user.nickName} />
        ) : (
          <Login />
        )}
      </view>
    );
  }
}

export default My;
