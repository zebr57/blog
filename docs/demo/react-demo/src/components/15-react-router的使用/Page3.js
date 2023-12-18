// /Page3/:id  -  /Page3/99 - query

import { useParams } from "react-router-dom";
export default function Page3() {
  let routerParams = useParams();
  console.log(routerParams);
  return <div>Page3</div>;
}
