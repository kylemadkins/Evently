import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../layout/App";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
