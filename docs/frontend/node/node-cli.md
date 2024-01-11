# node 搭建脚手架

## 软件工程

立项（模板）-> 开发调试 -> 测试 -> 构建 -> 部署

## node 的应用

- 使用 node 搭建脚手架快速创建模版
- 编写自动化测试
- 写 webpack 插件构建代码
- cicd 自动化部署

## 开始搭建我们的脚手架

1. 创建 package.json 和 index.js 文件
2. 添加 package.json 文件中 bin 字段，添加脚手架指令 node-cli
3. index.js 中说明运行环境
4. 进行全局安装
5. 窗口交互 -- inquirer 第三方库

- 提供选项用户选择
- 根据选择结果，创建目录并 copy git 上下载的模版代码

6. 携带配置参数、执行指令 -- commander 第三方库

## 1. 新建 package.json，在 bin 字段配置全局命令

全局命令相当于双击执行指定的文件

```shell
npm init
```

```json
{
  "name": "tool-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "node-cli": "index.js" // [!code ++]  // 全局命令
  },
  "author": "",
  "license": "ISC"
}
```

## 2. 让系统知道你要执行文件的环境

在被运行的文件(index.js)添加说明，在 node 环境执行

```js
#!/usr/bin/env node  // [!code ++]

console.log("node-cli");
```

## 3. 进行全局安装

如果已发布使用命令 npm install xxx -g

目前开发阶段的，在目录下使用命令：npm link

```shell
cd node-tool-demo/
npm link
```

npm link 耗时会有点长，成功之后就能全局执行 node-cli 命令了

```shell
linsen@LinsenMBP node-tool-demo % npm link
reify:tool-demo: sill audit bulk request { 'tool-demo': [ '1.0.0' ] }
added 1 package in 3m

linsen@LinsenMBP node-tool-demo % node-cli
node-cli
linsen@LinsenMBP node-tool-demo %
```

## 介绍两个包 commander、inquirer

- commander

像我们执行 webpack -v ，webpack -help， -v、-help 就是附带的指令，根据附带指令在命令行输出一些信息，commander 就是做的事情

- inquirer

像我们执行 vue-cli 创建项目时，会提供一些选项供我们选，像这种窗口交互行为就是 inquirer 做的事情

## 4.使用 commander、inquirer

安装

```shell
npm install commander inquirer --save
```

引入使用

```js
#!/usr/bin/env node
import inquirer from "inquirer";

// type: input、list、checkbox、confirm、rawlist、editor
inquirer
  .prompt([
    {
      type: "input",
      message: "项目叫什么名字",
      name: "projectName", // 键名
    },
    {
      type: "list",
      message: "选择vue/react",
      name: "projectType", // 键名
      choices: ["vue", "react"], // 选项
    },
    {
      type: "list",
      message: "选择附带功能",
      name: "projectFeature",
      choices: ["babel", "webpack", "router"],
    },
    {
      type: "confirm",
      message: "是否生成",
      name: "render",
    },
  ])
  .then((res) => {
    console.log(res);
  });
```

::: tip node 版本的规范问题
node 14 之前只支持 Commonjs，之后才支持使用 EsModule；

从 node.js 14 版及以上版本中，require 作为 CommonJS 的一个命令已不再直接支持使用

```js
import { createRequire } from "module";
const require = createRequire(import.meta.url);
```

热知识：

- export / export default + import ==> ES6
- module.exports / exports + require() ==> CommonJS
  :::

问题：package.json 默认是 Commonjs 规范

```shell
Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
```

修改 package.json 规范类型为 EsModule

```json
{
  ...
  "type": "module"
  ...
}
```

运行结果

```shell
linsen@LinsenMBP node-tool-demo % node-cli
? 项目叫什么名字 node
? 选择vue/react vue
? 选择附带功能 babel
? 是否生成 Yes
{
  projectName: 'node',
  projectType: 'vue',
  projectFeature: 'babel',
  render: true
}
linsen@LinsenMBP node-tool-demo %
```

根据结果进行操作

- 从 git 拉取代码
- copy 到本地指定位置

安装从 git 下来代码的库

```shell
npm install --save download-git-repo
```

引入使用

```js
// 根据项目名创建目录，根据选项从git上下载代码
 .then((res) => {
    let _target = "facebook/react";
    let _outputDir = path.resolve(process.cwd(), res.projectName);
    if (res.projectType == "vue") {
      _target = "vuejs/vue";
    }
    // 创建目录
    fs.mkdirSync(_outputDir);
    // http形式下载模版， { clone :true }通过git clone下载，需要安装git
    downGit("github:" + _target, _outputDir, {}, function (err) {
      if (err) throw err;
      console.log("下载成功");
    });
  });
```

简易的脚手架就出来了

如果想修改命令行窗口字体颜色，使用 chalk 包

安装 `npm install --save chalk`
使用

```js
import chalk from "chalk";

console.log("下载成功"); // [!code --]
console.log(chalk.green("下载成功")); // [!code ++]

// chalk.rgb()('word')
// chalk.hex('##')('word')
```

添加等待 loading 效果，使用 ora

安装 `npm install --save ora progress`

使用 ora

```js
import ora from "ora";

const spiner = ora("下载中").start();
spiner.stop();
```

使用 progress

```js
import progress from "progress";

const pro = new progress("下载中", { total: 10 });
setTimeout(() => {
  pro.tick();
}, 1000);
```

## 5.携带指令 -xxx

原理是使用 process.argv 保存的信息，比如 node-cli -v abc，argv == ['c:xxxx', 'c:xxx', '-v', 'abc']

```js
if (process.argv[2] == "-v") {
  console.log("v1.0.0");
}
```

## 6.使用 commander 第三方库简便操作

像我们自己手动写逻辑判断的话，会比较麻烦，使用 commander
可以方便我们编写。而且 commander 已经内部配置了常见的-V、-h 指令，指令分带 - 和参数的，也有不带 - 的，例如 vue cli 的 vue -help 和 vue create xxx。下面就使用 commander 来实现：

- option() 定义带 - 的指令
- version() 定义版本
- command() 定义不带 - 指令

### 安装

```shell
npm install --save commander
```

### 使用

```js
import { Command } from "commander";
const program = new Command();
// 参数一：指令 -a 参数 ,<必填> [选填]
// 参数二：描述
// 参数三：回调
program.option("-a [num]", "this is a ", (num) => {
  console.log("you use -a input" + num);
});
program.version("1.0.0"); // 定义版本
// 定义不带 - 的指令
program.command("init <name>").action((name) => {
  console.log(name);
  // 窗口交互，提问等...
});
// 写在最后，给commander去解析
program.parse(process.argv);
```

```shell

linsen@LinsenMBP node-tool-demo % node-cli -a 123
you use -a input123
linsen@LinsenMBP node-tool-demo % node-cli init demo
demo
linsen@LinsenMBP node-tool-demo % node-cli -V
1.0.0
linsen@LinsenMBP node-tool-demo % node-cli -h
Usage: node-cli [options] [command]

Options:
  -a [num]        this is a
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init <name>
  help [command]  display help for command
```
