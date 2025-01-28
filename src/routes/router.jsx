import {
  Layout,
  Login,
  HomePage,
  PageNotFound,
  CreatePlan,
  EditWorkout,
  ArchivedPlans,
  Register,
  VerifyEmailNotice,
  EmailVerification,
  WorkoutPlanDetail,
  Profile,
} from "../routes";
import { RouteProtector } from "../components";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "/verify-account",
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
        path: "/archived-plans",
        element: (
          <RouteProtector>
            <ArchivedPlans />
          </RouteProtector>
        ),
      },
      {
        path: "/:id",
        element: (
          <RouteProtector>
            <WorkoutPlanDetail />
          </RouteProtector>
        ),
      },
      {
        path: "/profile",
        element: (
          <RouteProtector>
            <Profile />
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
