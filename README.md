# 项目说明

**Author：**传智教育-黑马程序员长沙校区-前端学科组

> 基于 Taro 的小程序商城项目，里面包含的功能点有：
>
> - 首页
> - 商品分类
> - 商品列表
> - 搜索
> - 商品详情
> - 我的
> - 购物车
> - 订单支付
> - 订单列表
> - etc...

# 项目涉及到的技术栈

`Taro + react + Taro-UI + redux + react-redux + scss + eslint`

# 项目基本使用

- `git clone 地址`
- `yarn` 命令安装所需要的依赖包
- `yarn dev:weapp` 运行

## 注意事项

- 需要在自己的开发者后台里面配置合法域名
- 或者在微信工具里面跳过域名的检测
- 登录和支付功能由于其他用户没有权限，你们在登录的时候会返回 400，登录失败

# 项目目录说明

> - `/config` 生成配置文件
> - `/dist` 编译后小程序代码
> - `/src` 代码文件
>   - `/api`  存放请求接口的目录
>   - `/assets` 静态资源目录
>   - `/components` 自定义组件目录
>   - `/pages` 存放主包页面内容的目录
>   - `/store` `redux`状态管理目录
>     - `/action` 存放`action`目录
>     - `/constants`  存放`action`常量目录
>     - `/reducers` 存放`reducers`目录
>   - `/subPackages/pages` 分包的页面内容目录
>   - `app.config.js` 全局配置文件
>   - `app.js` 小程序入口文件
>   - `app.scss` 全局样式文件
> - `.eslintrc eslint` 配置文件
> - `.gitignore git` 忽略清单
> - `babel.config.js` `babel` 配置文件
> - `package.json` 包配置文件

 

