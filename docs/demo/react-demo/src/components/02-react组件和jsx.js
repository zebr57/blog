import React from "react";
// 与新版本vue3组合式api相似
// 函数组件，编写组件的方法首字母必须大写
export function FnHello() {
  return <div>hello</div>;
}
// 与老版本vue2选项式api相似
// 类组件，继承React.Component，需要引入 react
export class ClassHello extends React.Component {
  render() {
    return <div>hello</div>;
  }
}
