/*
 * @Author: 沈林强
 * @Description: git自动化提交上传代码
 */
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

// child_process.exec()的操作可以借助第三方库 shelljs 来做

// 一些思路：1.把一些重复操作自动化 2.数据操作 3.命令行操作
