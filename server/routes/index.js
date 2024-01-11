import express from "express";
import authRoutes from "./authRoutes.js";
import workoutRoutes from "./workoutRoutes.js";
const router = express.Router();

const routes = [
  {
    path: "/auth",
    router: authRoutes,
  },
  {
    path: "/workout-plan",
    router: workoutRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
