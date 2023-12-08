import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import Test04 from "./components/04-react响应式数据";
import Test05 from "./components/05-react条件渲染和列表循环";

// react 和 jsx 是相互独立的，本质是通过babel编译成一个createElement对象
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
  // 函数式本身就是个方法，返回dom对象
  // console.log(ClassHello);
  // console.log(<ClassHello></ClassHello>); // jsx中会识别并编译成Dom对象

  return (
    <div className="App">
      {/* <FnHello></FnHello>
      <ClassHello></ClassHello> */}
      <Test05></Test05>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
