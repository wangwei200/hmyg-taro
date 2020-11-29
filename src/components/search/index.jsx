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
