# node 框架 Express 和 koa

## Express

express 工作模型

方便在哪？

- 不用自己去判断路径了
- 更多中间件处理、数据格式、配置 cors 跨域
- 静态资源，返回文件存在依赖时，比如 html 中引入 css、js 文件，可以把它们放到静态资源目录下，它会自动匹配请求，不用再去写判断了
- 模块路由区分，随着业务增加，方便管理

### 快速创建服务

1. 引入 express
2. 创建实例
3. 创建中间件（处理请求）
4. 开启监听服务

```js
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// 1. 引入
const express = require("express");
// 2. 创建实例
const app = express();
// 3. 创建中间件
// 中间件1
app.use((req, res, next) => {
  console.log(1);
  next();
});
// 中间件2
app.use((req, res, next) => {
  console.log(2);
  next();
});
// get，回调也是算是中间件, 不用next，已有res出去结果了
app.get("/api1", (req, res) => {
  console.log(3);
  // res.sendFile();  // 返回文件
  res.json({
    a: [1, 2, 3],
  });
});
// post，回调也是算是中间件
app.post("/api2", (req, res) => {
  console.log(4);
  res.json({
    b: 999,
  });
});
// 4. 开启服务
app.listen(8000);
```

### 中间件之跨域处理

1. 不同域名发起请求存在跨域，POST 请求等
2. 线上项目中，处理方式都是设置响应头

- 在首个中间件设置

```js
// 中间件1
app.use((req, res, next) => {
  console.log(1);
  // res.setHeader('xx-xx','xx') // 设置单个
  // res.set == res.header
  res.header({
    "Access-Control-Allow-Credentials": true, //允许后端发送cookie // [!code ++]
    "Access-Control-Allow-Origin": req.headers.origin || "*", //任意域名都可以访问,或者基于我请求头里面的域，一般设置 * 所有 // [!code ++]
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type", //设置请求头格式和类型，一般设置 Content-Type // [!code ++]
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS", //允许支持的请求方式 // [!code ++]
    "Content-Type": "application/json; charset=utf-8", //默认与允许的文本格式json和编码格式 // [!code ++]
  });
  next();
});
```

### 中间件之参数处理

- 表单提交、字符串
- json 格式
- raw 源文件
- 纯文本 text
- file 文件

```js
const multer = require("multer");
const uploader = multer({
  dest: "upload/",
});

app.use(express.urlencoded());
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.json());

// get，可直接获取query参数
app.get("/api1", (req, res) => {
  console.log(3, req.query);
  res.json({
    a: [1, 2, 3],
  });
});
// post，借助express.json中间件才能获取得到
app.post("/api2", (req, res) => {
  console.log(req.body);
  res.json({
    b: 999,
  });
});
// 资源引用，借助express.static()中间件，能自动处理，不用再去写判断
app.get("/index", (req, res) => {
  // console.log(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
});
// 文件类型，借助第三方库 multer, 可以传多个回调相当于多个中间件
app.post("/api3", uploader.single("file"), (req, res) => {
  console.log("api3", req.body);
});
```

### 路由模块化

随着业务增加，需要区分业务，好管理

使用 express.Router() 创建，该 router 中间件仅内部使用，不会影响其他不匹配模块
::: code-group

```js [express-server.js]
import { createRequire } from "module";
import { fileURLToPath } from "url";
import router from "./express-router.js"; // [!code ++]
const require = createRequire(import.meta.url);
const path = require("path");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
  });
  next();
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// 使用路由分模块，目录前缀
app.use("/mode1", router); // [!code ++]

app.listen(8000);
```

```js [express-router.js]
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const multer = require("multer");

// 1. 创建router
const router = express.Router();
const uploader = multer({
  dest: "upload/",
});
// 2. 使用router
router.get("/api1", (req, res) => {
  console.log(3, req.query);
  res.json({
    a: [1, 2, 3],
  });
});
router.post("/api2", (req, res) => {
  res.json({
    b: 999,
  });
});

router.post("/api3", uploader.single("file"), (req, res) => {
  console.log("api3", req.body);
});

export default router;
```

:::

## koa

更加轻量，不像 express 集成了很多东西，想要什么就去安装什么即可

### 快速创建

- 通过 new Koa() 的方式创建
- 中间件回调的参数 ctx 包含 request 和 response
- 提供了简写，直接 ctx.xx，等效于 ctx.request.xx 或者 ctx.response.xx
- 中间件会调中，可以不调用 next()，表示在这层结束
- 设置请求头 ctx.set({...})
- 解析请求携带的参数-请求体，需要借助第三方库了， koa-body(新)、body-parse(旧)
- 路由，借助 koa-router

#### 快速开启

```js [koa-server.js]
import Koa from "koa";

const app = new Koa();

app.use((ctx, next) => {
  // 可以不调next()，就不会传递到下个中间件
  // koa提供了很多简写 ctx.body = ctx.response.body
  ctx.body = "hello1";
  next(); // 加上next的话就会将修改传递到下一个中间件
});
app.use((ctx, next) => {
  ctx.body = "hello2";
  next();
});

app.use((ctx, next) => {
  ctx.body = "hello3";
});

app.listen(3000);
```

#### 解决跨域

```js
app.use((ctx, next) => {
  // 设置请求头跨域
  ctx.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": ctx.request.headers.origin || "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
  });
  next(); // 修改传递到下一个中间件
});
```

#### 获取路径、参数

- 安装 koa-body 帮助我们解析 body

```shell
npm install koa-body --save
```

- 使用，解析参数

```js
// ...
import { koaBody } from "koa-body"; // 1. 引入
// ...
const app = new Koa();
// 2. 使用
app.use(
  koaBody({
    multipart: true, // 得加，原先版本是multer
  })
);
app.use((ctx, next) => {
  console.log(ctx.url); // 获取url
  console.log(ctx.query); // 获取query
  // 获取post请求参数body，借助第三方库 koa-body
  if (ctx.method == "POST") {
    console.log(ctx.request.body);
  }
});
// ...
```

#### 路由区分

- 安装 koa-router

```shell
npm install koa-router --save
```

- 使用

::: code-group

```js [koa-router.js]
import koaRouter from "koa-router"; // 1. 引入

const router = new koaRouter(); // 2. 创建

// 3. 使用
router.get("/api1", (ctx, next) => {
  ctx.body = {
    a: [1, 2, 3],
  };
});
router.post("/api2", (ctx, next) => {
  ctx.body = {
    b: 999,
  };
});

export default router; // 4. 导出
```

```js [koa-server.js]
// ...
import router from "./koa-router.js"; // 5.引入新建的router
// ...
app.use(router.routes()); // 6. 使用router

app.listen(3000);
```

:::
