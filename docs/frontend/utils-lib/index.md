# JS 工具函数

工作中常用的功能函数、处理数据函数

日常需要多行代码实现的功能，一行代码搞定

支持按需引入，减小代码体积

对基本运算方法增加了错误边界处理和错误提示

## 下载

https://github.com/zebr57/zebr-js-utils/blob/master/src/utils.js

<!-- <details>
```js
```
<summary>点击查看</summary>

</details> -->

<!-- ## 安装

::: code-group

```shell [npm]
npm install zebr/utils
```

```shell [yarn]
yarn add zebr/utils
```

```shell [pnpm]
pnpm install zebr/utils
```

::: -->

## 引入

```js
import utils from "./utils.js";

utils.add(1, 2, 3);
```

## 按需引入

```js
import { add } from "./utils.js";

add(1, 2, 3);
```

## 仓库地址

https://github.com/zebr57/zebr-js-utils/blob/master
