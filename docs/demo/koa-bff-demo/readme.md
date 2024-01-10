# koa 实现 bff 中间层（demo）

## 项目依赖

```js
  "dependencies": {
    "ejs": "^3.1.9",
    "koa": "^2.15.0",
    "koa-router": "^12.0.1",
    "koa-views": "^8.1.0"
  }
```

Now using node v18.14.2 (npm v9.5.0)

## 项目目录

介绍 demo

```
koa-bff-demo
├── router
│   └── index.js  // 路由模块
├── views
│   └── index.ejs  // ejs模版页面
├── app.js  // 启动文件
├── package-lock.json
├── package.json
└── readme.md
```

实战 demo

```
koa-bff-demo
├── models          // 处理请求对应页面的逻辑处理
│   ├── detail.js
│   ├── index.js
│   └── login.js
├── router  // 路由
│   └── index.js    // 首页、登录页、详情页
├── static          // 静态资源目录
│   └── index.css
├── views           // 页面模版
│   ├── detail.ejs
│   ├── index.ejs
│   ├── list.ejs
│   └── login.ejs
├── app.js          // 程序入口
├── package-lock.json
├── package.json
├── readme.md
└── server.js   // 模拟请求服务

```
