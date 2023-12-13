import React from "react";
import { context1 } from "./App"; // 引入
class GrandSon extends React.PureComponent {
  state = {};
  componentDidMount() {
    console.log(context1.Consumer);
  }
  render() {
    return (
      <div>
        孙组件
        {/* 使用 */}
        <context1.Consumer>
          {(value) => {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>{value.name}</div>
                <div>{value.age}岁</div>
              </div>
            );
          }}
        </context1.Consumer>
      </div>
    );
  }
}
export default GrandSon;
