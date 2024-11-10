export const formValidation = (formData) => {
  let isValid = true;
  let messages = [];

  const { name, workouts } = formData;
  if (!name) {
    isValid = false;
    messages.push("Provide Workout Plan Name");
  }

  workouts.forEach((workout) => {
    if (workout.title == "") {
      isValid = false;
      messages.push("Workout Name is required");
    }
    workout.exercises.forEach((exercise) => {
      if (exercise.name == "") {
        isValid = false;
        messages.push("Exercise Name is required");
      }
      if (exercise.sets == "") {
        isValid = false;
        messages.push("Exercise Sets is required");
      }
      if (exercise.reps == "") {
        isValid = false;
        messages.push("Exercise Reps is required");
      }
    });
  });
  messages = [...new Set(messages)]; // remove duplicate message

  return { isValid, messages };
};
