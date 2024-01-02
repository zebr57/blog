# 常用模块

## path 路径处理工具

- basename：路径最后一部分
- dirname：目录名，即路径除去最后部分，前面部分路径
- parse：解析路径为对象
- format：对象解析为路径，与 parse 相对应
- resolve： 把一个路径解析为绝对路径（最常用）
- join：路径拼接

## 进程模块

- argv：启动 node 时的命令行参数
- execArgv：node 命令后的直接参数
- env：用户环境信息
- cwd()：获取当前进程工作目录
- exit()：退出进程
- stdout 和 stdin：屏幕输出和输入
- memoryUsage：内存使用情况
- 监听： process 是一个可监听对象

## util 模块

- callbackify：将异步函数转为回调形式
- promiseify：将异步函数转为 Promise 形式

### 引入模块

```js
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const util = require("util");
const fs = require("fs");
```

### callbackify

```js
// 1. 定义的异步函数
function fn1(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 2000);
  });
}
// 2. 包装返回
const callbackFn1 = util.callbackify(fn1);
/**
 * 3. 调用执行
 * node 所有的异步操作都是通过回调方式来获取结果的
 * 第一个参数都是错误，后面才是结果
 */
callbackFn1(function (err, num) {
  console.log(num);
});
```

### promiseify

```js
// 1.异步读取文件
fs.readFile("./test-data.json", (err, content) => {
  console.log(1, content);
});
// 2. 通过promisify包装返回，错误通过catch捕获
const promiseReadFile = util.promisify(fs.readFile);
// 3. 调用执行
promiseReadFile("./test-data.json")
  .then((res) => {
    console.log(2, res);
  })
  .catch((err) => {
    console.err(err);
  });
console.log(3);
```

::: tip
node 中所有的异步操作都是通过回调方式来获取结果的，也是 node 开发人员嫌弃的原因，后面搞了个 [deno](https://deno.com/)
:::

