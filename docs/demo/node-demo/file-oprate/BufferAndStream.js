import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");

// 存储10位长度，每位都是1
const bf1 = Buffer.alloc(10, "1");
console.log(bf1.toString());
// 以from里面的字符创建buffer
const bf2 = Buffer.from("hello buffer");
console.log(bf2.toString());
// buffer对象跟数组相似，有着相同的方法
console.log(Buffer.isBuffer(bf1)); // true
console.log(bf2.length); // 12
console.log(bf2.indexOf("hello")); // 0

/* ===================================== 读写流 ===================================== */
// - 通过流形式实现copy文件

const rStream = fs.createReadStream("./streamRead.txt", {
  highWaterMark: 50,
});
const wStream = fs.createWriteStream('./streamWrite.txt')
// rStream.on('data', (buf) => {
//   wStream.write(buf)
// })

// rStream.on('end', () => {
//   console.log('read end');
// })

// wStream.on('finish', () => {
//   console.log('write finish');
// })

// 单纯的将读流导入到写流
rStream.pipe(wStream)