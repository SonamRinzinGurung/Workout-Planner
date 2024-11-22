import PropTypes from "prop-types";
import { ExerciseGroupForm } from ".";
import {
    handleWorkoutChange,
    handleAddExercise,
    handleRemoveWorkout,
} from "../utils/formHandlers";
import { FaPlus } from "react-icons/fa";
import { Draggable } from "@hello-pangea/dnd";
import { MdDragIndicator } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";

import { useAppContext } from "../context/appContext";

const WorkoutForm = ({ workoutIndex, workoutItem, collapsed }) => {
    const { formData, setFormData, setDeletedWorkouts, setDeletedExercises } =
        useAppContext();

    const handleWorkoutRemoval = (setFormData, workoutIndex) => {
        if (workoutItem.id) {
            setDeletedWorkouts((prevState) => [...prevState, workoutItem.id]);

            // Add all exercises to the deletedExercises array
            workoutItem.exercises.forEach((exercise) => {
                if (exercise.id) {
                    setDeletedExercises((prevState) => [
                        ...prevState,
                        { exerciseId: exercise.id, workoutId: workoutItem.id },
                    ]);
                }
            });
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
                    className="flex flex-col gap-2 items-center shadow-md py-6 md:px-6 px-4 rounded-md bg-emerald-300 dark:bg-gray-900 w-full"
                >
                    {!collapsed && (
                        <div className="flex w-full items-center justify-end">
                            <button
                                onClick={() => handleWorkoutRemoval(setFormData, workoutIndex)}
                                className="flex justify-center p-2 rounded-md text-red-400 hover:text-red-500"
                            >
                                <IoIosRemoveCircle className="text-center" size={30} />
                            </button>
                        </div>
                    )}
                    <div className="flex gap-4 w-full">
                        {collapsed && (
                            <div {...provided.dragHandleProps} className="">
                                <MdDragIndicator size={30} className="cursor-move" />
                            </div>
                        )}
                        <div className="flex flex-col gap-1 w-full">
                            <div className="">
                                <p className="font-subHead font-semibold text-xl">
                                    Name of the Workout
                                </p>
                            </div>
                            <div className="w-full">
                                <input
                                    className="border border-gray-500 p-4 rounded-md font-mono dark:bg-gray-900 w-full"
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
                        </div>
                    </div>
                    {collapsed ? null : (
                        <div className="flex flex-col gap-4 p-4 rounded-md w-full bg-emerald-50 dark:bg-gray-600 mt-4">
                            <div>
                                <p className="font-subHead font-semibold text-lg">
                                    Exercise Details
                                </p>
                            </div>
                            <ExerciseGroupForm
                                workoutItem={workoutItem}
                                workoutIndex={workoutIndex}
                            />

                            <button
                                onClick={() => handleAddExercise(setFormData, workoutIndex)}
                                className="flex justify-center items-center gap-1 p-2 rounded-md hover:shadow-md transition ease-in-out duration-300 bg-emerald-400 hover:bg-emerald-500 text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
                            >
                                <FaPlus />
                                <p className="font-medium">Exercise</p>
                            </button>
                        </div>
                    )}
              </div>
          )}
      </Draggable>
  );
};

export default WorkoutForm;

WorkoutForm.propTypes = {
    workoutIndex: PropTypes.number.isRequired,
    workoutItem: PropTypes.object.isRequired,
    collapsed: PropTypes.bool.isRequired,
};
