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
  })
    .populate({
      path: "workouts",
      model: "Workout",
      select: "-createdAt -updatedAt -__v",

      populate: {
        path: "exercises",
        model: "Exercise",
        select: "-createdAt -updatedAt -__v",
      },
    })
    .sort("-createdAt");
  res.status(200).json(plans);
};

const patchWorkout = async (req, res) => {
  const { _id } = req.body;

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

const toggleRemovePlan = async (req, res) => {
  const { planId } = req.params;

  const plan = await Plan.findOne({ _id: planId, user: req.user.userId });

  if (!plan) {
    throw new BadRequestError(`Workout plan with id ${planId} not found.`);
  }

  await plan.updateOne({ isDeleted: !plan.isDeleted });

  res.status(200).json({
    message: `Plan ${plan.isDeleted ? "unremoved" : "removed"} successfully!`,
  });
};

const deletePlan = async (req, res) => {
  const { planId } = req.params;

  const plan = await Plan.findOne({
    _id: planId,
    user: req.user.userId,
    isDeleted: true,
  });

  if (!plan) {
    throw new BadRequestError(`Workout plan with id ${planId} not found.`);
  }

  let workoutIds = plan.workouts;
  let exerciseIds = [];

  for (const workoutId of workoutIds) {
    const workout = await Workout.findById(workoutId);

    exerciseIds.push(workout.exercises);
  }

  exerciseIds = exerciseIds.flat();

  // delete all the exercises
  for (const exerciseId of exerciseIds) {
    await Exercise.deleteOne({ _id: exerciseId });
  }

  // delete all the workouts
  for (const workoutId of workoutIds) {
    await Workout.deleteOne({ _id: workoutId });
  }

  //delete the plan
  await Plan.deleteOne({ _id: planId });

  res.status(200).json({
    message: "Plan with its workouts and exercises deleted successfully",
  });
};

const getRemovedPlans = async (req, res) => {
  const plans = await Plan.find({
    isDeleted: true,
    user: req.user.userId,
  })
    .populate({
      path: "workouts",
      model: "Workout",
      select: "-createdAt -updatedAt -__v",

      populate: {
        path: "exercises",
        model: "Exercise",
        select: "-createdAt -updatedAt -__v",
      },
    })
    .sort("-updatedAt");
  res.status(200).json(plans);
};

export {
  createPlan,
  getPlans,
  patchWorkout,
  getPlanDetails,
  toggleRemovePlan,
  deletePlan,
  getRemovedPlans,
};
