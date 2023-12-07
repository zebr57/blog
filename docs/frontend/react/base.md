# React 学习笔记

## 01-创建项目和目录结构

#### 创建项目

- 使用官方脚手架，只做了 react 的基础的搭建和构建，没有路由和全局状态管理，使用 webpack 构建。

```shell
npx create-react-app <projectName>
```

- 使用一些第三方集成脚手架，例如典型的 umi ，这一类脚手架创建的项目集成了很多功能，路由、mock 等。

#### 目录结构

```js
react-demo
├── public
│   ├── favicon.ico
│   ├── index.html  // 挂载app组件
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css // APP 样式
│   ├── App.js  // App 组件
│   ├── App.test.js // 单元测试（普通项目无需）
│   ├── index.css //全局样式
│   ├── index.js  // 入口文件（把项目挂载至指定的dom）
│   ├── logo.svg
│   ├── reportWebVitals.js // 性能报告文件（普通项目无需）
│   └── setupTests.js // 单元测试启动文件（普通项目无需）
├── README.md
├── package-lock.json
└── package.json
```

#### 入口文件 - index.js

```js index.js
...
/*
  相当于vue中的 main.js - 把项目挂载至指定的dom
  vue是创建根实例-通过实例自身app.mount('#app') 挂载至指定的dom
  react没有跟实例，根也只是一个组件、后续所有组件都是app的子组件
  react-dom 是把一个react组件从一个真正的dom卸载，或者渲染真正的dom
 */
// - 渲染
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// - 卸载
setTimeout(() => {
  root.unmount()
}, 2000)
...
```

#### 对比总结

1. vue 是创建根实例，通过调用实例自身`app.mount('#app')`方法，挂载至指定的 dom
2. react 没有创建根实例，通过引入 react-dom 来渲染和挂载指定的 dom。

## 02-React 组件和 Jsx

### 组件化开发，定义一个基本组件得有的东西

- 组件 html 模版
- 数据和方法

### react 组件的两种写法

- 函数组件

  ```js
  function Hello() {
    return <div>hello</div>;
  }
  ```

- class 组件

  ```js
  class Hello extends React.component {
    render() {
      return <div>hello</div>;
    }
  }
  ```

  #### demo - app.js

```js
import "./App.css";
import React from "react"; // 引入

function App() {
  // 与新版本vue3组合式api相似
  // 函数组件，编写组件的方法首字母必须大写
  function FnHello() {
    return <div>hello</div>;
  }
  // 与老版本vue2选项式api相似
  // 类组件，继承React.Component，需要引入 react
  class ClassHello extends React.Component {
    render() {
      return <div>hello</div>;
    }
  }
  // 函数式本身就是个方法，返回createElement对象
  const obj = FnHello();
  console.log(obj);
  console.log(<FnHello></FnHello>); // jsx中会识别并编译成Dom对象

  return (
    <div className="App">
      <FnHello></FnHello>
      <ClassHello></ClassHello>
    </div>
  );
}
```

### react 与 jsx 的关系

- react 与 jsx 是相互独立的，vue 中也能是用 jsx
- 使用 jsx 能够在 js 中更方便地编写 html 模版，通过`babel`编译转化为 react-createElement 对象
- 如果不借助 jsx，也可直接是用`react.createElement()`方法创建
- react 解析对象，创建成页面组件

### jsx 里面渲染不同的内容区别

- 字符串，数字：直接渲染
- 对象：只能渲染 element 对象
  - { {a: 1} }， 会报错提示：`Objects are not valid as a React child`
- 数组：把数组里面每一项单独渲染
  - [FnHello(), 1, 2]，会报红提示：`Each child in a list should have a unique "key" prop`
- 表达式：运行表达式
- 方法： 无法渲染
- 布尔值：不渲染任何内容
- undefined、null：不渲染任何内容

::: tip 总结

1. react 的两种组件，函数式组件、class 类组件，分别与 vue3 的组合式 api 和 vue2 的选项式 api 相似
2. 注意的点：编写函数组件必须首字母大写
3. vue 有 vue 文件的编译模版，react 是同过借助 jsx 语法来编写 html 模版
4. jsx 不像 vue 模版，vue 模版会把本身编译为字符串显示出来，像变量方法布尔、undefined、null 会显示出对应的字符串

:::

### 待补充：函数组件与 class 组件的差异、vue2\vue3

- vue3 可以按需引入，减小的打包体积

## 03-React 的事件绑定

### 规则模式

1. 与原生相似，on+事件名（只不过首字母要大写）
2. on+事件后面接收的必须是一个方法

### 特别注意的点

1. 不做任何处理的情况下，this 会指向 undefined
2. 给到事件绑定的一定是一个方法 fn，不能直接调用 fn()，调用方法只会在初次渲染页面时执行一次。

```js
function handleClick() {}

render() {
  return <div className="App">
    <div onClick={this.handleClick}>点击按钮</div> // undefined
  </div>
}
```

### 解决方案

1. 给方法调用 bind 规定 this

```js
function handleClick() {}

render() {
  return <div className="App">
    <div onClick={this.handleClick}>点击按钮</div> // undefined // [!code --]
    <div onClick={this.handleClick.bind(this)}>点击按钮</div> // [!code ++]
  </div>
}
```

2. 写成一个匿名箭头函数

```js
function handleClick() {} // [!code --]

render() {
  return <div className="App">
     <div onClick={() => {
            console.log(this); // Test1
          }}
        >点击</div>
  </div>
}
```

3. 方法本身写成箭头函数

```js
function handleClick() {}[!code --]
handleClick = () => {}

render() {
  return <div className="App">
    <div onClick={this.handleClick.bind(this)}>点击按钮</div> // [!code --]
    <div onClick={this.handleClick(this)}>点击按钮</div> // [!code ++]
  </div>
}
```

### 事件绑定其他操作

1. 传递参数
2. 获取事件对象
3. 阻止默认行为，冒泡等

```js
// 通过.bind()传递参数
handleClick = (a, b, event) => { // [!code ++]
  // event并不是原生的，是合成的，使用上跟原生相似 is+原生方法名
  // event.stopPropagation() 原生
  console.log(event.isDefaultPrevented()) // 阻止默认行为，冒泡等
  console.log(a + b, event);
};

render() {
  return <div className="App">
    <div onClick={this.handleClick.bind(this)}>点击按钮</div> // [!code --]
    <div onClick={this.handleClick.bind(this, 1, 2)}>点击按钮</div>// [!code ++]
  </div>
}
```
::: tip 总结
1. jsx中单花括号{  }中接收一个方法fn，不能直接调用fn()
2. this指向问题，默认undefined，通过箭头函数、.bind(this)可解决，推荐使用bind方便传参数
3. 事件对象为最后一个参数，只不过这个事件对象是复合的，里面属性nativeXXX是原生
4. 复合的事件对象调用阻止默认行为：e.is+方法名，与原生:e.方法名有点不同
:::

## 04-React 的响应式数据

## 05-条件渲染和列表循环

## 06-表单绑定

## 07-Props 和组件间的传值、插槽

## 08-React 中的样式操作

## 09-生命周期

## 10-实战编写增删改查列表

## 11-ref 和 context

## 12-函数组件和 Hook

## 13-高阶组件

## 14-React 性能和优化

## 15-react-router 的使用

## 16-react 中的全局状态管理

## 17-react 中的路由权限控制

## 18-组件库等相关生态
