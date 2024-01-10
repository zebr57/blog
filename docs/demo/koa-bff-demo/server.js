/*
 * @Author: 沈林强
 * @Description: 模拟请求服务
 */

const koa = require("koa");
const koaRouter = require("koa-router");
const { koaBody } = require("koa-body");
const cors = require("koa-cors");
const app = new koa();
const router = new koaRouter();

app.use(cors());
app.use(
  koaBody({
    multipart: true, // 得加，原先版本是multer
  })
);

const goodList = [
  { name: "电脑", id: 1 },
  { name: "手机", id: 2 },
  { name: "电器", id: 3 },
];
// 登录
router.post("/login", async (ctx, next) => {
  if (ctx.request.body.username == "user1" && ctx.request.body.password == "123456") {
    ctx.body = {
      message: "登录成功",
    };
  } else {
    ctx.body = {
      message: "登录失败",
    };
  }
});
// 商品列表
router.get("/list", async (ctx, next) => {
  ctx.body = {
    list: goodList,
  };
});
// 详情
router.get("/detail", async (ctx, next) => {
  let _id = ctx.query.id;
  const item = goodList.find((e) => e.id == _id);
  console.log(item);
  ctx.body = item;
});

app.use(router.routes());
app.listen(4000);
