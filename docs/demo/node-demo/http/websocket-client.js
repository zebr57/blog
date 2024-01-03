import { createRequire } from "module";
const require = createRequire(import.meta.url);

const websocket = require("ws");

const wsClient = new websocket("ws://localhost:4000");

wsClient.on("open", function () {
  wsClient.send("hi");
});

wsClient.on("message", function (data) {
  console.log(data.toString());
});

// 控制台输入
// const ws = new WebSocket('ws://localhost:4000/')

// ws.onopen = function() {
//   console.log('connect')
// }

// ws.onmessage = function(e) {
//   console.log(e.data);
// }

// ws.send('hello')
