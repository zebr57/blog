import { createRequire } from "module";
const require = createRequire(import.meta.url);

const ws = require("ws");

const websocketServer = ws.Server;
const wss = new websocketServer({ port: 4000 });

wss.on("connection", (wssConnect) => {
  wssConnect.on("message", (msg, err) => {
    console.log(msg.toString());
    wssConnect.send("hello", () => {});
  });
});
