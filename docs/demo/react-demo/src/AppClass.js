import "./App.css";
import React from "react";
import Test07 from "./components/07-props和组件间传值和插槽";
import { SonA, SonB } from "./components/07-props和组件间传值和插槽";

class AppClass extends React.Component {
  state = {
    msg: "this value from parent",
    sonAMsg: ''
  };
  changeMsg(value) {
    // console.log(this) 没有使用bind(this)改变或箭头函数的话，指向子组件中的props
    this.setState({
      msg: value,
      
    });
  }
  getMsg = (value) => {
    this.setState({
      sonAMsg: value,
    });
  };
  render() {
    return (
      <div className="App">
        {/* 传值给子组件 */}
        <Test07
          msg={this.state.msg}
          slotA={<div>slotA</div>}
          scopeSlot={(scope) => {
            return <div>{scope}</div>;
          }}
          /* 获取子组件传过来的值 */
          changeMsg={this.changeMsg.bind(this)}
        >
          <div>default slot</div>
        </Test07>
        {/* 兄弟组件通过父组件传值 */}
        <SonA getMsg={this.getMsg}></SonA>
        <SonB sonAMsg={this.state.sonAMsg}></SonB>
      </div>
    );
  }
}

export default AppClass;
