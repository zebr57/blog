import { useSelector, useDispatch } from "react-redux";
import { addNum, changeNumThunk } from "../../store/toolkitIndex";

function App2() {
  // hook是映射到state上
  let num = useSelector((state) => {
    return state.numReducer.num;
  });
  let dispatch = useDispatch();
  return (
    <div className="container">
      toolkit-hook
      <div>num:{num}</div>
      <button
        onClick={() => {
          // dispatch({
          //   type: "numSlice/addNum",
          // });
          dispatch(addNum());
        }}
      >
        修改num
      </button>

      <button onClick={() => {
          dispatch(changeNumThunk());
      }}>异步修改</button>
    </div>
  );
}

export default App2;
