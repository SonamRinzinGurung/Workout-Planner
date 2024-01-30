import { Root, Login, HomePage, PageNotFound, CreatePlan } from "../routes";
import { RouteProtector } from "../components";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <RouteProtector>
            <HomePage />
          </RouteProtector>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create",
        element: (
          <RouteProtector>
            <CreatePlan />
          </RouteProtector>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export { router };