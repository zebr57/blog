import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");

// 1.写入
fs.writeFileSync("./text.txt", "hello");
// 2.读取
fs.readFile("./text.txt", (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log(res.toString());
  }
});
// 3.删除
fs.writeFileSync("./text2.txt","");
fs.unlinkSync("./text2.txt")
// 4.增加内容
fs.appendFileSync("./text.txt", "world")
// 5.移动
// fs.renameSync('./text.txt', "./testDir/text.txt")
// 6.拷贝
// fs.mkdirSync("./testDir")
fs.copyFileSync('./text.txt', './testDir/textCopy.txt')