import logo from "./logo.svg";
import "./App.css";
import React from "react";
import AppClass from "./AppClass";
// import { FnHello, ClassHello } from "./components/02-react组件和jsx"
// import Test04 from "./components/04-react响应式数据";
// import Test05 from "./components/05-react条件渲染和列表循环";
// import Test06 from "./components/06-react表单绑定"
import Test07 from "./components/07-props和组件间传值和插槽";
import Test08 from "./components/08-react 中的样式操作/App";
import Test09 from "./components/09-react生命周期";

// react 和 jsx 是相互独立的，本质是通过babel编译成一个createElement对象
function App() {
  // 函数组件中这里定定义的state只是普通对象
  const state = {
    msg: "this value from parent",
  };

  const changeMsg = (value) => {
    state.msg = value; // 函数组件没有setState，要借助hook触发更新
  };

  return (
    <div className="App">
      {!AppClass ? (
        <Test07
          /* 传值给子组件 */
          msg={state.msg}
          slotA={<div>slotA</div>}
          scopeSlot={(scope) => {
            return <div>{scope}</div>;
          }}
          /* 获取子组件传过来的值 */
          changeMsg={changeMsg}
        >
          <div>default slot</div>
        </Test07>
      ) : (
        /* 使用Class组件演示 */
        <AppClass></AppClass>
      )}
      <div className="father">App</div>
      <Test08></Test08>
      <Test09></Test09>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;

// 函数式本身就是个方法，返回dom对象
// console.log(FnHello())
// console.log(ClassHello);
// console.log(<ClassHello></ClassHello>); // jsx中会识别并编译成Dom对象
