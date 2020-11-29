import React from "react";

import "./index.scss";

/**
 * 封装的自定义组件，属性如下
 * @param {*} thumb 图片地址
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} descColor 描述文字颜色
 */
function GoodsItem(props) {
  const { thumb, title, desc, descColor, click } = props;
  return (
    <view className="goods_item" onClick={() => click && click()}>
      <view className="left_thumb">
        <image className="thumb" mode="widthFix" src={thumb} />
      </view>
      <view className="right_content">
        <view className="title">{title}</view>
        <view
          className="desc"
          style={{ color: descColor ? descColor : "#ccc" }}
        >
          {desc}
        </view>
      </view>
    </view>
  );
}
export default GoodsItem;
