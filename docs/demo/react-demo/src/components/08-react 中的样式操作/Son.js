import React from "react";
// import "./Son.css";
// import classnames from "classnames/bind"

// 如果引入引入模块，要引入classnames中的bind文件夹
import sonStyle from "./Son.module.css";
// import classnames from "classnames/bind"

class Son extends React.Component {
  state = {
    hasSon1: true
  }
  render() {
    return (
      <div>
        <div className={sonStyle.son}> Son</div>
        {/* <div
          className={classnames({
            son: true,
            son1: this.state.hasSon1,
          })}
        >
          Son
        </div> */}
        <button
          onClick={() => {
            this.setState({
              hasSon1: true,
            });
          }}
        >
          覆盖
        </button>
        <button
          onClick={() => {
            this.setState({
              hasSon1: false,
            });
          }}
        >
          移除
        </button>
      </div>
    );
  }
}
export default Son;
