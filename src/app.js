import React, { Component } from "react";

import Taro from "@tarojs/taro";

import { Provider } from "react-redux";

import configStore from "./store";

import { BASE_URL } from "../src/utils/http";

import "./app.scss";

const store = configStore();

class App extends Component {
  onLaunch() {
    // 添加拦截器
    Taro.addInterceptor(this.interceptor);
  }
  // 请求拦截器
  interceptor(chain) {
    // 展示请求的loading
    Taro.showLoading({ title: "加载中" });
    // 获取请求参数
    const requestParams = chain.requestParams;
    // 解构 请求方法，数据，和 url
    const { method, data, url } = requestParams;
    console.log(`http ${method || "GET"} --> ${url} data: `, data);
    return chain
      .proceed({
        ...requestParams,
        url: BASE_URL + url,
      })
      .then((res) => {
        // 隐藏loading
        Taro.hideLoading();
        // 响应拦截
        console.log(`http <-- ${url} result:`, res);
        // 如果请求不成功，统一进行弹框
        if (res.statusCode !== 200) {
          Taro.showToast({
            title: res.errMsg,
            icon: "none",
          });
          return null;
        }

        if (res.data.meta.status !== 200) {
          Taro.showToast({
            title: res.data.meta.msg,
            icon: "none",
          });
          return null;
        }
        // 返回请求的数据
        return res.data.message;
      });
  }
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
