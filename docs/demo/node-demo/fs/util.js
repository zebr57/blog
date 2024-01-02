import { createRequire } from "module";
const require = createRequire(import.meta.url);
const util = require("util");
const fs = require("fs");
function fn1(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 2000);
  });
}

const callbackFn1 = util.callbackify(fn1);

/**
 * node 所有的异步操作都是通过回调方式来获取结果的
 * 第一个参数都是错误，后面才是结果
 */
callbackFn1(function (err, num) {
  console.log(num);
});

fs.readFile("./test-data.json", (err, content) => {
  console.log(1, content);
});
const promiseReadFile = util.promisify(fs.readFile);
promiseReadFile("./test-data.json")
  .then((res) => {
    console.log(2, res);
  })
  .catch((err) => {
    console.err(err);
  });
console.log(3);
