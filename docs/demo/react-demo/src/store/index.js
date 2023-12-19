import { legacy_createStore as createStore, combineReducers } from "redux";
// 1
function mesReducer(state = { mes: "hello" }, action) {
  switch (action.type) {
    case "changeMes":
      state.mes = action.payload;
      return { ...state };
    case "resetMes":
      state.mes = "hello";
      return { ...state };
    default:
      return state;
  }
}
// 2
function numReducer(state = { num: 0 }, action) {
  switch (action.type) {
    case "changeNum":
      state.num = action.payload;
      return { ...state };
    case "resetNum":
      state.num = 99;
      return { ...state };
    default:
      return state;
  }
}

// 调用 dispatch 每个reducer都会进行判断，即使多个reducer中的action.type相同，都会运行case的运算

let reducer = combineReducers({
  mesReducer,
  numReducer,
});

let store = createStore(reducer);

export default store;
