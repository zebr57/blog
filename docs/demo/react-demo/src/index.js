import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* 
  相当于vue中的 main.js - 把项目挂载至指定的dom
  vue是创建根实例-通过实例自身app.mount('#app') 挂载至指定的dom
  react没有跟实例，根也只是一个组件、后续所有组件都是app的子组件
  react-dom 是把一个react组件从一个真正的dom卸载，或者渲染真正的dom
 */
// - 渲染
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// - 卸载
// setTimeout(() => {
//   root.unmount()
// }, 2000) // 两秒后页面空白

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
