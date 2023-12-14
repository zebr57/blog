import { useState } from "react";
import Son from "./Son";
// import TestHoc from "./TestHoc";
// const HocSon = TestHoc(Son);
import GetXYHoc from "./GetXYHoc";
import MemoHoc from "./MemoHoc";

const HocSon = GetXYHoc(Son);
const MemoSon = MemoHoc(Son);

function App() {
  const [name, setName] = useState("王花花");
  const [age, setAge] = useState(18);

  function handleChangeName() {
    setName("李明花");
  }
  function handleChangeAge() {
    setAge(20);
  }
  return (
    <div>
      <h1>高阶组件</h1>
      {/* <HocSon name={name}></HocSon> */}
      
      {/* 修改传入props值，会触发Son更新 */}
      <button onClick={handleChangeName}>修改名称</button>
      <MemoSon name={name}></MemoSon>
      {/* 只修改state值，没有传入props，不会触发Son更新 */}
      <button onClick={handleChangeAge}>修改年龄</button>
      {age}岁
    </div>
  );
}

export default App;
