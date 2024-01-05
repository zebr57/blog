# http|https 服务相关

http 与 https 之间无非多了个协议，https 有证书秘钥，需要设置一番

## http

1. 如何开启一个服务
2. 根据网址显示不同页面
3. 如何编写 get、post 请求

::: code-group

```js [http-server.js]
const http = require("http");
const server = http.createServer();
// 1.1 监听请求
server.on("request", (req, res) => {
  // 2.1 借助url解析方法，方便操作
  const urlObj = url.parse(req.url, true);

  if (urlObj.pathname == "/page1") {
    res.write("hello");
    res.end(" page1");
  }
  // 2.2 根据地址处理返回出去的资源
  if (urlObj.pathname == "/index") {
    const _html = fs.createReadStream("./index.html");
    _html.on("data", (chunk) => {
      res.write(chunk);
    });
    _html.on("end", () => {
      res.end();
    });
  }
  // 2.3 等处理完html后发现引入index.css文件，网页也是会向服务请求index.css
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
// 1.1 开启服务
server.listen(3030, () => {
  console.log("服务开启成功");
});
```

```js [http-request.js]
const http = require("http");

// GET请求
// http.get("http://localhost:3030/api1?a=198", (res) => {
//   let data = "";
//   res.on("data", (chunk) => {
//     data += chunk;
//   });
//   res.on("end", () => {
//     console.log(JSON.parse(data));
//   });
// });

// POST请求返回的写入流
const req = http.request(
  {
    hostname: "localhost",
    port: "3030",
    path: "/api2",
    method: "POST",
  },
  (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log(data);
    });
  }
);
// body写入
req.write(
  JSON.stringify({
    a: 1,
    b: 2,
    c: 3,
  })
);
req.end();
```

:::

::: tip 总结

1. http 模块，并创建实例，调用实例 on 方法监听请求

2. 使用 url.parse 方法解析 url，方便我们获取地址参数

3. 根据路径后缀判断，显示对应页面或者接收请求数据返回结果

4. on 监听方法第二个参数回调有两个参数，参数一 req 是可读流，参数二 res 是写入流，用于读取文件并返回文件，通过创建一个文件可读流，在监听中 res.write(chunk)写入，最后 res.end()发送出去

5. 如果我们返回的是页面 html 文件，里面引入了 css、js 文件等静态资源时，也会发起请求到服务端，我们也需要在服务根据路径判断（页面请求相当于 get 请求）

6. get 请求参数在解析后的的 url 对象中的 query，可以直接获取，但 post 请求参数是 body，是一个可读流，通过 req.on('data')监听读取时，拼接保存，req.on('end')把结果返回出去

7. 在 node 中发送请求，GET 请求有 http.get(path)方法，直接传路径拼接参数的字符串即可，post 请求只能通过 http.request(config)方法发送请求，该方法返回一个写入流，我们定义一个变量接收后，可调用 write()传入 body 参数（字符串类型），获取服务端返回的结果，通过 res.on('data')监听,和服务端一样，定义个变量，监听时拼接保存，结束时即可获取到完整的结果

8. 一些其他配置

- listen() 第二参数是回调，可打印信息，像 webpack 启动服务后有显示地址功能
- 服务端获取请求头，设置响应体，请求端设置请求头， 都是通过 setHeader，writeHeader 这两个方法操作的

:::


## https

http和https的区别，https多了一个公钥和私钥(证书，上线需要购买)，传输过程中对数据加密。本地工具生成证书，但不被浏览器信任。

## websocket

## tcp
