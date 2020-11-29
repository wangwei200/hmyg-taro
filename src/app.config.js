export default {
  pages: [
    "pages/tabbar/home/index",
    "pages/tabbar/cate/index",
    "pages/tabbar/cart/index",
    "pages/tabbar/my/index",
    "pages/search/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#D81E06",
    navigationBarTitleText: "黑马优购",
    navigationBarTextStyle: "white",
  },
  subpackages: [
    {
      root: "subPackages",
      pages: ["pages/goods_list/goods_list", "pages/goods_detail/goods_detail"],
    },
  ],
  preloadRule: {
    "pages/tabbar/cate/index": {
      network: "all",
      packages: ["subPackages"],
    },
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/tabbar/home/index",
        text: "首页",
        iconPath: "./assets/tab_icons/home.png",
        selectedIconPath: "./assets/tab_icons/home-active.png",
      },
      {
        pagePath: "pages/tabbar/cate/index",
        text: "分类",
        iconPath: "./assets/tab_icons/cate.png",
        selectedIconPath: "./assets/tab_icons/cate-active.png",
      },
      {
        pagePath: "pages/tabbar/cart/index",
        text: "购物车",
        iconPath: "./assets/tab_icons/cart.png",
        selectedIconPath: "./assets/tab_icons/cart-active.png",
      },
      {
        pagePath: "pages/tabbar/my/index",
        text: "我的",
        iconPath: "./assets/tab_icons/my.png",
        selectedIconPath: "./assets/tab_icons/my-active.png",
      },
    ],
  },
};
