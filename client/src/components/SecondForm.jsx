import PropTypes from "prop-types";

const SecondForm = ({ formData, setFormData }) => {
  const handleChange = (workoutIndex, e) => {
    setFormData({
      ...formData,
      workouts: formData.workouts.map((item, i) =>
        i === workoutIndex ? { ...item, [e.target.name]: e.target.value } : item
      ),
    });
  };

  const handleExerciseChange = (workoutIndex, exerciseIndex, e) => {
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

  const handleAddWorkout = () => {
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

  const handleAddExercise = (workoutIndex) => {
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

  const handleRemoveWorkout = (workoutIndex) => {
    setFormData((prevState) => ({
      ...prevState,
      workouts: prevState.workouts.filter((_, i) => i !== workoutIndex),
    }));
  };

  const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
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
  return (
    <div className="flex flex-wrap">
      {formData.workouts.map((workoutItem, workoutIndex) => (
        <>
          <div key={workoutIndex} className="flex flex-col mb-4 border">
            <div className="flex flex-col gap-2">
              <div>
                <p>Title</p>
              </div>
              <input
                className="border"
                type="text"
                name="title"
                placeholder=""
                value={workoutItem.title}
                onChange={(event) => handleChange(workoutIndex, event)}
              />
            </div>
            <div>
              <div>
                <p>Exercises</p>
              </div>

              {workoutItem.exercises.map((exerciseItem, exerciseIndex) => (
                <>
                  <div key={exerciseIndex}>
                    <div>
                      <button
                        onClick={() =>
                          handleRemoveExercise(workoutIndex, exerciseIndex)
                        }
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div>
                        <p>Name</p>
                      </div>
                      <input
                        className="border"
                        type="text"
                        name="name"
                        placeholder=""
                        value={exerciseItem.name}
                        onChange={(event) =>
                          handleExerciseChange(
                            workoutIndex,
                            exerciseIndex,
                            event
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p>Sets</p>
                      </div>
                      <input
                        className="border"
                        type="text"
                        name="sets"
                        placeholder=""
                        value={exerciseItem.sets}
                        onChange={(event) =>
                          handleExerciseChange(
                            workoutIndex,
                            exerciseIndex,
                            event
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p>Reps</p>
                      </div>
                      <input
                        className="border"
                        type="text"
                        name="reps"
                        placeholder=""
                        value={exerciseItem.reps}
                        onChange={(event) =>
                          handleExerciseChange(
                            workoutIndex,
                            exerciseIndex,
                            event
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p>Weight</p>
                      </div>
                      <input
                        className="border"
                        type="text"
                        name="weight"
                        placeholder=""
                        value={exerciseItem.weight}
                        onChange={(event) =>
                          handleExerciseChange(
                            workoutIndex,
                            exerciseIndex,
                            event
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              ))}
              <button onClick={() => handleAddExercise(workoutIndex)}>
                Add Exercise
              </button>
              <button onClick={() => handleRemoveWorkout(workoutIndex)}>
                Remove Workout
              </button>
            </div>
          </div>
        </>
      ))}
      <div>
        <button onClick={handleAddWorkout}>Add Day</button>
      </div>
    </div>
  );
};

SecondForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
export default SecondForm;
