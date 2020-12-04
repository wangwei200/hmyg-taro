import React, { Component } from "react";

import { Input } from "@tarojs/components";

import { AtList, AtListItem, AtTag } from "taro-ui";

import Taro from "@tarojs/taro";

import "./index.scss";

import { searchData } from "../../api/search";

export default class Search extends Component {
  state = {
    inputValue: "",
    isShowClear: false,
    timer: null,
    searchList: [],
    isShowHistory: true,
    historyData: [],
  };
  /**
   * 清空历史记录
   */
  historyDelete() {
    this.setState({
      historyData: [],
    });
  }
  /**
   * 输入框change事件
   * @param {*} value
   */
  inputChanged(ev) {
    const value = ev.detail.value;
    if (value.trim()) {
      this.state.isShowClear = true;
      this.state.isShowHistory = false;
    } else {
      this.state.isShowClear = false;
      this.state.isShowHistory = true;
      this.state.searchList = [];
    }

    clearTimeout(this.state.timer);
    this.state.timer = setTimeout(() => {
      this.requestSearchList(value);
    }, 500);
    this.setState({
      inputValue: value,
    });
    // return value;
  }
  /**
   * 获取搜索历史列表
   */
  async requestSearchList(value) {
    if (!value) return;
    const result = await searchData(value);
    if (!result) return;
    // 请求成功，保存关键字
    this.state.historyData.unshift(value);
    this.setState({
      searchList: [...result],
    });
    console.log(this.state.historyData);
  }
  /**
   * 清楚输入框内容
   */
  clearInput() {
    // 重置内容
    this.setState({
      inputValue: "",
      isShowClear: false,
      isShowHistory: true,
      searchList: [],
    });
  }
  /**
   * 渲染搜索列表
   */
  renderSearchList() {
    return this.state.searchList.map((item) => {
      return (
        <AtListItem
          className="search_item"
          key={item.goods_id}
          title={item.goods_name}
          arrow="right"
          onClick={() => {
            Taro.navigateTo({
              url: `/subPackages/pages/goods_list/goods_list?query=${item.goods_id}`,
            });
          }}
        />
      );
    });
  }
  /**
   * 渲染历史记录
   */
  renderHistory() {
    const { historyData } = this.state;
    if (historyData.length <= 0)
      return (
        <view style={{ textAlign: "center", width: "100%" }}>没有搜索记录</view>
      );
    return historyData.map((item) => {
      return (
        <AtTag key={item} type="primary" circle>
          {item}
        </AtTag>
      );
    });
  }
  render() {
    return (
      <view className="search_page">
        <view className="search_header">
          <view className="search_icon at-icon at-icon-search"></view>
          <view
            onClick={this.clearInput.bind(this)}
            style={{ display: this.state.isShowClear ? "block" : "none" }}
            className="search_clear at-icon at-icon-close-circle"
          ></view>

          <view className="search_container">
            <Input
              className="search_input"
              type="text"
              placeholder="请输入搜索内容"
              value={this.state.inputValue}
              onInput={this.inputChanged.bind(this)}
            />
          </view>
        </view>
        <view className="search_history">
          <view className="title">
            搜索历史
            <view
              onClick={this.historyDelete}
              className="search_delete at-icon at-icon-trash"
            ></view>
          </view>
        </view>
        {/* 判断是显示搜索列表还是显示历史记录 */}
        {this.state.isShowHistory ? (
          <view className="search_history_data">{this.renderHistory()}</view>
        ) : (
          <view className="search_list">
            <AtList>{this.renderSearchList()}</AtList>
          </view>
        )}
      </view>
    );
  }
}
