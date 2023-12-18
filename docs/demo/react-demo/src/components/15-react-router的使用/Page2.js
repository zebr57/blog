import { Outlet, useNavigate } from "react-router-dom";
export default function Page2() {
  let navTo = useNavigate();
  return (
    <div>
      Page2
      <button
        onClick={() => {
          navTo("/Page1", {
            // state也是一种参数，可在useLocation返回的对象中获取，但不在url显示
            state: {
              state1: "hello",
            },
          });
        }}
      >
        跳转到page1
      </button>
      <Outlet></Outlet>
    </div>
  );
}
