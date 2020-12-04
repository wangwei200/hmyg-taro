import React, { Component } from "react";

import Taro from "@tarojs/taro";

import { connect } from "react-redux";

import { Checkbox, CheckboxGroup } from "@tarojs/components";

import { AtInputNumber, AtSwipeAction } from "taro-ui";

import Settle from "../../../components/Settle";

import Empty from "../../../components/Empty";

import GoodsItem from "../../../components/GoodsItem";

import {
  cart_edit_status,
  cart_edit_count,
  cart_edit_all_checked,
  cart_delete_cart,
} from "../../../store/action/cart";

import "./index.scss";

@connect(
  ({ cartReducer, userReducer }) => {
    console.log("购物车:", cartReducer);
    console.log("用户:", userReducer);
    return {
      ...cartReducer,
      ...userReducer,
    };
  },
  (dispatch) => ({
    // 编辑状态
    editStatus(status, id) {
      dispatch(cart_edit_status(status, id));
    },
    // 数量修改
    editCount(count, id) {
      dispatch(cart_edit_count(count, id));
    },
    editAllStatus(status) {
      dispatch(cart_edit_all_checked(status));
    },
    deleteCart(goodsId) {
      dispatch(cart_delete_cart(goodsId));
    },
  })
)
class Cart extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    address: Taro.getStorageSync("address"),
  };

  /**
   * 页面显示时候调用
   */
  componentDidShow() {
    const { carts } = this.props;
    // 设置tabBar的徽章
    Taro.setTabBarBadge({
      index: 2,
      text: carts.length + "",
    }).catch((e) => e);
  }

  checkChangedHandler(ev, id) {
    const { value } = ev.detail;
    const status = value.length > 0 ? true : false;
    // 发送action
    this.props.editStatus(status, id);
  }
  /**
   * 数量发生改变
   * @param {*} id
   */
  handleCountChange(count, id) {
    // 发送action，修改数量
    this.props.editCount(count, id);
  }
  /**
   * 删除购物车数据
   * @param {*} id 商品id
   */
  deleteCartHanlder(id) {
    this.props.deleteCart(id);
  }
  /**
   * 渲染购物车列表
   */
  renderCartList() {
    const { carts } = this.props;
    return carts.map((cart) => {
      return (
        <AtSwipeAction
          onClick={this.deleteCartHanlder.bind(this, cart.goodsId)}
          utoClose
          options={[
            {
              text: "删除",
              style: {
                backgroundColor: "#C00000",
              },
            },
          ]}
          key={cart.goodsId}
        >
          <GoodsItem
            title={cart.goodsName}
            desc={`￥${cart.goodsPrice}`}
            descColor="#C00000"
          >
            <view slot="thumb">
              <view className="left_thumb">
                <CheckboxGroup
                  onChange={(ev) => this.checkChangedHandler(ev, cart.goodsId)}
                >
                  <Checkbox
                    value={cart.goodsId}
                    checked={cart.checked}
                    color="#C00000"
                  />
                </CheckboxGroup>

                <image src={cart.goodsUrl} mode="widthFix"></image>
              </view>
            </view>
            <view className="calc_count" slot="calc">
              <AtInputNumber
                min={1}
                max={99}
                step={1}
                value={cart.goodsCount}
                onChange={(ev) => this.handleCountChange(ev, cart.goodsId)}
              />
            </view>
          </GoodsItem>
        </AtSwipeAction>
      );
    });
  }
  /**
   * 判断是否全选的状态
   */
  checkStatus() {
    const { carts } = this.props;
    // 如果没有，或者长度小于0，返回false
    if (!carts || carts.length <= 0) return false;
    // 只要中途有一个false，那么就代表不是全选
    const result = carts.some((cart) => {
      // 如果有满足的就返回true，这里需要筛选的是false状态
      return !cart.checked;
    });
    if (result) return false;
    return true;
  }
  /**
   * 获取选中的数量
   */
  getCheckCount() {
    const { carts } = this.props;
    // 如果没有，或者长度小于0，返回0
    if (!carts || carts.length < 0) return 0;
    const checkCarts = carts.filter((x) => x.checked);
    if (checkCarts) return checkCarts.length;
    return 0;
  }
  /**
   * 计算选中的购物车的价格
   */
  calcCheckPrice() {
    const { carts } = this.props;
    if (!carts || carts.length < 0) return "0.00";
    let price = 0.0;
    carts.forEach((cart) => {
      if (cart.checked) {
        price += cart.goodsCount * cart.goodsPrice;
      }
    });
    return price.toFixed(2);
  }
  /**
   * 全选和全不选
   */
  allCheckHandle(checked) {
    this.props.editAllStatus(checked);
  }
  /**
   * 点击结算，判断地址是否填写，判断是否登录
   */
  submitHandle() {
    // 判断用户是否登录，如果没有，跳转到登录页面
    const { user } = this.props;
    if (!user.nickName)
      return Taro.showModal({
        cancelColor: "#ccc",
        cancelText: "取消",
        confirmColor: "#c00000",
        confirmText: "确定",
        content: "还未登录，是否跳转登录页面",
        success: (res) => {
          // 用户点击了确定
          if (res.confirm)
            Taro.switchTab({
              url: "/pages/tabbar/my/index",
            });
        },
      });
    // 如果登录了，跳转到结算中心
    Taro.navigateTo({
      url: "/subPackages/pages/order/index",
    });
  }
  render() {
    const { carts } = this.props;
    return (
      <view className="cart">
        <view className="cart_content">
          <view className="header">
            <view className="at-icon at-icon-shopping-bag"></view>
            &nbsp;&nbsp;购物车
          </view>
          {carts.length > 0 ? (
            <view className="cart_list">{this.renderCartList()}</view>
          ) : (
            <Empty></Empty>
          )}
        </view>

        <Settle
          position="bottom"
          checked={this.checkStatus()}
          count={this.getCheckCount()}
          price={this.calcCheckPrice()}
          onChange={this.allCheckHandle.bind(this)}
          onSubmit={this.submitHandle.bind(this)}
        />
      </view>
    );
  }
}

export default Cart;
