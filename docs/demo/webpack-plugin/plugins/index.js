const fs = require("fs");

class MyPlugin {
  constructor(config) {
    this.config = config;
  }
  apply(compiler) {
    console.log("apply只有在打包启动时执行一次");
    // 监听webpack的某某个生命周期，emit打包完成，done打包结束， 周期有20+
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      console.log("compiler.hooks.emit");
      // console.log(compilation.assets['app.bundle.js'].source());
    });
    // 打包完成，操作dist文件夹
    compiler.hooks.done.tap("MyPlugin", () => {
      console.log("compiler.hooks.done");
      // 增删改其他的文件等...
      // const res = fs.readFileSync("./dist/index.html");
      // console.log(res.toString());
    });
  }
}

module.exports = MyPlugin;
