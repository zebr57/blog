import React from "react";
import Son from "./Son";
/**
 * React.createRef()
 * 用于获取真实dom和子组件信息
 */
const refDiv1 = React.createRef();
const refSon = React.createRef();
/**
 * React.createContext()
 * 用于深层嵌套爷孙组件传值
 * 创建导出，给子组件引入使用
 */
export const context1 = React.createContext();

class App extends React.PureComponent {
  state = {
    info: {
      name: "王花花",
      age: 18,
    },
  };
  componentDidMount() {
    // console.log(this.refs.refSon); // 旧写法，严格模式下会提示报红
    // console.log(refDiv1.current, refSon.current);
  }
  render() {
    return (
      <>
        {/* <div className="app" ref={refDiv1}></div> */}
        <Son ref="refSon"></Son>
        <context1.Provider value={this.state.info}>
          <Son ref={refSon}></Son>
        </context1.Provider>
      </>
    );
  }
}

export default App;
