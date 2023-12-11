import React from "react";

class Test09 extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  state = {
    msg: "hi",
  };
  // 从props得到state时
  static getDerivedStateFromProps(props, state) {
    console.log("derived");
    return null;
  }

  // 更新时 - 返回true调用setState就会触发render()
  shouldComponentUpdate(props, state) {
    console.log("update");
    let isChange = false;
    for (const key in state) {
      const nItem = state[key];
      const oItem = this.state[key];
      if (nItem != oItem) {
        isChange = true;
      }
    }
    return isChange;
  }
  // 渲染
  render() {
    console.log("render");
    return (
      <div>
        Test09. 生命周期
        <div>{this.state.msg}</div>
        <button
          onClick={() => {
            this.setState({
              msg: "hello",
            });
          }}
        >
          点击按钮修改
        </button>
      </div>
    );
  }
  // 挂载完成
  componentDidMount() {
    console.log("componentDidMount");
  }
}

export default Test09;
