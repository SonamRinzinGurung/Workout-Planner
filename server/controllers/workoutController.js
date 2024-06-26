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

  plans.forEach((plan) => {
    plan.workouts.sort((a, b) => a.order - b.order);
  });

  plans.forEach((plan) => {
    plan.workouts.forEach((workout) => {
      workout.exercises.sort((a, b) => a.order - b.order);
    });
  });

  res.status(200).json(plans);
};

const patchWorkout = async (req, res) => {
  const { _id } = req.body;

  let { workouts, name, deletedExercises, deletedWorkouts } = req.body;
  const plan = await Plan.findById(_id);

  if (!plan) {
    throw new BadRequestError("Workout Plan not found");
  }

  for (let i = 0; i < workouts.length; i++) {
    for (let j = 0; j < workouts[i].exercises.length; j++) {
      if (workouts[i].exercises[j]._id) {
        // if exercise already exists
        await Exercise.findOneAndUpdate(
          { _id: workouts[i].exercises[j]._id },
          workouts[i].exercises[j],
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        // if exercise is new
        const exercise = await Exercise.create(workouts[i].exercises[j]);
        workouts[i].exercises[j] = exercise._id;
        workouts[i].user = req.user.userId;
      }
    }
    if (workouts[i]._id) {
      // if workout already exists
      await Workout.findOneAndUpdate({ _id: workouts[i]._id }, workouts[i], {
        new: true,
        runValidators: true,
      });
    } else {
      // if new workout
      const workout = await Workout.create(workouts[i]);
      workouts[i] = workout._id;
    }
  }

  // update the plan
  try {
    plan.name = name;
    plan.workouts = workouts;
    await plan.save();
  } catch (error) {
    throw new BadRequestError("Error updating workout plan");
  }

  // delete the workouts and exercises that are removed
  if (deletedWorkouts.length > 0) {
    for (const workoutId of deletedWorkouts) {
      const workout = await Workout.findById(workoutId);
      deletedExercises.push(...workout.exercises.toString().split(","));

      //remove duplicate ids from deletedExercises
      deletedExercises = [...new Set(deletedExercises)];

      await Workout.deleteOne({
        _id: workoutId,
      });
    }
  }

  if (deletedExercises.length > 0) {
    for (const exerciseId of deletedExercises) {
      await Exercise.deleteOne({
        _id: exerciseId,
      });
    }
  }
  // end of delete

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

  plans.workouts.sort((a, b) => a.order - b.order);

  plans.workouts.forEach((workout) => {
    workout.exercises.sort((a, b) => a.order - b.order);
  });

  res.status(200).json(plans);
};

const toggleArchivePlan = async (req, res) => {
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

const getArchivedPlans = async (req, res) => {
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

  plans.forEach((plan) => {
    plan.workouts.sort((a, b) => a.order - b.order);
  });

  plans.forEach((plan) => {
    plan.workouts.forEach((workout) => {
      workout.exercises.sort((a, b) => a.order - b.order);
    });
  });

  res.status(200).json(plans);
};

const addExercise = async (req, res) => {
  let { workouts } = req.body;

  for (let i = 0; i < workouts.length; i++) {
    for (let j = 0; j < workouts[i].exercises.length; j++) {
      const exercise = await Exercise.create(workouts[i].exercises[j]);
      workouts[i].exercises[j] = exercise._id;
      workouts[i].user = req.user.userId;
    }
    const workout = await Workout.findOneAndUpdate(
      { _id: workouts[i]._id },
      {
        $push: { exercises: workouts[i].exercises },
      },
      { new: true, runValidators: true }
    );
    workouts[i] = workout._id;
  }

  res.status(200).json({ message: "Workout Plan Updated" });
};

const addWorkout = async (req, res) => {
  let { _id, workouts } = req.body;

  for (let i = 0; i < workouts.length; i++) {
    for (let j = 0; j < workouts[i].exercises.length; j++) {
      const exercise = await Exercise.create(workouts[i].exercises[j]);
      workouts[i].exercises[j] = exercise._id;
      workouts[i].user = req.user.userId;
    }
    const workout = await Workout.create(workouts[i]);
    workouts[i] = workout._id;
  }

  const plan = await Plan.findOneAndUpdate(
    { _id },
    {
      $push: { workouts },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ message: "New Workout added.", plan });
};

export {
  createPlan,
  getPlans,
  patchWorkout,
  getPlanDetails,
  toggleArchivePlan,
  deletePlan,
  getArchivedPlans,
  addExercise,
  addWorkout,
};
