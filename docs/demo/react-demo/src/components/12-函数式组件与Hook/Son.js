import { useContext } from "react";
import { context1 } from "./App";
function Son(props) {
  let contextValue = useContext(context1);
  return (
    <div>
      Son，接收到来自父组件的消息：{props.msg.msg1 + props.msg.msg2}
      <div>Provider: {contextValue}</div>
    </div>
  );
}

export default Son;
