import express from "express";
import {
  createPlan,
  getPlans,
  patchWorkout,
  getPlanDetails,
  deletePlan,
  toggleRemovePlan,
  getRemovedPlans,
} from "../controllers/workoutController.js";
import isAuthenticated from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/", isAuthenticated, createPlan);
router.get("/", isAuthenticated, getPlans);
router.patch("/edit-workout", isAuthenticated, patchWorkout);
router.get("/getRemovedPlans/", isAuthenticated, getRemovedPlans); // get the removed plans
router.get("/:planId", isAuthenticated, getPlanDetails);
router.delete("/:planId", isAuthenticated, toggleRemovePlan); // only change the status of the plan
router.delete("/deletePlan/:planId", isAuthenticated, deletePlan); // delete the plan its workouts permanently

export default router;
