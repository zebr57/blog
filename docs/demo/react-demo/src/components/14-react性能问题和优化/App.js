import React, { useState, useMemo, useCallback } from "react";
import Son from "./Son";

// 使用React.memo包一层，作用避免子组件更新（React.memo本身就是一个高阶组件）
const MemoSon = React.memo(Son);

export default function App() {
  let [num, setNum] = useState(0);

  // const obj = {
  //   a: 1,
  // };
  // function f1() {
  //   console.log("f1");
  // }

  // 使用 useMemo 对象, 第二参数必须传[]
  const obj = useMemo(() => {
    return { a: 1 };
  }, []);

  // 使用 useCallback 包裹 方法, 第二参数必须传[]
  const f1 = useCallback(function () {
    console.log("f1");
  }, []);
  
  function handleChangeNum() {
    let _num = num + 1;
    setNum(_num);
  }
  return (
    <div>
      {num}
      <button onClick={handleChangeNum}>修改</button>
      {/* <Son></Son> */}
      <MemoSon obj={obj} f1={f1}></MemoSon>
    </div>
  );
}
