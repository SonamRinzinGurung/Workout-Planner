import PropTypes from "prop-types";
import { ExerciseGroupForm } from ".";
import {
    handleWorkoutChange,
    handleAddExercise,
    handleRemoveWorkout,
} from "../utils/formHandlers";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Draggable } from "@hello-pangea/dnd";
import { TbDragDrop2 } from "react-icons/tb";
import { useAppContext } from "../context/appContext";

const WorkoutForm = ({ workoutIndex, workoutItem }) => {
    const { formData, setFormData, setDeletedWorkouts } = useAppContext();

    const handleWorkoutRemoval = (setFormData, workoutIndex) => {
      if (workoutItem._id) {
          setDeletedWorkouts((prevState) => [...prevState, workoutItem._id]);
      }

        handleRemoveWorkout(setFormData, workoutIndex);
    };
    return (
        <Draggable draggableId={workoutIndex.toString()} index={workoutIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    key={workoutIndex}
                    className="flex flex-col gap-2 items-center shadow-md mb-4 p-6 rounded-md bg-emerald-100 dark:bg-gray-900"
                >
                  <div
                      {...provided.dragHandleProps}
                      className="rotate-90 ml-auto -mt-2 -mr-2"
                  >
                      <TbDragDrop2 size={25} />
                  </div>
                  <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-center gap-2">
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
                          onChange={(event) =>
                              handleWorkoutChange(
                                  formData.workouts,
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
                      <ExerciseGroupForm
                          workoutItem={workoutItem}
                          workoutIndex={workoutIndex}
                      />

                      <button
                          onClick={() => handleAddExercise(setFormData, workoutIndex)}
                          className="flex justify-center items-center gap-1 mt-2 p-2 rounded-md hover:shadow-md transition ease-in-out duration-300 bg-emerald-400 hover:bg-emerald-500 text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
                      >
                          <FaPlus />
                          <p className="text-xs font-medium">Exercise</p>
                      </button>
                  </div>

                  <button
                      onClick={() => handleWorkoutRemoval(setFormData, workoutIndex)}
                      className="flex justify-center p-2 rounded-md bg-red-400 hover:bg-red-500 hover:shadow-md transition ease-in-out duration-300 text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
                  >
                      <MdDeleteOutline className="text-center" />
                      <p className="text-xs font-medium">Workout</p>
                  </button>
              </div>
          )}
      </Draggable>
  );
};

export default WorkoutForm;

WorkoutForm.propTypes = {
    workoutIndex: PropTypes.number.isRequired,
    workoutItem: PropTypes.object.isRequired,
};
