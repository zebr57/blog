import React from "react";
import propTypes from "prop-types";

import modelStyle from "./Model.module.css";

class Model extends React.PureComponent {
  state = {};
  render() {
    return (
      <div className={modelStyle.cover}>
        <div className={modelStyle.content}>
          {/* <div className={modelStyle.title}>{this.props.title ? this.props.title : "标题"}</div> */}
          <div className={modelStyle.title}>{this.props.title}</div>
          <div>{this.props.children}</div>
          <div>
            <button
              onClick={() => {
                this.props.confirm();
              }}
            >
              确定
            </button>
            <button
              onClick={() => {
                this.props.cancel();
              }}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Model.propsTypes = {
  title: propTypes.string,
};
Model.defaultProps = {
  title: "新增",
};
export default Model;
