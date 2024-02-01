import PropTypes from "prop-types";
import { Button, ExerciseForm } from "../components";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useRef, useEffect } from "react";
import {
  handleWorkoutChange,
  handleAddWorkout,
  handleAddExercise,
  handleRemoveWorkout,
  handleRemoveExercise,
} from "../utils/formHandlers";

const SecondForm = ({ formData, setFormData }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    //scrolls to the bottom of the page when changes in the length of workout array occurs
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formData.workouts.length]);

  return (
    <>
      <div className="flex gap-4 flex-wrap dark:text-gray-100 justify-center">
        {formData.workouts.map((workoutItem, workoutIndex) => (
          <div
            key={workoutIndex}
            className="flex flex-col gap-2 items-center shadow-md mb-4 p-6 rounded-md dark:bg-gray-900"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center gap-2">
                <p className="font-subHead font-semibold text-center">
                  Name of the Workout
                </p>
                <p className="font-subHead font-medium text-sm text-center">
                  -Day {workoutIndex + 1}
                </p>
              </div>
              <input
                className="border border-gray-500 p-2 rounded-md font-mono text-xs text-center dark:bg-gray-900"
                type="text"
                name="title"
                placeholder="Workout Name"
                value={workoutItem.title}
                onChange={(event) =>
                  handleWorkoutChange(
                    formData,
                    setFormData,
                    workoutIndex,
                    event
                  )
                }
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
                  <ExerciseForm
                    key={exerciseIndex}
                    exerciseItem={exerciseItem}
                    exerciseIndex={exerciseIndex}
                    workoutIndex={workoutIndex}
                    handleRemoveExercise={handleRemoveExercise}
                    setFormData={setFormData}
                  />
                ))}
              </div>

              <button
                onClick={() => handleAddExercise(setFormData, workoutIndex)}
                className="flex justify-center items-center gap-1 mt-2 p-2 rounded-md hover:shadow-md transition ease-in-out duration-300 bg-emerald-400 hover:bg-emerald-500 text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
              >
                <FaPlus />
                <p className="text-xs font-medium">Exercise</p>
              </button>
            </div>

            <button
              onClick={() => handleRemoveWorkout(setFormData, workoutIndex)}
              className="flex justify-center p-2 rounded-md bg-red-400 hover:bg-red-500 hover:shadow-md transition ease-in-out duration-300 text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
            >
              <MdDeleteOutline className="text-center" />
              <p className="text-xs font-medium">Workout</p>
            </button>
          </div>
        ))}
      </div>
      <div id="add-workout" ref={scrollRef}>
        <Button
          name="Workout"
          handleClick={() => handleAddWorkout(setFormData)}
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
