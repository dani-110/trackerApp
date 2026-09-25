// import BlankLayout from "../layouts/BlankLayout.jsx";
// import NotFound from "../layouts/NotFound.jsx";
import BlankLayout from "../layouts/BlankLayout.jsx";
import NotFound from "../layouts/NotFound.jsx";
import RequireAuth from "../layouts/RequireAuth.jsx";
import { privateRoutes } from "./private.js";
import { publicRoutes } from "./public.js";
// import { publicRoutes } from "./public.js";


const routes = [
  {
    path: "/",
    element: <RequireAuth />,
    children: privateRoutes,
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: publicRoutes,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
