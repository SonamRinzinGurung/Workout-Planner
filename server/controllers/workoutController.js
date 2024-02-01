import Plan from "../models/Plan.js";
import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";
import { BadRequestError } from "../request-errors/index.js";

const createPlan = async (req, res) => {
  const { name, workouts } = req.body;

  if (!name) {
    throw new BadRequestError("Please provide Workout Plan name");
  }

  for (let i = 0; i < workouts.length; i++) {
    for (let j = 0; j < workouts[i].exercises.length; j++) {
      const exercise = await Exercise.create(workouts[i].exercises[j]);
      workouts[i].exercises[j] = exercise._id;
      workouts[i].user = req.user.userId;
    }
    const workout = await Workout.create(workouts[i]);
    workouts[i] = workout._id;
  }

  const newPlan = await Plan.create({
    name,
    workouts: workouts,
    user: req.user.userId,
  });

  res.status(201).json(newPlan);
};

const getPlans = async (req, res) => {
  const plans = await Plan.find({
    isDeleted: false,
    user: req.user.userId,
  }).populate({
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

const patchWorkout = async (req, res) => {
  const { _id, name } = req.body;

  let { workouts } = req.body;

  const plan = await Plan.findById(_id);

  if (!plan) {
    throw new BadRequestError("Workout Plan not found");
  }

  for (const workout of workouts) {
    for (const exercise of workout.exercises) {
      await Exercise.findOneAndUpdate({ _id: exercise._id }, exercise, {
        new: true,
        runValidators: true,
      });
    }
    await Workout.findOneAndUpdate(
      { _id: workout._id },
      { title: workout.title },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  res.status(200).json({ message: "Workout Plan Updated" });
};

const getPlanDetails = async (req, res) => {
  const { planId } = req.params;

  const plans = await Plan.findOne({ _id: planId }).populate({
    path: "workouts",
    model: "Workout",
    select: "-createdAt -updatedAt -__v -user",

    populate: {
      path: "exercises",
      model: "Exercise",
      select: "-createdAt -updatedAt -__v",
    },
  });
  res.status(200).json(plans);
};
export { createPlan, getPlans, patchWorkout, getPlanDetails };
