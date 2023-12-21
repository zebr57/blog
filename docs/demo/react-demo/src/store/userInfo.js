// 1.引入
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../router/permissionData";
import {} from "../router/routesList";
// 4. 异步,定义必须在 slice 前面, 第一个参数可随意起

export let getUserInfoThunk = createAsyncThunk("userInfoSlice/changeUserInfo", async (id) => {
  let res = await getUserInfo(id);
  return res;
});
// 缓存，不然通过地址栏跳转回重新执行方法导致访问不到
let _localUserRoutes = localStorage.getItem("routes");
// 2.定义切片
export let userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState: {
    name: "",
    routes: _localUserRoutes ? JSON.parse(_localUserRoutes) : [],
  },
  reducers: {
    changeUserName: (state, action) => {
      state.name = action.payload;
    },
    changeUserRoutes: (state, action) => {
      state.routes = action.payload;
    },
  },
  extraReducers: (chunk) => {
    chunk.addCase(getUserInfoThunk.pending, () => {
      console.log("获取用户信息中");
    });
    chunk.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      if (action.payload.code == 0) {
        state.name = action.payload.data.name;
        state.routes = action.payload.data.routes;
        localStorage.setItem("userId", action.payload.data.id);
        localStorage.setItem("username", action.payload.data.name);
        localStorage.setItem("routes", JSON.stringify(action.payload.data.routes));
      }
      console.log("获取用户信息成功");
    });
  },
});

// 3.配置模块化仓库
// let store = combineReducers({ userInfoSlice });
export let { changeUserName, changeUserRoutes } = userInfoSlice.reducer;

export default userInfoSlice.reducer;
