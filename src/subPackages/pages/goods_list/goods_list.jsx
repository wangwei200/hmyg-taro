import React, { useState, useEffect } from "react";
import Taro, {
  useRouter,
  usePullDownRefresh,
  useReachBottom,
} from "@tarojs/taro";

import { GOODS_LIST_URL } from "../../../utils/http";

import Empty from "../../../components/empty";

import GoodsItem from "../../../components/goodsItem";

export default function () {
  console.log("进入了函数");
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
  // 是否加载中
  let loading = false;

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
    loading = true;
    // 发送请求
    const result = await Taro.request({
      url: GOODS_LIST_URL,
      data: {
        query,
        pagenum: queryInfo.page,
        pagesize: queryInfo.pageSize,
      },
    });
    if (!result) return;
    loading = false;
    setResInfo((res) => {
      if (res.page === 1) Taro.stopPullDownRefresh();
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
    if (loading) return;
    // 解决一下第一次进来的时候不出发 effects的问题

    setResInfo((res) => {
      return {
        ...res,
        goodsList: [],
      };
    });
    console.log(queryInfo.page);
    if (queryInfo.page === 1) return requestGoods();
    // 重置页码值，进行请求
    setQueryInfo((res) => {
      return {
        ...res,
        page: 1,
      };
    });
    // requestGoods(() => {
    //   // 请求成功，停止下拉刷新
    //   Taro.stopPullDownRefresh();
    //   console.log(resInfo.goodsList);
    // });
  });
  useReachBottom(() => {
    if (loading) return;
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
    // requestGoods();
  });
  return (
    <view>
      {resInfo.goodsList.length > 0 ? (
        <view className="goods_list">{renderGoodsItem()}</view>
      ) : (
        <view className="empry">
          <Empty />
        </view>
      )}
    </view>
  );
}
