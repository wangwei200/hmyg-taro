/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 商品列表
 */
import React, { useState, useEffect } from "react";
import Taro, {
  useRouter,
  usePullDownRefresh,
  useReachBottom,
} from "@tarojs/taro";

import GoodsItem from "../../../components/GoodsItem";

import { goodsListData } from "../../../api/goods";

export default function () {
  // 商品列表数据
  const [resInfo, setResInfo] = useState({
    goodsList: [],
    total: 0,
  });
  // 总条目数
  const [queryInfo, setQueryInfo] = useState({
    // 页码值
    page: 1,
    // 每页数据量
    pageSize: 10,
  });
  // 解构路由参数
  const { params } = useRouter();
  const [isLoading, changeLoadingStatus] = useState(false);

  // 初始化query值
  const [query] = useState(params.query || "");
  // 监听页面事件的回调
  useEffect(() => {
    requestGoods();

    return () => {
      // 销毁的时候调用
    };
  }, [queryInfo.page]);
  // 请求数据
  async function requestGoods() {
    changeLoadingStatus(true);
    // 发送请求
    const result = await goodsListData(
      query,
      queryInfo.page,
      queryInfo.pageSize
    );
    if (!result) return;

    changeLoadingStatus(false);

    setResInfo((res) => {
      if (queryInfo.page === 1) {
        res.goodsList = [];
        Taro.stopPullDownRefresh();
      }
      return {
        total: result.total,
        goodsList: [...res.goodsList, ...result.goods],
      };
    });
  }
  /**
   * 渲染商品item条目
   */
  function renderGoodsItem() {
    const { goodsList } = resInfo;
    if (!goodsList || goodsList.length <= 0) return "";
    return goodsList.map((item) => {
      return (
        <GoodsItem
          key={item.goods_id}
          title={item.goods_name}
          thumb={item.goods_small_logo}
          desc={`￥${item.goods_price}`}
          descColor="#C00000"
          click={() => {
            Taro.navigateTo({
              url: `/subPackages/pages/goods_detail/goods_detail?goods_id=${item.goods_id}`,
            });
          }}
        ></GoodsItem>
      );
    });
  }
  // 下拉刷新
  usePullDownRefresh(() => {
    if (isLoading) return;
    // 解决一下第一次进来的时候不出发 effects的问题

    console.log(queryInfo.page);
    if (queryInfo.page === 1) return requestGoods();
    // 重置页码值，进行请求
    setQueryInfo((res) => {
      return {
        ...res,
        page: 1,
      };
    });
  });
  useReachBottom(() => {
    if (isLoading) return;
    // 判断加载的数据是否超过服务器的最大条目数
    const { page, pageSize } = queryInfo;
    const { total } = resInfo;
    console.log(page * pageSize, total);
    if (page * pageSize >= total)
      return Taro.showToast({
        title: "服务器被榨干了",
      });
    setQueryInfo({
      page: page + 1,
      pageSize: 10,
    });
  });
  return (
    <view>
      <view className="goods_list">{renderGoodsItem()}</view>
    </view>
  );
}
