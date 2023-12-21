import { BrowserRouter, Routes } from "react-router-dom";
import { createRoute } from "../../router/createRoute";
import origanRoutes from "../../router/routesList";

import { useSelector } from "react-redux";

function App() {
  let routesList = useSelector((state) => {
    return state.userInfo.routes;
  });
  
  return (
    <div>
      <BrowserRouter>
        <Routes>{createRoute(origanRoutes.concat(routesList))}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
