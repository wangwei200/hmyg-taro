/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 搜索组件
 */
import React, { Component } from "react";

import Taro from "@tarojs/taro";

import "./index.scss";

export default class Search extends Component {
  render() {
    return (
      <view
        className="search"
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/search/index",
          });
        }}
      >
        <view className="content">
          <view className="at-icon at-icon-search"></view>
          &nbsp;&nbsp;搜索
        </view>
      </view>
    );
  }
}
