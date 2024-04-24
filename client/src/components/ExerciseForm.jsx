import PropTypes from "prop-types";
import { InputTextExercise } from "../components";
import { FaTrashAlt } from "react-icons/fa";
import { Draggable } from "@hello-pangea/dnd";
import { TbDragDrop2 } from "react-icons/tb";
import { handleRemoveExercise } from "../utils/formHandlers";

const ExerciseForm = ({
  exerciseItem,
  exerciseIndex,
  workoutIndex,
  setFormData,
  setDeletedExercises,
}) => {
  const handleExerciseRemoval = (setFormData, workoutIndex, exerciseIndex) => {
    if (exerciseItem._id) {
      setDeletedExercises((prevState) => [...prevState, exerciseItem._id]);
    }

    handleRemoveExercise(setFormData, workoutIndex, exerciseIndex);
  };

  return (
    <Draggable draggableId={exerciseIndex.toString()} index={exerciseIndex}>
      {(provided) => (
        <div
          className="flex flex-col gap-2 p-4 rounded-md items-center shadow-md bg-gray-100 dark:bg-gray-800 mb-2"
          key={exerciseIndex}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            {...provided.dragHandleProps}
            className="rotate-90 ml-auto -mr-2 -mt-1"
          >
            <TbDragDrop2 size={20} />
          </div>
          <div className="flex flex-col gap-2">
            <InputTextExercise
              name="name"
              value={exerciseItem.name}
              workoutIndex={workoutIndex}
              exerciseIndex={exerciseIndex}
              placeholder={"Exercise Name"}
              setFormData={setFormData}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputTextExercise
              name="sets"
              value={exerciseItem.sets}
              workoutIndex={workoutIndex}
              exerciseIndex={exerciseIndex}
              setFormData={setFormData}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputTextExercise
              name="reps"
              value={exerciseItem.reps}
              workoutIndex={workoutIndex}
              exerciseIndex={exerciseIndex}
              setFormData={setFormData}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputTextExercise
              name="weight"
              value={exerciseItem.weight}
              workoutIndex={workoutIndex}
              exerciseIndex={exerciseIndex}
              placeholder={"Weight (optional)"}
              setFormData={setFormData}
            />
          </div>
          <div>
            <button
              onClick={() =>
                handleExerciseRemoval(setFormData, workoutIndex, exerciseIndex)
              }
            >
              <FaTrashAlt className="text-red-400 hover:text-red-500 transition ease-in-out duration-300" />
            </button>
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
  setFormData: PropTypes.func.isRequired,
  setDeletedExercises: PropTypes.func
};
export default ExerciseForm;
