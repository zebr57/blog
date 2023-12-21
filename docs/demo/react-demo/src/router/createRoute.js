import { Route } from "react-router-dom";
import routeMap from "../router/routesMap"

export function createRoute(routesList) {
  return routesList.map((item) => {
    if (item.children && item.children.length > 0) {
      return (
        <Route key={item.path} path={item.path} Component={routeMap[item.component]}>
          {createRoute(item.children)}
        </Route>
      );
    } else {
      return <Route key={item.path} path={item.path} Component={routeMap[item.component]}></Route>;
    }
  });
}
