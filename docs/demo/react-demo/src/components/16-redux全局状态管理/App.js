// import store from "../../store/index";
// let state = store.getState();
import { connect } from "react-redux";
import { changeMes, addNum } from "../../store/toolkitIndex";

function App(props) {
  // console.log(props);
  return (
    <div className="container">
      redux
      <div>mes:{props.mes}</div>
      <div>num:{props.num}</div>
      <button
        onClick={() => {
          props.changeMes();
        }}
      >
        修改mes
      </button>
      <button
        onClick={() => {
          props.addNum();
        }}
      >
        修改num
      </button>
      {/* <button
        onClick={() => {
          props.dispatch({
            type: "changeMes",
            payload: "hello word!",
          });
        }}
      >
        修改mes
      </button> */}
      {/* <button onClick={() => {
        store.dispatch({
          type: 'changeMes',
          payload: "hello word!"
        })
        console.log(store.getState());
      }}>修改mes</button> */}
    </div>
  );
}
/**
 * 第一个参数是将哪些属性 映射到props，必须返回一个对象
 * 第二个参数是方法映射，给props里加入哪些方法
 */
let reduxApp = connect(
  (state) => {
    // console.log(state); // 模块结果{mesReducer: {…}, numReducer: {…}}
    return {
      mes: state.mesReducer.mes,
      num: state.numReducer.num,
    };
  },
  (dispatch) => {
    return {
      // changeMes() {
      //   dispatch({
      //     type: "mesSlice/changeMes",
      //     payload: "hello word!",
      //   });
      // },
      changeMes() {
        dispatch(changeMes("hello word"));
      },
      addNum() {
        dispatch(addNum("hello word"));
      },
    };
  }
)(App);
export default reduxApp;
