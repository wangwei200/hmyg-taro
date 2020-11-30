import React from "react";

import "./index.scss";

/**
 * 自定义组件属性
 * options：
 * @param {*} icon TaroUI对应的icon图标
 * @param {*} iconColor 图标颜色
 * @param {*} color 字体颜色
 * @param {*} text 显示文本
 */
function HMGoodsNav(props) {
  const { options, buttonGroup, onClick, onButtonClick } = props;
  if (!options) throw Error("options不能为空");
  if (options.length < 1 && options.length > 3)
    throw Error("options长度必须在 [1,3] 之间");
  if (!buttonGroup) throw Error("buttonGroup不能为空");
  if (buttonGroup.length < 2 && buttonGroup.length > 3)
    throw Error("buttonGroup长度必须在 [2,3] 之间");
  // 遍历左侧的icon
  function renderLeftIcon() {
    return options.map((opt, index) => {
      return (
        <view
          key={index}
          className="left_icon_item"
          onClick={() => onClick && onClick(index)}
        >
          {opt.info === undefined ? (
            ""
          ) : (
            <view className="info">{opt.info}</view>
          )}
          <view
            style={{ color: opt.iconColor ? opt.iconColor : "gray" }}
            className={["at-icon", `at-icon-${opt.icon}`].join(" ")}
          ></view>
          <text
            className="title"
            style={{ color: opt.color ? opt.color : "gray" }}
          >
            {opt.text}
          </text>
        </view>
      );
    });
  }
  // 右侧按钮的渲染
  const renderButtonGroup = () => {
    return buttonGroup.map((btn, index) => {
      return (
        <view
          key={index}
          className="right_btn_item"
          style={{
            backgroundColor: btn.backgroundColor ? btn.backgroundColor : "#fff",
            color: btn.color ? btn.color : "gray",
          }}
          onClick={() => onButtonClick && onButtonClick(index)}
        >
          {btn.text}
        </view>
      );
    });
  };
  return (
    <view className="goods_nav">
      <view className="left_icon">{renderLeftIcon()}</view>
      <view className="right_btn">{renderButtonGroup()}</view>
    </view>
  );
}

export default HMGoodsNav;
