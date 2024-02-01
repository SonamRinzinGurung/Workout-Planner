export const handleWorkoutChange = (
  formData,
  setFormData,
  workoutIndex,
  event
) => {
  setFormData({
    ...formData,
    workouts: formData.workouts.map((item, i) =>
      i === workoutIndex
        ? { ...item, [event.target.name]: event.target.value }
        : item
    ),
  });
};

export const handleExerciseChange = (
  setFormData,
  workoutIndex,
  exerciseIndex,
  e
) => {
  setFormData((prevState) => ({
    ...prevState,
    workouts: prevState.workouts.map((workoutItem, i) =>
      i === workoutIndex
        ? {
            ...workoutItem,
            exercises: workoutItem.exercises.map((exerciseItem, j) =>
              j === exerciseIndex
                ? {
                    ...exerciseItem,
                    [e.target.name]: e.target.value,
                  }
                : exerciseItem
            ),
          }
        : workoutItem
    ),
  }));
};

export const handleAddWorkout = (setFormData) => {
  setFormData((prevState) => ({
    ...prevState,
    workouts: [
      ...prevState.workouts,
      {
        title: "",
        exercises: [{ name: "", sets: "", reps: "", weight: "" }],
      },
    ], // Add a new item to the workouts array
  }));
};

export const handleAddExercise = (setFormData, workoutIndex) => {
  setFormData((prevState) => ({
    ...prevState,
    workouts: prevState.workouts.map((item, i) =>
      i === workoutIndex
        ? {
            ...item,
            exercises: [
              ...item.exercises,
              { name: "", sets: "", reps: "", weight: "" },
            ],
          }
        : item
    ),
  }));
};

export const handleRemoveWorkout = (setFormData, workoutIndex) => {
  setFormData((prevState) => ({
    ...prevState,
    workouts: prevState.workouts.filter((_, i) => i !== workoutIndex),
  }));
};

export const handleRemoveExercise = (
  setFormData,
  workoutIndex,
  exerciseIndex
) => {
  setFormData((prevState) => ({
    ...prevState,
    workouts: prevState.workouts.map((workoutItem, i) =>
      i === workoutIndex
        ? {
            ...workoutItem,
            exercises: workoutItem.exercises.filter(
              (_, j) => j !== exerciseIndex
            ),
          }
        : workoutItem
    ),
  }));
};
