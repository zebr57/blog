# webpack 插件开发指南

## webpack 插件

- 插件其实就是一个 class 类，其中有一个 apply 方法，携带参数 compiler
- 主要通过监听 emit、done 这两个钩子
- compiler.hooks.emit.tap 打包完成
- compiler.hooks.done.tap 打包结束

```js
class myPlugin {
  constructor(config) {
    this.config = config;
  }
  apply(compiler) {
    // 监听webpack的某某个生命周期，emit打包完成，done打包结束， 周期有20+
    compiler.hooks.emit.tap("myPlugin", (compilation) => {
      console.log(compilation.assets["main.a3e1e84b.js"].source());
    });
    // 打包结束，操作dist文件夹
    compiler.hooks.done.tap("myPlugin", () => {
      // 增删改其他的文件等...
    });
  }
}

module.exports = myPlugin;
```

## 日常操作简便化小工具

核心思路： 我们日常工作做的事情无非就这几方面，操作文件，编写文件、网络上传下载，命令行输入

这些操作 node 都能做，所以我们思考下平时有哪些机械的重复操作、数据操作、命令行的操作可以用 node 小工具来做

_shelljs，命令行操作工具库_

## 工具 1，根据选项输出模版代码供复制

在我们使用封装好的组件，在 A 页面使用了并传递数据、定义方法，之后我们在 B 页面也要使用

如果 A 页面已经有了大量代码，查找复制起来很麻烦，将使用方式定义在一个模版中，通过命令去读取我们想要的代码，输出后方便我们复制

1. 准备模版文件
2. 使用 inquirer 提问
3. 根据结果读取文件并输出打印

::: code-group

```js [tool.js]
import inquirer from "inquirer";
import fs from "fs";
inquirer
  .prompt([
    {
      type: "list",
      message: "你想要那部分内容",
      name: "content",
      choices: ["treeTable", "page", "date", "search"],
    },
  ])
  .then((answer) => {
    let str = fs.readFileSync("./codeTemplate/" + answer.content).toString();
    // 命令行窗口输出
    console.log(str);
  });
```

``` [codeTemplate/treeTable]
<template>
  <table data="tableList" @changePage="handleChangePage"><table>
</template>

{
  tableList: []
}

handleChangePage(e) {

}
```

:::

效果

```shell
linsen@LinsenMBP node-tool-demo % node tool.js
? 你想要那部分内容 treeTable
<template>
  <table data="tableList" @changePage="handleChangePage"><table>
</template>

{
  tableList: []
}

handleChangePage(e) {

}
```

## 工具 2，根据路径查找组件

路由列表是后端返回时，当路由地址与组件地址不对应时，查找起来很麻烦，写一个命令，携带 参数 url，通过 url 找出组件，通过自动拷贝组件路劲，然后在 vscode 全局搜索

1. 获取路由配置列表
2. 获取命令携带的参数 url
3. 遍历查找出匹配的组件
4. 输出并拷贝

```js
import cp from "copy-paste";

let routeArr = [];

let url = process.argv[2];
url = url.split("/#")[1];

routeArr.forEach((item) => {
  if (item.path == url) {
    console.log(item.component);
    // 自动拷贝
    cp.copy(item.component);
  }
});
```

## 工具 3， git 自动化提交

通过新开 node 的子进程去执行命令，一条命令完成 git 提交上传代码操作

```js
import child_process from "child_process";

child_process.exec("git add.", (err, stdout) => {
  if (err) throw err;
  let _type = "feature";
  let _version = "v1.91";
  let _message = process.argv[4];
  if (process.argv[2] == 2) {
    _type = "bugfix";
  }
  if (process.argv[3] == 2) {
    _version = "v1.9.2";
  }
  child_process.exec("git commit -m '" + _type + ": " + _message + "'", (err) => {
    if (err) throw err;
  });
});
```
