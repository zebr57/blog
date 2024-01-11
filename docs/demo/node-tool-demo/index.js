#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import downGit from "download-git-repo";
import chalk from "chalk";
import ora from "ora";
import { Command } from "commander";

const program = new Command();
// 参数一：指令 -a 参数 ,<必填> [选填]
// 参数二：描述
// 参数三：回调
program.option("-a [num]", "this is a ", (num) => {
  console.log("you use -a input" + num);
});
program.version("1.0.0");
program.command("init <name>").action((name) => {
  console.log(name);
});
// 写在最后，给commander去解析
program.parse(process.argv);

/** progress 进度提示
  import progress from "progress";
  const pro = new progress("下载中", { total: 10 });
  setTimeout(() => {
    pro.tick();
  }, 1000);
*/

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
    const spiner = ora("下载中").start();
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
      spiner.stop();
      console.log(chalk.green("下载成功"));
    });
  });
