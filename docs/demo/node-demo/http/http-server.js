import { createRequire } from "module";
const require = createRequire(import.meta.url);

const http = require("http");
const fs = require("fs");
const url = require("url");

// 1. 如何开启一个服务
// 2. 根据网址显示不同页面
// 3. 如何编写get、post请求
const server = http.createServer();
// 服务的本质，根据请求地址去做不同的操作
// req是一个可读流，res是一个写入流
// 借助url解析模块，方便操作
// 客户端向node发请求
// node向node发请求
server.on("request", (req, res) => {
  //获取请求头、设置响应头
  res.setHeader("a", "asasdasd"); // 只能设置一个
  // 设置多个，还能设置状态码
  res.writeHead(400, {
    b: "bbb",
    c: "cccc",
  });
  //  获取请求头
  // console.log(req.headers);

  // 1.1 解析地址  true代表query解析为对象
  const urlObj = url.parse(req.url, true);
  if (urlObj.pathname == "/page1") {
    res.write("hello");
    res.end(" page1");
  }
  if (urlObj.pathname == "/page2") {
    res.write("hello");
    res.end(" page2");
  }
  // 2.1 根据地址处理返回出去的资源
  if (urlObj.pathname == "/index") {
    const _html = fs.createReadStream("./index.html");
    _html.on("data", (chunk) => {
      res.write(chunk);
    });
    _html.on("end", () => {
      res.end();
    });
  }
  // 2.2 等处理完html后发现引入index.css文件，网页也是会向服务请求index.css
  if (urlObj.pathname == "/index.css") {
    const _css = fs.createReadStream("./index.css");
    _css.on("data", (chunk) => {
      res.write(chunk);
    });
    _css.on("end", () => {
      res.end();
    });
  }
  // 3.1 get 请求 - 参数在url中
  if (urlObj.pathname == "/api1") {
    if (req.method != "GET") {
      res.statusCode = 400;
      res.end();
    }
    let query = urlObj.query;
    res.end(
      JSON.stringify({
        data: [1, 2, 3],
        a: query.a,
      })
    );
  }
  // 3.2 post 请求 - 参数在于body，body是一个可读流
  if (urlObj.pathname == "/api2") {
    if (req.method != "POST") {
      res.statusCode = 400;
      res.end();
    }
    let params = "";
    req.on("data", (chunk) => {
      params += chunk;
    });
    req.on("end", () => {
      res.end("你 post 请求了，参数为：" + params);
    });
  }
});

server.listen(3030, () => {
  console.log("服务开启成功");
});

// 1. listen监听
// 2. 获取请求头、设置响应头
/** 服务端和请求端都是setHeader和writeHead这两个方法
 res.setHeader("a", "asasdasd"); // 只能设置一个
  // 设置多个，还能设置状态码
  res.writeHead(400, {
    b: "bbb",
    c: "cccc",
  });
  //  获取请求头
  console.log(req.headers);
 */
