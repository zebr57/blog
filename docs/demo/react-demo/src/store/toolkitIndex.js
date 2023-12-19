// 1.引入
import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";

// 4. 异步,定义必须在 slice 前面, 第一个参数可随意起
export let changeNumThunk = createAsyncThunk("numSlice/changeNum", async () => {
  let res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(999);
    }, 1000);
  });
  return res;
});

// 2.定义切片
let mesSlice = createSlice({
  name: "mesSlice", // 切片名，dispatch时需要加的前缀
  initialState: {
    mes: "hello",
  },
  reducers: {
    changeMes(state, action) {
      state.mes = action.payload;
    },
  },
});

let numSlice = createSlice({
  name: "numSlice",
  initialState: {
    num: 0,
  },
  reducers: {
    addNum(state, action) {
      state.num += 1;
    },
  },
  // 异步reducers
  extraReducers: (chunk) => {
    chunk.addCase(changeNumThunk.pending, () => {
      console.log("pending");
    });
    chunk.addCase(changeNumThunk.fulfilled, (state, action) => {
      state.num = action.payload;
    });
    chunk.addCase(changeNumThunk.rejected, () => {
      console.log("rejected");
    });
  },
  // 对象写法
  // extraReducers: {
  //   [changeNumThunk.fulfilled]:(state, action) => {
  //     state.num = action.payload
  //   }
  // }
});
// 3.配置模块化仓库
const store = configureStore({
  reducer: {
    mesReducer: mesSlice.reducer,
    numReducer: numSlice.reducer,
  },
});
// console.log(mesSlice.actions); // {changeMes: ƒ}

export let { changeMes } = mesSlice.actions;
export let { addNum } = numSlice.actions;

export default store;
