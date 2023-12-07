import React from "react";

/* this指向问题
- 不使用箭头函数相关，this为undefined
  1.通过调用.bind(this)规定this
  2.使用箭头函数 ={() => {}}
  3.函数本身使用箭头函数
*/

class Test1 extends React.Component {
  // 1. 通过给方法调用 bind 规定 this
  // handleClick = () => {
  //   console.log("click");
  // };
  handleClick = (a, b, event) => {
    // event并不是原生的，是合成的，使用上跟原生相似 is+原生方法名
    // event.stopPropagation() 原生
    console.log(event.isDefaultPrevented()) // react
    console.log(a + b, event);
  };
  render() {
    return (
      <div className="container">
        {/* <div onClick={this.handleClick.bind(this)}>点击</div> */}
        {/* <div onClick={() => {
            console.log(this); // Test1
          }}
        >点击</div> */}
        <div onClick={this.handleClick}>点击</div>
        <div onClick={this.handleClick.bind(this, 1, 2)}>点击按钮</div>
      </div>
    );
  }
}

export default Test1;
