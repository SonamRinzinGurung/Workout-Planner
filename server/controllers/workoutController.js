import Plan from "../models/Plan.js";
import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";

const createPlan = async (req, res) => {
  const { name, plan } = req.body;

  for (let i = 0; i < plan.length; i++) {
    for (let j = 0; j < plan[i].exercises.length; j++) {
      const exercise = await Exercise.create(plan[i].exercises[j]);
      plan[i].exercises[j] = exercise._id;
      plan[i].user = req.user.userId;
    }
    const workout = await Workout.create(plan[i]);
    plan[i] = workout._id;
  }

  const newPlan = await Plan.create({
    name,
    workouts: plan,
    user: req.user.userId,
  });

  res.status(201).json(newPlan);
};

const getPlans = async (req, res) => {
  const plans = await Plan.find({ isDeleted: false }).populate({
    path: "workouts",
    model: "Workout",
    select: "-createdAt -updatedAt -__v",

    populate: {
      path: "exercises",
      model: "Exercise",
      select: "-createdAt -updatedAt -__v",
    },
  });
  res.status(200).json(plans);
};

export { createPlan, getPlans };
