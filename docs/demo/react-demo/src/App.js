import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
// import { FnHello, ClassHello } from "./components/02-react组件和jsx"
// import Test04 from "./components/04-react响应式数据";
// import Test05 from "./components/05-react条件渲染和列表循环";
// import Test06 from "./components/06-react表单绑定"
// import Test07 from "./components/07-props和组件间传值和插槽/App";
// import Test08 from "./components/08-react 中的样式操作/App";
// import Test09 from "./components/09-react生命周期";
// import Test10 from "./components/10-实战增删改查列表/App";
// import Test11 from "./components/11-ref 和 context/App";
// import Test12 from "./components/12-函数式组件与Hook/App";
import Test13 from "./components/13-高阶组件/App";

// react 和 jsx 是相互独立的，本质是通过babel编译成一个createElement对象
function App() {
  return (
    <div className="App">
      <Test13></Test13>
    </div>
  );
}

export default App;

// 函数式本身就是个方法，返回dom对象
// console.log(FnHello())
// console.log(ClassHello);
// console.log(<ClassHello></ClassHello>); // jsx中会识别并编译成Dom对象
