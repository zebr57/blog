import { BrowserRouter, HashRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page2Son1 from "./Page2Son1";
import Page2Son2 from "./Page2Son2";
import { lazy, Suspense } from "react";
let LazyPage4 = lazy(() => {
  return import("./Page4");
});

const _token = localStorage.getItem("token");

function App() {
  return (
    <div className="name">
      <BrowserRouter>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <NavLink to={"/Page1"}>Page1</NavLink>
          <NavLink to={"/Page2"}>Page2</NavLink>
          <NavLink to={"/Page2/son1"}>Page2Son1</NavLink>
          <NavLink to={"/Page2/son2"}>Page2Son2</NavLink>
          <NavLink to={"/Page3/99"}>Page3</NavLink>
          <NavLink to={"/Page4"}>Page4</NavLink>
        </div>
        {/* 过渡效果，组件还没加载好显示加载中 */}
        <Suspense fallback={<h1>加载中</h1>}>
          <Routes>
            {_token ? <Route path="/Page1" element={<Page1 />}></Route> : ""}
            <Route path="/Page1" element={_token ? <Page1 /> : <Navigate to="/Page4"></Navigate>}></Route>
            <Route path="/Page2" element={<Page2 />}>
              <Route path="son1" element={<Page2Son1 />}></Route>
              <Route path="son2" element={<Page2Son2 />}></Route>
            </Route>
            <Route path="/Page3/:id" element={<Page3 />}></Route>
            {/* <Route path="/Page4" element={<Page4 />}></Route> */}
            <Route path="/Page4" element={<LazyPage4 />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
