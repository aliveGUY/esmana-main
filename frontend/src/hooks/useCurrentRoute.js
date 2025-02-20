import { matchRoutes, useLocation } from "react-router-dom";

import routing from "../routing";

const getRoutes = (routes) => {
  const paths = new Set();
  const walkTree = (route, path = "") => {
    const p = route.path ? path + route.path : path;
    const rs = Array.isArray(route) ? route : route.children;
    if (rs && rs.length > 0) rs.forEach((r) => walkTree(r, p));
    else paths.add({ path: p, description: route.description, title: route.title });
  };
  walkTree(routes);
  return Array.from(paths).reverse();
};

export function useCurrentRoute() {
  const location = useLocation();
  const routes = getRoutes(routing);
  const rs = matchRoutes(routes, location);
  return (rs && rs[0]?.route) || {};
}
