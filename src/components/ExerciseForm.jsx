import PropTypes from "prop-types";
import { InputTextExercise } from "../components";
import { Draggable } from "@hello-pangea/dnd";
import {
  handleRemoveExercise,
  handleExerciseChange,
} from "../utils/formHandlers";
import { useAppContext } from "../context/appContext";
import { MdDragIndicator } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";

const ExerciseForm = ({ exerciseItem, exerciseIndex, workoutIndex, collapseExercises }) => {
  const { setFormData, setDeletedExercises, formData } = useAppContext();

  const handleExerciseRemoval = (setFormData, workoutIndex, exerciseIndex) => {
    if (exerciseItem.id) {
      setDeletedExercises((prevState) => [
        ...prevState,
        {
          exerciseId: exerciseItem.id,
          workoutId: formData.workouts[workoutIndex]?.id,
        },
      ]);
    }

    handleRemoveExercise(setFormData, workoutIndex, exerciseIndex);
  };

  return (
    <Draggable draggableId={exerciseIndex.toString()} index={exerciseIndex}>
      {(provided) => (
        <div
          className="flex flex-col gap-2 px-4 py-6 rounded-md bg-lightColor dark:bg-gray-800"
          key={exerciseIndex}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex justify-between w-full">
            <div {...provided.dragHandleProps}>
              <MdDragIndicator size={25} className="cursor-move -mt-3 -ml-3" />
            </div>

            <div>
              <button
                onClick={() =>
                  handleExerciseRemoval(
                    setFormData,
                    workoutIndex,
                    exerciseIndex
                  )
                }
              >
                <IoIosRemoveCircle
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-300"
                  size={25}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <div>
              <InputTextExercise
                name="name"
                value={exerciseItem.name}
                workoutIndex={workoutIndex}
                exerciseIndex={exerciseIndex}
                placeholder={"Exercise Name"}
                className="w-full"
              />
            </div>

            {collapseExercises ? null : (
              <>
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <InputTextExercise
                    name="sets"
                    value={exerciseItem.sets}
                    workoutIndex={workoutIndex}
                    exerciseIndex={exerciseIndex}
                    className="w-full"
                    type="number"

                  />
                  <InputTextExercise
                    name="reps"
                    value={exerciseItem.reps}
                    workoutIndex={workoutIndex}
                    exerciseIndex={exerciseIndex}
                    className="w-full"
                    type="number"
                  />
                </div>
                <div>
                  <div className="relative w-full">
                    <textarea
                      type=""
                      id="input-text"
                      placeholder=""
                      className="peer block w-full rounded-md bg-white dark:bg-gray-900 px-2 pb-2 pt-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      name="weight"
                      value={exerciseItem.weight}
                      onChange={(event) =>
                        handleExerciseChange(
                          setFormData,
                          workoutIndex,
                          exerciseIndex,
                          event
                        )
                      }
                    />
                    <label
                      htmlFor="input-text"
                      className="absolute left-2 top-0 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-700 dark:peer-focus:text-gray-300"
                    >
                      Description
                    </label>
                  </div>


                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

ExerciseForm.propTypes = {
  exerciseItem: PropTypes.object.isRequired,
  exerciseIndex: PropTypes.number.isRequired,
  workoutIndex: PropTypes.number.isRequired,
  collapseExercises: PropTypes.bool.isRequired,
};
export default ExerciseForm;
