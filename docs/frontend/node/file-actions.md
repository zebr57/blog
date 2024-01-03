# 文件操作

## 基本操作

### 写入

```js
fs.writeFileSync("./text.txt", "hello", "utf-8");
```

### 读取

```js
fs.readFile("./text", "utf-8", (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log(res.toString());
  }
});
```

### 删除

```js
fs.writeFileSync("./text2.txt", "");
fs.unlinkSync("./text2.txt");
```

### 增加内容

```js
fs.appendFileSync("./text.txt", "world");
```

### 移动

```js
// 只能移到到已存在的目录
fs.renameSync("./text.txt", "./testDir/textCopy.txt");
```

### 拷贝

```js
fs.copyFileSync("./text.txt", "./testDir/textCopy.txt");
```

::: tip

- 写入方法第二个参数 data 必须传，即使为空，第三参数为编码格式，例如 'utf-8'
- 读取方法传入第二个参数，也可以指定编码格式读取
- 移动和拷贝都只能操作至已存在的目录下，并不能生成文件，多次 copy 会替换掉内容
- 如何生成文件夹？
  - fs.mkdirSync('path')，path 已存在会报错

:::

## 文件夹操作

### 监测是否存在目录 exists

```js
fs.existsSync("./emptyDir");
```

### 获取文件信息 stat

```js
// 获取文件夹信息，并且调用isDirectory()判断是否为目录
fs.statSync("./emptyDir").isDirectory();
```

###

### 创建文件夹 mkdir

```js
fs.mkdirSync("./emptyDir");
```

### 读取文件夹 readdir

```js
fs.readdirSync("./emptyDir");
```

### 删除（必须是空文件夹）rmdir

```js
// fs.rmdirSync('./emptyDir')

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
```

### 拷贝和移动-没有直接 api，必须遍历

```js
/**
 * @description: 递归拷贝文件夹
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
copyDir("./testDirCopy", "./testDir");
```

## 一些好用的第三方库

1. fs-extra

提供更方便的文件操作，例如清空、拷贝文件/文件夹

- 安装

```shell
npm install fs-extra
```

- 使用

```js
const fsExtra = require("fs-extra");

fsExtra.copy("./testDir", "./testDirCopy2");
```

2. compressing

提供压缩、解压文件操作

- 安装

```shell
npm install compressing
```

- 使用

```js
// 压缩
cm.zip.compressDir("./testDir", "./testDir.zip").then((res) => {
  console.log(res); // undefine
});
// 解压到指定位置
cm.zip.uncompress("./testDir.zip", "./testDir2").then((res) => {
  console.log(res); // undefine
});
```

## 一些高级的文件操作

1. 监听 - watch

```js
fs.watch("./text.txt", (err, filename) => {
  console.log(filename); // 控制输出被修改的文件名
});
```

2. 打开自由操作 - open
3. 自由读取和写入 - read、write

```js
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
```

4. 流形式操作 - writeStream 和 readStream

下一节
