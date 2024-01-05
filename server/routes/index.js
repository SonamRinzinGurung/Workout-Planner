import express from "express";
import authRoutes from "./authRoutes.js";
const router = express.Router();

const routes = [
  {
    path: "/auth",
    router: authRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
