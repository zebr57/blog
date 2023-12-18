import { legacy_createStore as createStore } from "redux";

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

let store = createStore(mesReducer);

export default store;
