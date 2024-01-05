import Koa from "koa";
import { koaBody } from "koa-body";
import router from "./koa-router.js";

const app = new Koa();
// 解析body
app.use(
  koaBody({
    multipart: true, // 得加，原先版本是multer
  })
);

app.use((ctx, next) => {
  // 设置请求头跨域
  ctx.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": ctx.request.headers.origin || "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
  });
  console.log(ctx.url); // 获取url
  console.log(ctx.query); // 获取query
  // 获取post请求参数body，借助第三方库 koa-body
  if (ctx.method == "POST") {
    console.log(ctx.request.body);
  }
  // koa提供了很多简写 ctx.body = ctx.response.body
  ctx.body = "hello1";
  // 可以不调next()，就不会传递到下个中间件
  next(); // 加上next的话就会将修改传递到下一个中间件
});

// 使用路由
app.use(router.routes());

app.listen(3000);

// koa2 - bff前端服务中间层