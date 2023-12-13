import React from "react";
import GrandSon from "./GrandSon";
class Son extends React.PureComponent {
  state = {};
  render() {
    return (
      <div>
        子组件
        <GrandSon></GrandSon>
      </div>
    );
  }
}
export default Son;
