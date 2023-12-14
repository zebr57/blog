import React from "react";

export default function MemoHoc(UseCom) {
  return class extends React.Component {
    shouldComponentUpdate(props, state) {
      let isShouldUpdate = false;
      // 判断props
      for (const key in this.props) {
        if (this.props[key] !== props[key]) {
          return (isShouldUpdate = true);
        }
      }
      // 判断state
      for (const key in this.state) {
        if (this.state[key] !== state[key]) {
          return (isShouldUpdate = true);
        }
      }
      return isShouldUpdate;
    }
    render() {
      return (
        <>
          <UseCom {...this.props}></UseCom>
        </>
      );
    }
  };
}
