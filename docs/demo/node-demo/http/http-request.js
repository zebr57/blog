import { createRequire } from "module";
const require = createRequire(import.meta.url);

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
