import React from "react";
import Son from "./Son";
import { SonA, SonB } from "./Son";

class Test07 extends React.Component {
  state = {
    msg: "this value from parent",
    sonAMsg: "",
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
        <Son
          msg={this.state.msg}
          slotA={<div>slotA</div>}
          scopeSlot={(scope) => {
            return <div>{scope}</div>;
          }}
          /* 获取子组件传过来的值 */
          changeMsg={this.changeMsg.bind(this)}
        >
          <div>default slot</div>
        </Son>
        {/* 兄弟组件通过父组件传值 */}
        <SonA getMsg={this.getMsg}></SonA>
        <SonB sonAMsg={this.state.sonAMsg}></SonB>
      </div>
    );
  }
}

export default Test07;
