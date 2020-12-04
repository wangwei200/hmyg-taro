import React from "react";

import "./index.scss";

/**
 * 封装的自定义组件，属性如下
 * @param {*} thumb 图片地址,如果利用插槽方式设置了 slot=thumb，那么会占据整个图片的问题
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} descColor 描述文字颜色
 */
function GoodsItem(props) {
  const {
    thumb,
    title,
    desc,
    descColor,
    click,
    children,
    backgroundColor,
  } = props;
  // 渲染左侧
  let renderLeftThumb = null;
  let renderCalc = null;
  if (children && children instanceof Array && children.length > 0) {
    // 多个插槽的情况下
    children.forEach((child) => {
      if (child.props.slot === "thumb") {
        // 需要通过插槽方式渲染左侧
        renderLeftThumb = () => {
          return child.props.children;
        };
      } else if (child.props.slot === "calc") {
        // 需要渲染计数器
        renderCalc = () => {
          return child.props.children;
        };
      }
    });
  } else if (children && children instanceof Object) {
    // 如果只有一个插槽的情况下
    if (children.props.slot === "thumb") {
      // 需要通过插槽方式渲染左侧
      renderLeftThumb = () => {
        return children.props.children;
      };
    } else if (children.props.slot === "calc") {
      // 需要渲染计数器
      renderCalc = () => {
        return children.props.children;
      };
    }
  }

  if (!renderLeftThumb)
    //如果为空
    renderLeftThumb = () => {
      return <image className="thumb" mode="widthFix" src={thumb} />;
    };

  return (
    <view
      style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
      className="goods_item"
      onClick={() => click && click()}
    >
      <view className="left_thumb">{renderLeftThumb()}</view>

      <view className="right_content">
        <view className="title">{title}</view>
        <view
          className="desc"
          style={{ color: descColor ? descColor : "#ccc" }}
        >
          {desc}
        </view>
        {renderCalc ? <view className="calc">{renderCalc()}</view> : ""}
      </view>
    </view>
  );
}
export default GoodsItem;
