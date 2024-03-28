import {
  Root,
  Login,
  HomePage,
  PageNotFound,
  CreatePlan,
  EditWorkout,
  RemovedPlans,
  Register,
  VerifyEmailNotice,
  EmailVerification,
} from "../routes";
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-notice",
        element: <VerifyEmailNotice />,
      },
      {
        path: "/verify-account/:token",
        element: <EmailVerification />,
      },
      {
        path: "/create",
        element: (
          <RouteProtector>
            <CreatePlan />
          </RouteProtector>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <RouteProtector>
            <EditWorkout />
          </RouteProtector>
        ),
      },
      {
        path: "/removed-plans",
        element: (
          <RouteProtector>
            <RemovedPlans />
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
