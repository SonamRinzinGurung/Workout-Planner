import express from "express";
import {
  createPlan,
  getPlans,
  patchPlans,
  getPlanDetails,
} from "../controllers/workoutController.js";
import isAuthenticated from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/", isAuthenticated, createPlan);
router.get("/", isAuthenticated, getPlans);
router.patch("/", isAuthenticated, patchPlans);
router.get("/:planId", isAuthenticated, getPlanDetails);

export default router;
