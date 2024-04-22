export const handleWorkoutChange = (
  formData,
  setFormData,
  workoutIndex,
  event
) => {
  setFormData((prevState) => ({
    ...prevState,
    workouts: formData.map((item, i) =>
      i === workoutIndex
        ? { ...item, [event.target.name]: event.target.value }
        : item
    ),
  }));
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
        exercises: [{ name: "", sets: "", reps: "", weight: "", order: 0 }],
        order: prevState.workouts.length, //index of the new workout
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
              { name: "", sets: "", reps: "", weight: "", order: item.exercises.length },
            ],
          }
        : item
    ),
  }));
};

export const handleRemoveWorkout = (setFormData, workoutIndex) => {
  setFormData((prevState) => ({
    ...prevState,
    workouts: prevState.workouts.filter((_, i) => i !== workoutIndex).map((item, i) => ({
      ...item,
      order: i,
    })),
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
          ).map((exerciseItem, j) => ({
            ...exerciseItem,
            order: j,
          })),
          }
        : workoutItem
    ),
  }));
};
