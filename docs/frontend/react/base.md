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

1. jsx 中单花括号{ }中接收一个方法 fn，不能直接调用 fn()
2. this 指向问题，默认 undefined，通过箭头函数、.bind(this)可解决，推荐使用 bind 方便传参数
3. 事件对象为最后一个参数，只不过这个事件对象是复合的，里面属性 nativeXXX 是原生
4. 复合的事件对象调用阻止默认行为：e.is+方法名，与原生:e.方法名有点不同
   :::

## 04-React 的响应式数据

### 流程

`state` 中定义变量 -> 通过调佣 `setState`给入一个对象 -> `setState`将给入的对象和`state`对象进行浅合并 -> 统一触发更新

关键点：

1. 只合并第一层，会将对应键值直接顶替
2. 调用`setState`触发更新，直接修改`state`不会触发

```js
class Test04 extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     a: 1,
  //   };
  // }
  // 忽略constructor，使用ES7写法
  state = {
    name: "王花花",
    age: 18,
    bodyInfo: {
      height: 172,
      weight: 60,
    },
    likes: ["游泳、", "跑步、", "篮球"],
  };

  add = () => {
    // 1.修改值,单独触发更新
    // this.state.a += 1;
    // this.setState({});
    //2. 修改值并触发跟新
    this.setState({
      age: this.state.age + 1,
      bodyInfo: {
        // 该对象将覆盖原来的值
        height: this.state.bodyInfo.height + 1,
        // weight: 60, // 注释该行，体重信息就不展示了
      },
    });
  };

  render() {
    return (
      <div className="container">
        <div>姓名： {this.state.name}</div>
        <div>年龄：{this.state.age}</div>
        <div>
          身体状况：身高：{this.state.bodyInfo.height} | 体重： {this.state.bodyInfo.weight}
        </div>
        <button onClick={this.add}>年龄\身高加1</button>
      </div>
    );
  }
}
```

### setState 异步 or 同步

setState 是异步的，想要同步得到修改后的结果，可以在第二个参数传入一个回调函数，在这个函数中获取

```js
// ...
this.setState(
  {
    age: this.state.age + 1,
    bodyInfo: {
      // 该对象将覆盖原来的值
      height: this.state.bodyInfo.height + 1,
      // weight: 60, // 注释该行，体重信息就不展示了
    },
  },
  () => {
    // [!code ++]
    console.log(this.state.age); // 19// [!code ++]
  } // [!code ++]
);
console.log(this.state.age); // 18// [!code ++]
// ...
```

### 关于多次调用 setState

1. setState 多个修改，会合并为一次，再统一更新

```js
this.setState({
  name: "李明花",
});
this.setState({
  age: 20,
});
// 相当于
this.setState({
  name: "李明花",
  age: 20,
});
```

2. `setState`返回会触发更新`render()`，不管你有没有修改，这造成了一个问题，重复修改为相同的值也会让组件更新

- 解决方案: 使用`React.PureComponent`

```js
class Test04 extends React.Component {  // [!code --]
class Test04 extends React.PureComponent {  // [!code ++]
  // ...
  changeAge = () => {
    this.setState({
        age: 20
    })
  }
  render() {
    console.log('render') // 只在第一次渲染和第一次更新触发
    return <div>
      <button onClick={this.changeAge.bind(this)}>年龄改为20</button>
    </div>
  }
}
```

- `PureComponent`判断数组和对象方式：内存地址引用是否发生改变

```js
// ...
  // 修改对象
  changeBodyInfo = () => {
    this.setState({
      bodyInfo: this.state.bodyInfo, // 不会触发更新 // [!code --]
      bodyInfo: {...this.state.bodyInfo}, // 触发一次 // [!code ++]

    });
  }
  // 修改数组
  changeLikes = () => {
    this.setState({
      likes: this.state.likes, // 不会触发更新 // [!code --]
      likes: [...this.state.likes], // [!code ++]
    });
  };
  render() {
    console.log('render')
    return <div>
       <div>
          身体状况：身高：{this.state.bodyInfo.height} | 体重： {this.state.bodyInfo.weight}
        </div>
        <div>爱好： {this.state.likes}</div>
      <button onClick={this.changeBodyInfo.bind(this)}>身体情况保持不变</button>
      <button onClick={this.changeLikes.bind(this)}>爱好保持不变</button>
    </div>
  }

// ...
```

3. 一定不要在 `render` 里直接 `setState`,否则死机。。

::: tip 总结

1. 在`state`中定义变量，通过`setState({})`触发页面更新
2. `setState`可以做两件事，修改`state`里的值，触发`render()`
3. 多次调用会先合并，再统一修改
4. `setState()`为异步，想要拿到更新后的值，可以在第二个参数回调函数中获取
5. 页面操作触发`setState`去改变的值结果都是不变的，也会造成重新 render 问题
6. 使用`React.PureComponent`，假如`setState`的值结果没有发生改变，则不会触发更新
7. `PureComponent`中判断值是否改变，是判断内存地址的引用，数组和对象必须赋予一个新的数组对象
8. **避免操作原数据**，先拷贝一份，在拷贝数据上进行操作，之后再赋予
   :::

## 05-条件渲染和列表循环

### 条件渲染

原则：

1. react 渲染 undefined、null、空字符串、false、不会渲染任何内容
2. 如果渲染一个 jsx 编写的 html 元素，就会渲染成页面上的内容

只需运用逻辑运算，true 返回一个 html 元素结构；false 返回个空字符串就不会显示任何内容

