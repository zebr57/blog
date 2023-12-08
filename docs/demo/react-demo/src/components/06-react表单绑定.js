import React from "react";

class Test06 extends React.PureComponent {
  state = {
    inputValue: "",
    checkList: ['c1'], // 已实现双向绑定，设置默认值
  };
  // 处理输入框
  handleChangeInputValue = () => {
    this.setState({
      inputValue: "王花花",
    });
  };
  // 处理多选框
  handleChangeChecked = (e) => {
    let arr = [...this.state.checkList];
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr.splice(arr.indexOf(e.target.value), 1);
    }
    this.setState({
      checkList: arr,
    });
  };
  render() {
    return (
      <div className="container">
        {this.state.inputValue}
        <input
          // 通过设置value实现双向绑定
          value={this.state.inputValue}
          // 通过监听input事件获取并保存value值
          onInput={(e) => {
            this.setState({
              inputValue: e.target.value,
            });
          }}
        ></input>
        {/* 手动设置表单的值 */}
        <button onClick={this.handleChangeInputValue}>改变输入框的值</button>
        <div>---------------------</div>
        {this.state.checkList}
        <div>---------------------</div>
        {/* 设置每个选中获取的值（value），通过checked控制是否选中 */}
        <input checked={this.state.checkList.includes("c1")} value="c1" type="checkbox" name="choose" onChange={this.handleChangeChecked} />
        选项一
        <input checked={this.state.checkList.includes("c2")} value="c2" type="checkbox" name="choose" onChange={this.handleChangeChecked} />
        选项二
        <input checked={this.state.checkList.includes("c3")} value="c3" type="checkbox" name="choose" onChange={this.handleChangeChecked} />
        选项三
      </div>
    );
  }
}
export default Test06;
