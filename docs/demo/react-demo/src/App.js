import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { FnHello, ClassHello } from "./components/02-react组件和jsx"
// import Test04 from "./components/04-react响应式数据";
// import Test05 from "./components/05-react条件渲染和列表循环";
// import Test06 from "./components/06-react表单绑定"

// react 和 jsx 是相互独立的，本质是通过babel编译成一个createElement对象
function App() {

  // 函数式本身就是个方法，返回dom对象
  // console.log(ClassHello);
  // console.log(<ClassHello></ClassHello>); // jsx中会识别并编译成Dom对象

  return (
    <div className="App">
      <FnHello></FnHello>
      <ClassHello></ClassHello>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