```js
// ...
class Test05 extends PureComponent {
  state = {
    isShow: true, // 定义一个控制显示隐藏变量
  };
  // 判断是/否显示div
  fn1 = () => {
    if (this.state.isShow) {
      return <div>div</div>;
    } else {
      return "";
    }
  };
  // 切换显示/隐藏
  handleIsShow = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };

  render() {
    return (
      <div className="container">
        <div>条件渲染</div>
        {this.fn1()}
        {/* {this.state.isShow ? <div>显示</div> : ""} */}
        <button onClick={this.handleIsShow}>{this.state.isShow ? "隐藏" : "显示"}</button>
      </div>
    );
  }
}
// ...
```

### 列表循环

原则

1. 渲染一个数组会把数组里面的每一项单独取出渲染
2. 那么我们编写一个里面存放的都是 html 结构的数组，就会渲染成页面上的列表

通过循环原始数据，把原始数据生成为一个存放列表每一项元素的新数组，jsx 编译存着 html 结构的数组，在页面上渲染为列表

```js
// ...
class Test05 extends PureComponent {
  state = {
    originArr: [1, 2, 3], // 转为[<div>1</div>, <div>2</div>, <div>3</div>]
  };
  // 处理新数组
  getArr = () => {
    // 工作中常用 map、filter来实现
    let newArr = [];
    this.state.originArr.forEach((item) => {
      newArr.push(<div key={item}>{item}</div>);
    });
    return newArr;
  };
  // 添加数组数据
  handleArrPush = () => {
    let newArr = [...this.state.originArr];
    const len = this.state.originArr.length + 1;
    newArr.push(len);
    this.setState({
      originArr: newArr,
    });
  };

  render() {
    return (
      <div className="container">
        <div>列表循环</div>
        {/* {this.getArr()} */}
        {this.state.originArr.map((item) => {
          return <div key={item}>{item}</div>;
        })}
        <button onClick={this.handleArrPush}>添加数组数据</button>
      </div>
    );
  }
}
// ...
```

::: tip 总结

1. 纯粹的 js 逻辑运算，灵活、自由度高，注意的点：避免操作原数据
2. 不像 vue 有 v-show、v-if、v-for 指令，使用起来方便、但也受限制

:::

## 06-表单绑定

### 基本思路

React 中很多思路都是按原生的操作去做的，表单绑定也是如此。

原生表单获取表单输入值，可以通过监听`input`、`change`等事件，然后获取`e.target.value`

如果要设置表单的值，通常设置`value`属性，如果是选择框则是`checked`属性

### 受控组件与非受控组件

1. 非受控组件： 数据单向绑定，使用者只能获取它的值，值只能表单自身去修改，也就就只做了监

```js
// ...
class Test06 extends React.PureComponent {
  state = {
    inputValue: "",
  };

  render() {
    return (
      <div className="container">
        {this.state.inputValue}
        <input
          onInput={(e) => {
            this.setState({
              inputValue: e.target.value,
            });
          }}
        ></input>
      </div>
    );
  }
}
//...
```

2. 受控组件：数据双向绑定，表单的值可以由使用者通过修改 state 数据，影响表单显示的值

```js
// ...
class Test06 extends React.PureComponent {
  state = {
    inputValue: "",
  };
  handleChangeInputValue = () => {
    this.setState({
      inputValue: "王花花",
    });
  };
  render() {
    return (
      <div className="container">
        {this.state.inputValue}
        <input
          // 通过设置value实现双向绑定
          value={this.state.inputValue}
          // 通过监听input事件获取并保存value值
          onInput={(e) => {
            this.setState({
              inputValue: e.target.value,
            });
          }}
        ></input>
        {/* 手动设置表单的值 */}
        <button onClick={this.handleChangeInputValue}>改变输入框的值</button>
      </div>
    );
  }
}
//...
```

#### 原生多选框实现双向绑定

```js
// ...
class Test06 extends React.PureComponent {
  state = {
    inputValue: "",
    checkList: [],
  };
  // 处理多选框
  handleChangeChecked = (e) => {
    let arr = [...this.state.checkList];
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr.splice(arr.indexOf(e.target.value), 1);
    }
    this.setState({
      checkList: arr,
    });
  };
  render() {
    return (
      <div className="container">
        <div>---------------------</div>
        {this.state.checkList}
        <div>---------------------</div>
        {/* 设置每个选中获取的值（value），通过checked控制是否选中 */}
        <input checked={this.state.checkList.includes("c1")} value="c1" type="checkbox" name="choose" onChange={this.handleChangeChecked} />
        选项一
        <input checked={this.state.checkList.includes("c2")} value="c2" type="checkbox" name="choose" onChange={this.handleChangeChecked} />
        选项二
        <input checked={this.state.checkList.includes("c3")} value="c3" type="checkbox" name="choose" onChange={this.handleChangeChecked} />
        选项三
      </div>
    );
  }
}
//...
```

::: tip 总结

1. 获取：基本跟原生一样，通过监听 input、change 事件来获取 e.target.value 值
2. 修改：通过设置 value 或 checked 来改变表单的值
3. 输入框、单选操作多数绑定一个字符串或者布尔值，多选操作绑定数组，这两点实现方式有些许不一样。
4. 单向绑定成为非受控组件
5. 双向绑定称为受控组件
   :::

## 07-Props 和组件间的传值、插槽

props 是 react 的核心

在 react 中，所有卸载组件上的属性和子节点都被规划为 props。

所以 props 是 react 很多功能的根本。父子传值，插槽全都是基于 props，不像 vue 有事件监听、emit，专门的插槽这一类东西。

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
