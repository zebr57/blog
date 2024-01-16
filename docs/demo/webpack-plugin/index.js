const fs = require("fs");

class myPlugin {
  constructor(config) {
    this.config = config;
  }
  apply(compiler) {
    // 监听webpack的某某个生命周期，emit打包完成，done打包结束， 周期有20+
    compiler.hooks.emit.tap("myPlugin", (compilation) => {
      // console.log(compilation.assets["main.a3e1e84b.js"].source());
    });
    // 打包完成，操作dist文件夹
    compiler.hooks.done.tap("myPlugin", () => {
      // 增删改其他的文件等...
      const res = fs.readFileSync("./dist/index.html");
      console.log(res.toString());
    });
  }
}

// js 中加入一些东西
// 打包好的js文件地址替换为 cdn 地址