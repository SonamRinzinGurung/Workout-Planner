import express from "express";
import {
  createPlan,
  getPlans,
  patchWorkout,
  getPlanDetails,
} from "../controllers/workoutController.js";
import isAuthenticated from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/", isAuthenticated, createPlan);
router.get("/", isAuthenticated, getPlans);
router.patch("/edit-workout", isAuthenticated, patchWorkout);
router.get("/:planId", isAuthenticated, getPlanDetails);

export default router;
