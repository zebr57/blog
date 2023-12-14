import React from "react";

function TestHoc(UserCom) {
  return class extends React.Component {
    state = {
      x: 0,
      y: 0,
    };
    componentDidMount() {
      // 监听获取x,y
      window.addEventListener("mousemove", (e) => {
        const _x = e.clientX;
        const _y = e.clientY;
        this.setState({
          x: _x,
          y: _y,
        });
      });
    }
    render() {
      return (
        <>
          {/* props传入x,y */}
          <UserCom x={this.state.x} y={this.state.y} {...this.props}></UserCom>
        </>
      );
    }
  };
}

export default TestHoc;
