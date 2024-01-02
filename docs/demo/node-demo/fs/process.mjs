/*
 * @Description: 进程相关
 */
// fix require and __dirname is not defined in ES module scope.
import { createRequire } from "module";
import { fileURLToPath } from "url";
const require = createRequire(import.meta.url);
const path = require("path");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// process 可直接使用，不用引入

// 1. argv 启动node时的命令行参数  node index.js -a -b
console.log(process.argv);
/**
 * 执行 node process.js -a -b
[
  '/Users/linsen/.nvm/versions/node/v16.19.1/bin/node',
  '/Users/linsen/code/vitepress-starter/docs/demo/node-demo/fs/process.js',
  '-a',
  '-b'
]
 */
// 2. execArgv 启动node后的命令行参数  node -xxx index.js -a -b
console.log(process.execArgv);
/**
 *  -i --harmony 为node自带的，不能随意输入
 * 执行 node -i --harmony process.js
[ '-i', '--harmony' ]
 */

// 3.env 环境，包含主机的一些信息，也可以给这个对象添加信息
process.env.NODE_ENV = "production"; // 比如给env对象添加环境变量
console.log(process.env.NODE_ENV); // production

// 4. cwd() 执行node命令的路径； __dirname当前文件的绝对路径
console.log(process.cwd()); // /Users/linsen/code/vitepress-starter/docs/demo
console.log(__dirname); // /Users/linsen/code/vitepress-starter/docs/demo/node-demo/fs

// 5. stdout 和 stdin
process.stdout.write("请输入名称："); // 请输入名称：_（输入王花花）

process.stdin.on("data", (res) => {
  console.log(res.toString()); // 王花花
  // 6. 退出进程
  process.exit(); // 不然进程一直在，一直是输入状态
});

// 7. 监听process
process.on("exit", () => {
  console.log("监听到退出进程");
});

/**
  linsen@LinsenMBP fs % node
  Welcome to Node.js v16.19.1.
  Type ".help" for more information.
  > process.memoryUsage
  [Function: memoryUsage] { rss: [Function: rss] }
  > process.memoryUsage()
  {
    rss: 40452096,
    heapTotal: 6897664,
    heapUsed: 5397360,
    external: 964144,
    arrayBuffers: 10484
  }
 */
