import { useState } from "react";
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
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc";

const ExerciseForm = ({ exerciseItem, exerciseIndex, workoutIndex }) => {
  const { setFormData, setDeletedExercises, formData } = useAppContext();

  const [collapsed, setCollapsed] = useState(false);

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
          className="flex flex-col gap-2 px-4 py-6 rounded-md shadow-md bg-emerald-200 dark:bg-gray-800"
          key={exerciseIndex}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex justify-between w-full">
            <div {...provided.dragHandleProps}>
              <MdDragIndicator size={25} className="cursor-move -mt-3 -ml-3" />
            </div>

            <div className="flex gap-4 md:gap-6">
              {
                !collapsed ?
                  <VscCollapseAll
                    size={25}
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="cursor-pointer"
                  /> :
                  <VscExpandAll size={25}
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="cursor-pointer"

                  />
              }

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
                  className="text-red-400 hover:text-red-500 transition ease-in-out duration-300"
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

            {collapsed ? null : (
              <>
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <InputTextExercise
                    name="sets"
                    value={exerciseItem.sets}
                    workoutIndex={workoutIndex}
                    exerciseIndex={exerciseIndex}
                    className="w-full"
                  />
                  <InputTextExercise
                    name="reps"
                    value={exerciseItem.reps}
                    workoutIndex={workoutIndex}
                    exerciseIndex={exerciseIndex}
                    className="w-full"
                  />
                </div>
                <div>
                  <textarea
                    className={`rounded-md p-2 w-full dark:bg-gray-900`}
                    name="weight"
                    placeholder="Description"
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
};
export default ExerciseForm;
