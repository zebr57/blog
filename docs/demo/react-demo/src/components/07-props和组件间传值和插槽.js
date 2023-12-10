import React from "react";
import propTypes from "prop-types";

class Test07 extends React.PureComponent {
  state = {
    sonMsg: "this value from son",
    scopeSlotValue: "scope slot",
  };

  render() {
    // 通过 this.props获取字段值
    return (
      <div className="container">
        <div>I am son components.</div>
        props:
        <div> {this.props.msg}</div>
        slot:
        {/* 默认插槽 */}
        <div>{this.props.children}</div>
        {/* 具名插槽 */}
        <div>{this.props.slotA}</div>
        {/* 作用域插槽 */}
        <div>{this.props.scopeSlot(this.state.scopeSlotValue)}</div>
        {/* 调用父组件方法，给父组件传值 */}
        <button
          onClick={() => {
            this.props.changeMsg("hello");
          }}
        >
          给父组件传值
        </button>
      </div>
    );
  }
}
// 类型校验
Test07.propTypes = {
  // msg: function (props) {
  //   if (typeof props.msg !== "string") {
  //     throw new Error("msg must be a string");
  //   }
  // },
  msg: propTypes.string,
};
// 默认值
Test07.defaultProps = {
  msg: "I am default msg",
};

export class SonA extends React.PureComponent {
  state = {
    msg: "I am sonA",
  };
  render() {
    return (
      <div className="container">
        SonA
        {/* 点击调用父组件方法传递msg，父组件保存msg并通过props传给SonB */}
        <button
          onClick={() => {
            this.props.getMsg(this.state.msg);
          }}
        >点击给SonB传值</button>
      </div>
    );
  }
}
export class SonB extends React.PureComponent {
  render() {
    return <div className="container">SonB：获取SonA的msg为“{this.props.sonAMsg}”</div>;
  }
}

export default Test07;
