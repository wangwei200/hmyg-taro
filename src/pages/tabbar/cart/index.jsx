import React, { Component } from "react";

import Taro from "@tarojs/taro";

import { connect } from "react-redux";

import { Checkbox, CheckboxGroup } from "@tarojs/components";

import { AtButton, AtInputNumber } from "taro-ui";

import Settle from "../../../components/settle";

import Empty from "../../../components/empty";

import GoodsItem from "../../../components/goodsItem";

import {
  cart_edit_status,
  cart_edit_count,
  cart_edit_all_checked,
} from "../../../store/action/cart";

import "./index.scss";

@connect(
  ({ cartReducer }) => {
    console.log("购物车:", cartReducer);
    return cartReducer;
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
   * 渲染登录选择按钮
   */
  renderChooseAddressBtn() {
    return (
      <AtButton
        type="secondary"
        className="choose_address"
        onClick={this.chooseAddress.bind(this)}
      >
        获取地址+
      </AtButton>
    );
  }
  /**
   * 获取地址
   */
  async chooseAddress() {
    const result = await Taro.chooseAddress().catch((e) => e);
    if (result.errMsg === "chooseAddress:fail cancel")
      return Taro.showToast({
        title: "取消地址选择",
        icon: "none",
      });
    this.setState({
      address: {
        ...result,
      },
    });
    Taro.setStorageSync("address", result);
  }
  /**
   * 渲染地址
   */
  renderChooseAddress() {
    const { address } = this.state;
    return (
      <>
        <view className="first_line" onClick={this.chooseAddress}>
          <view className="left">收货人：{address.userName}</view>
          <view className="right">
            <view className="tel">电话：{address.telNumber}</view>
            <view className="at-icon at-icon-chevron-right"></view>
          </view>
        </view>
        <view className="second_line">收货地址：{this.formartAddress()}</view>
      </>
    );
  }
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
  /**
   * 格式化收货地址
   */
  formartAddress() {
    const {
      provinceName,
      cityName,
      countyName,
      detailInfo,
    } = this.state.address;

    return provinceName + cityName + countyName + detailInfo;
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
   * 渲染购物车列表
   */
  renderCartList() {
    const { carts } = this.props;
    return carts.map((cart) => {
      return (
        <GoodsItem
          key={cart.goodsId}
          title={cart.goodsName}
          desc={`￥${cart.goodsPrice}`}
          descColor="#C00000"
        >
          <view slot="thumb">
            <view className="left_thumb">
              {/* <RadioGroup
                bindchange={() => this.checkChangedHandler(cart.goodsId)}
              >
                <Radio color="#C00000" checked={cart.checked}></Radio>
              </RadioGroup> */}
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
      );
    });
  }
  /**
   * 判断是否全选的状态
   */
  checkStatus() {
    const { carts } = this.props;
    // 如果没有，或者长度小于0，返回false
    if (!carts || carts.length < 0) return false;
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
  submitHandle() {}
  render() {
    const { address } = this.state;
    const { carts } = this.props;
    return (
      <view className="cart">
        <view className="cart_header">
          {address ? this.renderChooseAddress() : this.renderChooseAddressBtn()}
          <view className="border">
            <image src="../../../assets/cart_border@2x.png" />
          </view>
        </view>
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
          onSubmit={this.submitHandle}
        />
      </view>
    );
  }
}

export default Cart;
