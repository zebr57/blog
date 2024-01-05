import { createRequire } from "module";
import { fileURLToPath } from "url";
import router from "./express-router.js";
const require = createRequire(import.meta.url);
const path = require("path");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const express = require("express");

const app = express();

/* ===================================== 使用中间件获取参数 ===================================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* ===================================== 静态资源 ===================================== */
app.use(express.static(__dirname + "/assets"));
/* ===================================== 自定义中间件 ===================================== */
// 中间件1
app.use((req, res, next) => {
  // res.setHeader('xx-xx','xx') // 设置单个
  // res.set == res.header
  res.header({
    "Access-Control-Allow-Credentials": true, //允许后端发送cookie
    "Access-Control-Allow-Origin": req.headers.origin || "*", //任意域名都可以访问,或者基于我请求头里面的域，一般设置所有 *
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type", //设置请求头格式和类型，一般设置 Content-Type
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS", //允许支持的请求方式
  });
  next();
});
// 中间件2
app.use((req, res, next) => {
  console.log(2);
  next();
});

app.get("/", (req, res) => {
  // console.log(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
});
// 使用路由分模块，目录前缀
app.use("/mode1", router);

app.listen(8000);
