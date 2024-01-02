/**
 * 路径相关
 * node在升级之后，对require 的使用方法发生了改变。 
 * 从node.js 14版及以上版本中，require作为CommonJS的一个命令已不再直接支持使用，
 * 所以我们需要导入createRequire命令才可以。
 * 热知识：
 * export / export default + import ==> ES6
 * module.exports / exports + require() ==> CommonJS
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);

let path = require("path");
let demo = "./src/a/b/c.js" // path模块就是解析路径字符串的

//路径最后一部分
console.log(path.basename(demo)); // c.js
//绝对路径
console.log(path.dirname(demo)); // ./src/a/b 
//解析路径为对象
console.log(path.parse(demo)); // { root: '', dir: './src/a/b', base: 'c.js', ext: '.js', name: 'c' }
// 解析路径对象为路径字符串
console.log(path.format(path.parse(demo))); // ./src/a/b/c.js
// 获取当前所在目录，xx的绝对路径
console.log(path.resolve('', 'a')) // ...docs/demo/node-demo/fs
console.log(path.resolve('../','index')) // ...docs/demo/node-demo/index
console.log(path.resolve('./newPath','./index')) // ...docs/demo/node-demo/newPath/index
// 拼接路劲
console.log(path.join('./a','./b')) // a/b 
