import express from "express";
import {
  createPlan,
  getPlans,
  patchWorkout,
  getPlanDetails,
  deletePlan,
  toggleRemovePlan,
  getRemovedPlans,
  addExercise,
  addWorkout,
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
router.patch("/edit-workout/addExercise", isAuthenticated, addExercise);
router.patch("/edit-workout/addWorkout", isAuthenticated, addWorkout);

export default router;
