import PropTypes from "prop-types";
import { InputTextExercise, Button } from "../components";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

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
    <>
      <div className="flex gap-4 flex-wrap dark:text-gray-100 justify-center">
        {formData.workouts.map((workoutItem, workoutIndex) => (
          <div
            key={workoutIndex}
            className="flex flex-col gap-2 items-center shadow-md mb-4 p-6 rounded-md dark:bg-gray-900"
          >
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-center">
                <p className="font-subHead font-semibold text-center">
                  Name of the Workout
                </p>
              </div>
              <input
                className="border border-gray-500 p-2 rounded-md font-mono text-xs text-center dark:bg-gray-900"
                type="text"
                name="title"
                placeholder="Workout Name"
                value={workoutItem.title}
                onChange={(event) => handleChange(workoutIndex, event)}
                autoFocus
              />
            </div>
            <div className="flex flex-col items-center gap-2 p-2 rounded-md">
              <div>
                <p className="font-subHead font-semibold text-center">
                  Exercise Details
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {workoutItem.exercises.map((exerciseItem, exerciseIndex) => (
                  <div
                    className="flex flex-col gap-2 p-4 pt-6 rounded-md items-center shadow-md bg-stone-50 dark:bg-gray-800"
                    key={exerciseIndex}
                  >
                    <div className="flex flex-col gap-2">
                      <InputTextExercise
                        name="name"
                        value={exerciseItem.name}
                        handleChange={handleExerciseChange}
                        workoutIndex={workoutIndex}
                        exerciseIndex={exerciseIndex}
                        placeholder={"Exercise Name"}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <InputTextExercise
                        name="sets"
                        value={exerciseItem.sets}
                        handleChange={handleExerciseChange}
                        workoutIndex={workoutIndex}
                        exerciseIndex={exerciseIndex}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <InputTextExercise
                        name="reps"
                        value={exerciseItem.reps}
                        handleChange={handleExerciseChange}
                        workoutIndex={workoutIndex}
                        exerciseIndex={exerciseIndex}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <InputTextExercise
                        name="weight"
                        value={exerciseItem.weight}
                        handleChange={handleExerciseChange}
                        workoutIndex={workoutIndex}
                        exerciseIndex={exerciseIndex}
                        type="number"
                        placeholder={"Weight (kg)"}
                      />
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleRemoveExercise(workoutIndex, exerciseIndex)
                        }
                      >
                        <FaTrashAlt className="text-red-400 hover:text-red-500 transition ease-in-out duration-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAddExercise(workoutIndex)}
                className="flex justify-center items-center gap-1 mt-2 p-2 rounded-md hover:shadow-md transition ease-in-out duration-300 bg-emerald-400 hover:bg-emerald-500 text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
              >
                <FaPlus />
                <p className="text-xs font-medium">Exercise</p>
              </button>
            </div>

            <button
              onClick={() => handleRemoveWorkout(workoutIndex)}
              className="flex justify-center p-2 rounded-md bg-red-400 hover:bg-red-500 hover:shadow-md transition ease-in-out duration-300 text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
            >
              <MdDeleteOutline className="text-center" />
              <p className="text-xs font-medium">Workout</p>
            </button>
          </div>
        ))}
      </div>
      <div>
        <Button
          name="Workout"
          handleClick={handleAddWorkout}
          className="bg-primary hover:bg-primaryDark text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
          position={1}
          icon={<IoAddCircle className="w-5 h-5" />}
        />
      </div>
    </>
  );
};

SecondForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
export default SecondForm;
