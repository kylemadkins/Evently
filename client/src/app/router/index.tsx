import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import App from "../layout/App";
import Home from "../../features/home/Home";
import Events from "../../features/events/Events";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";
import EventDetails from "../../features/events/details/EventDetails";
import Errors from "../../features/errors/Errors";
import NotFound from "../../features/errors/NotFound";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
        children: [
          {
            path: "",
            element: <EventDashboard />,
          },
          {
            path: ":id",
            element: <EventDetails />,
          },
          {
            path: "create",
            element: <EventForm key="create" />,
          },
          {
            path: ":id/manage",
            element: <EventForm key="manage" />,
          },
        ],
      },
      {
        path: "errors",
        element: <Errors />,
      },
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate replace to="/404" />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
