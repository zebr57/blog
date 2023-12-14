// 本质是一个方法，接收一个组件，返回一个匿名组件
import React from "react";

function TestHoc(UserCom) {
  return class extends React.Component {
    state = {
      msg: "hello hoc",
    };
    render() {
      return (
        <>
          <UserCom msg={this.state.msg} {...this.props}></UserCom>
        </>
      );
    }
  };
}

export default TestHoc;
