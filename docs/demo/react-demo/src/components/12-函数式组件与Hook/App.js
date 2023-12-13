import React from "react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Son from "./Son";

// 深层嵌套传值
export const context1 = React.createContext();

function App() {
  /* ===================================== useState ===================================== */
  const [msg1, setMsg1] = useState("hello");
  const [msg2, setMsg2] = useState("王花花");
  // console.log(useState("HELLO")); // ['HELLO', ƒ]
  const btnDom = useRef();

  /* ===================================== useMemo ===================================== */
  const [arr, setArr] = useState([1, 2, 3]);
  // 缓存，避免重新渲染时再次运行，起到优化作用
  const all = useMemo(() => {
    console.log("useMemo");
    let _all = 0;
    arr.forEach((item) => {
      _all += item;
    });
    return _all;
  }, [arr]);
  /* ===================================== useEffect ===================================== */
  // 第一个参数回调函数必传，第二个要么不传，要么传一个数组
  // 第二个参数类似于vue-watch监听
  // useEffect监听某个数据，一开始渲染会执行一次（didMount）
  useEffect(() => {
    console.log("effect");
  }, [msg1]);
  /* ===================================== useRef ===================================== */
  // const context1 = React.createContext(); // 外层定义，需要暴露出去给子组件引入
  useEffect(() => {
    console.log(btnDom);
  }, []);
  /* ===================================== useCallback ===================================== */
  // 使用useCallback包裹起来，下次组件内数据更新，不会重新创建handleChangeArr方法
  // 第二个参数也是一样，监听某些数据更新时才去调用
  const handleChangeArr = useCallback(
    (num) => {
      // arr.push(num) // 内存地址不变，不执行useEffect
      setArr([...arr, num]);
    },
    [arr]
  );

  return (
    <div>
      App
      <button
        onClick={() => {
          setMsg1("hi");
        }}
      >
        修改msg1
      </button>
      <button
        onClick={() => {
          setMsg2("李明花");
        }}
      >
        修改msg2
      </button>
      <div>总数：{all}</div>
      <button ref={btnDom} onClick={handleChangeArr.bind(this, 4)}>
        修改总数
      </button>
      {/* 嵌套传值 */}
      <context1.Provider value="context value">
        <Son msg={{ msg1, msg2 }}></Son>
      </context1.Provider>
    </div>
  );
}
export default App;
