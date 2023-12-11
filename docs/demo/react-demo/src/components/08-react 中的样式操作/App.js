import React from "react";
import Son from "./Son.js";
import "./App.css"; // 作用于全局，就算再外层使用了该文件内的类名样式，照样生效
class Test08 extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div className="father" style={{ color: "#fff", fontWeight: 700 }}>
          father
          <Son></Son>
        </div>
      </div>
    );
  }
}

export default Test08;
