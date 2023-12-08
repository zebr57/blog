import React from "react";

class Test04 extends React.PureComponent {
  // 忽略constructor，使用ES7写法
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     a: 1,
  //   };
  // }
  state = {
    name: "王花花",
    age: 18,
    bodyInfo: {
      height: 172,
      weight: 60,
    },
    likes: ["游泳、", "跑步、", "篮球"],
  };

  // 年龄、身高值+1
  add = (addNum) => {
    // 1.
    this.state.a += 1; // 修改值
    this.setState({}); // 触发更新
    //2.
    // 修改值并触发跟新
    this.setState(
      {
        age: this.state.age + addNum,
        bodyInfo: {
          // 该对象将覆盖原来的值
          height: this.state.bodyInfo.height + addNum,
          // weight: 60, // 注释该行，体重信息就不展示了
        },
      },
      () => {
        // console.log(this.state.age); // 19
      }
    );
    // console.log(this.state.age); // 18
  };
  // 改为固定值
  changeAge = () => {
    this.setState({
      age: 20,
    });
  };
  changeBodyInfo = () => {
    this.setState({
      // bodyInfo: this.state.bodyInfo, // 不会触发更新
      bodyInfo: { ...this.state.bodyInfo }, 
    });
  };
  changeLikes = () => {
    this.setState({
      likes: this.state.likes, // 不会触发更新
      likes: [...this.state.likes],
    });
  };
  render() {
    console.log("render");
    return (
      <div className="container">
        <div>姓名： {this.state.name}</div>
        <div>年龄：{this.state.age}</div>
        <div>
          身体状况：身高：{this.state.bodyInfo.height} | 体重： {this.state.bodyInfo.weight}
        </div>
        <div>爱好： {this.state.likes}</div>
        <button onClick={this.add.bind(this, 1)}>年龄\身高加1</button>
        <button onClick={this.changeAge.bind(this)}>年龄固定改为20</button>
        <button onClick={this.changeBodyInfo.bind(this)}>身体情况保持不变</button>
        <button onClick={this.changeLikes.bind(this)}>爱好保持不变</button>
      </div>
    );
  }
}

export default Test04;
