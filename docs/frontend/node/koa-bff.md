# Koa 实现中间层 bff 中间层

## 什么是 bff 中间层

服务端渲染，服务器自己发起请求，获取数据，使用模版引擎渲染

1. 分析请求路径、参数，
2. 找到对应 html(view 模版) + 从接口请求数据
3. 渲染了数据的页面

## 为什么要搞 BFF 服务，还要用 node 搞？

vue 项目是请求 js、html 文件、用户去执行 js 渲染
bff 是直接渲染带内容的 html，有利于 seo，网络请求在同一局域网下请求，比客户端到服务器请求要快。

node 高并发的模版渲染，但是计算能力差
适合做中间层，不适合做数据处理的后端服务

## 模版引擎

有 ejs、pug，推荐使用 ejs 比较方便

js 部分使用`<% for(...){} %>`包裹，如果是一个值，`<%=  name %>`

::: code-group

```js [app.js]
const Koa = require("koa");
const router = require("./router/index");
const views = require("koa-views"); // 引入

const app = new Koa();

// 自动处理
app.use(
  views("./views", {
    extension: "ejs",
  })
);

app.use(router.routes());
app.listen(3000);
```

```js [router.js]
const KoaRouter = require("koa-router");
// const ejs = require("ejs");
// const fs = require("fs");
const router = new KoaRouter();

router.get("/index", async (ctx, next) => {
  /** 方式一
    const _template = fs.readFileSync("./views/index.ejs", 'utf-8');
    const _html = await ejs.render(_template, {
      word: "hello ejs.",
    });
    ctx.body = _html;
  */
  /** 方式二
    ejs.renderFile(
      "./views/index.ejs",
      {
        word: "hello ejs.",
      },
      (err, _html) => {
        ctx.body = _html;
      }
    );
  */
  // 方式三 koa-views 中间件
  await ctx.render("index", {
    word: "hello ejs.",
  });
});

module.exports = router;
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ejs-template</title>
  </head>
  <body>
    <div><%= word %></div>
  </body>
</html>
```

:::

vue、react 有自己模版，做 ssr 上手方便，

## 静态资源

```js
const static = require("koa-static");

app.use(static("./static"));
```

## 遇到的一些错误

```shell
TypeError: this.templateText.replace is not a function
```

读取文件时添加编码格式 'utf-8'

```js
fs.readFile("index.ejs", "utf-8", function (err, data) {
  // now data is a string
});
```

## pm2 进程管理

用处：使用 pm2 开起服务，即使修改了代码也无需重启了

之后接触 ssr 项目，像 next.js 的 vue 项目，部署时都是都需要使用 pm2 开启服务

### 基础操作

```shell
pm2 start id
pm2 restart id
pm2 stop id
pm2 delete id
pm2 list
pm2 start xxx.js -id -number
```
