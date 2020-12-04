import React, { Component } from "react";

import Taro from "@tarojs/taro";

import { ScrollView, Image, Text } from "@tarojs/components";

import Search from "../../../components/Search";

import { categoryData } from "../../../api/cates";

import "./index.scss";

export default class Cate extends Component {
  state = {
    cates: [],
    active: 0,
    hw: 0,
  };
  onLoad() {
    // 获取固定的高度
    const { windowHeight } = Taro.getSystemInfoSync();
    console.log(windowHeight);
    this.setState({
      hw: windowHeight,
    });
    this.getCategoryData();
  }
  async getCategoryData() {
    const result = await categoryData();
    if (!result) return;
    this.setState({
      cates: [...result],
    });
  }
  /**
   * 左侧item的点击事件
   */
  leftItemClick(index) {
    if (index === this.state.active) return;
    this.setState({
      active: index,
    });
  }
  /**
   * 渲染左侧
   */
  renderLeftItems() {
    return this.state.cates.map((item, index) => {
      return (
        <view
          key={index}
          className={["item", index === this.state.active ? "active" : ""].join(
            " "
          )}
          onClick={() => this.leftItemClick(index)}
        >
          {item.cat_name}
        </view>
      );
    });
  }
  /**
   * 渲染右侧的三级列表
   * @param {*} items
   */
  renderRightContent(items) {
    if (items.length <= 0) return "";
    return items.map((item) => {
      return (
        <view
          className="right-content-item"
          key={item.cat_id}
          onClick={() => {
            Taro.navigateTo({
              url: "/subPackages/pages/goods_list/goods_list",
            });
          }}
        >
          <Image src={item.cat_icon}></Image>
          <Text>{item.cat_name}</Text>
        </view>
      );
    });
  }
  /**
   * 渲染右侧内容
   */
  renderRightItems() {
    const { cates, active } = this.state;
    if (cates.length <= 0) return "";
    return cates[active].children.map((item) => {
      return (
        <view key={item.cat_id}>
          <view className="right-title">- {item.cat_name} -</view>
          <view className="right-content">
            {this.renderRightContent(item.children)}
          </view>
        </view>
      );
    });
  }
  render() {
    return (
      <view>
        <Search />
        <view className="scroll-view-container">
          <ScrollView
            className="leftNavs"
            scroll-y
            style={{ height: `${this.state.hw}px` }}
          >
            {this.renderLeftItems()}
          </ScrollView>

          <ScrollView
            className="rightNavs"
            scroll-y
            style={{ height: `${this.state.hw}px` }}
          >
            {this.renderRightItems()}
          </ScrollView>
        </view>
      </view>
    );
  }
}
