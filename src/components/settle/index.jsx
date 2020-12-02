import React from "react";

import "./index.scss";

/**
 * 自定义属性
 * @param {*} checked  是否选中
 * @param {*} count  数量
 * @param {*} price 价格
 * @param {*} onChange checkbox 的change事件
 * @param {*} onSubmit 点击事件
 * @param {*} position 位置
 */
export default function Settle(props) {
  const { checked, count, price, onChange, onSubmit, position } = props;
  return (
    <view className="settle" style={{ position: "fixed", [position]: "0rpx" }}>
      <view className="left_checked">
        <image
          src={
            checked
              ? "/assets/component_img/Checksircle.png"
              : "/assets/component_img/unchecked.png"
          }
          mode="aspectFit"
          className="icon"
          onClick={() => onChange && onChange(!checked)}
        />
        <text className="text_desc">全选</text>
      </view>

      <view className="middle">
        <text className="text_desc">合计：</text>
        <text className="text_price">￥{price ? price : 0.0}</text>
      </view>

      <view className="right_btn">
        <button
          onClick={(e) => onSubmit && onSubmit(e)}
          className={["btn", count > 0 ? "" : "disabled"].join(" ")}
        >
          结算({count ? count : 0})
        </button>
      </view>
    </view>
  );
}
