# node 中 Buffer 和 Stream

## Buffer

Buffer 可以理解为一个固定长度的字符串数组，存在于 V8 内存之外，存储文件的二进制内容

它相当于一个缓冲区，资源暂时存储的地方，等待处理好，在送往目的地（内存）

```js
// 存储10位长度，每位都是1
const bf1 = Buffer.alloc(10, "1");
console.log(bf1.toString());
// 以from里面的字符创建buffer
const bf2 = Buffer.from("hello buffer");
console.log(bf2.toString());
// buffer对象跟数组相似，有着相同的方法
console.log(Buffer.isBuffer(bf1)); // true
console.log(bf2.length); // 12
console.log(bf2.indexOf("hello")); // 0
```

## Stream

流可以理解为一个管道，输送 buffer 到目的地

有读取流、读取流、读写流、转化流

什么时候使用流？
当文件很大时，可以用流一点一点的读。

### 通过读取流的方式实现 copy 文件

```js
const rStream = fs.createReadStream("./streamRead.txt", {
  highWaterMark: 50,
});
const wStream = fs.createWriteStream("./streamWrite.txt");
// 读取并写入
rStream.on("data", (buf) => {
  wStream.write(buf);
});
// 监听读取结束
rStream.on("end", () => {
  console.log("read end");
});
// 监听写入完成
wStream.on("finish", () => {
  console.log("write finish");
});
```

### 简便方式

```js
// 单纯的将读流导入到写流
rStream.pipe(wStream);
```
