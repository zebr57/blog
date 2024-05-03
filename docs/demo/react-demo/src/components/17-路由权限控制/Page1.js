import { useState } from "react";

let num = 1;

function Page1() {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);
  const handleSetArr = () => {
    num += 1;
    console.log(num);
    const newArr = [...arr];
    newArr[num] = 9;
    setArr(newArr);
  };
  return (
    <div>
      Page1
      {arr.map((item) => {
        return <div key={item}>{item}</div>;
      })}
      <button onClick={handleSetArr.bind(this)}>setArr</button>
    </div>
  );
}
export default Page1;
