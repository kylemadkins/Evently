import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../layout/App";
import Home from "../../features/home/Home";
import Events from "../../features/events/Events";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";
import EventDetails from "../../features/events/details/EventDetails";

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
    ],
  },
];

export default createBrowserRouter(routes);
