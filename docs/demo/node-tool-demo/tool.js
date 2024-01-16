/*
 * @Author: 沈林强
 * @Description: 在我们使用封装好的组件，在A页面使用了并传递数据、定义方法，
 * 之后我们在B页面也要使用，A页面已经够了大量代码，查找复制起来很麻烦，
 * 将使用方式定义在一个模版中，通过命令去读取我们想要的代码，输出后方便我们复制
 * @run: node tool.js
 */

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
    console.log(str);
  });
