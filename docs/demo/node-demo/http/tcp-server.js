import { createRequire } from "module";
const require = createRequire(import.meta.url);

// 1. 引入
const net = require("net");
// 2. 创建
const server = net.createServer((socket) => {
  // 3. 监听
  socket.on("data", (data) => {
    console.log(data.toString());
    // 4.持续的读写流，没有end
    socket.write("你连上了tcp");
  });
});

server.listen(4050);
