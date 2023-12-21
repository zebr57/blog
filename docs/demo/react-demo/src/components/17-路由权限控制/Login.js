import { loginAuth } from "../../router/permissionData";
import { getUserInfoThunk } from "../../store/userInfo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  let username = "admin1";
  let password = "123456";

  const dispatch = useDispatch();
  const navTo = useNavigate();

  const handleLogin = async () => {
    const res = await loginAuth({ username, password });
    if (res.code == 0) {
      dispatch(getUserInfoThunk(res.id));
      navTo("/Page1");
    } else {
      console.warn(res.msg);
    }
  };

  return (
    <div>
      用户名：
      <input
        onInput={(e) => {
          username = e.target.value;
        }}
      ></input>
      密码：
      <input
        onInput={(e) => {
          password = e.target.value;
        }}
      ></input>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
}
export default Login;
