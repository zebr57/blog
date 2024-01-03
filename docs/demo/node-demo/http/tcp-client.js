import { createRequire } from "module";
const require = createRequire(import.meta.url);

// 1. 引入
const net = require("net");
// 2. 创建实例
const client = new net.Socket()
// 3. 建立连接
client.connect(4050, 'localhost', () => {
  // 3.1 发送消息
  client.write('你好，我是客户端')
})
// 4.监听
client.on('data', (data) => {
  console.log(data.toString());
})