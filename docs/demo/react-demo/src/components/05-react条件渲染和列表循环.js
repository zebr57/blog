import React, { PureComponent } from "react";

class Test05 extends PureComponent {
  state = {
    isShow: true, // 定义一个控制显示隐藏变量
    originArr: [1, 2, 3], // 转为[<div>1</div>, <div>2</div>, <div>3</div>]
  };

  // 判断是/否显示div
  fn1 = () => {
    if (this.state.isShow) {
      return <div>div</div>;
    } else {
      return "";
    }
  };
  // 切换显示/隐藏
  handleIsShow = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };

  // 处理新数组
  getArr = () => {
    // 工作中常用 map、filter来实现
    let newArr = [];
    this.state.originArr.forEach((item) => {
      newArr.push(<div key={item}>{item}</div>);
    });
    return newArr;
  };
  // 添加数组数据
  handleArrPush = () => {
    let newArr = [...this.state.originArr];
    const len = this.state.originArr.length + 1;
    newArr.push(len);
    this.setState({
      originArr: newArr,
    });
  };
  render() {
    return (
      <div className="container">
        <div>条件渲染</div>
        {this.fn1()}
        {/* {this.state.isShow ? <div>显示</div> : ""} */}
        <button onClick={this.handleIsShow}>{this.state.isShow ? "隐藏" : "显示"}</button>
        <div>列表循环</div>
        {/* {this.getArr()} */}
        {this.state.originArr.map((item) => {
          return <div key={item}>{item}</div>;
        })}
        <button onClick={this.handleArrPush}>添加数组数据</button>
      </div>
    );
  }
}

export default Test05;
