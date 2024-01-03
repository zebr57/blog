// 使用npm init了 默认 commonjs规范，就不需要引入
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");
const path = require("path");

// // 创建空文件夹
// fs.mkdirSync('./emptyDir')
// // 删除空文件夹
// fs.rmdirSync('./emptyDir')
// // 监测是否存在
// fs.existsSync('./emptyDir')
// // 获取文件夹信息，并且调用isDirectory()判断是否为目录
// fs.statSync('./emptyDir').isDirectory()

/**
 * @description: 递归清空文件夹里所有文件
 * @param { string } dirPath 文件夹路径
 * @return {*}
 */
function emptyDir(dirPath) {
  // 是否存在目录
  if (fs.existsSync(dirPath)) {
    // 读取所有文件，不包含目录
    const dir = fs.readdirSync(dirPath);
    dir.forEach((dirItem) => {
      let fullPath = path.join(dirPath, dirItem);
      const state = fs.statSync(fullPath);
      // 判断是否为文件夹
      if (state.isDirectory()) {
        emptyDir(fullPath);
      } else {
        fs.unlinkSync(fullPath);
      }
    });
    // 并且删除目录
    // fs.rmdirSync(dirPath)
  }
}

// emptyDir("./testDir");

/**
 * @description: 拷贝文件夹
 * @param { string } target 拷贝的文件夹放置的位置
 * @param { string } source 被拷贝的源文件夹的位置
 * @return {*}
 */
function copyDir(target, source) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  if (fs.existsSync(source)) {
    // 读取所有文件，不包含目录
    const dir = fs.readdirSync(source);
    dir.forEach((dirItem) => {
      let targetFullPath = path.join(target, dirItem);
      let fullPath = path.join(source, dirItem);
      const state = fs.statSync(fullPath);
      // 判断是否为文件夹
      if (state.isDirectory()) {
        copyDir(targetFullPath, fullPath);
      } else {
        fs.copyFileSync(fullPath, targetFullPath);
      }
    });
  }
}
// copyDir("./testDirCopy", "./testDir");
// copyDir("./testDir", "./testDirCopy");

/* ===================================== 一些高级操作 ===================================== */
// 1. 监听
// fs.watch("./text.txt", (err, filename) => {
//   console.log(filename);
// });
// 2.
fs.open("./text.txt", "r", (err, fd) => {
  let bf = new Buffer(10);
  // 参数1，读取的文件
  // 参数2，要读取的多少位就给Buffer(多少)
  // 参数3，Buffer 缓冲区的第几位加入(占用位置)
  // 参数4， 读多少位  3和4加起来不能超过2
  // 参数5， 从文件内容的哪一位开始读
  fs.read(fd, bf, 0, 3, 3, (err, context) => {
    console.log("读取成功"); // 参数4
    console.log(bf.toString()); // low
    // 接下来再去写的话就是 writeFile实现
    fs.open("./test2.txt", "w", (err, fd2) => {
      fs.write(fd2, bf, 0, 3, 0, (err, context) => {
        console.log("写入成功");
      });
    });
  });
});


/* ===================================== 第三方库 ===================================== */

const fsExtra = require("fs-extra");
const cm = require("compressing");

fsExtra.copySync("./testDir", "./testDirCopy2");
// fsExtra.emptyDirSync("./testDirCopy2");

cm.zip.compressDir("./testDir", "./testDir.zip").then((res) => {
  console.log(res);
});
// cm.zip.uncompress("./testDir.zip", "./testDir2").then((res) => {
//   console.log(res);
// });